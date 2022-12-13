(self["webpackChunkmimor_ionic"] = self["webpackChunkmimor_ionic"] || []).push([["src_app_resident_resident_module_ts"],{

/***/ 88074:
/*!*************************************************************************!*\
  !*** ./src/app/resident/book-area/resident-book-area.page.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResidentBookAreaPage": () => (/* binding */ ResidentBookAreaPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_resident_book_area_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./resident-book-area.page.html */ 9980);
/* harmony import */ var _resident_book_area_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resident-book-area.page.scss */ 99492);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/constants/buttons.constants */ 21614);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _services_window_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/window.service */ 99004);














let ResidentBookAreaPage = class ResidentBookAreaPage {
    constructor(router, route, rolesService, apiService, alert, alertController, windowRef) {
        this.router = router;
        this.route = route;
        this.rolesService = rolesService;
        this.apiService = apiService;
        this.alert = alert;
        this.alertController = alertController;
        this.windowRef = windowRef;
        this.buttonText = _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_4__.BUTTONS.book;
        this.selectedDate = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required);
        this.selectedHour = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required);
        this.minDate = new Date();
        this.showRulesModal = false;
        this.buildId = this.route.snapshot.paramMap.get('buildId');
        this.areaId = this.route.snapshot.paramMap.get('areaId');
        this.model = {};
        this.isEdit = !!this.route.snapshot.paramMap.get('bookingId');
        this.bookingId = this.route.snapshot.paramMap.get('bookingId');
        this.apartment = JSON.parse(this.windowRef.nativeWindow.sessionStorage.getItem('currentApartment'));
        this.wDays = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday'
        };
        this.freeArea = true;
        this.hasFee = false;
        this.hasPrice = false;
        console.log('resident area booking constructor');
    }
    ngOnInit() {
        if (this.areaId) {
            this.getArea();
        }
        else
            this.router.navigateByUrl('manager/buildings');
    }
    getArea() {
        this.apiService.post('/api/client/getArea', {
            build_id: parseInt(this.buildId),
            area_id: parseInt(this.areaId),
            booking_id: parseInt(this.bookingId),
            is_edit: this.isEdit
        }).subscribe((response) => {
            if (response.status) {
                this.commonArea = response.common_area;
                if (response.area_booking) {
                    let date_from = response.area_booking.date_from;
                    this.model.date = new Date(date_from);
                    this.selectedDate.setValue(this.model.date);
                    this.model.hour = new Date(date_from).getHours();
                    this.loadHours();
                }
                this.getPrice();
            }
            else {
                this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_6__.ERROR.internal);
                this.router.navigateByUrl('resident/book-area/view' + this.buildId);
            }
        });
    }
    getPrice() {
        this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__.API.manager.showCommonAreas + this.buildId).subscribe((response) => {
            if (response.status) {
                let areas = response.building.common_areas;
                this.area = areas.find(area => parseInt(area.id) === parseInt(this.areaId));
                if (this.area && (this.area.price || this.area.fee)) {
                    this.freeArea = false;
                }
                this.hasPrice = !!this.area.price;
                this.hasFee = !!this.area.fee;
                console.log(this.area);
            }
            else {
                this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_6__.ERROR.internal);
                this.router.navigateByUrl('resident/book-area/view' + this.buildId);
            }
        });
    }
    loadHours() {
        let h = this.model.hour;
        this.model.hour = '';
        this.model.date = this.selectedDate.value;
        let year = this.model.date.getFullYear(), month = (this.model.date.getMonth() + 1) < 10 ? '0' + (this.model.date.getMonth() + 1) : '' + (this.model.date.getMonth() + 1), day = this.model.date.getDate() < 10 ? '0' + this.model.date.getDate() : '' + this.model.date.getDate(), numDay = this.model.date.getDay(), wDay = this.wDays[numDay], selectedArea = this.areaId;
        this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__.API.client.getAreaFreeHours + encodeURIComponent(year + '-' + month + '-' + day)
            + (this.isEdit ? '&booking_id=' + this.bookingId : '') + '&wDay=' + wDay + '&area=' + selectedArea).subscribe((response) => {
            if (response.status) {
                let hours = response.hours, hour = 0, from = 0, to = 0, dayPartFrom = 'am', dayPartTo = 'pm', i;
                let newHours = [];
                if (response.today) {
                    let currentHour = response.current_time;
                    let currentMin = response.current_min;
                    for (i in response.hours) {
                        from = response.hours[i].from;
                        to = response.hours[i].to;
                        dayPartFrom = response.hours[i]['day_part_from'];
                        dayPartTo = response.hours[i]['day_part_to'];
                        let from_min = response.hours[i].from_min;
                        let to_min = response.hours[i].to_min;
                        let checkTime = this.timeConverFrom12(from, from_min, to, to_min, currentHour, currentMin, dayPartFrom, dayPartTo);
                        if (checkTime) {
                            newHours.push(response.data.hours[i]);
                        }
                    }
                    hours = newHours;
                }
                this.hours = [];
                for (i in hours) {
                    this.hours.push(hours[i]);
                }
                h = (h > 12) ? h - 12 : h;
                if (Object.values(hours).length > 0) {
                    Object.values(hours).forEach((element) => {
                        if (Number.parseInt(element.from) === h) {
                            this.model.hour = element.id;
                            this.selectedHour.setValue(this.model.hour);
                        }
                    });
                }
                return;
            }
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_6__.ERROR.internal);
        });
    }
    ;
    timeConverFrom12(from, fmin, to, tmin, currentHour, cmin, dayPartFrom, dayPartTo) {
        from = parseInt(from);
        to = parseInt(to);
        if (from > 12 || from < 0 || to > 12 || to < 0) {
            return false;
        }
        dayPartFrom = dayPartFrom.trim().toLowerCase();
        dayPartTo = dayPartTo.trim().toLowerCase();
        if (dayPartFrom == 'pm') {
            if (from !== 12) {
                from = from + 12;
            }
            if (this.compareTime({ h: from, m: fmin }, { h: currentHour, m: cmin })) {
                return true;
            }
        }
        if (dayPartTo == 'am') {
            if (this.compareTime({ h: to, m: tmin }, { h: currentHour, m: cmin })) {
                return true;
            }
        }
        else {
            if (to !== 12) {
                to = to + 12;
            }
            if (this.compareTime({ h: to, m: tmin }, { h: currentHour, m: cmin })) {
                return true;
            }
        }
        return false;
    }
    ;
    compareTime(time1, time2) {
        let comp1 = new Date();
        let comp2 = new Date();
        comp1.setHours(parseInt(time1.h, 10), parseInt(time1.m, 10), 0);
        comp2.setHours(parseInt(time2.h, 10), parseInt(time2.m, 10), 0);
        if (comp1 > comp2) {
            return true;
        }
        else if (comp1 < comp2) {
            return false;
        }
        else {
            return null;
        }
    }
    back() {
        this.router.navigateByUrl('resident/dashboard');
    }
    submit() {
        // this.showRulesModal = true;
        let dateMonth = this.selectedDate.value.getMonth() + 1 > 9 ? this.selectedDate.value.getMonth() + 1 : '0' + (this.selectedDate.value.getMonth() + 1);
        let dateDay = this.selectedDate.value.getDate() > 9 ? this.selectedDate.value.getDate() : '0' + this.selectedDate.value.getDate();
        const dateModal = `${dateDay}/${dateMonth}/${this.selectedDate.value.getFullYear()}`;
        const date = `${this.selectedDate.value.getFullYear()}-${this.selectedDate.value.getMonth() + 1}-${this.selectedDate.value.getDate()}`;
        const hour = this.hours.find(h => h.id == parseInt(this.selectedHour.value));
        const hourStr = hour.from + ':' + hour.from_min + ' ' + hour.day_part_from + ' - ' + hour.to + ':' + hour.to_min + ' ' + hour.day_part_to;
        if (this.freeArea || this.isEdit) {
            this.saveBooking();
        }
        else {
            this.apiService.post('/api/payment/customer/info').subscribe(res => {
                if (res.length === 0) {
                    this.router.navigateByUrl(`/resident/book-area/${this.buildId}/${this.areaId}/payment?date=${date}&hour=${this.selectedHour.value}&hourStr=${hourStr}`);
                }
                else {
                    this.customerId = res[res.length - 1].stripe_user_id;
                    this.paymentConfirm(res[res.length - 1], date, dateModal, hourStr);
                }
            });
        }
    }
    saveBooking() {
        if (this.loading) {
            return false;
        }
        this.loading = true;
        this.model.area_id = this.areaId;
        this.model.build_id = this.buildId;
        this.model.is_edit = false;
        this.model.area_booking_id = false;
        this.model.apartment_id = this.apartment.apartment.id;
        this.model.hour = parseInt(this.selectedHour.value);
        this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__.API.client.saveCommonAreaBooking, this.model).subscribe((response) => {
            if (response.status) {
                this.currentBookingId = response.booking_id;
                if (this.freeArea || this.isEdit) {
                    this.router.navigateByUrl(`resident/book-area/${this.buildId}/show`);
                }
                else
                    this.paymentInt();
            }
            else {
                this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_6__.ERROR.internal);
                this.loading = false;
            }
        }, () => {
            this.loading = false;
        });
    }
    paymentInt() {
        let payload = {
            common_area_id: this.areaId,
            customer_id: this.customerId,
            booking_id: this.currentBookingId,
            method_type: 'card',
            currency: 'aud',
            building_id: parseInt(this.buildId)
        };
        this.apiService.post('/api/payment/paymentIntent', payload).subscribe(response => {
            this.paymentStatus = response.status === 'succeeded' ? 'successful' : response.status;
            this.loading = false;
            this.alert.show(`Your payment for ${this.amount / 100} AUD (${this.price} AUD refundable and ${this.fee} AUD fee) is ${this.paymentStatus}`, 'Notification has been sent');
            this.router.navigateByUrl(`resident/book-area/${this.buildId}/show`);
        });
    }
    paymentConfirm(customer, date, dateModal, hour) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'resident-payment',
                header: 'Confirm credentials',
                message: `<p>Your email is <b>${customer.email}</b>, your card number is <b>**** **** **** ${customer.account_number}</b></p>
                <p>Would you like to use your current credentials or change them?</p>`,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                        }
                    }, {
                        text: 'Сhange',
                        handler: () => {
                            this.router.navigateByUrl(`/resident/book-area/${this.buildId}/${this.areaId}/payment?date=${date}&hour=${this.selectedHour.value}&hourStr=${hour}`);
                        }
                    }, {
                        text: 'Confirm',
                        handler: () => {
                            this.priceConfirm(dateModal, hour);
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    priceConfirm(dateModal, hour) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            this.price = this.area.price ? parseFloat(this.area.price) : 0;
            this.fee = this.area.fee ? parseFloat(this.area.fee) : 0;
            this.amount = (this.price + this.fee) * 100;
            const alert = yield this.alertController.create({
                cssClass: 'resident-payment',
                header: 'Confirm',
                message: `You are being charged ${this.amount / 100} AUD (${this.price} AUD refundable and ${this.fee} AUD fee) for your booking of the ${this.area.name} on the ${dateModal}, ${hour}`,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                        }
                    }, {
                        text: 'Confirm',
                        handler: () => {
                            console.log('book');
                            this.saveBooking();
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
};
ResidentBookAreaPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_3__.RolesService },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_7__.AlertService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.AlertController },
    { type: _services_window_service__WEBPACK_IMPORTED_MODULE_8__.WindowRefService }
];
ResidentBookAreaPage = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
        selector: 'app-res-book-area',
        template: _raw_loader_resident_book_area_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_resident_book_area_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ResidentBookAreaPage);



/***/ }),

/***/ 70401:
/*!****************************************************************!*\
  !*** ./src/app/resident/book-lift/book-lift.page.component.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BookLiftPage": () => (/* binding */ BookLiftPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_book_lift_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./book-lift.page.html */ 53234);
/* harmony import */ var _book_lift_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./book-lift.page.scss */ 61786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/buttons.constants */ 21614);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);
/* harmony import */ var _shared_constants_mock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constants/mock */ 1455);













let BookLiftPage = class BookLiftPage {
    constructor(router, route, rolesService, apiService, alert) {
        this.router = router;
        this.route = route;
        this.rolesService = rolesService;
        this.apiService = apiService;
        this.alert = alert;
        this.buttonText = _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_6__.BUTTONS.book;
        this.selectedDate = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(new Date(), _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required);
        this.selectedHour = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required);
        this.minDate = new Date();
        this.hours = _shared_constants_mock__WEBPACK_IMPORTED_MODULE_8__.HOURS;
        this.timeslots = [];
        this.bookingId = this.route.snapshot.paramMap.get('bookingId');
        this.loading = true;
        this.wDays = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday'
        };
        this.pageLoading = false;
        console.log('resident lift booking constructor');
    }
    ngOnInit() {
        if (this.bookingId) {
            this.getBooking();
        }
        else
            this.router.navigateByUrl('resident/dashboard');
    }
    getBooking() {
        this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__.API.client.getBookingInfo + this.bookingId)
            .subscribe((resp) => {
            if (!resp.status) {
                this.alert.show(resp.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__.ERROR.internal);
                this.router.navigateByUrl('resident/dashboard');
            }
            if (resp.booking.allow_move_in == '0') {
                this.router.navigateByUrl('resident/dashboard');
            }
            this.buildingID = resp.booking.building_id;
            this.apartmentID = resp.booking.appartment_id;
            this.userStatus = resp.booking.user_status;
            this.isResiding = resp.booking.is_residing;
            this.buildingName = resp.booking.build_name;
            if (Number(resp.booking.booking_delay) && !isNaN(Number(resp.booking.booking_delay))) {
                let selectedDate = this.addDays(new Date(), Number(resp.booking.booking_delay));
                this.selectedDate.setValue(selectedDate);
                this.minDate = this.addDays(new Date(), Number(resp.booking.booking_delay));
            }
            this.loadTimeslots(true);
        }), () => {
            this.router.navigateByUrl('resident/dashboard');
        };
    }
    timeConverFrom12(from, fmin, to, tmin, currentHour, cmin, dayPartFrom, dayPartTo) {
        from = parseInt(from);
        to = parseInt(to);
        if (from > 12 || from < 0 || to > 12 || to < 0) {
            return false;
        }
        dayPartFrom = dayPartFrom.trim().toLowerCase();
        dayPartTo = dayPartTo.trim().toLowerCase();
        if (dayPartFrom == 'pm') {
            if (from !== 12) {
                from = from + 12;
            }
            if (this.compareTime({ h: from, m: fmin }, { h: currentHour, m: cmin })) {
                return true;
            }
        }
        if (dayPartTo == 'am') {
            if (this.compareTime({ h: to, m: tmin }, { h: currentHour, m: cmin })) {
                return true;
            }
        }
        else {
            if (to !== 12) {
                to = to + 12;
            }
            if (this.compareTime({ h: to, m: tmin }, { h: currentHour, m: cmin })) {
                return true;
            }
        }
        return false;
    }
    ;
    compareTime(time1, time2) {
        let comp1 = new Date();
        let comp2 = new Date();
        comp1.setHours(parseInt(time1.h, 10), parseInt(time1.m, 10), 0);
        comp2.setHours(parseInt(time2.h, 10), parseInt(time2.m, 10), 0);
        if (comp1 > comp2) {
            return true;
        }
        else if (comp1 < comp2) {
            return false;
        }
        else {
            return null;
        }
    }
    addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    loadTimeslots(init) {
        console.log(this.selectedDate);
        let year = this.selectedDate.value.getFullYear(), month = (this.selectedDate.value.getMonth() + 1) < 10 ? '0' + (this.selectedDate.value.getMonth() + 1) : '' + (this.selectedDate.value.getMonth() + 1), day = this.selectedDate.value.getDate() < 10 ? '0' + this.selectedDate.value.getDate() : '' + this.selectedDate.value.getDate(), numDay = this.selectedDate.value.getDay(), wDay = this.wDays[numDay], reqString = '';
        reqString = 'date=' + encodeURIComponent(year + '-' + month + '-' + day)
            + '&building=' + this.buildingID
            + '&wDay=' + wDay;
        this.apiService.get('/api/client/getHours?' + reqString)
            .subscribe((response) => {
            if (response.status === true) {
                let hours = response.hours, hour = 0, from = 0, to = 0, dayPartFrom = 'am', i;
                if (response.today) {
                    let currentHour = response.current_time;
                    let currentMin = response.current_min;
                    let newHours = [];
                    for (i in response.hours) {
                        from = response.hours[i].from;
                        to = response.hours[i].to;
                        dayPartFrom = response.hours[i]['day_part_from'];
                        let dayPartTo = response.hours[i]['day_part_to'];
                        let from_min = response.hours[i].from_min;
                        let to_min = response.hours[i].to_min;
                        let checkTime = this.timeConverFrom12(from, from_min, to, to_min, currentHour, currentMin, dayPartFrom, dayPartTo);
                        if (checkTime) {
                            newHours.push(response.hours[i]);
                        }
                    }
                    hours = newHours;
                }
                this.timeslots = [];
                for (i in hours) {
                    this.timeslots.push(hours[i]);
                }
                this.loading = false;
                return false;
            }
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__.ERROR.internal);
        });
    }
    ;
    back() {
        this.router.navigateByUrl('resident/dashboard');
    }
    submit() {
        console.log(this.selectedDate.value, this.selectedHour.value);
        if (this.pageLoading) {
            return;
        }
        let year = this.selectedDate.value.getFullYear(), month = (this.selectedDate.value.getMonth() + 1) < 10 ? '0' + (this.selectedDate.value.getMonth() + 1) : '' + (this.selectedDate.value.getMonth() + 1), day = this.selectedDate.value.getDate() < 10 ? '0' + this.selectedDate.value.getDate() : '' + this.selectedDate.value.getDate();
        this.pageLoading = true;
        this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__.API.client.bookLift, {
            building_id: this.buildingID,
            apartment_id: this.apartmentID,
            date: encodeURIComponent(year + '-' + month + '-' + day),
            time_id: this.selectedHour.value,
            user_status: this.userStatus,
            is_residing: this.isResiding,
            current_booking: this.bookingId,
        })
            .subscribe((resp) => {
            if (resp.status === true) {
                this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__.API.client.sendToEmail + this.buildingID, {
                    booking: resp.booking_id,
                    lift_booking: true,
                })
                    .subscribe((resp) => {
                    this.router.navigateByUrl('resident/guidelines/view/' + this.buildingID);
                })
                    , (() => {
                        this.alert.show(resp.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__.ERROR.internal);
                    });
                return;
            }
            this.alert.show(resp.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__.ERROR.internal);
            this.pageLoading = false;
        }, () => {
            this.pageLoading = false;
        });
    }
};
BookLiftPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_4__.RolesService },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__.ApiService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_2__.AlertService }
];
BookLiftPage = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Component)({
        selector: 'app-book-lift',
        template: _raw_loader_book_lift_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_book_lift_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], BookLiftPage);



/***/ }),

/***/ 18599:
/*!******************************************************************!*\
  !*** ./src/app/resident/build-info/build-info.page.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BuildInfoPage": () => (/* binding */ BuildInfoPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_build_info_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./build-info.page.html */ 95945);
/* harmony import */ var _build_info_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./build-info.page.scss */ 56383);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);









let BuildInfoPage = class BuildInfoPage {
    constructor(router, rolesService, route, apiService, alert) {
        this.router = router;
        this.rolesService = rolesService;
        this.route = route;
        this.apiService = apiService;
        this.alert = alert;
        this.searchFilter = '';
        this.fromPage = true;
        this.buildId = this.route.snapshot.paramMap.get('buildId');
        this.keyPDF = {};
        this.loading = true;
        console.log('building information constructor');
    }
    ngOnInit() {
        if (this.buildId) {
            this.getInfo();
        }
    }
    getInfo() {
        let location, parking, mapInited = false, marker, pmarker, map, m;
        this.apiService.get('/booking/askQuest4?id=' + this.buildId)
            .subscribe((response) => {
            if (response.status === true) {
                this.building = response.building;
                for (let m in this.building.categories) {
                    this.keyPDF[m] = this.building.categories[m].name;
                }
                this.fileInfo = response.fileInfo;
                // location = new google.maps.LatLng(this.building.lat, this.building.lng);
                if (this.building.parking) {
                    var p = this.building.parking;
                    this.parking = {};
                }
                this.loading = false;
                return;
            }
            this.loading = false;
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_5__.ERROR.internal);
            this.router.navigateByUrl('resident/dashboard');
        }, () => {
            this.loading = false;
            this.router.navigateByUrl('resident/dashboard');
        });
    }
    fromFileInfo() {
        // TO DO
    }
    back() {
        this.router.navigateByUrl('resident/dashboard');
    }
};
BuildInfoPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_4__.RolesService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__.ApiService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_2__.AlertService }
];
BuildInfoPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-build-info',
        template: _raw_loader_build_info_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_build_info_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], BuildInfoPage);



/***/ }),

/***/ 57252:
/*!********************************************************************!*\
  !*** ./src/app/resident/change-move/change-move.page.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangeMovePage": () => (/* binding */ ChangeMovePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_change_move_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./change-move.page.html */ 22236);
/* harmony import */ var _change_move_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./change-move.page.scss */ 79725);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _services_window_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/window.service */ 99004);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constants/buttons.constants */ 21614);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);













