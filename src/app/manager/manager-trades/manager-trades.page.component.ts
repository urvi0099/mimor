import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import { API } from '../../shared/constants/api.constants';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-trades',
  templateUrl: 'manager-trades.page.html',
  styleUrls: ['manager-trades.page.scss'],
})
export class ManagerTradesPage implements OnInit {

  public services = [{
    id: "0",
    name: "All Services",
  }];
  public trades = [];
  public filteredTrades = [];
  public selectedService = this.services[0];
  public isAll = true;
  public buildId = this.route.snapshot.paramMap.get('buildId');

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService,
    private alertController: AlertController) {
    console.log('manager trades constructor');
  }

  ngOnInit() {
    if (this.buildId) {
      this.getServices();
    } else this.router.navigateByUrl('manager/buildings');
  }

  public getServices() {
    this.apiService.get(API.manager.services).subscribe((response) => {
      if (response && response.data &&
        response.data.length !== 0 &&
        response.status) {
        let data = response.data;
        for (let i = 0; i < data.length; i++) {
          this.services.push(data[i]);
        }
        this.selectedService = this.services[0];
        this.getTrades();
        return;
      }
      this.alert.show(response.message || ERROR.internal)
      this.router.navigateByUrl('manager/dashboard' + this.buildId);
    });
  }

  public getTrades() {
    this.apiService.get('/api/manager/building/' + this.buildId + '/trades').subscribe((response) => {
      if (response && response.status === true) {
        this.trades = response.data;
        this.onServiceChange();
        return;
      }
      this.alert.show(response.message || ERROR.internal)
      this.router.navigateByUrl('manager/dashboard' + this.buildId);
    }, () => {
      this.router.navigateByUrl('manager/dashboard' + this.buildId);
    });
  };

  public onServiceChange = function () {
    this.filteredTrades = [];
    for (var i = 0; i < this.trades.length; i++) {
      if (this.selectedService.id === '0') {
        this.isAll = true;
        for (var j = 1; j < this.services.length; j++) {
          if (i === 0) {
            this.filteredTrades.push({ service: this.services[j].name, trades: [] })
          }
          if (this.trades[i].service_id === this.services[j].id) {
            this.filteredTrades[j - 1].trades.push(this.trades[i]);
          }
        }
      } else {
        this.isAll = false;
        if (this.trades[i].service_id === this.selectedService.id) {
          this.filteredTrades.push(this.trades[i]);
        }
      }
    }
  };

  public async showConfirm(tradeId) {
    const alert = await this.alertController.create({
      cssClass: 'remove-level',
      header: 'Confirm',
      subHeader: 'Are you sure you want to delete this trade??',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: () => {
            this.deleteTrade(tradeId);
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  public deleteTrade(id) {
    console.log('delete');
    this.apiService.delete('/api/manager/building/' + this.buildId + '/trades/' + id).subscribe((response) => {
      this.getTrades();
    });
  }

  public editTrade(id) {
    this.router.navigateByUrl(`manager/building/${this.buildId}/edit-trade/${id})`);
  }

  public giveAccess(id) {
    this.router.navigateByUrl(`manager/building/${this.buildId}/give-access/${id}`);
  }

  public back(): void {
    this.navigation.back();
  }

  public submit() {
    this.router.navigateByUrl(`manager/building/${this.buildId}/add-trade`);
  }

}

