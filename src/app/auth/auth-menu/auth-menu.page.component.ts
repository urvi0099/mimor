import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { API } from '../../shared/constants/api.constants';

@Component({
  selector: 'app-auth-menu',
  templateUrl: 'auth-menu.page.html',
  styleUrls: ['auth-menu.page.scss'],
})
export class AuthMenuPage implements OnInit {

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService) {
    console.log('auth menu constructor');
    if (this.rolesService.currentUserValue) { 
      this.router.navigateByUrl(`/${this.rolesService.currentUserValue}/dashboard`);
  }
  }

  ngOnInit(){
  }

  public redirect(redirect): void {
    console.log(this.router, redirect);
    console.log(`auth/login-${redirect}`);
    this.router.navigate(['auth',`login-${redirect}`]);
  }
}

