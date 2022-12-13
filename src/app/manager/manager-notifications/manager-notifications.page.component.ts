import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import { quillConfig } from '../../shared/constants/config.constants';
import { ERROR } from '../../shared/constants/errors.constants';
import { API } from '../../shared/constants/api.constants';

@Component({
	selector: 'app-notifications',
	templateUrl: 'manager-notifications.page.html',
	styleUrls: ['manager-notifications.page.scss'],
})
export class ManagerNotifications implements OnInit {

	public buildName;
	public quillConfig = quillConfig;
	public realEstateAll = [];
	public realEstateNotRegistered = [];
	public users = [];
	public allUsers = [];
	public owners = [];
	public residents = [];
	public unselectedUsers = [];
	public email = {
		'notifyAllCategories': {
			'owners': false,
			'residents': false,
			'real_estate': false,
			'unselected': false,
		},
		'showUsers': 'all',
		'showUsersForBuildings': 'all',
		'selectedBuildings': [],
		'title': ''
	};
	public sms = {
		'notifyAllCategories': {
			'owners': false,
			'residents': false,
			'real_estate': false,
			'unselected': false,
		},
		'showUsers': 'all',
		'showUsersForBuildings': 'all',
		'selectedBuildings': [],
		'message': ''
	};
	public dropdowns = {
		email: {
			'owners': false,
			'residents': false,
			'real_estate': false
		},
		sms: {
			'owners': false,
			'residents': false,
			'real_estate': false
		}
	}
	public fileName: string;
	public pdf;
	public buildingsData = [];
	public buildings = [];
	public building;
	public usersForBuildings = [];
	public ownersForBuildings = [];
	public residentsForBuildings = [];
	public allUsersFromBuildings = [];
	public maxLengthBuildName = 0;
	public notificationTypeMain = 'email';
	public notificationType = '';
	public buildId = this.route.snapshot.paramMap.get('buildId');
	public loading;
	public sendingLoader;

	constructor( private http: HttpClient,
				 private apiService: ApiService,
				 private router: Router,
				 private route: ActivatedRoute,
				 private rolesService: RolesService,
				 private navigation: NavigationService,
				 private alert: AlertService,
				 private alertController: AlertController ) {
		// console.log('manager notifications constructor');
	}

	ngOnInit() {
		if (this.buildId) {
			this.initValues();
		} else this.router.navigateByUrl('manager/buildings')
	}

