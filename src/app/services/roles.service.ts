import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { ROLES } from '../shared/constants/roles.constants';
import { Role } from '../shared/interfaces/manager/roles.interface';
import { ApiService } from './api.service';
import { WindowRefService } from './window.service';

@Injectable({ providedIn: 'root' })
export class RolesService {
  public roles: Role[] = this.windowRef.nativeWindow.localStorage.getItem(
    'roles'
  )
    ? JSON.parse(this.windowRef.nativeWindow.localStorage.getItem('roles')).map(
        (el) => {
          el.displayName =
            el.display_name === 'Tenant' ? 'Resident' : el.display_name;
          el.name = el.name === 'client' ? 'resident' : el.name;
          return el;
        }
      )
    : [];
  private role: any;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private tokenSubject: BehaviorSubject<any>;
  public token: Observable<any>;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private windowRef: WindowRefService
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      this.windowRef.nativeWindow.localStorage.getItem('user_role')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    this.tokenSubject = new BehaviorSubject<any>(
      this.windowRef.nativeWindow.localStorage.getItem('jwt')
    );
    this.token = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get tokenValue(): any {
    return this.tokenSubject.value;
  }

  public setRoles() {
    this.currentUserSubject = new BehaviorSubject<any>(
      this.windowRef.nativeWindow.localStorage.getItem('user_role')
    );
    this.tokenSubject = new BehaviorSubject<any>(
      this.windowRef.nativeWindow.localStorage.getItem('jwt')
    );
    this.roles = this.windowRef.nativeWindow.localStorage.getItem('roles')
      ? JSON.parse(
          this.windowRef.nativeWindow.localStorage.getItem('roles')
        ).map((el) => {
          return {
            ...el,
            displayName:
              el.display_name === 'Tenant' ? 'Resident' : el.display_name,
            name: el.name === 'client' ? 'resident' : el.name,
          };
        })
      : [];
  }

  public getRoles() {
    this.roles = this.windowRef.nativeWindow.localStorage.getItem('roles')
      ? JSON.parse(
          this.windowRef.nativeWindow.localStorage.getItem('roles')
        ).map((el) => {
          el.displayName =
            el.display_name === 'Tenant' ? 'Resident' : el.display_name;
          el.name = el.name === 'client' ? 'resident' : el.name;
          return el;
        })
      : [];

    if (this.roles.length > 1) {
      this.role =
        this.windowRef.nativeWindow.localStorage.getItem('user_role') ||
        this.router.url.split('/')[1] ||
        this.roles[0].name;
      let role = this.roles.find((el) => el?.name === this?.role);
      let roleIndex = this.roles.findIndex((el) => el?.name === this?.role);
      this.roles.splice(roleIndex, 1);
      this.roles.unshift(role);
    }
    return this.roles;
  }

  public getRole() {
    return (this.role =
      this.windowRef.nativeWindow.localStorage.getItem('user_role'));
  }

  public selectRole(role): void {
    this.windowRef.nativeWindow.localStorage.setItem('user_role', role);
    this.router.navigateByUrl(`${role}`);
  }

  public logout(): void {
    this.windowRef.nativeWindow.localStorage.removeItem('user_role');
    this.windowRef.nativeWindow.localStorage.removeItem('jwt');
    this.windowRef.nativeWindow.localStorage.removeItem('roles');
    console.log(this.currentUserValue);
    setTimeout(() => this.router.navigateByUrl('/auth/login'), 500);
  }
}
