(self["webpackChunkmimor_ionic"] = self["webpackChunkmimor_ionic"] || []).push([["src_app_agent_agent_module_ts"],{

/***/ 63041:
/*!*************************************************************************!*\
  !*** ./src/app/agent/agent-dashboard/agent-dashboard.page.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgentDashboardPage": () => (/* binding */ AgentDashboardPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_agent_dashboard_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./agent-dashboard.page.html */ 78127);
/* harmony import */ var _agent_dashboard_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agent-dashboard.page.scss */ 84370);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 54395);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 87519);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 43190);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 45435);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 88002);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../environments/environment */ 92340);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);
/* harmony import */ var _shared_constants_mock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constants/mock */ 1455);
/* harmony import */ var _shared_modals_contact_contact_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/modals/contact/contact.component */ 47703);

















let AgentDashboardPage = class AgentDashboardPage {
    constructor(http, apiService, router, route, rolesService, modalController, alert) {
        this.http = http;
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        this.rolesService = rolesService;
        this.modalController = modalController;
        this.alert = alert;
        this.mockModel = _shared_constants_mock__WEBPACK_IMPORTED_MODULE_8__.mockModel;
        this.buildAuto = new _angular_forms__WEBPACK_IMPORTED_MODULE_10__.FormControl();
        this.environment = _environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment;
        console.log('agent dashboard constructor');
    }
    ngOnInit() {
        this.filteredBuilds = this.buildAuto.valueChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.debounceTime)(200), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.switchMap)((value) => this._filter(value)));
    }
    _filter(value) {
        const filterValue = value.toLowerCase();
        return this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.buildingByName + filterValue).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.filter)((data) => !!data), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.map)((data) => {
            return data.models;
        }));
    }
    displayFn(build) {
        return build && (build === null || build === void 0 ? void 0 : build.name) && (build === null || build === void 0 ? void 0 : build.address)
            ? (build === null || build === void 0 ? void 0 : build.name) + ' - ' + (build === null || build === void 0 ? void 0 : build.address)
            : '';
    }
    selectBuild(value) {
        this.selectedBuild = value;
        this.building = this.selectedBuild;
        console.log(value);
    }
    showContactDetails() {
        this.apiService
            .get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.client.getContDetails + this.building.id)
            .subscribe((response) => {
            if (!response.status) {
                this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__.ERROR.internal);
                return false;
            }
            this.cont_det_switchers = {
                company: {},
                contact: {},
            };
            this.contDets = {};
            if (!response.info) {
                this.cont_det_switchers = response.switchers;
                this.contDets = response.cont_details;
            }
            this.showConfirmation();
        });
    }
    showConfirmation() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _shared_modals_contact_contact_component__WEBPACK_IMPORTED_MODULE_9__.ContactModal,
                cssClass: 'building-contacts-modal',
                componentProps: {
                    model: { building: this.selectedBuild },
                    cont_det_switchers: this.cont_det_switchers,
                    contDets: this.contDets,
                },
            });
            return yield modal.present();
        });
    }
    redirect(url) {
        if (url === 'profile') {
            this.router.navigateByUrl(`agent/${url}`);
        }
        else
            this.router.navigateByUrl(`agent/${url}/${this.building.id}`);
    }
};
AgentDashboardPage.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_17__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_4__.ApiService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_18__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_18__.ActivatedRoute },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_5__.RolesService },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.ModalController },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_3__.AlertService }
];
AgentDashboardPage = (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_20__.Component)({
        selector: 'app-agent-dashboard',
        template: _raw_loader_agent_dashboard_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_agent_dashboard_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AgentDashboardPage);



/***/ }),

/***/ 64433:
/*!***************************************************************************!*\
  !*** ./src/app/agent/agent-guidelines/agent-guidelines.page.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgentGuidelinesPage": () => (/* binding */ AgentGuidelinesPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_agent_guidelines_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./agent-guidelines.page.html */ 90087);
/* harmony import */ var _agent_guidelines_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agent-guidelines.page.scss */ 21215);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_navigation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/navigation.service */ 89565);
/* harmony import */ var _services_window_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/window.service */ 99004);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../environments/environment */ 92340);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);














let AgentGuidelinesPage = class AgentGuidelinesPage {
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
        this.environment = _environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment;
        console.log('agent guidelines constructor');
    }
    ngOnInit() {
        if (this.buildId) {
            this.getBuilding();
        }
        else
            this.router.navigateByUrl('resident/dashboard');
    }
    getBuilding() {
        this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_9__.API.agent.getBuilding + this.buildId)
            .subscribe((response) => {
            if (response.status) {
                console.log(response);
                this.model = response.building;
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
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
            this.router.navigateByUrl('agent/dashboard');
        }, () => {
            this.router.navigateByUrl('agent/dashboard');
        });
    }
    back() {
        this.navigation.back();
    }
    dashboard() {
        this.router.navigateByUrl('agent/dashboard');
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
        console.log(`${_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.baseUrl}${url1}`, value);
        this.windowRef.nativeWindow.open(`${_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.baseUrl}${url1}`);
    }
};
AgentGuidelinesPage.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute },
    { type: _services_navigation_service__WEBPACK_IMPORTED_MODULE_3__.NavigationService },
    { type: _services_window_service__WEBPACK_IMPORTED_MODULE_4__.WindowRefService },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_5__.RolesService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_7__.AlertService }
];
AgentGuidelinesPage = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
        selector: 'app-agent-guidelines',
        template: _raw_loader_agent_guidelines_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_agent_guidelines_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AgentGuidelinesPage);



/***/ }),

/***/ 94747:
/*!***************************************************************!*\
  !*** ./src/app/agent/agent-info/agent-info.page.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgentInfoPage": () => (/* binding */ AgentInfoPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_agent_info_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./agent-info.page.html */ 32740);
/* harmony import */ var _agent_info_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agent-info.page.scss */ 98466);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);









