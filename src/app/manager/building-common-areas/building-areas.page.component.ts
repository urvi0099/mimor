import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { AREAS, BUILD_INFO } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { API } from '../../shared/constants/api.constants';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-manager-areas',
  templateUrl: 'building-areas.page.html',
  styleUrls: ['building-areas.page.scss'],
})
export class BuildingAreasPage implements OnInit {

  public buildName;
  public building;
  public isC2AAvailable = false;
  public mockId = 7;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public areas = [];
  public resultAreaFiles = {};
  public filenames = {};
  public showingRules = false;
  public areaName;
  public areaRules;
  public files = [];
  public loading = true;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService) {
    console.log('building areas constructor');
  }

  ngOnInit() {
    if(this.buildId){
      this.getBuildingById();
      this.getAreas();
    } else this.router.navigateByUrl('manager/buildings')
  }

  public getBuildingById() {
    this.apiService.get(API.manager.getBuilding + this.buildId)
      .subscribe((res) => {
        this.isC2AAvailable = res.building.allow_c2a == '1';
      });
  };

  public getAreas() {
    this.apiService.post(API.manager.getCommonAreas + this.buildId).subscribe((response) => {
      if (response.status) {
        this.building = response.building;
        this.buildName = this.building.name;
        this.areas = response.common_areas;
        console.log(response);
        if (response.filenames) {
          this.filenames = response.filenames;
          for (let areaId in this.filenames) {
            this.files[areaId] = [];
            this.resultAreaFiles[areaId] = {
              arrFiles: {},
              blobUrl: {},
              isLocal: {}
            }
            for (let file in this.filenames[areaId]) {
              let filename = this.filenames[areaId][file];
              this.files[areaId].push(environment.baseUrl + '/upload/pdf/' + this.buildId + '/common_areas/' + areaId + '/' + filename);
              this.resultAreaFiles[areaId].arrFiles[filename] = environment.baseUrl + '/upload/pdf/' + this.buildId + '/common_areas/' + areaId + '/' + filename;
              this.resultAreaFiles[areaId].blobUrl[filename] = environment.baseUrl + '/upload/pdf/' + this.buildId + '/common_areas/' + areaId + '/' + filename;
              this.resultAreaFiles[areaId].isLocal[filename] = false;
            }
          }
        }
      }
      this.loading = false;
    })
  }

  public back(): void {
    this.navigation.back();
  }

  public showRules(areaId) {
    let area = this.areas.find(area => area.id === areaId);
    this.areaName = area.name;
    this.areaRules = area.rules;
    this.showingRules = true;
  }

  public addNewArea() {
    this.router.navigateByUrl('manager/building/common-areas/new')
  }

  public submit(): void {
    this.router.navigateByUrl('manager/buildings')
  }

}