let ChangeMovePage = class ChangeMovePage {
    constructor(router, route, rolesService, apiService, windowRef, alert) {
        this.router = router;
        this.route = route;
        this.rolesService = rolesService;
        this.apiService = apiService;
        this.windowRef = windowRef;
        this.alert = alert;
        this.buttonText = _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_7__.BUTTONS.book;
        this.selectedDate = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required);
        this.selectedHour = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required);
        this.minDate = new Date();
        this.loading = true;
        this.hours = [];
        this.hideAlreadyMoved = true;
        this.bookLater = false;
        this.alreadyMov = false;
        this.notReadyToBook = false;
        this.readyToBook = true;
        this.guidelinesPath = '/';
        this.isLiftBooking = false;
        this.isPending = false;
        this.headerText = 'Change';
        this.makeResiding = this.route.snapshot.queryParamMap.get('makeResiding');
        this.model = {};
        this.wDays = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday'
        };
        this.bookingId = this.route.snapshot.paramMap.get('bookingId');
        this.currentApartment = JSON.parse(this.windowRef.nativeWindow.sessionStorage.getItem('currentApartment'));
        this.apartment = '';
        this.out = this.route.snapshot.url[0].path === 'move-out';
        // public next = $location.path().substr(6, 4) === 'next';
        // public isNewBooking = $location.path().match(/(\/move-new|\/new-booking)/) || undefined;
        // public moveOut = $location.path().split('/')[1] === 'move-out' ? true : false;
        this.isMoveDateChange = this.route.snapshot.url.length === 3 && this.route.snapshot.url[2].path === 'change';
        console.log('resident booking constructor');
    }
    ngOnInit() {
        this.getInfo();
        if (this.currentApartment) {
            this.apartment = '&app=' + this.currentApartment.apartment.id;
        }
    }
    getInfo() {
        this.apiService.get('/api/client/getMoveStatus?' + (this.bookingId ? ('id=' + this.bookingId) : '') + (this.selectedApp ? ('&app=' + this.selectedApp) : this.apartment)).subscribe((response) => {
            if (response.status) {
                console.log(response);
                if (!response.dialog) {
                    this.router.navigateByUrl('resident/dashboard');
                    return;
                }
                this.model.status = 'moving';
                this.model.type = this.out ? 'out' : 'in';
                this.model.bookingId = response.data.id || '';
                this.model.buildingId = response.data['building_id'];
                this.buildingName = response.data['building_name'];
                this.model.tenant_role = response.data['user_status'];
                this.model.isResidenting = response.data['is_residing'];
                this.model.bookingDelay = response.data['booking_delay'];
                if (response.data['date_from'] && !this.out)
                    this.selectedDate.setValue(new Date(response.data['date_from']));
                if (!response.data.status_out && response.data.status === 'moved') {
                    this.headerText = 'Create';
                }
                else if (response.data.status_out && response.data.status_out != 'moved') {
                    this.isMoveDateChange = true;
                }
                if (response.data['status'] == 'pending') {
                    this.headerText = 'Create';
                }
                // Change title accordingly
                if (response.is_lift == '1') {
                    this.isLiftBooking = true;
                    this.model.hour = response.data.moveInFromHour;
                }
                this.allowMoveIn = response.allow_move_in;
                if (this.allowMoveIn === '0' || this.allowMoveIn === false) {
                    this.alreadyMovedIn();
                }
                // We then find out if we're in a Move out booking we want to set back to the Booking In date
                // But cannot because setMinDate won't work if the date passed as param < current Mindate
                if (this.out && response.data['date_out']) {
                    this.setMinDate(response.data['date_to']);
                }
                else if (this.next) {
                    this.model.next = true;
                    this.setMinDate(response.data['date_to']);
                    if (!this.bookingId) {
                        this.model.bookingId = undefined;
                    }
                }
                this.minDate = this.addDays(this.minDate, Number(this.model.bookingDelay));
                if (this.bookingId) {
                    // show some warnings
                    if (!this.out && response.data.status === 'moved') {
                        this.alert.show(_shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.movedInAlready);
                        this.router.navigateByUrl('resident/dashboard');
                    }
                    else if (this.out && response.data['status_out'] === 'moved') {
                        this.alert.show(_shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.movedOutAlready);
                        this.router.navigateByUrl('resident/dashboard');
                    }
                    if (this.out && response.data['status_out'] === 'moving') {
                        // set currentDate as date_out_from
                        this.title = 'Change book out time';
                        this.currentDate = response.data['date_out'] * 1000;
                        this.hideAlreadyMoved = true;
                    }
                    else if (!this.out && response.data.status === 'moving') {
                        // set currentDate to date_to of a booking
                        this.currentDate = response.data['date_to'] * 1000;
                    }
                    if (!this.out && !this.next && response.data['date_out']) {
                        this.maxDate = new Date((response.data['date_out'] - 24 * 3600) * 1000);
                    }
                    if (this.out && !response.data['status_out']) {
                        this.hideAlreadyMoved = false;
                    }
                    if (this.currentDate) {
                        this.changeDate = true;
                        this.model.date = new Date(this.currentDate);
                        this.selectedDate.setValue(this.model.date);
                        this.model.hour = response.data[this.out ? 'moveOutFromHour' : 'moveInFromHour'];
                        this.loadHours(true);
                        this.buttonText = _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_7__.BUTTONS.change;
                    }
                }
                this.getBlockDates();
                return;
            }
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
            this.router.navigateByUrl('resident/dashboard');
        });
    }
    setMinDate(date) {
        let minDate;
        minDate = date * 1000;
        if (minDate > this.minDate.getTime()) {
            this.minDate = new Date(minDate);
        }
    }
    ;
    loadHours(init) {
        let h = this.model.hour;
        if (!this.model.hour)
            this.model.hour = '';
        this.model.date = this.selectedDate.value;
        let year = this.model.date.getFullYear(), month = (this.model.date.getMonth() + 1) < 10 ? '0' + (this.model.date.getMonth() + 1) : '' + (this.model.date.getMonth() + 1), day = this.model.date.getDate() < 10 ? '0' + this.model.date.getDate() : '' + this.model.date.getDate(), numDay = this.model.date.getDay(), wDay = this.wDays[numDay];
        this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.getHours + '?date=' + encodeURIComponent(year + '-' + month + '-' + day)
            + '&building=' + this.model.buildingId + (this.isLiftBooking && this.isMoveDateChange || this.changeDate ? '&id=' + this.bookingId : '') + '&wDay=' + wDay).subscribe((response) => {
            if (response.status) {
                let hours = response.hours, hour = 0, from = 0, to = 0, dayPartFrom = 'am', dayPartTo = 'pm', i;
                let newHours = [];
                if (response.today) {
                    let currentHour = response.current_time;
                    let currentMin = response.current_min;
                    for (i in response.hours) {
                        from = response.hours[i].from;
                        to = response.hours[i].to;
                        dayPartFrom = response.hours[i]['day_part_from'];
                        dayPartTo = response.hours[i]['day_part_to'];
                        let from_min = response.hours[i].from_min;
                        let to_min = response.hours[i].to_min;
                        let checkTime = this.timeConverFrom12(from, from_min, to, to_min, currentHour, currentMin, dayPartFrom, dayPartTo);
                        if (checkTime) {
                            newHours.push(response.hours[i]);
                        }
                    }
                    hours = newHours;
                }
                this.hours = [];
                for (i in hours) {
                    this.hours.push(hours[i]);
                }
                h = (h > 12) ? h - 12 : h;
                if (Object.values(hours).length > 0) {
                    Object.values(hours).forEach((element) => {
                        if (Number.parseInt(element.from) === h) {
                            this.model.hour = element.id;
                            this.selectedHour.setValue(this.model.hour);
                        }
                    });
                }
                this.loading = false;
                return;
            }
            this.loading = false;
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
        });
    }
    ;
    timeConverFrom12(from, fmin, to, tmin, currentHour, cmin, dayPartFrom, dayPartTo) {
        from = parseInt(from);
        to = parseInt(to);
        if (from > 12 || from < 0 || to > 12 || to < 0) {
            return false;
        }
        dayPartFrom = dayPartFrom.trim().toLowerCase();
        dayPartTo = dayPartTo.trim().toLowerCase();
        if (dayPartFrom == 'pm') {
            if (from !== 12) {
                from = from + 12;
            }
            if (this.compareTime({ h: from, m: fmin }, { h: currentHour, m: cmin })) {
                return true;
            }
        }
        if (dayPartTo == 'am') {
            if (this.compareTime({ h: to, m: tmin }, { h: currentHour, m: cmin })) {
                return true;
            }
        }
        else {
            if (to !== 12) {
                to = to + 12;
            }
            if (this.compareTime({ h: to, m: tmin }, { h: currentHour, m: cmin })) {
                return true;
            }
        }
        return false;
    }
    ;
    compareTime(time1, time2) {
        let comp1 = new Date();
        let comp2 = new Date();
        comp1.setHours(parseInt(time1.h, 10), parseInt(time1.m, 10), 0);
        comp2.setHours(parseInt(time2.h, 10), parseInt(time2.m, 10), 0);
        if (comp1 > comp2) {
            return true;
        }
        else if (comp1 < comp2) {
            return false;
        }
        else {
            return null;
        }
    }
    getBlockDates() {
        this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.getBlockBuild, { 'building_id': this.model.buildingId })
            .subscribe((response) => {
            this.blockDates = response.data;
            this.loading = false;
        });
    }
    addDays(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
    alreadyMovedIn() {
        this.alreadyMov = true;
        this.model.date = new Date();
        this.model.hour = new Date().getHours();
        this.model.dateTime = this.getNowDateTime('Y-m-d H:i:s');
        this.selectedDate.setValue(this.model.date);
        if (this.model.hour % 2 === 1) {
            this.model.hour--;
        }
        this.selectedHour.setValue(this.model.hour);
        this.submit();
    }
    ;
    getNowDateTime(pattern) {
        let date = this.bookLater ? new Date(0) : new Date(), year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(), hour = date.getHours(), min = date.getMinutes(), sec = date.getSeconds(), dateTime = '';
        month = this.formatNum(month);
        day = this.formatNum(day);
        hour = this.formatNum(hour);
        min = this.formatNum(min);
        sec = this.formatNum(sec);
        dateTime = pattern;
        dateTime = dateTime.replace(/Y/g, year.toString());
        dateTime = dateTime.replace(/m/g, month.toString());
        dateTime = dateTime.replace(/d/g, day.toString());
        dateTime = dateTime.replace(/H/g, hour.toString());
        dateTime = dateTime.replace(/i/g, min.toString());
        dateTime = dateTime.replace(/s/g, sec.toString());
        return dateTime;
    }
    ;
    formatNum(num) {
        if (num < 10) {
            num = '0' + num;
        }
        return num;
    }
    ;
    back() {
        this.router.navigateByUrl('resident/dashboard');
    }
    submit() {
        if (this.loading) {
            return;
        }
        this.loading = true;
        this.buttonText = _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_7__.BUTTONS.save;
        if (this.next) {
            this.model.next = true;
        }
        if (this.isNewBooking) {
            this.model.isNewBooking = true;
        }
        if (this.alreadyMov) {
            this.model.alreadyMov = true;
        }
        if (this.bookLater) {
            this.model.bookLater = true;
        }
        let year = this.model.date.getFullYear(), month = (this.model.date.getMonth() + 1) < 10 ? '0' + (this.model.date.getMonth() + 1) : '' + (this.model.date.getMonth() + 1), day = this.model.date.getDate() < 10 ? '0' + this.model.date.getDate() : '' + this.model.date.getDate();
        let requestData = this.model;
        requestData.date = encodeURIComponent(year + '-' + month + '-' + day);
        if (!this.model.hour) {
            this.model.hour = this.selectedHour.value;
        }
        if (this.makeResiding) {
            requestData.make_residing = true;
        }
        this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.saveBooking, requestData).subscribe((response) => {
            if (response.status) {
                this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.sendToEmail + this.model.buildingId, {
                    out: this.out ? '1' : '0',
                    alreadyMov: this.alreadyMov,
                    bookLater: this.bookLater,
                    moveout: this.out,
                    update_move: this.isMoveDateChange ? [this.route.snapshot.routeConfig.path.replace(':bookingId', this.bookingId)] : false,
                    lift_booking: response.is_lift,
                })
                    .subscribe((resp) => {
                    if (this.bookLater) {
                        this.loading = false;
                        this.notReadyToBook = true;
                        this.guidelinesPath = '/#' + resp.redirect;
                    }
                    else {
                        if (this.isMoveDateChange) {
                            this.router.navigateByUrl('resident/dashboard');
                        }
                    }
                }, () => {
                    this.router.navigateByUrl('resident/dashboard');
                });
                return;
            }
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
            this.loading = false;
        }, () => {
            this.loading = false;
        });
    }
};
ChangeMovePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_4__.RolesService },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__.ApiService },
    { type: _services_window_service__WEBPACK_IMPORTED_MODULE_5__.WindowRefService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_2__.AlertService }
];
ChangeMovePage = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Component)({
        selector: 'app-change-move',
        template: _raw_loader_change_move_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_change_move_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ChangeMovePage);



/***/ }),

/***/ 39429:
/*!************************************************************************!*\
  !*** ./src/app/resident/common-areas/resident-areas.page.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResidentAreasPage": () => (/* binding */ ResidentAreasPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_resident_areas_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./resident-areas.page.html */ 94841);
/* harmony import */ var _resident_areas_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resident-areas.page.scss */ 97351);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ 92340);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);












let ResidentAreasPage = class ResidentAreasPage {
    constructor(router, route, rolesService, apiService, alert, alertController) {
        this.router = router;
        this.route = route;
        this.rolesService = rolesService;
        this.apiService = apiService;
        this.alert = alert;
        this.alertController = alertController;
        this.areas = [];
        this.common_areas = [];
        this.bookingList = [];
        this.showingRules = false;
        this.buildId = this.route.snapshot.paramMap.get('buildId');
        this.pageLoading = true;
        this.env = _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment;
        console.log('resident areas constructor');
    }
    ngOnInit() {
        if (this.buildId) {
            this.getBuilding();
        }
        else
            this.router.navigateByUrl('resident/dashboard');
    }
    getBuilding() {
        this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.manager.showCommonAreas + this.buildId, { 'order_by_date': true }).subscribe((response) => {
            if (response.status) {
                console.log(response);
                this.pageLoading = false;
                this.building = response.building;
                for (let m in this.building.common_areas) {
                    this.common_areas[m] = this.building.common_areas[m].name;
                }
                this.areas = response.building.common_areas;
                console.log(this.areas);
                this.building.common_areas.forEach((area) => {
                    if (!area.area_booking.length) {
                        return;
                    }
                    area.area_booking.forEach((area_booking) => {
                        area_booking.name = area.name;
                        this.bookingList.push(area_booking);
                    });
                });
                // this.files = response.files;
                if (this.areaRules) {
                    this.showRules(this.areaRules);
                }
            }
            else {
                this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__.ERROR.internal);
            }
        });
    }
    back() {
        this.router.navigateByUrl('resident/dashboard');
    }
    showRules(id) {
        let area = this.areas.find(area => area.id === id);
        this.areaName = area.name;
        this.areaRules = area.rules;
        this.showingRules = true;
    }
    getDateWithYearTo12(timeString = '') {
        let reg = /^(\d{2}-\d{2}-\d{4})\s(\d{2}):(\d{2})$/;
        let match = timeString.match(reg);
        if (match && match[1] && match[2] && match[3]) {
            let year = match[1], hour = +match[2], minute = +match[3];
            if (isNaN(hour) || isNaN(minute)) {
                return '';
            }
            if (hour >= 0 && hour < 12) {
                hour = hour < 10 ? '0' + hour : hour;
                minute = minute < 10 ? '0' + minute : minute;
                return `${year} ${hour}:${minute} am`;
            }
            else if (hour === 12) {
                minute = minute < 10 ? '0' + minute : minute;
                return `${year} ${12}:${minute} pm`;
            }
            else {
                hour -= 12;
                hour = hour < 10 ? '0' + hour : hour;
                minute = minute < 10 ? '0' + minute : minute;
                return `${year} ${hour}:${minute} pm`;
            }
        }
        return '';
    }
    getDateTo12(timeString = '') {
        let reg = /^(\d{2}):(\d{2})$/;
        let match = timeString.match(reg);
        if (match && match[1] && match[2]) {
            let hour = +match[1], minute = +match[2];
            if (isNaN(hour) || isNaN(minute)) {
                return '';
            }
            if (hour >= 0 && hour < 12) {
                hour = hour < 10 ? '0' + hour : hour;
                minute = minute < 10 ? '0' + minute : minute;
                return `${hour}:${minute} am`;
            }
            else if (hour === 12) {
                return `${hour}:${minute < 10 ? '0' + minute || 0 : minute} pm`;
            }
            else {
                hour -= 12;
                hour = hour < 10 ? '0' + hour : hour;
                minute = minute < 10 ? '0' + minute : minute;
                return `${hour}:${minute} pm`;
            }
        }
    }
    editAreaBooking(area, bookingId) {
        console.log(area);
        this.router.navigateByUrl(`resident/book-area/${area.building_id}/${area.id}/time/${bookingId}/edit`);
    }
    deleteAreaBooking(area_id, booking_id, area_name, date_from) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__awaiter)(this, void 0, void 0, function* () {
            console.log('delete area', area_id, booking_id, area_name, date_from);
            const alert = yield this.alertController.create({
                cssClass: 'resident-modal',
                header: 'Confirm',
                message: `Would you like to remove this booking - ${area_name} on ${date_from}?'`,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => {
                        }
                    }, {
                        text: 'Confirm',
                        handler: () => {
                            this.apiService.delete(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.deleteCommonAreaBooking + booking_id).subscribe((response) => {
                                if (response.status) {
                                    console.log(response);
                                    for (let i in this.building.common_areas) {
                                        if (this.building.common_areas[i].id == area_id) {
                                            for (let j in this.building.common_areas[i].area_booking) {
                                                if (this.building.common_areas[i].area_booking[j].id == booking_id) {
                                                    this.building.common_areas[i].area_booking.splice(j, 1);
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__.ERROR.internal);
                                }
                            });
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    checkFreeArea(area) {
        this.router.navigateByUrl(`resident/book-area/${area.building_id}/${area.id}/time`);
    }
};
ResidentAreasPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_5__.RolesService },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_4__.ApiService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_3__.AlertService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.AlertController }
];
ResidentAreasPage = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
        selector: 'app-resident-areas',
        template: _raw_loader_resident_areas_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_resident_areas_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ResidentAreasPage);



/***/ }),

/***/ 74104:
/*!******************************************************************!*\
  !*** ./src/app/resident/guidelines/guidelines.page.component.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GuidelinesPage": () => (/* binding */ GuidelinesPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_guidelines_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./guidelines.page.html */ 51109);
/* harmony import */ var _guidelines_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guidelines.page.scss */ 37459);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_navigation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/navigation.service */ 89565);
/* harmony import */ var _services_window_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/window.service */ 99004);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../environments/environment */ 92340);













let GuidelinesPage = class GuidelinesPage {
    constructor(http, apiService, router, route, navigation, windowRef, rolesService, alert) {
        this.http = http;
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        this.navigation = navigation;
        this.windowRef = windowRef;
        this.rolesService = rolesService;
        this.alert = alert;
        this.model = {};
        this.pageLoading = true;
        this.buildId = this.route.snapshot.paramMap.get('buildId');
        this.environment = _environments_environment__WEBPACK_IMPORTED_MODULE_8__.environment;
        console.log('guidelines constructor');
    }
    ngOnInit() {
        if (this.buildId) {
            this.getBuilding();
        }
        else
            this.router.navigateByUrl('resident/dashboard');
    }
    getBuilding() {
        this.apiService.get('/booking/askQuest3?id=' + this.buildId)
            .subscribe((response) => {
            if (response.status) {
                console.log(response);
                this.model = response.model;
                this.pageLoading = false;
                this.id = this.model.id;
                this.guidelinesFilesTenant = {
                    blobUrlGuidelines: {}
                };
                if (response.model.filename) {
                    let fileName = response.model.filename;
                    this.fileName = fileName.split(';');
                    for (let value in this.fileName) {
                        let filename = this.fileName[value];
                        this.guidelinesFilesTenant.blobUrlGuidelines[filename] = '/upload/pdf/' + this.id + '/guidelines/' + filename;
                    }
                }
                if (response.result.old_filename) {
                    let filenames = response.result.old_filename;
                    for (let value in filenames) {
                        let filename = filenames[value];
                        this.guidelinesFilesTenant.blobUrlGuidelines[filename] = '/upload/pdf/' + this.id + '/' + filename;
                    }
                }
                if (response.result.very_old_filename) {
                    let filename = response.result.very_old_filename;
                    this.guidelinesFilesTenant.blobUrlGuidelines[filename] = '/upload/pdf/building_' + this.id + '_guidlines.pdf';
                }
                return;
            }
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_6__.ERROR.internal);
            this.router.navigateByUrl('resident/dashboard');
        }, () => {
            this.router.navigateByUrl('resident/dashboard');
        });
    }
    back() {
        this.navigation.back();
    }
    dashboard() {
        this.router.navigateByUrl('resident/dashboard');
    }
    sendEmail() {
        console.log('Send email');
    }
    printElem(data) {
        let mywindow = this.windowRef.nativeWindow.open('', 'Building name guidelines', 'height=400,width=600');
        mywindow.document.write('<html><head><title>Mimor - Building name guidelines</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10
        mywindow.print();
        mywindow.close();
    }
    ;
    downloadFile(id, key) {
        this.apiService.getFile(`/api/client/download_pdf/${id}?filename=${key}`).subscribe(res => {
            console.log(res);
            var newBlob = new Blob([res], { type: "application/pdf" });
            console.log(newBlob);
            // this.printElem(newBlob);
            var downloadURL = this.windowRef.nativeWindow.URL.createObjectURL(newBlob);
            var link = document.createElement('a');
            link.href = downloadURL;
            link.download = "help.pdf";
            link.click();
        });
    }
    viewFile(value) {
        let url1 = value.replaceAll(' ', '%20');
        // let url  = encodeURIComponent(`${value}`);
        console.log(`${_environments_environment__WEBPACK_IMPORTED_MODULE_8__.environment.baseUrl}${url1}`, value);
        this.windowRef.nativeWindow.open(`${_environments_environment__WEBPACK_IMPORTED_MODULE_8__.environment.baseUrl}${url1}`);
    }
};
GuidelinesPage.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_10__.ActivatedRoute },
    { type: _services_navigation_service__WEBPACK_IMPORTED_MODULE_3__.NavigationService },
    { type: _services_window_service__WEBPACK_IMPORTED_MODULE_4__.WindowRefService },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_5__.RolesService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_7__.AlertService }
];
GuidelinesPage = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Component)({
        selector: 'app-guidelines',
        template: _raw_loader_guidelines_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_guidelines_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], GuidelinesPage);



/***/ }),

/***/ 7975:
/*!********************************************************************!*\
  !*** ./src/app/resident/new-booking/new-booking.page.component.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewBookingPage": () => (/* binding */ NewBookingPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_new_booking_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./new-booking.page.html */ 84040);
/* harmony import */ var _new_booking_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./new-booking.page.scss */ 38135);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 54395);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 87519);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 43190);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 45435);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ 92340);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constants/buttons.constants */ 21614);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);














let NewBookingPage = class NewBookingPage {
    constructor(router, rolesService, apiService, alert) {
        this.router = router;
        this.rolesService = rolesService;
        this.apiService = apiService;
        this.alert = alert;
        this.buildAuto = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl();
        this.apartment = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl();
        this.buildings = [];
        this.apartments = [];
        this.model = {
            user_status: "Resident",
            is_residing: 1
        };
        this.buttonText = _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_7__.BUTTONS.next;
        this.environment = _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment;
        this.currentApartment = false;
        this.showApartment = false;
        console.log('new booking constructor');
    }
    ngOnInit() {
        this.filteredBuilds = this.buildAuto.valueChanges
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.debounceTime)(200), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.switchMap)(value => this._filter(value)));
    }
    _filter(name) {
        const filterValue = name ? name.toLowerCase() : '';
        return this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.buildingByName + filterValue).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.filter)(data => !!data), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.map)((data) => {
            return data.models;
        }));
    }
    displayFn(build) {
        return build && build.name && build.address ? build.name + ' - ' + build.address : '';
    }
    selectBuild(value) {
        this.selectedBuild = value;
        this.building = value;
        this.buildAuto.setValue(value);
    }
    getApartments() {
        this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.apartments + `?buildId=${this.building.id}`)
            .subscribe((response) => {
            if (response.status) {
                this.apartments = response.apartments;
                this.building = response.building;
                this.showApartment = true;
                // this.loading = false;
                return;
            }
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
            this.router.navigateByUrl('resident/dashboard');
        }, () => {
            this.router.navigateByUrl('resident/dashboard');
        });
    }
    ;
    selectApartment(value) {
        this.selectedAp = value;
    }
    changeResidingStatus() {
        console.log('changed', this.model.user_status);
    }
    proceed() {
        this.getApartments();
        this.showApartment = true;
    }
    nextButton() {
        this.apiService.put(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.setApartment, {
            appartmentId: this.selectedAp,
            tenant_info: this.model,
            isNewBooking: ['/new-booking']
        }).subscribe((response) => {
            if (!response.status) {
                this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
                return;
            }
            if (this.model.tenant_role === 'Owner' && this.model.isResidenting != "1") {
                this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.nonResidingBooking, {
                    apartment_id: this.selectedAp,
                    date: this.getCurrentDateForServer(),
                })
                    .subscribe((resp) => {
                    if (!resp.data.status) {
                        this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
                        this.router.navigateByUrl('resident/dashboard');
                        return;
                    }
                    this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.sendToEmail + resp.building_id, {
                        'bookLater': true,
                        'booking': resp.booking_id
                    })
                        .subscribe((resp) => {
                        if (!resp.status) {
                            this.alert.show(resp.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
                        }
                        this.router.navigateByUrl('resident/dashboard');
                        return;
                    });
                    return;
                });
            }
            else {
                this.router.navigateByUrl('resident/dashboard');
                return;
            }
        });
    }
    getCurrentDateForServer(date = new Date()) {
        if (date) {
            if (isNaN(date.getTime())) {
                return null;
            }
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let hour = date.getHours();
            let min = date.getMinutes();
            let sec = date.getSeconds();
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
            hour = hour < 10 ? '0' + hour : hour;
            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;
            return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
        }
        else {
            return null;
        }
    }
    back() {
        this.router.navigateByUrl('resident/dashboard');
    }
    submit() {
    }
};
NewBookingPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.Router },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_5__.RolesService },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_4__.ApiService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_3__.AlertService }
];
NewBookingPage = (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_17__.Component)({
        selector: 'app-new-booking',
        template: _raw_loader_new_booking_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_new_booking_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], NewBookingPage);



/***/ }),

/***/ 43542:
/*!*********************************************************************!*\
  !*** ./src/app/resident/payment/resident-payment.page.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResidentPaymentPage": () => (/* binding */ ResidentPaymentPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_resident_payment_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./resident-payment.page.html */ 1386);
/* harmony import */ var _resident_payment_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resident-payment.page.scss */ 14674);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var ngx_stripe__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-stripe */ 22974);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _services_window_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/window.service */ 99004);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constants/buttons.constants */ 21614);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);
















