import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { AlertService } from '../../services/alert.service';
import { API } from '../../shared/constants/api.constants';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-building-templates',
  templateUrl: 'building-email-templates.page.html',
  styleUrls: ['building-email-templates.page.scss'],
})
export class EmailTemplatesPage implements OnInit {

  public buttonText = BUTTONS.submit;
  public limit: boolean = false;
  public buildName = '';
  public companyTitle: string = '';
  public buildId = this.route.snapshot.paramMap.get('buildId');

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService) {
    console.log('building email templates constructor');
  }

  ngOnInit() {
    if (this.buildId) {
      this.getCompanyName();
      this.getBuilding();
    } else this.router.navigateByUrl('manager/buildings')
  }

  public getCompanyName() {
    this.apiService.get(API.manager.getDefaultCompanyTitle)
      .subscribe((response) => {
        if (!response.status) {
          return;
        }
        this.companyTitle = response.companyTitle;
      })
  }

  public getBuilding() {
    this.apiService.get(API.manager.getBuilding + this.buildId)
      .subscribe((response) => {
        if (response.status) {
          this.buildName = response.building.name;
        }
      })
  }

  public redirect(template) {
    this.router.navigateByUrl(`manager/building/${this.buildId}/email-templates/edit/${template}`);
  }

  public back(): void {
    this.navigation.back();
  }

  public logo() {
    this.router.navigateByUrl(`manager/building/${this.buildId}/email-templates/logo/edit`);
  }

  public submitCompanyTitle(): void {
    if (!this.companyTitle) return;
    this.apiService.post(API.manager.setEmailCompanyTitle + this.buildId,
      { 'title': this.companyTitle })
      .subscribe((response) => {
        if (!response.status) {
          this.alert.show(response.message || ERROR.internal);
          return;
        }
        this.alert.show('Success')
      });
  }

}

