(self["webpackChunkmimor_ionic"] = self["webpackChunkmimor_ionic"] || []).push([["src_app_auth_auth_module_ts"],{

/***/ 95467:
/*!************************************************************!*\
  !*** ./src/app/auth/auth-menu/auth-menu.page.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthMenuPage": () => (/* binding */ AuthMenuPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_auth_menu_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./auth-menu.page.html */ 78368);
/* harmony import */ var _auth_menu_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth-menu.page.scss */ 4563);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/roles.service */ 19883);








let AuthMenuPage = class AuthMenuPage {
    constructor(http, apiService, router, route, rolesService) {
        this.http = http;
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        this.rolesService = rolesService;
        console.log('auth menu constructor');
        if (this.rolesService.currentUserValue) {
            this.router.navigateByUrl(`/${this.rolesService.currentUserValue}/dashboard`);
        }
    }
    ngOnInit() {
    }
    redirect(redirect) {
        console.log(this.router, redirect);
        console.log(`auth/login-${redirect}`);
        this.router.navigate(['auth', `login-${redirect}`]);
    }
};
AuthMenuPage.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_3__.RolesService }
];
AuthMenuPage = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-auth-menu',
        template: _raw_loader_auth_menu_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_auth_menu_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AuthMenuPage);



/***/ }),

/***/ 71674:
/*!*************************************!*\
  !*** ./src/app/auth/auth.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthPageModule": () => (/* binding */ AuthPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var ngx_captcha__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-captcha */ 24140);
/* harmony import */ var _auth_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.page.component */ 43122);
/* harmony import */ var _auth_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.routing.module */ 81090);
/* harmony import */ var _login_login_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.page.component */ 37225);
/* harmony import */ var _material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../material.module */ 63806);
/* harmony import */ var _register_register_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./register/register.page.component */ 85843);
/* harmony import */ var _forgot_forgot_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./forgot/forgot.page.component */ 98027);
/* harmony import */ var _shared_modals_terms_terms_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/modals/terms/terms.component */ 12948);
/* harmony import */ var _shared_modals_privacy_privacy_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/modals/privacy/privacy.component */ 50938);
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-mask */ 29417);















let AuthPageModule = class AuthPageModule {
};
AuthPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__.ReactiveFormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonicModule,
            _auth_routing_module__WEBPACK_IMPORTED_MODULE_1__.AuthPageRoutingModule,
            _material_module__WEBPACK_IMPORTED_MODULE_3__.MaterialModule,
            ngx_captcha__WEBPACK_IMPORTED_MODULE_13__.NgxCaptchaModule,
            ngx_mask__WEBPACK_IMPORTED_MODULE_14__.NgxMaskModule.forChild()
        ],
        declarations: [
            _auth_page_component__WEBPACK_IMPORTED_MODULE_0__.AuthPage,
            _login_login_page_component__WEBPACK_IMPORTED_MODULE_2__.LoginPage,
            _register_register_page_component__WEBPACK_IMPORTED_MODULE_4__.RegisterPage,
            _forgot_forgot_page_component__WEBPACK_IMPORTED_MODULE_5__.ForgotPage,
            _shared_modals_terms_terms_component__WEBPACK_IMPORTED_MODULE_6__.TermsModal,
            _shared_modals_privacy_privacy_component__WEBPACK_IMPORTED_MODULE_7__.PrivacyModal
        ]
    })
], AuthPageModule);



/***/ }),

/***/ 43122:
/*!*********************************************!*\
  !*** ./src/app/auth/auth.page.component.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthPage": () => (/* binding */ AuthPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_auth_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./auth.page.html */ 21643);
/* harmony import */ var _auth_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.page.scss */ 90957);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/api.service */ 5830);







let AuthPage = class AuthPage {
    constructor(http, apiService, router, route) {
        this.http = http;
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        console.log('auth constructor');
    }
    ngOnInit() {
    }
};
AuthPage.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.ActivatedRoute }
];
AuthPage = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-agent',
        template: _raw_loader_auth_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_auth_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], AuthPage);



/***/ }),

/***/ 81090:
/*!*********************************************!*\
  !*** ./src/app/auth/auth.routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AuthPageRoutingModule": () => (/* binding */ AuthPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _auth_menu_auth_menu_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth-menu/auth-menu.page.component */ 95467);
/* harmony import */ var _auth_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.page.component */ 43122);
/* harmony import */ var _forgot_forgot_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./forgot/forgot.page.component */ 98027);
/* harmony import */ var _login_login_page_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login/login.page.component */ 37225);
/* harmony import */ var _register_register_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./register/register.page.component */ 85843);








const routes = [
    {
        path: '',
        component: _auth_page_component__WEBPACK_IMPORTED_MODULE_1__.AuthPage,
        children: [
            {
                path: 'login',
                component: _auth_menu_auth_menu_page_component__WEBPACK_IMPORTED_MODULE_0__.AuthMenuPage,
            },
            {
                path: 'login-manager',
                component: _login_login_page_component__WEBPACK_IMPORTED_MODULE_3__.LoginPage,
            },
            {
                path: 'login-agent',
                component: _login_login_page_component__WEBPACK_IMPORTED_MODULE_3__.LoginPage,
            },
            {
                path: 'login-resident',
                component: _login_login_page_component__WEBPACK_IMPORTED_MODULE_3__.LoginPage,
            },
            {
                path: 'register-manager',
                component: _register_register_page_component__WEBPACK_IMPORTED_MODULE_4__.RegisterPage,
            },
            {
                path: 'register-agent',
                component: _register_register_page_component__WEBPACK_IMPORTED_MODULE_4__.RegisterPage,
            },
            {
                path: 'register-resident',
                component: _register_register_page_component__WEBPACK_IMPORTED_MODULE_4__.RegisterPage,
            },
            {
                path: 'forgot',
                component: _forgot_forgot_page_component__WEBPACK_IMPORTED_MODULE_2__.ForgotPage,
            },
            {
                path: '**',
                redirectTo: 'login',
            }
        ]
    }
];
let AuthPageRoutingModule = class AuthPageRoutingModule {
};
AuthPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule]
    })
], AuthPageRoutingModule);



/***/ }),

/***/ 98027:
/*!******************************************************!*\
  !*** ./src/app/auth/forgot/forgot.page.component.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ForgotPage": () => (/* binding */ ForgotPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_forgot_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./forgot.page.html */ 35656);
/* harmony import */ var _forgot_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./forgot.page.scss */ 55203);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_navigation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/navigation.service */ 89565);









let ForgotPage = class ForgotPage {
    constructor(http, apiService, router, route, navigation) {
        this.http = http;
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        this.navigation = navigation;
        this.forgotForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroup({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
        });
        this.forgotSent = false;
        console.log('forgot constructor');
    }
    ngOnInit() {
    }
    back() {
        this.navigation.back();
    }
    forgot() {
        console.log('Test recovery');
        this.forgotSent = true;
    }
};
ForgotPage.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute },
    { type: _services_navigation_service__WEBPACK_IMPORTED_MODULE_3__.NavigationService }
];
ForgotPage = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-forgot',
        template: _raw_loader_forgot_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_forgot_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], ForgotPage);



/***/ }),

/***/ 37225:
/*!****************************************************!*\
  !*** ./src/app/auth/login/login.page.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginPage": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./login.page.html */ 48182);
/* harmony import */ var _login_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.page.scss */ 11894);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_navigation_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/navigation.service */ 89565);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _services_window_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/window.service */ 99004);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);
/* harmony import */ var _services_roles_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../services/roles.service */ 19883);














let LoginPage = class LoginPage {
    constructor(http, apiService, router, route, navigation, windowRef, alert, rolesService) {
        this.http = http;
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        this.navigation = navigation;
        this.windowRef = windowRef;
        this.alert = alert;
        this.rolesService = rolesService;
        this.loginForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroup({
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.minLength(6)]),
        });
        this.pageLoading = false;
        this.isCustomBuildingSession = false;
        this.loading = true;
        console.log('login constructor');
    }
    ngOnInit() {
        this.role = this.router.url.split('/')[2].split('-')[1];
        console.log(this.role);
        this.getCustomBuildingSession();
    }
    getCustomBuildingSession() {
        this.apiService.get(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_4__.API.guest.isCustomBuildingSession)
            .subscribe((response) => {
            console.log(response);
            if (!response.status) {
                this.loading = false;
                return false;
            }
            this.customBuildingSession = response.data.session_data;
            this.customBuilding = this.customBuildingSession.building_data;
            this.isCustomBuildingSession = true;
            this.loading = false;
            // this.setNewTenant();
        });
    }
    back() {
        this.navigation.back();
    }
    register() {
        this.router.navigateByUrl(`auth/register-${this.role}`);
    }
    login() {
        if (this.pageLoading) {
            return false;
        }
        this.pageLoading = true;
        this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_4__.API.guest.login, this.loginForm.value)
            .subscribe((response) => {
            console.log(response);
            if (response.status) {
                this.windowRef.nativeWindow.localStorage.setItem('user_role', this.role);
                this.windowRef.nativeWindow.localStorage.setItem('jwt', response.token);
                this.windowRef.nativeWindow.localStorage.setItem('roles', JSON.stringify(response.roles));
                this.rolesService.setRoles();
                setTimeout(() => {
                    this.pageLoading = false;
                    this.router.navigateByUrl(`${this.role}`), 3000;
                });
            }
            else {
                this.alert.show(response.message);
                this.pageLoading = false;
            }
        }, () => {
            this.alert.show(_shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_7__.ERROR.internal);
            this.pageLoading = false;
        });
    }
    forgot() {
        this.router.navigateByUrl(`auth/forgot`);
    }
};
LoginPage.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_10__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__.ApiService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute },
    { type: _services_navigation_service__WEBPACK_IMPORTED_MODULE_3__.NavigationService },
    { type: _services_window_service__WEBPACK_IMPORTED_MODULE_5__.WindowRefService },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_6__.AlertService },
    { type: _services_roles_service__WEBPACK_IMPORTED_MODULE_8__.RolesService }
];
LoginPage = (0,tslib__WEBPACK_IMPORTED_MODULE_12__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
        selector: 'app-login',
        template: _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_login_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], LoginPage);



/***/ }),

/***/ 85843:
/*!**********************************************************!*\
  !*** ./src/app/auth/register/register.page.component.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterPage": () => (/* binding */ RegisterPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_register_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./register.page.html */ 4176);
/* harmony import */ var _register_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./register.page.scss */ 84169);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/dialog */ 22238);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _shared_modals_terms_terms_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/modals/terms/terms.component */ 12948);
/* harmony import */ var _shared_modals_privacy_privacy_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/modals/privacy/privacy.component */ 50938);
/* harmony import */ var _services_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/api.service */ 5830);
/* harmony import */ var _services_navigation_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/navigation.service */ 89565);
/* harmony import */ var _shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/constants/api.constants */ 73121);
/* harmony import */ var _services_alert_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/alert.service */ 25970);
/* harmony import */ var _shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/constants/errors.constants */ 65243);
















