import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import { ContactModal } from '../../shared/modals/contact/contact.component';
import { ROLES } from '../../shared/constants/roles.constants';
import { RolesService } from 'src/app/services/roles.service';
import { API } from '../../shared/constants/api.constants';
import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-resident-dashboard',
	templateUrl: 'resident-dashboard.page.html',
	styleUrls: ['resident-dashboard.page.scss'],
})
export class ResidentDashboardPage implements OnInit {

	public model: any;
	public cont_det_switchers = {};
	public contDets = {};
	public select = ['a', 'b', 'c', 'd'];
	public selectOptions = {
		showBackdrop: false,
		cssClass: 'resident-dashboard-select'
	}
	public selectedBooking: any;
	public roles = ROLES;
	public noticeNumber = 0;
	public statusText;
	public bookings = [];
	public currentBooking;
	public showCommonArea;
	public allowBookLift;
	public status;
	public type;
	public currentApartment;
	public env = environment;

	constructor( private http: HttpClient,
				 private apiService: ApiService,
				 private router: Router,
				 private route: ActivatedRoute,
				 private matIconRegistry: MatIconRegistry,
				 private domSanitizer: DomSanitizer,
				 private modalController: ModalController,
				 private rolesService: RolesService,
				 private alert: AlertService ) {
		console.log('resident dashboard constructor');
		this.matIconRegistry.addSvgIcon(
			"noticeboard",
			this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/noticeboard.svg")
		);
	}

	ngOnInit() {
		console.log('resident dashboard init');
		this.getBooking();
	}

	public checkNext(): boolean {
		return true;
	}

	public getBooking( id? ) {
		this.apiService.get(API.client.getBooking + `?lastBooking=${ id }`).subscribe(response => {
			this.statusText = 'Book move in';
			console.log('get booking response', response);
			if (response.status === true) {
				console.log(response);
				this.model = response.model;
				this.bookings = response.bookings;
				this.currentBooking = this.model.id;
				this.selectedBooking = this.bookings.find(el => el.id == this.currentBooking);
				if (!this.model || !response.show_comm_area) {
					this.showCommonArea = false;
				} else {
					// this.getAreas();
				}

				this.bookings.forEach(( e ) => {
					if (e.id == this.model.id) {
						this.currentApartment = e;
						sessionStorage.setItem('currentApartment', JSON.stringify(e));
					}
				});
				if (this.model.building.id == 469) {
					this.allowBookLift = false;
				} else {
					this.allowBookLift = true;
				}
				if (this.model.building.allow_lift == '1') {
					this.allowBookLift = true;
				} else {
					this.allowBookLift = false;
				}
				this.statusText = 'My dashboard';
				this.status = this.model['status_out'] || this.model.status;
				this.type = this.model['status_out'] ? 'out' : 'in';
				if ((this.model.user_status == 'Owner') && (this.model.is_residing == 1)) {
					this.model.is_residing = 'Residing';
				} else {
					this.model.is_residing = 'Non-Residing';
				}
				this.updateNoticeNumber();
				this.getContactDetails();
			}
		}, () => {
			this.alert.show(ERROR.internal)
		})
	}

	public getContactDetails() {
		this.apiService.get(API.client.getContDetails + this.model.building_id)
			.subscribe(( response ) => {
				if (!response.status) {
					this.alert.show(response.message || ERROR.internal);
					return;
				}
				this.cont_det_switchers = {
					'company': {},
					'contact': {},
				};
				this.contDets = {};
				if (!response.info) {
					this.cont_det_switchers = response.switchers;
					this.contDets = response.cont_details;
				}
			});
	}

	public updateNoticeNumber() {
		// this.pageLoading = true;
		this.apiService.get(API.client.getNoticeNumber + this.model.building_id)
			.subscribe(( res ) => {
				if (!res.status) {
					return;
				}
				this.noticeNumber = res.result;
			})
	}

	public changeBooking() {
		console.log(this.selectedBooking);
		this.model = this.selectedBooking;
		this.getBooking(this.selectedBooking.id);
	}

	public getFormattedDate( date: any ): string {
		if (date === '0000-00-00 00:00:00') {
			return '';
		}
		if (typeof date === 'string') {
			let regexp = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/,
				dateParts;
			dateParts = date.match(regexp);
			if (!dateParts) {
				return '';
			}
			date = new Date(dateParts[1], dateParts[2] - 1, dateParts[3],
				dateParts[4], dateParts[5], dateParts[6]);
			if (isNaN(date.getTime())) {
				return '';
			}
		} else if (!(date instanceof Date) || isNaN(date.getTime())) {
			return '';
		}
		let year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hours = date.getHours(),
			mins = date.getMinutes(),
			ampm = hours >= 12 ? 'pm' : 'am';
		hours = hours % 12 ? hours % 12 : 12;
		hours = hours > 9 ? hours : '0' + hours;
		month = month > 9 ? month : '0' + month;
		mins = mins > 9 ? mins : '0' + mins;
		day = day > 9 ? day : '0' + day;

		return day + '/' + month + '/' + year + ' ' + hours + ':' + mins + ' ' + ampm;
	}

	public async showContactDetails() {
		const modal = await this.modalController.create({
			component: ContactModal,
			cssClass: 'building-contacts-modal',
			componentProps: {
				'model': this.model,
				'cont_det_switchers': this.cont_det_switchers,
				'contDets': this.contDets,
			}
		});
		return await modal.present();
	}

	public getBookingType( booking ) {
		let res = '';
		if (booking.is_lift == 1) {
			if (booking.status === 'moved') {
				res = '[Lift (Used)]';
			} else {
				res = '[Lift]';
			}
		} else {
			if (booking.status_out === 'moving') {
				res = '[Move Out]';
			} else if (booking.status === 'moved') {
				res = '[Moved In]';
			} else if (booking.status == 'pending') {
				if (booking.is_residing != '1' && booking.user_status === 'Owner') {
					return '';
				}
				res = '[Incomplete]';
			} else {
				res = '[Move In]';
			}
		}
		return res;
	}

}