let ResidentPaymentPage = class ResidentPaymentPage {
    constructor(router, route, rolesService, http, apiService, fb, stripeService, windowRef, alert, alertController, stripe) {
        this.router = router;
        this.route = route;
        this.rolesService = rolesService;
        this.http = http;
        this.apiService = apiService;
        this.fb = fb;
        this.stripeService = stripeService;
        this.windowRef = windowRef;
        this.alert = alert;
        this.alertController = alertController;
        this.stripe = stripe;
        this.buttonText = _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_7__.BUTTONS.book;
        this.email = '';
        this.buildId = this.route.snapshot.paramMap.get('buildId');
        this.areaId = this.route.snapshot.paramMap.get('areaId');
        this.model = {};
        this.apartment = JSON.parse(this.windowRef.nativeWindow.sessionStorage.getItem('currentApartment'));
        this.hourStr = this.route.snapshot.queryParamMap.get('hourStr');
        this.paymentSetup = false;
        this.repaymentSetup = false;
        this.cardOptions = {
            style: {
                base: {
                    color: "#32325d",
                    fontFamily: 'Arial, sans-serif',
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#aab7c4"
                    },
                    ':-webkit-autofill': {
                        color: '#aab7c4',
                    },
                },
                invalid: {
                    color: '#E25950',
                    '::placeholder': {
                        color: '#FFCCA5',
                    },
                },
            }
        };
        this.elementsOptions = {
            locale: 'en'
        };
        this.paying = false;
        console.log('resident area booking constructor');
        this.stripeTest = this.fb.group({
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,12}')]],
        });
    }
    ngOnInit() {
        this.getArea();
        if (this.route.snapshot.queryParamMap.get('date') && this.route.snapshot.queryParamMap.get('hour')) {
            this.model.date = new Date(this.route.snapshot.queryParamMap.get('date'));
            this.model.hour = parseInt(this.route.snapshot.queryParamMap.get('hour'));
        }
    }
    getArea() {
        this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.manager.showCommonAreas + this.buildId).subscribe((response) => {
            if (response.status) {
                this.buildingName = response.building.name;
                let areas = response.building.common_areas;
                this.area = areas.find(area => parseInt(area.id) === parseInt(this.areaId));
                this.commonArea = this.area;
                this.hasPrice = !!this.area.price;
                this.hasFee = !!this.area.fee;
                this.price = this.area.price ? parseFloat(this.area.price) : 0;
                this.fee = this.area.fee ? parseFloat(this.area.fee) : 0;
                this.amount = (this.price + this.fee) * 100;
                console.log(this.area);
            }
            else {
                this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
                this.router.navigateByUrl('resident/book-area/view' + this.buildId);
            }
        });
    }
    back() {
        this.router.navigateByUrl('resident/dashboard');
    }
    setupPayment() {
        this.apiService.post('/api/payment/create-payment-intent', {
            amount: this.price * 100,
            currency: 'aud'
        }).subscribe(res => {
            if (res && res.client_secret && res.payment_id) {
                this.paymentSecret = res.client_secret;
                this.paymentId = res.payment_id;
                this.stripe.confirmCardPayment(this.paymentSecret, {
                    payment_method: {
                        card: this.card.element,
                        billing_details: {
                            email: this.stripeTest.value.email
                        }
                    }
                }).subscribe(res => {
                    if (res && res.paymentIntent) {
                        this.paymentSetup = true;
                        if (this.hasFee) {
                            this.setupRepayment();
                        }
                        else {
                            this.saveBooking();
                        }
                        return;
                    }
                    this.formSubmitted = false;
                    if (res.error && res.error.message) {
                        this.alert.show(res.error.message);
                        return;
                    }
                    this.alert.show(res.error.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
                });
            }
        });
    }
    setupRepayment() {
        this.apiService.post('/api/payment/create-payment-intent', {
            amount: this.fee * 100,
            currency: 'aud'
        }).subscribe(res => {
            if (res && res.client_secret && res.payment_id) {
                this.paymentSecret = res.client_secret;
                this.repaymentId = res.payment_id;
                this.stripe.confirmCardPayment(this.paymentSecret, {
                    payment_method: {
                        card: this.card.element,
                        billing_details: {
                            email: this.stripeTest.value.email
                        }
                    }
                }).subscribe(res => {
                    if (res && res.paymentIntent) {
                        this.paymentSetup = true;
                        if (this.hasPrice && this.paymentSetup || !this.hasPrice) {
                            this.saveBooking();
                            return;
                        }
                    }
                    this.formSubmitted = false;
                    if (res.error && res.error.message) {
                        this.alert.show(res.error.message);
                        return;
                    }
                    this.alert.show(res.error.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
                });
            }
        });
    }
    saveBooking() {
        if (this.loading) {
            return;
        }
        console.log('book');
        this.loading = true;
        this.model.area_id = this.areaId;
        this.model.build_id = this.buildId;
        this.model.is_edit = false;
        this.model.area_booking_id = false;
        this.model.apartment_id = this.apartment.apartment.id;
        this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.saveCommonAreaBooking, this.model).subscribe((response) => {
            if (response.status) {
                console.log(response);
                this.currentBookingId = response.booking_id;
                this.createSubscription();
            }
            else {
                this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
                this.loading = false;
            }
        }, () => {
            this.loading = false;
        });
    }
    createSubscription() {
        if (this.stripeTest.value.email) {
            let data = {
                email: this.stripeTest.value.email,
                method_type: 'card',
                common_area_id: this.areaId,
                booking_id: this.currentBookingId,
                buildingId: this.buildId
            };
            if (this.hasPrice) {
                data.payment_id = this.paymentId;
            }
            if (this.hasFee) {
                data.repayment_id = this.repaymentId;
            }
            this.apiService.post('/api/payment/createCustomer', data).subscribe((res) => {
                this.loading = false;
                this.paymentStatus = res.payment_status === 'succeeded' ? 'successful' : res.payment_status;
                this.repaymentStatus = res.payment_status === 'succeeded' ? 'successful' : res.repayment_status;
                this.alert.show(`Your payment for ${this.amount / 100} AUD is - (${this.price} AUD refundable ${this.paymentStatus} and ${this.fee} AUD fee ${this.repaymentStatus}`, 'Notification has been sent');
            });
        }
    }
    submitPayment() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            let dateMonth = this.model.date.getMonth() + 1 > 9 ? this.model.date.getMonth() + 1 : '0' + (this.model.date.getMonth() + 1);
            let dateDay = this.model.date.getDate() > 9 ? this.model.date.getDate() : '0' + this.model.date.getDate();
            const date = `${dateDay}/${dateMonth}/${this.model.date.getFullYear()}`;
            const alert = yield this.alertController.create({
                cssClass: 'resident-modal',
                header: 'Confirm',
                subHeader: `You are being charged ${this.amount / 100} AUD (${this.price} AUD refundable and ${this.fee} AUD fee) isfor your booking of the ${this.area.name} on the ${date}, ${this.hourStr}`,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary'
                    }, {
                        text: 'Confirm',
                        handler: () => {
                            if (this.hasPrice) {
                                this.setupPayment();
                            }
                            if (this.hasFee && !this.hasPrice) {
                                this.setupRepayment();
                            }
                            console.log('Confirm Ok');
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
};
ResidentPaymentPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_4__.RolesService },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_12__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__.ApiService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormBuilder },
    { type: ngx_stripe__WEBPACK_IMPORTED_MODULE_13__.StripeService },
    { type: _services_window_service__WEBPACK_IMPORTED_MODULE_5__.WindowRefService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_2__.AlertService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.AlertController },
    { type: ngx_stripe__WEBPACK_IMPORTED_MODULE_13__.StripeService }
];
ResidentPaymentPage.propDecorators = {
    card: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ViewChild, args: [ngx_stripe__WEBPACK_IMPORTED_MODULE_13__.StripeCardNumberComponent,] }]
};
ResidentPaymentPage = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.Component)({
        selector: 'app-res-payment',
        template: _raw_loader_resident_payment_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_resident_payment_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ResidentPaymentPage);



/***/ }),

/***/ 79113:
/*!**********************************************************************************!*\
  !*** ./src/app/resident/resident-dashboard/resident-dashboard.page.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResidentDashboardPage": () => (/* binding */ ResidentDashboardPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_resident_dashboard_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./resident-dashboard.page.html */ 25043);
/* harmony import */ var _resident_dashboard_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resident-dashboard.page.scss */ 42496);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 76627);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser */ 39075);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _shared_modals_contact_contact_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/modals/contact/contact.component */ 47703);
/* harmony import */ var _shared_constants_roles_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/constants/roles.constants */ 83934);
/* harmony import */ var src_app_services_roles_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/roles.service */ 19883);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../environments/environment */ 92340);

















let ResidentDashboardPage = class ResidentDashboardPage {
    constructor(http, apiService, router, route, matIconRegistry, domSanitizer, modalController, rolesService, alert) {
        this.http = http;
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        this.matIconRegistry = matIconRegistry;
        this.domSanitizer = domSanitizer;
        this.modalController = modalController;
        this.rolesService = rolesService;
        this.alert = alert;
        this.cont_det_switchers = {};
        this.contDets = {};
        this.select = ['a', 'b', 'c', 'd'];
        this.selectOptions = {
            showBackdrop: false,
            cssClass: 'resident-dashboard-select'
        };
        this.roles = _shared_constants_roles_constants__WEBPACK_IMPORTED_MODULE_4__.ROLES;
        this.noticeNumber = 0;
        this.bookings = [];
        this.env = _environments_environment__WEBPACK_IMPORTED_MODULE_9__.environment;
        console.log('resident dashboard constructor');
        this.matIconRegistry.addSvgIcon("noticeboard", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/noticeboard.svg"));
    }
    ngOnInit() {
        this.getBooking();
    }
    checkNext() {
        return true;
    }
    getBooking(id) {
        this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.getBooking + `?lastBooking=${id}`).subscribe(response => {
            this.statusText = 'Book move in';
            if (response.status === true) {
                console.log(response);
                this.model = response.model;
                this.bookings = response.bookings;
                this.currentBooking = this.model.id;
                this.selectedBooking = this.bookings.find(el => el.id == this.currentBooking);
                if (!this.model || !response.show_comm_area) {
                    this.showCommonArea = false;
                }
                else {
                    // this.getAreas();
                }
                this.bookings.forEach((e) => {
                    if (e.id == this.model.id) {
                        this.currentApartment = e;
                        sessionStorage.setItem('currentApartment', JSON.stringify(e));
                    }
                });
                if (this.model.building.id == 469) {
                    this.allowBookLift = false;
                }
                else {
                    this.allowBookLift = true;
                }
                if (this.model.building.allow_lift == '1') {
                    this.allowBookLift = true;
                }
                else {
                    this.allowBookLift = false;
                }
                this.statusText = 'My dashboard';
                this.status = this.model['status_out'] || this.model.status;
                this.type = this.model['status_out'] ? 'out' : 'in';
                if ((this.model.user_status == 'Owner') && (this.model.is_residing == 1)) {
                    this.model.is_residing = 'Residing';
                }
                else {
                    this.model.is_residing = 'Non-Residing';
                }
                this.updateNoticeNumber();
                this.getContactDetails();
            }
        }, () => {
            this.alert.show(_shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
        });
    }
    getContactDetails() {
        this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.getContDetails + this.model.building_id)
            .subscribe((response) => {
            if (!response.status) {
                this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
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
    updateNoticeNumber() {
        // this.pageLoading = true;
        this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.getNoticeNumber + this.model.building_id)
            .subscribe((res) => {
            if (!res.status) {
                return;
            }
            this.noticeNumber = res.result;
        });
    }
    changeBooking() {
        console.log(this.selectedBooking);
        this.model = this.selectedBooking;
        this.getBooking(this.selectedBooking.id);
    }
    getFormattedDate(date) {
        if (date === '0000-00-00 00:00:00') {
            return '';
        }
        if (typeof date === 'string') {
            let regexp = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/, dateParts;
            dateParts = date.match(regexp);
            if (!dateParts) {
                return '';
            }
            date = new Date(dateParts[1], dateParts[2] - 1, dateParts[3], dateParts[4], dateParts[5], dateParts[6]);
            if (isNaN(date.getTime())) {
                return '';
            }
        }
        else if (!(date instanceof Date) || isNaN(date.getTime())) {
            return '';
        }
        let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(), hours = date.getHours(), mins = date.getMinutes(), ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 ? hours % 12 : 12;
        hours = hours > 9 ? hours : '0' + hours;
        month = month > 9 ? month : '0' + month;
        mins = mins > 9 ? mins : '0' + mins;
        day = day > 9 ? day : '0' + day;
        return day + '/' + month + '/' + year + ' ' + hours + ':' + mins + ' ' + ampm;
    }
    showContactDetails() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _shared_modals_contact_contact_component__WEBPACK_IMPORTED_MODULE_3__.ContactModal,
                cssClass: 'building-contacts-modal',
                componentProps: {
                    'model': this.model,
                    'cont_det_switchers': this.cont_det_switchers,
                    'contDets': this.contDets,
                }
            });
            return yield modal.present();
        });
    }
    getBookingType(booking) {
        let res = '';
        if (booking.is_lift == 1) {
            if (booking.status === 'moved') {
                res = '[Lift (Used)]';
            }
            else {
                res = '[Lift]';
            }
        }
        else {
            if (booking.status_out === 'moving') {
                res = '[Move Out]';
            }
            else if (booking.status === 'moved') {
                res = '[Moved In]';
            }
            else if (booking.status == 'pending') {
                if (booking.is_residing != '1' && booking.user_status === 'Owner') {
                    return '';
                }
                res = '[Incomplete]';
            }
            else {
                res = '[Move In]';
            }
        }
        return res;
    }
};
ResidentDashboardPage.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute },
    { type: _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIconRegistry },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_14__.DomSanitizer },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_15__.ModalController },
    { type: src_app_services_roles_service__WEBPACK_IMPORTED_MODULE_5__.RolesService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_7__.AlertService }
];
ResidentDashboardPage = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_16__.Component)({
        selector: 'app-resident-dashboard',
        template: _raw_loader_resident_dashboard_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_resident_dashboard_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ResidentDashboardPage);



/***/ }),

/***/ 97313:
/*!**************************************************************************************!*\
  !*** ./src/app/resident/resident-noticeboard/resident-noticeboard.page.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResidentNoticeboardPage": () => (/* binding */ ResidentNoticeboardPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_resident_noticeboard_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./resident-noticeboard.page.html */ 60035);
/* harmony import */ var _resident_noticeboard_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resident-noticeboard.page.scss */ 22494);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 76627);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 39075);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);











let ResidentNoticeboardPage = class ResidentNoticeboardPage {
    constructor(router, route, apiService, rolesService, alert, domSanitizer, matIconRegistry) {
        this.router = router;
        this.route = route;
        this.apiService = apiService;
        this.rolesService = rolesService;
        this.alert = alert;
        this.domSanitizer = domSanitizer;
        this.matIconRegistry = matIconRegistry;
        this.notices = [];
        this.buildId = this.route.snapshot.paramMap.get('buildId');
        this.isNoNotices = false;
        console.log('resident noticeboard constructor');
        this.matIconRegistry.addSvgIcon("upload2", this.domSanitizer.bypassSecurityTrustResourceUrl("assets/img/icons/upload2.svg"));
    }
    ngOnInit() {
        if (this.buildId) {
            this.getNotices();
        }
        else
            this.router.navigateByUrl('resident/dashboard');
    }
    getNotices() {
        this.apiService.get('/api/manager/getNoticeList/' + this.buildId + '?with_expires=true&with_delays=true')
            .subscribe((response) => {
            if (!response.status) {
                this.pageLoading = false;
                this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_5__.ERROR.internal);
                return;
            }
            console.log(response);
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
    fromFileInfo() {
        // TO DO
    }
    back() {
        this.router.navigateByUrl('resident/dashboard');
    }
    convertToDate(date) {
        var regexp = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/, dateParts;
        dateParts = date.match(regexp);
        if (!dateParts) {
            return '';
        }
        date = new Date(dateParts[1], dateParts[2] - 1, dateParts[3], dateParts[4], dateParts[5], dateParts[6]);
        if (isNaN(date.getTime())) {
            return null;
        }
        return new Date(date);
    }
    formatDateForClient(date) {
        if (typeof date === 'string') {
            date = this.convertToDate(date);
        }
        else if (!(date instanceof Date) || isNaN(date.getTime())) {
            return '';
        }
        if (date) {
            let dateNew = new Date(date);
            if (isNaN(dateNew.getTime())) {
                return null;
            }
            let day = dateNew.getDate();
            let month = dateNew.getMonth() + 1;
            let year = dateNew.getFullYear();
            day = day < 10 ? '0' + day : day;
            month = month < 10 ? '0' + month : month;
            return day + '/' + month + '/' + year;
        }
        else {
            return null;
        }
    }
};
ResidentNoticeboardPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__.ApiService },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_4__.RolesService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_2__.AlertService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.DomSanitizer },
    { type: _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIconRegistry }
];
ResidentNoticeboardPage = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
        selector: 'app-res-noticeboard',
        template: _raw_loader_resident_noticeboard_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_resident_noticeboard_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ResidentNoticeboardPage);



/***/ }),

/***/ 57890:
/*!*********************************************************************!*\
  !*** ./src/app/resident/resident-profile/profile.page.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResidentProfilePage": () => (/* binding */ ResidentProfilePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_profile_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./profile.page.html */ 83373);
/* harmony import */ var _profile_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./profile.page.scss */ 74949);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/buttons.constants */ 21614);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);












let ResidentProfilePage = class ResidentProfilePage {
    constructor(router, route, rolesService, apiService, alert) {
        this.router = router;
        this.route = route;
        this.rolesService = rolesService;
        this.apiService = apiService;
        this.alert = alert;
        this.userForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroup({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.minLength(1)]),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
            phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.pattern(`
    /^6104[\d]{8}$/|
    /^610[^4]{1}[\d]{8}$/|
    /^61[^0]{1}[\d]{7}$/|
    /^04[\d]{8}$/|
    /^0[^4]{1}[\d]{8}$/|
    /^[^06]{1}[\d]{7}$/|
    /^1[2-9]{1}\d{2}[2-9]{1}\d{2}\d{4}$/
    `)]),
            phone2: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.pattern(`
    /^6104[\d]{8}$/|
    /^610[^4]{1}[\d]{8}$/|
    /^61[^0]{1}[\d]{7}$/|
    /^04[\d]{8}$/|
    /^0[^4]{1}[\d]{8}$/|
    /^[^06]{1}[\d]{7}$/|
    /^1[2-9]{1}\d{2}[2-9]{1}\d{2}\d{4}$/
    `)]),
            special_needs: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl(false),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.minLength(6)]),
            confirmPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.minLength(6)]),
            car_registration_number: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.minLength(6)]),
            car_park_number: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.minLength(6)]),
            email2: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
            agent_email: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
            agent_phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.pattern(`
    /^6104[\d]{8}$/|
    /^610[^4]{1}[\d]{8}$/|
    /^61[^0]{1}[\d]{7}$/|
    /^04[\d]{8}$/|
    /^0[^4]{1}[\d]{8}$/|
    /^[^06]{1}[\d]{7}$/|
    /^1[2-9]{1}\d{2}[2-9]{1}\d{2}\d{4}$/
    `)]),
        });
        this.buttonText = _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_6__.BUTTONS.update;
        this.bookingId = this.route.snapshot.paramMap.get('bookingId');
        this.pageLoading = true;
        console.log('resident profile constructor');
    }
    ngOnInit() {
        this.getProfile();
        this.getBookingData();
    }
    getProfile() {
        this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__.API.client.getProfile).subscribe((response) => {
            if (response.status === true) {
                this.user = response.user;
                console.log(this.user);
                this.userForm.patchValue(this.user);
                this.pageLoading = false;
                // this.editPhone();// getting a mask for an existing number
                return;
            }
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__.ERROR.internal);
        });
    }
    getBookingData() {
        this.apiService.get('/booking/get?profile_screen=true&lastBooking=' + this.bookingId)
            .subscribe((response) => {
            if (response.status) {
                this.lastApartment = response.lastApartment;
                this.bookingData = response.model;
            }
        });
    }
    save() {
        let user = Object.assign(Object.assign({}, this.user), this.userForm.value);
        user.special_needs = this.user.special_needs ? '1' : '0';
        // if (this.saving) {
        //   return false;
        // }
        // this.saving = true;
        this.pageLoading = true;
        this.apiService.put(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__.API.client.saveProfile, user)
            .subscribe((response) => {
            if (response.status) {
                this.router.navigateByUrl('resident/dashboard');
                return;
            }
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__.ERROR.internal);
            // this.saving = false;
            this.pageLoading = false;
        }, () => {
            // this.saving = false;
            this.pageLoading = false;
        });
    }
    changeApartment() {
        console.log('change apartment');
    }
    changeSubRole() {
        console.log('change role');
        this.router.navigate(['resident', 'change_sub_role']);
    }
    cancel() {
        this.router.navigateByUrl('resident/dashboard');
    }
    getFormattedDate(date) {
        if (date === '0000-00-00 00:00:00') {
            return '';
        }
        if (typeof date === 'string') {
            let regexp = /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/, dateParts;
            dateParts = date.match(regexp);
            if (!dateParts) {
                return '';
            }
            date = new Date(dateParts[1], dateParts[2] - 1, dateParts[3], dateParts[4], dateParts[5], dateParts[6]);
            if (isNaN(date.getTime())) {
                return '';
            }
        }
        else if (!(date instanceof Date) || isNaN(date.getTime())) {
            return '';
        }
        let year = date.getFullYear(), month = date.getMonth() + 1, day = date.getDate(), hours = date.getHours(), mins = date.getMinutes(), ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 ? hours % 12 : 12;
        hours = hours > 9 ? hours : '0' + hours;
        month = month > 9 ? month : '0' + month;
        mins = mins > 9 ? mins : '0' + mins;
        day = day > 9 ? day : '0' + day;
        return day + '/' + month + '/' + year + ' ' + hours + ':' + mins + ' ' + ampm;
    }
};
ResidentProfilePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_4__.RolesService },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__.ApiService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_2__.AlertService }
];
ResidentProfilePage = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
        selector: 'app-resident-profile',
        template: _raw_loader_profile_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_profile_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ResidentProfilePage);



/***/ }),

/***/ 98792:
/*!*****************************************************!*\
  !*** ./src/app/resident/resident-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResidentPageRoutingModule": () => (/* binding */ ResidentPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _book_area_resident_book_area_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./book-area/resident-book-area.page.component */ 88074);
/* harmony import */ var _book_lift_book_lift_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./book-lift/book-lift.page.component */ 70401);
/* harmony import */ var _build_info_build_info_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./build-info/build-info.page.component */ 18599);
/* harmony import */ var _change_move_change_move_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./change-move/change-move.page.component */ 57252);
/* harmony import */ var _common_areas_resident_areas_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common-areas/resident-areas.page.component */ 39429);
/* harmony import */ var _guidelines_guidelines_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./guidelines/guidelines.page.component */ 74104);
/* harmony import */ var _new_booking_new_booking_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./new-booking/new-booking.page.component */ 7975);
/* harmony import */ var _payment_resident_payment_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./payment/resident-payment.page.component */ 43542);
/* harmony import */ var _resident_dashboard_resident_dashboard_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./resident-dashboard/resident-dashboard.page.component */ 79113);
/* harmony import */ var _resident_noticeboard_resident_noticeboard_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resident-noticeboard/resident-noticeboard.page.component */ 97313);
/* harmony import */ var _resident_profile_profile_page_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./resident-profile/profile.page.component */ 57890);
/* harmony import */ var _resident_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./resident.page.component */ 48098);
/* harmony import */ var _sub_role_sub_role_page_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./sub-role/sub-role.page.component */ 11533);
















const routes = [
    {
        path: '',
        component: _resident_page_component__WEBPACK_IMPORTED_MODULE_11__.ResidentPage,
        children: [
            {
                path: 'dashboard',
                component: _resident_dashboard_resident_dashboard_page_component__WEBPACK_IMPORTED_MODULE_8__.ResidentDashboardPage,
            },
            {
                path: 'guidelines/view/:buildId',
                component: _guidelines_guidelines_page_component__WEBPACK_IMPORTED_MODULE_5__.GuidelinesPage,
            },
            {
                path: 'information/:buildId',
                component: _build_info_build_info_page_component__WEBPACK_IMPORTED_MODULE_2__.BuildInfoPage
            },
            {
                path: 'profile/:bookingId',
                component: _resident_profile_profile_page_component__WEBPACK_IMPORTED_MODULE_10__.ResidentProfilePage
            },
            {
                path: 'change_sub_role',
                component: _sub_role_sub_role_page_component__WEBPACK_IMPORTED_MODULE_12__.SubRolePage
            },
            {
                path: 'noticeboard/:buildId',
                component: _resident_noticeboard_resident_noticeboard_page_component__WEBPACK_IMPORTED_MODULE_9__.ResidentNoticeboardPage
            },
            {
                path: 'book-area/view/:buildId',
                component: _common_areas_resident_areas_page_component__WEBPACK_IMPORTED_MODULE_4__.ResidentAreasPage
            },
            {
                path: 'book-area/:buildId/:areaId/time',
                component: _book_area_resident_book_area_page_component__WEBPACK_IMPORTED_MODULE_0__.ResidentBookAreaPage
            },
            {
                path: 'book-area/:buildId/:areaId/time/:bookingId/edit',
                component: _book_area_resident_book_area_page_component__WEBPACK_IMPORTED_MODULE_0__.ResidentBookAreaPage
            },
            {
                path: 'book-area/:buildId/:areaId/payment',
                component: _payment_resident_payment_page_component__WEBPACK_IMPORTED_MODULE_7__.ResidentPaymentPage
            },
            {
                path: 'book-lift/:bookingId',
                component: _book_lift_book_lift_page_component__WEBPACK_IMPORTED_MODULE_1__.BookLiftPage
            },
            {
                path: 'move-in',
                component: _change_move_change_move_page_component__WEBPACK_IMPORTED_MODULE_3__.ChangeMovePage
            },
            {
                path: 'move/:bookingId',
                component: _change_move_change_move_page_component__WEBPACK_IMPORTED_MODULE_3__.ChangeMovePage
            },
            {
                path: 'move/:bookingId/change',
                component: _change_move_change_move_page_component__WEBPACK_IMPORTED_MODULE_3__.ChangeMovePage
            },
            {
                path: 'move-out/:bookingId',
                component: _change_move_change_move_page_component__WEBPACK_IMPORTED_MODULE_3__.ChangeMovePage
            },
            {
                path: 'building/new-booking',
                component: _new_booking_new_booking_page_component__WEBPACK_IMPORTED_MODULE_6__.NewBookingPage
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            }
        ]
    }
];
let ResidentPageRoutingModule = class ResidentPageRoutingModule {
};
ResidentPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_14__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_15__.RouterModule]
    })
], ResidentPageRoutingModule);



