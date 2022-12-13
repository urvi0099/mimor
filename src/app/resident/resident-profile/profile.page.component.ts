import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { API } from '../../shared/constants/api.constants';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { ERROR } from '../../shared/constants/errors.constants';
import { NavigationService } from "../../services/navigation.service";

@Component({
	selector: 'app-resident-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
})
export class ResidentProfilePage implements OnInit {

	public userForm = new FormGroup({
		name: new FormControl('', [Validators.required, Validators.minLength(1)]),
		email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
		phone: new FormControl('', [Validators.required, Validators.pattern(`
    /^6104[\d]{8}$/|
    /^610[^4]{1}[\d]{8}$/|
    /^61[^0]{1}[\d]{7}$/|
    /^04[\d]{8}$/|
    /^0[^4]{1}[\d]{8}$/|
    /^[^06]{1}[\d]{7}$/|
    /^1[2-9]{1}\d{2}[2-9]{1}\d{2}\d{4}$/
    `)]),
		phone2: new FormControl('', [Validators.pattern(`
    /^6104[\d]{8}$/|
    /^610[^4]{1}[\d]{8}$/|
    /^61[^0]{1}[\d]{7}$/|
    /^04[\d]{8}$/|
    /^0[^4]{1}[\d]{8}$/|
    /^[^06]{1}[\d]{7}$/|
    /^1[2-9]{1}\d{2}[2-9]{1}\d{2}\d{4}$/
    `)]),
		special_needs: new FormControl(false),
		password: new FormControl('', [Validators.minLength(6)]),
		confirmPassword: new FormControl('', [Validators.minLength(6)]),
		car_registration_number: new FormControl('', [Validators.minLength(6)]),
		car_park_number: new FormControl('', [Validators.minLength(6)]),
		email2: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
		agent_email: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
		agent_phone: new FormControl('', [Validators.pattern(`
    /^6104[\d]{8}$/|
    /^610[^4]{1}[\d]{8}$/|
    /^61[^0]{1}[\d]{7}$/|
    /^04[\d]{8}$/|
    /^0[^4]{1}[\d]{8}$/|
    /^[^06]{1}[\d]{7}$/|
    /^1[2-9]{1}\d{2}[2-9]{1}\d{2}\d{4}$/
    `)]),
	});

	public buttonText: string = BUTTONS.update;
	public bookingData: any;
	public user;
	public bookingId = this.route.snapshot.paramMap.get('bookingId');
	public lastApartment;
	public pageLoading = true;

	constructor( private router: Router,
				 public route: ActivatedRoute,
				 private rolesService: RolesService,
				 private apiService: ApiService,
				 private alert: AlertService,
				 private navigation: NavigationService ) {
		console.log('resident profile constructor')
	}

	ngOnInit() {
		this.getProfile();
		this.getBookingData();
	}

	public getProfile() {
		this.apiService.get(API.client.getProfile).subscribe(( response ) => {
			if (response.status === true) {
				this.user = response.user;
				console.log(this.user);
				this.userForm.patchValue(this.user);
				this.pageLoading = false;
				// this.editPhone();// getting a mask for an existing number
				return;
			}
			this.alert.show(response.message || ERROR.internal)
		})
	}

	public getBookingData() {
		this.apiService.get('/booking/get?profile_screen=true&lastBooking=' + this.bookingId)
			.subscribe(( response ) => {
				if (response.status) {
					this.lastApartment = response.lastApartment;
					this.bookingData = response.model;
				}
			});
	}

	public save() {
		let user = { ...this.user, ...this.userForm.value };
		user.special_needs = this.user.special_needs ? '1' : '0';
		// if (this.saving) {
		//   return false;
		// }
		// this.saving = true;
		this.pageLoading = true;
		this.apiService.put(API.client.saveProfile, user)
			.subscribe(( response ) => {
				if (response.status) {
					this.router.navigateByUrl('resident/dashboard');
					return;
				}
				this.alert.show(response.message || ERROR.internal)
				// this.saving = false;
				this.pageLoading = false;
			}, () => {
				// this.saving = false;
				this.pageLoading = false;
			});
	}

	public changeApartment(): void {
		console.log('change apartment')
	}

	public changeSubRole(): void {
		console.log('change role');
		this.router.navigate(['resident', 'change_sub_role'])
	}

	public cancel(): void {
		this.router.navigateByUrl('resident/dashboard');
	}

	public getFormattedDate( date ): string {
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
}
