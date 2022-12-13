import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO, MOCK_REPORT } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import {
	MASKS,
	REPORT_TYPES,
	SORTING_ORDER,
	TIME_PERIODS1,
	TIME_PERIODS2,
} from '../../shared/constants/reports.constants';
import { ERROR } from '../../shared/constants/errors.constants';
import { API } from '../../shared/constants/api.constants';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { environment } from "../../../environments/environment";

@Component({
	selector: 'app-building-reports',
	templateUrl: 'building-reports.page.html',
	styleUrls: ['building-reports.page.scss'],
})
export class BuildingReportsPage implements OnInit {
	public buildName = [];
	public showData = false;
	public data = [];
	public filter = {
		type: '',
		from: '',
		to: '',
		sort_type: '',
		sort_order: '',
	};
	public parcelTypes = [13, 14, 15];
	public types = REPORT_TYPES;
	public types_sort = {};
	public type;
	public displaySorting = false;
	public sortingOrder = SORTING_ORDER;
	public timePeriods1 = TIME_PERIODS1;
	public timePeriod1 = '';
	public timePeriods2 = TIME_PERIODS2;
	public timePeriod2 = '';
	public fromDate;
	public toDate;
	public defaultMask = '99999999?9?9?9?9?9?9?9?9?9?9?9?9 ';
	public aMasks = MASKS;
	public sorting;
	public selectedSortOrder;
	public selectedSorting;
	public showFromDate;
	public showToDate;
	public buildId = this.route.snapshot.paramMap.get('buildId');
	public building;
	public total;
	public buttonText;
	public loading;

	constructor(
		private http: HttpClient,
		private apiService: ApiService,
		private router: Router,
		private route: ActivatedRoute,
		private rolesService: RolesService,
		private navigation: NavigationService,
		private alert: AlertService
	) {
		console.log('building congratulations constructor');
	}

	ngOnInit() {
		for (let i = 1; i <= 15; i++) {
			this.types_sort[i] = i;
		}
		if (this.buildId) {
			this.getBuilding();
		}

		console.log('types_sort', this.types_sort);
	}

	public getBuilding() {
		this.apiService.get(API.manager.getBuilding + this.buildId).subscribe(
			( response ) => {
				if (response.status) {
					if (
						!response.building.allow_parcels ||
						response.building.allow_parcels === '0'
					) {
						this.deleteParceleTypes();
					}
					this.building = response.building;
					this.buildName = this.building.name;
					return;
				}
				this.alert.show(response.message || ERROR.internal);
				this.router.navigateByUrl('manager/dashboard/' + this.buildId);
			},
			() => {
				this.router.navigateByUrl('manager/dashboard/' + this.buildId);
			}
		);
	}

	public deleteParceleTypes() {
		for (const type of this.parcelTypes) {
			delete this.types_sort[type];
		}
	}

	public selectTimePeriod1() {
		let todaysDate = new Date(),
			neededFromDate = new Date(),
			neededToDate = new Date();
		switch (parseInt(this.timePeriod1)) {
			case 1: // Today
				this.fromDate = todaysDate;
				neededToDate.setDate(todaysDate.getDate() + 1);
				this.toDate = neededToDate;
				break;

			case 2: // Last week
				this.toDate = todaysDate;
				neededFromDate.setDate(todaysDate.getDate() - 7);
				this.fromDate = neededFromDate;
				break;
			case 3: // Last month
				this.toDate = todaysDate;
				neededFromDate.setMonth(todaysDate.getMonth() - 1);
				this.fromDate = neededFromDate;
				break;
			case 4: // Last 6 months
				this.toDate = todaysDate;
				neededFromDate.setMonth(todaysDate.getMonth() - 6);
				this.fromDate = neededFromDate;
				break;
			case 5: // Last year
				this.toDate = todaysDate;
				neededFromDate.setFullYear(todaysDate.getFullYear() - 1);
				this.fromDate = neededFromDate;
				break;
			case 6: // All Time
				this.toDate = todaysDate;
				neededFromDate.setFullYear(todaysDate.getFullYear() - 100);
				this.fromDate = neededFromDate;
				break;

			default:
				this.timePeriod1 = '';
				break;
		}
	}

