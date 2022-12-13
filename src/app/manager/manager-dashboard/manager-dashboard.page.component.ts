import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { API } from '../../shared/constants/api.constants';
import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: 'manager-dashboard.page.html',
  styleUrls: ['manager-dashboard.page.scss'],
})
export class ManagerDashboardPage implements OnInit {

  public buildings;
  public building;
  public activeUsers = [];
  public buildId;
  public access;
  public isShowParcel;
  public isShowTrades;
  public pageLoading = true;
  public isLogSwitchAvail = false;
  public currentActiveUser;
  public visibility;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService) {
    console.log('manager dashboard constructor');
  }

  ngOnInit() {
    this.getBuildings();
    this.buildId = this.route.snapshot.paramMap.get('buildId');
  }

  public getBuildings() {
    this.apiService.get(API.manager.getBuildings).subscribe(res => {
      console.log(res);
      if (res.status) {
        this.buildings = res.buildings;
        let build = this.buildings.find(el => parseInt(el.id) === parseInt(this.buildId));
        // console.log(this.buildings, this.buildId, build);
        this.building = this.buildings.findIndex(el => el.id === build.id);
        console.log(this.buildings[this.building]);
        if (build) {
          this.getBuildingInfo(this.buildId);
          this.getActiveBuildingUsers(this.buildId);
        } else {
          this.router.navigateByUrl('manager/buildings');
        };
      }
    })
  }

  public getBuildingInfo(buildingId) {
    this.apiService.get(API.manager.getBuilding + buildingId)
      .subscribe((response) => {
        if (response.status) {
          this.visibility = response.building.status === 'active';
          this.apiService.get(API.manager.info + buildingId).subscribe(res => {
            this.access = res.data;
            this.pageLoading = false;
          }),() => {
            this.pageLoading = false;
          }
          this.isShowParcel = response.building.allow_parcels;
          if (response.building.allow_trades === '1') {
            this.isShowTrades = true;
          }
        }
      });
  }

  public getActiveBuildingUsers(buildingId) {
    this.apiService.get(API.manager.getActiveBuildingUsers + buildingId)
      .subscribe(res => {
        console.log(res);
        if (!res.status) {
          this.alert.show(res.message || ERROR.internal);
          return;
        }
        this.activeUsers = res.activeUsers;

      });
  }

  public loginAsResident() {
    this.apiService.post(API.manager.loginAsResident + this.currentActiveUser,
      { 'buildingId': this.buildId })
      .subscribe(res => {
        if (!res.status) {
          this.alert.show(res.message || ERROR.internal)
          return;
        }
        this.router.navigateByUrl('resident/dashboard');
      });
  }

  public isLogSwitchAvailable() {
    this.apiService.get('/auth/isLogSwitchAvail')
      .subscribe(res => {
        if (res.status) {
          this.isLogSwitchAvail = true;
        }
      });
  }

  public changeVisibility() {
    this.apiService.post(API.manager.saveBuildingStatus + this.buildId).subscribe(res => {
      if (res.status) {
        return;
      }
      this.alert.show(res.message || ERROR.internal);
    }, () => {
      this.alert.show(ERROR.internal);
    });
  }

  public redirect(url, edit) {
    let isEdit = edit ? '/edit' : ''
    this.router.navigateByUrl(`manager/building/${this.buildId}/${url}` + isEdit);
  }

  public back(): void {
    this.router.navigateByUrl('manager/buildings')
  }

  public submit(): void {
  }

}

