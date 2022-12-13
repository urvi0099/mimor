import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { environment } from '../../../environments/environment';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { API } from '../../shared/constants/api.constants';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-resident-areas',
  templateUrl: './resident-areas.page.html',
  styleUrls: ['./resident-areas.page.scss'],
})
export class ResidentAreasPage implements OnInit {

  public building;
  public areas = [];
  public common_areas = [];
  public bookingList = [];
  public areaName: string;
  public areaRules: string;
  public showingRules: boolean = false;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public pageLoading = true;
  public env = environment;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private apiService: ApiService,
    private alert: AlertService,
    private alertController: AlertController) {
    console.log('resident areas constructor');
  }

  ngOnInit() {
    if (this.buildId) {
      this.getBuilding();
    } else this.router.navigateByUrl('resident/dashboard')
  }

  public getBuilding() {
    this.apiService.post(API.manager.showCommonAreas + this.buildId, { 'order_by_date': true }).subscribe((response) => {
      if (response.status) {
        console.log(response);
        this.pageLoading = false;
        this.building = response.building;
        for (let m in this.building.common_areas) {
          this.common_areas[m] = this.building.common_areas[m].name;
        }
        this.areas = response.building.common_areas;
        console.log(this.areas);

        this.building.common_areas.forEach((area) => {
          if (!area.area_booking.length) {
            return;
          }
          area.area_booking.forEach((area_booking) => {
            area_booking.name = area.name;
            this.bookingList.push(area_booking);
          });
        });
        // this.files = response.files;
        if (this.areaRules) {
          this.showRules(this.areaRules);
        }
      } else {
        this.alert.show(response.message || ERROR.internal);
      }
    });
  }

  public back(): void {
    this.router.navigateByUrl('resident/dashboard')
  }

  public showRules(id) {
    let area = this.areas.find(area => area.id === id);
    this.areaName = area.name;
    this.areaRules = area.rules;
    this.showingRules = true;
  }

  public getDateWithYearTo12(timeString = '') {
    let reg = /^(\d{2}-\d{2}-\d{4})\s(\d{2}):(\d{2})$/;
    let match = timeString.match(reg)

    if (match && match[1] && match[2] && match[3]) {
      let year: any = match[1],
        hour: any = +match[2],
        minute: any = +match[3];

      if (isNaN(hour) || isNaN(minute)) {
        return '';
      }
      if (hour >= 0 && hour < 12) {
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;

        return `${year} ${hour}:${minute} am`;
      } else if (hour === 12) {
        minute = minute < 10 ? '0' + minute : minute;

        return `${year} ${12}:${minute} pm`;
      } else {
        hour -= 12;
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;

        return `${year} ${hour}:${minute} pm`;
      }

    }
    return '';
  }

  public getDateTo12(timeString = '') {

    let reg = /^(\d{2}):(\d{2})$/;
    let match = timeString.match(reg)

    if (match && match[1] && match[2]) {
      let hour: any = +match[1],
        minute: any = +match[2];

      if (isNaN(hour) || isNaN(minute)) {
        return '';
      }
      if (hour >= 0 && hour < 12) {
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        return `${hour}:${minute} am`;
      } else if (hour === 12) {
        return `${hour}:${minute < 10 ? '0' + minute || 0 : minute} pm`;
      } else {
        hour -= 12;
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        return `${hour}:${minute} pm`;
      }

    }
  }

  public editAreaBooking(area, bookingId) {
    console.log(area);
    this.router.navigateByUrl(`resident/book-area/${area.building_id}/${area.id}/time/${bookingId}/edit`)
  }

  public async deleteAreaBooking(area_id, booking_id, area_name, date_from) {
    console.log('delete area', area_id, booking_id, area_name, date_from);
    const alert = await this.alertController.create({
      cssClass: 'resident-modal',
      header: 'Confirm',
      message: `Would you like to remove this booking - ${area_name} on ${date_from}?'`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.apiService.delete(API.client.deleteCommonAreaBooking + booking_id).subscribe((response) => {
              if (response.status) {
                console.log(response)
                for (let i in this.building.common_areas) {
                  if (this.building.common_areas[i].id == area_id) {
                    for (let j in this.building.common_areas[i].area_booking) {
                      if (this.building.common_areas[i].area_booking[j].id == booking_id) {
                        this.building.common_areas[i].area_booking.splice(j, 1);
                      }
                    }
                  }
                }
              } else {
                this.alert.show(response.message || ERROR.internal);
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  public checkFreeArea(area) {
    this.router.navigateByUrl(`resident/book-area/${area.building_id}/${area.id}/time`)
  }

}
