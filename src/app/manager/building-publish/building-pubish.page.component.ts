import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-building-publish',
  templateUrl: 'building-publish.page.html',
  styleUrls: ['building-publish.page.scss'],
})
export class BuildingPublishPage implements OnInit {

  public buildName = BUILD_INFO.name;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService) {
    console.log('building publish constructor');
  }

  ngOnInit() {
  }

  public back(): void {
    this.navigation.back();
  }

  public changeBuildingStatus(status: boolean): void {
    this.router.navigateByUrl('manager/building/congratulations')
  }

}