/***/ }),

/***/ 17060:
/*!*********************************************!*\
  !*** ./src/app/resident/resident.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResidentPageModule": () => (/* binding */ ResidentPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/google-maps */ 99010);
/* harmony import */ var ngx_stripe__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ngx-stripe */ 22974);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-mask */ 29417);
/* harmony import */ var _resident_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resident.page.component */ 48098);
/* harmony import */ var _resident_dashboard_resident_dashboard_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resident-dashboard/resident-dashboard.page.component */ 79113);
/* harmony import */ var _resident_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./resident-routing.module */ 98792);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../material.module */ 63806);
/* harmony import */ var _shared_modals_contact_contact_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/modals/contact/contact.component */ 47703);
/* harmony import */ var _guidelines_guidelines_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./guidelines/guidelines.page.component */ 74104);
/* harmony import */ var _shared_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/pipes/pipes.module */ 24586);
/* harmony import */ var _build_info_build_info_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./build-info/build-info.page.component */ 18599);
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ng2-search-filter */ 44981);
/* harmony import */ var _resident_profile_profile_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resident-profile/profile.page.component */ 57890);
/* harmony import */ var _sub_role_sub_role_page_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sub-role/sub-role.page.component */ 11533);
/* harmony import */ var _resident_noticeboard_resident_noticeboard_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./resident-noticeboard/resident-noticeboard.page.component */ 97313);
/* harmony import */ var _common_areas_resident_areas_page_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common-areas/resident-areas.page.component */ 39429);
/* harmony import */ var _book_area_resident_book_area_page_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./book-area/resident-book-area.page.component */ 88074);
/* harmony import */ var _book_lift_book_lift_page_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./book-lift/book-lift.page.component */ 70401);
/* harmony import */ var _change_move_change_move_page_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./change-move/change-move.page.component */ 57252);
/* harmony import */ var _new_booking_new_booking_page_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./new-booking/new-booking.page.component */ 7975);
/* harmony import */ var _payment_resident_payment_page_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./payment/resident-payment.page.component */ 43542);


























let ResidentPageModule = class ResidentPageModule {
};
ResidentPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_19__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_20__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_21__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_21__.ReactiveFormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonicModule,
            _resident_routing_module__WEBPACK_IMPORTED_MODULE_2__.ResidentPageRoutingModule,
            _material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule,
            _shared_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_6__.PipesModule,
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_8__.Ng2SearchPipeModule,
            _angular_google_maps__WEBPACK_IMPORTED_MODULE_23__.GoogleMapsModule,
            ngx_stripe__WEBPACK_IMPORTED_MODULE_24__.NgxStripeModule.forChild('pk_test_G1se5Kq01umPQA6iYBu2cs9r00MT78zezt'),
            ngx_mask__WEBPACK_IMPORTED_MODULE_25__.NgxMaskModule.forChild()
        ],
        declarations: [
            _resident_page_component__WEBPACK_IMPORTED_MODULE_0__.ResidentPage,
            _resident_dashboard_resident_dashboard_page_component__WEBPACK_IMPORTED_MODULE_1__.ResidentDashboardPage,
            _guidelines_guidelines_page_component__WEBPACK_IMPORTED_MODULE_5__.GuidelinesPage,
            _shared_modals_contact_contact_component__WEBPACK_IMPORTED_MODULE_4__.ContactModal,
            _build_info_build_info_page_component__WEBPACK_IMPORTED_MODULE_7__.BuildInfoPage,
            _resident_profile_profile_page_component__WEBPACK_IMPORTED_MODULE_9__.ResidentProfilePage,
            _sub_role_sub_role_page_component__WEBPACK_IMPORTED_MODULE_10__.SubRolePage,
            _resident_noticeboard_resident_noticeboard_page_component__WEBPACK_IMPORTED_MODULE_11__.ResidentNoticeboardPage,
            _common_areas_resident_areas_page_component__WEBPACK_IMPORTED_MODULE_12__.ResidentAreasPage,
            _book_area_resident_book_area_page_component__WEBPACK_IMPORTED_MODULE_13__.ResidentBookAreaPage,
            _book_lift_book_lift_page_component__WEBPACK_IMPORTED_MODULE_14__.BookLiftPage,
            _change_move_change_move_page_component__WEBPACK_IMPORTED_MODULE_15__.ChangeMovePage,
            _new_booking_new_booking_page_component__WEBPACK_IMPORTED_MODULE_16__.NewBookingPage,
            _payment_resident_payment_page_component__WEBPACK_IMPORTED_MODULE_17__.ResidentPaymentPage,
        ]
    })
], ResidentPageModule);



/***/ }),

/***/ 48098:
/*!*****************************************************!*\
  !*** ./src/app/resident/resident.page.component.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResidentPage": () => (/* binding */ ResidentPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_resident_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./resident.page.html */ 47052);
/* harmony import */ var _resident_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resident.page.scss */ 76545);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/api.service */ 5830);







let ResidentPage = class ResidentPage {
    constructor(http, apiService, router) {
        this.http = http;
        this.apiService = apiService;
        this.router = router;
        console.log('guest constructor');
    }
    ;
    ngOnInit() {
    }
};
ResidentPage.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router }
];
ResidentPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-resident',
        template: _raw_loader_resident_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_resident_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ResidentPage);



/***/ }),

/***/ 11533:
/*!**************************************************************!*\
  !*** ./src/app/resident/sub-role/sub-role.page.component.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubRolePage": () => (/* binding */ SubRolePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_sub_role_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./sub-role.page.html */ 81973);
/* harmony import */ var _sub_role_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sub-role.page.scss */ 49402);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _services_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/navigation.service */ 89565);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_mock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/constants/mock */ 1455);







let SubRolePage = class SubRolePage {
    constructor(navigation, rolesService) {
        this.navigation = navigation;
        this.rolesService = rolesService;
        this.model = _shared_constants_mock__WEBPACK_IMPORTED_MODULE_4__.USER_SUBROLE;
    }
    ngOnInit() {
    }
    changeResidingStatus() {
        console.log('changed', this.model.user_status);
    }
    back() {
        this.navigation.back();
    }
    submit() {
        console.log('submit', this.model);
    }
};
SubRolePage.ctorParameters = () => [
    { type: _services_navigation_service__WEBPACK_IMPORTED_MODULE_2__.NavigationService },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_3__.RolesService }
];
SubRolePage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-sub-role',
        template: _raw_loader_sub_role_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_sub_role_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], SubRolePage);



/***/ }),

/***/ 83934:
/*!*****************************************************!*\
  !*** ./src/app/shared/constants/roles.constants.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ROLES": () => (/* binding */ ROLES)
/* harmony export */ });
const ROLES = [
    {
        name: 'resident',
        displayName: 'Resident'
    },
    {
        name: 'manager',
        displayName: 'Manager'
    },
    {
        name: 'agent',
        displayName: 'Real Estate Agent'
    }
];


/***/ }),

/***/ 99492:
/*!*****************************************************************!*\
  !*** ./src/app/resident/book-area/resident-book-area.page.scss ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".book-area-wrapper {\n  max-height: 750px;\n  height: 650px;\n  width: 640px;\n}\n.book-area-wrapper .move-wrapper {\n  height: 100%;\n  width: 100%;\n  justify-content: space-between;\n}\n.book-area-wrapper .move-wrapper .resident-header {\n  margin-top: 0;\n}\n.book-area-wrapper .book-button {\n  text-transform: uppercase;\n  color: #fff;\n}\n.book-area-wrapper .book-button:not(.mat-button-disabled) {\n  background-color: #4c9cff;\n}\n.book-area-wrapper .no-date-msg-3 {\n  color: red;\n}\n.book-area-wrapper .booking-form {\n  width: 100%;\n  max-width: 304px;\n}\n.book-area-wrapper .move-form {\n  position: relative;\n}\n.book-area-wrapper .move-form .icon-tooltip {\n  position: absolute;\n  top: 8px;\n  right: -10px;\n}\n.book-area-wrapper .move-form .icon-tooltip .mat-icon {\n  color: red;\n}\n.book-area-wrapper .buttons-back {\n  margin: 0;\n}\n.area-rules-wrapper {\n  max-height: 750px;\n  width: 640px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.area-rules-wrapper .mat-raised-button {\n  background-color: #4c9cff;\n  color: white;\n}\n.area-rules-wrapper .description-scroll {\n  width: 100%;\n  max-height: 470px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  position: relative;\n  display: block;\n  color: rgba(0, 0, 0, 0.87);\n  background-color: #fafafa;\n}\n.area-rules-wrapper .description-scroll .md-padding {\n  padding: 8px;\n}\n.area-rules-wrapper .description-scroll .description-block {\n  border: 1px solid #eee;\n  padding: 10px;\n  max-width: 100%;\n  margin-top: 25px;\n  position: relative;\n  overflow-wrap: break-word;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2lkZW50LWJvb2stYXJlYS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBQ0Y7QUFBRTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsOEJBQUE7QUFFSjtBQURJO0VBQ0UsYUFBQTtBQUdOO0FBQUU7RUFDRSx5QkFBQTtFQUNBLFdBQUE7QUFFSjtBQURJO0VBQ0UseUJBQUE7QUFHTjtBQUFFO0VBQ0UsVUFBQTtBQUVKO0FBQUU7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7QUFFSjtBQUFFO0VBQ0Usa0JBQUE7QUFFSjtBQURJO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtBQUdOO0FBRk07RUFDRSxVQUFBO0FBSVI7QUFBRTtFQUNFLFNBQUE7QUFFSjtBQUVBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7QUFDRjtBQUFFO0VBQ0UseUJBQUE7RUFDQSxZQUFBO0FBRUo7QUFBRTtFQUNFLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSwwQkFBQTtFQUNBLHlCQUFBO0FBRUo7QUFESTtFQUNFLFlBQUE7QUFHTjtBQURJO0VBQ0Usc0JBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtBQUdOIiwiZmlsZSI6InJlc2lkZW50LWJvb2stYXJlYS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm9vay1hcmVhLXdyYXBwZXJ7XG4gIG1heC1oZWlnaHQ6IDc1MHB4O1xuICBoZWlnaHQ6IDY1MHB4O1xuICB3aWR0aDogNjQwcHg7XG4gIC5tb3ZlLXdyYXBwZXJ7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAucmVzaWRlbnQtaGVhZGVye1xuICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICB9XG4gIH1cbiAgLmJvb2stYnV0dG9ue1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgJjpub3QoLm1hdC1idXR0b24tZGlzYWJsZWQpe1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzRjOWNmZjtcbiAgICB9XG4gIH1cbiAgLm5vLWRhdGUtbXNnLTMge1xuICAgIGNvbG9yOiByZWQ7XG4gIH1cbiAgLmJvb2tpbmctZm9ybSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAzMDRweDtcbiAgfVxuICAubW92ZS1mb3JtIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgLmljb24tdG9vbHRpcCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDhweDtcbiAgICAgIHJpZ2h0OiAtMTBweDtcbiAgICAgIC5tYXQtaWNvbntcbiAgICAgICAgY29sb3I6IHJlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLmJ1dHRvbnMtYmFja3tcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLmFyZWEtcnVsZXMtd3JhcHBlcntcbiAgbWF4LWhlaWdodDogNzUwcHg7XG4gIHdpZHRoOiA2NDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAubWF0LXJhaXNlZC1idXR0b257XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRjOWNmZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cbiAgLmRlc2NyaXB0aW9uLXNjcm9sbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LWhlaWdodDogNDcwcHg7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGNvbG9yOiByZ2JhKDAsMCwwLDAuODcpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTAsMjUwLDI1MCk7XG4gICAgLm1kLXBhZGRpbmd7XG4gICAgICBwYWRkaW5nOiA4cHg7XG4gICAgfVxuICAgIC5kZXNjcmlwdGlvbi1ibG9jayB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xuICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbi10b3A6IDI1cHg7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xuIFxuICAgIH1cbiAgfVxufSJdfQ== */");

/***/ }),

/***/ 61786:
/*!********************************************************!*\
  !*** ./src/app/resident/book-lift/book-lift.page.scss ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".book-area-wrapper {\n  max-height: 750px;\n  height: 650px;\n  width: 640px;\n}\n.book-area-wrapper .move-wrapper {\n  height: 100%;\n  width: 100%;\n  justify-content: space-between;\n}\n.book-area-wrapper .move-wrapper .resident-header {\n  margin-top: 0;\n}\n.book-area-wrapper .book-button {\n  text-transform: uppercase;\n  color: #fff;\n}\n.book-area-wrapper .book-button:not(.mat-button-disabled) {\n  background-color: #4c9cff;\n}\n.book-area-wrapper .no-date-msg-3 {\n  color: red;\n}\n.book-area-wrapper .booking-form {\n  width: 100%;\n  max-width: 304px;\n}\n.book-area-wrapper .move-form {\n  position: relative;\n}\n.book-area-wrapper .move-form .icon-tooltip {\n  position: absolute;\n  top: 8px;\n  right: -10px;\n}\n.book-area-wrapper .move-form .icon-tooltip .mat-icon {\n  color: red;\n}\n.area-rules-wrapper {\n  max-height: 750px;\n  width: 640px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.area-rules-wrapper .mat-raised-button {\n  background-color: #4c9cff;\n  color: white;\n}\n.area-rules-wrapper .description-scroll {\n  width: 100%;\n  max-height: 470px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  position: relative;\n  display: block;\n  color: rgba(0, 0, 0, 0.87);\n  background-color: #fafafa;\n}\n.area-rules-wrapper .description-scroll .md-padding {\n  padding: 8px;\n}\n.area-rules-wrapper .description-scroll .description-block {\n  border: 1px solid #eee;\n  padding: 10px;\n  max-width: 100%;\n  margin-top: 25px;\n  position: relative;\n  overflow-wrap: break-word;\n}\n.buttons-back {\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb2stbGlmdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0FBQ0Y7QUFBRTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsOEJBQUE7QUFFSjtBQURJO0VBQ0UsYUFBQTtBQUdOO0FBQUU7RUFDRSx5QkFBQTtFQUNBLFdBQUE7QUFFSjtBQURJO0VBQ0UseUJBQUE7QUFHTjtBQUFFO0VBQ0UsVUFBQTtBQUVKO0FBQUU7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7QUFFSjtBQUFFO0VBQ0Usa0JBQUE7QUFFSjtBQURJO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtBQUdOO0FBRk07RUFDRSxVQUFBO0FBSVI7QUFFQTtFQUNFLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0FBQ0Y7QUFBRTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtBQUVKO0FBQUU7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsMEJBQUE7RUFDQSx5QkFBQTtBQUVKO0FBREk7RUFDRSxZQUFBO0FBR047QUFESTtFQUNFLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUFHTjtBQUVBO0VBQ0UsU0FBQTtBQUNGIiwiZmlsZSI6ImJvb2stbGlmdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYm9vay1hcmVhLXdyYXBwZXJ7XG4gIG1heC1oZWlnaHQ6IDc1MHB4O1xuICBoZWlnaHQ6IDY1MHB4O1xuICB3aWR0aDogNjQwcHg7XG4gIC5tb3ZlLXdyYXBwZXJ7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAucmVzaWRlbnQtaGVhZGVye1xuICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICB9XG4gIH1cbiAgLmJvb2stYnV0dG9ue1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgJjpub3QoLm1hdC1idXR0b24tZGlzYWJsZWQpe1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzRjOWNmZjtcbiAgICB9XG4gIH1cbiAgLm5vLWRhdGUtbXNnLTMge1xuICAgIGNvbG9yOiByZWQ7XG4gIH1cbiAgLmJvb2tpbmctZm9ybSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAzMDRweDtcbiAgfVxuICAubW92ZS1mb3JtIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgLmljb24tdG9vbHRpcCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDhweDtcbiAgICAgIHJpZ2h0OiAtMTBweDtcbiAgICAgIC5tYXQtaWNvbntcbiAgICAgICAgY29sb3I6IHJlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLmFyZWEtcnVsZXMtd3JhcHBlcntcbiAgbWF4LWhlaWdodDogNzUwcHg7XG4gIHdpZHRoOiA2NDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAubWF0LXJhaXNlZC1idXR0b257XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRjOWNmZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cbiAgLmRlc2NyaXB0aW9uLXNjcm9sbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LWhlaWdodDogNDcwcHg7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGNvbG9yOiByZ2JhKDAsMCwwLDAuODcpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTAsMjUwLDI1MCk7XG4gICAgLm1kLXBhZGRpbmd7XG4gICAgICBwYWRkaW5nOiA4cHg7XG4gICAgfVxuICAgIC5kZXNjcmlwdGlvbi1ibG9jayB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xuICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbi10b3A6IDI1cHg7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xuICAgIH1cbiAgfVxufVxuXG4uYnV0dG9ucy1iYWNre1xuICBtYXJnaW46IDA7XG59Il19 */");

/***/ }),

/***/ 56383:
/*!**********************************************************!*\
  !*** ./src/app/resident/build-info/build-info.page.scss ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".building-information-tenant {\n  width: 640px;\n  min-height: 750px;\n  align-items: flex-start;\n}\n.building-information-tenant .print-info-btn-wrap {\n  right: 0;\n  top: 0;\n  position: absolute;\n  display: block;\n  width: 150px;\n}\n.building-information-tenant .mim-print-build-info-title {\n  position: relative;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.building-information-tenant .subheader {\n  margin-top: 0;\n}\n.building-information-tenant .build-i-wrapper {\n  border-top: 1px solid #eee;\n  margin-bottom: 20px;\n  padding: 16px;\n  color: rgba(0, 0, 0, 0.87);\n  background-color: #fafafa;\n}\n.building-information-tenant .fix-height {\n  max-height: 440px;\n  border-top: 1px solid #eee;\n  margin-bottom: 20px;\n  overflow: scroll;\n}\n.building-information-tenant .description-block {\n  padding: 10px;\n  max-width: 100%;\n  margin-top: 25px;\n  position: relative;\n  overflow-wrap: break-word;\n  border: 1px solid #ccc;\n  font-family: Roboto, Helvetica Neue, sans-serif;\n}\n.building-information-tenant .description-block h4 {\n  text-transform: uppercase;\n  font-size: 16px;\n  font-weight: bold;\n  margin-top: 0;\n}\n.building-information-tenant .search-wrap {\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: space-between;\n}\n.building-information-tenant .search-wrap .button-fullsize {\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #4c9cff;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 40px;\n  min-width: 0;\n  width: 40px;\n  height: 40px;\n  vertical-align: middle;\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n  border-radius: 50%;\n  background-clip: padding-box;\n  overflow: hidden;\n  transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);\n  transition-property: background-color, box-shadow, transform;\n}\n.building-information-tenant .item-interactive.ion-valid {\n  --highlight-background: #3880ff;\n}\n.building-information-tenant .map-info {\n  border-top: 1px solid #eee;\n  padding: 8px;\n  margin-top: 20px;\n}\n@media (max-width: 767px) {\n  .building-information-tenant {\n    min-width: 320px;\n    width: 100%;\n    height: auto;\n  }\n}\n@media (max-width: 599px) {\n  .info-wrapper {\n    padding-top: 32px;\n  }\n\n  .print-info-btn-wrap {\n    top: -32px !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1aWxkLWluZm8ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsdUJBQUE7QUFDRjtBQUFFO0VBQ0UsUUFBQTtFQUNBLE1BQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FBRUo7QUFBRTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBRUo7QUFBRTtFQUNFLGFBQUE7QUFFSjtBQUFFO0VBQ0UsMEJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFFQSwwQkFBQTtFQUNBLHlCQUFBO0FBQ0o7QUFFRTtFQUNFLGlCQUFBO0VBQ0EsMEJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBQUo7QUFHRTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0Esc0JBQUE7RUFDQSwrQ0FBQTtBQURKO0FBRUk7RUFDRSx5QkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7QUFBTjtBQUdFO0VBQ0UsYUFBQTtFQUNBLDJCQUFBO0VBQ0EsOEJBQUE7QUFESjtBQUVJO0VBQ0UsZ0NBQUE7RUFDQSx5QkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLDJDQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtFQUNBLGdCQUFBO0VBRUEscURBQUE7RUFHQSw0REFBQTtBQUNOO0FBR0U7RUFDRSwrQkFBQTtBQURKO0FBR0U7RUFDRSwwQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQURKO0FBS0E7RUFDRTtJQUNFLGdCQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7RUFGRjtBQUNGO0FBS0E7RUFDRTtJQUNFLGlCQUFBO0VBSEY7O0VBS0E7SUFDRSxxQkFBQTtFQUZGO0FBQ0YiLCJmaWxlIjoiYnVpbGQtaW5mby5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYnVpbGRpbmctaW5mb3JtYXRpb24tdGVuYW50e1xuICB3aWR0aDogNjQwcHg7XG4gIG1pbi1oZWlnaHQ6IDc1MHB4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgLnByaW50LWluZm8tYnRuLXdyYXB7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTUwcHg7XG4gIH1cbiAgLm1pbS1wcmludC1idWlsZC1pbmZvLXRpdGxle1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cbiAgLnN1YmhlYWRlcntcbiAgICBtYXJnaW4tdG9wOiAwO1xuICB9XG4gIC5idWlsZC1pLXdyYXBwZXJ7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZWU7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICAgIC8vIHBhZGRpbmctYm90dG9tOiAwO1xuICAgIGNvbG9yOiByZ2JhKDAsMCwwLDAuODcpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTAsMjUwLDI1MCk7XG4gIH1cblxuICAuZml4LWhlaWdodHtcbiAgICBtYXgtaGVpZ2h0OiA0NDBweDtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2VlZTtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gIH1cblxuICAuZGVzY3JpcHRpb24tYmxvY2t7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLXRvcDogMjVweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG8sSGVsdmV0aWNhIE5ldWUsc2Fucy1zZXJpZjtcbiAgICBoNHtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgfVxuICB9XG4gIC5zZWFyY2gtd3JhcHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgLmJ1dHRvbi1mdWxsc2l6ZXtcbiAgICAgIGNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LDAuODcpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDc2LDE1NiwyNTUpO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGxpbmUtaGVpZ2h0OiA0MHB4O1xuICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgd2lkdGg6IDQwcHg7XG4gICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgYm94LXNoYWRvdzogMCAycHggNXB4IDAgcmdiKDAgMCAwIC8gMjYlKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGJhY2tncm91bmQtY2xpcDogcGFkZGluZy1ib3g7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgLjNzIGN1YmljLWJlemllciguNTUsMCwuNTUsLjIpO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIC4zcyBjdWJpYy1iZXppZXIoLjU1LDAsLjU1LC4yKTtcbiAgICAgIC13ZWJraXQtdHJhbnNpdGlvbi1wcm9wZXJ0eTogYmFja2dyb3VuZC1jb2xvcixib3gtc2hhZG93LC13ZWJraXQtdHJhbnNmb3JtO1xuICAgICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogYmFja2dyb3VuZC1jb2xvcixib3gtc2hhZG93LC13ZWJraXQtdHJhbnNmb3JtO1xuICAgICAgdHJhbnNpdGlvbi1wcm9wZXJ0eTogYmFja2dyb3VuZC1jb2xvcixib3gtc2hhZG93LHRyYW5zZm9ybTtcbiAgICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IGJhY2tncm91bmQtY29sb3IsYm94LXNoYWRvdyx0cmFuc2Zvcm0sLXdlYmtpdC10cmFuc2Zvcm07XG4gICAgfVxuICB9XG4gIC5pdGVtLWludGVyYWN0aXZlLmlvbi12YWxpZCB7XG4gICAgLS1oaWdobGlnaHQtYmFja2dyb3VuZDogIzM4ODBmZjtcbiAgfVxuICAubWFwLWluZm97XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZWU7XG4gICAgcGFkZGluZzogOHB4O1xuICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KXtcbiAgLmJ1aWxkaW5nLWluZm9ybWF0aW9uLXRlbmFudHtcbiAgICBtaW4td2lkdGg6IDMyMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogYXV0bztcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNTk5cHgpe1xuICAuaW5mby13cmFwcGVye1xuICAgIHBhZGRpbmctdG9wOiAzMnB4O1xuICB9XG4gIC5wcmludC1pbmZvLWJ0bi13cmFwe1xuICAgIHRvcDogLTMycHggIWltcG9ydGFudDtcbiAgfVxufSJdfQ== */");

/***/ }),

