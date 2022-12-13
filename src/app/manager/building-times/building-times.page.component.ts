import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { TIMES, DAYS } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { API } from '../../shared/constants/api.constants';

@Component({
  selector: 'app-building-times',
  templateUrl: 'building-times.page.html',
  styleUrls: ['building-times.page.scss'],
})
export class BuildingTimesPage implements OnInit {

  public buttonText = BUTTONS.next;
  public address = new FormControl('', [Validators.required]);
  public name = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
  public files: File[] = [];
  public multiplePhotos = false;
  public imageToShow: any;
  public times = [];
  public days;
  public timeTypes = [];
  public timeTypesNum = 22;
  public weekTimes = [];
  public timeInterval;
  public buildId;
  public bookingDelay = 0;
  public sDay;
  public sDayName;
  public sTimes;
  public buildingTimeInterval = 1;
  public dayId = 1;
  public loading = false;
  public isSet = false;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService) {
    console.log('building times constructor');
  }

  ngOnInit() {
    this.timeInterval = 1;
    for (let i = 1; i <= this.timeTypesNum; i++) {
      this.timeTypes[`${i}`] = `Type ${i}`;
    }
    this.buildId = this.route.snapshot.paramMap.get('buildId');
    this.isSet = this.route.snapshot.url[2] && this.route.snapshot.url[2].path === 'set';
    if (this.isSet) {
      this.buttonText = BUTTONS.save;
    }
    this.getBookingDelay();
    this.getType();
  }

  public returnZero() {
    return 0;
  }

  public getBookingDelay() {
    this.apiService.get(API.manager.getBookingDelay + this.buildId)
      .subscribe((response) => {
        this.bookingDelay = 0;
        if (response.status) {
          this.bookingDelay = Number(response.bookingDelay);
        } else {
          this.alert.show(response.data.message || ERROR.internal);
        }
      });
  }

  public getType() {
    this.apiService.get(API.manager.getTimesType + this.buildId + '/building').subscribe((res) => {
      if (res.result) {
        this.buildingTimeInterval = res.type;
        this.timeInterval = res.type;
      }
      this.getDays();
    });
  }

  public getDays() {
    this.apiService.get(API.manager.getDays).subscribe((res) => {
      console.log(res);
      if (res.result) {
        this.days = res.data;
        this.sDay = this.days[0].id;
        this.sDayName = this.days[0].name;
        this.getTimes();
      }
    });
  };

  public getTimes() {
    this.apiService.get('/api/get_times/' + this.timeInterval).subscribe((res) => {
      if (res.result) {
        let time = '';
        let sep = ':';
        let i: any = 0;
        for (i in res.data) {
          if (this.timeInterval == 1 && (res.data[i].id < 5 || res.data[i].id > 9)) {
            continue;
          }
          time = res.data[i].from + sep + res.data[i].from_min + ' ' + res.data[i].day_part_from + ' - ' +
            res.data[i].to + sep + res.data[i].to_min + ' ' + res.data[i].day_part_to;
          this.times.push({
            id: res.data[i].id,
            time: time
          });
        }
      }
      this.getBuildingTimes();
    });
  };

  public getBuildingTimes() {
    this.apiService.get(
      '/api/get_building_times/' + this.buildId
    ).subscribe((res) => {
      this.sTimes = [];
      if (res.result) {
        for (let day of this.days) {
          for (let key in res.data) {
            if (this.timeInterval == 1 && (res.data[key]['time_id'] < 5 || res.data[key]['time_id'] > 9)) {
              continue;
            }
            if (this.timeInterval != this.buildingTimeInterval) {
              continue;
            }

            if (this.dayId !== res.data[key]['day_id']) {
              if (res.data[key]['day_id'] !== day.id) {
                this.dayId = day.id;
                this.sTimes = [];
                this.weekTimes[this.dayId] = this.sTimes;
              }

              this.sTimes = [...new Set(this.sTimes)]
              this.weekTimes[this.dayId] = this.sTimes;
              this.dayId = res.data[key]['day_id'];
              this.sTimes = [];
              this.sTimes.push(res.data[key]['time_id']);
            } else {
              this.sTimes.push(res.data[key]['time_id']);
            }
          }
        }

        if (this.timeInterval != this.buildingTimeInterval) {
          for (let day of this.days) {
            this.sTimes = [];
            for (let dayTimes of this.times) {
              this.sTimes.push(dayTimes.id);
            }
            this.weekTimes[day.id] = this.sTimes;
          }
        } else {
          this.sTimes = [...new Set(this.sTimes)];
          this.weekTimes[this.dayId] = this.sTimes;
        }
        this.fillWeekTimes();
      }
    });
  };

  public setTimes() {
    let checks: Array<any> = Array.from(document.getElementsByClassName('check-span'));
    for (let check of checks) {
      check.style.color = 'transparent';
    }
    let keys = Object.keys(this.weekTimes),
      i = 0;
    for (let day of this.weekTimes) {
      if (day === undefined) {
        continue;
      }
      for (let time of day) {
        document.getElementById('time' + keys[i] + time).style.color = 'black';
      }
      i++;
    }
  };

  public addDellTime(id, dayId) {
    let sTimes = this.weekTimes[dayId];
    if (!sTimes) {
      sTimes = this.weekTimes[dayId] = [];
    }
    if (sTimes.indexOf(id) === -1) {
      sTimes.push(id);
    } else {
      sTimes.splice(sTimes.indexOf(id), 1);
    }
    this.weekTimes[dayId] = sTimes;
    this.setTimes();
    return true;
  };

  public fillWeekTimes() {
    this.days.forEach(day => {
      this.weekTimes[day.id] = [];
      this.times.forEach(time => {
        this.weekTimes[day.id].push(time.id);
      })
    })
    this.setTimes();
  }

  public changeType(type) {
    this.buildingTimeInterval = type;
    this.timeInterval = type;

    this.dayId = 1;
    this.days = [];
    this.times = [];
    this.weekTimes = [];

    this.getDays();
  }

  public back(): void {
    this.navigation.back();
  }

  public submit(): void {
    // this.router.navigateByUrl('manager/building/addemail');
    this.loading = true;
    for (let i = 1; i <= 7; i++) {
      if (this.weekTimes[i] === undefined) {
        this.weekTimes[i] = [];
      }
    }
    this.apiService.post(API.manager.setBuildingTimes + this.buildId, {
      dayTimeIds: this.weekTimes,
      set: this.isSet,
      type: this.timeInterval,
      bookingDelay: this.bookingDelay,
    }).subscribe((res) => {
      if (res.result) {
        this.router.navigateByUrl('manager/building/addemail');
      } else {
        this.alert.show(res.message || ERROR.internal);
      }
      this.loading = false;
    });

  }

}