let RegisterPage = class RegisterPage {
    constructor(http, apiService, router, route, navigation, dialog, modalController, alert) {
        this.http = http;
        this.apiService = apiService;
        this.router = router;
        this.route = route;
        this.navigation = navigation;
        this.dialog = dialog;
        this.modalController = modalController;
        this.alert = alert;
        this.role = '';
        this.isCodeGenerated = false;
        this.pageLoading = false;
        this.siteKey = '6LdPZK8UAAAAAPZtJ0EL36Oau1iJS1dG2pMTlYIW';
        this.registerForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroup({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
            password: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.minLength(6)]),
            confirm: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.minLength(6)]),
            phone: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.minLength(8)]),
            terms: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(false, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required),
            recaptcha: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required)
        });
        this.patterns = {
        // '0': { pattern: new RegExp('\[0-9\]')}
        // '0': { pattern: /^6104[\d]{8}$/ },
        // '1': { pattern: new RegExp('^610[^4]{1}[\d]{8}$')},
        // '2': { pattern: new RegExp('^61[^0]{1}[\d]{7}$')},
        // '3': { pattern: new RegExp('^04[\d]{8}$')},
        // '4': { pattern: new RegExp('^0[^4]{1}[\d]{8}$')},
        // '5': { pattern: new RegExp('^[^06]{1}[\d]{7}$')},
        // '6': { pattern: new RegExp('^1[2-9]{1}\d{2}[2-9]{1}\d{2}\d{4}$')},
        };
        this.aMasks = [
            {
                // name: 'mask#1 - mob 1: 61 04xx xxx xxx',
                reg: /^6104[\d]{8}$/,
                mask: '99 9999 999 999',
            },
            {
                // name: 'mask#2 - house 1: 61 0[^4] xxxx xxxx',
                reg: /^610[^4]{1}[\d]{8}$/,
                mask: '99 99 9999 9999',
            },
            {
                // name: 'mask#3 - house 2: 61 [^0]xxx xxxx',
                reg: /^61[^0]{1}[\d]{7}$/,
                mask: '99 9999 9999',
            },
            {
                // name: 'mask#4 - mob 2: 04xx xxx xxx',
                reg: /^04[\d]{8}$/,
                mask: '9999 999 999',
            },
            {
                // name: 'mask#5 - house 3: 0[^4] xxxx xxxx',
                reg: /^0[^4]{1}[\d]{8}$/,
                mask: '99 9999 9999',
            },
            {
                reg: /^[^06]{1}[\d]{7}$/,
                mask: '9999 9999',
            },
            {
                // name: 'mask#6 - house 4: [^06]{1}xxx xxxx',
                reg: /^1[2-9]{1}\d{2}[2-9]{1}\d{2}\d{4}$/,
                mask: '9 999 999 9999',
            },
        ];
        console.log('register constructor');
    }
    ngOnInit() {
        this.role = this.route.snapshot.url[0].path.split('-')[1];
        if (this.role !== 'resident') {
            this.registerForm.addControl('company', new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required));
        }
        else
            this.registerForm.addControl('verCode', new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.minLength(4), _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.maxLength(4)]));
        if (this.role !== 'agent') {
            this.registerForm.addControl('phone', new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required]));
        }
    }
    register() {
        if (this.role === 'manager') {
            this.registerForm.value.flag = false;
            this.registerForm.value.existingEmail = false;
            delete this.registerForm.value.confirm;
            console.log('register', this.registerForm.value, this.registerForm);
            this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.guest.register, this.registerForm.value).subscribe(res => {
                console.log(res);
                if (!res.status && res.message) {
                    this.alert.show(res.message);
                }
                if (res.status) {
                    this.router.navigateByUrl('/manager/buildings');
                }
            });
        }
        else if (this.role === 'resident') {
            this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.guest.tenantRegister, this.registerForm.value).subscribe(res => {
                console.log(res);
                if (!res.status && res.message) {
                    this.alert.show(res.message);
                }
                if (res.status) {
                    this.router.navigateByUrl('/resident/select');
                }
            });
        }
        else {
            delete this.registerForm.value.confirm;
            this.registerForm.value.existingEmail = false;
            this.registerForm.value.agent = true;
            this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.guest.register, this.registerForm.value).subscribe(res => {
                console.log(res);
                if (!res.status && res.message) {
                    this.alert.show(res.message);
                }
                if (res.status) {
                    this.router.navigateByUrl('/agent/dashboard');
                }
            });
        }
    }
    genVerCode() {
        if (!this.isCodeGenerated) {
            let verifyPhone = this.registerForm.value.phone.replace(/\s+/g, '');
            console.log(verifyPhone);
            this.pageLoading = true;
            this.apiService.post(_shared_constants_api_constants__WEBPACK_IMPORTED_MODULE_6__.API.guest.getVerifyCode, {
                'phone': verifyPhone
            }).subscribe((response) => {
                if (!response.status) {
                    this.alert.show(response.message);
                    this.pageLoading = false;
                    return;
                }
                this.isCodeGenerated = true;
                this.alert.show('An SMS code has been sent to your phone.' + (response.message || ''), 'Success');
                this.pageLoading = false;
                // this.showSendCodeAgain = true;
                return;
            }, () => {
                this.pageLoading = false;
                this.alert.show(_shared_constants_errors_constants__WEBPACK_IMPORTED_MODULE_8__.ERROR.internal);
                return;
            });
            return;
        }
    }
    back() {
        this.navigation.back();
    }
    handleLoad() {
    }
    handleReset() {
    }
    handleExpire() {
    }
    handdleSuccess(e) {
    }
    enterKey(event) {
        let charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode < 48 || charCode > 57)) {
            event.preventDefault();
            return false;
        }
        else {
            return true;
        }
    }
    presentModal(type) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            const modal = yield this.modalController.create({
                component: type === 'terms' ? _shared_modals_terms_terms_component__WEBPACK_IMPORTED_MODULE_2__.TermsModal : _shared_modals_privacy_privacy_component__WEBPACK_IMPORTED_MODULE_3__.PrivacyModal,
                cssClass: 'my-custom-class'
            });
            return yield modal.present();
        });
    }
    dismiss() {
        console.log('dismiss');
    }
};
RegisterPage.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_11__.HttpClient },
    { type: _services_api_service__WEBPACK_IMPORTED_MODULE_4__.ApiService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_12__.ActivatedRoute },
    { type: _services_navigation_service__WEBPACK_IMPORTED_MODULE_5__.NavigationService },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_13__.MatDialog },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.ModalController },
    { type: _services_alert_service__WEBPACK_IMPORTED_MODULE_7__.AlertService }
];
RegisterPage = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.Component)({
        selector: 'app-register',
        template: _raw_loader_register_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_register_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], RegisterPage);



/***/ }),

/***/ 50938:
/*!************************************************************!*\
  !*** ./src/app/shared/modals/privacy/privacy.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrivacyModal": () => (/* binding */ PrivacyModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_privacy_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./privacy.html */ 49841);
/* harmony import */ var _privacy_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./privacy.scss */ 30927);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 80476);







let PrivacyModal = class PrivacyModal {
    constructor(http, router, route, modalController) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.modalController = modalController;
        console.log('privacy constructor');
    }
    ngOnInit() {
    }
    dismiss() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }
};
PrivacyModal.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController }
];
PrivacyModal = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-privacy',
        template: _raw_loader_privacy_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_privacy_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], PrivacyModal);



/***/ }),

/***/ 12948:
/*!********************************************************!*\
  !*** ./src/app/shared/modals/terms/terms.component.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TermsModal": () => (/* binding */ TermsModal)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_terms_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./terms.html */ 91815);
/* harmony import */ var _terms_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./terms.scss */ 47450);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 91841);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 80476);







let TermsModal = class TermsModal {
    constructor(http, router, route, modalController) {
        this.http = http;
        this.router = router;
        this.route = route;
        this.modalController = modalController;
        console.log('terms constructor');
    }
    ngOnInit() {
    }
    dismiss() {
        this.modalController.dismiss({
            'dismissed': true
        });
    }
};
TermsModal.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.Router },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController }
];
TermsModal = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-terms',
        template: _raw_loader_terms_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_terms_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], TermsModal);



/***/ }),

/***/ 24140:
/*!***********************************************************!*\
  !*** ./node_modules/ngx-captcha/fesm2020/ngx-captcha.mjs ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseReCaptchaComponent": () => (/* binding */ BaseReCaptchaComponent),
/* harmony export */   "InvisibleReCaptchaComponent": () => (/* binding */ InvisibleReCaptchaComponent),
/* harmony export */   "NgxCaptchaModule": () => (/* binding */ NgxCaptchaModule),
/* harmony export */   "ReCaptcha2Component": () => (/* binding */ ReCaptcha2Component),
/* harmony export */   "ReCaptchaType": () => (/* binding */ ReCaptchaType),
/* harmony export */   "ReCaptchaV3Service": () => (/* binding */ ReCaptchaV3Service),
/* harmony export */   "ScriptService": () => (/* binding */ ScriptService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 38583);




const _c0 = ["captchaWrapperElem"];

class ScriptService {
  constructor(zone) {
    this.zone = zone;
    /**
     * Name of the global google recaptcha script
     */

    this.windowGrecaptcha = 'grecaptcha';
    /**
    * Name of the global callback
    */

    this.windowOnLoadCallbackProperty = 'ngx_captcha_onload_callback';
    this.globalDomain = 'recaptcha.net';
    this.defaultDomain = 'google.com';
  }

  registerCaptchaScript(useGlobalDomain, render, onLoad, language) {
    if (this.grecaptchaScriptLoaded()) {
      // recaptcha script is already loaded
      // just call the callback
      this.zone.run(() => {
        onLoad(window[this.windowGrecaptcha]);
      });
      return;
    } // we need to patch the callback through global variable, otherwise callback is not accessible
    // note: https://github.com/Enngage/ngx-captcha/issues/2


    window[this.windowOnLoadCallbackProperty] = () => this.zone.run(onLoad.bind(this, window[this.windowGrecaptcha])); // prepare script elem


    const scriptElem = document.createElement('script');
    scriptElem.innerHTML = '';
    scriptElem.src = this.getCaptchaScriptUrl(useGlobalDomain, render, language);
    scriptElem.async = true;
    scriptElem.defer = true; // add script to header

    document.getElementsByTagName('head')[0].appendChild(scriptElem);
  }

  cleanup() {
    window[this.windowOnLoadCallbackProperty] = undefined;
    window[this.windowGrecaptcha] = undefined;
  }
  /**
   * Indicates if google recaptcha script is available and ready to be used
   */


  grecaptchaScriptLoaded() {
    if (window[this.windowOnLoadCallbackProperty] && window[this.windowGrecaptcha]) {
      return true;
    }

    return false;
  }
  /**
   * Gets language param used in script url
   */


  getLanguageParam(hl) {
    if (!hl) {
      return '';
    }

    return `&hl=${hl}`;
  }
  /**
  * Url to google api script
  */


  getCaptchaScriptUrl(useGlobalDomain, render, language) {
    const domain = useGlobalDomain ? this.globalDomain : this.defaultDomain; // tslint:disable-next-line:max-line-length

    return `https://www.${domain}/recaptcha/api.js?onload=${this.windowOnLoadCallbackProperty}&render=${render}${this.getLanguageParam(language)}`;
  }

}
/** @nocollapse */

/** @nocollapse */


ScriptService.ɵfac = function ScriptService_Factory(t) {
  return new (t || ScriptService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
};
/** @nocollapse */

/** @nocollapse */


ScriptService.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ScriptService,
  factory: ScriptService.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ScriptService, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }];
  }, null);
})();

class BaseReCaptchaComponent {
  constructor(renderer, zone, injector, scriptService) {
    this.renderer = renderer;
    this.zone = zone;
    this.injector = injector;
    this.scriptService = scriptService;
    /**
     * Prefix of the captcha element
     */

    this.captchaElemPrefix = "ngx_captcha_id_";
    this.setupCaptcha = true;
    /**
     * Indicates if global domain 'recaptcha.net' should be used instead of default domain ('google.com')
     */

    this.useGlobalDomain = false;
    /**
     * Type
     */

    this.type = "image";
    /**
     * Tab index
     */

    this.tabIndex = 0;
    /**
     * Called when captcha receives successful response.
     * Captcha response token is passed to event.
     */

    this.success = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Called when captcha is loaded. Event receives id of the captcha
     */

    this.load = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Called when captcha is reset.
     */

    this.reset = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Called when captcha is loaded & ready. I.e. when you need to execute captcha on component load.
     */

    this.ready = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Error callback
     */

    this.error = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Expired callback
     */

    this.expire = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Indicates if captcha should be set on load
     */

    this.setupAfterLoad = false;
    /**
     * If enabled, captcha will reset after receiving success response. This is useful
     * when invisible captcha need to be resolved multiple times on same page
     */

    this.resetCaptchaAfterSuccess = false;
    /**
     * Indicates if captcha is loaded
     */

    this.isLoaded = false;
  }

  ngAfterViewInit() {
    this.control = this.injector.get(_angular_forms__WEBPACK_IMPORTED_MODULE_1__.NgControl, undefined, _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectFlags.Optional)?.control;
  }

  ngAfterViewChecked() {
    if (this.setupCaptcha) {
      this.setupCaptcha = false;
      this.setupComponent();
    }
  }