/***/ 79725:
/*!************************************************************!*\
  !*** ./src/app/resident/change-move/change-move.page.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".book-area-wrapper {\n  max-height: 750px;\n  height: 650px;\n  width: 640px;\n}\n.book-area-wrapper .move-wrapper {\n  height: 100%;\n  width: 100%;\n  justify-content: space-between;\n}\n.book-area-wrapper .move-wrapper .resident-header {\n  margin-top: 0;\n}\n.book-area-wrapper .book-button, .book-area-wrapper .already-button {\n  text-transform: uppercase;\n  color: #fff;\n}\n.book-area-wrapper .book-button:not(.mat-button-disabled), .book-area-wrapper .already-button:not(.mat-button-disabled) {\n  background-color: #4c9cff;\n}\n.book-area-wrapper .no-date-msg-3 {\n  color: red;\n}\n.book-area-wrapper .booking-form {\n  width: 100%;\n  max-width: 304px;\n}\n.book-area-wrapper .move-form {\n  position: relative;\n}\n.book-area-wrapper .move-form .icon-tooltip {\n  position: absolute;\n  top: 8px;\n  right: -10px;\n}\n.book-area-wrapper .move-form .icon-tooltip .mat-icon {\n  color: red;\n}\n.area-rules-wrapper {\n  max-height: 750px;\n  width: 640px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.area-rules-wrapper .mat-raised-button {\n  background-color: #4c9cff;\n  color: white;\n}\n.area-rules-wrapper .description-scroll {\n  width: 100%;\n  max-height: 470px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  position: relative;\n  display: block;\n  color: rgba(0, 0, 0, 0.87);\n  background-color: #fafafa;\n}\n.area-rules-wrapper .description-scroll .md-padding {\n  padding: 8px;\n}\n.area-rules-wrapper .description-scroll .description-block {\n  border: 1px solid #eee;\n  padding: 10px;\n  max-width: 100%;\n  margin-top: 25px;\n  position: relative;\n  overflow-wrap: break-word;\n}\n.buttons-back {\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNoYW5nZS1tb3ZlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7QUFDRjtBQUFFO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSw4QkFBQTtBQUVKO0FBREk7RUFDRSxhQUFBO0FBR047QUFBRTtFQUNFLHlCQUFBO0VBQ0EsV0FBQTtBQUVKO0FBREk7RUFDRSx5QkFBQTtBQUdOO0FBQUU7RUFDRSxVQUFBO0FBRUo7QUFBRTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtBQUVKO0FBQUU7RUFDRSxrQkFBQTtBQUVKO0FBREk7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxZQUFBO0FBR047QUFGTTtFQUNFLFVBQUE7QUFJUjtBQUVBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7QUFDRjtBQUFFO0VBQ0UseUJBQUE7RUFDQSxZQUFBO0FBRUo7QUFBRTtFQUNFLFdBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSwwQkFBQTtFQUNBLHlCQUFBO0FBRUo7QUFESTtFQUNFLFlBQUE7QUFHTjtBQURJO0VBQ0Usc0JBQUE7RUFDQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtBQUdOO0FBRUE7RUFDRSxTQUFBO0FBQ0YiLCJmaWxlIjoiY2hhbmdlLW1vdmUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvb2stYXJlYS13cmFwcGVye1xuICBtYXgtaGVpZ2h0OiA3NTBweDtcbiAgaGVpZ2h0OiA2NTBweDtcbiAgd2lkdGg6IDY0MHB4O1xuICAubW92ZS13cmFwcGVye1xuICAgIGhlaWdodDogMTAwJTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgLnJlc2lkZW50LWhlYWRlcntcbiAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgfVxuICB9XG4gIC5ib29rLWJ1dHRvbiwgLmFscmVhZHktYnV0dG9ue1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgJjpub3QoLm1hdC1idXR0b24tZGlzYWJsZWQpe1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzRjOWNmZjtcbiAgICB9XG4gIH1cbiAgLm5vLWRhdGUtbXNnLTMge1xuICAgIGNvbG9yOiByZWQ7XG4gIH1cbiAgLmJvb2tpbmctZm9ybSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAzMDRweDtcbiAgfVxuICAubW92ZS1mb3JtIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgLmljb24tdG9vbHRpcCB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDhweDtcbiAgICAgIHJpZ2h0OiAtMTBweDtcbiAgICAgIC5tYXQtaWNvbntcbiAgICAgICAgY29sb3I6IHJlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLmFyZWEtcnVsZXMtd3JhcHBlcntcbiAgbWF4LWhlaWdodDogNzUwcHg7XG4gIHdpZHRoOiA2NDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAubWF0LXJhaXNlZC1idXR0b257XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzRjOWNmZjtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cbiAgLmRlc2NyaXB0aW9uLXNjcm9sbCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LWhlaWdodDogNDcwcHg7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGNvbG9yOiByZ2JhKDAsMCwwLDAuODcpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTAsMjUwLDI1MCk7XG4gICAgLm1kLXBhZGRpbmd7XG4gICAgICBwYWRkaW5nOiA4cHg7XG4gICAgfVxuICAgIC5kZXNjcmlwdGlvbi1ibG9jayB7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjZWVlO1xuICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbi10b3A6IDI1cHg7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xuIFxuICAgIH1cbiAgfVxufVxuLmJ1dHRvbnMtYmFja3tcbiAgbWFyZ2luOiAwO1xufSJdfQ== */");

/***/ }),

/***/ 97351:
/*!****************************************************************!*\
  !*** ./src/app/resident/common-areas/resident-areas.page.scss ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".mim-common-a-client {\n  width: 700px;\n}\n.mim-common-a-client .resident-header {\n  margin-bottom: 0;\n}\n.mim-common-a-client .subheader {\n  margin-top: 0;\n  font-size: 1.17em;\n}\n.mim-common-a-client .common-a-content-wrap {\n  display: flex;\n  flex-flow: column;\n  max-height: 600px;\n}\n.mim-common-a-client .common-a-content-wrap h3 {\n  margin-top: 0;\n  margin-bottom: 12px;\n  font-weight: bold;\n}\n.mim-common-a-client .common-a-content-wrap .common-area-booking-list {\n  max-height: 150px;\n  box-sizing: border-box;\n  border: 1px solid #ccc;\n  padding: 10px;\n  overflow: auto;\n}\n.mim-common-a-client .common-a-content-wrap .common-area-booking-list .area-booking-item {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: space-between;\n}\n.mim-common-a-client .common-a-content-wrap .common-area-booking-list .area-booking-item:not(:last-child) {\n  margin-bottom: 12px;\n}\n.mim-common-a-client .common-a-content-wrap .common-area-booking-list .area-booking-item .title {\n  font-weight: bold;\n}\n.mim-common-a-client .guidelines-form {\n  height: 400px;\n  overflow-y: auto;\n  border: 1px solid #ccc;\n  margin-top: 28px;\n}\n.mim-common-a-client .guidelines-form .common-a-list {\n  height: 100%;\n}\n.mim-common-a-client .guidelines-form .common-a-list .description-block {\n  display: flex;\n  flex-direction: column;\n  border: 0;\n  border-bottom: 1px solid #ccc;\n  margin-top: 0;\n  padding: 18px;\n}\n.mim-common-a-client .guidelines-form .common-a-list .areas {\n  display: flex;\n  flex-wrap: wrap;\n  flex: 0 0 30%;\n  justify-content: space-between;\n  align-items: center;\n}\n.mim-common-a-client .guidelines-form .common-a-list .areas .area-right-side--info, .mim-common-a-client .guidelines-form .common-a-list .areas .area-right-side {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex-grow: 1;\n  margin-top: 10px;\n}\n.mim-common-a-client .guidelines-form .common-a-list .areas .area-right-side--info .book-rules, .mim-common-a-client .guidelines-form .common-a-list .areas .area-right-side .book-rules {\n  margin-top: 10px;\n}\n.mim-common-a-client .guidelines-form .common-a-list .areas .area-booked {\n  text-align: center;\n  margin-top: 20px;\n}\n.mim-common-a-client .guidelines-form .common-a-list .areas .area-booked .area-time-booking {\n  padding: 10px 5px;\n}\n.mim-common-a-client .guidelines-form .common-a-list .areas .area-booked .book-date .mat-icon {\n  color: #999;\n}\n.mim-common-a-client .guidelines-form .common-a-list .areas .area-booking-btn {\n  margin: 15px 5px 10px;\n}\n.mim-common-a-client .guidelines-form .common-a-list .areas .area-booking-btn .mat-raised-button {\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #4c9cff;\n  text-transform: uppercase;\n}\n.area-rules-wrapper {\n  max-height: 750px;\n  width: 640px;\n}\n.area-rules-wrapper .mat-raised-button {\n  background-color: #4c9cff;\n  color: white;\n}\n@media (max-width: 767px) {\n  .mim-common-a-client {\n    min-width: 320px;\n    width: 100%;\n    height: auto;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2lkZW50LWFyZWFzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7QUFDRjtBQUFFO0VBQ0UsZ0JBQUE7QUFFSjtBQUFFO0VBQ0UsYUFBQTtFQUNBLGlCQUFBO0FBRUo7QUFBRTtFQUNFLGFBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0FBRUo7QUFESTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0FBR047QUFESTtFQUNFLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0FBR047QUFGTTtFQUNFLGFBQUE7RUFDQSxxQkFBQTtFQUNBLDhCQUFBO0FBSVI7QUFIUTtFQUNFLG1CQUFBO0FBS1Y7QUFIUTtFQUNFLGlCQUFBO0FBS1Y7QUFBRTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7QUFFSjtBQURJO0VBQ0UsWUFBQTtBQUdOO0FBRk07RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0VBQ0EsNkJBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtBQUlSO0FBRk07RUFDRSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0FBSVI7QUFIUTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBS1Y7QUFKVTtFQUNFLGdCQUFBO0FBTVo7QUFIUTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7QUFLVjtBQUpVO0VBQ0UsaUJBQUE7QUFNWjtBQUhZO0VBQ0UsV0FBQTtBQUtkO0FBRFE7RUFDRSxxQkFBQTtBQUdWO0FBRlU7RUFDRSxnQ0FBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7QUFJWjtBQUdBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0FBQUY7QUFDRTtFQUNFLHlCQUFBO0VBQ0EsWUFBQTtBQUNKO0FBR0E7RUFDRTtJQUNFLGdCQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7RUFBRjtBQUNGIiwiZmlsZSI6InJlc2lkZW50LWFyZWFzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5taW0tY29tbW9uLWEtY2xpZW50e1xuICB3aWR0aDogNzAwcHg7XG4gIC5yZXNpZGVudC1oZWFkZXJ7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgfVxuICAuc3ViaGVhZGVye1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgZm9udC1zaXplOiAxLjE3ZW07XG4gIH1cbiAgLmNvbW1vbi1hLWNvbnRlbnQtd3JhcHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZmxvdzogY29sdW1uO1xuICAgIG1heC1oZWlnaHQ6IDYwMHB4O1xuICAgIGgze1xuICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICB9XG4gICAgLmNvbW1vbi1hcmVhLWJvb2tpbmctbGlzdCB7XG4gICAgICBtYXgtaGVpZ2h0OiAxNTBweDtcbiAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgIG92ZXJmbG93OiBhdXRvO1xuICAgICAgLmFyZWEtYm9va2luZy1pdGVtIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1mbG93OiByb3cgbm93cmFwO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgICY6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICAgICAgfVxuICAgICAgICAudGl0bGV7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLmd1aWRlbGluZXMtZm9ybXtcbiAgICBoZWlnaHQ6IDQwMHB4O1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcbiAgICBtYXJnaW4tdG9wOiAyOHB4O1xuICAgIC5jb21tb24tYS1saXN0IHtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIC5kZXNjcmlwdGlvbi1ibG9jayB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgIGJvcmRlcjogMDtcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjY2M7XG4gICAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgICAgIHBhZGRpbmc6IDE4cHg7XG4gICAgICB9XG4gICAgICAuYXJlYXMge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LXdyYXA6IHdyYXA7XG4gICAgICAgIGZsZXg6IDAgMCAzMCU7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgLmFyZWEtcmlnaHQtc2lkZS0taW5mbywgLmFyZWEtcmlnaHQtc2lkZXtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBmbGV4LWdyb3c6IDE7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICAgICAgICAuYm9vay1ydWxlc3tcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC5hcmVhLWJvb2tlZHtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICAgICAgICAuYXJlYS10aW1lLWJvb2tpbmcge1xuICAgICAgICAgICAgcGFkZGluZzogMTBweCA1cHg7XG4gICAgICAgICAgfVxuICAgICAgICAgIC5ib29rLWRhdGV7XG4gICAgICAgICAgICAubWF0LWljb257XG4gICAgICAgICAgICAgIGNvbG9yOiAjOTk5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAuYXJlYS1ib29raW5nLWJ0bntcbiAgICAgICAgICBtYXJnaW46IDE1cHggNXB4IDEwcHg7XG4gICAgICAgICAgLm1hdC1yYWlzZWQtYnV0dG9ue1xuICAgICAgICAgICAgY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC44Nyk7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNzYsMTU2LDI1NSk7XG4gICAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuLmFyZWEtcnVsZXMtd3JhcHBlcntcbiAgbWF4LWhlaWdodDogNzUwcHg7XG4gIHdpZHRoOiA2NDBweDtcbiAgLm1hdC1yYWlzZWQtYnV0dG9ue1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM0YzljZmY7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCl7XG4gIC5taW0tY29tbW9uLWEtY2xpZW50e1xuICAgIG1pbi13aWR0aDogMzIwcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICB9XG59Il19 */");

/***/ }),

/***/ 37459:
/*!**********************************************************!*\
  !*** ./src/app/resident/guidelines/guidelines.page.scss ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".guidelines-wrapper {\n  min-height: 750px;\n  width: 640px;\n}\n.guidelines-wrapper .description-scroll {\n  position: relative;\n  display: block;\n  -webkit-overflow-scrolling: touch;\n  min-height: 470px;\n}\n.guidelines-wrapper .guidline-controls {\n  justify-content: flex-end;\n}\n.guidelines-wrapper .guidlines-text {\n  height: 82%;\n  max-height: 470px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  margin-bottom: 10px;\n  padding-right: 16px;\n  word-wrap: break-word;\n}\n.guidelines-wrapper .pdfFileGuid {\n  margin-bottom: 20px;\n}\n@media (max-width: 767px) {\n  .guidelines-wrapper {\n    min-width: 320px;\n    width: 100%;\n    height: auto;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImd1aWRlbGluZXMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0FBQ0Y7QUFDRTtFQUNFLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGlDQUFBO0VBQ0EsaUJBQUE7QUFDSjtBQUNFO0VBQ0UseUJBQUE7QUFDSjtBQUNFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtBQUNKO0FBQ0U7RUFDRSxtQkFBQTtBQUNKO0FBR0E7RUFDRTtJQUNFLGdCQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7RUFBRjtBQUNGIiwiZmlsZSI6Imd1aWRlbGluZXMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmd1aWRlbGluZXMtd3JhcHBlciB7XG4gIG1pbi1oZWlnaHQ6IDc1MHB4O1xuICB3aWR0aDogNjQwcHg7XG5cbiAgLmRlc2NyaXB0aW9uLXNjcm9sbCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbiAgICBtaW4taGVpZ2h0OiA0NzBweDtcbiAgfVxuICAuZ3VpZGxpbmUtY29udHJvbHN7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgfVxuICAuZ3VpZGxpbmVzLXRleHR7XG4gICAgaGVpZ2h0OiA4MiU7XG4gICAgbWF4LWhlaWdodDogNDcwcHg7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxNnB4O1xuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgfVxuICAucGRmRmlsZUd1aWR7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpe1xuICAuZ3VpZGVsaW5lcy13cmFwcGVye1xuICAgIG1pbi13aWR0aDogMzIwcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICB9XG59Il19 */");

/***/ }),

/***/ 38135:
/*!************************************************************!*\
  !*** ./src/app/resident/new-booking/new-booking.page.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".new-book-wrapper {\n  max-height: 750px;\n  height: 675px;\n  width: 640px;\n  flex-direction: row;\n  margin: auto;\n  align-items: flex-start;\n}\n.new-book-wrapper .header {\n  font-weight: bold;\n  margin-bottom: 20px;\n}\n.new-book-wrapper .buttons-back {\n  width: 100%;\n}\n.new-book-wrapper .next-button, .new-book-wrapper .building-check-mark {\n  width: 100%;\n  text-transform: uppercase;\n  background-color: #4c9cff;\n  color: white;\n}\n.new-book-wrapper .next-button.mat-button-disabled, .new-book-wrapper .building-check-mark.mat-button-disabled {\n  background-color: rgba(0, 0, 0, 0.12);\n  color: rgba(0, 0, 0, 0.38);\n  cursor: default;\n}\n.new-book-wrapper .building-check-mark {\n  margin-bottom: 15px;\n}\n.new-book-wrapper .radios {\n  align-items: flex-start;\n}\n.new-book-wrapper .mat-radio-button {\n  margin-right: 10px;\n}\n.new-book-wrapper .mat-radio-group {\n  padding-bottom: 20px;\n}\n.new-book-wrapper .select-ap {\n  width: 100%;\n}\n@media (max-width: 767px) {\n  .new-book-wrapper {\n    min-width: 320px;\n    width: 100%;\n    height: auto;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ldy1ib29raW5nLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFBO0VBQ0EsYUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtBQUNGO0FBQUU7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0FBRUo7QUFBRTtFQUNFLFdBQUE7QUFFSjtBQUFFO0VBQ0UsV0FBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7RUFDQSxZQUFBO0FBRUo7QUFESTtFQUNFLHFDQUFBO0VBQ0EsMEJBQUE7RUFDQSxlQUFBO0FBR047QUFBRTtFQUNFLG1CQUFBO0FBRUo7QUFBRTtFQUNFLHVCQUFBO0FBRUo7QUFBRTtFQUNFLGtCQUFBO0FBRUo7QUFBRTtFQUNFLG9CQUFBO0FBRUo7QUFBRTtFQUNFLFdBQUE7QUFFSjtBQUVBO0VBQ0U7SUFDRSxnQkFBQTtJQUNBLFdBQUE7SUFDQSxZQUFBO0VBQ0Y7QUFDRiIsImZpbGUiOiJuZXctYm9va2luZy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubmV3LWJvb2std3JhcHBlcntcbiAgbWF4LWhlaWdodDogNzUwcHg7XG4gIGhlaWdodDogNjc1cHg7XG4gIHdpZHRoOiA2NDBweDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgbWFyZ2luOiBhdXRvO1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgLmhlYWRlcntcbiAgICBmb250LXdlaWdodDogYm9sZDtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICB9XG4gIC5idXR0b25zLWJhY2t7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLm5leHQtYnV0dG9uLCAuYnVpbGRpbmctY2hlY2stbWFya3tcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM0YzljZmY7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgICYubWF0LWJ1dHRvbi1kaXNhYmxlZHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwwLDAsMC4xMik7XG4gICAgICBjb2xvcjogcmdiYSgwLDAsMCwwLjM4KTtcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICB9XG4gIH1cbiAgLmJ1aWxkaW5nLWNoZWNrLW1hcmt7XG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgfVxuICAucmFkaW9ze1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICB9XG4gIC5tYXQtcmFkaW8tYnV0dG9ue1xuICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgfVxuICAubWF0LXJhZGlvLWdyb3Vwe1xuICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xuICB9XG4gIC5zZWxlY3QtYXB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDc2N3B4KXtcbiAgLm5ldy1ib29rLXdyYXBwZXJ7XG4gICAgbWluLXdpZHRoOiAzMjBweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IGF1dG87XG4gIH1cbn0iXX0= */");

/***/ }),

/***/ 14674:
/*!*************************************************************!*\
  !*** ./src/app/resident/payment/resident-payment.page.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".area-payment-wrapper .book-button {\n  text-transform: uppercase;\n  color: #fff;\n}\n.area-payment-wrapper .book-button:not(.mat-button-disabled) {\n  background-color: #4c9cff;\n}\n.area-payment-wrapper .payment-form input {\n  width: 300px;\n  height: 35px;\n  text-indent: 8px;\n}\n.area-payment-wrapper .fields .email-field {\n  width: 286px;\n  height: 35px;\n  text-indent: 8px;\n}\n.area-payment-wrapper .fields .mandate-acceptance {\n  text-align: justify;\n  font-size: 13px;\n  padding-top: 11px;\n  padding-bottom: 11px;\n  line-height: 1.4;\n}\n.area-payment-wrapper .fields .mandate-acceptance .mandate-short {\n  display: inline-flex !important;\n  align-items: center;\n}\n.area-payment-wrapper .fields .mandate-acceptance .mandate-short:hover {\n  cursor: pointer;\n}\n.area-payment-wrapper .fields input {\n  border-width: 1px 1px 1px;\n  border-color: #555555;\n  border-radius: 4px;\n}\n.area-payment-wrapper .fields .agreement {\n  display: inline;\n}\n.area-payment-wrapper .fields .bank-account, .area-payment-wrapper .fields #card-element {\n  border: 1px solid #555555;\n  padding: 6.5px;\n  border-top: none;\n  margin-bottom: 20px;\n}\n.area-payment-wrapper .fields .card-additional, .area-payment-wrapper .fields .field {\n  width: 286px;\n}\n.area-payment-wrapper .fields .field {\n  margin-top: 20px;\n  border-radius: 3px 3px 0 0;\n}\n.area-payment-wrapper .fields #card-number {\n  border: 1px solid #555;\n  border-radius: 4px 4px 0 0;\n  border-bottom: 0;\n}\n.area-payment-wrapper .fields .card-additional {\n  display: flex;\n  margin-bottom: 5px;\n  border-top: none;\n  border-radius: 0 0 4px 4px;\n  border: 1px solid #555;\n}\n.area-payment-wrapper .fields .card-additional .field-half-width {\n  position: relative;\n  width: 50%;\n}\n.area-payment-wrapper .fields .card-additional .field-half-width.cvc {\n  border-left: 1px solid #555;\n}\n.area-payment-wrapper .fields #card-number, .area-payment-wrapper .fields #card-expiry, .area-payment-wrapper .fields #card-cvc {\n  padding: 5px;\n}\n.area-payment-wrapper .price {\n  display: flex;\n  justify-content: center;\n}\n.area-payment-wrapper .price button span {\n  background-color: #4c9cff;\n  padding: 10px;\n  border-radius: 4px;\n  color: white;\n}\n.area-payment-wrapper .price button:disabled span {\n  background-color: #7cb7ff;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2lkZW50LXBheW1lbnQucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtFO0VBQ0UseUJBQUE7RUFDQSxXQUFBO0FBSko7QUFLSTtFQUNFLHlCQUFBO0FBSE47QUFPSTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7QUFMTjtBQVNJO0VBQ0UsWUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQVBOO0FBU0k7RUFDRSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7QUFQTjtBQVFNO0VBQ0UsK0JBQUE7RUFDQSxtQkFBQTtBQU5SO0FBT1E7RUFDRSxlQUFBO0FBTFY7QUFTSTtFQUNFLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtBQVBOO0FBU0k7RUFDRSxlQUFBO0FBUE47QUFTSTtFQUNFLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFQTjtBQVNJO0VBQ0UsWUFBQTtBQVBOO0FBVUk7RUFDRSxnQkFBQTtFQUNBLDBCQUFBO0FBUk47QUFVSTtFQUNFLHNCQUFBO0VBQ0EsMEJBQUE7RUFDQSxnQkFBQTtBQVJOO0FBVUk7RUFFRSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0VBQ0Esc0JBQUE7QUFSTjtBQVNNO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0FBUFI7QUFRUTtFQUNFLDJCQUFBO0FBTlY7QUFVSTtFQUNFLFlBQUE7QUFSTjtBQVdFO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0FBVEo7QUFXTTtFQUNFLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQVRSO0FBWVE7RUFDRSx5QkFBQTtBQVZWIiwiZmlsZSI6InJlc2lkZW50LXBheW1lbnQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmFyZWEtcGF5bWVudC13cmFwcGVye1xuICAvLyBtYXgtaGVpZ2h0OiA3NTBweDtcbiAgLy8gaGVpZ2h0OiA2NTBweDtcbiAgLy8gd2lkdGg6IDY0MHB4O1xuXG4gIC5ib29rLWJ1dHRvbntcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGNvbG9yOiAjZmZmO1xuICAgICY6bm90KC5tYXQtYnV0dG9uLWRpc2FibGVkKXtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICM0YzljZmY7XG4gICAgfVxuICB9XG4gIC5wYXltZW50LWZvcm17XG4gICAgaW5wdXR7XG4gICAgICB3aWR0aDogMzAwcHg7XG4gICAgICBoZWlnaHQ6IDM1cHg7XG4gICAgICB0ZXh0LWluZGVudDogOHB4O1xuICAgIH1cbiAgfVxuICAuZmllbGRze1xuICAgIC5lbWFpbC1maWVsZHtcbiAgICAgIHdpZHRoOiAyODZweDtcbiAgICAgIGhlaWdodDogMzVweDtcbiAgICAgIHRleHQtaW5kZW50OiA4cHg7XG4gICAgfVxuICAgIC5tYW5kYXRlLWFjY2VwdGFuY2Uge1xuICAgICAgdGV4dC1hbGlnbjoganVzdGlmeTtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIHBhZGRpbmctdG9wOiAxMXB4O1xuICAgICAgcGFkZGluZy1ib3R0b206IDExcHg7XG4gICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgLm1hbmRhdGUtc2hvcnR7XG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4ICFpbXBvcnRhbnQ7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICY6aG92ZXJ7XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlucHV0e1xuICAgICAgYm9yZGVyLXdpZHRoOiAxcHggMXB4IDFweDtcbiAgICAgIGJvcmRlci1jb2xvcjogIzU1NTU1NTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICB9XG4gICAgLmFncmVlbWVudCB7XG4gICAgICBkaXNwbGF5OiBpbmxpbmU7XG4gICAgfVxuICAgIC5iYW5rLWFjY291bnQsICNjYXJkLWVsZW1lbnQge1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzU1NTU1NTtcbiAgICAgIHBhZGRpbmc6IDYuNXB4O1xuICAgICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgfVxuICAgIC5jYXJkLWFkZGl0aW9uYWwsIC5maWVsZHtcbiAgICAgIHdpZHRoOiAyODZweDtcbiAgICAgIC8vIGJvcmRlcjogMXB4IHNvbGlkICM1NTU1NTU7XG4gICAgfVxuICAgIC5maWVsZHtcbiAgICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gICAgICBib3JkZXItcmFkaXVzOiAzcHggM3B4IDAgMDtcbiAgICB9XG4gICAgI2NhcmQtbnVtYmVye1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgIzU1NTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDRweCA0cHggMCAwO1xuICAgICAgYm9yZGVyLWJvdHRvbTogMDtcbiAgICB9XG4gICAgLmNhcmQtYWRkaXRpb25hbHtcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgICAgIGJvcmRlci10b3A6IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiAwIDAgNHB4IDRweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICM1NTU7XG4gICAgICAuZmllbGQtaGFsZi13aWR0aHtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB3aWR0aDogNTAlO1xuICAgICAgICAmLmN2Y3tcbiAgICAgICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICM1NTU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgI2NhcmQtbnVtYmVyLCAjY2FyZC1leHBpcnksICNjYXJkLWN2Y3tcbiAgICAgIHBhZGRpbmc6IDVweDtcbiAgICB9XG4gIH1cbiAgLnByaWNle1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYnV0dG9ue1xuICAgICAgc3BhbntcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzRjOWNmZjtcbiAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgICBjb2xvcjogd2hpdGVcbiAgICAgIH1cbiAgICAgICY6ZGlzYWJsZWR7XG4gICAgICAgIHNwYW57XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzdjYjdmZjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9XG59XG4iXX0= */");

