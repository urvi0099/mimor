(self["webpackChunkmimor_ionic"] = self["webpackChunkmimor_ionic"] || []).push([["main"],{

/***/ 98255:
/*!*******************************************************!*\
  !*** ./$_lazy_route_resources/ lazy namespace object ***!
  \*******************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 98255;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 90158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/guards/auth.guard */ 87618);




const routes = [
    {
        path: 'home',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_home_home_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./home/home.module */ 3467)).then(m => m.HomePageModule)
    },
    {
        path: 'resident',
        canActivate: [_shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_services_navigation_service_ts-src_app_shared_constants_api_constants_ts-src_-806fb0"), __webpack_require__.e("default-node_modules_ng2-search-filter___ivy_ngcc___ng2-search-filter_js-src_app_shared_const-932ed3"), __webpack_require__.e("default-node_modules_angular_google-maps___ivy_ngcc___fesm2015_google-maps_js-src_app_shared_-24b6e0"), __webpack_require__.e("src_app_resident_resident_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./resident/resident.module */ 17060)).then(m => m.ResidentPageModule)
    },
    {
        path: 'agent',
        canActivate: [_shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_services_navigation_service_ts-src_app_shared_constants_api_constants_ts-src_-806fb0"), __webpack_require__.e("default-node_modules_ng2-search-filter___ivy_ngcc___ng2-search-filter_js-src_app_shared_const-932ed3"), __webpack_require__.e("default-node_modules_angular_google-maps___ivy_ngcc___fesm2015_google-maps_js-src_app_shared_-24b6e0"), __webpack_require__.e("src_app_agent_agent_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./agent/agent.module */ 38522)).then(m => m.AgentPageModule)
    },
    {
        path: 'manager',
        canActivate: [_shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.AuthGuard],
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_services_navigation_service_ts-src_app_shared_constants_api_constants_ts-src_-806fb0"), __webpack_require__.e("default-node_modules_ng2-search-filter___ivy_ngcc___ng2-search-filter_js-src_app_shared_const-932ed3"), __webpack_require__.e("src_app_manager_manager_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./manager/manager.module */ 44886)).then(m => m.ManagerPageModule)
    },
    {
        path: 'auth',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_services_navigation_service_ts-src_app_shared_constants_api_constants_ts-src_-806fb0"), __webpack_require__.e("src_app_auth_auth_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./auth/auth.module */ 71674)).then(m => m.AuthPageModule)
    },
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_3__.PreloadAllModules })
        ],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
    })
], AppRoutingModule);



/***/ }),

/***/ 55041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./app.component.html */ 91106);
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.scss */ 43069);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);




let AppComponent = class AppComponent {
    constructor() { }
};
AppComponent.ctorParameters = () => [];
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-root',
        template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AppComponent);



/***/ }),

/***/ 36747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "options": () => (/* binding */ options),
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser */ 39075);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/platform-browser/animations */ 75835);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/core */ 5015);
/* harmony import */ var ngx_quill__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-quill */ 67185);
/* harmony import */ var angular2_signaturepad__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! angular2-signaturepad */ 51142);
/* harmony import */ var _agm_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @agm/core */ 15971);
/* harmony import */ var _angular_material_extensions_google_maps_autocomplete__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular-material-extensions/google-maps-autocomplete */ 72205);
/* harmony import */ var ngx_stripe__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-stripe */ 22974);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-mask */ 29417);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 55041);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 90158);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/api.service */ 5830);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./material.module */ 63806);
/* harmony import */ var _services_window_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/window.service */ 99004);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/roles.service */ 19883);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/alert.service */ 25970);
/* harmony import */ var _shared_interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shared/interceptors/jwt.interceptor */ 6966);
/* harmony import */ var _shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shared/guards/auth.guard */ 87618);























