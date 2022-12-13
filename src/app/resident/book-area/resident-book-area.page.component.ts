import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { API } from '../../shared/constants/api.constants';
import { ERROR } from '../../shared/constants/errors.constants';
import { AlertService } from '../../services/alert.service';
import { AlertController } from '@ionic/angular';
import { WindowRefService } from '../../services/window.service';


@Component({
  selector: 'app-res-book-area',
  templateUrl: './resident-book-area.page.html',
  styleUrls: ['./resident-book-area.page.scss'],
})
export class ResidentBookAreaPage implements OnInit {

  public commonArea;
  public area;
  public buttonText = BUTTONS.book;
  public selectedDate = new FormControl('', Validators.required);
  public selectedHour = new FormControl('', Validators.required);
  public minDate = new Date();
  public hours;
  public showRulesModal: boolean = false;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public areaId = this.route.snapshot.paramMap.get('areaId');
  public model: any = {};
  public isEdit = !!this.route.snapshot.paramMap.get('bookingId');
  public bookingId = this.route.snapshot.paramMap.get('bookingId');
  public apartment = JSON.parse(this.windowRef.nativeWindow.sessionStorage.getItem('currentApartment'));
  public wDays = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };
  public freeArea = true;
  public hasFee = false;
  public hasPrice = false;
  public customerId;
  public loading;
  public currentBookingId;
  public paymentStatus;
  public amount;
  public price;
  public fee;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private apiService: ApiService,
    private alert: AlertService,
    private alertController: AlertController,
    private windowRef: WindowRefService) {
    console.log('resident area booking constructor');
  }

  ngOnInit() {
    if (this.areaId) {
      this.getArea();
    } else this.router.navigateByUrl('manager/buildings');
  }

  public getArea() {
    this.apiService.post('/api/client/getArea', {
      build_id: parseInt(this.buildId),
      area_id: parseInt(this.areaId),
      booking_id: parseInt(this.bookingId),
      is_edit: this.isEdit
    }).subscribe((response) => {
      if (response.status) {
        this.commonArea = response.common_area;
        if (response.area_booking) {
          let date_from = response.area_booking.date_from;
          this.model.date = new Date(date_from);
          this.selectedDate.setValue(this.model.date);
          this.model.hour = new Date(date_from).getHours();
          this.loadHours();
        }
        this.getPrice();
      } else {
        this.alert.show(response.message || ERROR.internal);
        this.router.navigateByUrl('resident/book-area/view' + this.buildId)
      }
    });
  }

  public getPrice() {
    this.apiService.post(API.manager.showCommonAreas + this.buildId).subscribe((response) => {
      if (response.status) {
        let areas = response.building.common_areas;
        this.area = areas.find(area => parseInt(area.id) === parseInt(this.areaId));
        if (this.area && (this.area.price || this.area.fee)) {
          this.freeArea = false;
        }
        this.hasPrice = !!this.area.price;
        this.hasFee = !!this.area.fee;
        console.log(this.area);
      } else {
        this.alert.show(response.message || ERROR.internal);
        this.router.navigateByUrl('resident/book-area/view' + this.buildId);
      }
    });
  }

  public loadHours() {
    let h = this.model.hour;
    this.model.hour = '';
    this.model.date = this.selectedDate.value;
    let year = this.model.date.getFullYear(),
      month = (this.model.date.getMonth() + 1) < 10 ? '0' + (this.model.date.getMonth() + 1) : '' + (this.model.date.getMonth() + 1),
      day = this.model.date.getDate() < 10 ? '0' + this.model.date.getDate() : '' + this.model.date.getDate(),
      numDay = this.model.date.getDay(),
      wDay = this.wDays[numDay],
      selectedArea = this.areaId;

    this.apiService.post(API.client.getAreaFreeHours + encodeURIComponent(year + '-' + month + '-' + day)
      + (this.isEdit ? '&booking_id=' + this.bookingId : '') + '&wDay=' + wDay + '&area=' + selectedArea).subscribe((response) => {
        if (response.status) {
          let hours = response.hours,
            hour = 0,
            from = 0,
            to = 0,
            dayPartFrom = 'am',
            dayPartTo = 'pm',
            i;

          let newHours = [];

          if (response.today) {
            let currentHour = response.current_time;
            let currentMin = response.current_min;
            for (i in response.hours) {
              from = response.hours[i].from;
              to = response.hours[i].to;
              dayPartFrom = response.hours[i]['day_part_from'];
              dayPartTo = response.hours[i]['day_part_to'];
              let from_min = response.hours[i].from_min;
              let to_min = response.hours[i].to_min;

              let checkTime = this.timeConverFrom12(from, from_min, to, to_min, currentHour, currentMin, dayPartFrom, dayPartTo);

              if (checkTime) {
                newHours.push(response.data.hours[i]);
              }
            }
            hours = newHours;
          }
          this.hours = [];

          for (i in hours) {
            this.hours.push(hours[i]);
          }

          h = (h > 12) ? h - 12 : h;

          if (Object.values(hours).length > 0) {
            Object.values(hours).forEach((element: any) => {
              if (Number.parseInt(element.from) === h) {
                this.model.hour = element.id;
                this.selectedHour.setValue(this.model.hour);
              }
            });
          }
          return;
        }
        this.alert.show(response.message || ERROR.internal);
      });
  };

  public timeConverFrom12(from, fmin, to, tmin, currentHour, cmin, dayPartFrom, dayPartTo) {
    from = parseInt(from);
    to = parseInt(to);
    if (from > 12 || from < 0 || to > 12 || to < 0) {
      return false;
    }
    dayPartFrom = dayPartFrom.trim().toLowerCase();
    dayPartTo = dayPartTo.trim().toLowerCase();
    if (dayPartFrom == 'pm') {
      if (from !== 12) {
        from = from + 12;
      }
      if (this.compareTime({ h: from, m: fmin }, { h: currentHour, m: cmin })) {
        return true;
      }
    }
    if (dayPartTo == 'am') {
      if (this.compareTime({ h: to, m: tmin }, { h: currentHour, m: cmin })) {
        return true;
      }
    } else {
      if (to !== 12) {
        to = to + 12;
      }
      if (this.compareTime({ h: to, m: tmin }, { h: currentHour, m: cmin })) {
        return true;
      }
    }
    return false;
  };

  public compareTime(time1, time2) {
    let comp1 = new Date();
    let comp2 = new Date();
    comp1.setHours(parseInt(time1.h, 10), parseInt(time1.m, 10), 0);
    comp2.setHours(parseInt(time2.h, 10), parseInt(time2.m, 10), 0);
    if (comp1 > comp2) {
      return true;
    } else if (comp1 < comp2) {
      return false;
    } else {
      return null;
    }
  }

  public back(): void {
    this.router.navigateByUrl('resident/dashboard')
  }

  public submit(): void {
    // this.showRulesModal = true;
    let dateMonth = this.selectedDate.value.getMonth() + 1 > 9 ? this.selectedDate.value.getMonth() + 1 : '0' + (this.selectedDate.value.getMonth() + 1);
    let dateDay = this.selectedDate.value.getDate() > 9 ? this.selectedDate.value.getDate() : '0' + this.selectedDate.value.getDate();
    const dateModal = `${dateDay}/${dateMonth}/${this.selectedDate.value.getFullYear()}`;
    const date = `${this.selectedDate.value.getFullYear()}-${this.selectedDate.value.getMonth() + 1}-${this.selectedDate.value.getDate()}`;
    const hour = this.hours.find(h => h.id == parseInt(this.selectedHour.value));
    const hourStr = hour.from + ':' + hour.from_min + ' ' + hour.day_part_from + ' - ' + hour.to + ':' + hour.to_min + ' ' + hour.day_part_to;
    if (this.freeArea || this.isEdit) {
      this.saveBooking();
    } else {

      this.apiService.post('/api/payment/customer/info').subscribe(res => {
        if (res.length === 0) {
          this.router.navigateByUrl(`/resident/book-area/${this.buildId}/${this.areaId}/payment?date=${date}&hour=${this.selectedHour.value}&hourStr=${hourStr}`);
        } else {
          this.customerId = res[res.length - 1].stripe_user_id;
          this.paymentConfirm(res[res.length - 1], date, dateModal, hourStr);
        }
      })
    }
  }

  public saveBooking() {
    if (this.loading) {
      return false;
    }
    this.loading = true;
    this.model.area_id = this.areaId;
    this.model.build_id = this.buildId;
    this.model.is_edit = false;
    this.model.area_booking_id = false;
    this.model.apartment_id = this.apartment.apartment.id;
    this.model.hour = parseInt(this.selectedHour.value);
    this.apiService.post(API.client.saveCommonAreaBooking, this.model).subscribe((response) => {
      if (response.status) {
        this.currentBookingId = response.booking_id;
        if (this.freeArea || this.isEdit) {
          this.router.navigateByUrl(`resident/book-area/${this.buildId}/show`)
        } else this.paymentInt();
      } else {
        this.alert.show(response.message || ERROR.internal)
        this.loading = false;
      }
    }, () => {
      this.loading = false;
    });
  }

  public paymentInt() {
    let payload = {
      common_area_id: this.areaId,
      customer_id: this.customerId,
      booking_id: this.currentBookingId,
      method_type: 'card',
      currency: 'aud',
      building_id: parseInt(this.buildId)
    }
    this.apiService.post('/api/payment/paymentIntent', payload).subscribe(response => {
      this.paymentStatus = response.status === 'succeeded' ? 'successful' : response.status;
      this.loading = false;
      this.alert.show(`Your payment for ${this.amount / 100} AUD (${this.price} AUD refundable and ${this.fee} AUD fee) is ${this.paymentStatus}`, 'Notification has been sent');
      this.router.navigateByUrl(`resident/book-area/${this.buildId}/show`)
    })
  }

  public async paymentConfirm(customer, date, dateModal, hour) {
    const alert = await this.alertController.create({
      cssClass: 'resident-payment',
      header: 'Confirm credentials',
      message: `<p>Your email is <b>${customer.email}</b>, your card number is <b>**** **** **** ${customer.account_number}</b></p>
                <p>Would you like to use your current credentials or change them?</p>`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Сhange',
          handler: () => {
            this.router.navigateByUrl(`/resident/book-area/${this.buildId}/${this.areaId}/payment?date=${date}&hour=${this.selectedHour.value}&hourStr=${hour}`);
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.priceConfirm(dateModal, hour);
          }
        }
      ]
    });
    await alert.present();
  }

  public async priceConfirm(dateModal, hour) {
    this.price = this.area.price ? parseFloat(this.area.price) : 0;
    this.fee = this.area.fee ? parseFloat(this.area.fee) : 0;
    this.amount = (this.price + this.fee) * 100;
    const alert = await this.alertController.create({
      cssClass: 'resident-payment',
      header: 'Confirm',
      message: `You are being charged ${this.amount / 100} AUD (${this.price} AUD refundable and ${this.fee} AUD fee) for your booking of the ${this.area.name} on the ${dateModal}, ${hour}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirm',
          handler: () => {
            console.log('book');
            this.saveBooking();
          }
        }
      ]
    });
    await alert.present();
  }

}
