import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuildingAccessPage } from './building-access/building-access.page.component';
import { BuildingAddressPage } from './building-address/building-address.page.component';
import { BuildingApartmentsPage } from './building-apartments/building-apartments.page.component';
import { BuildingAreaCalendarPage } from './building-area-calendar/building-area-calendar.component';
import { BuildingAreaTimeslotsPage } from './building-area-timeslots/building-area-timeslots.page.component';
import { BuildingAreaPage } from './building-area/building-area.page.component';
import { BuildingBookAreaPage } from './building-book-area/building-book-area.page.component';
import { BuildingCalendarPage } from './building-calendar/building-calendar.component';
import { BuildingAreasPage } from './building-common-areas/building-areas.page.component';
import { BuildingCongratsPage } from './building-congrats/building-congrats.page.component';
import { BuildingContactsPage } from './building-contacts/building-contacts.page.component';
import { EmailLogoPage } from './building-email-logo/building-email-logo.page.component';
import { EmailTemplatePage } from './building-email-template/building-email-template.page.component';
import { EmailTemplatesPage } from './building-email-templates/building-email-templates.page.component';
import { BuildingEmailsPage } from './building-emails/building-emails.page.component';
import { BuildingGuidelinesPage } from './building-guidelines/building-guidelines.page.component';
import { BuildingInfoPage } from './building-info/building-info.page.component';
import { BuildingNamePage } from './building-name/building-name.page.component';
import { BuildingParcelsPage } from './building-parcels/building-parcels.page.component';
import { BuildingPaymentsPage } from './building-payments/building-payments.page.component';
import { BuildingPublishPage } from './building-publish/building-pubish.page.component';
import { BuildingRealEstate } from './building-real-estate/building-real-estate.page.component';
import { BuildingReportsPage } from './building-reports/building-reports.page.component';
import { BuildingSharePage } from './building-share/building-share.page.component';
import { BuildingTimesPage } from './building-times/building-times.page.component';
import { BuildingsPage } from './buildings/buildings.page.component';

import { ManagerDashboardPage } from './manager-dashboard/manager-dashboard.page.component';
import { ManagerNoticePage } from './manager-notice/manager-notice.page.component';
import { ManagerNoticeboardPage } from './manager-noticeboard/manager-noticeboard.page.component';
import { ManagerNotifications } from './manager-notifications/manager-notifications.page.component';
import { ManagerProfilePage } from './manager-profile/manager-profile.page.component';
import { ManagerTradeAccess } from './manager-trade-access/manager-trade-access.page.component';
import { ManagerTradePage } from './manager-trade-add/manager-trade-add.page.component';
import { ManagerTradesPage } from './manager-trades/manager-trades.page.component';
import { ManagerPage } from './manager.page.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerPage,
    children : [
      {
        path: 'dashboard/:buildId',
        component: ManagerDashboardPage,
      },
      {
        path: 'buildings',
        component: BuildingsPage,
      },
      {
        path: 'profile',
        component: ManagerProfilePage,
      },
      {
        path: 'building/name',
        component: BuildingNamePage,
      },
      {
        path: 'building/:buildId/name/edit',
        component: BuildingNamePage,
      },
      {
        path: 'building/:buildId/apartments',
        component: BuildingApartmentsPage,
      },
      {
        path: 'building/:buildId/apartments/edit',
        component: BuildingApartmentsPage,
      },
      {
        path: 'building/:buildId/guidelines',
        component: BuildingGuidelinesPage,
      },
      {
        path: 'building/:buildId/guidelines/edit',
        component: BuildingGuidelinesPage,
      },
      {
        path: 'building/:buildId/time-settings',
        component: BuildingTimesPage,
      },
      {
        path: 'building/:buildId/time-settings/edit',
        component: BuildingTimesPage,
      },
      {
        path: 'building/:buildId/addemail',
        component: BuildingEmailsPage,
      },
      {
        path: 'building/:buildId/addemail/edit',
        component: BuildingEmailsPage,
      },
      {
        path: 'building/address',
        component: BuildingAddressPage,
      },
      {
        path: 'building/:buildId/address/edit',
        component: BuildingAddressPage,
      },
      {
        path: 'building/:buildId/info',
        component: BuildingInfoPage,
      },
      {
        path: 'building/:buildId/info/edit',
        component: BuildingInfoPage,
      },
      {
        path: 'building/:buildId/contdet',
        component: BuildingContactsPage,
      },
      {
        path: 'building/:buildId/contdet/edit',
        component: BuildingContactsPage,
      },
      {
        path: 'building/:buildId/publish',
        component: BuildingPublishPage,
      },
      {
        path: 'building/:buildId/congratulations',
        component: BuildingCongratsPage,
      },
      {
        path: 'building/:buildId/noticeboard',
        component: ManagerNoticeboardPage,
      },
      {
        path: 'building/:buildId/noticeboard/edit',
        component: ManagerNoticePage,
      },
      {
        path: 'building/:buildId/noticeboard/edit/:noticeId',
        component: ManagerNoticePage,
      },
      {
        path: 'building/:buildId/notifications',
        component: ManagerNotifications,
      },
      {
        path: 'building/:buildId/trades',
        component: ManagerTradesPage,
      },
      {
        path: 'building/:buildId/add-trade',
        component: ManagerTradePage,
      },
      {
        path: 'building/:buildId/edit-trade/:tradeId',
        component: ManagerTradePage,
      },
      {
        path: 'building/:buildId/give-access/:tradeId',
        component: ManagerTradeAccess,
      },
      {
        path: 'building/:buildId/give-access/:tradeId/edit',
        component: ManagerTradeAccess,
      },
      {
        path: 'building/:buildId/email-templates',
        component: EmailTemplatesPage,
      },
      {
        path: 'building/:buildId/email-templates/logo/edit',
        component: EmailLogoPage,
      },
      {
        path: 'building/:buildId/email-templates/edit/:emailTemplateType',
        component: EmailTemplatePage,
      },
      {
        path: 'building/:buildId/reports',
        component: BuildingReportsPage,
      },
      {
        path: 'building/:buildId/share',
        component: BuildingSharePage,
      },
      {
        path: 'building/:buildId/parcel_management',
        component: BuildingParcelsPage,
      },
      {
        path: 'building/:buildId/common-areas/show',
        component: BuildingAreasPage,
      },
      {
        path: 'building/:buildId/common-areas/new',
        component: BuildingAreaPage,
      },
      {
        path: 'building/:buildId/common-areas/:areaId/edit',
        component: BuildingAreaPage,
      },
      {
        path: 'building/:buildId/common-areas/:areaId/timeslots',
        component: BuildingAreaTimeslotsPage,
      },
      {
        path: 'building/:buildId/common-area-calendar/:areaId',
        component: BuildingAreaCalendarPage,
      },
      {
        path: 'building/:buildId/calendar',
        component: BuildingCalendarPage,
      },
      {
        path: 'building/:buildId/trusted-real-estate',
        component: BuildingRealEstate,
      },
      {
        path: 'building/:buildId/move-out',
        component: BuildingAccessPage,
      },
      {
        path: 'building/:buildId/payments',
        component: BuildingPaymentsPage,
      },
      {
        path: 'building/:buildId/book/:areaId/time',
        component: BuildingBookAreaPage,
      },
      {
        path: '**',
        redirectTo: 'buildings',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerPageRoutingModule {}
