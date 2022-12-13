import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { AlertService } from '../../services/alert.service';
import { TEMPLATES, TEMPLATE_TITLES } from '../../shared/constants/templates.constants';
import { emailConfig } from '../../shared/constants/config.constants';
import { API } from '../../shared/constants/api.constants';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-building-template',
  templateUrl: 'building-email-template.page.html',
  styleUrls: ['building-email-template.page.scss'],
})
export class EmailTemplatePage implements OnInit {

  public buttonText = BUTTONS.save;
  public emailConfig = emailConfig;
  public limit: boolean = false;
  public buildName = '';
  public emailTemplateType = this.route.snapshot.paramMap.get('emailTemplateType');
  public emailTitles = TEMPLATE_TITLES;
  public emailTemplate = '';
  public templateTitle = this.emailTitles[this.emailTemplateType];
  public defaultTemplates = TEMPLATES;
  public building;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public isParcelesAvailable;
  public loading;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService) {
    console.log('building email template constructor');
  }

  ngOnInit() {
    if (this.buildId) {
      this.getTemplates();
    } else this.router.navigateByUrl('manager/buildings')
  }

  public getTemplates() {
    this.apiService.get(API.manager.getBuilding + this.buildId + '/?email_templates=true')
      .subscribe((response) => {
        if (response.status) {
          this.building = response.building;
          this.buildName = this.building.name;
          this.isParcelesAvailable = !!+response.building.allow_parcels;

          if (!this.building.is_email_editable) {
            this.alert.show(response.message || ERROR.internal)
            this.router.navigateByUrl('manager/dashboard/' + this.buildId)
            return;
          }
          switch (this.emailTemplateType) {
            case 'welcome':
              this.emailTemplate = this.building.email_welcome ? this.building.email_welcome : '';
              break;
            case 'move_in':
              this.emailTemplate = this.building.email_move_in ? this.building.email_move_in : '';
              break;
            case 'move_out_create':
              this.emailTemplate = this.building.email_templates.move_out_create ?
                this.building.email_templates.move_out_create : '';
              break;
            case 'lift_create':
              this.emailTemplate = this.building.email_templates.lift_create ?
                this.building.email_templates.lift_create : '';
              break;
            case 'comm_area_update':
              this.emailTemplate = this.building.email_templates.comm_area_update ?
                this.building.email_templates.comm_area_update : '';
              break;
            case 'comm_area_create':
              this.emailTemplate = this.building.email_templates.comm_area_create ?
                this.building.email_templates.comm_area_create : '';
              break;
            case 'comm_area_delete':
              this.emailTemplate = this.building.email_templates.comm_area_delete ?
                this.building.email_templates.comm_area_delete : '';
              break;
            case 'lift_delete':
              this.emailTemplate = this.building.email_templates.lift_delete ?
                this.building.email_templates.lift_delete : '';
              break;
            case 'move_in_delete':
              this.emailTemplate = this.building.email_templates.move_in_delete ?
                this.building.email_templates.move_in_delete : '';
              break;
            case 'move_out_delete':
              this.emailTemplate = this.building.email_templates.move_out_delete ?
                this.building.email_templates.move_out_delete : '';
              break;
            case 'lift_update':
              this.emailTemplate = this.building.email_templates.lift_update ?
                this.building.email_templates.lift_update : '';
              break;
            case 'move_out_update':
              this.emailTemplate = this.building.email_templates.move_out_update ?
                this.building.email_templates.move_out_update : '';
              break;
            case 'move_in_update':
              this.emailTemplate = this.building.email_templates.move_in_update ?
                this.building.email_templates.move_in_update : '';
              break;
            case 'notification':
              this.emailTemplate = this.building.email_templates.notification ?
                this.building.email_templates.notification : '';
              break;
            case 'parcel_create':
              this.emailTemplate = this.building.email_templates.parcel_create ?
                this.building.email_templates.parcel_create : '';
              break;
            case 'already_move_in':
              this.emailTemplate = this.building.email_templates.already_move_in ?
                this.building.email_templates.already_move_in : '';
              break;
            case 'already_move_out':
              this.emailTemplate = this.building.email_templates.already_move_out ?
                this.building.email_templates.already_move_out : '';
              break;
          }

          if (!this.emailTemplate) {
            if (this.defaultTemplates[this.emailTemplateType]) {
              this.emailTemplate = this.defaultTemplates[this.emailTemplateType];
            } else {
              this.emailTemplate = '';
            }
          }
        }
      }
      )
  }

  public back(): void {
    this.navigation.back();
  }

  public resetEmail() {
    if (this.defaultTemplates[this.emailTemplateType]) {
      this.emailTemplate = this.defaultTemplates[this.emailTemplateType];
    } else {
      this.emailTemplate = '';
    }
  }

  public submit(): void {
    console.log('submit');
    if (this.loading) {
      return;
    }
    if ('notification' === this.emailTemplateType) {
      if (!/\[message\]/.test(this.emailTemplate)) {
        this.alert.show('You must place a [message] place holder for this type of template, please insert it or restore to default if unsure');
        return;
      }
    }
    let data = {
      'emailTemplate': {
        'type': this.emailTemplateType,
        'content': this.emailTemplate,
      }

    }
    this.loading = true;
    this.apiService.put(API.manager.saveInfo + this.buildId, data).subscribe((response) => {
      if (response.status) {
        this.router.navigateByUrl('manager/dashboard/' + this.buildId)
        return;
      }
      this.alert.show(response.message || ERROR.internal);
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }

}

