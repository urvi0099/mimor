import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { QuillModule } from 'ngx-quill';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { SignaturePadModule } from 'angular2-signaturepad';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { ClickOutsideModule } from 'ng-click-outside';
import { NgxMaskModule } from 'ngx-mask';

import { ManagerPage } from './manager.page.component';
import { ManagerDashboardPage } from './manager-dashboard/manager-dashboard.page.component';
import { ManagerPageRoutingModule } from './manager-routing.module';
import { MaterialModule } from '../material.module';
import { BuildingsPage } from './buildings/buildings.page.component';
import { ManagerProfilePage } from './manager-profile/manager-profile.page.component';
import { BuildingNamePage } from './building-name/building-name.page.component';
import { BuildingApartmentsPage } from './building-apartments/building-apartments.page.component';
import { BuildingGuidelinesPage } from './building-guidelines/building-guidelines.page.component';
import { BuildingTimesPage } from './building-times/building-times.page.component';
import { BuildingEmailsPage } from './building-emails/building-emails.page.component';
import { BuildingAddressPage } from './building-address/building-address.page.component';
import { BuildingInfoPage } from './building-info/building-info.page.component';
import { BuildingContactsPage } from './building-contacts/building-contacts.page.component';
import { BuildingPublishPage } from './building-publish/building-pubish.page.component';
import { BuildingCongratsPage } from './building-congrats/building-congrats.page.component';
import { ManagerNoticeboardPage } from './manager-noticeboard/manager-noticeboard.page.component';
import { ManagerNoticePage } from './manager-notice/manager-notice.page.component';
import { ManagerNotifications } from './manager-notifications/manager-notifications.page.component';
import { ManagerTradesPage } from './manager-trades/manager-trades.page.component';
import { ManagerTradePage } from './manager-trade-add/manager-trade-add.page.component';
import { ManagerTradeAccess } from './manager-trade-access/manager-trade-access.page.component';
import { EmailTemplatesPage } from './building-email-templates/building-email-templates.page.component';
import { EmailLogoPage } from './building-email-logo/building-email-logo.page.component';
import { EmailTemplatePage } from './building-email-template/building-email-template.page.component';
import { BuildingReportsPage } from './building-reports/building-reports.page.component';
import { BuildingSharePage } from './building-share/building-share.page.component';
import { BuildingParcelsPage } from './building-parcels/building-parcels.page.component';
import { AddParcelModal } from '../shared/modals/add-parcel/add-parcel.component';
import { BuildingAreasPage } from './building-common-areas/building-areas.page.component';
import { BuildingAreaPage } from './building-area/building-area.page.component';
import { BuildingAreaTimeslotsPage } from './building-area-timeslots/building-area-timeslots.page.component';
import { BuildingAreaCalendarPage } from './building-area-calendar/building-area-calendar.component';
import { BuildingCalendarPage } from './building-calendar/building-calendar.component';
import { BuildingRealEstate } from './building-real-estate/building-real-estate.page.component';
import { BuildingAccessPage } from './building-access/building-access.page.component';
import { BuildingPaymentsPage } from './building-payments/building-payments.page.component';
import { BuildingBookAreaPage } from './building-book-area/building-book-area.page.component';

FullCalendarModule.registerPlugins([
	dayGridPlugin,
	timeGridPlugin,
	listPlugin,
	interactionPlugin
]);

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ManagerPageRoutingModule,
		MaterialModule,
		ReactiveFormsModule,
		NgxDropzoneModule,
		QuillModule.forRoot(),
		Ng2SearchPipeModule,
		OrderModule,
		SignaturePadModule,
		ImageCropperModule,
		FullCalendarModule,
		MatGoogleMapsAutocompleteModule,
		ClickOutsideModule,
		NgxMaskModule.forChild()
	],
	declarations: [
		ManagerPage,
		ManagerDashboardPage,
		BuildingsPage,
		ManagerProfilePage,
		BuildingNamePage,
		BuildingApartmentsPage,
		BuildingGuidelinesPage,
		BuildingTimesPage,
		BuildingEmailsPage,
		BuildingAddressPage,
		BuildingInfoPage,
		BuildingContactsPage,
		BuildingPublishPage,
		BuildingCongratsPage,
		ManagerNoticeboardPage,
		ManagerNoticePage,
		ManagerNotifications,
		ManagerTradesPage,
		ManagerTradePage,
		ManagerTradeAccess,
		EmailTemplatesPage,
		EmailLogoPage,
		EmailTemplatePage,
		BuildingReportsPage,
		BuildingSharePage,
		BuildingParcelsPage,
		AddParcelModal,
		BuildingAreasPage,
		BuildingAreaPage,
		BuildingAreaTimeslotsPage,
		BuildingAreaCalendarPage,
		BuildingCalendarPage,
		BuildingRealEstate,
		BuildingAccessPage,
		BuildingPaymentsPage,
		BuildingBookAreaPage
	],

})
export class ManagerPageModule {
}
