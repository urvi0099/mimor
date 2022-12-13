import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-building-congrats',
  templateUrl: 'building-congrats.page.html',
  styleUrls: ['building-congrats.page.scss'],
})
export class BuildingCongratsPage implements OnInit {

  public buildName = BUILD_INFO.name;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService) {
    console.log('building congratulations constructor');
  }

  ngOnInit() {
  }

  public back(): void {
    this.navigation.back();
  }

  public submit(): void {
    this.router.navigateByUrl('manager/buildings')
  }

}

