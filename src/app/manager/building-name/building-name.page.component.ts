import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { API } from '../../shared/constants/api.constants';

@Component({
	selector: 'app-building-name',
	templateUrl: 'building-name.page.html',
	styleUrls: ['building-name.page.scss'],
})
export class BuildingNamePage implements OnInit {

	public buttonText = BUTTONS.next;
	public address = new FormControl('', [Validators.required]);
	public name = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
	public files: File[] = [];
	public multiplePhotos = false;
	public imageToShow: any;
	public buildId;
	public isEdit = false;
	public photo;
	public selectedAddress;
	public parking = false;
	public loading;
	public photoBase;
	public location;
	public adressPlaceholder = 'For example 637 Flinders St';

	constructor( private http: HttpClient,
				 private apiService: ApiService,
				 private router: Router,
				 private route: ActivatedRoute,
				 private rolesService: RolesService,
				 private navigation: NavigationService,
				 private alert: AlertService ) {
		console.log('building name constructor');
	}

	ngOnInit() {
		this.buildId = this.route.snapshot.paramMap.get('buildId');
		this.isEdit = this.route.snapshot.routeConfig.path.split('/')[3] === 'edit';
		console.log(this.route.snapshot, this.isEdit)
		if (this.isEdit) {
			this.buttonText = BUTTONS.save;
			this.getBuilding();
		}
	}

	public onSelect( event ): void {
		this.files.push(...event.addedFiles);
		this.readFile(this.files[0]).then(fileContents => {
			// Put this string in a request body to upload it to an API.
			this.photoBase = fileContents;
		})
		if (event.rejectedFiles.length > 0) {
			if (event.rejectedFiles[0].reason === 'size') {
				this.alert.show(ERROR.maxSize);
			}
			if (event.rejectedFiles[0].reason === 'type') {
				this.alert.show(ERROR.imageExt)
			}
			if (event.rejectedFiles[0].reason === 'no_multiple') {
				this.alert.show('You can upload only one image')
			}
		}
	}

	private async readFile( file: File ): Promise<string | ArrayBuffer> {
		return new Promise<string | ArrayBuffer>(( resolve, reject ) => {
			const reader = new FileReader();

			reader.onload = e => {
				return resolve((e.target as FileReader).result);
			};

			reader.onerror = e => {
				console.error(`FileReader failed on file ${ file.name }.`);
				return reject(null);
			};

			if (!file) {
				console.error('No file to read.');
				return reject(null);
			}

			reader.readAsDataURL(file);
		});
	}

	public getBuilding() {
		this.apiService.get(API.manager.getBuilding + this.buildId).subscribe(res => {
			if (res.status) {
				console.log(res);
				let building = res.building;
				this.name.setValue(building.name);
				this.address.setValue(building.address);
				this.adressPlaceholder = building.address;
				this.photo = building.photo ? 'assets/img/buildings/' + building.photo : undefined;

				if (building.address && building.lat && building.lng) {
					this.selectedAddress = {
						address: building.address,
						location: (new google.maps.LatLng(building.lat, building.lng))
					};
					this.location = {
						lat: building.lat, long: building.lng
					}
					console.log(this.selectedAddress);
				} else {
					this.selectedAddress = '';
				}
			}
		})
	}

	public onRemove( event ): void {
		this.files.splice(this.files.indexOf(event), 1);
	}

	public back(): void {
		this.navigation.back();
	}

	public submit(): void {
		this.apiService.put(API.manager.saveName + (this.buildId ? '/' + this.buildId : ''), {
			name: this.name.value,
			photo: this.photoBase || '',
			isedit: this.isEdit,
			address: this.address.value,
			parking: this.parking,
			location: {} || this.location // fix location
		}).subscribe(( response ) => {
			console.log(response);
			if (response.status === true && this.isEdit) {
				this.router.navigateByUrl('manager/dashboard');
				return;
			} else if (!this.isEdit) {
				this.router.navigateByUrl('manager/building/address');
				return;
			}
			this.alert.show(response.message || ERROR.internal);
			this.loading = false;
		}, function () {
			this.loading = false;
		});
		// this.router.navigateByUrl('manager/building/address');
	}

	public onAutocompleteSelected( ev ) {
		console.log(ev);
	}

	public onLocationSelected( ev ) {
		console.log(ev);
		this.location = { lat: ev.latitude, lng: ev.longtitude }
	}


	public skipPhoto(): void {
		this.submit();
	}
}

