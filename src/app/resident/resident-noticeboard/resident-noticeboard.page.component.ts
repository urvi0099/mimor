import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { ERROR } from '../../shared/constants/errors.constants' ;

@Component({
  selector: 'app-res-noticeboard',
  templateUrl: './resident-noticeboard.page.html',
  styleUrls: ['./resident-noticeboard.page.scss'],
})
export class ResidentNoticeboardPage implements OnInit {

  public notices = [];
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public pageLoading;
  public isNoNotices = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private rolesService: RolesService,
    private alert: AlertService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry) {
    console.log('resident noticeboard constructor');
    this.matIconRegistry.addSvgIcon(
      "upload2",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/upload2.svg")
    );
  }


  ngOnInit() {
    if (this.buildId) {
      this.getNotices();
    } else this.router.navigateByUrl('resident/dashboard');
  }

  public getNotices() {
    this.apiService.get('/api/manager/getNoticeList/' + this.buildId + '?with_expires=true&with_delays=true')
      .subscribe((response) => {
        if (!response.status) {
          this.pageLoading = false;
          this.alert.show(response.message || ERROR.internal);
          return;
        }
        console.log(response)
        let noticesNum = response.noticeList.length;
        this.notices = response.noticeList;
        if (!noticesNum) {
          this.pageLoading = false;
          this.isNoNotices = true;
          return;
        }
        this.pageLoading = false;
      });
  }

  public fromFileInfo() {
    // TO DO
  }

  public back(): void {
    this.router.navigateByUrl('resident/dashboard')
  }

  public convertToDate(date) {
    var regexp = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/,
      dateParts;
    dateParts = date.match(regexp);
    if (!dateParts) {
      return '';
    }
    date = new Date(dateParts[1], dateParts[2] - 1, dateParts[3],
      dateParts[4], dateParts[5], dateParts[6]);
    if (isNaN(date.getTime())) {
      return null;
    }
    return new Date(date);
  }

  public formatDateForClient(date) {
    if (typeof date === 'string') {
      date = this.convertToDate(date);
    } else if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }
    if (date) {
      let dateNew = new Date(date);
      if (isNaN(dateNew.getTime())) {
        return null;
      }
      let day: any = dateNew.getDate();
      let month: any = dateNew.getMonth() + 1;
      let year = dateNew.getFullYear();

      day = day < 10 ? '0' + day : day;
      month = month < 10 ? '0' + month : month;

      return day + '/' + month + '/' + year;
    } else {
      return null;
    }
  }

}