const options = null;
let AppModule = class AppModule {
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.NgModule)({
        declarations: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
        entryComponents: [],
        imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__.BrowserModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonicModule.forRoot({
                animated: false
            }),
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_13__.HttpClientModule,
            _material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule,
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_14__.BrowserAnimationsModule,
            _angular_material_core__WEBPACK_IMPORTED_MODULE_15__.MatNativeDateModule,
            ngx_quill__WEBPACK_IMPORTED_MODULE_16__.QuillModule.forRoot(),
            angular2_signaturepad__WEBPACK_IMPORTED_MODULE_17__.SignaturePadModule,
            _agm_core__WEBPACK_IMPORTED_MODULE_18__.AgmCoreModule.forRoot({
                apiKey: 'AIzaSyAH_AQG-V0nHEGhlImZLMFyLIk6Xq30htA',
                libraries: ['places']
            }),
            _angular_material_extensions_google_maps_autocomplete__WEBPACK_IMPORTED_MODULE_19__.MatGoogleMapsAutocompleteModule,
            ngx_stripe__WEBPACK_IMPORTED_MODULE_20__.NgxStripeModule.forRoot('pk_test_G1se5Kq01umPQA6iYBu2cs9r00MT78zezt'),
            ngx_mask__WEBPACK_IMPORTED_MODULE_21__.NgxMaskModule.forRoot(),
        ],
        providers: [{ provide: _angular_router__WEBPACK_IMPORTED_MODULE_22__.RouteReuseStrategy, useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonicRouteStrategy },
            { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_13__.HTTP_INTERCEPTORS, useClass: _shared_interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_7__.JwtInterceptor, multi: true },
            _services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService, _services_window_service__WEBPACK_IMPORTED_MODULE_4__.WindowRefService, _services_roles_service__WEBPACK_IMPORTED_MODULE_5__.RolesService, _services_alert_service__WEBPACK_IMPORTED_MODULE_6__.AlertService, _shared_guards_auth_guard__WEBPACK_IMPORTED_MODULE_8__.AuthGuard
        ],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent],
    })
], AppModule);



/***/ }),

/***/ 63806:
/*!************************************!*\
  !*** ./src/app/material.module.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaterialModule": () => (/* binding */ MaterialModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/input */ 83166);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 51095);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ 98295);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 76627);
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/checkbox */ 7539);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ 22238);
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/tooltip */ 11436);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/tabs */ 65939);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/select */ 67441);
/* harmony import */ var _angular_material_radio__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/radio */ 82613);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/toolbar */ 12522);
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/datepicker */ 43220);
/* harmony import */ var _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/autocomplete */ 21554);
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/button-toggle */ 42542);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/list */ 77746);

















let MaterialModule = class MaterialModule {
};
MaterialModule = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.NgModule)({
        exports: [
            _angular_material_input__WEBPACK_IMPORTED_MODULE_2__.MatInputModule,
            _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule,
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__.MatFormFieldModule,
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule,
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_6__.MatCheckboxModule,
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__.MatDialogModule,
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_8__.MatTooltipModule,
            _angular_material_tabs__WEBPACK_IMPORTED_MODULE_9__.MatTabsModule,
            _angular_material_select__WEBPACK_IMPORTED_MODULE_10__.MatSelectModule,
            _angular_material_radio__WEBPACK_IMPORTED_MODULE_11__.MatRadioModule,
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_12__.MatToolbarModule,
            _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_13__.MatDatepickerModule,
            _angular_material_autocomplete__WEBPACK_IMPORTED_MODULE_14__.MatAutocompleteModule,
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_15__.MatButtonToggleModule,
            _angular_material_list__WEBPACK_IMPORTED_MODULE_16__.MatListModule
        ]
    })
], MaterialModule);



/***/ }),

/***/ 25970:
/*!*******************************************!*\
  !*** ./src/app/services/alert.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlertService": () => (/* binding */ AlertService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _shared_modals_alert_alert_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/modals/alert/alert.component */ 48723);




let AlertService = class AlertService {
    constructor(modalController) {
        this.modalController = modalController;
    }
    show(message, title) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: _shared_modals_alert_alert_component__WEBPACK_IMPORTED_MODULE_0__.AlertModal,
                cssClass: 'alert-modal',
                componentProps: {
                    'message': message,
                    'title': title || 'Oops'
                }
            });
            return yield modal.present();
        });
    }
};
AlertService.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.ModalController }
];
AlertService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)()
], AlertService);



/***/ }),

/***/ 5830:
/*!*****************************************!*\
  !*** ./src/app/services/api.service.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApiService": () => (/* binding */ ApiService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 92340);