let AgentInfoPage = class AgentInfoPage {
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
        console.log('agent building information constructor');
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
            this.router.navigateByUrl('agent/dashboard');
        }, () => {
            this.loading = false;
            this.router.navigateByUrl('agent/dashboard');
        });
    }
    fromFileInfo() {
        // TO DO
    }
    back() {
        this.router.navigateByUrl('agent/dashboard');
    }
};
AgentInfoPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_4__.RolesService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__.ApiService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_2__.AlertService }
];
AgentInfoPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-agent-info',
        template: _raw_loader_agent_info_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_agent_info_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AgentInfoPage);



/***/ }),

/***/ 64494:
/*!*********************************************************************!*\
  !*** ./src/app/agent/agent-profile/agent-profile.page.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgentProfilePage": () => (/* binding */ AgentProfilePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_agent_profile_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./agent-profile.page.html */ 45749);
/* harmony import */ var _agent_profile_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agent-profile.page.scss */ 83960);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/roles.service */ 19883);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/buttons.constants */ 21614);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);












let AgentProfilePage = class AgentProfilePage {
    constructor(router, route, rolesService, apiService, alert) {
        this.router = router;
        this.route = route;
        this.rolesService = rolesService;
        this.apiService = apiService;
        this.alert = alert;
        this.userForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormGroup({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.minLength(1)]),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
            company: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.minLength(1)]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_8__.Validators.minLength(6)]),
        });
        this.buttonText = _shared_constants_buttons_constants__WEBPACK_IMPORTED_MODULE_6__.BUTTONS.save;
        this.pageLoading = true;
        console.log('resident profile constructor');
    }
    ngOnInit() {
        this.getProfile();
    }
    getProfile() {
        this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__.API.client.getProfile).subscribe((response) => {
            if (response.status === true) {
                this.user = response.user;
                console.log(this.user);
                this.userForm.patchValue(this.user);
                this.pageLoading = false;
                return;
            }
            this.alert.show(response.message || _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__.ERROR.internal);
        });
    }
    save() {
        let user = Object.assign(Object.assign({}, this.user), this.userForm.value);
        // if (this.saving) {
        //   return false;
        // }
        // this.saving = true;
        this.pageLoading = true;
        this.apiService.put(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_5__.API.client.saveProfile, user)
            .subscribe((response) => {
            if (response.status) {
                this.router.navigateByUrl('agent/dashboard');
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
    cancel() {
        this.router.navigateByUrl('agent/dashboard');
    }
};
AgentProfilePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.ActivatedRoute },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_4__.RolesService },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_3__.ApiService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_2__.AlertService }
];
AgentProfilePage = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
        selector: 'app-agent-profile',
        template: _raw_loader_agent_profile_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_agent_profile_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AgentProfilePage);



/***/ }),

/***/ 20849:
/*!***********************************************!*\
  !*** ./src/app/agent/agent-routing.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgentPageRoutingModule": () => (/* binding */ AgentPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _agent_dashboard_agent_dashboard_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./agent-dashboard/agent-dashboard.page.component */ 63041);
/* harmony import */ var _agent_guidelines_agent_guidelines_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agent-guidelines/agent-guidelines.page.component */ 64433);
/* harmony import */ var _agent_info_agent_info_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./agent-info/agent-info.page.component */ 94747);
/* harmony import */ var _agent_profile_agent_profile_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./agent-profile/agent-profile.page.component */ 64494);
/* harmony import */ var _agent_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./agent.page.component */ 56996);








const routes = [
    {
        path: '',
        component: _agent_page_component__WEBPACK_IMPORTED_MODULE_4__.AgentPage,
        children: [
            {
                path: 'dashboard',
                component: _agent_dashboard_agent_dashboard_page_component__WEBPACK_IMPORTED_MODULE_0__.AgentDashboardPage,
            },
            {
                path: 'guidelines/view/:buildId',
                component: _agent_guidelines_agent_guidelines_page_component__WEBPACK_IMPORTED_MODULE_1__.AgentGuidelinesPage,
            },
            {
                path: 'info/:buildId',
                component: _agent_info_agent_info_page_component__WEBPACK_IMPORTED_MODULE_2__.AgentInfoPage,
            },
            {
                path: 'profile',
                component: _agent_profile_agent_profile_page_component__WEBPACK_IMPORTED_MODULE_3__.AgentProfilePage,
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            }
        ]
    }
];
let AgentPageRoutingModule = class AgentPageRoutingModule {
};
AgentPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
    })
], AgentPageRoutingModule);



/***/ }),

/***/ 38522:
/*!***************************************!*\
  !*** ./src/app/agent/agent.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgentPageModule": () => (/* binding */ AgentPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var ng2_search_filter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ng2-search-filter */ 44981);
/* harmony import */ var _agent_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agent-routing.module */ 20849);
/* harmony import */ var _agent_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./agent.page.component */ 56996);
/* harmony import */ var _agent_dashboard_agent_dashboard_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./agent-dashboard/agent-dashboard.page.component */ 63041);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../material.module */ 63806);
/* harmony import */ var _agent_guidelines_agent_guidelines_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./agent-guidelines/agent-guidelines.page.component */ 64433);
/* harmony import */ var _shared_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/pipes/pipes.module */ 24586);
/* harmony import */ var _agent_info_agent_info_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./agent-info/agent-info.page.component */ 94747);
/* harmony import */ var _angular_google_maps__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/google-maps */ 99010);
/* harmony import */ var _agent_profile_agent_profile_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./agent-profile/agent-profile.page.component */ 64494);