	public initValues() {
		this.apiService.get(API.manager.getBuilding + this.buildId + '?users_for_notifications=true').subscribe(response => {
			if (response.status) {
				this.building = response.building;
				this.buildName = this.building.name;
				this.realEstateAll = response.real_estate;
				this.realEstateNotRegistered = [];
				this.buildingsData = response.buildings;
				this.realEstateAll.map(el => el.checkbox = true);
				this.realEstateNotRegistered = this.realEstateNotRegistered.map(el => {
					let element = { email: el, checkbox: true };
					return element;
				});

				// filter users, don't show ones with the same apartment
				let responseUsersObj = {};

				response.users.forEach(function ( outerVal, outerIndex ) {
					let userApartmentKey = outerVal['user_id'].toString() + outerVal['appartment_id'].toString();
					if (userApartmentKey in responseUsersObj) {
						return;
					}
					responseUsersObj[outerVal['user_id'].toString() + outerVal['appartment_id'].toString()] = outerVal;
				});

				let responseUsers: any = Object.values(responseUsersObj);
				responseUsers.sort(( a: any, b: any ) => parseInt(a.apartment.name) <= parseInt(b.apartment.name) ? -1 : 1);

				for (let i in responseUsers) {
					responseUsers[i].user['ap_name'] = responseUsers[i].apartment.name;
					this.users.push(responseUsers[i].user);

					// getting a mask
					// if (responseUsers[i].user.phone) {
					//     responseUsers[i].user.phone = this.formatPhone(responseUsers[i].user.phone);
					// }

					this.allUsers.push(responseUsers[i].user);

					if (responseUsers[i].user_status === 'Owner') {
						responseUsers[i].user.checkbox = true;
						this.owners.push(responseUsers[i].user);
					}
					if (responseUsers[i].user_status === 'Resident' || (responseUsers[i].user_status === 'Owner' && responseUsers[i].is_residing != '0')) {
						responseUsers[i].user.checkbox = true;
						this.residents.push(responseUsers[i].user);
					}

					if (responseUsers[i].user_status === 'Unselected') {
						this.unselectedUsers.push(responseUsers[i].user);
					}
				}

				for (let j in this.buildingsData) {
					let buildingID = this.buildingsData[j].id;
					this.buildings.push(this.buildingsData[j]);
					this.usersForBuildings[buildingID] = [];
					this.ownersForBuildings[buildingID] = [];
					this.residentsForBuildings[buildingID] = [];
					this.allUsersFromBuildings[buildingID] = [];

					let lengthBuildName = this.buildingsData[j].name.length;

					if (this.maxLengthBuildName < lengthBuildName) {
						this.maxLengthBuildName = lengthBuildName;
					}

					responseUsersObj = {};
					this.buildingsData[j].users.forEach(function ( outerVal, outerIndex ) {
						let userApartmentKey = outerVal['user_id'].toString() + outerVal['appartment_id'].toString();
						if (userApartmentKey in responseUsersObj) {
							return;
						}
						responseUsersObj[outerVal['user_id'].toString() + outerVal['appartment_id'].toString()] = outerVal;
					});
					this.buildingsData[j].users = Object.values(responseUsersObj);
					this.buildingsData[j].users.sort(( a, b ) => parseInt(a.apartment.name) <= parseInt(b.apartment.name) ? -1 : 1);

					for (let i in this.buildingsData[j].users) {
						this.buildingsData[j].users[i].user['ap_name'] = this.buildingsData[j].users[i].apartment.name;
						this.usersForBuildings[buildingID].push(this.buildingsData[j].users[i].user);

						// if (this.buildingsData[j].users[i].user.phone) {
						//   this.buildingsData[j].users[i].user.phone = this.formatPhone(this.buildingsData[j].users[i].user.phone);
						// }

						this.allUsersFromBuildings[buildingID].push(this.buildingsData[j].users[i].user);

						if (this.buildingsData[j].users[i].user_status === 'Owner') {
							this.ownersForBuildings[buildingID].push(this.buildingsData[j].users[i].user);
						}

						if (this.buildingsData[j].users[i].user_status === 'Resident'
							|| (this.buildingsData[j].users[i].user_status === 'Owner' && this.buildingsData[j].users[i].is_residing !== 0)) {
							this.residentsForBuildings[buildingID].push(this.buildingsData[j].users[i].user);
						}
					}
				}
				this.building = this.buildings[0];
				this.email.selectedBuildings = this.buildingsData;
				this.email.selectedBuildings = this.email.selectedBuildings.map(el => {
					return { ...el, checked: true }
				});
				// console.log(this.email.selectedBuildings);
			}
		})
	}