let ApiService = class ApiService {
    constructor(http) {
        this.http = http;
    }
    get(query) {
        let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders();
        headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        headers.append('Access-Control-Allow-Credentials', 'true');
        // return this.http.get(environment.baseUrl + query, { headers, withCredentials: true })
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + query, { headers });
    }
    getText(query) {
        let HTTPOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                'Access-Control-Allow-Credentials': 'true'
            }),
            responseType: 'text'
        };
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + query, HTTPOptions);
    }
    getFile(query) {
        let HTTPOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                'Access-Control-Allow-Credentials': 'true'
            }),
            responseType: 'blob'
        };
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + query, HTTPOptions);
    }
    postText(query) {
        let HTTPOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                'Access-Control-Allow-Credentials': 'true'
            }),
            responseType: 'text'
        };
        return this.http.get(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + query, HTTPOptions);
    }
    post(query, payload) {
        let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        headers.append('Access-Control-Allow-Credentials', 'true');
        // return this.http.post(environment.baseUrl + query, payload, { headers, withCredentials: true })
        return this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + query, payload, { headers });
    }
    put(query, payload) {
        let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        headers.append('Access-Control-Allow-Credentials', 'true');
        // return this.http.put(environment.baseUrl + query, payload, { headers, withCredentials: true })
        return this.http.put(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + query, payload, { headers });
    }
    delete(query) {
        let headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpHeaders();
        headers.append('Content-Type', 'application/json');
        headers.append('accept', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        headers.append('Access-Control-Allow-Credentials', 'true');
        // return this.http.put(environment.baseUrl + query, payload, { headers, withCredentials: true })
        return this.http.delete(_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.baseUrl + query, { headers });
    }
};
ApiService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient }
];
ApiService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)()
], ApiService);



/***/ }),

/***/ 19883:
/*!*******************************************!*\
  !*** ./src/app/services/roles.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RolesService": () => (/* binding */ RolesService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 26215);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 5830);
/* harmony import */ var _window_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./window.service */ 99004);






let RolesService = class RolesService {
    constructor(router, apiService, windowRef) {
        this.router = router;
        this.apiService = apiService;
        this.windowRef = windowRef;
        this.roles = this.windowRef.nativeWindow.localStorage.getItem('roles')
            ? JSON.parse(this.windowRef.nativeWindow.localStorage.getItem('roles')).map((el) => {
                el.displayName =
                    el.display_name === 'Tenant' ? 'Resident' : el.display_name;
                el.name = el.name === 'client' ? 'resident' : el.name;
                return el;
            })
            : [];
        this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(this.windowRef.nativeWindow.localStorage.getItem('user_role'));
        this.currentUser = this.currentUserSubject.asObservable();
        this.tokenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(this.windowRef.nativeWindow.localStorage.getItem('jwt'));
        this.token = this.currentUserSubject.asObservable();
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    get tokenValue() {
        return this.tokenSubject.value;
    }
    setRoles() {
        this.currentUserSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(this.windowRef.nativeWindow.localStorage.getItem('user_role'));
        this.tokenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(this.windowRef.nativeWindow.localStorage.getItem('jwt'));
        this.roles = this.windowRef.nativeWindow.localStorage.getItem('roles')
            ? JSON.parse(this.windowRef.nativeWindow.localStorage.getItem('roles')).map((el) => {
                return Object.assign(Object.assign({}, el), { displayName: el.display_name === 'Tenant' ? 'Resident' : el.display_name, name: el.name === 'client' ? 'resident' : el.name });
            })
            : [];
    }
    getRoles() {
        this.roles = this.windowRef.nativeWindow.localStorage.getItem('roles')
            ? JSON.parse(this.windowRef.nativeWindow.localStorage.getItem('roles')).map((el) => {
                el.displayName =
                    el.display_name === 'Tenant' ? 'Resident' : el.display_name;
                el.name = el.name === 'client' ? 'resident' : el.name;
                return el;
            })
            : [];
        if (this.roles.length > 1) {
            this.role =
                this.windowRef.nativeWindow.localStorage.getItem('user_role') ||
                    this.router.url.split('/')[1] ||
                    this.roles[0].name;
            let role = this.roles.find((el) => (el === null || el === void 0 ? void 0 : el.name) === (this === null || this === void 0 ? void 0 : this.role));
            let roleIndex = this.roles.findIndex((el) => (el === null || el === void 0 ? void 0 : el.name) === (this === null || this === void 0 ? void 0 : this.role));
            this.roles.splice(roleIndex, 1);
            this.roles.unshift(role);
        }
        return this.roles;
    }
    getRole() {
        return (this.role =
            this.windowRef.nativeWindow.localStorage.getItem('user_role'));
    }
    selectRole(role) {
        this.windowRef.nativeWindow.localStorage.setItem('user_role', role);
        this.router.navigateByUrl(`${role}`);
    }
    logout() {
        this.windowRef.nativeWindow.localStorage.removeItem('user_role');
        this.windowRef.nativeWindow.localStorage.removeItem('jwt');
        this.windowRef.nativeWindow.localStorage.removeItem('roles');
        console.log(this.currentUserValue);
        setTimeout(() => this.router.navigateByUrl('/auth/login'), 500);
    }
};
RolesService.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router },
    { type: _api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService },
    { type: _window_service__WEBPACK_IMPORTED_MODULE_1__.WindowRefService }
];
RolesService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({ providedIn: 'root' })
], RolesService);