  ngOnChanges(changes) {
    // cleanup scripts if language changed because they need to be reloaded
    if (changes && changes.hl) {
      // cleanup scripts when language changes
      if (!changes.hl.firstChange && changes.hl.currentValue !== changes.hl.previousValue) {
        this.scriptService.cleanup();
      }
    }

    if (changes && changes.useGlobalDomain) {
      // cleanup scripts when domain changes
      if (!changes.useGlobalDomain.firstChange && changes.useGlobalDomain.currentValue !== changes.useGlobalDomain.previousValue) {
        this.scriptService.cleanup();
      }
    }

    this.setupCaptcha = true;
  }
  /**
   * Gets captcha response as per reCaptcha docs
   */


  getResponse() {
    return this.reCaptchaApi.getResponse(this.captchaId);
  }
  /**
   * Gets Id of captcha widget
   */


  getCaptchaId() {
    return this.captchaId;
  }
  /**
   * Resets captcha
   */


  resetCaptcha() {
    this.zone.run(() => {
      // reset captcha using Google js api
      this.reCaptchaApi.reset(); // required due to forms

      this.onChange(undefined);
      this.onTouched(undefined); // trigger reset event

      this.reset.next();
    });
  }
  /**
   * Gets last submitted captcha response
   */


  getCurrentResponse() {
    return this.currentResponse;
  }
  /**
   * Reload captcha. Useful when properties (i.e. theme) changed and captcha need to reflect them
   */


  reloadCaptcha() {
    this.setupComponent();
  }

  ensureCaptchaElem(captchaElemId) {
    const captchaElem = document.getElementById(captchaElemId);

    if (!captchaElem) {
      throw Error(`Captcha element with id '${captchaElemId}' was not found`);
    } // assign captcha alem


    this.captchaElem = captchaElem;
  }
  /**
   * Responsible for instantiating captcha element
   */


  renderReCaptcha() {
    // run outside angular zone due to timeout issues when testing
    // details: https://github.com/Enngage/ngx-captcha/issues/26
    this.zone.runOutsideAngular(() => {
      // to fix reCAPTCHA placeholder element must be an element or id
      // https://github.com/Enngage/ngx-captcha/issues/96
      setTimeout(() => {
        this.captchaId = this.reCaptchaApi.render(this.captchaElemId, this.getCaptchaProperties());
        this.ready.next();
      }, 0);
    });
  }
  /**
   * Called when captcha receives response
   * @param callback Callback
   */


  handleCallback(callback) {
    this.currentResponse = callback;
    this.success.next(callback);
    this.zone.run(() => {
      this.onChange(callback);
      this.onTouched(callback);
    });

    if (this.resetCaptchaAfterSuccess) {
      this.resetCaptcha();
    }
  }

  getPseudoUniqueNumber() {
    return new Date().getUTCMilliseconds() + Math.floor(Math.random() * 9999);
  }

  setupComponent() {
    // captcha specific setup
    this.captchaSpecificSetup(); // create captcha wrapper

    this.createAndSetCaptchaElem();
    this.scriptService.registerCaptchaScript(this.useGlobalDomain, "explicit", grecaptcha => {
      this.onloadCallback(grecaptcha);
    }, this.hl);
  }
  /**
   * Called when google's recaptcha script is ready
   */


  onloadCallback(grecapcha) {
    // assign reference to reCaptcha Api once its loaded
    this.reCaptchaApi = grecapcha;

    if (!this.reCaptchaApi) {
      throw Error(`ReCaptcha Api was not initialized correctly`);
    } // loaded flag


    this.isLoaded = true; // fire load event

    this.load.next(); // render captcha

    this.renderReCaptcha(); // setup component if it was flagged as such

    if (this.setupAfterLoad) {
      this.setupAfterLoad = false;
      this.setupComponent();
    }
  }

  generateNewElemId() {
    return this.captchaElemPrefix + this.getPseudoUniqueNumber();
  }

  createAndSetCaptchaElem() {
    // generate new captcha id
    this.captchaElemId = this.generateNewElemId();

    if (!this.captchaElemId) {
      throw Error(`Captcha elem Id is not set`);
    }

    if (!this.captchaWrapperElem) {
      throw Error(`Captcha DOM element is not initialized`);
    } // remove old html


    this.captchaWrapperElem.nativeElement.innerHTML = ""; // create new wrapper for captcha

    const newElem = this.renderer.createElement("div");
    newElem.id = this.captchaElemId;
    this.renderer.appendChild(this.captchaWrapperElem.nativeElement, newElem); // when use captcha in cdk stepper then throwing error Captcha element with id 'ngx_captcha_id_XXXX' not found
    // to fix it checking ensureCaptchaElem in timeout so that its check in next call and its able to find element

    setTimeout(() => {
      // update captcha elem
      if (this.captchaElemId) {
        this.ensureCaptchaElem(this.captchaElemId);
      }
    }, 0);
  }
  /**
   * To be aligned with the ControlValueAccessor interface we need to implement this method
   * However as we don't want to update the recaptcha, this doesn't need to be implemented
   */


  writeValue(obj) {}
  /**
   * This method helps us tie together recaptcha and our formControl values
   */


  registerOnChange(fn) {
    this.onChange = fn;
  }
  /**
   * At some point we might be interested whether the user has touched our component
   */


  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  /**
   * Handles error callback
   */


  handleErrorCallback() {
    this.zone.run(() => {
      this.onChange(undefined);
      this.onTouched(undefined);
    });
    this.error.next();
  }
  /**
   * Handles expired callback
   */


  handleExpireCallback() {
    this.expire.next(); // reset captcha on expire callback

    this.resetCaptcha();
  }

}
/** @nocollapse */

/** @nocollapse */


BaseReCaptchaComponent.ɵfac = function BaseReCaptchaComponent_Factory(t) {
  return new (t || BaseReCaptchaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ScriptService));
};
/** @nocollapse */

/** @nocollapse */


BaseReCaptchaComponent.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
  type: BaseReCaptchaComponent,
  inputs: {
    siteKey: "siteKey",
    useGlobalDomain: "useGlobalDomain",
    type: "type",
    hl: "hl",
    tabIndex: "tabIndex"
  },
  outputs: {
    success: "success",
    load: "load",
    reset: "reset",
    ready: "ready",
    error: "error",
    expire: "expire"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BaseReCaptchaComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }, {
      type: ScriptService
    }];
  }, {
    siteKey: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    useGlobalDomain: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    type: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    hl: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    tabIndex: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    success: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    load: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    reset: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    ready: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    error: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    expire: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }]
  });
})();

var ReCaptchaType;

(function (ReCaptchaType) {
  ReCaptchaType[ReCaptchaType["InvisibleReCaptcha"] = 0] = "InvisibleReCaptcha";
  ReCaptchaType[ReCaptchaType["ReCaptcha2"] = 1] = "ReCaptcha2";
})(ReCaptchaType || (ReCaptchaType = {}));

class InvisibleReCaptchaComponent extends BaseReCaptchaComponent {
  constructor(renderer, zone, injector, scriptService) {
    super(renderer, zone, injector, scriptService);
    this.renderer = renderer;
    this.zone = zone;
    this.injector = injector;
    this.scriptService = scriptService;
    /**
     * This size representing invisible captcha
     */

    this.size = 'invisible';
    /**
     * Theme
     */

    this.theme = 'light';
    /**
     * Badge
     */

    this.badge = 'bottomright';
    this.recaptchaType = ReCaptchaType.InvisibleReCaptcha;
  }

  ngOnChanges(changes) {
    super.ngOnChanges(changes);
  }
  /**
   * Programatically invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a div instead of a button.
   */


  execute() {
    // execute captcha
    this.zone.runOutsideAngular(() => this.reCaptchaApi.execute(this.captchaId));
  }

  captchaSpecificSetup() {}
  /**
  * Gets reCaptcha properties
  */


  getCaptchaProperties() {
    return {
      'sitekey': this.siteKey,
      'callback': response => this.zone.run(() => this.handleCallback(response)),
      'expired-callback': () => this.zone.run(() => this.handleExpireCallback()),
      'error-callback': () => this.zone.run(() => this.handleErrorCallback()),
      'badge': this.badge,
      'type': this.type,
      'tabindex': this.tabIndex,
      'size': this.size,
      'theme': this.theme
    };
  }

}
/** @nocollapse */

/** @nocollapse */


InvisibleReCaptchaComponent.ɵfac = function InvisibleReCaptchaComponent_Factory(t) {
  return new (t || InvisibleReCaptchaComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ScriptService));
};
/** @nocollapse */

/** @nocollapse */


InvisibleReCaptchaComponent.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: InvisibleReCaptchaComponent,
  selectors: [["ngx-invisible-recaptcha"]],
  viewQuery: function InvisibleReCaptchaComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.captchaWrapperElem = _t.first);
    }
  },
  inputs: {
    theme: "theme",
    badge: "badge",
    hl: "hl"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALUE_ACCESSOR,
    useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => InvisibleReCaptchaComponent),
    multi: true
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  decls: 2,
  vars: 0,
  consts: [["captchaWrapperElem", ""]],
  template: function InvisibleReCaptchaComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", null, 0);
    }
  },
  encapsulation: 2
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](InvisibleReCaptchaComponent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-invisible-recaptcha',
      template: `
  <div #captchaWrapperElem></div>`,
      providers: [{
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALUE_ACCESSOR,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => InvisibleReCaptchaComponent),
        multi: true
      }]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }, {
      type: ScriptService
    }];
  }, {
    theme: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    badge: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    hl: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    captchaWrapperElem: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['captchaWrapperElem', {
        static: false
      }]
    }]
  });
})();

class ReCaptcha2Component extends BaseReCaptchaComponent {
  constructor(renderer, zone, injector, scriptService) {
    super(renderer, zone, injector, scriptService);
    this.renderer = renderer;
    this.zone = zone;
    this.injector = injector;
    this.scriptService = scriptService;
    /**
    * Name of the global expire callback
    */

    this.windowOnErrorCallbackProperty = 'ngx_captcha_error_callback';
    /**
    * Name of the global error callback
    */

    this.windowOnExpireCallbackProperty = 'ngx_captcha_expire_callback';
    /**
     * Theme
     */

    this.theme = 'light';
    /**
    * Size
    */

    this.size = 'normal';
    this.recaptchaType = ReCaptchaType.ReCaptcha2;
  }

  ngOnChanges(changes) {
    super.ngOnChanges(changes);
  }

  ngOnDestroy() {
    window[this.windowOnErrorCallbackProperty] = {};
    window[this.windowOnExpireCallbackProperty] = {};
  }

  captchaSpecificSetup() {
    this.registerCallbacks();
  }
  /**
   * Gets reCaptcha properties
  */


  getCaptchaProperties() {
    return {
      'sitekey': this.siteKey,
      'callback': response => this.zone.run(() => this.handleCallback(response)),
      'expired-callback': () => this.zone.run(() => this.handleExpireCallback()),
      'error-callback': () => this.zone.run(() => this.handleErrorCallback()),
      'theme': this.theme,
      'type': this.type,
      'size': this.size,
      'tabindex': this.tabIndex
    };
  }
  /**
   * Registers global callbacks
  */


  registerCallbacks() {
    window[this.windowOnErrorCallbackProperty] = super.handleErrorCallback.bind(this);
    window[this.windowOnExpireCallbackProperty] = super.handleExpireCallback.bind(this);
  }

}
/** @nocollapse */

/** @nocollapse */


ReCaptcha2Component.ɵfac = function ReCaptcha2Component_Factory(t) {
  return new (t || ReCaptcha2Component)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](ScriptService));
};
/** @nocollapse */

/** @nocollapse */


ReCaptcha2Component.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
  type: ReCaptcha2Component,
  selectors: [["ngx-recaptcha2"]],
  viewQuery: function ReCaptcha2Component_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 5);
    }

    if (rf & 2) {
      let _t;

      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.captchaWrapperElem = _t.first);
    }
  },
  inputs: {
    theme: "theme",
    size: "size",
    hl: "hl"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALUE_ACCESSOR,
    useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => ReCaptcha2Component),
    multi: true
  }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]],
  decls: 2,
  vars: 0,
  consts: [["captchaWrapperElem", ""]],
  template: function ReCaptcha2Component_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", null, 0);
    }
  },
  encapsulation: 2
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ReCaptcha2Component, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'ngx-recaptcha2',
      template: `
  <div #captchaWrapperElem></div>`,
      providers: [{
        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_1__.NG_VALUE_ACCESSOR,
        useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => ReCaptcha2Component),
        multi: true
      }]
    }]
  }], function () {
    return [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector
    }, {
      type: ScriptService
    }];
  }, {
    theme: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    size: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    hl: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    captchaWrapperElem: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: ['captchaWrapperElem', {
        static: false
      }]
    }]
  });
})();