/***/ }),

/***/ 42496:
/*!**************************************************************************!*\
  !*** ./src/app/resident/resident-dashboard/resident-dashboard.page.scss ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".user-dashboard {\n  font-family: Arial, Helvetica, sans-serif;\n  width: 640px;\n}\n.user-dashboard .dashboard-wrapper {\n  width: 100%;\n}\n.user-dashboard .res-dash-button {\n  width: 100%;\n  color: #212121;\n  background-color: #fafafa;\n  text-align: left;\n  display: inline-flex;\n  position: relative;\n  cursor: pointer;\n  min-height: 36px;\n  min-width: 88px;\n  align-items: center;\n  line-height: 36px;\n  vertical-align: middle;\n  -webkit-box-align: center;\n  border-radius: 3px;\n  -webkit-user-select: none;\n          user-select: none;\n  border: 0;\n  padding: 0 6px;\n  margin: 6px 8px;\n  background: transparent;\n  text-transform: uppercase;\n  font-weight: 500;\n  font-size: 14px;\n  overflow: hidden;\n  transition: box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.user-dashboard .res-dash-button:not([disabled]) {\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n}\n.user-dashboard .res-dash-button .mat-icon {\n  margin-right: 5px;\n}\n.user-dashboard .resident-header {\n  margin-top: 0;\n  margin-bottom: 20px;\n}\n.user-dashboard a {\n  width: 100%;\n}\n.user-dashboard .res-dashboard-body {\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.user-dashboard .res-dashboard-body .building-block {\n  padding: 10px 20px;\n  width: 245px;\n}\n.user-dashboard .res-dashboard-body .building-block .dash-h3 {\n  font-size: 17px;\n  font-weight: 600;\n}\n.user-dashboard .res-dashboard-body .tenant-controls {\n  padding: 10px 10px;\n  border-left: 1px solid #eee;\n  min-width: 300px;\n  padding-top: 0;\n}\n.user-dashboard .res-select-container {\n  height: 48px;\n  line-height: 48px;\n  margin-top: 5px;\n  margin-bottom: 16px;\n  padding-left: 10px;\n  padding-right: 10px;\n  border-top: 1px solid rgba(63, 81, 181, 0.3);\n  border-left: 1px solid rgba(63, 81, 181, 0.3);\n  border-right: 1px solid rgba(63, 81, 181, 0.3);\n  border-bottom: 1px solid #3f51b5;\n}\n.user-dashboard .client-notice-number {\n  position: relative;\n}\n.user-dashboard .client-notice-number .notice-number-circle-wrap {\n  position: absolute;\n  top: 7px;\n  right: 10px;\n}\n.user-dashboard .client-notice-number .notice-number-circle-wrap .notice-number-circle {\n  display: flex;\n  flex-flow: row nowrap;\n  justify-content: center;\n  align-items: center;\n  background: red;\n  color: white;\n  border-radius: 50%;\n  width: 22px;\n  height: 22px;\n}\n.user-dashboard .loading-bar {\n  display: flex;\n  min-height: 300px;\n  align-items: center;\n  justify-content: center;\n}\n@media (max-width: 767px) {\n  .user-dashboard {\n    min-width: 320px;\n    width: 100%;\n    height: auto;\n  }\n}\n@media (max-width: 599px) {\n  .res-dashboard-body {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2lkZW50LWRhc2hib2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx5Q0FBQTtFQUNBLFlBQUE7QUFDRjtBQUFFO0VBQ0UsV0FBQTtBQUVKO0FBQUU7RUFDRSxXQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtVQUFBLGlCQUFBO0VBQ0EsU0FBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBRUEsb0hBQUE7QUFFSjtBQURJO0VBQ0UsMkNBQUE7QUFHTjtBQURJO0VBQ0UsaUJBQUE7QUFHTjtBQUFFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FBRUo7QUFBRTtFQUNFLFdBQUE7QUFFSjtBQUFFO0VBQ0UsOEJBQUE7RUFDQSxtQkFBQTtBQUVKO0FBREk7RUFDRSxrQkFBQTtFQUNBLFlBQUE7QUFHTjtBQUZNO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FBSVI7QUFESTtFQUNFLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFHTjtBQUFFO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLDRDQUFBO0VBQ0EsNkNBQUE7RUFDQSw4Q0FBQTtFQUNBLGdDQUFBO0FBRUo7QUFBRTtFQUNFLGtCQUFBO0FBRUo7QUFESTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7QUFHTjtBQUZNO0VBQ0UsYUFBQTtFQUNBLHFCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQUlSO0FBQUU7RUFDRSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBRUo7QUFDQTtFQUNFO0lBQ0UsZ0JBQUE7SUFDQSxXQUFBO0lBQ0EsWUFBQTtFQUVGO0FBQ0Y7QUFDQTtFQUNFO0lBQ0Usc0JBQUE7RUFDRjtBQUNGIiwiZmlsZSI6InJlc2lkZW50LWRhc2hib2FyZC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudXNlci1kYXNoYm9hcmR7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICB3aWR0aDogNjQwcHg7XG4gIC5kYXNoYm9hcmQtd3JhcHBlcntcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAucmVzLWRhc2gtYnV0dG9ue1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGNvbG9yOiByZ2IoMzMsMzMsMzMpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTAsMjUwLDI1MCk7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIG1pbi1oZWlnaHQ6IDM2cHg7XG4gICAgbWluLXdpZHRoOiA4OHB4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbGluZS1oZWlnaHQ6IDM2cHg7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBib3JkZXI6IDA7XG4gICAgcGFkZGluZzogMCA2cHg7XG4gICAgbWFyZ2luOiA2cHggOHB4O1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGJveC1zaGFkb3cgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpLGJhY2tncm91bmQtY29sb3IgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO1xuICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpLGJhY2tncm91bmQtY29sb3IgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO1xuICAgICY6bm90KFtkaXNhYmxlZF0pIHtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDVweCAwIHJnYigwIDAgMCAvIDI2JSk7XG4gICAgfVxuICAgIC5tYXQtaWNvbntcbiAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xuICAgIH1cbiAgfVxuICAucmVzaWRlbnQtaGVhZGVye1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuICBhe1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5yZXMtZGFzaGJvYXJkLWJvZHl7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgLmJ1aWxkaW5nLWJsb2NrIHtcbiAgICAgIHBhZGRpbmc6IDEwcHggMjBweDtcbiAgICAgIHdpZHRoOiAyNDVweDtcbiAgICAgIC5kYXNoLWgze1xuICAgICAgICBmb250LXNpemU6IDE3cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICB9XG4gICAgfVxuICAgIC50ZW5hbnQtY29udHJvbHN7XG4gICAgICBwYWRkaW5nOiAxMHB4IDEwcHg7XG4gICAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNlZWU7XG4gICAgICBtaW4td2lkdGg6IDMwMHB4O1xuICAgICAgcGFkZGluZy10b3A6IDA7XG4gICAgfVxuICB9XG4gIC5yZXMtc2VsZWN0LWNvbnRhaW5lcntcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gICAgbGluZS1oZWlnaHQ6IDQ4cHg7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICAgIHBhZGRpbmctcmlnaHQ6IDEwcHg7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoNjMsIDgxLCAxODEsIC4zKTtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHJnYmEoNjMsIDgxLCAxODEsIC4zKTtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCByZ2JhKDYzLCA4MSwgMTgxLCAuMyk7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoNjMsIDgxLCAxODEsIDEpO1xuICB9XG4gIC5jbGllbnQtbm90aWNlLW51bWJlcntcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgLm5vdGljZS1udW1iZXItY2lyY2xlLXdyYXB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDdweDtcbiAgICAgIHJpZ2h0OiAxMHB4O1xuICAgICAgLm5vdGljZS1udW1iZXItY2lyY2xlIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1mbG93OiByb3cgbm93cmFwO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgYmFja2dyb3VuZDogcmVkO1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgICAgd2lkdGg6IDIycHg7XG4gICAgICAgIGhlaWdodDogMjJweDtcbiAgICB9XG4gICAgfVxuICB9XG4gIC5sb2FkaW5nLWJhcntcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIG1pbi1oZWlnaHQ6IDMwMHB4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIH1cbn1cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCl7XG4gIC51c2VyLWRhc2hib2FyZHtcbiAgICBtaW4td2lkdGg6IDMyMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogYXV0bztcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNTk5cHgpe1xuICAucmVzLWRhc2hib2FyZC1ib2R5e1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cbn0iXX0= */");

/***/ }),

/***/ 22494:
/*!******************************************************************************!*\
  !*** ./src/app/resident/resident-noticeboard/resident-noticeboard.page.scss ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".user-noticeboard {\n  width: 760px;\n  min-height: 600px;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.user-noticeboard .mim-panel-header {\n  text-transform: uppercase;\n  text-align: center;\n  font-family: \"Montserrat\";\n  font-weight: 400;\n  margin-bottom: 20px;\n}\n.user-noticeboard .notice-added {\n  display: flex;\n  flex-flow: row nowrap;\n  align-items: center;\n  justify-content: flex-start;\n  margin-bottom: 1.125rem;\n}\n.user-noticeboard .notice-added span {\n  padding-top: 4px;\n  font-weight: bold;\n  padding-left: 6px;\n  line-height: 1.5em;\n  font-size: 14px;\n}\n.user-noticeboard .noticeboard-notice {\n  margin-bottom: 3rem;\n}\n.user-noticeboard .noticeboard-notice .notice-header {\n  font-size: 1.5rem;\n  line-height: 1.25em;\n  margin-bottom: 1rem;\n}\n.user-noticeboard .notice-files-item a {\n  display: flex;\n}\n.user-noticeboard .notice-files-item span {\n  color: black;\n  padding-left: 10px;\n  text-decoration: underline;\n  line-height: 1.5em;\n}\n.user-noticeboard .btn-wrap-single {\n  margin: 0;\n}\n.user-noticeboard .btn-wrap-single .back-btn {\n  height: 3rem;\n}\n.mim-btn--notice-more-info {\n  background: white;\n  width: 100%;\n  flex: 100%;\n  border: 1px solid #555555;\n  margin-top: 1.25rem;\n}\n.mim-btn--notice {\n  border-radius: 0;\n  height: 2.5rem;\n  text-transform: uppercase;\n}\n.mim-panel-content-wrap {\n  width: 100%;\n}\n.mim-panel-content-wrap .noticeboard-col {\n  display: flex;\n  justify-content: space-evenly;\n}\n.no-notices-msg {\n  text-align: center;\n  font-size: 1.25rem;\n  margin-bottom: 4rem;\n}\n@media (max-width: 767px) {\n  .user-noticeboard {\n    min-width: 320px;\n    width: 100%;\n    height: auto;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2lkZW50LW5vdGljZWJvYXJkLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7QUFDRjtBQUFFO0VBQ0UseUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQUVKO0FBQUU7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsdUJBQUE7QUFFSjtBQURJO0VBQ0UsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBR047QUFDRTtFQUNFLG1CQUFBO0FBQ0o7QUFBSTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQUVOO0FBRUk7RUFDRSxhQUFBO0FBQU47QUFFSTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0VBQ0Esa0JBQUE7QUFBTjtBQUdFO0VBQ0UsU0FBQTtBQURKO0FBRUk7RUFDRSxZQUFBO0FBQU47QUFJQTtFQUNFLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0FBREY7QUFHQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0FBQUY7QUFFQTtFQUNFLFdBQUE7QUFDRjtBQUFFO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0FBRUo7QUFDQTtFQUNFLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtBQUVGO0FBQ0E7RUFDRTtJQUNFLGdCQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7RUFFRjtBQUNGIiwiZmlsZSI6InJlc2lkZW50LW5vdGljZWJvYXJkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi51c2VyLW5vdGljZWJvYXJke1xuICB3aWR0aDogNzYwcHg7XG4gIG1pbi1oZWlnaHQ6IDYwMHB4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIC5taW0tcGFuZWwtaGVhZGVye1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdCc7XG4gICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICB9XG4gIC5ub3RpY2UtYWRkZWR7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWZsb3c6IHJvdyBub3dyYXA7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XG4gICAgbWFyZ2luLWJvdHRvbTogMS4xMjVyZW07XG4gICAgc3BhbiB7XG4gICAgICBwYWRkaW5nLXRvcDogNHB4O1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDZweDtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB9XG4gIFxuICB9IFxuICAubm90aWNlYm9hcmQtbm90aWNle1xuICAgIG1hcmdpbi1ib3R0b206IDNyZW07XG4gICAgLm5vdGljZS1oZWFkZXIge1xuICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgICBsaW5lLWhlaWdodDogMS4yNWVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgICB9XG4gIH1cbiAgLm5vdGljZS1maWxlcy1pdGVtIHtcbiAgICBhe1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICB9XG4gICAgc3BhbiB7XG4gICAgICBjb2xvcjogYmxhY2s7XG4gICAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjVlbTtcbiAgICB9XG4gIH1cbiAgLmJ0bi13cmFwLXNpbmdsZXtcbiAgICBtYXJnaW46IDA7XG4gICAgLmJhY2stYnRue1xuICAgICAgaGVpZ2h0OiAzcmVtO1xuICAgIH1cbiAgfVxufVxuLm1pbS1idG4tLW5vdGljZS1tb3JlLWluZm97XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICB3aWR0aDogMTAwJTtcbiAgZmxleDogMTAwJTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzU1NTU1NTtcbiAgbWFyZ2luLXRvcDogMS4yNXJlbTtcbn1cbi5taW0tYnRuLS1ub3RpY2V7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG4gIGhlaWdodDogMi41cmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuLm1pbS1wYW5lbC1jb250ZW50LXdyYXB7XG4gIHdpZHRoOiAxMDAlO1xuICAubm90aWNlYm9hcmQtY29se1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XG4gIH1cbn1cbi5uby1ub3RpY2VzLW1zZyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxLjI1cmVtO1xuICBtYXJnaW4tYm90dG9tOiA0cmVtO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNzY3cHgpe1xuICAudXNlci1ub3RpY2Vib2FyZHtcbiAgICBtaW4td2lkdGg6IDMyMHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogYXV0bztcbiAgfVxufSJdfQ== */");

/***/ }),

/***/ 74949:
/*!*************************************************************!*\
  !*** ./src/app/resident/resident-profile/profile.page.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".resident-update-profile {\n  width: 640px;\n  min-height: 450px;\n}\n.resident-update-profile .inner-wrap, .resident-update-profile .inner-content, .resident-update-profile .inner-header {\n  width: 100%;\n}\n.resident-update-profile .inner-field {\n  width: 100%;\n}\n.resident-update-profile .inner-field :first-child {\n  margin-right: 5px;\n}\n.resident-update-profile .inner-field .mat-form-field {\n  width: 50%;\n}\n.resident-update-profile .inner-field-full {\n  width: 100%;\n}\n.resident-update-profile .inner-field-full .mat-form-field {\n  width: 100%;\n}\n.resident-update-profile .special-needs {\n  width: 50%;\n  justify-content: flex-start;\n  padding-left: 20px;\n}\n.resident-update-profile .special-needs .special-check {\n  margin-left: 5px;\n}\n.resident-update-profile .upd-profile-book-wrap {\n  width: 100%;\n  margin-bottom: 16px;\n}\n.resident-update-profile .upd-profile-book-wrap .upd-profile-book-info {\n  margin-bottom: 8px;\n  margin-left: 6px;\n  font-weight: 500;\n  max-width: 100%;\n  overflow-wrap: break-word;\n}\n.resident-update-profile .upd-profile-book-wrap .mat-raised-button {\n  text-transform: uppercase;\n  margin: 6px 8px;\n}\n.resident-update-profile .loading-bar {\n  display: flex;\n  justify-content: center;\n}\n.res-action-button {\n  margin: 6px 8px;\n}\n.email-field {\n  width: 70% !important;\n}\n.phone-field {\n  width: 30% !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2ZpbGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0FBQ0Y7QUFBRTtFQUNFLFdBQUE7QUFFSjtBQUFFO0VBQ0UsV0FBQTtBQUVKO0FBREk7RUFDRSxpQkFBQTtBQUdOO0FBREk7RUFDRSxVQUFBO0FBR047QUFBRTtFQUNFLFdBQUE7QUFFSjtBQURJO0VBQ0UsV0FBQTtBQUdOO0FBQUU7RUFDRSxVQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtBQUVKO0FBREk7RUFDRSxnQkFBQTtBQUdOO0FBQUU7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7QUFFSjtBQURJO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBR047QUFESTtFQUNFLHlCQUFBO0VBQ0EsZUFBQTtBQUdOO0FBQUU7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7QUFFSjtBQUNBO0VBQ0UsZUFBQTtBQUVGO0FBQ0E7RUFDRSxxQkFBQTtBQUVGO0FBQUE7RUFDRSxxQkFBQTtBQUdGIiwiZmlsZSI6InByb2ZpbGUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnJlc2lkZW50LXVwZGF0ZS1wcm9maWxle1xuICB3aWR0aDogNjQwcHg7IFxuICBtaW4taGVpZ2h0OiA0NTBweDtcbiAgLmlubmVyLXdyYXAsIC5pbm5lci1jb250ZW50LCAuaW5uZXItaGVhZGVye1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5pbm5lci1maWVsZHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICA6Zmlyc3QtY2hpbGR7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDVweDtcbiAgICB9XG4gICAgLm1hdC1mb3JtLWZpZWxke1xuICAgICAgd2lkdGg6IDUwJTtcbiAgICB9XG4gIH1cbiAgLmlubmVyLWZpZWxkLWZ1bGx7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLm1hdC1mb3JtLWZpZWxke1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgfVxuICB9XG4gIC5zcGVjaWFsLW5lZWRze1xuICAgIHdpZHRoOiA1MCU7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICAgIHBhZGRpbmctbGVmdDogMjBweDtcbiAgICAuc3BlY2lhbC1jaGVja3tcbiAgICAgIG1hcmdpbi1sZWZ0OiA1cHg7XG4gICAgfVxuICB9XG4gIC51cGQtcHJvZmlsZS1ib29rLXdyYXB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICAudXBkLXByb2ZpbGUtYm9vay1pbmZve1xuICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IDZweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xuICAgIH1cbiAgICAubWF0LXJhaXNlZC1idXR0b257XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgbWFyZ2luOiA2cHggOHB4O1xuICAgIH1cbiAgfVxuICAubG9hZGluZy1iYXJ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxufVxuLnJlcy1hY3Rpb24tYnV0dG9ue1xuICBtYXJnaW46IDZweCA4cHg7XG59XG5cbi5lbWFpbC1maWVsZHtcbiAgd2lkdGg6IDcwJSAhaW1wb3J0YW50O1xufVxuLnBob25lLWZpZWxke1xuICB3aWR0aDogMzAlICFpbXBvcnRhbnQ7XG59Il19 */");

/***/ }),

/***/ 76545:
/*!*********************************************!*\
  !*** ./src/app/resident/resident.page.scss ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#container {\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n#container strong {\n  font-size: 20px;\n  line-height: 26px;\n}\n\n#container p {\n  font-size: 16px;\n  line-height: 22px;\n  color: #8c8c8c;\n  margin: 0;\n}\n\n#container a {\n  text-decoration: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc2lkZW50LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGtCQUFBO0VBRUEsa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFFBQUE7RUFDQSwyQkFBQTtBQUFGOztBQUdBO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFFQSxjQUFBO0VBRUEsU0FBQTtBQUZGOztBQUtBO0VBQ0UscUJBQUE7QUFGRiIsImZpbGUiOiJyZXNpZGVudC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjY29udGFpbmVyIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogNTAlO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG59XG5cbiNjb250YWluZXIgc3Ryb25nIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBsaW5lLWhlaWdodDogMjZweDtcbn1cblxuI2NvbnRhaW5lciBwIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMjJweDtcblxuICBjb2xvcjogIzhjOGM4YztcblxuICBtYXJnaW46IDA7XG59XG5cbiNjb250YWluZXIgYSB7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbn0iXX0= */");

/***/ }),

/***/ 49402:
/*!******************************************************!*\
  !*** ./src/app/resident/sub-role/sub-role.page.scss ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".sub-role-wrap {\n  align-items: flex-start;\n  max-height: 750px;\n  width: 640px;\n}\n.sub-role-wrap .move-wrapper {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  height: 100%;\n}\n.sub-role-wrap .move-wrapper .mat-radio-button {\n  margin-right: 10px;\n}\n.sub-role-wrap .move-wrapper .radio-groups {\n  display: flex;\n  flex-direction: column;\n}\n.sub-role-wrap .move-wrapper .radio-groups .mat-radio-group {\n  padding-bottom: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1Yi1yb2xlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0FBQ0Y7QUFBRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0VBQ0EsWUFBQTtBQUVKO0FBREk7RUFDRSxrQkFBQTtBQUdOO0FBREk7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7QUFHTjtBQUZNO0VBQ0Usb0JBQUE7QUFJUiIsImZpbGUiOiJzdWItcm9sZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3ViLXJvbGUtd3JhcHtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIG1heC1oZWlnaHQ6IDc1MHB4O1xuICB3aWR0aDogNjQwcHg7XG4gIC5tb3ZlLXdyYXBwZXJ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLm1hdC1yYWRpby1idXR0b257XG4gICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgfVxuICAgIC5yYWRpby1ncm91cHN7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIC5tYXQtcmFkaW8tZ3JvdXB7XG4gICAgICAgIHBhZGRpbmctYm90dG9tOiAyMHB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxufSJdfQ== */");

/***/ }),

