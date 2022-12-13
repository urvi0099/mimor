import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { WindowRefService } from '../../services/window.service';
import { API } from '../../shared/constants/api.constants';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { ERROR } from '../../shared/constants/errors.constants';
import { AREAS, BUILD_INFO, HOURS } from '../../shared/constants/mock';

@Component({
  selector: 'app-change-move',
  templateUrl: './change-move.page.html',
  styleUrls: ['./change-move.page.scss'],
})
export class ChangeMovePage implements OnInit {

  public buttonText = BUTTONS.book;
  public buildingName;
  public selectedDate = new FormControl('', Validators.required);
  public selectedHour = new FormControl('', Validators.required);
  public minDate = new Date();
  public loading = true;
  public hours = [];
  public hideAlreadyMoved = true;
  public bookLater = false;
  public alreadyMov = false;
  public notReadyToBook = false;
  public readyToBook = true;
  public guidelinesPath = '/';
  public allowMoveIn;
  public isLiftBooking = false;
  public isPending = false;
  public headerText = 'Change';
  // public isMoveDateChange;
  public next;
  public title;
  public currentDate;
  public changeDate;
  public maxDate;
  public blockDates;
  public isNewBooking;
  public makeResiding = this.route.snapshot.queryParamMap.get('makeResiding');

