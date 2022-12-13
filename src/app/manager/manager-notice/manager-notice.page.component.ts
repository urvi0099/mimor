import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { AlertController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import { quillConfig } from '../../shared/constants/config.constants';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { ERROR } from '../../shared/constants/errors.constants';
import { WindowRefService } from '../../services/window.service';
import { API } from '../../shared/constants/api.constants';

@Component({
  selector: 'app-manager-notice',
  templateUrl: 'manager-notice.page.html',
  styleUrls: ['manager-notice.page.scss'],
})
export class ManagerNoticePage implements OnInit {

  public buildName = BUILD_INFO.name;
  public buttonText = BUTTONS.submit;
  public quillConfig = quillConfig;
  public noticeId;
  public isEdit;
  public noticeData: any = {};
  public noticeFilesData = {
    'filesizes': {},
    'base64': {},
    'blobUrl': {},
    'isLocal': {}
  };
  public files: File[] = [];
  public noticeFiles = {};
  public maxFileNameLen = 35;
  public loading = false;
  public pageLoading = false;
  public displayNoFiles;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private alertController: AlertController,
    private windowRef: WindowRefService) {
    console.log('building congratulations constructor');
    this.matIconRegistry.addSvgIcon(
      "upload2",
      this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/upload.svg")
    );
  }

  ngOnInit() {
    // set default dates for new notice  
    this.noticeId = this.route.snapshot.paramMap.get('noticeId');
    if (this.noticeId) {
      this.getNotice()
    } else {
      if (!this.noticeData.expire) {
        this.noticeData.expire = this.getDefaultExpireDate();
      }
      if (!this.noticeData.delay) {
        this.noticeData.delay = this.getDefaultDelayDate();
      }
      this.noticeData.email_receiver = 'all';
      this.noticeData.expirable = true;
    }
  }

  public getNotice() {

    this.pageLoading = true;

    this.apiService.get(API.manager.getNotice + this.noticeId + '?with_expires=true&with_delays=true')
      .subscribe((response) => {
        if (!response.status) {
          this.pageLoading = false;
          this.alert.show(response.message || ERROR.internal);
          return;
        }
        this.noticeData.title = response.notice.title;
        this.noticeData.content = response.notice.content;
        this.noticeData.email_receiver = response.notice.email_receiver;
        this.noticeData.send_email = response.notice.send_email == 1 ? true : false;
        this.noticeData.expirable = response.notice.expirable == 1 ? true : false;

        // set dates to default if empty
        this.noticeData.expire = response.notice.expire ?
          this.convertToDate(response.notice.expire)
          : this.getDefaultExpireDate();

        this.noticeData.delay = response.notice.delay ?
          this.convertToDate(response.notice.delay)
          : this.getDefaultDelayDate();

        response.noticeFiles.forEach(function (val, index) {
          this.noticeFilesData.blobUrl[val] = '/upload/pdf/' + this.buildingId + '/notice_files/' + this.noticeId + '/' + val;
          this.noticeFilesData.isLocal[val] = false;
          this.noticeFilesData.filesizes[val] = null;
          this.noticeFilesData.base64[val] = null;
        });

        this.displayNoFiles = !Object.keys(this.noticeFilesData.blobUrl).length;
        this.pageLoading = false;
      });

  }

  public back(): void {
    this.navigation.back();
  }

  public getDefaultDelayDate = function () {
    // return formatDateForClient(new Date());
    return new Date();
  }
  public getDefaultExpireDate = function () {
    var date = new Date();
    date.setDate(date.getDate() + 7)
    /* return formatDateForClient(date); */
    return date;
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

  public async showDate(param) {
    if (param === 'expiry' && !this.noticeData.expirable) {
      return;
    }
    let selectedDate = param === 'delay' ? this.getDefaultDelayDate() : this.getDefaultExpireDate();
    let selectedString = selectedDate.toISOString().slice(0, 10);
    const alert = await this.alertController.create({
      cssClass: 'expire-delay',
      header: `Select ${param} date`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: (alertData) => {
            console.log(alertData.date, 'Confirm Ok');
          }
        }
      ],
      inputs: [
        {
          name: 'date',
          type: 'date',
          min: this.getDefaultDelayDate().toISOString().slice(0, 10),
          value: selectedString
        },
      ]
    });

    await alert.present();
  }

  public onSelect(event): void {
    console.log(event.target.files);
    if (event.target.files[0].size > 4096000) {
      this.alert.show(ERROR.maxSize)
    }
    this.files.push(event.target.files[0]);
    console.log(this.files);
    this.readFile(this.files[this.files.length - 1]).then(file => {
      // Put this string in a request body to upload it to an API.
      // console.log(file);
      let filenameNew = this.files[this.files.length - 1].name;
      filenameNew = filenameNew.replace('?', '');
      this.noticeFiles[filenameNew] = file;
      let binary = atob(this.noticeFiles[filenameNew].split(',')[1]),
        array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      let blob = new Blob([new Uint8Array(array)], { type: this.files[this.files.length - 1].type });

      this.noticeFilesData.base64[filenameNew] = file;

      this.noticeFilesData.blobUrl[filenameNew] = URL.createObjectURL(blob);

      console.log(this.noticeFilesData)
    })
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }

  public getSlicedFilename(fn) {
    // get first paragraph
    if (!fn)
      return false;
    if (fn.length <= this.maxFileNameLen) {
      return fn;
    }
    return fn.slice(0, 35) + '...';
  }


  public deleteFile(key): void {
    // add delete
    delete this.noticeFilesData.blobUrl[key];
  }

  public async showConfirm(key) {
    const alert = await this.alertController.create({
      cssClass: 'remove-level',
      header: 'Confirm',
      subHeader: `Would you like to remove ${key} file?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: () => {
            this.deleteFile(key)
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }


  public openFile(url) {
    this.windowRef.nativeWindow.open(url);
  }

  public submit(): void {
    console.log(this.noticeData)
    console.log(this.noticeFilesData)
    console.log(this.noticeFiles)
  }

}






