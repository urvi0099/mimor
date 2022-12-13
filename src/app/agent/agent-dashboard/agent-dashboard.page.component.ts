import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AlertService } from '../../services/alert.service';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { API } from '../../shared/constants/api.constants';
import { ERROR } from '../../shared/constants/errors.constants';
import {
  BUILD_INFO,
  contDets,
  cont_det_switchers,
  mockBookings,
  mockModel,
} from '../../shared/constants/mock';
import { ContactModal } from '../../shared/modals/contact/contact.component';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: 'agent-dashboard.page.html',
  styleUrls: ['agent-dashboard.page.scss'],
})
export class AgentDashboardPage implements OnInit {
  public building;
  public mockModel = mockModel;
  public cont_det_switchers;
  public contDets;
  public buildAuto = new FormControl();
  public filteredBuilds: Observable<Array<any>>;
  public selectedBuild: any;
  public buildings: [];
  public environment = environment;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public rolesService: RolesService,
    private modalController: ModalController,
    private alert: AlertService
  ) {
    console.log('agent dashboard constructor');
  }

  ngOnInit() {
    this.filteredBuilds = this.buildAuto.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((value) => this._filter(value))
    );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.apiService.get(API.client.buildingByName + filterValue).pipe(
      filter((data) => !!data),
      map((data) => {
        return data.models;
      })
    );
  }

  public displayFn(build: any): string {
    return build && build?.name && build?.address
      ? build?.name + ' - ' + build?.address
      : '';
  }

  public selectBuild(value): void {
    this.selectedBuild = value;
    this.building = this.selectedBuild;
    console.log(value);
  }

  public showContactDetails() {
    this.apiService
      .get(API.client.getContDetails + this.building.id)
      .subscribe((response) => {
        if (!response.status) {
          this.alert.show(response.message || ERROR.internal);
          return false;
        }
        this.cont_det_switchers = {
          company: {},
          contact: {},
        };
        this.contDets = {};
        if (!response.info) {
          this.cont_det_switchers = response.switchers;
          this.contDets = response.cont_details;
        }
        this.showConfirmation();
      });
  }

  public async showConfirmation() {
    const modal = await this.modalController.create({
      component: ContactModal,
      cssClass: 'building-contacts-modal',
      componentProps: {
        model: { building: this.selectedBuild },
        cont_det_switchers: this.cont_det_switchers,
        contDets: this.contDets,
      },
    });
    return await modal.present();
  }

  public redirect(url) {
    if (url === 'profile') {
      this.router.navigateByUrl(`agent/${url}`);
    } else this.router.navigateByUrl(`agent/${url}/${this.building.id}`);
  }
}