  public model: any = {};
  public wDays = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
  };
  public bookingId = this.route.snapshot.paramMap.get('bookingId');
  public currentApartment = JSON.parse(this.windowRef.nativeWindow.sessionStorage.getItem('currentApartment'));
  public apartment = '';
  public out = this.route.snapshot.url[0].path === 'move-out';
  public selectedApp; // TO DO 

  // public next = $location.path().substr(6, 4) === 'next';
  // public isNewBooking = $location.path().match(/(\/move-new|\/new-booking)/) || undefined;
  // public moveOut = $location.path().split('/')[1] === 'move-out' ? true : false;
  public isMoveDateChange = this.route.snapshot.url.length === 3 && this.route.snapshot.url[2].path === 'change';

  constructor(private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    public apiService: ApiService,
    public windowRef: WindowRefService,
    public alert: AlertService) {
    console.log('resident booking constructor');
  }

  ngOnInit() {
    this.getInfo();
    if (this.currentApartment) {
      this.apartment = '&app=' + this.currentApartment.apartment.id;
    }
  }

  public getInfo() {
    this.apiService.get(
      '/api/client/getMoveStatus?' + (this.bookingId ? ('id=' + this.bookingId) : '') + (this.selectedApp ? ('&app=' + this.selectedApp) : this.apartment)
    ).subscribe((response) => {
      if (response.status) {
        console.log(response);
        if (!response.dialog) {
          this.router.navigateByUrl('resident/dashboard');
          return;
        }
        this.model.status = 'moving';
        this.model.type = this.out ? 'out' : 'in';
        this.model.bookingId = response.data.id || '';
        this.model.buildingId = response.data['building_id'];
        this.buildingName = response.data['building_name'];
        this.model.tenant_role = response.data['user_status'];
        this.model.isResidenting = response.data['is_residing'];
        this.model.bookingDelay = response.data['booking_delay'];
        if (response.data['date_from'] && !this.out) this.selectedDate.setValue(new Date(response.data['date_from']));
        if (!response.data.status_out && response.data.status === 'moved') {
          this.headerText = 'Create';
        } else if (response.data.status_out && response.data.status_out != 'moved') {
          this.isMoveDateChange = true;
        }

        if (response.data['status'] == 'pending') {
          this.headerText = 'Create';
        }

        // Change title accordingly
        if (response.is_lift == '1') {
          this.isLiftBooking = true;
          this.model.hour = response.data.moveInFromHour;
        }
        this.allowMoveIn = response.allow_move_in;
        if (this.allowMoveIn === '0' || this.allowMoveIn === false) {
          this.alreadyMovedIn();
        }

        // We then find out if we're in a Move out booking we want to set back to the Booking In date
        // But cannot because setMinDate won't work if the date passed as param < current Mindate
        if (this.out && response.data['date_out']) {
          this.setMinDate(response.data['date_to']);
        } else if (this.next) {
          this.model.next = true;
          this.setMinDate(response.data['date_to']);
          if (!this.bookingId) {
            this.model.bookingId = undefined;
          }
        }
        this.minDate = this.addDays(this.minDate, Number(this.model.bookingDelay));
        if (this.bookingId) {
          // show some warnings
          if (!this.out && response.data.status === 'moved') {
            this.alert.show(ERROR.movedInAlready)
            this.router.navigateByUrl('resident/dashboard');
          } else if (this.out && response.data['status_out'] === 'moved') {
            this.alert.show(ERROR.movedOutAlready)
            this.router.navigateByUrl('resident/dashboard');
          }
          if (this.out && response.data['status_out'] === 'moving') {
            // set currentDate as date_out_from
            this.title = 'Change book out time';
            this.currentDate = response.data['date_out'] * 1000;
            this.hideAlreadyMoved = true;
          } else if (!this.out && response.data.status === 'moving') {
            // set currentDate to date_to of a booking
            this.currentDate = response.data['date_to'] * 1000;
          }
          if (!this.out && !this.next && response.data['date_out']) {
            this.maxDate = new Date((response.data['date_out'] - 24 * 3600) * 1000);
          }
          if(this.out && !response.data['status_out']){
            this.hideAlreadyMoved = false;
          }
          if (this.currentDate) {
            this.changeDate = true;
            this.model.date = new Date(this.currentDate);
            this.selectedDate.setValue(this.model.date);
            this.model.hour = response.data[this.out ? 'moveOutFromHour' : 'moveInFromHour'];
            this.loadHours(true);
            this.buttonText = BUTTONS.change;
          }
        }
        this.getBlockDates();
        return;
      }
      this.alert.show(response.message || ERROR.internal);
      this.router.navigateByUrl('resident/dashboard');
    });
  }

  public setMinDate (date) {
    let minDate;
    minDate = date * 1000;
    if (minDate > this.minDate.getTime()) {
      this.minDate = new Date(minDate);
    }
  };

  public loadHours(init) {
    let h = this.model.hour;
    if (!this.model.hour) this.model.hour = '';
    this.model.date = this.selectedDate.value;
    let year = this.model.date.getFullYear(),
      month = (this.model.date.getMonth() + 1) < 10 ? '0' + (this.model.date.getMonth() + 1) : '' + (this.model.date.getMonth() + 1),
      day = this.model.date.getDate() < 10 ? '0' + this.model.date.getDate() : '' + this.model.date.getDate(),
      numDay = this.model.date.getDay(),
      wDay = this.wDays[numDay];

    this.apiService.get(API.client.getHours + '?date=' + encodeURIComponent(year + '-' + month + '-' + day)
      + '&building=' + this.model.buildingId + (this.isLiftBooking && this.isMoveDateChange || this.changeDate ? '&id=' + this.bookingId : '') + '&wDay=' + wDay).subscribe((response) => {
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
          this.loading = false;
          return;
        }
        this.loading = false;
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

  public getBlockDates() {
    this.apiService.post(API.client.getBlockBuild, { 'building_id': this.model.buildingId })
      .subscribe((response) => {
        this.blockDates = response.data;
        this.loading = false;
      });
  }

  public addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  public alreadyMovedIn() {
    this.alreadyMov = true;
    this.model.date = new Date();
    this.model.hour = new Date().getHours();
    this.model.dateTime = this.getNowDateTime('Y-m-d H:i:s');
    this.selectedDate.setValue(this.model.date);
    if (this.model.hour % 2 === 1) {
      this.model.hour--;
    }
    this.selectedHour.setValue(this.model.hour);
    this.submit();
  };

  public getNowDateTime(pattern) {
    let date = this.bookLater ? new Date(0) : new Date(),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate(),
      hour = date.getHours(),
      min = date.getMinutes(),
      sec = date.getSeconds(),
      dateTime = '';

    month = this.formatNum(month);
    day = this.formatNum(day);
    hour = this.formatNum(hour);
    min = this.formatNum(min);
    sec = this.formatNum(sec);

    dateTime = pattern;

    dateTime = dateTime.replace(/Y/g, year.toString());
    dateTime = dateTime.replace(/m/g, month.toString());
    dateTime = dateTime.replace(/d/g, day.toString());
    dateTime = dateTime.replace(/H/g, hour.toString());
    dateTime = dateTime.replace(/i/g, min.toString());
    dateTime = dateTime.replace(/s/g, sec.toString());

    return dateTime;
  };

  public formatNum(num) {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  };

  public back(): void {
    this.router.navigateByUrl('resident/dashboard')
  }

  public submit(): void {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.buttonText = BUTTONS.save;
    if (this.next) {
      this.model.next = true;
    }
    if (this.isNewBooking) {
      this.model.isNewBooking = true;
    }
    if (this.alreadyMov) {
      this.model.alreadyMov = true;
    }
    if (this.bookLater) {
      this.model.bookLater = true;
    }
    let year = this.model.date.getFullYear(),
      month = (this.model.date.getMonth() + 1) < 10 ? '0' + (this.model.date.getMonth() + 1) : '' + (this.model.date.getMonth() + 1),
      day = this.model.date.getDate() < 10 ? '0' + this.model.date.getDate() : '' + this.model.date.getDate();

    let requestData = this.model;
    requestData.date = encodeURIComponent(year + '-' + month + '-' + day);
    if(!this.model.hour){
      this.model.hour = this.selectedHour.value;
    }
    if (this.makeResiding) {
      requestData.make_residing = true;
    }
    this.apiService.post(API.client.saveBooking, requestData).subscribe((response) => {
      if (response.status) {
        this.apiService.post(API.client.sendToEmail + this.model.buildingId, {
          out: this.out ? '1' : '0',
          alreadyMov: this.alreadyMov,
          bookLater: this.bookLater,
          moveout: this.out,
          update_move: this.isMoveDateChange ? [this.route.snapshot.routeConfig.path.replace(':bookingId', this.bookingId)] : false,
          lift_booking: response.is_lift,
        })
          .subscribe((resp) => {
            if (this.bookLater) {
              this.loading = false;
              this.notReadyToBook = true;
              this.guidelinesPath = '/#' + resp.redirect;
            } else {
              if (this.isMoveDateChange) {
                this.router.navigateByUrl('resident/dashboard');
              }
            }
          }, () => {
            this.router.navigateByUrl('resident/dashboard');
          });
        return;
      }
      this.alert.show(response.message || ERROR.internal)
      this.loading = false;
    }, () => {
      this.loading = false;
    });

  }

}
