import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { AlertService } from '../../services/alert.service';
import { API } from '../../shared/constants/api.constants';

@Component({
  selector: 'app-building-emails',
  templateUrl: 'building-emails.page.html',
  styleUrls: ['building-emails.page.scss'],
})
export class BuildingEmailsPage implements AfterViewInit, OnInit, OnDestroy {

  public buttonText = BUTTONS.next;
  public emails = [];
  public limit: boolean = false;
  @ViewChildren('input') inputs: QueryList<ElementRef>;
  public alive: boolean = true;
  public buildId;
  public building;
  public currentManager;
  public noSave;
  public indexHide;
  public buildName;
  public isEdit;
  public noEmails = false;
  public mailSave = [];

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService) {
    console.log('building emails constructor');
  }

  ngOnInit() {
    this.isEdit = this.route.snapshot.routeConfig.path.split('/')[3] === 'edit';
    console.log(this.isEdit);
    this.buildId = this.route.snapshot.paramMap.get('buildId');
    if (this.isEdit) {
      this.getBuilding();
    }
  }

  ngAfterViewInit() {
    this.inputs.last && this.inputs.last.nativeElement.focus()
    this.inputs.changes.pipe(takeWhile(() => this.alive)).subscribe(() => {
      if (this.inputs.length)
        this.inputs.last.nativeElement.focus()
    })
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public getBuilding() {
    this.apiService.get(API.manager.getBuilding + this.buildId + '?mnginfo=true').subscribe(response => {
      if (response.status) {
        this.building = response.building;
        this.currentManager = response.mnginfo;
        console.log(this.currentManager);
        this.emails.push({ 'value': this.currentManager.email });
        this.noSave = 1;
        this.indexHide = 0;
        this.buildName = this.building.name;
        if (this.building.owners_corp_contact_email) {
          this.emails.push({ 'value': this.building.owners_corp_contact_email });
          this.indexHide += 1;
          this.noSave += 1;
        }
        if (!this.isEdit) {
          this.noEmails = false;
        }
        if (this.building.emails === '' && this.isEdit) {
          this.noEmails = true;
          return;
        }
        let emails = this.building.emails.split(';');
        emails.forEach((value) => {
          if (value === '')
            return;
          this.emails.push({ 'value': value });
        });
      }
    })
  }

  public addEmail(): void {
    this.emails.push({ value: '' });
    if (this.emails.length > 9) {
      this.limit = true;
    }
  }

  public removeEmail(index): void {
    this.emails.splice(index, 1);
  }

  public back(): void {
    this.navigation.back();
  }

  public submit(): void {
    console.log(this.emails);
    // this.router.navigateByUrl('manager/building/info');
    this.mailSave = [];
    this.mailSave.push({ 'value': null });

    let i = 0;

    this.emails.forEach((data) => {
      if (i >= this.noSave) {
        this.mailSave.push({ 'value': data.value });
      }
      i++;
    });
    this.apiService.post(API.manager.addEmail + this.buildId, {
      emails: this.mailSave,
      isedit: this.isEdit
    })
      .subscribe((response) => {
        if (response.status) {
          this.router.navigateByUrl('manager/building/info');
        }
      });
  }

}

