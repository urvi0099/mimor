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
  selector: 'app-building-book-area',
  templateUrl: './building-book-area.page.html',
  styleUrls: ['./building-book-area.page.scss'],
})
export class BuildingBookAreaPage implements OnInit {

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
  public users = [];
  public userId;
  public resident;
  public bookings = [];
  public bookingUsers = [];
  public uniqueNames = [];
  public uniqueUsers = [];
  public userApartments = [];
  public dateParam = this.route.snapshot.queryParamMap.get('date');
  public timeParam = this.route.snapshot.queryParamMap.get('time');

  constructor(private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private apiService: ApiService,
    private alert: AlertService,
    private alertController: AlertController,
    private windowRef: WindowRefService) {
    console.log('manager area booking constructor');
  }

  ngOnInit() {
    if (this.areaId) {
      this.getArea();
      if (this.dateParam) {
        this.selectedDate.patchValue(new Date(this.dateParam));
        this.loadHours();
      }
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
        this.getActiveBookings();
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
        this.router.navigateByUrl(`manager/building/${this.buildId}/common-area-calendar/${this.areaId}`)
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
      } else {
        this.alert.show(response.message || ERROR.internal);
        this.router.navigateByUrl(`manager/building/${this.buildId}/common-area-calendar/${this.areaId}`)
      }
    });
  }

  public getActiveBookings() {
    this.apiService
      .get(API.manager.getActiveBookings + this.buildId)
      .subscribe((response) => {
        this.bookings = response.bookings;
        this.bookingUsers = this.bookings.map(booking => booking.user);
        let uniqueNames = [];
        this.uniqueUsers = [];
        this.bookingUsers.forEach((el) => {
          if (!uniqueNames.includes(el.name)) {
            uniqueNames.push(el.name);
            this.uniqueUsers.push(el);
          }
        })
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
                newHours.push(response.hours[i]);
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
    this.router.navigateByUrl(`manager/building/${this.buildId}/common-area-calendar/${this.areaId}`)
  }

  public submit(): void {
    // this.showRulesModal = true;
    let dateMonth = this.selectedDate.value.getMonth() + 1 > 9 ? this.selectedDate.value.getMonth() + 1 : '0' + (this.selectedDate.value.getMonth() + 1);
    let dateDay = this.selectedDate.value.getDate() > 9 ? this.selectedDate.value.getDate() : '0' + this.selectedDate.value.getDate();
    const dateModal = `${dateDay}/${dateMonth}/${this.selectedDate.value.getFullYear()}`;
    const date = `${this.selectedDate.value.getFullYear()}-${this.selectedDate.value.getMonth() + 1}-${this.selectedDate.value.getDate()}`;
    const hour = this.hours.find(h => h.id == parseInt(this.model.hour));
    const hourStr = hour.from + ':' + hour.from_min + ' ' + hour.day_part_from + ' - ' + hour.to + ':' + hour.to_min + ' ' + hour.day_part_to;
    if (this.freeArea || this.isEdit) {
      this.saveBooking();
    } else {
      this.apiService.post('/api/payment/customer/info', { user_id: parseInt(this.userId) }).subscribe(res => {
        if (res.length === 0) {
          this.alert.show(`This user does not have available payment method`);
        } else {
          this.customerId = res[res.length - 1].stripe_user_id;
          this.priceConfirm(dateModal, hourStr);
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
    this.model.hour = parseInt(this.model.hour);
    const user = this.users.find(el => parseInt(el.id) === parseInt(this.userId));
    this.model.user_id = user.id;
    this.apiService.post(API.client.saveCommonAreaBooking, this.model).subscribe((response) => {
      if (response.status) {
        this.currentBookingId = response.booking_id;
        if (this.freeArea || this.isEdit) {
          this.router.navigateByUrl(`manager/building/${this.buildId}/common-area-calendar/${this.areaId}`)
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
      this.router.navigateByUrl(`manager/building/${this.buildId}/common-area-calendar/${this.areaId}`)
    })
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
            this.saveBooking();
          }
        }
      ]
    });
    await alert.present();
  }

  public onEnterResidentName(){
    const value = this.resident;
    this.users = this.uniqueUsers.filter(user => user.name.toLowerCase().includes(value));
  };

  public onSelectUser(id) {
    this.userApartments = this.bookings
      .filter(booking => booking.user_id === id)
      .map(el => el.apartment);
  }

}
