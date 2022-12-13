import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { NavigationService } from '../../services/navigation.service';
import { API } from '../../shared/constants/api.constants';
import { WindowRefService } from '../../services/window.service';
import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { RolesService } from '../../services/roles.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

  private role: string;
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  public pageLoading: boolean = false;

  public isCustomBuildingSession = false;
  public loading = true;
  public customBuildingSession;
  public customBuilding;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private windowRef: WindowRefService,
    private alert: AlertService,
    private rolesService: RolesService) {
    console.log('login constructor');
  }

  ngOnInit() {
    this.role = this.router.url.split('/')[2].split('-')[1];
    console.log(this.role);
    this.getCustomBuildingSession();
  }

  public getCustomBuildingSession(): void {
    this.apiService.get(API.guest.isCustomBuildingSession)
      .subscribe((response) => {
        console.log(response)
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


  public back(): void {
    this.navigation.back();
  }

  public register(): void {
    this.router.navigateByUrl(`auth/register-${this.role}`);
  }

  public login(): boolean {
    if (this.pageLoading) {
      return false;
    }
    this.pageLoading = true;

    this.apiService.post(API.guest.login, this.loginForm.value)
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
        } else {
          this.alert.show(response.message);
          this.pageLoading = false;
        }
      }, () => {
        this.alert.show(ERROR.internal);
        this.pageLoading = false;
      });

  }

  public forgot(): void {
    this.router.navigateByUrl(`auth/forgot`);
  }
}