/***/ 9980:
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/book-area/resident-book-area.page.html ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n        <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper book-area-wrapper\" *ngIf=\"!showRulesModal\">\n      <div class=\"move-wrapper d-flex-col full-page\" ng-hide=\"pageLoading\">\n        <div class=\"text-center\" *ngIf=\"commonArea\">\n          <div class=\"text-center\">{{ commonArea.building_name }}</div>\n          <h2 class=\"resident-header\">{{ commonArea.name }}</h2>\n        </div>\n        <form name=\"form\" *ngIf=\"!loading\" class=\"booking-form move-form d-flex-col\">\n          <div class=\"no-date-msg-3\" *ngIf=\"hours && hours.length === 0\">This date is booked/blocked out, please select\n            another date.</div>\n          <span></span>\n          <span class=\"md-icon-button icon-tooltip\"\n            aria-label=\"There is no available time for this date. Please, select another day\"\n            *ngIf=\"hours && hours.length === 0\"\n            matTooltip=\"There is no available time for this date. Please, select another day\">\n            <mat-icon>error</mat-icon>\n          </span>\n          <mat-form-field class=\"book-datepicker\">\n            <mat-label>Enter date</mat-label>\n            <input matInput [formControl]=\"selectedDate\" [min]=\"minDate\" [matDatepicker]=\"picker\" (ngModelChange)=\"loadHours()\">\n            <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n            <mat-datepicker #picker></mat-datepicker>\n          </mat-form-field>\n          <div class=\"timepicker\" *ngIf=\"!hours || hours.length > 0\">\n            <mat-form-field class=\"md-block select2 booking-form--timepicker\" *ngIf=\"!hours || hours.length > 0\">\n              <mat-select placeholder=\"Time\" [formControl]=\"selectedHour\">\n                <mat-option *ngFor=\"let hour of hours\" [value]=\"hour.id\">\n                  {{ hour.from + ':' + hour.from_min + ' ' + hour.day_part_from + ' - ' + hour.to + ':' + hour.to_min +\n                  ' ' + hour.day_part_to }}\n                </mat-option>\n              </mat-select>\n              <mat-icon matSuffix class=\"material-icons\">&#xE192;</mat-icon>\n            </mat-form-field>\n          </div>\n          <button mat-raised-button (click)=\"submit()\" [disabled]=\"loading || selectedDate.invalid || selectedHour.invalid\" class=\"book-button full-width\">\n            <span>{{buttonText}}</span>\n            <mat-icon class=\"material-icons\">&#xE876;</mat-icon>\n          </button>\n        </form>\n        <div class=\"text-center\" *ngIf=\"loading\">\n          <h3 сlass=\"loading-message\">{{loadingMessage}}</h3>\n          <div class=\"loading-bar\">\n            <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n          </div>\n        </div>\n        <div class=\"buttons-back autoheight full-width\">\n          <button mat-raised-button (click)=\"back()\">\n            <mat-icon class=\"material-icons\">keyboard_arrow_left</mat-icon> Back\n          </button>\n        </div>\n      </div>\n      <div class=\"loading-bar\" *ngIf=\"pageLoading\">\n        <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n      </div>\n    </div>\n\n    <div class=\"form-wrapper area-rules-wrapper rules-modal description-block\"\n      *ngIf=\"showRulesModal\">\n      <h2 class=\"text-center resident-header\">{{commonArea.name}} booking rules</h2>\n      <div class=\"description-scroll\" style=\"max-height: 570px\">\n        <div class=\"md-padding fix-height\" style=\"border:none; margin-bottom:0px;\">\n          <div class=\"description-block\">\n            <div [innerHtml]=\"commonArea.rules\"></div>\n          </div>\n        </div>\n        <!-- <div ng-repeat=\"(key, value) in fromFilesName(commonArea.name)\" ng-hide=\"!value\">\n          <span ng-show=\"commonArea.name\"></span>\n          <button mat-button class=\"inform-cat-download-button md-accent btn-view-pdf-tenant\"\n            сlass=\"md-accent btn-view-pdf-tenant\"\n            href=\"/download_area_file/{{building.id}}/{{commonArea.id}}/{{ value }}\">\n            <mat-icon class=\"material-icons\">file_download</mat-icon>\n          </button>\n          <mat-button target=\"_blank\" class=\" md-accent btn-view-pdf-tenant\"\n            href=\"/upload/pdf/{{building.id}}/common_areas/{{commonArea.id}}/{{ value }}\">\n            <span style=\"text-transform: none !important;\">\n              View {{ value }}\n            </span>\n            <mat-icon class=\"material-icons\">&#xE89E;</mat-icon>\n          </button>\n        </div> -->\n      </div>\n      <div class=\"buttons-back full-width\">\n        <button mat-raised-button (click)=\"showRulesModal=false;\">Close\n          <mat-icon class=\"material-icons\">close</mat-icon>\n        </button>\n      </div>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 53234:
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/book-lift/book-lift.page.html ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n        <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper book-area-wrapper\" *ngIf=\"!showRulesModal\">\n      <div class=\"move-wrapper d-flex-col full-page\" ng-hide=\"pageLoading\">\n        <div class=\"text-center\">\n          <div class=\"text-center\">{{ buildingName }}</div>\n          <h2 class=\"resident-header\">Book lift</h2>\n        </div>\n        <form name=\"form\" *ngIf=\"!loading\" class=\"booking-form move-form d-flex-col\">\n          <div class=\"no-date-msg-3\" *ngIf=\"timeslots && timeslots.length === 0\">This date is booked/blocked out, please select\n            another date.</div>\n          <span></span>\n          <span class=\"md-icon-button icon-tooltip\"\n            aria-label=\"There is no available time for this date. Please, select another day\"\n            *ngIf=\"timeslots && timeslots.length === 0\"\n            matTooltip=\"There is no available time for this date. Please, select another day\">\n            <mat-icon>error</mat-icon>\n          </span>\n          <mat-form-field class=\"book-datepicker\">\n            <mat-label>Enter date</mat-label>\n            <input matInput [formControl]=\"selectedDate\" (ngModelChange)=\"loadTimeslots()\" [min]=\"minDate\" [matDatepicker]=\"picker\">\n            <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n            <mat-datepicker #picker></mat-datepicker>\n          </mat-form-field>\n          <div class=\"timepicker\" *ngIf=\"!timeslots || timeslots.length > 0\">\n            <mat-form-field class=\"md-block select2 booking-form--timepicker\" *ngIf=\"!timeslots || timeslots.length > 0\">\n              <mat-select placeholder=\"Time\" [formControl]=\"selectedHour\">\n                <mat-option *ngFor=\"let hour of timeslots\" [value]=\"hour.id\">\n                  {{ hour.from + ':' + hour.from_min + ' ' + hour.day_part_from + ' - ' + hour.to + ':' + hour.to_min +\n                  ' ' + hour.day_part_to }}\n                </mat-option>\n              </mat-select>\n              <mat-icon matSuffix class=\"material-icons\">&#xE192;</mat-icon>\n            </mat-form-field>\n          </div>\n          <button mat-raised-button (click)=\"submit()\" [disabled]=\"loading || pageLoading || selectedDate.invalid || selectedHour.invalid\" class=\"book-button full-width\">\n            <span>Book lift</span>\n            <mat-icon class=\"material-icons\">&#xE876;</mat-icon>\n          </button>\n        </form>\n        <div class=\"text-center\" *ngIf=\"loading\">\n          <h3 сlass=\"loading-message\">{{loadingMessage}}</h3>\n          <div class=\"loading-bar\">\n            <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n          </div>\n        </div>\n        <div class=\"buttons-back autoheight full-width\">\n          <button mat-raised-button (click)=\"back()\" [disabled]=\"pageLoading\">\n            <mat-icon class=\"material-icons\">keyboard_arrow_left</mat-icon> Back\n          </button>\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 95945:
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/build-info/build-info.page.html ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n          <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper building-information-tenant\">\n      <div class=\"info-wrapper full-width\" *ngIf=\"!loading\">\n        <div class=\"text-center full-width\">\n          <h2 class=\"resident-header mim-print-build-info-title\">Building Information <div class=\"print-info-btn-wrap\">\n              <button class=\"pdfGuidDelete mim-print-build-info-btn\" matTooltip=\"Print\" (click)=\"prepareInfoForPrint()\">\n                <mat-icon class=\"material-icons\">&#xE8AD;</mat-icon>\n              </button>\n              <button class=\"pdfGuidDelete mim-download-info\" matTooltip=\"Download\" (click)=\"downloadInfo()\">\n                <mat-icon class=\"material-icons\">cloud_download</mat-icon>\n              </button>\n            </div>\n          </h2>\n          <h3 class=\"subheader text-center\">{{ building.name }}</h3>\n        </div>\n        <form name=\"form\"class=\"guidelines-form flex1 full-width\" (submit)=\"save()\">\n          <mat-tab-group class=\"tabs-350 flex1\">\n            <mat-tab label=\"Building Information\" class=\"full-page\">\n              <div class=\"search-wrap\">\n                <button class=\"button-fullsize\" aria-label=\"Use Android\"\n                  (click)=\"showAdvanced($event)\">\n                  <mat-icon class=\"material-icons\">fullscreen</mat-icon>\n                </button>\n                <div class=\"search-info-categories\">\n                  <mat-form-field appearance=\"standard\">\n                    <mat-label>Search category</mat-label>\n                    <input matInput [(ngModel)]=\"searchFilter\" [ngModelOptions]=\"{standalone: true}\"\n                      onkeydown=\"if(event.keyCode==13){return false;}\">\n                  </mat-form-field>\n                </div>\n              </div>\n\n              <div class=\"build-i-wrapper fix-height\">\n                <div class=\"description-block\" *ngFor=\"let k of building.categories | filter: searchFilter\">\n                  <h4 class=\"uppercase\">{{k.name}}</h4>\n                  <div *ngFor=\"let item of fromFileInfo(k.name) | keyvalue\">\n                    <button class=\"inform-cat-download-button md-accent btn-view-pdf-tenant\"\n                      href=\"/download_cat_pdf/{{building.id}}/{{ item.value }}\">\n                      <mat-icon class=\"material-icons\">file_download</mat-icon>\n                    </button>\n                    <button target=\"_blank\" class=\" md-accent btn-view-pdf-tenant\"\n                      href=\"/upload/pdf/{{building.id}}/{{ item.value }}\">\n                      <span style=\"text-transform: none !important;\">\n                        View {{ item.value }}\n                      </span>\n                      <mat-icon class=\"material-icons\">&#xE89E;</mat-icon>\n                    </button>\n                  </div>\n\n                  <div class=\"build-info-output\"\n                    [innerHtml]=\"k.description | emailToLink | urlToLink | phoneToLink\"></div>\n                  <div (click)=\"triggerBlockHeight($event)\" class=\"mim-see-more\">See more</div>\n                </div>\n              </div>\n            </mat-tab>\n            <mat-tab label=\"Map\" class=\"map\">\n              <div class=\"text-center\" *ngIf=\"building.contact_phone\">\n                {{building.address}}({{building.contact_phone}}\n              </div>\n              <div class=\"text-center\" *ngIf=\"!building.contact_phone\">\n              {{building.address}}</div>\n              <div class=\"map-info\">\n                <div id=\"map\">\n                  <google-map height=\"200\"></google-map>\n                </div>\n              </div>\n            </mat-tab>\n          </mat-tab-group>\n          <div *ngIf=\"!fromPage\" class=\"buttons-back\">\n            <button class=\"md-raised\" aria-label=\"description\" (click)=\"back()\">\n              <mat-icon class=\"material-icons\">keyboard_arrow_left</mat-icon> Back\n            </button>\n            <button class=\"md-raised md-primary\" routerLink=\"/#/noticeboard/view/{{building.id}}\">Next <mat-icon\n                class=\"material-icons\">forward</mat-icon>\n            </button>\n          </div>\n          <button mat-button class=\"res-action-button\" (click)=\"back()\" *ngIf=\"fromPage\">Close<mat-icon class=\"material-icons\">\n              close</mat-icon>\n          </button>\n        </form>\n      </div>\n      <div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\" class=\"loading-bar\"\n        *ngIf=\"loading || showLoading\">\n        <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n      </div>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ 22236:
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/change-move/change-move.page.html ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n        <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper book-area-wrapper\" *ngIf=\"!showRulesModal\">\n      <div class=\"move-wrapper d-flex-col full-page\" ng-hide=\"pageLoading\">\n        <div class=\"text-center\">\n          <div class=\"text-center\">{{ buildingName }}</div>\n          <h2 class=\"resident-header\" *ngIf='!isLiftBooking'><span>{{this.headerText}}</span> moving <span>{{out ? 'Out' : 'In'}}</span> date / time</h2>\n          <h2 class=\"resident-header\" *ngIf='isLiftBooking'>Change Lift Booking date / time</h2>\n        </div>\n        <form name=\"form\" *ngIf=\"!loading\" class=\"booking-form move-form d-flex-col\">\n          <div class=\"no-date-msg-3\" *ngIf=\"selectedDate.value && hours && hours.length === 0\">This date is booked/blocked out, please select\n            another date.</div>\n          <span class=\"md-icon-button icon-tooltip\"\n            aria-label=\"There is no available time for this date. Please, select another day\"\n            *ngIf=\"selectedDate.value && hours && hours.length === 0\"\n            matTooltip=\"There is no available time for this date. Please, select another day\">\n            <mat-icon>error</mat-icon>\n          </span>\n          <mat-form-field class=\"book-datepicker\">\n            <mat-label>Enter date</mat-label>\n            <input matInput [formControl]=\"selectedDate\" (ngModelChange)=\"loadHours()\" [min]=\"minDate\" [matDatepicker]=\"picker\">\n            <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n            <mat-datepicker #picker></mat-datepicker>\n          </mat-form-field>\n          <div class=\"timepicker\" *ngIf=\"!hours || hours.length > 0\">\n            <mat-form-field class=\"md-block select2 booking-form--timepicker\" *ngIf=\"!hours || hours.length > 0\">\n              <mat-select placeholder=\"Time\" [formControl]=\"selectedHour\">\n                <mat-option *ngFor=\"let hour of hours\" [value]=\"hour.id\">\n                  {{ hour.from + ':' + hour.from_min + ' ' + hour.day_part_from + ' - ' + hour.to + ':' + hour.to_min +\n                  ' ' + hour.day_part_to }}\n                </mat-option>\n              </mat-select>\n              <mat-icon matSuffix class=\"material-icons\">&#xE192;</mat-icon>\n            </mat-form-field>\n          </div>\n          <button mat-raised-button (click)=\"submit()\" [disabled]=\"loading || selectedDate.invalid || selectedHour.invalid\" class=\"book-button full-width\">\n            <span>{{buttonText}}</span>\n            <mat-icon class=\"material-icons\">&#xE876;</mat-icon>\n          </button>\n          <div *ngIf=\"!hideAlreadyMoved\">\n            <h3> OR </h3>\n          </div>\n          <div>\n              <button mat-raised-button (click)=\"alreadyMovedIn()\" *ngIf=\"!hideAlreadyMoved\"\n                  ng-disabled=\"loading||model.date||model.hour\" class=\"md-primary already-button\">\n                  <mat-icon class=\"material-icons\">&#xE876;</mat-icon>\n                  I've already moved {{out ? 'Out of' : 'In'}} the building\n              </button>\n          </div>\n        </form>\n        <div class=\"text-center\" *ngIf=\"loading\">\n          <h3 сlass=\"loading-message\">{{loadingMessage}}</h3>\n          <div class=\"loading-bar\">\n            <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n          </div>\n        </div>\n        <div class=\"buttons-back autoheight full-width\">\n          <button mat-raised-button (click)=\"back()\">\n            <mat-icon class=\"material-icons\">keyboard_arrow_left</mat-icon> Back\n          </button>\n        </div>\n      </div>\n      <div class=\"loading-bar\" *ngIf=\"pageLoading\">\n        <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n      </div>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 94841:
/*!******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/common-areas/resident-areas.page.html ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n        <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper mim-common-a-client\" *ngIf=\"!showingRules\">\n      <div class=\"info-wrapper full-width\" *ngIf=\"!pageLoading\">\n        <div class=\"text-center full-width\">\n          <h2 class=\"resident-header\">Common areas</h2>\n          <h3 class=\"subheader text-center\">{{ building.name }}</h3>\n        </div>\n        <div *ngIf='areas.length === 0' layout=\"column\" class=\"text-center\">\n          <h3> There is no common areas for this building yet.</h3>\n        </div>\n        <div class=\"common-a-content-wrap\">\n          <div *ngIf=\"bookingList.length !== 0\" class=\"common-area-bookings-wrap\">\n            <h3>Your bookings:</h3>\n            <div class=\"common-area-booking-list\">\n              <div class=\"area-booking-item\" *ngFor=\"let areaBooking of bookingList\">\n                <div class=\"title\">{{areaBooking.name}}</div>\n                <div class=\"dates\">{{getDateWithYearTo12(areaBooking.date_from)}} - {{getDateTo12(areaBooking.date_to)}}\n                </div>\n              </div>\n            </div>\n          </div>\n          <form name=\"form\" class=\"guidelines-form full-width\" ng-submit=\"save()\" *ngIf=\"areas.length>0\">\n            <div class=\"common-a-list\" md-border-bottom>\n              <div class=\"d-flex areas description-block\" *ngFor=\"let area of areas\">\n                <div class=\"area-left-side\" *ngIf=\"area.image\">\n                  <img src=\"{{env.baseUrl}}{{area.image}}\" alt=\"alt\">\n                </div>\n                <div class=\"area-right-side\">\n                  <div class=\"area-right-side--info\">\n                    <h3 class=\"resident-header\">{{area.name}}</h3>\n                    <div>{{area.description}}</div>\n\n                    <!-- <div ng-repeat=\"(key, value) in fromFilesName(area.name)\" ng-hide=\"!value\">\n                      <button mat-button class=\"inform-cat-download-button md-accent btn-view-pdf-tenant\"\n                        сlass=\"md-accent btn-view-pdf-tenant\"\n                        href=\"/download_area_file/{{building.id}}/{{area.id}}/{{ value }}\">\n                        <mat-icon class=\"material-icons\">file_download</mat-icon>\n                      </button>\n\n                      <button mat-button target=\"_blank\" class=\" md-accent btn-view-pdf-tenant\"\n                        href=\"/upload/pdf/{{building.id}}/common_areas/{{area.id}}/{{ value }}\">\n                        <span style=\"text-transform: none !important;\">\n                          View {{ value }}\n                        </span>\n                        <mat-icon class=\"material-icons\">&#xE89E;</mat-icon>\n                      </button>\n                    </div> -->\n                    <div class=\"book-rules mgt10\">\n                      <a (click)='showRules(area.id)' style=\"cursor: pointer;\">Rules of {{area.name}}</a>\n                    </div>\n                    <div class=\"book-rules mgt10\" *ngIf=\"area.price\">\n                      Price - {{area.price}} AUD\n                    </div>\n                    <div class=\"book-rules mgt10\" *ngIf=\"area.fee\">\n                      Fee - {{area.fee}} AUD\n                    </div>\n                    <div *ngIf=\"area.area_booking.length > 0\" class=\"area-booked\">\n                      <b>You've booked this area:</b>\n                      <div *ngFor=\"let booking of area.area_booking\">\n                        <div class=\"area-time-booking\">\n                          {{getDateWithYearTo12(booking.date_from)}} - {{getDateTo12(booking.date_to)}}\n                        </div>\n                        <div class=\"book-date\">\n                          <button mat-button class=\"inform-cat-download-button md-accent btn-view-pdf-tenant watch-icon\"\n                            (click)=\"editAreaBooking(area, booking.id)\">\n                            <mat-icon style=\"font-size: 23px\" class=\"material-icons\">watch_later</mat-icon>\n                          </button>\n                          <button mat-button class=\"inform-cat-download-button md-accent btn-view-pdf-tenant\"\n                            (click)='deleteAreaBooking(area.id, booking.id, area.name, booking.date_from)'>\n                            <mat-icon class=\"material-icons\">delete_forever</mat-icon>\n                          </button>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                  <div class=\"area-booking-btn\">\n                    <button mat-raised-button [disabled]=\"area.allow_booking === '0'\" (click)=\"checkFreeArea(area)\">\n                      Book this area\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </form>\n        </div>\n        <div class=\"mgt20 buttons-back\">\n          <button mat-raised-button aria-label=\"description\" (click)=\"back()\">\n            <mat-icon class=\"material-icons\">keyboard_arrow_left</mat-icon>\n            Back\n          </button>\n        </div>\n      </div>\n      <div class=\"loading-bar\" *ngIf=\"pageLoading\">\n        <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n      </div>\n    </div>\n    <div class=\"form-wrapper area-rules-wrapper\" *ngIf=\"showingRules\">\n      <div class=\"text-center full-width\">\n        <h2 class=\"resident-header\">{{ areaName }} rules</h2>\n        <div class=\"text-left\">\n          <div class=\"terms\" layout-padding>\n            <div [innerHtml]=\"areaRules\"></div>\n          </div>\n          <div class=\"buttons-back\">\n            <button mat-raised-button class=\"button-log back-btn btn-back\" (click)=\"showingRules=false;\">\n              Close\n              <mat-icon class=\"material-icons\">close</mat-icon>\n            </button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 51109:
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/guidelines/guidelines.page.html ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n        <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\"\n        (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper guidelines-wrapper\" layout=\"column\" layout-wrap>\n      <div class=\"guidlines-wrapper full-width\" *ngIf=\"!pageLoading\">\n        <h2 class=\"resident-header text-center\">Moving In/Out Guidelines</h2>\n        <h3 class=\"subheader text-center\">{{ model.name }}</h3>\n        <form class=\"description-scroll guidelines-form flex1\"\n          style=\"border: 1px solid #eee;padding: 0 10px;margin-bottom: 15px\">\n          <div class=\"d-flex guidline-controls\">\n            <button class=\"pdfGuidDelete\" (click)=\"sendEmail()\" matTooltip=\"Send email\" matTooltipPosition=\"above\">\n              <mat-icon class=\"material-icons\">&#xE0BE;</mat-icon>\n            </button>\n            <button class=\"pdfGuidDelete\" (click)=\"printElem(model.guidlines)\" matTooltip=\"Print\"\n              matTooltipPosition=\"above\">\n              <mat-icon class=\"material-icons\">&#xE8AD;</mat-icon>\n            </button>\n          </div>\n          <div class=\"guidlines-text\" [innerHtml]=\"model.guidlines | emailToLink | urlToLink | phoneToLink\"></div>\n        </form>\n        <div class=\"scroll-guidlines-files\">\n          <div class=\"pdfFileGuid\" *ngFor=\"let file of guidelinesFilesTenant.blobUrlGuidelines | keyvalue\">\n            <button mat-button matTooltip=\"Download file\" class=\"pdfGuidDelete\" (click)=\"downloadFile(id, file.key)\">\n              <mat-icon class=\"material-icons\">file_download</mat-icon>\n            </button>\n            <button mat-button matTooltip=\"View file\" class=\"pdfGuidDelete\" target=\"_blank\"\n              (click)=\"viewFile(file.value)\">\n              <mat-icon class=\"material-icons\">&#xE89E;</mat-icon>\n            </button>\n            <a target=\"_blank\" (click)=\"viewFile(file.value)\">{{ file.key }}</a>\n          </div>\n        </div>\n        <button class=\"res-action-button\" routerLink=\"../information/view/{{ model.id }}\" *ngIf=\"fromPage\">\n          Next step\n          <mat-icon class=\"material-icons\">forward</mat-icon>\n        </button>\n        <button class=\"res-action-button\" (click)=\"dashboard()\" *ngIf=\"!fromPage\">Close\n          <mat-icon class=\"material-icons\">close</mat-icon>\n        </button>\n      </div>\n      <div layout=\"row\" class=\"loading-bar\" *ngIf=\"pageLoading\">\n        <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n      </div>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 84040:
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/new-booking/new-booking.page.html ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n        <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper new-book-wrapper\">\n      <form name=\"form\" class=\"full-width\" ng-submit=\"submit()\">\n        <div ng-hide=\"pageLoading\" class=\"building-page-loader\" style=\"width:100%;\" ng-hide=\"pageLoading\">\n          <h2 class=\"header text-center\">Select Apartment</h2>\n          <div ng-hide=\"isCustomBuildingSession\">\n            <mat-form-field class=\"autocomplete full-width\" appearance=\"standard\">\n              <input type=\"text\" matInput [formControl]=\"buildAuto\" [matAutocomplete]=\"auto\"\n                placeholder=\"Enter building name or street address\">\n              <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\">\n                <mat-option *ngFor=\"let build of filteredBuilds | async\" (click)=\"selectBuild(build)\" [value]=\"build\">\n                  {{build.name + ' - ' + build.address }}\n                </mat-option>\n              </mat-autocomplete>\n            </mat-form-field>\n            <button mat-button *ngIf=\"!showChange\" class=\"building-check-mark button-autocomplete\"\n              [disabled]=\"loading || !selectedBuild\" (click)=\"proceed()\">\n              Proceed to Apartment Selection\n              <mat-icon class=\"material-icons\">&#xE86C;</mat-icon>\n            </button>\n          </div>\n          <div *ngIf=\"selectedBuild && showApartment\" class=\"appartment-in-building-wrapper\">\n            <div class=\"appartment-wrapper\" *ngIf=\"!pageLoading\">\n              <div class=\"text-center\">\n                <div class=\"text-center building-name\">{{ building.name }}</div>\n              </div>\n              <div class=\"building-wrapper mgb20 text-center\">\n                <!-- <img src=\"{{environment.baseUrl}}/img/buildings/{{ building.photo }}\" alt=\"\"> -->\n              </div>\n              <div class=\"mgb20 full-width d-flex-col radios\">\n                <mat-form-field class=\"select-ap\" appearance=\"standard\">\n                  <mat-label>Select apartment</mat-label>\n                  <mat-select [formControl]=\"apartment\">\n                    <mat-option *ngFor=\"let b of apartments\" (click)=\"selectApartment(b)\" [value]=\"b\">\n                      {{b.name}}\n                    </mat-option>\n                  </mat-select>\n                </mat-form-field>\n                <mat-radio-group required [(ngModel)]=\"model.user_status\" [ngModelOptions]=\"{standalone: true}\"\n                  (change)=\"changeResidingStatus()\">\n                  <span class=\"notify-send\">Change status: </span>\n                  <mat-radio-button value=\"Resident\" class=\"md-primary\">Tenant</mat-radio-button>\n                  <mat-radio-button value=\"Owner\" class=\"md-primary\"> Owner </mat-radio-button>\n                </mat-radio-group>\n                <mat-radio-group required [(ngModel)]=\"model.is_residing\" [ngModelOptions]=\" {standalone: true}\"\n                  *ngIf=\"!(model.user_status == 'Resident' || model.user_status == 'Unselected')\">\n                  <mat-radio-button value=\"1\">Residing</mat-radio-button>\n                  <mat-radio-button value=\"0\">Non-Residing</mat-radio-button>\n                </mat-radio-group>\n                <button mat-raised-button (click)=\"nextButton()\" class=\"next-button button-autocomplete\"\n                *ngIf=\"currentApartment === false\" [disabled]=\"loading || !selectedAp\">\n                <span>{{buttonText}}</span>\n                <mat-icon class=\"material-icons\">forward</mat-icon>\n              </button>\n                <div class=\"buttons-back mgt20\">\n                  <div class=\"buttons-back buttons-wrap\" *ngIf=\"currentApartment !== false\">\n                    <button mat-raised-button class=\"button-autocomplete back-button-fix\" (click)=\"back()\">\n                      <mat-icon class=\"material-icons\">keyboard_arrow_left</mat-icon> Back\n                    </button>\n                    <button mat-raised-button ng-click=\"saveApartment()\"\n                      class=\"md-primary button-autocomplete\"\n                      ng-disabled=\"selectedItem2 === currentApartment.apartment.id || loading\">\n                      <span>{{buttonText}}</span>\n                      <mat-icon class=\"material-icons\">&#xE876;</mat-icon>\n                    </button>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"loading-bar\" *ngIf=\"pageLoading\">\n              <ion-spinner color=\"primary\"></ion-spinner>\n            </div>\n          </div>\n        </div>\n        <div class=\"loading-bar\" *ngIf=\"pageLoading\">\n          <ion-spinner color=\"primary\"></ion-spinner>\n        </div>\n        <div class=\"buttons-back mgt60 autoheight\" ng-hide=\"loadButtonBack || pageLoading\">\n          <button mat-raised-button class=\"md-raised mobile-margin-0\" (click)=\"back()\">\n            <mat-icon class=\"material-icons\">keyboard_arrow_left</mat-icon> Back\n          </button>\n        </div>\n      </form>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 1386:
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/payment/resident-payment.page.html ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n        <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper area-payment-wrapper\" *ngIf=\"!showRulesModal\">\n      <div class=\"move-wrapper d-flex-col full-page\" ng-hide=\"pageLoading\">\n        <div class=\"text-center\" *ngIf=\"commonArea\">\n          <div class=\"text-center\">{{ buildingName }}</div>\n          <h2 class=\"resident-header\">{{ commonArea.name }} Payment</h2>\n        </div>\n        <div class=\"payment-form fields\">\n          <ngx-stripe-card-group [formGroup]=\"stripeTest\" [elementsOptions]=\"elementsOptions\">\n            <input matInput class=\"email-field\" placeholder=\"Email\" formControlName=\"email\" name=\"email\">\n            <div class=\"field\">\n              <div id=\"card-number\">\n                <ngx-stripe-card-number [options]=\"cardOptions\"></ngx-stripe-card-number>\n              </div>\n              <div class=\"card-additional\">\n                <div class=\"field-half-width\">\n                  <div id=\"card-expiry\">\n                    <ngx-stripe-card-expiry [options]=\"cardOptions\"></ngx-stripe-card-expiry>\n                  </div>\n                </div>\n                <div class=\"field-half-width cvc\">\n                  <div id=\"card-cvc\">\n                    <ngx-stripe-card-cvc [options]=\"cardOptions\"></ngx-stripe-card-cvc>\n                  </div>\n                </div>\n              </div>\n              <div *ngIf=\"error\" id=\"error-message\" role=\"alert\">{{error}}</div>\n            </div>\n            <div class=\"price\">\n              <button mat-button [disabled]=\"stripeTest.status === 'INVALID'\" class=\"pay-button\" (click)=\"submitPayment()\">\n                <span *ngIf=\"amount\">Pay {{amount / 100}} AUD</span>\n              </button>\n            </div>\n          </ngx-stripe-card-group>\n        </div>\n        <div class=\"text-center\" *ngIf=\"loading\">\n          <h3 сlass=\"loading-message\">{{loadingMessage}}</h3>\n          <div class=\"loading-bar\">\n            <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n          </div>\n        </div>\n        <div class=\"buttons-back autoheight full-width\">\n          <button mat-raised-button (click)=\"back()\">\n            <mat-icon class=\"material-icons\">keyboard_arrow_left</mat-icon> Back\n          </button>\n        </div>\n      </div>\n      <div class=\"loading-bar\" *ngIf=\"pageLoading\">\n        <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n      </div>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 25043:
/*!****************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/resident-dashboard/resident-dashboard.page.html ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n          <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page\">\n    <div class=\"form-wrapper user-dashboard\">\n      <div class=\"dashboard-wrapper\" *ngIf=\"!pageLoading\">\n        <h2 class=\"text-center resident-header\">My Dashboard</h2>\n        <mat-select class=\"res-select-container\" placeholder=\"Select\" (selectionChange)=\"changeBooking()\" [(ngModel)]=\"selectedBooking\">\n          <mat-option *ngFor=\"let booking of bookings\" [value]=\"booking\">\n            {{booking.building.name}} ({{booking.apartment.name}}) {{getFormattedDate(booking.date_from)}}  <span [innerHtml]='getBookingType(booking)'></span>\n          </mat-option>\n        </mat-select>\n        <div class=\"loading-bar\" *ngIf=\"!model || pageLoading\">\n          <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n        </div>\n        <div class=\"d-flex res-dashboard-body\" *ngIf=\"model\">\n          <div class=\"building-block d-flex-col\">\n            <div class=\"building-block-header\">\n              <div *ngIf=\"model && model.user_status !== 'Unselected'\" class=\"md-block text-center\">\n                Your status -\n                <span *ngIf=\"model.user_status == 'Owner'\"> Owner</span>\n                <span *ngIf=\"model.user_status == 'Resident'\"> Tenant</span>\n                <br><span *ngIf=\"model.user_status == 'Owner'\">({{ model.is_residing }})</span>\n              </div>\n              <div style=\"color:red;\" *ngIf=\"model && model.user_status === 'Unselected'\"\n                class=\"md-block text-center\">\n                Choose your status\n            </div>\n            </div>\n            <div class=\"building-block-header\">\n              <h3 class=\"dash-h3\">{{model.building.name}}</h3>\n            </div>\n            <div class=\"building-block-img\" [ngClass]=\"{'no-photo-wrap': !model }\">\n              <img class=\"md-whiteframe-z2 building-photo\" *ngIf=\"model\"\n                src=\"{{env.baseUrl}}/img/buildings/{{model.building.photo}}\" alt=\"\" class=\"image-md\">\n              <img class=\"md-whiteframe-z2 photo-no-booking\" *ngIf=\"!model\" src=\"{{env.baseUrl}}/photo/photo-no-booking.jpg\"\n                alt=\"\" class=\"image-md\">\n            </div>\n          </div>\n          <div class=\"tenant-controls d-flex-col\">\n            <button mat-button *ngIf=\"model\" class=\"res-dash-button\" aria-label=\"dashbutton\"\n              (click)=\"showContactDetails()\" [disabled]=\"loading\">\n              <mat-icon class=\"material-icons\">&#xE61C;</mat-icon> Building Contact Details\n            </button>\n            <button mat-button class=\"res-dash-button\" aria-label=\"dashbutton\"\n              routerLink=\"../information/{{model.building_id}}\" [disabled]=\"loading\">\n              <mat-icon class=\"material-icons\">&#xE0AF;</mat-icon> Building Information\n            </button>\n            <button mat-button class=\"res-dash-button\" aria-label=\"dashbutton\" ng-if=\"model && showCommonArea\"\n              routerLink=\"../book-area/view/{{model.building.id}}\" [disabled]=\"loading\">\n              <mat-icon class=\"material-icons\">grade</mat-icon> Common areas bookings\n            </button>\n            <button mat-button class=\"res-dash-button\" aria-label=\"dashbutton\"\n              routerLink=\"../guidelines/view/{{model.building.id}}\" *ngIf=\"model\" [disabled]=\"loading\">\n              <mat-icon class=\"material-icons\">&#xE0E0;</mat-icon> Moving Guidelines\n            </button>\n            <button mat-button class=\"res-dash-button\" aria-label=\"dashbutton\" *ngIf=\"checkNext()\"\n              routerLink='../building/new-booking' [disabled]=\"loading\">\n              <mat-icon class=\"material-icons\">forward</mat-icon>Next Building\n            </button>\n            <button mat-button class=\"res-dash-button\" aria-label=\"dashbutton\"\n              *ngIf=\"model.building.allow_move_in == 1 && model.status != 'pending' && allowBookLift\n               && !((model.user_status === 'Owner' && model.is_residing == 'Non-Residing'))\"\n              routerLink=\"../book-lift/{{model.id}}\" [disabled]=\"loading\">\n              <mat-icon class=\"material-icons\">forward</mat-icon>Book Lift\n            </button>\n            <button mat-button class=\"res-dash-button\" aria-label=\"dashbutton\" routerLink=\"../move/{{model.id}}\"\n              *ngIf=\"model.status === 'pending' && model.building.allow_move_in == 1\"\n              [disabled]=\"loading\">\n              <mat-icon *ngIf=\"model.is_residing === 'Non-Residing'\" class=\"material-icons\">check</mat-icon>\n              <mat-icon *ngIf=\"!(model.is_residing === 'Non-Residing')\"\n                title=\"Please set up date and time to continue booking process\" style=\"color:red;\"\n                class=\"material-icons\">report</mat-icon>Set move-in time and date\n            </button>\n            <button mat-button class=\"res-dash-button\" aria-label=\"dashbutton\" routerLink=\"../move-out/{{model.id}}\"\n              *ngIf=\"!model.status_out && model.status === 'moved' && model.building.allow_move_in == 1\"\n              [disabled]=\"loading\">\n              <mat-icon class=\"material-icons\">done_all</mat-icon> Book Move Out\n            </button>\n            <button mat-button class=\"res-dash-button\" aria-label=\"dashbutton\" routerLink=\"../move/{{model.id}}/change\"\n              *ngIf=\"model.status === 'moving' && model.building.allow_move_in == 1\" [disabled]=\"loading\">\n              <mat-icon class=\"material-icons\">date_range_all</mat-icon> Change\n              {{model.is_lift == 1 ? 'Lift Booking' :  'Moving In'}} Date/Time\n            </button>\n            <button mat-button class=\"res-dash-button\" aria-label=\"dashbutton\" routerLink=\"../move\" routerLink=\"../move-out/{{model.id}}\"\n              *ngIf=\"model.status_out === 'moving' && model.building.allow_move_in == 1\" [disabled]=\"loading\">\n              <mat-icon class=\"material-icons\">date_range_all</mat-icon> Change Moving Out Date/Time\n            </button>\n            <button mat-button class=\"res-dash-button client-notice-number\" aria-label=\"dashbutton\" *ngIf=\"model\"\n              routerLink=\"../noticeboard/{{model.building.id}}\" [disabled]=\"loading\">\n              <mat-icon svgIcon=\"noticeboard\" class=\"material-icons\"></mat-icon> Noticeboard\n              <div *ngIf=\"noticeNumber !== 0\" class=\"notice-number-circle-wrap\">\n                <div class=\"notice-number-circle\">{{noticeNumber}}</div>\n              </div>\n            </button>\n          </div>\n        </div>\n        <div class=\"mgt20\">\n          <button *ngIf=\"model\" mat-button class=\"res-action-button\" aria-label=\"dashbutton\"\n            routerLink=\"../profile/{{model.id}}\">Update my personal profile</button>\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ 60035:
/*!********************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/resident-noticeboard/resident-noticeboard.page.html ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n        <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper user-noticeboard\">\n      <div *ngIf=\"!(pageLoading || loading)\" class=\"mim-panel-content-wrap\">\n        <h2 class=\"mim-panel-header\">{{buildingName}} notice board</h2>\n        <div *ngIf=\"isNoNotices\" class=\"no-notices-msg\"><span>There Are No Notices For This Building.</span></div>\n        <div *ngIf=\"!isNoNotices\" class=\"noticeboard-cols-wrap\">\n          <div class=\"noticeboard-col noticeboard-col-1\">\n            <div class=\"noticeboard-notice\" *ngFor=\"let notice of notices\">\n              <div class=\"notice-added\"><img height=\"18\" width=\"18\" src=\"assets/img/icons/cal.svg\" alt=\"\"><span>Added:\n                  {{formatDateForClient(notice.created_at)}}</span></div>\n              <div class=\"notice-header\">{{notice.title}}</div>\n              <div *ngIf=\"notice.fileList\" class=\"notice-uploaded-files\">\n                <div class=\"notice-files-item\" ng-hide=\"!key\" *ngFor=\"let file of notice.fileList | keyvalue\">\n                  <a target=\"_blank\" title=\"{{ file.key }}\" href=\"{{ file.value }}\">\n                    <mat-icon svgIcon=\"upload2\" aria-label=\"download file\"></mat-icon><span>{{ file.key }}</span>\n                  </a>\n                </div>\n              </div>\n              <div class=\"notice-action-buttons\">\n                <button class=\"mim-btn--notice mim-btn--notice-more-info\"><a\n                    href=\"#/noticeboard/{{buildingId}}/notice/{{notice.id}}\">More info</a></button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div *ngIf=\"!isNewBooking || pageLoading\" class=\"btn-wrap-single login-buttons\">\n        <button mat-button class=\"back-btn mim-btn md-button\" [disabled]=\"loading\" (click)=\"back()\">\n          <mat-icon class=\"material-icons\">keyboard_backspace</mat-icon> Back\n        </button>\n        <button mat-button *ngIf=\"isNewBooking\" class=\"mim-btn--submit mim-btn md-button\" [disabled]=\"loading\"><a\n            href=\"/#/\">Finish</a></button>\n      </div>\n      <div *ngIf=\"isNewBooking\" class=\"stick-to-bottom\">\n        <div class=\"btn-wrap-bottom login-buttons\" *ngIf=\"!pageLoading\">\n          <button mat-button class=\"back-btn md-button\" [disabled]=\"loading\" (click)=\"back()\">\n            <mat-icon class=\"material-icons\">keyboard_backspace</mat-icon> Back\n          </button>\n          <button mat-button class=\"mim-btn--submit mim-btn md-button\" [disabled]=\"loading\"><a href=\"/#/\">Finish</a>\n          </button>\n        </div>\n      </div>\n      <div class=\"loading-bar\" *ngIf=\"pageLoading || loading\">\n        <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n      </div>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 83373:
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/resident-profile/profile.page.html ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n        <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper resident-update-profile\">\n      <form method=\"post\" name=\"form\" [formGroup]=\"userForm\" class=\"user-edit full-width\">\n        <div *ngIf=\"!pageLoading\" class=\"d-flex-col inner-wrap\">\n          <div class=\"text-center inner-header\">\n            <h2 class=\"resident-header\">Update personal profile</h2>\n          </div>\n          <div class=\"d-flex-col inner-content\">\n            <div class=\"d-flex inner-field\">\n              <mat-form-field appearance=\"standard\">\n                <mat-label>Name</mat-label>\n                <input matInput type=\"text\" placeholder=\"Name\" formControlName=\"name\" />\n              </mat-form-field>\n              <div class=\"d-flex special-needs\">\n                <div>Special Requirements: </div>\n                <input type=\"checkbox\" class=\"special-check\" formControlName=\"special_needs\">\n              </div>\n            </div>\n            <div class=\"d-flex inner-field\">\n              <mat-form-field appearance=\"standard\" class=\"phone-field\">\n                <mat-label>Phone</mat-label>\n                <input matInput type=\"text\" mask=\"mask.phone\" id=\"phone\" formControlName=\"phone\" mask=\"00 0000 000 000 || 00 0000 0000 || 0000 0000 || 0 000 000 0000\" />\n                <mat-hint *ngIf=\"userForm.controls.phone.touched && userForm.controls.phone.errors\"\n                  class=\"form-val-input\">\n                  Please enter a correct phone.</mat-hint>\n              </mat-form-field>\n              <mat-form-field appearance=\"standard\" class=\"email-field\">\n                <mat-label>Email</mat-label>\n                <input matInput type=\"email\" placeholder=\"Email\" name=\"email\" formControlName=\"email\">\n                <mat-hint *ngIf=\"userForm.controls.email.touched &&\n                  userForm.controls.email.errors && userForm.controls.email.errors.required\" class=\"form-val-input\">\n                  Email is required.</mat-hint>\n                <mat-hint *ngIf=\"userForm.controls.email.touched &&\n                  userForm.controls.email.errors && userForm.controls.email.errors.pattern\" class=\"form-val-input\">\n                  This is not a valid email.</mat-hint>\n              </mat-form-field>\n            </div>\n            <div class=\"d-flex inner-field\">\n              <mat-form-field appearance=\"standard\">\n                <mat-label class=\"mobile-label\">My vehicle registration number</mat-label>\n                <input matInput type=\"text\" formControlName=\"car_registration_number\" />\n              </mat-form-field>\n              <mat-form-field appearance=\"standard\">\n                <mat-label>Car Park Number</mat-label>\n                <input matInput type=\"text\" formControlName=\"car_park_number\" />\n              </mat-form-field>\n            </div>\n            <div class=\"d-flex inner-field\">\n              <mat-form-field appearance=\"standard\" class=\"email-field\">\n                <mat-label>Secondary Email</mat-label>\n                <input matInput type=\"email\" name=\"email2\" formControlName=\"email2\">\n                <mat-hint *ngIf=\"userForm.controls.email2.touched &&\n                  userForm.controls.email2.errors && userForm.controls.email2.errors.required\" class=\"form-val-input\">\n                  Email is required.</mat-hint>\n                <mat-hint *ngIf=\"userForm.controls.email2.touched &&\n                  userForm.controls.email2.errors && userForm.controls.email2.errors.pattern\" class=\"form-val-input\">\n                  This is not a valid email.</mat-hint>\n              </mat-form-field>\n              <mat-form-field appearance=\"standard\" class=\"phone-field\">\n                <mat-label>Secondary Phone</mat-label>\n                <input matInput type=\"text\" mask=\"mask.phone2\" validate=\"false\" ng-change=\"editPhone('phone2')\"\n                  ng-keydown=\"dontPaste($event)\" id=\"phone2\" restrict=\"reject\" limit=\"false\" formControlName=\"phone2\" />\n                <mat-hint *ngIf=\"userForm.controls.phone2.touched && userForm.controls.phone2.errors\"\n                  class=\"form-val-input\">\n                  Please enter a correct phone.</mat-hint>\n              </mat-form-field>\n            </div>\n            <div class=\"d-flex inner-field\">\n              <mat-form-field appearance=\"standard\" class=\"email-field\">\n                <mat-label class=\"mobile-label\">Real Estate Email</mat-label>\n                <input matInput type=\"email\" name=\"agent_email\" formControlName=\"agent_email\">\n                <mat-hint *ngIf=\"userForm.controls.agent_email.touched && userForm.controls.agent_email.errors.pattern\"\n                  class=\"form-val-input\">\n                  This is not a valid email.</mat-hint>\n              </mat-form-field>\n              <mat-form-field appearance=\"standard\" class=\"phone-field\">\n                <mat-label>Real Estate Phone</mat-label>\n                <input matInput type=\"text\" mask=\"mask.agent_phone\" id=\"phone3\" formControlName=\"agent_phone\" />\n                <mat-hint *ngIf=\"userForm.controls.agent_phone.touched && userForm.controls.agent_phone.errors\"\n                  class=\"form-val-input\">\n                  Please enter a correct phone.</mat-hint>\n              </mat-form-field>\n            </div>\n            <div class=\"d-flex inner-field-full\">\n              <mat-form-field appearance=\"standard\">\n                <mat-label>Password</mat-label>\n                <input matInput name=\"password\" type=\"password\" formControlName=\"password\">\n                <mat-hint *ngIf=\"userForm.controls.password.touched &&\n                  userForm.controls.password.errors && userForm.controls.password.errors.required\"\n                  class=\"form-val-input\">\n                  Password is required.</mat-hint>\n                <mat-hint *ngIf=\"userForm.controls.password.touched &&\n                  userForm.controls.password.errors && userForm.controls.password.errors.minlength\"\n                  class=\"form-val-input\">\n                  Password can't be shorter than 6 characters.</mat-hint>\n              </mat-form-field>\n            </div>\n            <div class=\"d-flex inner-field-full\">\n              <mat-form-field appearance=\"standard\">\n                <mat-label>Confirm password</mat-label>\n                <input matInput name=\"confirmPassword\" type=\"password\" formControlName=\"confirmPassword\"\n                  pattern=\"{{ userForm.controls.password.value }}\">\n                <mat-hint *ngIf=\"userForm.controls.confirmPassword.touched && userForm.controls.confirmPassword.errors\"\n                  class=\"form-val-input\">\n                  The entered value does not match the value of the password field</mat-hint>\n              </mat-form-field>\n            </div>\n            <div class=\"upd-profile-book-wrap\">\n              <div class=\"upd-profile-book-info\" *ngIf=\"bookingData\">{{getFormattedDate(bookingData.date_from)}} -\n                {{getFormattedDate(bookingData.date_to)}} {{bookingData.building.name}} ({{bookingData.apartment.name}})\n              </div>\n              <div class=\"upd-profile-book-actions\">\n                <button mat-raised-button class=\"text-left\" aria-label=\"description\" *ngIf=\"bookingData\"\n                  (click)=\"changeApartment()\" [disabled]=\"loading\">\n                  <mat-icon class=\"material-icons\">exposure</mat-icon> Change Apartment\n                </button>\n                <button mat-raised-button class=\"text-left\" aria-label=\"description\"\n                  *ngIf=\"bookingData && bookingData.user_status!='Unselected'\" (click)=\"changeSubRole()\"\n                  [disabled]=\"loading\">\n                  <mat-icon class=\"material-icons\">account_circle</mat-icon> Change status\n                </button>\n                <button mat-raised-button class=\"text-left\" aria-label=\"description\"\n                  *ngIf=\"bookingData && bookingData.user_status=='Unselected'\" (click)=\"changeSubRole()\"\n                  [disabled]=\"loading\">\n                  <mat-icon class=\"material-icons mgr10\">account_circle</mat-icon> Choose your status\n                  <mat-icon title=\"Please сhoose your status for this apartment\"\n                    style=\"color: red;padding-bottom: 3px;padding-left: 13px;\" class=\"material-icons\" role=\"img\"\n                    aria-label=\"error\">error</mat-icon>\n                </button>\n              </div>\n            </div>\n          </div>\n          <button mat-raised-button class=\"res-action-button update-button\" [disabled]=\"false\" aria-label=\"update\"\n            (click)=\"save()\">\n            {{buttonText}}</button>\n          <button mat-raised-button class=\"res-action-button\" (click)=\"cancel()\">Back</button>\n        </div>\n        <div class=\"loading-bar\" *ngIf=\"pageLoading\">\n          <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n        </div>\n      </form>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 47052:
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/resident.page.html ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-router-outlet></ion-router-outlet>");

/***/ }),

