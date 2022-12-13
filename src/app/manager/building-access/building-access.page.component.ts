import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { API } from '../../shared/constants/api.constants';

@Component({
  selector: 'app-building-access',
  templateUrl: 'building-access.page.html',
  styleUrls: ['building-access.page.scss'],
})
export class BuildingAccessPage implements OnInit {

  public buildName;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public bookingList = [];
  public uniqueUsers = [];
  public userListOutput;
  public emailUsers = [];
  public moveOutRequestData = [];
  public loading;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService,
    private alertController: AlertController) {
    console.log('building access constructor');
  }

  ngOnInit() {
    if (this.buildId) {
      this.getBuilding();
    } else this.router.navigateByUrl('manager/buildings')
  }

  public getBuilding() {
    this.apiService.get(API.manager.getBuilding + this.buildId).subscribe((response) => {
      if (response.status) {
        this.buildName = response.building.name;
        this.getBookings();
        return;
      }
      this.alert.show(response.message || ERROR.internal);
      this.router.navigateByUrl('manager/buildings');
    }, () => {
      this.router.navigateByUrl('manager/buildings');
    });
  }

  public getBookings() {
    this.apiService.get(API.manager.getActiveBookings + this.buildId)
      .subscribe((resp) => {
        if (!resp.status) {
          return;
        }
        this.bookingList = resp.bookings;
        this.bookingList.forEach((val, index) => {
          this.bookingList[index]['doMoveOut'] = false;
          this.bookingList[index]['commonAreas'] = val.user.com_areas_allowed == '0' ? false : true;
          if (!this.uniqueUsers.includes(val.user_id)) {
            this.uniqueUsers.push(val.user_id);
          }
        });
        return;
      }, (resp) => {
        this.alert.show(resp.message || ERROR.internal)
        return false;
      });
  }

  public getFormattedDate(date) {
    if (typeof date === 'string') {
      let regexp = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/,
        dateParts;
      dateParts = date.match(regexp);
      if (!dateParts) {
        return '';
      }
      date = new Date(dateParts[1], dateParts[2] - 1, dateParts[3],
        dateParts[4], dateParts[5], dateParts[6]);
      if (isNaN(date.getTime())) {
        return '';
      }
    } else if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }
    let year = date.getFullYear(),
      month = date.getMonth(),
      day = date.getDate(),
      hours = date.getHours(),
      mins = date.getMinutes(),
      ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12 ? hours % 12 : 12;
    hours = hours > 9 ? hours : '0' + hours;
    month = month > 9 ? month : '0' + month;
    mins = mins > 9 ? mins : '0' + mins;
    day = day > 9 ? day : '0' + day;

    return year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ' ' + ampm;
  }

  public changeAccess(access, booking) {
    let ids = [];
    if (!booking) {
      ids = this.uniqueUsers;
    } else {
      ids = [booking.user_id];
    }
    this.apiService.post(API.manager.setCommonAreasAllowed, {
      ids,
      com_areas_allowed: !access
    }).subscribe((res) => {
      if (res.status === 'success') {
        this.getBookings();
        return;
      }
      this.alert.show(res.message || ERROR.internal);
    })
  }

  public back(): void {
    this.navigation.back();
  }

  public async submit() {
    this.userListOutput = '<ul class="mim-move-out-list" style="list-style:none ;">';
    this.bookingList.forEach((val) => {
      if (val.doMoveOut) {
        this.emailUsers.push(val);
        this.moveOutRequestData.push(val.id);
        this.userListOutput += '<li style="padding-left:8px;">' + val.user.name + (val.apartment.name) + ': ' + this.getFormattedDate(val.date_from) + ' - ' + this.getFormattedDate(val.date_to) + '</li>';
      }
    });
    if (!this.moveOutRequestData.length) {
      this.alert.show('No users has been selected');
      return;
    }
    this.userListOutput += '</ul>';
    const alert = await this.alertController.create({
      cssClass: 'moveout-confirm',
      header: 'Are you sure you would like to remove these residents from this building?',
      subHeader: '',
      message: this.userListOutput,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: () => {
            this.deleteConfirm();
          }
        }
      ]
    });
    await alert.present();
  }

  public deleteConfirm() {
    let dateOut,
      date = new Date(),
      year = date.getFullYear(),
      month: any = date.getMonth() + 1,
      day: any = date.getDate(),
      hours: any = date.getHours(),
      mins: any = date.getMinutes(),
      secs: any = date.getSeconds();

    hours = hours > 9 ? hours : '0' + hours;
    month = month > 9 ? month : '0' + month;
    mins = mins > 9 ? mins : '0' + mins;
    day = day > 9 ? day : '0' + day;
    secs = secs > 9 ? secs : '0' + secs;

    dateOut = year + '-' + month + '-' + day + ' ' + hours + ':' + mins + ':' + secs;
    this.loading = true;
    this.apiService.put(API.manager.moveOutCustomers + this.buildId, { 'bookingList': this.moveOutRequestData, 'date': dateOut })
      .subscribe((resp) => {
        if (!resp.status) {
          this.alert.show(resp.message || ERROR.internal);
          this.loading = false;
          return;
        }
        this.apiService.post(API.manager.sendMoveOutEmails + this.buildId, {
          bookingList: this.emailUsers,
        }).subscribe((response) => {
          if (response.status) {
            this.alert.show(response.message || 'Success');
          } else {
            this.alert.show(response.message || ERROR.internal);
          }
          this.getBuilding();
          this.loading = false;
        }, () => {
          this.getBuilding();
          this.loading = false;
        });
        return;
      }, (resp) => {
        this.alert.show(resp.message || ERROR.internal);
        return;
      });

  }
}