class ReCaptchaV3Service {
  constructor(scriptService, zone) {
    this.scriptService = scriptService;
    this.zone = zone;
  }
  /**
   * Executes reCaptcha v3 with given action and passes token via callback. You need to verify
   * this callback in your backend to get meaningful results.
   *
   * For more information see https://developers.google.com/recaptcha/docs/v3
   *
   * @param siteKey Site key found in your google admin panel
   * @param action Action to log
   * @param callback Callback function to to handle token
   * @param config Optional configuration like useGlobalDomain to be provided
   * @param errorCallback Optional Callback function to handle errors
   */


  execute(siteKey, action, callback, config, errorCallback) {
    this.executeAsPromise(siteKey, action, config).then(callback).catch(error => errorCallback ? errorCallback(error) : console.error(error));
  }
  /**
   * Executes reCaptcha v3 with given action and returns token via Promise. You need to verify
   * this token in your backend to get meaningful results.
   *
   * For more information see https://developers.google.com/recaptcha/docs/v3
   *
   * @param siteKey Site key found in your google admin panel
   * @param action Action to log
   */


  executeAsPromise(siteKey, action, config) {
    return new Promise((resolve, reject) => {
      const useGlobalDomain = config && config.useGlobalDomain ? true : false;

      const onRegister = grecaptcha => {
        this.zone.runOutsideAngular(() => {
          try {
            grecaptcha.execute(siteKey, {
              action
            }).then(token => this.zone.run(() => resolve(token)));
          } catch (error) {
            reject(error);
          }
        });
      };

      this.scriptService.registerCaptchaScript(useGlobalDomain, siteKey, onRegister);
    });
  }

}
/** @nocollapse */

/** @nocollapse */


ReCaptchaV3Service.ɵfac = function ReCaptchaV3Service_Factory(t) {
  return new (t || ReCaptchaV3Service)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](ScriptService), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone));
};
/** @nocollapse */

/** @nocollapse */


ReCaptchaV3Service.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
  token: ReCaptchaV3Service,
  factory: ReCaptchaV3Service.ɵfac
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ReCaptchaV3Service, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable
  }], function () {
    return [{
      type: ScriptService
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
    }];
  }, null);
})();

class NgxCaptchaModule {}
/** @nocollapse */

/** @nocollapse */


NgxCaptchaModule.ɵfac = function NgxCaptchaModule_Factory(t) {
  return new (t || NgxCaptchaModule)();
};
/** @nocollapse */

/** @nocollapse */


NgxCaptchaModule.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
  type: NgxCaptchaModule,
  declarations: [ReCaptcha2Component, InvisibleReCaptchaComponent],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
  exports: [ReCaptcha2Component, InvisibleReCaptchaComponent]
});
/** @nocollapse */

/** @nocollapse */

NgxCaptchaModule.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
  providers: [ScriptService, ReCaptchaV3Service],
  imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule]]
});

(function () {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NgxCaptchaModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule],
      declarations: [ReCaptcha2Component, InvisibleReCaptchaComponent],
      providers: [ScriptService, ReCaptchaV3Service],
      exports: [ReCaptcha2Component, InvisibleReCaptchaComponent]
    }]
  }], null, null);
})();
/*
 * Public API
 */

/**
 * Generated bundle index. Do not edit.
 */


 //# sourceMappingURL=ngx-captcha.mjs.map

/***/ }),

/***/ 4563:
/*!****************************************************!*\
  !*** ./src/app/auth/auth-menu/auth-menu.page.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".welcome-form {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  height: calc(100vh - 56px);\n  margin-top: 56px;\n}\n\n.welcome-form-group {\n  margin-right: 20px;\n  margin-left: 20px;\n  cursor: pointer;\n  z-index: 2;\n}\n\n.welcome-form-group .welcome-btn {\n  width: 415px;\n  height: 415px;\n  transition: 0.25s;\n  padding: 20px;\n  background-color: #fff;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  color: #3d5a92;\n  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);\n}\n\n.welcome-form-group .welcome-btn a {\n  color: #3d5a92;\n}\n\n.welcome-form-group .welcome-btn a h2 {\n  font-family: \"Montserrat\";\n  text-transform: uppercase;\n  font-weight: 400;\n}\n\n.welcome-form-group .welcome-btn:hover {\n  background-color: #3d5a92;\n  transform: scale(1.05);\n}\n\n.welcome-form-group .welcome-btn:hover a {\n  color: #fff;\n}\n\n.welcome-form-group .welcome-btn:hover hr {\n  color: #fff;\n  background-color: #fff;\n}\n\n.welcome-btn hr {\n  width: 70px;\n  border: none;\n  color: #4f75b4;\n  background-color: #4f75b4;\n  height: 2px;\n  margin-top: 25px;\n}\n\n.auth-menu-toolbar {\n  display: flex;\n  box-sizing: border-box;\n  padding: 0 16px;\n  width: 100%;\n  flex-direction: row;\n  align-items: center;\n  white-space: nowrap;\n}\n\n@media (max-width: 1364px) {\n  .welcome-form {\n    height: auto;\n    margin-bottom: 40px;\n  }\n\n  .welcome-form-group {\n    margin-top: 40px;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF1dGgtbWVudS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLDBCQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFDQTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtBQUVGOztBQURFO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxzSEFBQTtBQUdKOztBQUZJO0VBQ0UsY0FBQTtBQUlOOztBQUhNO0VBQ0UseUJBQUE7RUFDQSx5QkFBQTtFQUNBLGdCQUFBO0FBS1I7O0FBRkk7RUFDRSx5QkFBQTtFQUNBLHNCQUFBO0FBSU47O0FBSE07RUFDRSxXQUFBO0FBS1I7O0FBSE07RUFDRSxXQUFBO0VBQ0Esc0JBQUE7QUFLUjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxlQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQUNGOztBQUVBO0VBQ0U7SUFDRSxZQUFBO0lBQ0EsbUJBQUE7RUFDRjs7RUFDQTtJQUNFLGdCQUFBO0VBRUY7QUFDRiIsImZpbGUiOiJhdXRoLW1lbnUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndlbGNvbWUtZm9ybSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDU2cHgpOyAvLyA1NnB4IGlzIGhlYWRlciBoZWlndGgsIGNoYW5nZSBsYXRlclxuICBtYXJnaW4tdG9wOiA1NnB4O1xufVxuLndlbGNvbWUtZm9ybS1ncm91cCB7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgei1pbmRleDogMjtcbiAgLndlbGNvbWUtYnRuIHtcbiAgICB3aWR0aDogNDE1cHg7XG4gICAgaGVpZ2h0OiA0MTVweDtcbiAgICB0cmFuc2l0aW9uOiAwLjI1cztcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjM2Q1YTkyO1xuICAgIGJveC1zaGFkb3c6IDAgN3B4IDhweCAtNHB4IHJnYigwIDAgMCAvIDIwJSksIDAgMTNweCAxOXB4IDJweCByZ2IoMCAwIDAgLyAxNCUpLCAwIDVweCAyNHB4IDRweCByZ2IoMCAwIDAgLyAxMiUpO1xuICAgIGF7XG4gICAgICBjb2xvcjogIzNkNWE5MjtcbiAgICAgIGgye1xuICAgICAgICBmb250LWZhbWlseTogJ01vbnRzZXJyYXQnO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgfVxuICAgIH1cbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzZDVhOTI7XG4gICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpO1xuICAgICAgYXtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICB9XG4gICAgICBociB7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgfVxufVxuXG4ud2VsY29tZS1idG4gaHIge1xuICB3aWR0aDogNzBweDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogIzRmNzViNDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRmNzViNDtcbiAgaGVpZ2h0OiAycHg7XG4gIG1hcmdpbi10b3A6IDI1cHg7XG59XG5cbi5hdXRoLW1lbnUtdG9vbGJhcntcbiAgZGlzcGxheTogZmxleDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgcGFkZGluZzogMCAxNnB4O1xuICB3aWR0aDogMTAwJTtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDEzNjRweCl7XG4gIC53ZWxjb21lLWZvcm0ge1xuICAgIGhlaWdodDogYXV0bztcbiAgICBtYXJnaW4tYm90dG9tOiA0MHB4O1xuICB9XG4gIC53ZWxjb21lLWZvcm0tZ3JvdXAge1xuICAgIG1hcmdpbi10b3A6IDQwcHg7XG4gIH0gXG59Il19 */");

/***/ }),

/***/ 90957:
/*!*************************************!*\
  !*** ./src/app/auth/auth.page.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhdXRoLnBhZ2Uuc2NzcyJ9 */");

/***/ }),

/***/ 55203:
/*!**********************************************!*\
  !*** ./src/app/auth/forgot/forgot.page.scss ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".forgot-wrapper {\n  width: 540px;\n  height: 650px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.forgot-form {\n  max-height: 350px;\n  max-width: 365px;\n  width: 100%;\n}\n\n.forgot-form h2 {\n  margin-bottom: 40px;\n  font-weight: 400;\n  text-transform: uppercase;\n}\n\n.forgot-buttons {\n  margin-top: 120px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZvcmdvdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtBQUNGOztBQUFFO0VBQ0UsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0FBRUo7O0FBRUE7RUFDRSxpQkFBQTtBQUNGIiwiZmlsZSI6ImZvcmdvdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZm9yZ290LXdyYXBwZXJ7XG4gIHdpZHRoOiA1NDBweDtcbiAgaGVpZ2h0OiA2NTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5mb3Jnb3QtZm9ybXtcbiAgbWF4LWhlaWdodDogMzUwcHg7XG4gIG1heC13aWR0aDogMzY1cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBoMntcbiAgICBtYXJnaW4tYm90dG9tOiA0MHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgfVxufVxuXG4uZm9yZ290LWJ1dHRvbnN7XG4gIG1hcmdpbi10b3A6IDEyMHB4O1xufSJdfQ== */");

/***/ }),

/***/ 11894:
/*!********************************************!*\
  !*** ./src/app/auth/login/login.page.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".login-form-wrapper {\n  width: 585px;\n  height: 807px;\n  justify-content: center;\n}\n\n.login-block-header {\n  font-size: 24px;\n  font-weight: normal;\n  text-align: center;\n  margin-top: 20px;\n}\n\n.login-block-header p {\n  margin-bottom: 6px;\n}\n\n.login-block-header h3 {\n  margin-top: 5px;\n}\n\n.text-left {\n  text-align: left;\n  margin-top: 15px;\n  margin-bottom: 46px;\n}\n\n.gray-text {\n  color: gray;\n  font-size: 16px;\n}\n\n@media (max-width: 600px) {\n  .login-form-wrapper {\n    width: 100%;\n    height: auto;\n    min-width: 300px;\n  }\n\n  .mim-header-toolbar {\n    background-color: transparent;\n    max-height: 90px;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7QUFDRjs7QUFDQTtFQUNFLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFFRjs7QUFERTtFQUNFLGtCQUFBO0FBR0o7O0FBREU7RUFDRSxlQUFBO0FBR0o7O0FBQ0E7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFFRjs7QUFBQTtFQUNFLFdBQUE7RUFDQSxlQUFBO0FBR0Y7O0FBQ0E7RUFDRTtJQUNFLFdBQUE7SUFDQSxZQUFBO0lBQ0EsZ0JBQUE7RUFFRjs7RUFBQTtJQUNFLDZCQUFBO0lBQ0EsZ0JBQUE7SUFDQSx1QkFBQTtFQUdGO0FBQ0YiLCJmaWxlIjoibG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvZ2luLWZvcm0td3JhcHBlcntcbiAgd2lkdGg6IDU4NXB4O1xuICBoZWlnaHQ6IDgwN3B4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbi5sb2dpbi1ibG9jay1oZWFkZXIge1xuICBmb250LXNpemU6IDI0cHg7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgcHtcbiAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIH1cbiAgaDN7XG4gICAgbWFyZ2luLXRvcDogNXB4O1xuICB9XG59XG5cbi50ZXh0LWxlZnQge1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBtYXJnaW4tdG9wOiAxNXB4O1xuICBtYXJnaW4tYm90dG9tOiA0NnB4O1xufVxuLmdyYXktdGV4dCB7XG4gIGNvbG9yOiBncmF5O1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cblxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gIC5sb2dpbi1mb3JtLXdyYXBwZXJ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIG1pbi13aWR0aDogMzAwcHg7XG4gIH1cbiAgLm1pbS1oZWFkZXItdG9vbGJhcntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBtYXgtaGVpZ2h0OiA5MHB4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB9XG59Il19 */");

