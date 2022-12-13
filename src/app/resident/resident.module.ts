import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps'
import { NgxStripeModule } from 'ngx-stripe';
import { NgxMaskModule } from 'ngx-mask';

import { ResidentPage } from './resident.page.component';
import { ResidentDashboardPage } from './resident-dashboard/resident-dashboard.page.component';
import { ResidentPageRoutingModule } from './resident-routing.module';
import { MaterialModule } from '../material.module';
import { ContactModal } from '../shared/modals/contact/contact.component';
import { GuidelinesPage } from './guidelines/guidelines.page.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { BuildInfoPage } from './build-info/build-info.page.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ResidentProfilePage } from './resident-profile/profile.page.component';
import { SubRolePage } from './sub-role/sub-role.page.component';
import { ResidentNoticeboardPage } from './resident-noticeboard/resident-noticeboard.page.component';
import { ResidentAreasPage } from './common-areas/resident-areas.page.component';
import { ResidentBookAreaPage } from './book-area/resident-book-area.page.component';
import { BookLiftPage } from './book-lift/book-lift.page.component';
import { ChangeMovePage } from './change-move/change-move.page.component';
import { NewBookingPage } from './new-booking/new-booking.page.component';
import { ResidentPaymentPage } from './payment/resident-payment.page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ResidentPageRoutingModule,
    MaterialModule,
    PipesModule,
    Ng2SearchPipeModule,
    GoogleMapsModule,
    NgxStripeModule.forChild('pk_test_G1se5Kq01umPQA6iYBu2cs9r00MT78zezt'),
    NgxMaskModule.forChild()
  ],
  declarations: [
    ResidentPage,
    ResidentDashboardPage,
    GuidelinesPage,
    ContactModal,
    BuildInfoPage,
    ResidentProfilePage,
    SubRolePage,
    ResidentNoticeboardPage,
    ResidentAreasPage, 
    ResidentBookAreaPage,
    BookLiftPage,
    ChangeMovePage,
    NewBookingPage,
    ResidentPaymentPage,
  ]
})
export class ResidentPageModule {}
