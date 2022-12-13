import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AgentPageRoutingModule } from './agent-routing.module';
import { AgentPage } from './agent.page.component';
import { AgentDashboardPage } from './agent-dashboard/agent-dashboard.page.component';
import { MaterialModule } from '../material.module';
import { AgentGuidelinesPage } from './agent-guidelines/agent-guidelines.page.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { AgentInfoPage } from './agent-info/agent-info.page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { AgentProfilePage } from './agent-profile/agent-profile.page.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgentPageRoutingModule,
    MaterialModule,
    PipesModule,
    Ng2SearchPipeModule,
    GoogleMapsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AgentPage,
    AgentDashboardPage,
    AgentGuidelinesPage,
    AgentInfoPage,
    AgentProfilePage
  ]
})
export class AgentPageModule {}
