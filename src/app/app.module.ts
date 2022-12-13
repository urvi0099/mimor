import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { QuillModule } from 'ngx-quill'
import { SignaturePadModule } from 'angular2-signaturepad';
import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { NgxStripeModule } from 'ngx-stripe';
import { IConfig, NgxMaskModule } from 'ngx-mask'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './services/api.service';
import { MaterialModule } from './material.module';
import { WindowRefService } from './services/window.service';
import { RolesService } from './services/roles.service';
import { AlertService } from './services/alert.service';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { AuthGuard } from './shared/guards/auth.guard';
import { MY_DATE_FORMATS } from "./shared/utils/MY_DATE_FORMAT";
import { MomentDateAdapter } from "@angular/material-moment-adapter";


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [BrowserModule,
		IonicModule.forRoot({
			animated: false
		}),
		AppRoutingModule,
		HttpClientModule,
		MaterialModule,
		BrowserAnimationsModule,
		MatNativeDateModule,
		QuillModule.forRoot(),
		SignaturePadModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyAH_AQG-V0nHEGhlImZLMFyLIk6Xq30htA',
			libraries: ['places']
		}),
		MatGoogleMapsAutocompleteModule,
		NgxStripeModule.forRoot('pk_test_G1se5Kq01umPQA6iYBu2cs9r00MT78zezt'),
		NgxMaskModule.forRoot(),
	],
	providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{
			provide: DateAdapter,
			useClass: MomentDateAdapter,
			deps: [MAT_DATE_LOCALE],
		},
		{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
		ApiService, WindowRefService, RolesService, AlertService, AuthGuard,
	],

	bootstrap: [AppComponent],
})
export class AppModule {
}