let AgentPageModule = class AgentPageModule {
};
AgentPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_11__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonicModule,
            _agent_routing_module__WEBPACK_IMPORTED_MODULE_1__.AgentPageRoutingModule,
            _material_module__WEBPACK_IMPORTED_MODULE_4__.MaterialModule,
            _shared_pipes_pipes_module__WEBPACK_IMPORTED_MODULE_6__.PipesModule,
            ng2_search_filter__WEBPACK_IMPORTED_MODULE_0__.Ng2SearchPipeModule,
            _angular_google_maps__WEBPACK_IMPORTED_MODULE_14__.GoogleMapsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_12__.ReactiveFormsModule
        ],
        declarations: [
            _agent_page_component__WEBPACK_IMPORTED_MODULE_2__.AgentPage,
            _agent_dashboard_agent_dashboard_page_component__WEBPACK_IMPORTED_MODULE_3__.AgentDashboardPage,
            _agent_guidelines_agent_guidelines_page_component__WEBPACK_IMPORTED_MODULE_5__.AgentGuidelinesPage,
            _agent_info_agent_info_page_component__WEBPACK_IMPORTED_MODULE_7__.AgentInfoPage,
            _agent_profile_agent_profile_page_component__WEBPACK_IMPORTED_MODULE_8__.AgentProfilePage
        ]
    })
], AgentPageModule);



/***/ }),

/***/ 56996:
/*!***********************************************!*\
  !*** ./src/app/agent/agent.page.component.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AgentPage": () => (/* binding */ AgentPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_agent_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./agent.page.html */ 85239);
/* harmony import */ var _agent_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./agent.page.scss */ 88710);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/api.service */ 5830);







let AgentPage = class AgentPage {
    constructor(http, apiService, router) {
        this.http = http;
        this.apiService = apiService;
        this.router = router;
        console.log('agent constructor');
    }
    ngOnInit() {
    }
};
AgentPage.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router }
];
AgentPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-agent',
        template: _raw_loader_agent_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_agent_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AgentPage);



/***/ }),

/***/ 84370:
/*!*****************************************************************!*\
  !*** ./src/app/agent/agent-dashboard/agent-dashboard.page.scss ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".mim-re-dashboard {\n  font-family: Arial, Helvetica, sans-serif;\n  width: 640px;\n  height: 620px;\n}\n.mim-re-dashboard .manager-wrapper2 {\n  height: 100%;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.mim-re-dashboard .res-dash-button {\n  width: 100%;\n  color: #212121;\n  background-color: #fafafa;\n  text-align: left;\n  display: inline-flex;\n  position: relative;\n  cursor: pointer;\n  min-height: 36px;\n  min-width: 88px;\n  align-items: center;\n  line-height: 36px;\n  vertical-align: middle;\n  -webkit-box-align: center;\n  border-radius: 3px;\n  -webkit-user-select: none;\n          user-select: none;\n  border: 0;\n  padding: 0 6px;\n  margin: 6px 8px;\n  background: transparent;\n  text-transform: uppercase;\n  font-weight: 500;\n  font-size: 14px;\n  overflow: hidden;\n  transition: box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), background-color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mim-re-dashboard .res-dash-button:not([disabled]) {\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n}\n.mim-re-dashboard .res-dash-button .mat-icon {\n  margin-right: 5px;\n}\n.mim-re-dashboard .resident-header {\n  margin-top: 0;\n  margin-bottom: 20px;\n}\n.mim-re-dashboard a {\n  width: 100%;\n}\n.mim-re-dashboard .ag-dashboard-body {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 20px;\n}\n.mim-re-dashboard .ag-dashboard-body .building-block {\n  padding: 10px 20px;\n  width: 245px;\n}\n.mim-re-dashboard .ag-dashboard-body .building-block .dash-h3 {\n  font-size: 17px;\n  font-weight: 600;\n}\n.mim-re-dashboard .ag-dashboard-body .tenant-controls {\n  padding: 10px 10px;\n  border-left: 1px solid #eee;\n  min-width: 300px;\n  padding-top: 0;\n  width: 50%;\n}\n.mim-re-dashboard .res-select-container {\n  height: 48px;\n  line-height: 48px;\n  margin-top: 5px;\n  margin-bottom: 16px;\n  padding-left: 10px;\n  padding-right: 10px;\n  border-top: 1px solid rgba(63, 81, 181, 0.3);\n  border-left: 1px solid rgba(63, 81, 181, 0.3);\n  border-right: 1px solid rgba(63, 81, 181, 0.3);\n  border-bottom: 1px solid #3f51b5;\n}\n.mim-re-dashboard .res-action-button {\n  background-color: #006198;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW50LWRhc2hib2FyZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx5Q0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0FBQ0Y7QUFBRTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsOEJBQUE7QUFFSjtBQUFFO0VBQ0UsV0FBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7VUFBQSxpQkFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUVBLG9IQUFBO0FBRUo7QUFESTtFQUNFLDJDQUFBO0FBR047QUFESTtFQUNFLGlCQUFBO0FBR047QUFBRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtBQUVKO0FBQUU7RUFDRSxXQUFBO0FBRUo7QUFBRTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0FBRUo7QUFESTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtBQUdOO0FBRk07RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7QUFJUjtBQURJO0VBQ0Usa0JBQUE7RUFDQSwyQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLFVBQUE7QUFHTjtBQUFFO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLDRDQUFBO0VBQ0EsNkNBQUE7RUFDQSw4Q0FBQTtFQUNBLGdDQUFBO0FBRUo7QUFDRTtFQUNFLHlCQUFBO0FBQ0oiLCJmaWxlIjoiYWdlbnQtZGFzaGJvYXJkLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5taW0tcmUtZGFzaGJvYXJke1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgd2lkdGg6IDY0MHB4O1xuICBoZWlnaHQ6IDYyMHB4O1xuICAubWFuYWdlci13cmFwcGVyMntcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgfVxuICAucmVzLWRhc2gtYnV0dG9ue1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGNvbG9yOiByZ2IoMzMsMzMsMzMpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTAsMjUwLDI1MCk7XG4gICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIG1pbi1oZWlnaHQ6IDM2cHg7XG4gICAgbWluLXdpZHRoOiA4OHB4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgbGluZS1oZWlnaHQ6IDM2cHg7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAtd2Via2l0LWJveC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICBib3JkZXI6IDA7XG4gICAgcGFkZGluZzogMCA2cHg7XG4gICAgbWFyZ2luOiA2cHggOHB4O1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGJveC1zaGFkb3cgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpLGJhY2tncm91bmQtY29sb3IgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO1xuICAgIHRyYW5zaXRpb246IGJveC1zaGFkb3cgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpLGJhY2tncm91bmQtY29sb3IgLjRzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO1xuICAgICY6bm90KFtkaXNhYmxlZF0pIHtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDVweCAwIHJnYigwIDAgMCAvIDI2JSk7XG4gICAgfVxuICAgIC5tYXQtaWNvbntcbiAgICAgIG1hcmdpbi1yaWdodDogNXB4O1xuICAgIH1cbiAgfVxuICAucmVzaWRlbnQtaGVhZGVye1xuICAgIG1hcmdpbi10b3A6IDA7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuICBhe1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5hZy1kYXNoYm9hcmQtYm9keXtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIC5idWlsZGluZy1ibG9jayB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICB3aWR0aDogMjQ1cHg7XG4gICAgICAuZGFzaC1oM3tcbiAgICAgICAgZm9udC1zaXplOiAxN3B4O1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgfVxuICAgIH1cbiAgICAudGVuYW50LWNvbnRyb2xze1xuICAgICAgcGFkZGluZzogMTBweCAxMHB4O1xuICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZWVlO1xuICAgICAgbWluLXdpZHRoOiAzMDBweDtcbiAgICAgIHBhZGRpbmctdG9wOiAwO1xuICAgICAgd2lkdGg6IDUwJTtcbiAgICB9XG4gIH1cbiAgLnJlcy1zZWxlY3QtY29udGFpbmVye1xuICAgIGhlaWdodDogNDhweDtcbiAgICBsaW5lLWhlaWdodDogNDhweDtcbiAgICBtYXJnaW4tdG9wOiA1cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XG4gICAgcGFkZGluZy1yaWdodDogMTBweDtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSg2MywgODEsIDE4MSwgLjMpO1xuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgcmdiYSg2MywgODEsIDE4MSwgLjMpO1xuICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoNjMsIDgxLCAxODEsIC4zKTtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgcmdiYSg2MywgODEsIDE4MSwgMSk7XG4gIH1cbiAgXG4gIC5yZXMtYWN0aW9uLWJ1dHRvbntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCw5NywxNTIpXG4gIH1cbn1cbiJdfQ== */");

