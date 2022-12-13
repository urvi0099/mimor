import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidentBookAreaPage } from './book-area/resident-book-area.page.component';
import { BookLiftPage } from './book-lift/book-lift.page.component';
import { BuildInfoPage } from './build-info/build-info.page.component';
import { ChangeMovePage } from './change-move/change-move.page.component';
import { ResidentAreasPage } from './common-areas/resident-areas.page.component';
import { GuidelinesPage } from './guidelines/guidelines.page.component';
import { NewBookingPage } from './new-booking/new-booking.page.component';
import { ResidentPaymentPage } from './payment/resident-payment.page.component';
import { ResidentDashboardPage } from './resident-dashboard/resident-dashboard.page.component';
import { ResidentNoticeboardPage } from './resident-noticeboard/resident-noticeboard.page.component';
import { ResidentProfilePage } from './resident-profile/profile.page.component';
import { ResidentPage } from './resident.page.component';
import { SubRolePage } from './sub-role/sub-role.page.component';

const routes: Routes = [
  {
    path: '',
    component: ResidentPage,
    children : [
      {
        path: 'dashboard',
        component: ResidentDashboardPage,
      },
      {
        path: 'guidelines/view/:buildId',
        component: GuidelinesPage,
      },
      {
        path: 'information/:buildId',
        component: BuildInfoPage
      },
      {
        path: 'profile/:bookingId',
        component: ResidentProfilePage
      },
      {
        path: 'change_sub_role',
        component: SubRolePage
      },
      {
        path: 'noticeboard/:buildId',
        component: ResidentNoticeboardPage
      },
      {
        path: 'book-area/view/:buildId',
        component: ResidentAreasPage
      },
      {
        path: 'book-area/:buildId/:areaId/time',
        component: ResidentBookAreaPage
      },
      {
        path: 'book-area/:buildId/:areaId/time/:bookingId/edit',
        component: ResidentBookAreaPage
      },
      {
        path: 'book-area/:buildId/:areaId/payment',
        component: ResidentPaymentPage
      },
      {
        path: 'book-lift/:bookingId',
        component: BookLiftPage
      },
      {
        path: 'move-in',
        component: ChangeMovePage
      },
      {
        path: 'move/:bookingId',
        component: ChangeMovePage
      },
      {
        path: 'move/:bookingId/change',
        component: ChangeMovePage
      },
      {
        path: 'move-out/:bookingId',
        component: ChangeMovePage
      },
      {
        path: 'building/new-booking',
        component: NewBookingPage
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentPageRoutingModule {}
