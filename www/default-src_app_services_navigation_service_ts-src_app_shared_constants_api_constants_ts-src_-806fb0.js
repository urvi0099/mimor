(self["webpackChunkmimor_ionic"] = self["webpackChunkmimor_ionic"] || []).push([["default-src_app_services_navigation_service_ts-src_app_shared_constants_api_constants_ts-src_-806fb0"],{

/***/ 89565:
/*!************************************************!*\
  !*** ./src/app/services/navigation.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NavigationService": () => (/* binding */ NavigationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ 39895);




let NavigationService = class NavigationService {
    constructor(router, location) {
        this.router = router;
        this.location = location;
        this.history = [];
        this.router.events.subscribe((event) => {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_0__.NavigationEnd) {
                this.history.push(event.urlAfterRedirects);
            }
        });
    }
    back() {
        this.history.pop();
        if (this.history.length > 0) {
            this.location.back();
        }
        else {
            this.router.navigateByUrl('/');
        }
    }
};
NavigationService.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_0__.Router },
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_1__.Location }
];
NavigationService = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)({ providedIn: 'root' })
], NavigationService);



/***/ }),

/***/ 73121:
/*!***************************************************!*\
  !*** ./src/app/shared/constants/api.constants.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "API": () => (/* binding */ API)
/* harmony export */ });
const API = {
    agent: {
        searchBuilding: '/api/client/buildingByName?text=',
        isTrustedEmail: '/api/agent/isTrustedEmail/',
        getContDetails: '/api/client/get_cont_details/',
        getBuilding: '/api/agent/getBuilding/',
        sendGuidelines: '/booking/sendGuidelines?buildingId=',
        askInfo: '/booking/askQuest4?id=',
        getProfile: '/profile/get',
        saveProfile: '/profile/save'
    },
    client: {
        isAccountCloned: '/auth/isAccountCloned',
        switchToManager: '/auth/switchToManager',
        isCustomBuildingSession: '/auth/isCustomBuildingSession',
        showCommonAreas: '/booking/show_common_areas/',
        askQuestion: '/booking/askQuest3?id=',
        sendGuidelines: '/booking/sendGuidelines?buildingId=',
        askInfo: '/booking/askQuest4?id=',
        createBooking: '/booking/create',
        getBooking: '/booking/get',
        getLastBooking: '/booking/get?profile_screen=true&lastBooking=',
        getProfile: '/profile/get',
        saveProfile: '/profile/save',
        apartments: '/api/client/apartments',
        setApartment: '/api/client/setApartment',
        deleteCommonAreaBooking: '/api/client/deleteCommonAreaBooking/',
        getArea: '/api/client/getArea',
        getAreaFreeHours: '/api/client/getAreaFreeHours?date=',
        saveCommonAreaBooking: '/api/client/saveCommonAreaBooking',
        getBookingInfo: '/api/client/get_booking_info/',
        getBlockBuild: '/api/client/get_block_build',
        getHours: '/api/client/getHours',
        bookLift: '/api/client/book_lift',
        sendToEmail: '/api/client/sendToEmail/',
        getInfo: '/api/client/getInfo',
        buildingByName: '/api/client/buildingByName?text=',
        selectBuilding: '/api/client/selectBuilding',
        nonResidingBooking: '/api/client/non_residing_booking',
        changeSubRole: '/api/client/changeSubRole',
        saveSubRole: '/api/client/saveSubRole',
        setUserData: '/api/client/set_user_data',
        getNoticeNumber: '/api/client/get_notice_number/',
        getContDetails: '/api/client/get_cont_details/',
        getMoveStatus: '/api/client/getMoveStatus',
        readyQuestionYes: '/api/client/readyQuestionYes',
        saveBooking: '/api/client/saveBooking',
        setPhone: '/api/client/setPhone',
        getBuildingName: '/api/client/getBuildingName/',
        getNoticeList: '/api/client/getNoticeList/',
        getNotice: '/api/client/getNotice/'
    },
    guest: {
        forgot: '/auth/forgot',
        login: '/auth/login',
        isCustomBuildingSession: '/auth/isCustomBuildingSession',
        checkRoleEmail: '/auth/check_role_email',
        captcha: '/auth/g_captcha?captcha=',
        getVerifyCode: '/auth/getVerifyCode',
        tenantRegister: '/auth/tenant_register',
        tokenExists: 'auth/register/token_exists',
        registerManagerMail: '/auth/register/manager_from_mail',
        register: '/auth/register',
        resetPassword: '/auth/reset-password'
    },
    manager: {
        isLogSwitchAvail: '/auth/isLogSwitchAvail',
        getProfile: '/profile/get',
        saveProfile: '/profile/save/',
        services: '/api/services',
        carriers: '/api/carriers',
        deletePendingShare: '/api/share_building/delete_pending_share/',
        deleteShare: '/api/share_building/delete_share/',
        getBookingDelay: '/api/get_booking_delay/',
        getTimesType: '/api/get_times_type/',
        getDays: '/api/get_days/',
        getTimes: '/api/get_times/',
        shareBuilding: '/api/share_building/',
        shareBuildingExtract: '/api/share_building/extract/',
        getBuildingTimes: '/api/get_building_times/',
        setBuildingTimes: '/api/set_building_times/',
        showCommonAreas: '/booking/show_common_areas/',
        getBuilding: '/api/manager/getBuilding/',
        info: '/api/manager/info/',
        getBuildings: '/api/manager/getBuildings/',
        addEmailPhone: '/api/manager/addEmailPhone/',
        addEmail: '/api/manager/addEmail/',
        saveAddress: '/api/manager/saveAddress',
        buildingTrades: '/api/manager/building//trades/',
        getBuildingApartments: '/api/manager/getBuildingApartments/',
        saveApartments: '/api/manager/saveApartments/',
        subscriptionInfo: '/api/manager/subscription-info?building_id=',
        paymentPlans: '/api/manager/payment/plans',
        filterBuildings: '/api/manager/filter_buildings?search_text=',
        getCommonAreas: '/api/manager/get_common_areas/',
        getCalendar: '/api/manager/getCalendar/',
        deleteCommonArea: '/api/manager/delete_common_area_file/',
        saveCommonAreas: '/api/manager/save_common_areas/',
        deletePDF: '/api/manager/deletePdf/',
        triggerHiddenStatusGuide: '/api/manager/triggerHiddenStatusGuide/',
        saveInfo: '/api/manager/saveInfo/',
        getActiveBookings: '/api/manager/getActiveBookings/',
        moveOutCustomers: '/api/manager/moveOutCustomers/',
        sendMoveOutEmails: '/api/manager/sendMoveOutEmails/',
        getTempData: '/api/manager/getTempData',
        saveName: '/api/manager/saveName',
        getNoticeList: '/api/manager/getNoticeList/',
        getNotice: '/api/manager/getNotice/',
        deleteNotice: '/api/manager/deleteNotice/',
        deleteNoticeFile: '/api/manager/deleteNoticeFile/',
        saveNotice: '/api/manager/saveNotice/',
        sendNotification: '/api/manager/sendNotification/',
        setupPayment: '/api/manager/setup-payment/',
        createSubscription: '/api/manager/create-subscription',
        saveBuildingStatus: '/api/manager/saveBuildingStatus/',
        getPlans: '/api/manager/getPlans',
        selectPlan: '/api/manager/selectPlan',
        getReport: '/api/manager/getReport/',
        triggerNotifyShared: '/api/manager/trigger_notify_shared/',
        addTrustedEmail: '/api/manager/addTrustedEmail/',
        triggerNotify: '/api/manager/trigger_notify_re/',
        deleteTrustedEmail: '/api/manager/deleteTrustedEmail/',
        checkUploadSize: '/api/manager/check_upload_size/',
        getCommonAreaTimeslots: '/api/manager/get_common_area_timeslots/',
        saveCommonAreaTimes: '/api/manager/save_common_area_times/',
        setCustomUrl: '/api/manager/setCustomUrl/',
        getActiveBuildingUsers: '/api/manager/getActiveBuildingUsers/',
        loginAsResident: '/api/manager/loginAsResident/',
        getDefaultCompanyTitle: '/api/manager/getDefaultCompanyTitle',
        setEmailCompanyTitle: '/api/manager/setEmailCompanyTitle/',
        saveEmailLogo: '/api/manager/saveEmailLogo',
        triggerCategoriesHiddenStatus: '/api/manager/triggerCategoriesHiddenStatus/',
        triggerCatHiddenStatus: '/api/manager/triggerCatHiddenStatus/',
        notificationSettings: '/api/manager/parcels/notification-settings',
        parcels: '/api/manager/parcels',
        generateCsv: '/api/manager/generate_csv/',
        catchBuildAddress: '/api/client/catch_build_address',
        getHours: '/api/client/getHours',
        selectBuilding: '/api/client/selectBuilding/',
        saveManagerBooking: '/api/client/saveManagerBooking',
        sendToEmail: '/api/client/sendToEmail/',
        deleteManagerBooking: '/api/client/deleteManagerBooking/',
        getAreaFreeHours: '/api/client/getAreaFreeHours',
        saveCommonAreaBooking: '/api/client/saveCommonAreaBooking',
        deleteCommonAreaBooking: '/api/client/deleteCommonAreaBooking/',
        setCommonAreasAllowed: '/api/set-com-area-allowed'
    }
};


