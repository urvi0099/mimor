import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { RolesService } from '../../services/roles.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private rolesService: RolesService
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        // const currentUser = this.rolesService.currentUserValue;
        const currentUser = this.rolesService.getRole();
        console.log(currentUser);
        if (currentUser) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigateByUrl('/auth/login');
        return false;
    }
}