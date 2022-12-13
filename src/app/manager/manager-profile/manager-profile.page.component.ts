import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { NavigationService } from '../../services/navigation.service';
import { API } from '../../shared/constants/api.constants';
import { ERROR } from '../../shared/constants/errors.constants';
import { AlertService } from '../../services/alert.service';
import { delay } from "rxjs/operators";

@Component({
	selector: 'app-manager-profile',
	templateUrl: 'manager-profile.page.html',
	styleUrls: ['manager-profile.page.scss'],
})
export class ManagerProfilePage implements OnInit {

	public profileForm = new FormGroup({
		name: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
		password: new FormControl('', [Validators.required, Validators.minLength(6)]),
		confirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
		phone: new FormControl('', [Validators.required,
			// Validators.pattern(`
			// /^6104[\d]{8}$/|
			// /^610[^4]{1}[\d]{8}$/|
			// /^61[^0]{1}[\d]{7}$/|
			// /^04[\d]{8}$/|
			// /^0[^4]{1}[\d]{8}$/|
			// /^[^06]{1}[\d]{7}$/|
			// /^1[2-9]{1}\d{2}[2-9]{1}\d{2}\d{4}$/
			// `)
		]),
		company: new FormControl('', Validators.required)
	});
	public buttonText = BUTTONS.save;
	public user;
	public loading = false;

	constructor( private http: HttpClient,
				 private apiService: ApiService,
				 private router: Router,
				 private route: ActivatedRoute,
				 private rolesService: RolesService,
				 private navigation: NavigationService,
				 private alert: AlertService ) {
		console.log('manager profile constructor');
	}

	ngOnInit() {
		this.getProfile();
		console.log(this.profileForm.valid)
	}

	public getProfile() {
		this.apiService.get(API.manager.getProfile).pipe().subscribe(( response ) => {
			if (response.status) {
				this.user = response.user;
				this.profileForm.patchValue(this.user);
				return false;
			}
			this.alert.show(response.message || ERROR.internal)
		})
	}

	public back(): void {
		this.navigation.back();
	}

	public edit(): void {
		this.loading = true;
		let profile = Object.assign({}, this.user, this.profileForm.value);
		this.apiService.put(API.manager.saveProfile, profile).subscribe(( response ) => {
			if (response.status === true) {
				this.router.navigateByUrl('manager/buildings');
			} else {
				this.alert.show(response.message || ERROR.internal);
				this.loading = false;
			}
		}, ( err ) => {
			this.loading = false;
			this.alert.show(ERROR.internal);
		});
	}

	public enterKey( event ): boolean {
		let charCode = (event.which) ? event.which : event.keyCode;
		if ((charCode < 48 || charCode > 57)) {
			event.preventDefault();
			return false;
		} else {
			return true;
		}
	}
}