/***/ }),

/***/ 21215:
/*!*******************************************************************!*\
  !*** ./src/app/agent/agent-guidelines/agent-guidelines.page.scss ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".guidelines-wrapper {\n  min-height: 700px;\n  width: 640px;\n}\n.guidelines-wrapper .description-scroll {\n  min-height: 470px;\n  position: relative;\n  display: block;\n  -webkit-overflow-scrolling: touch;\n}\n.guidelines-wrapper .guidline-controls {\n  justify-content: flex-end;\n}\n.guidelines-wrapper .guidlines-text {\n  height: 82%;\n  max-height: 470px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  margin-bottom: 10px;\n  padding-right: 16px;\n  word-wrap: break-word;\n}\n.guidelines-wrapper .pdfFileGuid {\n  margin-bottom: 20px;\n}\n.guidelines-wrapper .res-action-button {\n  background-color: #006198;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW50LWd1aWRlbGluZXMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQUE7RUFDQSxZQUFBO0FBQ0Y7QUFDRTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsaUNBQUE7QUFDSjtBQUNFO0VBQ0UseUJBQUE7QUFDSjtBQUNFO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtBQUNKO0FBQ0U7RUFDRSxtQkFBQTtBQUNKO0FBQ0U7RUFDRSx5QkFBQTtBQUNKIiwiZmlsZSI6ImFnZW50LWd1aWRlbGluZXMucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmd1aWRlbGluZXMtd3JhcHBlciB7XG4gIG1pbi1oZWlnaHQ6IDcwMHB4O1xuICB3aWR0aDogNjQwcHg7XG5cbiAgLmRlc2NyaXB0aW9uLXNjcm9sbCB7XG4gICAgbWluLWhlaWdodDogNDcwcHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbiAgfVxuICAuZ3VpZGxpbmUtY29udHJvbHN7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgfVxuICAuZ3VpZGxpbmVzLXRleHR7XG4gICAgaGVpZ2h0OiA4MiU7XG4gICAgbWF4LWhlaWdodDogNDcwcHg7XG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xuICAgIG92ZXJmbG93LXk6IGF1dG87XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAxNnB4O1xuICAgIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgfVxuICAucGRmRmlsZUd1aWR7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuICAucmVzLWFjdGlvbi1idXR0b257XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsOTcsMTUyKTtcbiAgfVxufVxuIl19 */");

/***/ }),