	public selectTimePeriod2() {
		var todaysDate = new Date(),
			neededFromDate = new Date(),
			neededToDate = new Date();

		switch (parseInt(this.timePeriod2)) {
			case 1: // Today
				this.fromDate = todaysDate;
				neededToDate.setDate(todaysDate.getDate() + 1);
				this.toDate = neededToDate;
				break;
			case 2: // Next week
				this.fromDate = todaysDate;
				neededToDate.setDate(todaysDate.getDate() + 7);
				this.toDate = neededToDate;
				break;
			case 3: // Next month
				this.fromDate = todaysDate;
				neededToDate.setMonth(todaysDate.getMonth() + 1);
				this.toDate = neededToDate;
				break;
			case 4: // Next 6 months
				this.fromDate = todaysDate;
				neededToDate.setMonth(todaysDate.getMonth() + 6);
				this.toDate = neededToDate;
				break;
			case 5: // Next year
				this.fromDate = todaysDate;
				neededToDate.setFullYear(todaysDate.getFullYear() + 1);
				this.toDate = neededToDate;
				break;

			default:
				this.timePeriod2 = '';
				break;
		}
	}

	public clearTimePeriod() {
		this.timePeriod1 = '';
		this.timePeriod2 = '';
	}

	public formatNum( num ) {
		if (num < 10) {
			num = '0' + num;
		}
		return num;
	}

	public formateDate( dates, pattern ) {
		var date = new Date(dates),
			year: any = date.getFullYear(),
			month: any = date.getMonth() + 1,
			day: any = date.getDate(),
			hour: any = date.getHours(),
			min: any = date.getMinutes(),
			sec: any = date.getSeconds(),
			dateTime = '';

		month = this.formatNum(month);
		day = this.formatNum(day);
		hour = this.formatNum(hour);
		min = this.formatNum(min);
		sec = this.formatNum(sec);

		dateTime = pattern;

		dateTime = dateTime.replace(/Y/g, year);
		dateTime = dateTime.replace(/m/g, month);
		dateTime = dateTime.replace(/d/g, day);
		dateTime = dateTime.replace(/H/g, hour);
		dateTime = dateTime.replace(/i/g, min);
		dateTime = dateTime.replace(/s/g, sec);

		return dateTime;
	}

	public formatPhone( phoneStr ) {
		let mask = this.defaultMask;
		let str = phoneStr.replace(/\s/g, '');

		if (isNaN(parseInt(str))) {
			return mask;
		}

		this.aMasks.forEach(( element ) => {
			if (str.match(element.reg)) {
				mask = element.mask;
			}
		});
		// mask must not contain characters except '0-9', ' ' and '?'
		let formatPhone = '';
		let j = 0;
		for (let i = 0; i < str.length; i++) {
			if (mask[j] == ' ') {
				j++;
				formatPhone += ' ' + str[i];
			} else if (!isNaN(parseInt(mask[j]))) {
				formatPhone += str[i];
			}
			j++;
		}
		return formatPhone;
	}

	public changeType( newVal ) {
		this.toDate = null;
		this.fromDate = null;
		this.timePeriod1 = '';
		this.timePeriod2 = '';
		if ([1, 2, 3, 4, 7, 10, 11, 13, 14, 15].includes(parseInt(newVal))) {
			this.sorting = {
				date_from: 'Move In Date',
				name: 'User Name',
				user_status: 'User Status',
				apartment: 'Apartment #',
			};
			this.displaySorting = ![13, 14, 15].includes(parseInt(newVal));
			this.selectedSortOrder = '';
			this.selectedSorting = '';
		} else if (newVal == 6) {
			this.sorting = {
				created_at: 'Creation Date',
				type: 'Notification Type',
			};
			this.displaySorting = true;
			this.selectedSortOrder = '';
			this.selectedSorting = '';
		} else if (newVal == 8) {
			this.sorting = {
				date_from: 'Move In Date',
				user_status: 'User Status',
				name: 'User Name',
				apartment: 'Apartment #',
			};
			this.displaySorting = true;
			this.selectedSortOrder = '';
			this.selectedSorting = '';
		} else if (newVal == 12) {
			this.sorting = {
				date_from: 'Move In Date',
				name: 'User Name',
				user_status: 'User Status',
				apartment: 'Apartment #',
			};
			this.displaySorting = false;
			this.selectedSortOrder = 'asc';
			this.selectedSorting = 'apartment';
		} else {
			this.displaySorting = false;
		}
	}

	public changeDate() {
		// this.clearTimePeriod();
		if (
			this.type == 5 ||
			this.type == 7 ||
			this.type == 8 ||
			this.type == 9 ||
			this.type == 10 ||
			this.type == 11 ||
			this.type == 12 ||
			this.type == 15
		) {
			if (this.fromDate && this.toDate) {
				return;
			} else {
				this.toDate = new Date();
				this.fromDate = new Date();
			}
		}
	}

