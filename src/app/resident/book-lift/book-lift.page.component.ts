import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { API } from '../../shared/constants/api.constants';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { ERROR } from '../../shared/constants/errors.constants';
import { AREAS, BUILD_INFO, HOURS } from '../../shared/constants/mock';

@Component({
  selector: 'app-book-lift',
  templateUrl: './book-lift.page.html',
  styleUrls: ['./book-lift.page.scss'],
})
export class BookLiftPage implements OnInit {

  public buttonText = BUTTONS.book;
  public buildingName;
  public selectedDate = new FormControl(new Date(), Validators.required);
  public selectedHour = new FormControl('', Validators.required);
  public minDate = new Date();
  public hours = HOURS;
  public timeslots = [];
  public bookingId = this.route.snapshot.paramMap.get('bookingId');
  public buildingID;
  public apartmentID;
  public userStatus;
  public isResiding;
  public loading = true;
  public wDays = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };
  public pageLoading = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private apiService: ApiService,
    private alert: AlertService) {
    console.log('resident lift booking constructor');
  }

  ngOnInit() {
    if (this.bookingId) {
      this.getBooking();
    } else this.router.navigateByUrl('resident/dashboard');
  }

  public getBooking() {
    this.apiService.get(API.client.getBookingInfo + this.bookingId)
      .subscribe((resp) => {
        if (!resp.status) {
          this.alert.show(resp.message || ERROR.internal);
          this.router.navigateByUrl('resident/dashboard');
        }
        if (resp.booking.allow_move_in == '0') {
          this.router.navigateByUrl('resident/dashboard');
        }
        this.buildingID = resp.booking.building_id;
        this.apartmentID = resp.booking.appartment_id;
        this.userStatus = resp.booking.user_status;
        this.isResiding = resp.booking.is_residing;
        this.buildingName = resp.booking.build_name;
        if (Number(resp.booking.booking_delay) && !isNaN(Number(resp.booking.booking_delay))) {
          let selectedDate = this.addDays(new Date(), Number(resp.booking.booking_delay));
          this.selectedDate.setValue(selectedDate);
          this.minDate = this.addDays(new Date(), Number(resp.booking.booking_delay));
        }
        this.loadTimeslots(true);
      }), () => {
        this.router.navigateByUrl('resident/dashboard');
      }
  }

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


  public addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  public loadTimeslots(init) {
    console.log(this.selectedDate);
    let year = this.selectedDate.value.getFullYear(),
      month = (this.selectedDate.value.getMonth() + 1) < 10 ? '0' + (this.selectedDate.value.getMonth() + 1) : '' + (this.selectedDate.value.getMonth() + 1),
      day = this.selectedDate.value.getDate() < 10 ? '0' + this.selectedDate.value.getDate() : '' + this.selectedDate.value.getDate(),
      numDay = this.selectedDate.value.getDay(),
      wDay = this.wDays[numDay],
      reqString = '';

    reqString = 'date=' + encodeURIComponent(year + '-' + month + '-' + day)
      + '&building=' + this.buildingID
      + '&wDay=' + wDay;


    this.apiService.get('/api/client/getHours?' + reqString)
      .subscribe((response) => {
        if (response.status === true) {
          let hours = response.hours,
            hour = 0,
            from = 0,
            to = 0,
            dayPartFrom = 'am',
            i;

          if (response.today) {
            let currentHour = response.current_time;
            let currentMin = response.current_min;
            let newHours = [];
            for (i in response.hours) {
              from = response.hours[i].from;
              to = response.hours[i].to;
              dayPartFrom = response.hours[i]['day_part_from'];
              let dayPartTo = response.hours[i]['day_part_to'];
              let from_min = response.hours[i].from_min;
              let to_min = response.hours[i].to_min;
              let checkTime = this.timeConverFrom12(from, from_min, to, to_min, currentHour, currentMin, dayPartFrom, dayPartTo);
              if (checkTime) {
                newHours.push(response.hours[i]);
              }
            }
            hours = newHours;
          }
          this.timeslots = [];
          for (i in hours) {
            this.timeslots.push(hours[i]);
          }
          this.loading = false;
          return false;
        }
        this.alert.show(response.message || ERROR.internal);
      });
  };

  public back(): void {
    this.router.navigateByUrl('resident/dashboard')
  }

  public submit(): void {
    console.log(this.selectedDate.value, this.selectedHour.value);
    if (this.pageLoading) {
      return;
    }
    let year = this.selectedDate.value.getFullYear(),
      month = (this.selectedDate.value.getMonth() + 1) < 10 ? '0' + (this.selectedDate.value.getMonth() + 1) : '' + (this.selectedDate.value.getMonth() + 1),
      day = this.selectedDate.value.getDate() < 10 ? '0' + this.selectedDate.value.getDate() : '' + this.selectedDate.value.getDate();

    this.pageLoading = true;
    this.apiService.post(API.client.bookLift, {
      building_id: this.buildingID,
      apartment_id: this.apartmentID,
      date: encodeURIComponent(year + '-' + month + '-' + day),
      time_id: this.selectedHour.value,
      user_status: this.userStatus,
      is_residing: this.isResiding,
      current_booking: this.bookingId,
    })
      .subscribe((resp) => {
        if (resp.status === true) {
          this.apiService.post(API.client.sendToEmail + this.buildingID, {
            booking: resp.booking_id,
            lift_booking: true,
          })
            .subscribe((resp) => {
              this.router.navigateByUrl('resident/guidelines/view/' + this.buildingID);
            })
            , (() => {
              this.alert.show(resp.message || ERROR.internal);
            });
          return;
        }
        this.alert.show(resp.message || ERROR.internal);
        this.pageLoading = false;
      }, () => {
        this.pageLoading = false;
      });
  }

}