/***/ 98466:
/*!*******************************************************!*\
  !*** ./src/app/agent/agent-info/agent-info.page.scss ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".building-information-tenant {\n  width: 640px;\n  min-height: 750px;\n  align-items: flex-start;\n}\n.building-information-tenant .print-info-btn-wrap {\n  right: 0;\n  top: 0;\n  position: absolute;\n  display: block;\n  width: 150px;\n}\n.building-information-tenant .mim-print-build-info-title {\n  position: relative;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.building-information-tenant .subheader {\n  margin-top: 0;\n}\n.building-information-tenant .build-i-wrapper {\n  border-top: 1px solid #eee;\n  margin-bottom: 20px;\n  padding: 16px;\n  padding-bottom: 0;\n  color: rgba(0, 0, 0, 0.87);\n  background-color: #fafafa;\n}\n.building-information-tenant .fix-height {\n  max-height: 440px;\n  border-top: 1px solid #eee;\n  margin-bottom: 20px;\n  overflow: scroll;\n}\n.building-information-tenant .description-block {\n  padding: 10px;\n  max-width: 100%;\n  margin-top: 25px;\n  position: relative;\n  overflow-wrap: break-word;\n  border: 1px solid #ccc;\n}\n.building-information-tenant .search-wrap {\n  display: flex;\n  flex-direction: row-reverse;\n  justify-content: space-between;\n}\n.building-information-tenant .search-wrap .button-fullsize {\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #006198;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  line-height: 40px;\n  min-width: 0;\n  width: 40px;\n  height: 40px;\n  vertical-align: middle;\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n  border-radius: 50%;\n  background-clip: padding-box;\n  overflow: hidden;\n  transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);\n  transition-property: background-color, box-shadow, transform;\n}\n.building-information-tenant .item-interactive.ion-valid {\n  --highlight-background: #3880ff;\n}\n.building-information-tenant .map-info {\n  border-top: 1px solid #eee;\n  padding: 8px;\n  margin-top: 20px;\n}\n.building-information-tenant .res-action-button {\n  background-color: #006198;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW50LWluZm8ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsdUJBQUE7QUFDRjtBQUFFO0VBQ0UsUUFBQTtFQUNBLE1BQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FBRUo7QUFBRTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0FBRUo7QUFBRTtFQUNFLGFBQUE7QUFFSjtBQUFFO0VBQ0UsMEJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLDBCQUFBO0VBQ0EseUJBQUE7QUFFSjtBQUNFO0VBQ0UsaUJBQUE7RUFDQSwwQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFDSjtBQUVFO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxzQkFBQTtBQUFKO0FBRUU7RUFDRSxhQUFBO0VBQ0EsMkJBQUE7RUFDQSw4QkFBQTtBQUFKO0FBQ0k7RUFDRSxnQ0FBQTtFQUNBLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0VBQ0EsMkNBQUE7RUFDQSxrQkFBQTtFQUNBLDRCQUFBO0VBQ0EsZ0JBQUE7RUFFQSxxREFBQTtFQUdBLDREQUFBO0FBRU47QUFFRTtFQUNFLCtCQUFBO0FBQUo7QUFFRTtFQUNFLDBCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0FBQUo7QUFFRTtFQUNFLHlCQUFBO0FBQUoiLCJmaWxlIjoiYWdlbnQtaW5mby5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYnVpbGRpbmctaW5mb3JtYXRpb24tdGVuYW50e1xuICB3aWR0aDogNjQwcHg7XG4gIG1pbi1oZWlnaHQ6IDc1MHB4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgLnByaW50LWluZm8tYnRuLXdyYXB7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICB3aWR0aDogMTUwcHg7XG4gIH1cbiAgLm1pbS1wcmludC1idWlsZC1pbmZvLXRpdGxle1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cbiAgLnN1YmhlYWRlcntcbiAgICBtYXJnaW4tdG9wOiAwO1xuICB9XG4gIC5idWlsZC1pLXdyYXBwZXJ7XG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlZWU7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICAgIHBhZGRpbmctYm90dG9tOiAwO1xuICAgIGNvbG9yOiByZ2JhKDAsMCwwLDAuODcpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTAsMjUwLDI1MCk7XG4gIH1cblxuICAuZml4LWhlaWdodHtcbiAgICBtYXgtaGVpZ2h0OiA0NDBweDtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2VlZTtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIG92ZXJmbG93OiBzY3JvbGw7XG4gIH1cblxuICAuZGVzY3JpcHRpb24tYmxvY2t7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luLXRvcDogMjVweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xuICB9XG4gIC5zZWFyY2gtd3JhcHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgLmJ1dHRvbi1mdWxsc2l6ZXtcbiAgICAgIGNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LDAuODcpO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsOTcsMTUyKTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICBsaW5lLWhlaWdodDogNDBweDtcbiAgICAgIG1pbi13aWR0aDogMDtcbiAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDVweCAwIHJnYigwIDAgMCAvIDI2JSk7XG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIC4zcyBjdWJpYy1iZXppZXIoLjU1LDAsLjU1LC4yKTtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAuM3MgY3ViaWMtYmV6aWVyKC41NSwwLC41NSwuMik7XG4gICAgICAtd2Via2l0LXRyYW5zaXRpb24tcHJvcGVydHk6IGJhY2tncm91bmQtY29sb3IsYm94LXNoYWRvdywtd2Via2l0LXRyYW5zZm9ybTtcbiAgICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IGJhY2tncm91bmQtY29sb3IsYm94LXNoYWRvdywtd2Via2l0LXRyYW5zZm9ybTtcbiAgICAgIHRyYW5zaXRpb24tcHJvcGVydHk6IGJhY2tncm91bmQtY29sb3IsYm94LXNoYWRvdyx0cmFuc2Zvcm07XG4gICAgICB0cmFuc2l0aW9uLXByb3BlcnR5OiBiYWNrZ3JvdW5kLWNvbG9yLGJveC1zaGFkb3csdHJhbnNmb3JtLC13ZWJraXQtdHJhbnNmb3JtO1xuICAgIH1cbiAgfVxuICAuaXRlbS1pbnRlcmFjdGl2ZS5pb24tdmFsaWQge1xuICAgIC0taGlnaGxpZ2h0LWJhY2tncm91bmQ6ICMzODgwZmY7XG4gIH1cbiAgLm1hcC1pbmZve1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZWVlO1xuICAgIHBhZGRpbmc6IDhweDtcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICB9XG4gIC5yZXMtYWN0aW9uLWJ1dHRvbntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCw5NywxNTIpO1xuICB9XG59XG4iXX0= */");

/***/ }),

