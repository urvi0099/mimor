import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
	{
		path: 'home',
		loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
	},
	{
		path: 'resident',
		canActivate: [AuthGuard],
		loadChildren: () => import('./resident/resident.module').then(m => m.ResidentPageModule)
	},
	{
		path: 'agent',
		canActivate: [AuthGuard],
		loadChildren: () => import('./agent/agent.module').then(m => m.AgentPageModule)
	},
	{
		path: 'manager',
		canActivate: [AuthGuard],
		loadChildren: () => import('./manager/manager.module').then(m => m.ManagerPageModule)
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
	},
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full'
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
