import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO, SHARE } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import { API } from '../../shared/constants/api.constants';

@Component({
  selector: 'app-building-share',
  templateUrl: 'building-share.page.html',
  styleUrls: ['building-share.page.scss'],
})
export class BuildingSharePage implements OnInit {

  public buildName = BUILD_INFO.name;
  public loading = false;
  public emails = [];
  public noShareUsersData = false;
  public noShareNewUsersData = false;
  public preloadStatus = false;
  public testOwnerBuildingUser = true;
  public access = 'all';
  public newUser = {
    email: '',
    access: {
      notify_move: true,
      notify_email_sms: true,
      notify_common_area: true,
      send_notifications: true,
      remove_resident: true,
      reports: true,
      parcel_management: true,
      real_estate: true,
      notice_board: true,
      accesses: 'full'
    }
  }
  public shareUsersData = [];
  public shareNewUsersData = [];
  public isParts = false;
  public buildId = this.route.snapshot.paramMap.get('buildId');

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
    if (this.buildId) {
      this.extractDataShare()
    } else this.router.navigateByUrl('manager/buildings');
  }

  public extractDataShare() {
    this.apiService.post(API.manager.shareBuildingExtract + this.buildId, {
      buildId: this.buildId
    }).subscribe((res) => {
      if (res.result) {
        this.shareUsersData = res.share_user;
        this.shareNewUsersData = res.share_new_user;
        this.testOwnerBuildingUser = res.test_owner_building_user;
        this.shareUsersData.forEach((v, i) => {
          this.shareUsersData[i].notify_move = this.shareUsersData[i].notify_move == '1' ? true : false;
          this.shareUsersData[i].notify_email_sms = this.shareUsersData[i].notify_email_sms == '1' ? true : false;
          this.shareUsersData[i].notify_common_area = this.shareUsersData[i].notify_common_area == '1' ? true : false;
          this.shareUsersData[i].send_notifications = this.shareUsersData[i].send_notifications == '1' ? true : false;
          this.shareUsersData[i].remove_resident = this.shareUsersData[i].remove_resident == '1' ? true : false;
          this.shareUsersData[i].reports = this.shareUsersData[i].reports == '1' ? true : false;
          this.shareUsersData[i].parcel_management = this.shareUsersData[i].parcel_management == '1' ? true : false;
          this.shareUsersData[i].real_estate = this.shareUsersData[i].real_estate == '1' ? true : false;
          this.shareUsersData[i].notice_board = this.shareUsersData[i].notice_board == '1' ? true : false;
          this.shareUsersData[i].dropdown = false;
        });
        this.shareNewUsersData.forEach((v, i) => {
          this.shareNewUsersData[i].notify_move = this.shareNewUsersData[i].notify_move == '1' ? true : false;
          this.shareNewUsersData[i].notify_email_sms = this.shareNewUsersData[i].notify_email_sms == '1' ? true : false;
          this.shareNewUsersData[i].notify_common_area = this.shareNewUsersData[i].notify_common_area == '1' ? true : false;
          this.shareNewUsersData[i].send_notifications = this.shareNewUsersData[i].send_notifications == '1' ? true : false;
          this.shareNewUsersData[i].remove_resident = this.shareNewUsersData[i].remove_resident == '1' ? true : false;
          this.shareNewUsersData[i].reports = this.shareNewUsersData[i].reports == '1' ? true : false;
          this.shareNewUsersData[i].parcel_management = this.shareNewUsersData[i].parcel_management == '1' ? true : false;
          this.shareNewUsersData[i].real_estate = this.shareNewUsersData[i].real_estate == '1' ? true : false;
          this.shareNewUsersData[i].notice_board = this.shareNewUsersData[i].notice_board == '1' ? true : false;
          this.shareNewUsersData[i].dropdown = false;
        });
      } else {
        this.noShareUsersData = true;
        this.noShareNewUsersData = true;
      }
    }
    )
  };

  public toggleAccessTypes() {
    this.isParts = this.access === 'all';
    if (!this.isParts) {
      for (let el in this.newUser.access) {
        this.newUser.access[el] = true;
      }
      this.newUser.access.accesses = 'full';
    } else {
      for (let el in this.newUser.access) {
        this.newUser.access[el] = false;
      }
      this.newUser.access.accesses = 'part';
    }
  }

  public shareBuilding() {
    this.apiService.post('/api/share_building/' + this.buildId, {
      emailsSare: this.newUser.email,
      buildId: this.buildId,
      access: this.newUser.access
    }).subscribe((res)=>{
      if(res.result){
        this.alert.show(res.message);
        this.extractDataShare()
      }
    })
  }

  public checkAccess() {
    return !this.newUser.email
  }

  public delEmail(index) {
    this.emails.splice(index, 1);
  };

  public updateTriggerNotifications(val, pivotId, userType) {
    console.log(val, pivotId, userType);
  }

  public delPendingShareUser(index, emailUser, pendingId) {
    console.log(index, emailUser, pendingId)
  }

  public back(): void {
    this.navigation.back();
  }

  public submit(): void {
    // this.router.navigateByUrl('manager/buildings')
  }

}

