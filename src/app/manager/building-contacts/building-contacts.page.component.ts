import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO, EMAILS, PHONES } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { AlertService } from '../../services/alert.service';
import { API } from '../../shared/constants/api.constants';

@Component({
  selector: 'app-building-contacts',
  templateUrl: 'building-contacts.page.html',
  styleUrls: ['building-contacts.page.scss'],
})
export class BuildingContactsPage implements AfterViewInit, OnInit, OnDestroy {

  public buttonText = BUTTONS.next;
  public emails = EMAILS;
  public phones = PHONES;
  public limit: boolean = false;
  public buildName = BUILD_INFO.name;
  @ViewChildren('input') inputsEmail: QueryList<ElementRef>;
  @ViewChildren('input2') inputsPhone: QueryList<ElementRef>;
  public alive: boolean = true;
  public isEdit;
  public buildId;
  public pageLoading = false;
  public building;
  public currentManager;
  public noEmails;
  public noPhones;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService) {
    console.log('building contacts constructor');
  }

  ngOnInit() {
    this.isEdit = this.route.snapshot.routeConfig.path.split('/')[2] === 'edit';
    this.buildId = this.route.snapshot.paramMap.get('buildId');
    if(this.isEdit){
      this.getBuilding();
    }
  }

  ngAfterViewInit() {
    this.inputsEmail.last && this.inputsEmail.last.nativeElement.focus()
    this.inputsEmail.changes.pipe(takeWhile(() => this.alive)).subscribe(() => {
      if (this.inputsEmail.length)
        this.inputsEmail.last.nativeElement.focus()
    })
    this.inputsPhone.last && this.inputsPhone.last.nativeElement.focus()
    this.inputsPhone.changes.pipe(takeWhile(() => this.alive)).subscribe(() => {
      if (this.inputsPhone.length)
        this.inputsPhone.last.nativeElement.focus()
    })
  }

  ngOnDestroy() {
    this.alive = false;
  }

  public getBuilding() {
    this.apiService.get(API.manager.getBuilding + this.buildId + '?mnginfo=true')
      .subscribe((response) => {
        if (response.status === true) {
          this.building = response.building;
          this.buildName = this.building.name;
          this.currentManager = response.mnginfo;
          this.emails.push({ 'value': this.currentManager.email });
          
          // var value = this.currentManager.phone;
          // if (value !== undefined) {
          //   var str = value.replace(/\s/g, '');
          //   aMasks.forEach(element => {
          //     if (str.match(element.reg)) {
          //       currMask = element.mask;
          //       valid = true;
          //     }
          //   });
          // }
          // this.phones.push({ 'value': value, mask: currMask, valid: valid });
          if (this.building.addit_emails === '') {
            this.noEmails = true;
          }
          if (this.building.addit_phones === '') {
            this.noPhones = true;
          }
          var emails = this.building.addit_emails.split(';');
          // angular.forEach(emails, function (value) {
          //   if (value === '') {
          //     return;
          //   }
          //   this.emails.push({ 'value': value });
          // });
          var phones = this.building.addit_phones.split(';');
          // angular.forEach(phones, function (value) {

          //   var currMask = '';

          //   if (value === '') {
          //     return;
          //   }

          //   if (value !== undefined) {
          //     var str = value.replace(/\s/g, '');
          //     aMasks.forEach(element => {
          //       if (str.match(element.reg)) {
          //         currMask = element.mask;
          //         valid = true;
          //       }
          //     });
          //   }
          //   this.phones.push({ 'value': value, mask: currMask, valid: valid });
          // });
        }
      });
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

  public addPhone(): void {
    this.phones.push({ value: '' });
    if (this.phones.length > 9) {
      this.limit = true;
    }
  }

  public removePhones(index): void {
    this.phones.splice(index, 1);
  }


  public enterKey(event): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  public back(): void {
    this.navigation.back();
  }

  public submit(): void {
    console.log(this.emails);
    this.apiService.post('/api/manager/addEmailPhone/' + this.buildId, {
      emails: this.emails,
      phones: this.phones,
      isedit: this.isEdit
    }).subscribe((response) => {
      this.pageLoading = false;
      if (response.status && !this.isEdit) {
        // this.router.navigateByUrl('manager/building/payment');
        this.router.navigateByUrl('manager/building/publish');
      }
      else {
        this.router.navigateByUrl('manager/dashboard');
      }
    });
  }

}

