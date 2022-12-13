import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

import {AlertService} from '../../services/alert.service';
import {ApiService} from '../../services/api.service';
import {RolesService} from '../../services/roles.service';
import {API} from '../../shared/constants/api.constants';
import {ERROR} from '../../shared/constants/errors.constants';
import {NavigationService} from "../../services/navigation.service";

@Component({
    selector: 'app-noticeboard',
    templateUrl: './manager-noticeboard.page.html',
    styleUrls: ['./manager-noticeboard.page.scss'],
})
export class ManagerNoticeboardPage implements OnInit {

    public notices = [];
    public noticeList = [];
    public buildingName;
    public buildId;
    public pageLoading;

    constructor(private router: Router,
                private rolesService: RolesService,
                private domSanitizer: DomSanitizer,
                private matIconRegistry: MatIconRegistry,
                private alertController: AlertController,
                private route: ActivatedRoute,
                private apiService: ApiService,
                private navigation: NavigationService,
                private alert: AlertService) {
        console.log('resident noticeboard constructor');
        this.matIconRegistry.addSvgIcon(
            "upload2",
            this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/upload2.svg")
        );
    }

    ngOnInit() {
        this.buildId = this.route.snapshot.paramMap.get('buildId');
        this.getBuilding();
    }

    public getBuilding() {
        this.apiService.get(API.manager.getBuilding + this.buildId).subscribe((response) => {
            if (response.status) {
                this.buildingName = response.building.name;
                return;
            } else {
                this.alert.show(response.message || ERROR.internal);
            }
        });

        this.apiService.get(API.manager.getNoticeList + this.buildId + '?with_expires=true&with_delays=true')
            .subscribe((response) => {
                if (!response.status) {
                    this.pageLoading = false;
                    this.alert.show(response.message || ERROR.internal);
                    return;
                }

                var noticesNum = response.noticeList.length;
                this.noticeList = response.noticeList;
                console.log(response)
                if (!noticesNum) {
                    this.pageLoading = false;
                    return;
                }

                // for (var i = 0; i < noticesNum; i++) {
                //   if ((i + 1) % 2) {
                //     this.leftColNotices.push(this.noticeList[i]);
                //   } else {
                //     this.rightColNotices.push(this.noticeList[i]);
                //   }
                // }
                this.pageLoading = false;

            });
    }

    public fromFileInfo() {
        // TO DO
    }

    public back(): void {
        this.navigation.back()
        // this.router.back()
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

    public formatNoticeText(text) {
        if (!text) {
            return text;
        }
        // get first paragraph
        let paragraphs = text.match(/<p>.*?<\/p>/g);
        let firstParHtml;
        if (!paragraphs) {
            return text;
        }
        for (var i = 0; i < paragraphs.length; i++) {
            if (paragraphs[i] && paragraphs[i].match(/<p>(.*?)<\/p>/)[1] != '<br/>') {
                firstParHtml = paragraphs[i];
                break;
            }
        }
        if (!firstParHtml) {
            return text;
        }
        let firstParText = firstParHtml.match(/<p>(.*?)<\/p>/)[1];
        let sliced = firstParText.slice(0, 200);

        let result = '<p>' + sliced + '...</p>';

        return result;
    }

    public deleteNote(note) {
        this.apiService.post(API.manager.deleteNotice + note)
            .subscribe((response) => {
                if (!response.status) {
                    this.alert.show(response.message || ERROR.internal);
                    return;
                }
                this.getBuilding();
            });

    }

    public addNote() {
        this.router.navigateByUrl(`manager/building/${this.buildId}/noticeboard/edit`)
    }

    public async showConfirm(key) {
        const alert = await this.alertController.create({
            cssClass: 'remove-level',
            header: 'Confirm',
            subHeader: `Would you like to remove this notice?`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Confirm',
                    handler: () => {
                        this.deleteNote(key)
                        console.log('Confirm Ok');
                    }
                }
            ]
        });

        await alert.present();
    }

}