/***/ }),

/***/ 84169:
/*!**************************************************!*\
  !*** ./src/app/auth/register/register.page.scss ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".register-form-wrapper {\n  width: 585px;\n  padding: 30px;\n}\n\n.login-block-header {\n  font-size: 24px;\n  font-weight: normal;\n  text-align: center;\n  margin-top: 20px;\n  text-transform: uppercase;\n}\n\n.mat-input {\n  margin-bottom: 26px;\n}\n\n.terms-cond-privacy {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 12px;\n  text-align: center;\n  margin-top: 10px;\n  margin-bottom: 46px;\n}\n\n.terms-cond-privacy .terms-checkbox {\n  height: 16px;\n  width: 16px;\n  margin-right: 10px;\n}\n\n.form-val-note-wrap {\n  color: #888;\n  font-size: 12px;\n}\n\n.send-ver-code {\n  float: right;\n  cursor: pointer;\n  font-size: 0.875rem;\n  font-style: italic;\n  text-decoration: underline;\n}\n\n.g_captcha {\n  display: flex;\n  justify-content: center;\n  margin-top: 25px;\n  width: auto !important;\n  margin-bottom: 10px;\n}\n\n@media (max-width: 600px) {\n  .register-form-wrapper {\n    width: 100%;\n    height: auto;\n    min-width: 300px;\n    margin-top: 90px;\n  }\n\n  .mim-header-toolbar {\n    background-color: transparent;\n    max-height: 90px;\n    justify-content: center;\n  }\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlZ2lzdGVyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFBRTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUFFSjs7QUFFQTtFQUNFLFdBQUE7RUFDQSxlQUFBO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBR0E7RUFDRTtJQUNFLFdBQUE7SUFDQSxZQUFBO0lBQ0EsZ0JBQUE7SUFDQSxnQkFBQTtFQUFGOztFQUVBO0lBQ0UsNkJBQUE7SUFDQSxnQkFBQTtJQUNBLHVCQUFBO0VBQ0Y7QUFDRiIsImZpbGUiOiJyZWdpc3Rlci5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucmVnaXN0ZXItZm9ybS13cmFwcGVyIHtcbiAgd2lkdGg6IDU4NXB4O1xuICBwYWRkaW5nOiAzMHB4O1xufVxuXG4ubG9naW4tYmxvY2staGVhZGVyIHtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbi5tYXQtaW5wdXQge1xuICBtYXJnaW4tYm90dG9tOiAyNnB4O1xufVxuXG4udGVybXMtY29uZC1wcml2YWN5IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiA0NnB4O1xuICAudGVybXMtY2hlY2tib3gge1xuICAgIGhlaWdodDogMTZweDtcbiAgICB3aWR0aDogMTZweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIH1cbn1cblxuLmZvcm0tdmFsLW5vdGUtd3JhcCB7XG4gIGNvbG9yOiAjODg4O1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbi5zZW5kLXZlci1jb2RlIHtcbiAgZmxvYXQ6IHJpZ2h0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG59XG5cbi5nX2NhcHRjaGEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMjVweDtcbiAgd2lkdGg6IGF1dG8gIWltcG9ydGFudDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgLnJlZ2lzdGVyLWZvcm0td3JhcHBlcntcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgbWluLXdpZHRoOiAzMDBweDtcbiAgICBtYXJnaW4tdG9wOiA5MHB4O1xuICB9XG4gIC5taW0taGVhZGVyLXRvb2xiYXJ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgbWF4LWhlaWdodDogOTBweDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxufSJdfQ== */");

/***/ }),

/***/ 30927:
/*!****************************************************!*\
  !*** ./src/app/shared/modals/privacy/privacy.scss ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".terms {\n  overflow: scroll;\n  padding: 10px;\n}\n\n.counter_main {\n  max-width: 550px;\n}\n\n.terms-button {\n  padding: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaXZhY3kuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtBQUFGOztBQUVBO0VBQ0UsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7QUFDRiIsImZpbGUiOiJwcml2YWN5LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi50ZXJtc3tcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgcGFkZGluZzogMTBweDtcbn1cbi5jb3VudGVyX21haW57XG4gIG1heC13aWR0aDogNTUwcHg7XG59XG5cbi50ZXJtcy1idXR0b257XG4gIHBhZGRpbmc6IDIwcHg7XG59Il19 */");

/***/ }),

/***/ 47450:
/*!************************************************!*\
  !*** ./src/app/shared/modals/terms/terms.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (".terms {\n  overflow: scroll;\n  padding: 10px;\n}\n\n.counter_main {\n  max-width: 550px;\n}\n\n.terms-button {\n  padding: 20px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlcm1zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7RUFDRSxnQkFBQTtFQUNBLGFBQUE7QUFBRjs7QUFFQTtFQUNFLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0FBQ0YiLCJmaWxlIjoidGVybXMuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLnRlcm1ze1xuICBvdmVyZmxvdzogc2Nyb2xsO1xuICBwYWRkaW5nOiAxMHB4O1xufVxuLmNvdW50ZXJfbWFpbntcbiAgbWF4LXdpZHRoOiA1NTBweDtcbn1cblxuLnRlcm1zLWJ1dHRvbntcbiAgcGFkZGluZzogMjBweDtcbn0iXX0= */");

/***/ }),

/***/ 78368:
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/auth-menu/auth-menu.page.html ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar auth-menu-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n  </mat-toolbar>\n  <div class=\"flex-page welcome-form\">\n    <div class=\"welcome-form-group\" (click)=\"redirect('resident')\">\n      <div class=\"welcome-btn\">\n        <a><h2>Resident<br>(Tenants and Owners)<hr></h2></a>\n      </div>\n    </div>\n    <div class=\"welcome-form-group\" (click)=\"redirect('manager')\">\n      <div class=\"welcome-btn\">\n        <a><h2 class=\"text-center\">Owners corp or<br>building manager<hr></h2></a>\n      </div>\n    </div>\n    <div class=\"welcome-form-group\" (click)=\"redirect('agent')\">\n      <div class=\"welcome-btn\">\n        <a><h2 class=\"text-center\">Real estate agent / <br>Property Manager<hr></h2></a>\n      </div>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 21643:
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/auth.page.html ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-router-outlet></ion-router-outlet>\n\n");

/***/ }),

/***/ 35656:
/*!************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/forgot/forgot.page.html ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n  </mat-toolbar>\n  <div class=\"flex-page\">\n    <div class=\"form-wrapper forgot-wrapper\">\n      <form [formGroup]=\"forgotForm\" class=\"forgot-form\">\n        <div class=\"text-center\">\n          <h2>Forgot your password</h2>\n        </div>\n        <div class=\"login-fields\">\n          <div class=\"login-field mat-input\" appearance=\"fill\">\n            <label for=\"login-email\">Email</label>\n            <input matInput type=\"email\" id=\"login-email\" formControlName=\"email\" placeholder=\"For example john@gmail.com\">\n            <div *ngIf=\"forgotForm.submitted || forgotForm.controls.email.touched && forgotForm.controls.email.errors\">\n              <span class=\"login-block-novalid\" *ngIf=\"forgotForm.controls.email.errors.required\">Tell us your email.</span>\n              <span class=\"login-block-novalid\" *ngIf=\"forgotForm.controls.email.errors.pattern\">This is not a valid email.</span>\n            </div>\n          </div>\n          <div *ngIf=\"forgotSent\">Recover password instructions were sent to your email.</div>\n        </div>\n        <div class=\"login-buttons forgot-buttons\">\n          <button mat-button class=\"back-btn\" (click)=\"back()\">\n            <mat-icon aria-hidden=\"false\" aria-label=\"back\">keyboard_backspace</mat-icon> Back\n          </button>\n          <button mat-button class=\"submit-btn\" (click)=\"forgot()\"\n            [disabled]=\"forgotForm.invalid\" aria-label=\"description\"\n            >Forgot password</button>\n        </div>\n      </form>\n    </div>\n  </div>\n</ion-content>\n");

/***/ }),

