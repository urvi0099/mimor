import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';

import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { API } from '../../shared/constants/api.constants';

@Component({
	selector: 'app-building-address',
	templateUrl: 'building-address.page.html',
	styleUrls: ['building-address.page.scss'],
})
export class BuildingAddressPage implements OnInit {

	public buttonText = BUTTONS.next;
	public contactsForm = new FormGroup({
		owners_corp_comp_name: new FormControl(''),
		owners_corp_contact_email: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
		contact_name: new FormControl('', [Validators.minLength(6)]),
		oc_number: new FormControl('', [Validators.minLength(6)]),
		contact_phone: new FormControl(''),
		building_contact_title: new FormControl(''),
		owners_corp_contact_name: new FormControl(''),
		building_emails: new FormControl('', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
		owners_corp_contact_phone: new FormControl(''),
		cont_det_notes: new FormControl(''),
	});

	public cont_det_switchers: any = {
		building_global: true,
		owner_corp_global: true,
		company: {
			owners_corp_comp_name: true,
			address: true,
			oc_number: true,
			contact_name: true,
			owners_corp_contact_email: true,
			contact_phone: true,
		},
		contact: {
			building_contact_title: true,
			owners_corp_contact_name: true,
			building_emails: true,
			owners_corp_contact_phone: true,
			cont_det_notes: true,
		}
	};
	public isEdit;
	public loading = false;
	public buildId;
	public address;
	public pageLoading = true;

	constructor( private http: HttpClient,
				 private apiService: ApiService,
				 private router: Router,
				 private route: ActivatedRoute,
				 private rolesService: RolesService,
				 private navigation: NavigationService,
				 private alert: AlertService ) {
		console.log('building address constructor');
	}

	ngOnInit() {
		this.isEdit = this.route.snapshot.routeConfig.path.split('/')[3] === 'edit';
		this.buildId = this.route.snapshot.paramMap.get('buildId');
		console.log(this.buildId, this.route.snapshot);
		if (this.isEdit) {
			this.buttonText = BUTTONS.save;
			this.getBuilding();
		} else {
			this.createAddress();
		}
	}

	public createAddress() {
		this.apiService.get(API.manager.catchBuildAddress)
			.subscribe(( resp ) => {
				this.address = '';
				if (resp.status) {
					this.address = resp.address;
				}
				this.pageLoading = false;
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

	public getBuilding() {
		this.apiService.get(API.manager.getBuilding + this.buildId).subscribe(( response ) => {
			if (response.status) {
				console.log(response);
				let building = response.building;
				this.contactsForm.patchValue({
					contact_phone: building.contact_phone || '',
					contact_name: building.contact_name || '',
					building_contact_title: building.building_contact_title || '',
					building_emails: building.building_emails || '',
					oc_number: building.oc_number || '',
					owners_corp_comp_name: building.owners_corp_comp_name || '',
					owners_corp_contact_name: building.owners_corp_contact_name || '',
					owners_corp_contact_email: building.owners_corp_contact_email || '',
					owners_corp_contact_phone: building.owners_corp_contact_phone || '',
					cont_det_notes: building.cont_det_notes || ''
				})
				this.buildId = building.id;
				if (building.cont_det_switchers) this.cont_det_switchers = JSON.parse(building.cont_det_switchers);
				console.log(this.cont_det_switchers);

				this.buttonText = BUTTONS.save;
				this.pageLoading = false;
				return;
			}
			this.pageLoading = false;
			this.alert.show(response.message || ERROR.internal);
			this.router.navigateByUrl('manager/dashboard');
		}, () => {
			this.pageLoading = false;
			this.router.navigateByUrl('manager/dashboard');
		});
	}

	public back(): void {
		this.navigation.back();
	}

	public saveAddress() {
		if (this.loading) {
			return false;
		}
		this.loading = true;

		let sendData = {};
		// sendData['contact_name'] = this['contact_name'];
		// sendData['contact_phone'] = this['contact_phone'];
		// sendData['building_contact_title'] = this['building_contact_title'];
		// sendData['building_emails'] = this['building_emails'];
		// sendData['oc_number'] = this['oc_number'];
		// sendData['owners_corp_comp_name'] = this['owners_corp_comp_name'];
		// sendData['owners_corp_contact_name'] = this['owners_corp_contact_name'];
		// sendData['owners_corp_contact_email'] = this['owners_corp_contact_email'];
		// sendData['owners_corp_contact_phone'] = this['owners_corp_contact_phone'];
		// sendData['cont_det_notes'] = this['cont_det_notes'];

		sendData = this.contactsForm.value;
		sendData['cont_det_switchers'] = JSON.stringify(this.cont_det_switchers);

		this.apiService.put(API.manager.saveAddress + (this.buildId ? '/' + this.buildId : ''), sendData)
			.subscribe(( response ) => {
				if (response.status) {
					if (!this.buildId || this.isEdit) {
						this.router.navigateByUrl(response.redirect);
					} else if (!this.isEdit) {
						this.router.navigateByUrl('manager/building/' + this.buildId + '/apartments');
					} else {
						this.router.navigateByUrl('manager/dashboard');
					}
					return false;
				}

				this.alert.show(response.message || ERROR.internal);
				this.loading = false;
			}, () => {
				this.loading = false;
			});
	};

	public submit(): void {
		console.log(this.contactsForm.value);
		this.saveAddress();
		// this.router.navigateByUrl('manager/building/apartments')
	}

	public globalCheckerChanged( type: string ) {
		console.log(type);
	}

	public toggleSwitchOwner() {
		this.cont_det_switchers.owner_corp_global = !this.cont_det_switchers.owner_corp_global;
		this.cont_det_switchers.company.owners_corp_comp_name = !this.cont_det_switchers.company.owners_corp_comp_name
		this.cont_det_switchers.company.oc_number = !this.cont_det_switchers.company.oc_number
		this.cont_det_switchers.company.contact_name = !this.cont_det_switchers.company.contact_name
		this.cont_det_switchers.company.owners_corp_contact_email = !this.cont_det_switchers.company.owners_corp_contact_email
		this.cont_det_switchers.company.contact_phone = !this.cont_det_switchers.company.contact_phone
	}

	public toggleSwitchCompany() {

	}

	toggleSwitchBuilding() {
		this.cont_det_switchers.building_global = !this.cont_det_switchers.building_global;
		this.cont_det_switchers.contact.building_contact_title = !this.cont_det_switchers.contact.building_contact_title;
		this.cont_det_switchers.contact.owners_corp_contact_name = !this.cont_det_switchers.contact.owners_corp_contact_name;
		this.cont_det_switchers.contact.building_emails = !this.cont_det_switchers.contact.building_emails;
		this.cont_det_switchers.contact.owners_corp_contact_phone = !this.cont_det_switchers.contact.owners_corp_contact_phone;
		this.cont_det_switchers.contact.cont_det_notes = !this.cont_det_switchers.contact.cont_det_notes;
	}
}