	public onSelect( event ): void {
		if (event.target.files[0].size > 4096000) {
			this.alert.show(ERROR.maxSize)
		}

		this.readFile(event.target.files[0]).then(file => {
			// Put this string in a request body to upload it to an API.
			// console.log(file);
			this.fileName = event.target.files[0].name.replace('?', '');
			this.pdf = file;
		})
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

	public deletePdf() {
		this.pdf = '';
		this.fileName = '';
	}

	public openUserList( type, key ) {
		this.dropdowns[type][key] = !this.dropdowns[type][key];
	}

	public selectMainTab( ev ) {
		this.notificationTypeMain = ev.tab.textLabel.toLowerCase();
	}

	public selectTab( ev ) {
		let tabName = ev.tab.textLabel === 'Residents' ? 'Tenants' : ev.tab.textLabel;
		this.notificationType = tabName;
	}

	public async showConfirm() {
		let buildList, content = '';
		if (this.notificationType == 'Complex') {
			buildList = this.notificationTypeMain == 'sms' ? this.sms.selectedBuildings : this.email.selectedBuildings;
			buildList.forEach(el => content += '<div>' + el.address + '</div>');
		} else {
			content = this.building.address;
		}
		const alert = await this.alertController.create({
			cssClass: 'notific-confirm',
			header: 'Confirm that this notification is to be sent to: ',
			subHeader: '',
			message: content,
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary'
				}, {
					text: 'Confirm',
					handler: () => {
						this.submit()
						// console.log('Confirm Ok');
					}
				}
			]
		});