/***/ }),

/***/ 99004:
/*!********************************************!*\
  !*** ./src/app/services/window.service.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WindowRefService": () => (/* binding */ WindowRefService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 37716);


function getWindow() {
    return window;
}
let WindowRefService = class WindowRefService {
    get nativeWindow() {
        return getWindow();
    }
};
WindowRefService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable)()
], WindowRefService);



/***/ }),

/***/ 87618:
/*!*********************************************!*\
  !*** ./src/app/shared/guards/auth.guard.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthGuard": () => (/* binding */ AuthGuard)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/roles.service */ 19883);




let AuthGuard = class AuthGuard {
    constructor(router, rolesService) {
        this.router = router;
        this.rolesService = rolesService;
    }
    canActivate(route) {
        // const currentUser = this.rolesService.currentUserValue;
        const currentUser = this.rolesService.getRole();
        console.log(currentUser);
        if (currentUser) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigateByUrl('/auth/login');
        return false;
    }
};
AuthGuard.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__.Router },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_0__.RolesService }
];
AuthGuard = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({ providedIn: 'root' })
], AuthGuard);



/***/ }),

/***/ 6966:
/*!********************************************************!*\
  !*** ./src/app/shared/interceptors/jwt.interceptor.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "JwtInterceptor": () => (/* binding */ JwtInterceptor)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/roles.service */ 19883);



let JwtInterceptor = class JwtInterceptor {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    intercept(request, next) {
        let token = this.rolesService.tokenValue;
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request);
    }
};
JwtInterceptor.ctorParameters = () => [
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_0__.RolesService }
];
JwtInterceptor = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()
], JwtInterceptor);



/***/ }),

/***/ 48723:
/*!********************************************************!*\
  !*** ./src/app/shared/modals/alert/alert.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlertModal": () => (/* binding */ AlertModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_alert_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./alert.html */ 38658);
/* harmony import */ var _alert_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alert.scss */ 13312);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 80476);







let AlertModal = class AlertModal {
    constructor(http, router, route, modalController) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.modalController = modalController;
        console.log('alert constructor');
    }
    ngOnInit() {
    }
    dismiss() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }
};
AlertModal.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController }
];
AlertModal.propDecorators = {
    message: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }],
    title: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Input }]
};
AlertModal = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
        selector: 'app-alert',
        template: _raw_loader_alert_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_alert_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AlertModal);



/***/ }),

/***/ 92340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    // baseUrl: 'http://127.0.0.1:3000',
    baseUrl: 'https://prelive.mimor.com.au'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 24608);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 36747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 92340);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_3__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule)
    .catch(err => console.log(err));


/***/ }),