/***/ 48182:
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/login/login.page.html ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n  </mat-toolbar>\n  <div class=\"flex-page\">\n    <div class=\"form-wrapper login-form-wrapper\">\n      <form class=\"login-form\" [formGroup]=\"loginForm\" (ngSubmit)=\"login()\">\n        <div *ngIf=\"!pageLoading\" class=\"login-block login-block-existing\">\n          <div class=\"login-block-header\">\n            <p>Don't have an account?<a (click)=\"register()\"> Register!</a></p>\n            or\n            <h3 class=\"login-block-header\">Log in</h3>\n          </div>\n\n          <div class=\"login-fields\">\n            <div class=\"mat-input login-field\">\n              <label for=\"login-email\">Email</label>\n              <input matInput type=\"email\" id=\"login-email\" placeholder=\"For example john@gmail.com\"\n                formControlName=\"email\">\n              <div *ngIf=\"loginForm.submitted || loginForm.controls.email.touched && loginForm.controls.email.errors\">\n                <span class=\"login-block-novalid\" *ngIf=\"loginForm.controls.email.errors.required\">Tell us your\n                  email.</span>\n                <span class=\"login-block-novalid\" *ngIf=\"loginForm.controls.email.errors.pattern\">This is not a valid\n                  email.</span>\n                <!-- <div class=\"email-check\" ng-if=\"existingEmail && form.email.$valid\">\n                            <span class=\"another-role-novalid\">{{existingEmail}}</span>\n                        </div> -->\n              </div>\n            </div>\n\n            <div class=\"mat-input login-field\">\n              <label for=\"login-password\">Password</label>\n              <input matInput type=\"password\" id=\"login-password\" placeholder=\"*************\"\n                formControlName=\"password\">\n              <div\n                *ngIf=\"loginForm.submitted || loginForm.controls.password.touched && loginForm.controls.password.errors\">\n                <span class=\"login-block-novalid\" *ngIf=\"loginForm.controls.password.errors.required\">Tell us your\n                  password.</span>\n                <span class=\"login-block-novalid\" *ngIf=\"loginForm.controls.password.errors.minlength\">Password can't be\n                  shorter than 6 characters.</span>\n              </div>\n            </div>\n            <div class=\"text-left\">\n              <a class=\"gray-text\" (click)=\"forgot()\">Forgot your password? Click here</a>\n            </div>\n          </div>\n          <div class=\"login-buttons\">\n            <button mat-button type=\"button\" class=\"back-btn\" (click)=\"back()\">\n              <mat-icon aria-hidden=\"false\" aria-label=\"back\">keyboard_backspace</mat-icon>Back\n            </button>\n            <button mat-button type=\"submit\" (click)=\"login()\" class=\"submit-btn\"\n              [disabled]=\"loginForm.invalid\" aria-label=\"login\">Log in</button>\n          </div>\n        </div>\n        <div class=\"loading-bar\" *ngIf=\"pageLoading\">\n          <ion-spinner class=\"spinner\" color=\"primary\"></ion-spinner>\n        </div>\n      </form>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 4176:
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/auth/register/register.page.html ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content [fullscreen]=\"true\">\n  <mat-toolbar class=\"mim-header-toolbar\">\n    <a href=\"https://mimor.com.au\" class=\"mim-main-logo mim-main-logo-orig\">\n      <img src=\"assets/img/logoNew.png\" class=\"logo\" alt=\"\">\n    </a>\n  </mat-toolbar>\n  <div class=\"flex-page\">\n    <div class=\"form-wrapper register-form-wrapper\" ng-if=\"newTenant\">\n      <form class=\"register-form\" [formGroup]=\"registerForm\" (ngSubmit)=\"register()\">\n        <div ng-hide=\"pageLoading\" class=\"login-block\" layout=\"column\">\n          <h4 class=\"login-block-header mim-uppercase\">Please fill in your details</h4>\n          <div class=\"login-fields\">\n            <div class=\"login-field mat-input\">\n              <label ng-if=\"!existingEmail\">Full Name</label>\n              <input matInput type=\"text\" placeholder=\"For example John Doe\" formControlName=\"name\">\n              <div\n                *ngIf=\"(registerForm.submitted || registerForm.controls.name.touched && registerForm.controls.name.errors) && !existingEmail\"\n                class=\"form-validation-wrap\">\n                <div class=\"form-val-note-wrap\">\n                  <span class=\"form-val-input\" *ngIf=\"registerForm.controls.name.errors.required\">Tell us your full\n                    name.</span>\n                </div>\n              </div>\n            </div>\n            <div class=\"login-field mat-input\">\n              <label>E-mail</label>\n              <input matInput ng-blur=\"getRoleEmail()\" type=\"email\" placeholder=\"For example john@gmail.com\"\n                name=\"email\" formControlName=\"email\">\n              <div\n                *ngIf=\"registerForm.submitted || registerForm.controls.email.touched && registerForm.controls.email.errors || existingEmail\"\n                class=\"form-validation-wrap\">\n                <div class=\"form-val-note-wrap\">\n                  <span class=\"form-val-input\" *ngIf=\"registerForm.controls.email.errors.required\">Tell us your\n                    email.</span>\n                  <span class=\"form-val-input\" *ngIf=\"registerForm.controls.email.errors.pattern\">This is not a valid\n                    email.</span>\n                  <!-- <div class=\"email-check\" ng-if=\"existingEmail && form.email.$valid\">\n                    <span class=\"another-role-novalid\">{{existingEmail}}</span>\n                  </div> -->\n                </div>\n              </div>\n            </div>\n            <div class=\"login-field mat-input\">\n              <label class=\"md-block\">Password</label>\n              <input matInput type=\"password\" placeholder=\"*************\" name=\"password\" minlength=\"6\"\n                formControlName=\"password\">\n              <div\n                *ngIf=\"registerForm.submitted || registerForm.controls.password.touched && registerForm.controls.password.errors\"\n                class=\"form-validation-wrap\">\n                <div class=\"form-val-note-wrap\">\n                  <span class=\"form-val-input\" *ngIf=\"registerForm.controls.password.errors.required\">Tell us your\n                    password.</span>\n                  <span class=\"form-val-input\" *ngIf=\"registerForm.controls.password.errors.minlength\">Password can't be\n                    shorter than 6 characters.</span>\n                </div>\n              </div>\n            </div>\n            <div class=\"login-field mat-input\">\n              <label class=\"md-block\">Confirm Password</label>\n              <input matInput type=\"password\" placeholder=\"*************\" name=\"confirmPassword\" minlength=\"6\"\n                formControlName=\"confirm\" pattern=\"{{ registerForm.controls.password.value }}\">\n              <div\n                *ngIf=\"registerForm.submitted || registerForm.controls.confirm.touched && registerForm.controls.confirm.errors\"\n                class=\"form-validation-wrap\">\n                <div class=\"form-val-note-wrap\">\n                  <span class=\"form-val-input\" *ngIf=\"registerForm.controls.confirm.errors.required\">Confirm your\n                    password.</span>\n                  <span class=\"form-val-input\" *ngIf=\"registerForm.controls.confirm.errors.pattern\">Passwords does not\n                    match.</span>\n                </div>\n              </div>\n            </div>\n            <div class=\"login-field mat-input\" *ngIf=\"role !== 'resident'\">\n              <label>Company Name</label>\n              <input matInput type=\"text\" placeholder=\"For example John Doe\" formControlName=\"company\">\n              <div\n                *ngIf=\"(registerForm.submitted || registerForm.controls.company.touched && registerForm.controls.company.errors)\"\n                class=\"form-validation-wrap\">\n                <div class=\"form-val-note-wrap\">\n                  <span class=\"form-val-input\" *ngIf=\"registerForm.controls.company.errors.required\">Please enter\n                    company name.\n                  </span>\n                </div>\n              </div>\n            </div>\n            <div class=\"login-field mat-input\" *ngIf=\"role !== 'agent'\">\n              <label class=\"md-block\">Phone</label>\n              <input matInput placeholder=\"Enter your phone number\" type=\"tel\"\n                mask=\"00 0000 000 000 || 00 0000 0000 || 0000 0000 || 0 000 000 0000\" name=\"phone\" (keypress)=\"enterKey($event)\" ng-change=\"editPhone()\"\n                formControlName=\"phone\">\n              <div class=\"hint\"\n                ng-hide=\"(form.$submitted || form.$dirty) && (!phone.valid || !phone.mask || form.phone.$error.required)\">\n                * International numbers please include country and/or area code</div>\n              <div\n                *ngIf=\"registerForm.submitted || registerForm.controls.phone.touched && registerForm.controls.phone.errors\"\n                class=\"form-validation-wrap\">\n                <div class=\"form-val-note-wrap\">\n                  <span class=\"form-val-input\" *ngIf=\"registerForm.controls.phone.errors.required\">Please enter your\n                    phone number.</span>\n                  <span class=\"form-val-input\" *ngIf=\"registerForm.controls.phone.errors.pattern\">Please enter a correct\n                    phone.</span>\n                </div>\n              </div>\n            </div>\n            <div class=\"login-field mat-input\" *ngIf=\"role === 'resident'\">\n              <label>Verification code</label>\n              <span (click)=\"genVerCode()\" class=\"send-ver-code\">Send code</span>\n              <input matInput type=\"text\" placeholder=\"For example John Doe\" (keypress)=\"enterKey($event)\"\n                formControlName=\"verCode\">\n              <div\n                *ngIf=\"(registerForm.submitted || registerForm.controls.verCode.touched && registerForm.controls.verCode.errors)\"\n                class=\"form-validation-wrap\">\n                <div class=\"form-val-note-wrap\">\n                  <span class=\"form-val-input\" *ngIf=\"registerForm.controls.verCode.errors.required\">Please enter\n                    verification code.\n                  </span>\n                </div>\n              </div>\n            </div>\n            <div class=\"terms-cond-privacy\">\n              <input class=\"terms-checkbox\" type=\"checkbox\" formControlName=\"terms\" aria-label=\"terms\">\n              <span> I agree to the Mimor\n                <a class=\"terms-conditions\" (click)=\"presentModal('terms')\"> Terms and Conditions</a>\n                and\n                <a class=\"terms-conditions\" (click)=\"presentModal('privacy')\"> Privacy Policy</a>.\n              </span>\n            </div>\n            <!-- <div id=\"g_captcha\" tabindex=\"3\" theme=\"clean\" vc-recaptcha key=googlePublicKey\n              on-create=\"setWidgetId(widgetId)\" on-success=\"setResponse(response)\" on-expire=\"cbExpiration()\">\n            </div> -->\n            <div class=\"g_captcha\">\n              <ngx-recaptcha2 #captchaElem [siteKey]=\"siteKey\" (reset)=\"handleReset()\" (expire)=\"handleExpire()\"\n              (load)=\"handleLoad()\" (success)=\"handleSuccess($event)\" [useGlobalDomain]=\"false\" [size]=\"size\"\n              [hl]=\"lang\" [theme]=\"theme\" [type]=\"type\" formControlName=\"recaptcha\">\n            </ngx-recaptcha2>\n            </div>\n          </div>\n          <div class=\"login-buttons\">\n            <button mat-button type=\"button\" class=\"back-btn\" (click)=\"back()\">\n              <mat-icon aria-hidden=\"false\" aria-label=\"back\">keyboard_backspace</mat-icon> Back\n            </button>\n            <button mat-button type=\"submit\" (click)=\"register()\" class=\"submit-btn\"\n              [disabled]=\"loading || registerForm.status === 'INVALID' || !registerForm.value.terms\"\n              aria-label=\"description\">Register</button>\n          </div>\n        </div>\n      </form>\n    </div>\n  </div>\n</ion-content>");

/***/ }),

/***/ 49841:
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/modals/privacy/privacy.html ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<mat-dialog-content class=\"terms\" layout-padding>\n  <p align=\"CENTER\">\n    <u><strong>MIMOR – Privacy Policy</strong></u>\n  </p>\n  <ol class=\"counter_main\">\n    <li>\n      <p align=\"JUSTIFY\">\n        Welcome to MIMOR.\n        MIMOR provides an online destination for residents of particular buildings to access building information,\n        moving procedures and other building related material (<b>MIMOR Platform</b>).\n        We are committed to making access to such building information easier and smoother for you.\n      </p>\n    </li>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        We also understand that your personal information is confidential and sensitive and as such,\n        we are committed to the protection of your privacy. We respect the rights and privacy of all individuals\n        using the MIMOR Platform and we acknowledge the Australian privacy law framework,\n        including the Privacy Act 1988 and the Australian Privacy Principles.\n      </p>\n    </li>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        The following privacy policy will demonstrate how we protect your personal information and the choices you have\n        about how it is used.\n        We urge you to read this privacy policy so you will understand your choices and our commitment to protecting\n        your privacy.\n      </p>\n    </li>\n\n    <p align=\"JUSTIFY\">\n      <strong>What is personal information?</strong>\n    </p>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        “Personal information” means information or an opinion, whether true or not, and whether recorded in a material\n        form or not,\n        about an identified individual or an individual who is reasonably identifiable from the information or opinion.\n      </p>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        The personal Information that we may collect includes but is not limited to:\n      </p>\n      <ol type=\"a\">\n        <li>\n          <p align=\"JUSTIFY\">\n            ‘contact information’, such as your name, phone numbers, address details, and email address; and\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            your age, date of birth, gender and car registration.\n          </p>\n        </li>\n      </ol>\n    </li>\n\n    <p align=\"JUSTIFY\">\n      <strong>How does MIMOR collect personal information</strong>\n    </p>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        We collect personal information from you as part of the registration process on the MIMOR Platform.\n      </p>\n    </li>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        MIMOR may also collect your personal information via its social media pages, smart phone applications, phone\n        calls, emails and at or via other promotional displays or campaigns (<b>Collection Channels</b>).\n      </p>\n    </li>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        Most of the personal information collected via our Collection Channels is stored on MIMOR’s database\n      </p>\n    </li>\n\n    <p align=\"JUSTIFY\">\n      <strong>Why does MIMOR collect personal information? </strong>\n    </p>\n\n\n    <li>\n      <p align=\"JUSTIFY\">\n        MIMOR generally collects personal information in order to provide an easy to use platform so that residents can\n        access the correct building information, moving procedures and other building related material. We also collect\n        personal information to inform you about the MIMOR Platform and provide you with information that is relevant to\n        your building.\n      </p>\n    </li>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        MIMOR must also collect personal information to comply with its various contractual and other legal obligations,\n        in order to run marketing activities, respond to your enquiries, generally administer the MIMOR Platform and\n        provide you with information about other products and services that may be of interest to you.\n      </p>\n    </li>\n\n    <p align=\"JUSTIFY\">\n      <strong>How we use personal information</strong>\n    </p>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        We may use your personal information for the primary purpose for which it was collected, i.e. to provide you\n        with access to, and to enable you to use, the MIMOR Platform. We may also use your personal information for\n        purposes related reasonably related to this primary purpose which may include but is not limited to:\n      </p>\n      <ol type=\"a\">\n        <li>\n          <p align=\"JUSTIFY\">\n            providing you with information about the building in which you reside;\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            providing you with information about MIMOR;\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            administering MIMOR’s relationship with you;\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            monitoring online activity on the MIMOR Platform and/or any other of its application(s);\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            marketing, improving and adding to the MIMOR Platform and other MIMOR services and offerings; and\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            purposes required or authorised by law.\n          </p>\n        </li>\n      </ol>\n    </li>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        MIMOR may disclose your personal information to other entities with whom it contracts.\n      </p>\n    </li>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        MIMOR may also provide personal information:\n      </p>\n      <ol type=\"a\">\n        <li>\n          <p align=\"JUSTIFY\">\n            to third parties with whom MIMOR contracts in order to provide the MIMOR Platform; and\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            to third parties authorised by you to receive personal information held by us.\n          </p>\n        </li>\n      </ol>\n    </li>\n\n    <p align=\"JUSTIFY\">\n      <strong>Will you receive direct marketing?</strong>\n    </p>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        If you provide us with your personal information and you consent to receiving direct marketing communications\n        from MIMOR and/or third parties, you authorise us to potentially send you promotional messages and materials\n        related to MIMOR’s products and services (and if applicable, third parties’ products and services).\n      </p>\n    </li>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        MIMOR’s direct marketing messages and materials will contain a prominent statement (including, for electronic\n        messages, a functional unsubscribe facility) that you may request not to receive direct marketing\n        communications.\n      </p>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        If you do not wish to receive direct marketing or other communications from us, please opt out using the\n        unsubscribe facility provided in the most recent direct marketing communication from us or contact us on the\n        details provided within this privacy policy.\n      </p>\n    </li>\n\n    <p align=\"JUSTIFY\">\n      <strong>Will your information be disclosed overseas?</strong>\n    </p>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        MIMOR is unlikely to disclose your personal information to any person or entity outside Australia, but will\n        inform you if and when this is necessary.\n      </p>\n    </li>\n\n    <p align=\"JUSTIFY\">\n      <strong>Does MIMOR use “cookies”?</strong>\n    </p>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        Yes. When you use the MIMOR platform and any related MIMOR websites, MIMOR or its IT service providers may\n        obtain information using technologies such as cookies, tags, web beacons, and navigational data collection (log\n        files, server logs, and clickstream data). For example, MIMOR or its IT service providers may collect\n        information like the date, time and duration of visits and which webpages are accessed.\n      </p>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        This information is generally not linked to your identity, except where it is accessed via links in a MIMOR\n        e-message or where you have identified yourself.\n      </p>\n    </li>\n\n    <p align=\"JUSTIFY\">\n      <strong>Storage of personal information</strong>\n    </p>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        We recognise that personal privacy is of the utmost importance in this day and age and therefore we aim to keep\n        your personal information both safe and secure at all times.\n      </p>\n    </li>\n\n    <p align=\"JUSTIFY\">\n      <strong>How to correct and access personal information</strong>\n    </p>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        If you provided us with your personal information, you can update that personal information by contacting us in\n        accordance with paragraph 24 below. We will update the personal information that we hold about you in accordance\n        with any request or updated details that you provide to us.\n      </p>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        You are entitled to access the personal information that we hold about you. You can request access to the\n        personal information by contacting us in accordance with clause 24 below.\n      </p>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        Please note there may be some legal or administrative reasons to deny access. If we refuse your request to\n        access your personal information, we will provide you with the reasons for the refusal. For example, the privacy\n        laws set out some circumstances in which MIMOR would not be required to provide you with such access. If you ask\n        for your personal information and any of these circumstances exist, we will advise you of these matters and you\n        may be given access to the personal information in a way that is permitted under the Privacy Act 1988.\n      </p>\n    </li>\n\n    <p align=\"JUSTIFY\">\n      <strong>Who to contact at MIMOR about privacy matters</strong>\n    </p>\n\n    <li>\n      <p align=\"JUSTIFY\">\n        If you would like to access the personal information that we hold about you, have a complaint or would like\n        further information about this privacy policy, you can contact us by email at: <a\n          href='mailto:info@mimor.com.au'>info@mimor.com.au</a>. We encourage you to provide updates to MIMOR with\n        respect to your personal information so that MIMOR has accurate, current and complete information.\n      </p>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        We will investigate your queries and provide you with a response within a reasonable period of time.\n      </p>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        To protect personal information held by MIMOR, you may need to confirm your identity before access to your\n        personal information is granted. It may take a little time to process your application for access and retrieve\n        information from storage (if applicable).\n      </p>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        If you have any queries in relation to this privacy policy you should contact us at <a\n          href=\"mailto:info@mimor.com.au\">info@mimor.com.au</a>.\n      </p>\n    </li>\n  </ol>\n</mat-dialog-content>\n<mat-dialog-actions align=\"center\" class=\"terms-button login-buttons\">\n  <button mat-button (click)=\"dismiss()\" class=\"mat-btn back-btn\">\n    <mat-icon aria-hidden=\"false\" aria-label=\"back\">keyboard_backspace</mat-icon> Back\n  </button>\n</mat-dialog-actions>\n");

