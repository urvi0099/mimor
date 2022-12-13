import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import { API } from '../../shared/constants/api.constants';
import { AlertController } from '@ionic/angular';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-building-payments',
  templateUrl: 'building-payments.page.html',
  styleUrls: ['building-payments.page.scss'],
})
export class BuildingPaymentsPage implements OnInit {

  public buildName = BUILD_INFO.name;
  public loading = true;
  public tableHeaders = {
    name: 'Name',
    location: 'Common Area',
    date: 'Date',
    time: 'Time',
    status: 'Type',
    action: 'Action'
  };
  public common_areas = [];
  public areaBookings = [];
  public bondsArr = [];
  public buildId = this.route.snapshot.paramMap.get('buildId');

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
    if (this.buildId) {
      this.getAreas()
    } else this.router.navigateByUrl('manager/buildings');
  }

  public getAreas() {
    this.apiService.post(API.manager.showCommonAreas + this.buildId)
      .subscribe((response) => {
        response.building.common_areas.forEach(area => {
          area.area_booking.forEach(book => {
            let dateFrom = book.date_from.split(' ')[0].split(['-']);
            if (new Date(parseInt(dateFrom[2]), parseInt(dateFrom[1]) - 1, parseInt(dateFrom[0])) > new Date(2021, 7, 31)) {
              this.areaBookings.push({ ...book, area_name: area.name });
            }
          })
        })
        this.getBonds();
      })
  }

  public getBonds() {
    this.loading = true;
    this.bondsArr = [];
    this.apiService.get('/api/common_area/orders/' + this.buildId).subscribe(res => {
      if (res && res.length > 0) {
        res.forEach(el => {
          let data = JSON.parse(JSON.stringify(el));
          const area = this.areaBookings.find(area => parseInt(area.id) === parseInt(data.booking_id));
          if (area) {
            data.area_name = area.area_name;
            data.area_id = area.common_area_id;
            data.date = area.date_from.split(' ')[0].replaceAll('-', '/');
            data.date_from = this.tConvert(area.date_from.split(' ')[1]);
            data.date_to = this.tConvert(area.date_to);
            this.bondsArr.push(data);
          }
        })
        this.loading = false;
      }
      else this.loading = false;
    })
  }

  public returnZero() {
    return 0;
  }

  public tConvert(time) {
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1);
      time[5] = +time[0] < 12 ? ' am' : ' pm';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join('');
  }

  public async rejectRefund(bond) {
    const alert = await this.alertController.create({
      cssClass: 'remove-level',
      header: 'Cancel refund',
      subHeader: 'Please click "Confirm" if you would like to cancel this refund',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: () => {
            this.apiService.post('/api/payment/cancelRefund', { order_id: parseInt(bond.id) }).subscribe(res => {
              this.getBonds();
            })
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  public back(): void {
    this.navigation.back();
  }

  public submit(): void {
    this.router.navigateByUrl('manager/buildings')
  }

}