/***/ 83960:
/*!*************************************************************!*\
  !*** ./src/app/agent/agent-profile/agent-profile.page.scss ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".resident-update-profile {\n  width: 640px;\n  min-height: 450px;\n}\n.resident-update-profile .inner-wrap, .resident-update-profile .inner-content, .resident-update-profile .inner-header {\n  width: 100%;\n}\n.resident-update-profile .inner-field {\n  width: 100%;\n}\n.resident-update-profile .inner-field :first-child {\n  margin-right: 5px;\n}\n.resident-update-profile .inner-field .mat-form-field {\n  width: 50%;\n}\n.resident-update-profile .inner-field-full {\n  width: 100%;\n}\n.resident-update-profile .inner-field-full .mat-form-field {\n  width: 100%;\n}\n.resident-update-profile .loading-bar {\n  display: flex;\n  justify-content: center;\n}\n.buttons-back {\n  max-width: none;\n  width: 100%;\n  justify-content: space-between;\n}\n.buttons-back .update-button {\n  color: white;\n  background-color: #006198;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFnZW50LXByb2ZpbGUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLGlCQUFBO0FBQ0Y7QUFBRTtFQUNFLFdBQUE7QUFFSjtBQUFFO0VBQ0UsV0FBQTtBQUVKO0FBREk7RUFDRSxpQkFBQTtBQUdOO0FBREk7RUFDRSxVQUFBO0FBR047QUFBRTtFQUNFLFdBQUE7QUFFSjtBQURJO0VBQ0UsV0FBQTtBQUdOO0FBQUU7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7QUFFSjtBQUNBO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSw4QkFBQTtBQUVGO0FBREU7RUFDRSxZQUFBO0VBQ0EseUJBQUE7QUFHSiIsImZpbGUiOiJhZ2VudC1wcm9maWxlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yZXNpZGVudC11cGRhdGUtcHJvZmlsZXtcbiAgd2lkdGg6IDY0MHB4OyBcbiAgbWluLWhlaWdodDogNDUwcHg7XG4gIC5pbm5lci13cmFwLCAuaW5uZXItY29udGVudCwgLmlubmVyLWhlYWRlcntcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAuaW5uZXItZmllbGR7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgOmZpcnN0LWNoaWxke1xuICAgICAgbWFyZ2luLXJpZ2h0OiA1cHg7XG4gICAgfVxuICAgIC5tYXQtZm9ybS1maWVsZHtcbiAgICAgIHdpZHRoOiA1MCU7XG4gICAgfVxuICB9XG4gIC5pbm5lci1maWVsZC1mdWxse1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIC5tYXQtZm9ybS1maWVsZHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgIH1cbiAgfVxuICAubG9hZGluZy1iYXJ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxufVxuLmJ1dHRvbnMtYmFja3tcbiAgbWF4LXdpZHRoOiBub25lO1xuICB3aWR0aDogMTAwJTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAudXBkYXRlLWJ1dHRvbntcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsOTcsMTUyKTtcbiAgfVxufVxuXG4iXX0= */");

/***/ }),