/***/ 50863:
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-action-sheet.entry.js": [
		47321,
		"common",
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		36108,
		"common",
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		31489,
		"common",
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		10305,
		"common",
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		15830,
		"common",
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		37757,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-button_2.entry.js": [
		30392,
		"common",
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		66911,
		"common",
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		30937,
		"common",
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		78695,
		"common",
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		16034,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		68837,
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		34195,
		"common",
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		41709,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		33087,
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input.entry.js": [
		84513,
		"common",
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		58056,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		10862,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		7509,
		"common",
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		76272,
		"common",
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		71855,
		"common",
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		38708,
		"common",
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-popover.entry.js": [
		23527,
		"common",
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		24694,
		"common",
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		19222,
		"common",
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		25277,
		"common",
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		39921,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		83122,
		"common",
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		51602,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		45174,
		"common",
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		7895,
		"common",
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment_2.entry.js": [
		76164,
		"common",
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select_3.entry.js": [
		20592,
		"common",
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-slide_2.entry.js": [
		27162,
		"node_modules_ionic_core_dist_esm_ion-slide_2_entry_js"
	],
	"./ion-spinner.entry.js": [
		81374,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		97896,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		2893,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		77802,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		29072,
		"common",
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		32191,
		"common",
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		40801,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		67110,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	],
	"./ion-virtual-scroll.entry.js": [
		10431,
		"node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 50863;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 43069:
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ 13312:
/*!************************************************!*\
  !*** ./src/app/shared/modals/alert/alert.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".mat-dialog-content {\n  font-family: \"Montserrat\";\n  text-align: center;\n  flex-basis: 27%;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n  padding: 24px;\n}\n.mat-dialog-content .mat-title {\n  font-family: \"Montserrat\";\n  text-transform: none;\n  font-size: 1.5rem;\n  font-weight: normal;\n  letter-spacing: 0.005em;\n}\n.mat-dialog-actions {\n  font-family: \"Montserrat\";\n  display: flex;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n.mat-dialog-actions .res-btn {\n  max-width: 250px;\n  min-width: 130px;\n  height: 50px;\n  border-radius: 0px;\n  margin: 0px;\n  transition: 0.2s all;\n  background-color: #f26204;\n  border: 1px solid transparent;\n  color: white;\n  text-transform: uppercase;\n  font-weight: 600;\n}\n.mat-dialog-actions .res-btn:hover {\n  background-color: #4f75b4;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFsZXJ0LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsYUFBQTtBQUNGO0FBQUU7RUFDRSx5QkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBRUo7QUFFQTtFQUNFLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFDRjtBQUFFO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUNBLHlCQUFBO0VBQ0EsNkJBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtBQUVKO0FBREk7RUFDRSx5QkFBQTtBQUdOIiwiZmlsZSI6ImFsZXJ0LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubWF0LWRpYWxvZy1jb250ZW50IHtcbiAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0JztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmbGV4LWJhc2lzOiAyNyU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIC5tYXQtdGl0bGV7XG4gICAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0JztcbiAgICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIGxldHRlci1zcGFjaW5nOiAuMDA1ZW07XG4gIH1cbn1cblxuLm1hdC1kaWFsb2ctYWN0aW9ucyB7XG4gIGZvbnQtZmFtaWx5OiAnTW9udHNlcnJhdCc7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAucmVzLWJ0biB7XG4gICAgbWF4LXdpZHRoOiAyNTBweDtcbiAgICBtaW4td2lkdGg6IDEzMHB4O1xuICAgIGhlaWdodDogNTBweDtcbiAgICBib3JkZXItcmFkaXVzOiAwcHg7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgdHJhbnNpdGlvbjogMC4ycyBhbGw7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YyNjIwNDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgICY6aG92ZXJ7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGY3NWI0O1xuICAgIH1cbiAgfVxufVxuIl19 */");

/***/ }),

/***/ 91106:
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-app>\n  <ion-router-outlet></ion-router-outlet>\n</ion-app>\n");

/***/ }),

/***/ 38658:
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/modals/alert/alert.html ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<mat-dialog-content class=\"mat-dialog-content\">\n  <h2 class=\"mat-title ng-binding\">{{title}}</h2>\n  <p class=\"mat-message\">\n    {{message}}\n  </p>\n</mat-dialog-content>\n<mat-dialog-actions class=\"mat-dialog-actions\">\n  <button mat-button (click)=\"dismiss()\" class=\"res-btn\">\n    Close\n  </button>\n</mat-dialog-actions>\n");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map