/***/ }),

/***/ 91815:
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/modals/terms/terms.html ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<mat-dialog-content class=\"terms\" layout-padding>\n  <p align=\"CENTER\">\n    <u><strong>MASTER SUBSCRIPTION AGREEMENT</strong></u>\n  </p>\n  <ol class=\"counter_main\">\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Application</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            This Master Subscription Agreement (“ <strong>Agreement</strong>”) is a legal agreement between\n            the entity by whom you are employed, or whom you represent\n            (“<strong>Subscriber</strong>”) and Mimor Pty Ltd (ACN 625\n            314 427) ATF Mimor Unit Trust (\"<strong>Mimor</strong>\").\n            It governs the obligations and rights of Subscriber and\n            Mimor.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            By accepting these terms and conditions in one of the\n            following ways: (i) by paying or signing an invoice\n            containing these terms and conditions, or (ii) via an\n            online sign up or registration procedure, or (iii) by\n            accepting these terms and conditions in any other way, you\n            confirm and agree that you are authorised to bind the\n            Subscriber, and that Subscriber will be bound by the terms\n            and conditions set out in this Agreement.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            If you do not agree to the terms and conditions in this\n            Agreement, you must not pay or sign the invoice or accept\n            the terms and conditions through the online sign up or\n            registration procedure, and you may not use the Service.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            This Agreement will be effective from the date that an\n            account for the Subscriber is created (“ <strong>Effective Date</strong>”).\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Definitions</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            In this Agreement, unless the context requires otherwise:\n          </p>\n          <ol type=\"a\">\n            <li>\n              <p align=\"JUSTIFY\">\n                <strong>Data</strong>\n                means any data, information, material or content provided, posted\n                or submitted through the Mimor Platform as part of the Subscriber’s\n                account.\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                <strong>Further Term/s</strong>\n                means the further term/s of this Agreement as set out in clause\n                12.4.\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                <strong>Initial Term</strong>\n                means the initial term of this Agreement as set out in clause 12.\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                <strong>Intellectual Property Rights</strong>\n                means any unpatented inventions, patent applications, patents,\n                design right, copyrights, trademarks, trade names, domain name\n                rights, know how and other trade secret rights and all other\n                intellectual property rights and forms of protection of a similar\n                nature anywhere in the world.\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                <strong>Licence</strong>\n                means the licence granted to Subscriber pursuant to clause 3.1 of\n                this Agreement.\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                <strong>Mimor Platform </strong>\n                means all of the proprietary technology in Mimor’s platform and\n                website (including software, websites, processes, algorithms, user\n                interfaces, know how, techniques, designs and other tangible or\n                intangible technical material or information) made available to\n                Subscriber by Mimor in providing the Service.\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                <strong>Payment Schedule</strong>\n                means the schedule for payment as set out in clause 8.3.\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                <strong>Service</strong>\n                means the online, web based service identified during the ordering\n                process developed, operated and maintained by Mimor and accessible\n                at mimor.com.au to which Subscriber is being granted access\n                pursuant to this Agreement, and including the Mimor Platform.\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                <strong>Subscription Fee</strong>\n                means the fee set out in clause 8.1 of this Agreement.\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                <strong>User</strong>\n                means the persons authorised to use the Service and whom have been\n                provided user identifications and passwords to upload and post\n                content to the buildings being managed under the Subscriber’s\n                account.\n              </p>\n            </li>\n          </ol>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Licence </strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subject to the terms and conditions of this Agreement,\n            Mimor grants to the Subscriber a non-transferable,\n            non-exclusive, revocable and limited licence to use the\n            Mimor Platform, the Service and the Data for Subscriber’s\n            own internal business and management purposes (“ <strong>Licence”</strong>).\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            <a name=\"_Ref521343985\"></a>\n            This Agreement entitles the Subscriber the limited,\n            revocable right to access the Service through the use of a\n            single administrator account. Subscriber may share its\n            account with other administrators but is responsible for\n            all activities and use of the Service through the\n            Subscriber’s account (including the use of the Mimor\n            Platform and the Service by other administrators to which\n            the Subscriber has provided access to its account).\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Restrictions</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber must not:\n          </p>\n          <ol type=\"a\">\n            <li>\n              <p align=\"JUSTIFY\">\n                license, sublicense, sell, resell, transfer, assign, distribute, or\n                otherwise commercially exploit or make available to any third party\n                the Service or the Data in any way;\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                access the Service in order to\n              </p>\n            </li>\n            <ol type=\"i\">\n              <li>\n                <p align=\"JUSTIFY\">\n                  build a competitive product or service,\n                </p>\n              </li>\n              <li>\n                <p align=\"JUSTIFY\">\n                  build a product using similar ideas, features, functions or\n                  graphics of the Service, or\n                </p>\n              </li>\n              <li>\n                <p align=\"JUSTIFY\">\n                  copy any ideas, features, functions or graphics of the Service.\n                </p>\n              </li>\n            </ol>\n          </ol>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber must not use the Service to:\n          </p>\n          <ol type=\"a\">\n            <li>\n              <p align=\"JUSTIFY\">\n                send spam or otherwise duplicative or unsolicited messages in\n                violation of applicable laws;\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                send or store infringing, obscene, threatening, defamatory, or\n                otherwise unlawful material, including material harmful that\n                violates third party privacy rights;\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                send or store material containing software viruses, worms or other\n                harmful computer code, files, scripts, agents, or programs; or\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                interfere with or disrupt the integrity or performance of the\n                Service or the Data contained therein.\n              </p>\n            </li>\n          </ol>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber must not (and any person representing or acting on\n            behalf of Subscriber must not):\n          </p>\n          <ol type=\"a\">\n            <li>\n              <p align=\"JUSTIFY\">\n                post content to the Mimor Platform that is:\n              </p>\n            </li>\n            <ol type=\"i\">\n              <li>\n                <p align=\"JUSTIFY\">\n                  hate speech or racially offensive;\n                </p>\n              </li>\n              <li>\n                <p align=\"JUSTIFY\">\n                  threatening, intimidating or abusive;\n                </p>\n              </li>\n              <li>\n                <p align=\"JUSTIFY\">\n                  pornographic, profane or contains nudity or graphic or gratuitous\n                  violence;\n                </p>\n              </li>\n              <li>\n                <p align=\"JUSTIFY\">\n                  likely to or intended to incite violence;\n                </p>\n              </li>\n            </ol>\n          </ol>\n          <ol type=\"a\" start=\"2\">\n            <li>\n              <p align=\"JUSTIFY\">\n                use the Mimor Platform for any improper or unlawful purpose,\n                including:\n              </p>\n            </li>\n            <ol type=\"i\">\n              <li>\n                <p align=\"JUSTIFY\">\n                  stalking, harassing, bullying or discriminating against other\n                  users;\n                </p>\n              </li>\n              <li>\n                <p align=\"JUSTIFY\">\n                  misleading or deceptive conduct, defamation, or a breach of\n                  confidence.\n                </p>\n              </li>\n            </ol>\n          </ol>\n          <ol type=\"a\" start=\"3\">\n            <li>\n              <p align=\"JUSTIFY\">\n                impersonate any other person or entity whilst using the Mimor\n                Platform;\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                upload viruses or other malicious code designed to damage the Mimor\n                Platform or the Service;\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                post any links to other websites on the Mimor Platform;\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                do anything that could disable, overburden, or impair the proper\n                working or appearance of the Mimor Platform;\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                copy or reverse engineer the Mimor Platform or any aspect of the\n                Mimor platform;\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                collect content from the Mimor Platform via any manual or automated\n                means (including harvesting bots, robots, spiders, or scrapers); or\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                post unauthorised commercial communications (such as ‘spam’ or\n                advertisements) on the Mimor Platform.\n              </p>\n            </li>\n          </ol>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber must not (and any person representing or acting on\n            behalf of Subscriber must not) use any personal information\n            (including, but not limited to names, locations, phone numbers\n            and any email addresses) that appear on the Mimor Platform to\n            send unsolicited commercial electronic messages or other\n            communications from the Subscriber or other third parties.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Intellectual Property Ownership</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Mimor exclusively owns all right, title, and interest,\n            including all related Intellectual Property Rights, in and\n            to the Mimor Platform, the Service and the Data. All\n            content uploaded to, transferred through, publicly posted,\n            processed or entered into the Mimor Platform by the\n            Subscriber and/or any User is the sole property of Mimor.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            This Agreement does not grant to Subscriber any rights of\n            ownership in or related to the Service, the Mimor Platform\n            or the Data.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            This Agreement does not grant to Subscriber any rights in\n            relation to, or licence to use, Mimor’s logos and trade\n            marks.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Subscriber Responsibilities</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber is responsible for all activity occurring under\n            Subscriber’s Licence (including the use of the Mimor\n            Platform and the Service by other administrators to which\n            the Subscriber has provided access to its account) and must\n            abide by all applicable laws and regulations in connection\n            with Subscriber’s use of the Mimor Platform, the Service\n            and the Data, including those related to privacy.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber must:\n          </p>\n          <ol type=\"a\">\n            <li>\n              <p align=\"JUSTIFY\">\n                notify Mimor immediately of any unauthorised use of any password or\n                account or any other known or suspected breach of security;\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                report to Mimor immediately and use reasonable efforts to stop\n                immediately any copying or distribution of Data that is known or\n                suspected by Subscriber; and\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                not impersonate another user or provide false identity information\n                to gain access to or use the Service.\n              </p>\n            </li>\n          </ol>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            All content uploaded to, transferred through, publicly posted,\n            processed or entered into the Services by the Subscriber and/or\n            Users shall be the responsibility of the Subscriber.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber shall be responsible for monitoring the content\n            posted to or under its account and is liable for ensuring that\n            content transferred to or handled within the Services by\n            Subscriber and/or Users does not infringe any third party\n            rights nor in any other manner violates governing legislation.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber acknowledges that it is not permitted to use the\n            Services in breach of, or in order to gain material in\n            violation of, any applicable law.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber is obligated to notify Mimor regarding any suspected\n            breach of these provisions by a User.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Account Information and Data</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber does not own the Data but has a license to use\n            it and view it in connection with this Agreement.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            <a name=\"_Ref521339057\"></a>\n            Notwithstanding clause 7.1, Subscriber, not Mimor, has sole\n            responsibility for the accuracy, quality, integrity,\n            legality, reliability, and appropriateness of all Data, and\n            Mimor shall not be responsible or liable for the deletion,\n            correction, destruction, damage, loss or failure of any\n            Data pursuant to this Agreement.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            If this Agreement is terminated (other than by reason of\n            Mimor’s breach), Subscriber’s right to access and use the\n            Data will immediately cease, and Mimor shall have no\n            obligation to maintain or forward any Data to Subscriber.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Mimor may share the Subscriber’s account information with\n            another person or User in order that they may manage the\n            Subscriber’s Licence.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Charges and Payment </strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            In exchange for the Licence, Subscriber must pay the\n            subscription fees and charges invoiced to Subscriber (“ <strong>Subscription Fee</strong>”).\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            The Subscription Fee is payable annually in advance for the\n            Initial Term and any Further Term/s.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber is responsible for paying the Subscription Fee\n            for the Term and any Further Term/s in accordance with the\n            deadlines set out in any invoice issued to the Subscriber\n            by Mimor (“<strong>Payment Schedule</strong>”).\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            <a name=\"_Ref521344070\"></a>\n            Mimor will automatically issue an invoice to the Subscriber\n            at or prior to the beginning of the Initial Term (and any\n            Further Term as applicable).\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            All obligations on the Subscriber to pay the Subscription\n            Fee cannot be cancelled and all amounts paid are\n            non-refundable.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Unless otherwise stated, Mimor’s fees are exclusive of GST.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Alteration of Subscription Fees</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Mimor reserves the right to modify its Subscription Fees\n            and to introduce new charges at any time. Subscriber will\n            be notified of any changes to the Subscription Fees by\n            Mimor in the form of an email or via an invoice setting out\n            the new Subscription Fees.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Non-payment and Suspension of Subscriber’s Account</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber agrees to provide Mimor with complete and\n            accurate billing and contact information. The provision of\n            billing information may include Subscriber’s credit card\n            details (if applicable), its legal company name, street\n            address, email address, and name and telephone number of an\n            authorised billing contact and Licence administrator.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber agrees to update Mimor of any changes to the\n            billing information within 10 days of any such change.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            In addition to any other legal remedies available to it,\n            Mimor may suspend or terminate this Agreement, revoke the\n            Subscriber’s Licence and restrict Subscriber’s access to\n            the Service if:\n          </p>\n          <ol type=\"a\">\n            <li>\n              <p align=\"JUSTIFY\">\n                <a name=\"_Ref521339294\"></a>\n                Subscriber has not paid the Subscription Fees in accordance with\n                the Payment Schedule; or\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                Subscriber has provided false or fraudulent information to Mimor.\n              </p>\n            </li>\n          </ol>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Mimor reserves the right to impose a reconnection fee in the\n            event Mimor takes action pursuant to clause 10.3 and Subscriber\n            thereafter requests re-access to the Service.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            For the avoidance of doubt, Subscriber agrees and acknowledges\n            that Mimor retains ownership in all Data in the event of\n            termination or suspension pursuant to this clause 10.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Availability and Updates to the Service </strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subject to the terms and conditions of this Agreement,\n            Mimor will use best efforts to provide Subscriber with\n            continuous and uninterrupted access to the Service.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Mimor will endeavour to provide reasonable notice in\n            advance to Subscriber of any planned periods of disruption\n            to the Service.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            <a name=\"_Ref521339402\"></a>\n            Subject to clause11.2, Mimor reserves the right to update\n            and modify features of the Service at any time without\n            notice.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Term and Termination </strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            <a name=\"_Ref521343744\"></a>\n            The Agreement commences on the Effective Date.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Unless otherwise agreed in writing by Mimor and the\n            Subscriber, the initial term of this Agreement (“ <strong>Initial Term</strong>”), and any Further Terms\n            pursuant to clause 12.4, will be for a period of twelve\n            months.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            The Subscriber may only terminate this Agreement at the end\n            of the Initial Term (or any Further Term pursuant to clause\n            12.4) by providing Mimor with written notice at least 14\n            days prior to the end of the Initial Term or Further Term\n            (as the case may be).\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            <a name=\"_Ref521339487\"></a>\n            If the Subscriber does not provide written notice in\n            accordance with clause 12.3, this Agreement will be\n            automatically extended for consecutive periods each of\n            twelve months on each anniversary of the Effective Date (“ <strong>Further Term/s</strong>”), until such\n            time as the\n            Subscriber provides Mimor with written notice in accordance\n            with clause 12.3.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <a name=\"_Ref521339432\"></a>\n        <strong>Termination for Cause.</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Any breach of Subscriber’s obligation to pay the\n            Subscription Fees or to prohibit unauthorised use of the\n            Mimor Platform or Service will be deemed a material breach\n            of this Agreement.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Mimor, in its sole discretion, may terminate Subscriber’s\n            password, account or use of the Service and/or the Mimor\n            Platform if Subscriber materially breaches this Agreement.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Representations and Warranties.</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Each party represents and warrants that it has the legal\n            power and authority to enter into this Agreement.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber represents and warrants that Subscriber has not\n            provided any false information to gain access to the\n            Service and that Subscriber’s billing information is\n            correct.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Indemnity</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber indemnifies and holds Mimor and its officers,\n            directors and employees harmless from and against any and\n            all claims, costs, damages, losses, liabilities, and\n            expenses arising out of or in connection with:\n          </p>\n          <ol type=\"a\">\n            <li>\n              <p align=\"JUSTIFY\">\n                a claim alleging that use of the Data or the Service infringes the\n                rights of, or has caused harm to, a third party;\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                a claim which would constitute a breach of Subscriber’s\n                representations and warranties (including those set out in clause\n                1); or\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                a claim arising from a breach of this Agreement by Subscriber.\n              </p>\n            </li>\n          </ol>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Disclaimer of Warranties by Mimor</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            To the maximum extent permitted by law, Mimor makes no\n            representation, warranty, or guaranty that:\n          </p>\n          <ol type=\"a\">\n            <li>\n              <p align=\"JUSTIFY\">\n                the use of the Service will be secure, uninterrupted, or error\n                free;\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                the Service will be fit for the purpose required by Subscriber; or\n              </p>\n            </li>\n            <li>\n              <p align=\"JUSTIFY\">\n                any data stored or generated through the Service will be accurate.\n              </p>\n            </li>\n          </ol>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            The Service and all Data is provided to Subscriber strictly on\n            an “as is” basis\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            To the maximum extent permitted by law, all conditions,\n            representations and warranties whether express, implied,\n            statutory or otherwise including without limitation, any\n            implied warranty of merchantability fitness for purpose, or\n            non-infringement of third party rights, are hereby excluded by\n            Mimor.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Internet Delays</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            The Service may be subject to limitations, delays, outages\n            and other problems inherent in the use of the internet and\n            electronic communications. Subscriber agrees that Mimor is\n            not responsible for any such delays, delivery failures or\n            other damage resulting from such problems.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Limitation of Liability</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            <a name=\"_Ref521340193\"></a>\n            To the maximum extent permitted by law, Subscriber agrees\n            that for all loss or damage sustained by Subscriber in\n            relation to this Agreement (including interest and costs),\n            Mimor’s liability shall be limited to the actual amount\n            paid by the Subscriber in Subscription Fees pursuant to\n            this Agreement (excluding GST).\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            This limitation applies to all liability - whether (without\n            limitation) for negligence or for breach of the CCA, the\n            Corporations Act 2001; and is modified, or expanded in this\n            clause 18 below.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Mimor is not liable for any loss or damage sustained by\n            Subscriber for any indirect or consequential costs, loss or\n            damage or loss of profits arising out of or in any way\n            connected with the Service or this Agreement including but\n            not limited to the use or inability to use the Service or\n            for any content obtained from or through the Service, even\n            if Mimor has been previously advised of the possibility of\n            such damages.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Confidentiality</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            During this Agreement, Mimor may provide non-public\n            information (“<strong>Confidential Information</strong>”)\n            to Subscriber.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber must not disclose Confidential Information or\n            any of the terms and conditions forming part of this\n            Agreement (including the pricing offered to Subscriber) to\n            any third party, other than Subscriber’s professional\n            advisors unless required by law or Mimor has consented in\n            writing to such disclosure.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Both parties agree to protect Confidential Information\n            against unauthorised disclosure by using the same degree of\n            care as it takes to preserve and safeguard its own\n            confidential information of a similar nature, being at\n            least a reasonable degree of care.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Assignment of Agreement </strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Mimor reserves the right, without consent, to assign all of\n            its rights and obligations under this Agreement to a third\n            party upon providing to Subscriber not less than 28 days’\n            notice.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber agrees to take all reasonable steps required to\n            assign this Agreement including the execution of a new\n            authority if required.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Law &amp; Jurisdiction</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber and Mimor acknowledge and accept that this\n            Agreement shall be construed and interpreted in accordance\n            with the laws of Victoria, Australia and both parties agree\n            to submit to the exclusive jurisdiction of the courts of\n            Victoria in the event of any dispute.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Severability</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Subscriber and Mimor agree that if any term or provision of\n            this Agreement is held invalid, void or unenforceable, then\n            that provision will be considered severable and the\n            remaining terms and provisions shall continue to be\n            binding.\n          </p>\n        </li>\n      </ol>\n    </li>\n    <li>\n      <p align=\"JUSTIFY\">\n        <strong>Force Majeure</strong>\n      </p>\n      <ol class='counter_sub'>\n        <li>\n          <p align=\"JUSTIFY\">\n            Mimor will not be liable for any failure to perform its\n            obligations under this Agreement caused by factors outside\n            its control.\n          </p>\n        </li>\n        <li>\n          <p align=\"JUSTIFY\">\n            Mimor will take all reasonable steps to mitigate the\n            failure to perform its obligations.\n          </p>\n        </li>\n      </ol>\n    </li>\n  </ol>\n</mat-dialog-content>\n<mat-dialog-actions align=\"center\" class=\"terms-button login-buttons\">\n  <button mat-button (click)=\"dismiss()\" class=\"mat-btn back-btn\">\n    <mat-icon aria-hidden=\"false\" aria-label=\"back\">keyboard_backspace</mat-icon> Back\n  </button>\n</mat-dialog-actions>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_auth_auth_module_ts.js.map