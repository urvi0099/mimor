import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import { API } from '../../shared/constants/api.constants';
import { ERROR } from '../../shared/constants/errors.constants';


@Component({
  selector: 'app-building-estate',
  templateUrl: 'building-real-estate.page.html',
  styleUrls: ['building-real-estate.page.scss'],
})
export class BuildingRealEstate implements OnInit {

  public buildName = BUILD_INFO.name;
  public trustedEmailInput = '';
  public buildId;
  public loading;
  public building;
  public trustedEmailList;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService,
    private alertController: AlertController) {
    console.log('building congratulations constructor');
  }

  ngOnInit() {
    this.buildId = this.route.snapshot.paramMap.get('buildId');
    if (this.buildId) {
      this.getBuilding();
    } else this.router.navigateByUrl('manager/buildings');
  }

  public getBuilding() {
    this.apiService.get(API.manager.getBuilding + this.buildId + '?trusted_emails=1')
      .subscribe((response) => {
        if (!response.status) {
          this.loading = false;
          this.alert.show(response.message || ERROR.internal);
          this.router.navigateByUrl('manager/buildings');
        }
        this.building = response.building;
        this.buildName = response.building.name;
        this.trustedEmailList = response.building.trusted_emails;
        this.trustedEmailList.forEach((v, i) => {
          this.trustedEmailList[i].pivot.notify_move = this.trustedEmailList[i].pivot.notify_move == 1 ? true : false;
          this.trustedEmailList[i].pivot.notify_email_sms = this.trustedEmailList[i].pivot.notify_email_sms == 1 ? true : false;
        });
        this.loading = false;
        return;
      }, () => {
        this.loading = false;
        this.router.navigateByUrl('manager/buildings');
      });
  }

  public submit() {
    if (!this.trustedEmailInput.length) {
      return;
    }
    this.loading = true;
    this.apiService.post(API.manager.addTrustedEmail + this.buildId, {
      'email': this.trustedEmailInput,
      'trusted_list': this.trustedEmailList,
    }).subscribe((response) => {
      if (!response.status) {
        this.loading = false;
        this.alert.show(response.message || ERROR.internal);
        this.router.navigateByUrl('manager/buildings');
        return
      }
      this.getBuilding();
      this.loading = false;
      return false;
    }, () => {
      this.loading = false;
    });
  }

  public triggerNotification(newVal, id, index, type) {
    if (!id) {
      return;
    }
    this.apiService.post(API.manager.triggerNotify + this.buildId, {
      'pivot_id': id,
      'type': type,
      'new_val': newVal,
    }).subscribe((resp) => {
      if (!resp.status) {
        this.alert.show(resp.message || ERROR.internal);
        return;
      }
    });
  }

  public async showConfirm(email) {
    const alert = await this.alertController.create({
      cssClass: 'remove-level',
      header: 'Confirm',
      subHeader: `Would you like to remove the ${email} email?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: () => {
            this.deleteEmail(email);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  public deleteEmail(email) {
    if (!email.length) {
      return false;
    }

    this.loading = true;
    this.apiService.post('/api/manager/deleteTrustedEmail/' + this.buildId, {
      'email': email
    }).subscribe((response) => {
      if (!response.status) {
        this.loading = false;
        this.alert.show(response.message || ERROR.internal);
        return;
      }
      this.getBuilding();
      this.loading = false;
      return;
    }, () => {
      this.loading = false;
    });
  }

  public back(): void {
    this.navigation.back();
  }

}