		await alert.present();
	}

	public submit() {
		// console.log('Notifications@submit');
		if (this.loading) {
			return false;
		}
		let mode = this.notificationTypeMain,
			data = JSON.parse(JSON.stringify(this[mode])),
			users = [],
			sendToRealEstate = [],
			sendToRealEstateNotRegistred = [],
			id;

		if (mode === 'email') {
			// console.log('Notifications@submit mode === email');
			if (!data.title) {
				return this.alert.show('Please put in the title for Email');
			} else if (!data.message) {
				return this.alert.show('Please put in the message for Email');
			}
		} else if (!data.message) {
			return this.alert.show('Please put in message for SMS');
		}

		let selectedBuildings = [];
		// console.log(data.selectedBuildings);
		for (let i in data.selectedBuildings) {
			if (data.selectedBuildings[i]) {
				// console.log('Notifications@submit data.selectedBuildings[i] = ', data.selectedBuildings[i]);
				selectedBuildings.push(i);
			}
		}
		// console.log('Notifications@submit 180');
		//Selecting list of users to send notification to
		if (this.notificationType === 'Complex') {
			// console.log('this.notificationType === Complex');
			if (data.showUsersForBuildings === 'Owner') {
				// console.log('data.showUsersForBuildings === \'Owner\'');
				for (let j in this.ownersForBuildings) {
					for (let i in this.ownersForBuildings[j]) {
						if (this.ownersForBuildings[j][i].id) {
							// console.log('users.push(this.ownersForBuildings[j][i].id)', this.ownersForBuildings[j][i].id);
							users.push(this.ownersForBuildings[j][i].id);
						}
					}
				}
				if (users.length === 0) {
					return this.alert.show('You have selected no users');
				}
			} else if (data.showUsersForBuildings === 'Resident') {
				// console.log('data.showUsersForBuildings === \'Resident\'');
				for (let j in this.residentsForBuildings) {
					for (let i in this.residentsForBuildings[j]) {
						if (this.residentsForBuildings[j][i].id) {
							// console.log('users.push(this.residentsForBuildings[j][i].id)', this.residentsForBuildings[j][i].id);
							users.push(this.residentsForBuildings[j][i].id);
						}
					}
				}
				if (users.length === 0) {
					return this.alert.show('You have selected no users');
				}
			} else if (data.showUsersForBuildings === 'all') {
				// console.log('data.showUsersForBuildings === \'all\'');
				if (selectedBuildings.length === 0) {
					return this.alert.show('You have selected no buildings');
				}
				for (let j in this.usersForBuildings) {
					for (let i in this.usersForBuildings[j]) {
						if (this.usersForBuildings[j][i].id) {
							// console.log('users.push(this.usersForBuildings[j][i].id)', this.usersForBuildings[j][i].id);
							users.push(this.usersForBuildings[j][i].id);
						}
					}
				}
				if (users.length === 0) {
					return this.alert.show('You have selected no users');
				}
			} else if (data.showUsersForBuildings === 'Buildings') {
				return this.alert.show('You have selected no users');
			}
		} else {
			data.selectedBuildings = [];
			if (data.showUsers === undefined) {
				return this.alert.show('You have selected no users');
			} else if (data.showUsers === "individual") {
				if (!data.selectedUsers && !data.selectedRealEstate) {
					return this.alert.show('You have selected no users');
				}
				for (id in data.selectedUsers) {
					if (data.selectedUsers[id]) {
						users.push(id);
					}
				}
				for (id in data.selectedRealEstate) {
					if (data.selectedRealEstate[id]) {
						sendToRealEstate.push(id);
					}
				}
				if (users.length === 0 && !sendToRealEstate.length) {
					return this.alert.show('You have selected no users');
				}
			} else if (data.showUsers === 'Owner') {
				for (let i in this.owners) {
					if (this.owners[i].id && this.owners[i].checkbox) {
						users.push(this.owners[i].id);
					}
				}
				if (users.length === 0) {
					return this.alert.show('You have selected no users');
				}
			} else if (data.showUsers === 'Resident') {
				for (let i in this.residents) {
					if (this.residents[i].id && this.residents[i].checkbox) {
						users.push(parseInt(this.residents[i].id));
					}
				}
				if (users.length === 0) {
					return this.alert.show('You have selected no users');
				}
			} else if (data.showUsers === 'real_estate') {
				for (let i in this.realEstateAll) {
					if (this.realEstateAll[i].id && this.realEstateAll[i].checkbox) {
						sendToRealEstate.push(this.realEstateAll[i].id);
					}
				}
				for (let i in this.realEstateNotRegistered) {
					if (this.realEstateNotRegistered[i] && this.realEstateNotRegistered[i].checkbox) {
						sendToRealEstateNotRegistred.push(this.realEstateNotRegistered[i]);
					}
				}
				if (sendToRealEstate.length === 0 && sendToRealEstateNotRegistred.length === 0) {
					return this.alert.show('You have selected no users');
				}
			} else if (data.showUsers === 'all') {
				if (data.notifyAllCategories.owners) {
					this.owners.forEach(( val, i ) => {
						if (val.id) {
							users.push(parseInt(val.id));
						}
					});
				}
				if (data.notifyAllCategories.residents) {
					this.residents.forEach(( val, i ) => {
						if (val.id) {
							users.push(parseInt(val.id));
						}
					});
				}
				if (data.notifyAllCategories.real_estate) {
					this.realEstateAll.forEach(( val, i ) => {
						if (val.id) {
							sendToRealEstate.push(parseInt(val.id));
						}
					});
					this.realEstateNotRegistered.forEach(( val, i ) => {
						if (val) {
							sendToRealEstateNotRegistred.push(val.email);
						}
					});
				}
			}
		}

		if (users.length === 0) {
			return this.alert.show('You have selected no users');
		}

		delete (data.selectedUsers);
		data.selectedBuildings = data.selectedBuildings.length === 0 ? '' : data.selectedBuildings;

		this.loading = true;
		this.sendingLoader = true;

		this.apiService.post(API.manager.sendNotification + this.buildId, {
			type: mode,
			data: data,
			users: users,
			real_estate: sendToRealEstate,
			real_estate_not_registered: sendToRealEstateNotRegistred,
			file: this.pdf,
			filename: this.fileName,
			selectedBuildings: [] || selectedBuildings, // for some reasons works only with empty array ???
			notificationType: this.notificationType
		}).subscribe(( response ) => {
			console.log(response);
			if (response.status) {
				this.alert.show(response.message || 'Success', 'Success');
				this.router.navigateByUrl('manager/dashboard/' + this.buildId);
			} else {
				this.alert.show(response.message || ERROR.internal);
			}
			this.loading = false;
			this.sendingLoader = false;
		}, () => {
			this.loading = false;
			this.sendingLoader = false;
		});
		if (mode != 'email') {
			this.notificationTypeMain = 'email';
		}
	}

	public back(): void {
		this.navigation.back();
	}

}

