import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgentDashboardPage } from './agent-dashboard/agent-dashboard.page.component';
import { AgentGuidelinesPage } from './agent-guidelines/agent-guidelines.page.component';
import { AgentInfoPage } from './agent-info/agent-info.page.component';
import { AgentProfilePage } from './agent-profile/agent-profile.page.component';
import { AgentPage } from './agent.page.component';

const routes: Routes = [
  {
    path: '',
    component: AgentPage,
    children : [
      {
        path: 'dashboard',
        component: AgentDashboardPage,
      },
      {
        path: 'guidelines/view/:buildId',
        component: AgentGuidelinesPage,
      },
       {
        path: 'info/:buildId',
        component: AgentInfoPage,
      },
      {
        path: 'profile',
        component: AgentProfilePage,
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
export class AgentPageRoutingModule {}
