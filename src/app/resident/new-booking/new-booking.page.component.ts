import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { API } from '../../shared/constants/api.constants';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.page.html',
  styleUrls: ['./new-booking.page.scss'],
})
export class NewBookingPage implements OnInit {

  public buildAuto = new FormControl();
  public apartment = new FormControl();
  public buildings = [];
  public filteredBuilds: Observable<Array<any>>;
  public selectedBuild: any;
  public building;
  public selectedAp: any;
  public apartments: any = [];

  public model: any = {
    user_status: "Resident",
    is_residing: 1
  }
  public buttonText: string = BUTTONS.next;
  public environment = environment;

  public currentApartment: any = false;
  public showApartment: boolean = false;

  constructor(private router: Router,
    private rolesService: RolesService,
    private apiService: ApiService,
    private alert: AlertService) {
    console.log('new booking constructor');
  }

  ngOnInit() {
    this.filteredBuilds = this.buildAuto.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(value => this._filter(value))
      );
  }

  private _filter(name: string) {
    const filterValue = name ? name.toLowerCase() : '';
    return this.apiService.get(API.client.buildingByName + filterValue).pipe(
      filter(data => !!data),
      map((data) => {
        return data.models
      })
    )
  }

  public displayFn(build: any): string {
    return build && build.name && build.address ? build.name + ' - ' + build.address : '';
  }

  public selectBuild(value): void {
    this.selectedBuild = value;
    this.building = value;
    this.buildAuto.setValue(value);
  }

  public getApartments() {
    this.apiService.get(API.client.apartments + `?buildId=${this.building.id}`)
      .subscribe((response) => {
        if (response.status) {
          this.apartments = response.apartments;
          this.building = response.building;
          this.showApartment = true;
          // this.loading = false;
          return;
        }
        this.alert.show(response.message || ERROR.internal)
        this.router.navigateByUrl('resident/dashboard');
      }, () => {
        this.router.navigateByUrl('resident/dashboard');
      });
  };

  public selectApartment(value): void {
    this.selectedAp = value;
  }

  public changeResidingStatus(): void {
    console.log('changed', this.model.user_status);
  }

  public proceed(): void {
    this.getApartments();
    this.showApartment = true;
  }

  public nextButton() {
    this.apiService.put(API.client.setApartment, {
      appartmentId: this.selectedAp,
      tenant_info: this.model,
      isNewBooking: ['/new-booking']
    }).subscribe((response) => {
      if (!response.status) {
        this.alert.show(response.message || ERROR.internal);
        return;
      }
      if (this.model.tenant_role === 'Owner' && this.model.isResidenting != "1") {
        this.apiService.post(API.client.nonResidingBooking,
          {
            apartment_id: this.selectedAp,
            date: this.getCurrentDateForServer(),
          })
          .subscribe((resp) => {
            if (!resp.data.status) {
              this.alert.show(response.message || ERROR.internal);
              this.router.navigateByUrl('resident/dashboard');
              return;
            }
            this.apiService.post(API.client.sendToEmail + resp.building_id, {
              'bookLater': true,
              'booking': resp.booking_id
            })
              .subscribe((resp) => {
                if (!resp.status) {
                  this.alert.show(resp.message || ERROR.internal);
                }
                this.router.navigateByUrl('resident/dashboard');
                return;
              });
            return;
          })
      } else {
        this.router.navigateByUrl('resident/dashboard');
        return;
      }
    })
  }

  public getCurrentDateForServer(date = new Date()) {
    if (date) {
      if (isNaN(date.getTime())) {
        return null;
      }
      let day: any = date.getDate();
      let month: any = date.getMonth() + 1;
      let year: any = date.getFullYear();
      let hour: any = date.getHours();
      let min: any = date.getMinutes();
      let sec: any = date.getSeconds();

      day = day < 10 ? '0' + day : day;
      month = month < 10 ? '0' + month : month;

      hour = hour < 10 ? '0' + hour : hour;
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;

      return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
    } else {
      return null;
    }
  }

  public back(): void {
    this.router.navigateByUrl('resident/dashboard')
  }

  public submit(): void {

  }

}
