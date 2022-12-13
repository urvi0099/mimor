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
  selector: 'app-trade',
  templateUrl: 'manager-trade-add.page.html',
  styleUrls: ['manager-trade-add.page.scss'],
})
export class ManagerTradePage implements OnInit {

  public services = [{
    id: 1,
    name: 'Plumber'
  }];
  public trades = [];
  public filteredTrades = [];
  public selectedService = this.services[0];
  public isAll = true;
  public contacts = {
    emails: [],
    phones: []
  };
  public name = '';
  public email = '';
  public phone = '';
  public loading: boolean = false;
  public trade;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public tradeId = this.route.snapshot.paramMap.get('tradeId');
  public dataToSend;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService,
    private alertController: AlertController) {
    console.log('manager add trade constructor');
  }

  ngOnInit() {
    if (this.buildId) {
      this.getTrades();
    } else this.router.navigateByUrl('manager/buildings');
  }

  public getTrades() {
    this.apiService.get('/api/manager/building/' + this.buildId + '/trades').subscribe((response) => {
      if (response && response.status === true) {
        this.trades = response.data;
        this.getServices();
        return;
      }
      this.alert.show(response.message || ERROR.internal)
      this.router.navigateByUrl('manager/dashboard' + this.buildId);
    }, () => {
      this.router.navigateByUrl('manager/dashboard' + this.buildId);
    });
  };

  public getServices() {

    this.apiService.get(API.manager.services).subscribe((response) => {
      if (response) {
        let data = response;
        if (data.length !== 0 && data.status) {
          this.services = data.data;
          this.selectedService = this.services[0];
        }
        if (this.tradeId) {
          this.trade = this.trades.find(el => el.id === this.tradeId);
          this.trade.emails.length > 1 ? this.contacts.emails = this.trade.emails : this.email = this.trade.emails[0];
          this.trade.mobiles.length > 1 ? this.contacts.phones = this.trade.mobiles : this.phone = this.trade.mobiles[0];
          this.name = this.trade.name;
          this.selectedService = this.services.find(el => el.id === this.trade.service_id);
        }
      }
    });

  }

  public addNewEmail() {
    this.contacts.emails.push(this.email);
    this.email = '';
  };
  public addNewPhone() {
    this.contacts.phones.push(this.phone);
    this.phone = '';
  };
  public removeEmail(email) {
    this.contacts.emails.splice(email, 1);
  };
  public removePhone(phone) {
    this.contacts.phones.splice(phone, 1);
  };

  public enterKey(event): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      return false;
    } else {
      return true;
    }
  }

  public checkDublicates(): boolean {
    let emailsData = JSON.parse(JSON.stringify(this.contacts.emails));
    emailsData.push(this.email);
    let phonesData = JSON.parse(JSON.stringify(this.contacts.phones));
    phonesData.push(this.phone);
    return (new Set(emailsData).size !== emailsData.length ||
      new Set(phonesData).size !== phonesData.length)
  }

  public submit() {
    this.loading = true;
    let emailsData = JSON.parse(JSON.stringify(this.contacts.emails));
    emailsData.push(this.email);
    let phonesData = JSON.parse(JSON.stringify(this.contacts.phones));
    phonesData.push(this.phone);
    this.dataToSend = {
      name: this.name,
      service_id: this.selectedService.id,
      emails: emailsData,
      mobiles: phonesData
    };
    if(this.tradeId){
      this.editTrade();
    } else this.addTrade();
  }

  public editTrade(){
    this.apiService.put('/api/manager/building/' + this.buildId + '/trades/' + this.tradeId, this.dataToSend)
    .subscribe((response) => {
      if (response && response.status) {
       this.router.navigateByUrl('manager/building/' + this.buildId + '/trades');
        return;
      }
      this.alert.show(response.message || ERROR.internal);
      this.loading = false;
    });
  }

  public addTrade(){
    this.apiService.post('/api/manager/building/' + this.buildId + '/trades', this.dataToSend)
    .subscribe((response) => {
      if (response && response.status) {
       this.router.navigateByUrl('manager/building/' + this.buildId + '/trades');
        return;
      }
      this.alert.show(response.message || ERROR.internal);
      this.loading = false;
    });
  }

  public back(): void {
    this.navigation.back();
  }

}

