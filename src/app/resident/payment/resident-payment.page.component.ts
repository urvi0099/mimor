import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardNumberComponent, StripeService } from 'ngx-stripe';
import { AlertController } from '@ionic/angular';

import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { WindowRefService } from '../../services/window.service';
import { API } from '../../shared/constants/api.constants';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-res-payment',
  templateUrl: './resident-payment.page.html',
  styleUrls: ['./resident-payment.page.scss'],
})
export class ResidentPaymentPage implements OnInit {

  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  
  public commonArea;
  public buildingName;
  public buttonText = BUTTONS.book;
  public email = '';
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public areaId = this.route.snapshot.paramMap.get('areaId');
  public model: any = {};
  public loading;
  public apartment = JSON.parse(this.windowRef.nativeWindow.sessionStorage.getItem('currentApartment'));
  public currentBookingId;
  public area;
  public hasPrice;
  public hasFee;
  public amount;
  public hourStr = this.route.snapshot.queryParamMap.get('hourStr');
  public paymentId;
  public paymentSecret;
  public customerCreate;
  public formSubmitted;
  public paymentStatus;
  public repaymentStatus;
  public price;
  public fee;
  public repaymentId;
  public paymentSetup = false;
  public repaymentSetup = false;
  public cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4"
        },
        ':-webkit-autofill': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#E25950',

        '::placeholder': {
          color: '#FFCCA5',
        },
      },
    }
  };

  public elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  public stripeTest: FormGroup;
  public paying = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private http: HttpClient,
    private apiService: ApiService,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private windowRef: WindowRefService,
    private alert: AlertService,
    private alertController: AlertController,
    private stripe: StripeService
  ) {
    console.log('resident area booking constructor');
    this.stripeTest = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,12}')]],
    });
  }

  ngOnInit() {
    this.getArea();
    if (this.route.snapshot.queryParamMap.get('date') && this.route.snapshot.queryParamMap.get('hour')) {
      this.model.date = new Date(this.route.snapshot.queryParamMap.get('date'));
      this.model.hour = parseInt(this.route.snapshot.queryParamMap.get('hour'));
    }
  }

  public getArea() {
    this.apiService.post(API.manager.showCommonAreas + this.buildId).subscribe((response) => {
      if (response.status) {
        this.buildingName = response.building.name;
        let areas = response.building.common_areas;
        this.area = areas.find(area => parseInt(area.id) === parseInt(this.areaId));
        this.commonArea = this.area;
        this.hasPrice = !!this.area.price;
        this.hasFee = !!this.area.fee;
        this.price = this.area.price ? parseFloat(this.area.price) : 0;
        this.fee = this.area.fee ? parseFloat(this.area.fee) : 0;
        this.amount = (this.price + this.fee) * 100;
        console.log(this.area);
      } else {
        this.alert.show(response.message || ERROR.internal);
        this.router.navigateByUrl('resident/book-area/view' + this.buildId);
      }
    });
  }

  public back(): void {
    this.router.navigateByUrl('resident/dashboard')
  }

  public setupPayment() {
    this.apiService.post('/api/payment/create-payment-intent', {
      amount: this.price * 100,
      currency: 'aud'
    }).subscribe(res => {
      if (res && res.client_secret && res.payment_id) {
        this.paymentSecret = res.client_secret;
        this.paymentId = res.payment_id;
        this.stripe.confirmCardPayment(
          this.paymentSecret, {
          payment_method: {
            card: this.card.element,
            billing_details: {
              email: this.stripeTest.value.email
            }
          }
        }
        ).subscribe(res => {
          if (res && res.paymentIntent) {
            this.paymentSetup = true;
            if(this.hasFee){
              this.setupRepayment();
            } else {
              this.saveBooking();
            }
            return;
          }
          this.formSubmitted = false;
          if (res.error && res.error.message) {
            this.alert.show(res.error.message);
            return;
          }
          this.alert.show(res.error.message || ERROR.internal);
        })
      }
    })
  }

  public setupRepayment() {
    this.apiService.post('/api/payment/create-payment-intent', {
      amount: this.fee * 100,
      currency: 'aud'
    }).subscribe(res => {
      if (res && res.client_secret && res.payment_id) {
        this.paymentSecret = res.client_secret;
        this.repaymentId = res.payment_id;
        this.stripe.confirmCardPayment(
          this.paymentSecret, {
          payment_method: {
            card: this.card.element,
            billing_details: {
              email: this.stripeTest.value.email
            }
          }
        }
        ).subscribe(res => {
          if (res && res.paymentIntent) {
            this.paymentSetup = true;
            if(this.hasPrice && this.paymentSetup || !this.hasPrice) {
              this.saveBooking();
              return;
            }
          }
          this.formSubmitted = false;
          if (res.error && res.error.message) {
            this.alert.show(res.error.message);
            return;
          }
          this.alert.show(res.error.message || ERROR.internal);
        })
      }
    })
  }

  public saveBooking() {
    if (this.loading) {
      return;
    }
    console.log('book')
    this.loading = true;
    this.model.area_id = this.areaId;
    this.model.build_id = this.buildId;
    this.model.is_edit = false;
    this.model.area_booking_id = false;
    this.model.apartment_id = this.apartment.apartment.id;
    this.apiService.post(API.client.saveCommonAreaBooking, this.model).subscribe((response) => {
      if (response.status) {
        console.log(response);
        this.currentBookingId = response.booking_id;
        this.createSubscription();
      } else {
        this.alert.show(response.message || ERROR.internal)
        this.loading = false;
      }
    }, () => {
      this.loading = false;
    });
  }

  public createSubscription() {
    if (this.stripeTest.value.email) {
      let data: any = {
        email: this.stripeTest.value.email,
        method_type: 'card',
        common_area_id: this.areaId,
        booking_id: this.currentBookingId,
        buildingId: this.buildId
      }
      if(this.hasPrice){
        data.payment_id = this.paymentId;
      }
      if(this.hasFee){
        data.repayment_id = this.repaymentId;
      }
      this.apiService.post('/api/payment/createCustomer', data).subscribe((res) => {
        this.loading = false;
        this.paymentStatus = res.payment_status === 'succeeded' ? 'successful' : res.payment_status;
        this.repaymentStatus = res.payment_status === 'succeeded' ? 'successful' : res.repayment_status;
        this.alert.show(`Your payment for ${this.amount / 100} AUD is - (${this.price} AUD refundable ${this.paymentStatus} and ${this.fee} AUD fee ${this.repaymentStatus}`, 'Notification has been sent');
      })
    }
  }

  public async submitPayment() {
    let dateMonth = this.model.date.getMonth() + 1 > 9 ? this.model.date.getMonth() + 1 : '0' + (this.model.date.getMonth() + 1);
    let dateDay = this.model.date.getDate() > 9 ? this.model.date.getDate() : '0' + this.model.date.getDate();
    const date = `${dateDay}/${dateMonth}/${this.model.date.getFullYear()}`;
    const alert = await this.alertController.create({
      cssClass: 'resident-modal',
      header: 'Confirm',
      subHeader: `You are being charged ${this.amount / 100} AUD (${this.price} AUD refundable and ${this.fee} AUD fee) isfor your booking of the ${this.area.name} on the ${date}, ${this.hourStr}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: () => {
            if(this.hasPrice){
              this.setupPayment();
            }
            if(this.hasFee && !this.hasPrice){
              this.setupRepayment();
            }
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

}