	public generateCsv() {
		this.filter = {
			type: this.type,
			from:
				this.fromDate.getMonth() +
				1 +
				'/' +
				this.fromDate.getDate() +
				'/' +
				this.fromDate.getFullYear(),
			to:
				this.toDate.getMonth() +
				1 +
				'/' +
				this.toDate.getDate() +
				'/' +
				this.toDate.getFullYear(),
			sort_type: this.selectedSorting,
			sort_order: this.selectedSortOrder,
		};

		if (this.type === 15) {
			this.filter.from = '01/01/2015';
		}
		// this.apiService.getText(API.manager.generateCsv + this.buildId + '?' + this.param(this.filter))
		//   .subscribe(res => {
		//     console.log(res);
		//   })
		this.apiService
			.get(
				API.manager.generateCsv + this.buildId + '?' + this.param(this.filter)
			)
			.subscribe(( res ) => {
				console.log(res);
				if (res.status) {
					window.open(environment.baseUrl + '/' + res.fileName, '_blank');
				} else {

				}
			});
		// $window.open('/api/manager/generate_csv/' + this.id + '?' + $.param(this.filter), '_self');

	}

	public param( a ) {
		return Object.keys(a)
			.map(function ( k ) {
				return encodeURIComponent(k) + '=' + encodeURIComponent(a[k]);
			})
			.join('&');
	}

	public back(): void {
		this.navigation.back();
	}

	public submit(): void {
		if (
			this.type == 10 ||
			this.type == 11 ||
			this.type == 12 ||
			this.type == 15 ||
			this.type == 5 ||
			this.type == 7 ||
			this.type == 8 ||
			this.type == 9
		) {
			this.timePeriod1 = '6';
			this.selectTimePeriod1();
		}
		this.filter = {
			type: this.type,
			from:
				this.fromDate?.getMonth() +
				1 +
				'/' +
				this.fromDate?.getDate() +
				'/' +
				this.fromDate?.getFullYear(),
			to:
				this.toDate?.getMonth() +
				1 +
				'/' +
				this.toDate?.getDate() +
				'/' +
				this.toDate?.getFullYear(),
			sort_type: this.selectedSorting,
			sort_order: this.selectedSortOrder,
		};

		if (this.type === 15) {
			this.filter.from = '01/01/2015';
		}

		let outPutDate = {
			type: this.type,
			from:
				(this.fromDate.getDate() < 10 ? '0' : '') +
				this.fromDate.getDate() +
				'/' +
				((this.fromDate.getMonth() < 9 ? '0' : '') +
					(this.fromDate.getMonth() + 1)) +
				'/' +
				this.fromDate.getFullYear(),
			to:
				(this.toDate.getDate() < 10 ? '0' : '') +
				this.toDate.getDate() +
				'/' +
				((this.toDate.getMonth() < 9 ? '0' : '') +
					(this.toDate.getMonth() + 1)) +
				'/' +
				this.toDate.getFullYear(),
		};

		this.showFromDate = outPutDate.from;
		this.showToDate = outPutDate.to;

		this.apiService
			.get(API.manager.getReport + this.buildId + '?' + this.param(this.filter))
			.subscribe(
				( response ) => {
					console.log(response);
					this.buttonText = BUTTONS.generate;
					if (response.status) {
						let i,
							pattern = 'd/m/Y H:i';

						this.total = response.total;

						for (i in response.data) {
							if (
								response.data[i].date_from != undefined ||
								response.data[i].date_to != undefined
							) {
								response.data[i].date_from = this.formateDate(
									response.data[i].date_from,
									pattern
								);
								response.data[i].date_to = this.formateDate(
									response.data[i].date_to,
									pattern
								);
							}
							if (
								response.data[i].user != undefined &&
								response.data[i].user.phone != undefined
							) {
								response.data[i].user.phone = this.formatPhone(
									response.data[i].user.phone
								);
							}
						}
						this.data = response.data;

						if ([13, 14, 15].includes(this.type)) {
							this.data = this.data.map(( parcel ) => {
								parcel.updated_at = new Date(parcel.updated_at).toDateString();
								return parcel;
							});
						}
						this.showData = true;
					} else {
						this.alert.show(response.message || ERROR.internal);
					}
				},
				() => {
					this.buttonText = BUTTONS.generate;
					this.loading = false;
				}
			);
		this.showFromDate = outPutDate.from;
		this.showToDate = outPutDate.to;
	}
}