/***/ 81973:
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/resident/sub-role/sub-role.page.html ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n          <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper sub-role-wrap\">\n      <div class=\"move-wrapper full-width\" *ngIf=\"!pageLoading\">\n        <div class=\"text-center\">\n          <div class=\"text-center\">{{ buildingName }}</div>\n          <h2 class=\"resident-header\">Change status</h2>\n        </div>\n        <div class=\"d-flex-col content-wrap\">\n          <div class=\"full-width radio-groups\" *ngIf=\"!(!out && next || !next && out || title == 'Book move in')\">\n            <mat-radio-group required [(ngModel)]=\"model.user_status\" \n              (change)=\"changeResidingStatus()\">\n              <span class=\"notify-send\">Change status: </span>\n              <mat-radio-button value=\"Resident\" class=\"md-primary\">Tenant</mat-radio-button>\n              <mat-radio-button value=\"Owner\" class=\"md-primary\"> Owner </mat-radio-button>\n            </mat-radio-group>\n            <mat-radio-group required [(ngModel)]=\"model.is_residing\"\n              *ngIf=\"!(model.user_status == 'Resident' || model.user_status == 'Unselected')\">\n              <mat-radio-button value=\"1\">Residing</mat-radio-button>\n              <mat-radio-button value=\"0\">Non-Residing</mat-radio-button>\n            </mat-radio-group>\n          </div>\n          <button mat-raised-button (click)=\"submit()\" [disabled]=\"loading || model.user_status == 'Unselected'\"\n            class=\"res-action-button\" style=\"width: 100%; margin-top: 20px;\"><span\n              >{{buttonText}}</span>\n            <mat-icon class=\"material-icons\">&#xE876;</mat-icon>\n          </button>\n        </div>\n\n        <div class=\"buttons-back autoheight\">\n          <button mat-raised-button (click)=\"back()\">\n            <mat-icon class=\"material-icons\">keyboard_arrow_left</mat-icon> Back\n          </button>\n        </div>\n      </div>\n      <div class=\"loading-bar\" *ngIf=\"pageLoading\">\n        <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n      </div>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_resident_resident_module_ts.js.map