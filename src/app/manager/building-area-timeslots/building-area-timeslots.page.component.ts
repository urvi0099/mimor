import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { API } from '../../shared/constants/api.constants';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-area-timeslots',
  templateUrl: 'building-area-timeslots.page.html',
  styleUrls: ['building-area-timeslots.page.scss'],
})
export class BuildingAreaTimeslotsPage implements OnInit {

  public buildName = '';
  public building;
  public areas = [];
  public area;
  public showSaveTooltip = false;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public sDay = 0;

  public sDayName = '';

  public days = [];
  public times = [];
  public sTimes = [];
  public area_id = parseInt(this.route.snapshot.paramMap.get('areaId'))
  public weekTimes = [];
  public dayId = 1;
  public isSet = false;

  public loading = false;
  public loadingType = true;
  public loadingTimes = true;
  public loadingDays = true;

  public timeTypes = {};
  public timeTypesNum = 22;
  public timeInterval = 1;
  public commonAriaTimeInterval = 1;

  public buttonText = BUTTONS.save;
  public areaAllow = true;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService) {
    console.log('building congratulations constructor');
  }

  ngOnInit() {
    for (let i = 1; i <= this.timeTypesNum; i++) {
      this.timeTypes[`${i}`] = `Type ${i}`;
    }
    console.log(this.timeTypes);
    this.getType();
  }

  public returnZero() {
    return 0;
  }

  public getDays() {
    // this.loading = true;
    this.loadingDays = true;

    this.apiService.get(API.manager.getDays).subscribe((res) => {
      console.log(res);
      if (res.result) {
        this.days = res.data;
        this.sDay = this.days[0].id;
        this.sDayName = this.days[0].name;
      }
      this.loadingDays = false;
    });
  };

  public getType() {
    this.apiService.get(API.manager.getTimesType + this.area_id + '/commonAria').subscribe((res) => {
      if (res && res.result) {
        this.commonAriaTimeInterval = res.type;
        this.timeInterval = res.type;
      }

      this.loadingType = false;

      this.getDays();
      this.getTimes();
    });
  }

  public changeType() {
    // this.loading = true;
    this.loadingTimes = true;
    this.loadingDays = true;

    this.dayId = 1;
    this.days = [];
    this.times = [];
    this.weekTimes = [];

    this.getDays();
    this.getTimes();
  }

  public getTimes() {
    // this.loading = true;
    this.loadingTimes = true;

    this.apiService.get(API.manager.getTimes + this.timeInterval).subscribe((res) => {
      console.log(res);
      if (res.data) {
        let time = '',
          sep = ':',
          i = 0;

        for (let i in res.data) {
          time = res.data[i].from + sep + res.data[i].from_min + ' ' + res.data[i].day_part_from + ' - ' +
            res.data[i].to + sep + res.data[i].to_min + ' ' + res.data[i].day_part_to;

          this.times.push({
            id: res.data[i].id,
            time: time,
          });
        }
      }
      this.loadingTimes = false;

      this.getCommonAreaTimes();
    });
  };

  public getCommonAreaTimes = function () {
    this.apiService.post(API.manager.getCommonAreaTimeslots + this.buildId, {
      area_id: this.area_id
    }).subscribe((response) => {
      this.sTimes = [];
      if (response.status === true) {
        this.building = response.building;
        this.area = response.common_area;
        this.area.allow_booking === '1' ? this.area.allow_booking = 'active' :
          this.area.allow_booking = 'block';
        this.times = this.times.map(el => {
          const timeEl = response.common_area_timeslots.find(tm => parseInt(tm.time_id) === parseInt(el.id));
          el.num_of_bookings = timeEl ? timeEl.num_of_bookings : 1;
          el.prev_num = timeEl ? timeEl.num_of_bookings : 1;
          return el;
        })
        for (let day of this.days) {
          for (let key in response.common_area_timeslots) {

            if (this.timeInterval != this.commonAriaTimeInterval) {
              continue;
            }

            if (this.dayId !== response.common_area_timeslots[key]['day_id']) {
              if (response.common_area_timeslots[key]['day_id'] !== day.id) {
                this.dayId = day.id;
                this.sTimes = [];
                this.weekTimes[this.dayId] = this.sTimes;
              }

              this.sTimes = [...new Set(this.sTimes)]
              this.weekTimes[this.dayId] = this.sTimes;
              this.dayId = response.common_area_timeslots[key]['day_id'];
              this.sTimes = [];
              this.sTimes.push(response.common_area_timeslots[key]['time_id']);
            } else {
              this.sTimes.push(response.common_area_timeslots[key]['time_id']);
            }
          }
        }

        if (this.timeInterval != this.commonAriaTimeInterval) {
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
        this.setTimes();
      } else {
        this.alert.show(response.message || ERROR.internal)
        this.router.navigateByUrl('manager/buildings');
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


  public back(): void {
    this.router.navigateByUrl(`manager/building/${this.buildId}/common-areas/show`);
  }

  public submit(): void {
    // this.router.navigateByUrl('manager/buildings')
    console.log('submit');
    this.loading = true;
    let timesBooks = this.weekTimes.map(el => {
      let newEl = el.map(time => {
        let numEl = this.times.find(tm => parseInt(tm.id) === parseInt(time));
        let num;
        if (!numEl) {
          num = 1;
        } else num = numEl.num_of_bookings;
        return { time_id: time, num_of_bookings: num }
      });
      return newEl;
    })
    this.apiService.post(API.manager.saveCommonAreaTimes + this.area_id, {
      dayTimeIds: timesBooks,
      type: this.timeInterval
    }).subscribe((res) => {
      if (res.result) {
        this.router.navigateByUrl(`manager/building/${this.buildId}/common-areas`)
      } else {
        this.alert.show(res.message || ERROR.internal)
      }

      this.loading = false;
    });
  }

}