/***/ 88710:
/*!***************************************!*\
  !*** ./src/app/agent/agent.page.scss ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhZ2VudC5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ 78127:
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/agent/agent-dashboard/agent-dashboard.page.html ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n        <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\"\n        (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role?.name\">{{role?.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page\">\n    <div class=\"form-wrapper form-background frame-md3 h620 mim-re-dashboard\">\n      <div class=\"manager-wrapper2\" ng-hide=\"pageLoading\">\n        <div layout=\"column\" class=\"layout-column-sm text-center\">\n          <h2 class=\"text-center resident-header\">Select Building</h2>\n          <div class=\"\">\n            <p>Now search and select the building you would like to access information for:</p>\n            <mat-form-field class=\"autocomplete full-width\" appearance=\"standard\">\n              <input type=\"text\" matInput [formControl]=\"buildAuto\" [matAutocomplete]=\"auto\"\n                placeholder=\"Enter building name or street address\">\n              <mat-autocomplete #auto=\"matAutocomplete\" [displayWith]=\"displayFn\">\n                <mat-option *ngFor=\"let build of filteredBuilds | async\" (click)=\"selectBuild(build)\"\n                  [value]=\"build.name\">\n                  {{build.name + ' - ' + build.address }}\n                </mat-option>\n              </mat-autocomplete>\n            </mat-form-field>\n          </div>\n        </div>\n        <div class=\"mgt20 build-box\">\n          <div class=\"ag-dashboard-body\" *ngIf=\"building\">\n            <div class=\"building-block\">\n              <div class=\"building-block-header text-center\">\n                <h3 class=\"dash-h3\">{{building.name}}</h3>\n              </div>\n              <div class=\"building-block-img text-center\">\n                <img class=\"md-whiteframe-z2 building-photo\"\n                  src=\"{{environment.baseUrl}}/img/buildings/{{building.photo}}\" alt=\"photo\">\n              </div>\n            </div>\n            <div class=\"tenant-controls\">\n              <button mat-button *ngIf=\"(building.hide_build_cats != '1')|| isTrustedEmail\"\n                class=\"res-dash-button md-raised text-left\" aria-label=\"description\" (click)=\"redirect('info')\"\n                [disabled]=\"loading\">\n                <mat-icon class=\"material-icons mgr10\">&#xE0AF;</mat-icon> Building Information\n              </button>\n              <button mat-button *ngIf=\"(building.hide_guidelines != '1') || isTrustedEmail\"\n                class=\"res-dash-button md-raised text-left\" aria-label=\"description\"\n                (click)=\"redirect('guidelines/view')\" [disabled]=\"loading\">\n                <mat-icon class=\"material-icons mgr10\">&#xE0E0;</mat-icon> View Guidelines\n              </button>\n              <button mat-button class=\"res-dash-button md-raised text-left\" aria-label=\"description\"\n                (click)=\"showContactDetails()\" [disabled]=\"loading\">\n                <mat-icon class=\"material-icons mgr10\">&#xE61C;</mat-icon> Contact details\n              </button>\n            </div>\n          </div>\n        </div>\n        <div class=\"mgt20\">\n          <button mat-button class=\"res-action-button md-raised md-primary\" (click)=\"redirect('profile')\"\n            aria-label=\"description\">Update my\n            profile\n          </button>\n        </div>\n      </div>\n      <div class=\"loading-bar\" *ngIf=\"pageLoading\">\n        <ion-spinner color=\"primary\" class=\"spinner\"></ion-spinner>\n      </div>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 90087:
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/agent/agent-guidelines/agent-guidelines.page.html ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n          <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper guidelines-wrapper\" layout=\"column\" layout-wrap>\n      <div class=\"guidlines-wrapper full-width\" *ngIf=\"!pageLoading\">\n        <h2 class=\"resident-header text-center\">Moving In/Out Guidelines</h2>\n        <h3 class=\"subheader text-center\">{{ model.name }}</h3>\n        <form class=\"description-scroll guidelines-form flex1\"\n          style=\"border: 1px solid #eee;padding: 0 10px;margin-bottom: 15px\">\n          <div class=\"d-flex guidline-controls\">\n            <button class=\"pdfGuidDelete\" (click)=\"sendEmail()\" matTooltip=\"Send email\" matTooltipPosition=\"above\">\n              <mat-icon class=\"material-icons\">&#xE0BE;</mat-icon>\n            </button>\n            <button class=\"pdfGuidDelete\" (click)=\"printElem(model.guidlines)\" matTooltip=\"Print\" matTooltipPosition=\"above\">\n              <mat-icon class=\"material-icons\">&#xE8AD;</mat-icon>\n            </button>\n          </div>\n          <div class=\"guidlines-text\"\n            [innerHtml]=\"model.guidlines | emailToLink | urlToLink | phoneToLink\"></div>\n        </form>\n        <div class=\"scroll-guidlines-files\">\n          <div class=\"pdfFileGuid\" *ngFor=\"let file of guidelinesFilesTenant.blobUrlGuidelines | keyvalue\">\n            <button mat-button matTooltip=\"Download file\" class=\"pdfGuidDelete\" (click)=\"downloadFile(id, file.key)\">\n              <mat-icon class=\"material-icons\">file_download</mat-icon>\n            </button>\n            <button mat-button matTooltip=\"View file\" class=\"pdfGuidDelete\" target=\"_blank\"\n              (click)=\"viewFile(file.value)\">\n              <mat-icon class=\"material-icons\">&#xE89E;</mat-icon>\n            </button>\n            <a target=\"_blank\" (click)=\"viewFile(file.value)\">{{ file.key }}</a>\n          </div>\n        </div>\n        <button class=\"res-action-button\" routerLink=\"../information/view/{{ model.id }}\" *ngIf=\"fromPage\">\n          Next step\n          <mat-icon class=\"material-icons\">forward</mat-icon>\n        </button>\n        <button class=\"res-action-button\" (click)=\"dashboard()\" *ngIf=\"!fromPage\">Close\n          <mat-icon class=\"material-icons\">close</mat-icon>\n        </button>\n      </div>\n      <div layout=\"row\" class=\"loading-bar\" *ngIf=\"pageLoading\">\n        <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n      </div>\n    </div>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ 32740:
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/agent/agent-info/agent-info.page.html ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n          <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\" (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper building-information-tenant\">\n      <div class=\"info-wrapper full-width\" *ngIf=\"!loading\">\n        <div class=\"text-center full-width\">\n          <h2 class=\"resident-header mim-print-build-info-title\">Building Information <div class=\"print-info-btn-wrap\">\n              <button class=\"pdfGuidDelete mim-print-build-info-btn\" matTooltip=\"Print\" (click)=\"prepareInfoForPrint()\">\n                <mat-icon class=\"material-icons\">&#xE8AD;</mat-icon>\n              </button>\n              <button class=\"pdfGuidDelete mim-download-info\" matTooltip=\"Download\" (click)=\"downloadInfo()\">\n                <mat-icon class=\"material-icons\">cloud_download</mat-icon>\n              </button>\n            </div>\n          </h2>\n          <h3 *ngIf=\"building\" class=\"subheader text-center\">{{ building.name }}</h3>\n        </div>\n        <form name=\"form\"class=\"guidelines-form flex1 full-width\">\n          <mat-tab-group class=\"tabs-350 flex1\">\n            <mat-tab label=\"Building Information\" class=\"full-page\">\n              <div class=\"search-wrap\">\n                <button class=\"button-fullsize\" aria-label=\"Use Android\"\n                  (click)=\"showAdvanced($event)\">\n                  <mat-icon class=\"material-icons\">fullscreen</mat-icon>\n                </button>\n                <div class=\"search-info-categories\">\n                  <mat-form-field appearance=\"standard\">\n                    <mat-label>Search category</mat-label>\n                    <input matInput [(ngModel)]=\"searchFilter\" [ngModelOptions]=\"{standalone: true}\">\n                  </mat-form-field>\n                </div>\n              </div>\n              <div class=\"build-i-wrapper fix-height\">\n                <div class=\"description-block\" *ngFor=\"let k of building.categories | filter: searchFilter\">\n                  <h4 class=\"uppercase\">{{k.name}}</h4>\n                  <div *ngFor=\"let item of fromFileInfo(k.name) | keyvalue\">\n                    <button class=\"inform-cat-download-button md-accent btn-view-pdf-tenant\"\n                      href=\"/download_cat_pdf/{{building.id}}/{{ item.value }}\">\n                      <mat-icon class=\"material-icons\">file_download</mat-icon>\n                    </button>\n                    <button target=\"_blank\" class=\" md-accent btn-view-pdf-tenant\"\n                      href=\"/upload/pdf/{{building.id}}/{{ item.value }}\">\n                      <span style=\"text-transform: none !important;\">\n                        View {{ item.value }}\n                      </span>\n                      <mat-icon class=\"material-icons\">&#xE89E;</mat-icon>\n                    </button>\n                  </div>\n\n                  <div class=\"build-info-output\"\n                    [innerHtml]=\"k.description | emailToLink | urlToLink | phoneToLink\"></div>\n                  <div (click)=\"triggerBlockHeight($event)\" class=\"mim-see-more\">See more</div>\n                </div>\n              </div>\n            </mat-tab>\n            <mat-tab label=\"Map\" class=\"map\">\n              <div class=\"text-center\" *ngIf=\"building.contact_phone\">\n                {{building.address}}({{building.contact_phone}}\n              </div>\n              <div class=\"text-center\" *ngIf=\"!building.contact_phone\">\n              {{building.address}}</div>\n              <div class=\"map-info\">\n                <div id=\"map\">\n                  <google-map height=\"200\"></google-map>\n                </div>\n              </div>\n            </mat-tab>\n          </mat-tab-group>\n          <div *ngIf=\"!fromPage\" class=\"buttons-back\">\n            <button class=\"md-raised\" aria-label=\"description\" (click)=\"back()\">\n              <mat-icon class=\"material-icons\">keyboard_arrow_left</mat-icon> Back\n            </button>\n            <button class=\"md-raised md-primary\" routerLink=\"/#/noticeboard/view/{{building.id}}\">Next <mat-icon\n                class=\"material-icons\">forward</mat-icon>\n            </button>\n          </div>\n          <button mat-button class=\"res-action-button\" (click)=\"back()\" *ngIf=\"fromPage\">Close<mat-icon class=\"material-icons\">\n              close</mat-icon>\n          </button>\n        </form>\n      </div>\n      <div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\" class=\"loading-bar\"\n        *ngIf=\"loading || showLoading\">\n        <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n      </div>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ 45749:
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/agent/agent-profile/agent-profile.page.html ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n    <div class=\"switch-role\">\n      <button class=\"logout-btn\" aria-label=\"logoutbut\" (click)=\"rolesService.logout()\">\n        <span class=\"icon\"></span><span class=\"logout\">Log Out</span>\n      </button>\n      <select class=\"switch-role-select\" *ngIf=\"rolesService.getRoles().length > 1\"\n        (change)=\"rolesService.selectRole($event.target.value)\">\n        <option *ngFor=\"let role of rolesService.getRoles()\" [value]=\"role.name\">{{role.displayName}}</option>\n      </select>\n    </div>\n  </mat-toolbar>\n  <div class=\"flex-page resident-view\">\n    <div class=\"form-wrapper resident-update-profile\">\n      <form method=\"post\" name=\"form\" [formGroup]=\"userForm\" class=\"user-edit full-width\">\n        <div *ngIf=\"!pageLoading\" class=\"d-flex-col inner-wrap\">\n          <div class=\"text-center inner-header\">\n            <h2 class=\"resident-header\">Update personal profile</h2>\n          </div>\n          <div class=\"d-flex-col inner-content\">\n            <div class=\"d-flex inner-field-full\">\n              <mat-form-field appearance=\"standard\">\n                <mat-label>Name</mat-label>\n                <input matInput type=\"text\" placeholder=\"Name\" formControlName=\"name\" />\n              </mat-form-field>\n            </div>\n            <div class=\"d-flex inner-field-full\">\n              <mat-form-field appearance=\"standard\">\n                <mat-label>Company Name</mat-label>\n                <input matInput type=\"text\" id=\"company\" formControlName=\"company\" />\n                <mat-hint *ngIf=\"userForm.controls.company.touched && userForm.controls.company.errors\"\n                  class=\"form-val-input\">\n                  Please enter company name.</mat-hint>\n              </mat-form-field>\n            </div>\n            <div class=\"d-flex inner-field-full\">\n              <mat-form-field appearance=\"standard\">\n                <mat-label>Email</mat-label>\n                <input matInput type=\"email\" placeholder=\"Email\" name=\"email\" formControlName=\"email\">\n                <mat-hint *ngIf=\"userForm.controls.email.touched &&\n                  userForm.controls.email.errors && userForm.controls.email.errors.required\" class=\"form-val-input\">\n                  Email is required.</mat-hint>\n                <mat-hint *ngIf=\"userForm.controls.email.touched &&\n                  userForm.controls.email.errors && userForm.controls.email.errors.pattern\" class=\"form-val-input\">\n                  This is not a valid email.</mat-hint>\n              </mat-form-field>\n            </div>\n            <div class=\"d-flex inner-field-full\">\n              <mat-form-field appearance=\"standard\">\n                <mat-label>Password</mat-label>\n                <input matInput name=\"password\" type=\"password\" formControlName=\"password\">\n                <mat-hint *ngIf=\"userForm.controls.password.touched &&\n                  userForm.controls.password.errors && userForm.controls.password.errors.required\"\n                  class=\"form-val-input\">\n                  Password is required.</mat-hint>\n                <mat-hint *ngIf=\"userForm.controls.password.touched &&\n                  userForm.controls.password.errors && userForm.controls.password.errors.minlength\"\n                  class=\"form-val-input\">\n                  Password can't be shorter than 6 characters.</mat-hint>\n              </mat-form-field>\n            </div>\n          </div>\n          <div class=\"buttons-back\">\n            <button mat-raised-button class=\"back-btn\" (click)=\"cancel()\"><mat-icon class=\"material-icons\">keyboard_arrow_left</mat-icon>Back</button>\n            <button mat-raised-button class=\"update-button\" [disabled]=\"false\" aria-label=\"update\"\n              (click)=\"save()\">\n              {{buttonText}}<mat-icon class=\"material-icon\">send</mat-icon></button>\n          </div>\n        </div>\n        <div class=\"loading-bar\" *ngIf=\"pageLoading\">\n          <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n        </div>\n      </form>\n    </div>\n    <div *ngIf=\"!whitelabelMode\" class=\"mim-contact-link-wrap\">\n      <a class=\"mim-contact-link\" href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 85239:
/*!*****************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/agent/agent.page.html ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-router-outlet></ion-router-outlet>");

/***/ })

}]);
//# sourceMappingURL=src_app_agent_agent_module_ts.js.map