/***/ }),

/***/ 65243:
/*!******************************************************!*\
  !*** ./src/app/shared/constants/errors.constants.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ERROR": () => (/* binding */ ERROR)
/* harmony export */ });
const ERROR = {
    internal: 'Server has got an error. Please try later.',
    address: 'We couldn`t find your address on the map. Please enter valid one.',
    imageExt: 'Wrong file format. You can download only jpg, jpeg, png.',
    maxSize: 'Maximum file size (2M) was exceeded.',
    unauthorized: 'Your session has expired. Please login to continue',
    emptyFile: 'The file you are trying to upload is empty',
    apartments: {
        emptyManual: 'Please enter the number of apartment to add',
        numberExists: 'This apartment already exists in this building',
        chooseStyle: 'Please select numbering style',
        setStart: '"Start" should be a valid number',
        setFinish: '"Finish" should be a valid number',
        limitReached: 'You have reached limit for your tariff plan',
        startGreater: '"Start" should not be greater then or equal "Finish"',
        levelExists: 'This level already exists in this building',
        createLevel: 'You got no level selected. To add apartments please create one.'
    },
    moveIn: 'You can\'t book a Moving In as you haven\'t moved out of apartment yet',
    movedInAlready: 'You have already moved in this apartment',
    moveOut: 'You can\'t book a Moving Out as you haven\'t moved into apartment yet',
    movedOutAlready: 'You have already moved out this apartment',
    movingOut: 'You can\'t do this while moving out',
    fileExt: 'Wrong file format. You can upload only jpeg, jpg, png or PDF.',
    maxGuidelinesDirSize: 'Your upload limit for guidelines directory (15MB) exceeded. Delete something to continue upload',
    pdfExt: 'Wrong file format. You can upload only PDF.',
    maxSizeGuidelinesFile: 'The import file is too large to upload. The maximum size of a file that can be uploaded in guidelines directory is 15 MB.',
    maxSizeNoticefiles: 'The import file is too large to upload. The maximum size of a file that can be uploaded in notice files directory is 15 MB.',
    maxSizeCommonAreasFile: 'The import file is too large to upload. The maximum size of a file that can be uploaded in common areas directory is 15 MB.',
    maxSizeInfo: 'You can upload at once 25MB. Please save changes to upload more files.',
    maxSizePdfNotif: 'The import file is too large to upload. The maximum size of a file that can be uploaded is 15 MB.',
    maxSizeAccess: 'The import file is too large to upload. The maximum size of a file that can be uploaded is 10 MB.',
    subscription: 'Your subscription is not active, the building can not go live.',
    noSubscription: 'Billing details are not available, please fill payment information.',
};


/***/ })

}]);
//# sourceMappingURL=default-src_app_services_navigation_service_ts-src_app_shared_constants_api_constants_ts-src_-806fb0.js.map