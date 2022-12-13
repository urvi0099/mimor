import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { API } from '../../shared/constants/api.constants';
import { BUILD_INFO } from '../../shared/constants/mock';

@Component({
  selector: 'app-manager-buildings',
  templateUrl: 'buildings.page.html',
  styleUrls: ['buildings.page.scss'],
})
export class BuildingsPage implements OnInit, AfterViewInit {

  public buildingsQuery = [];
  public buildingSearchText = '';
  public pageLoading = true;
  @ViewChild('input') input;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService) {
    console.log('buildings constructor');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.input.valueChanges
      .pipe(debounceTime(1000),
        distinctUntilChanged())
      .subscribe((value) => {
        this.getBuildings(value);
      });
  }

  ionViewWillEnter() {
    
  }

  public getBuildings(text) {
    this.apiService.get(API.manager.filterBuildings + text).subscribe(res => {
      console.log(res);
      if(res.status){
        this.buildingsQuery = res.buildings;
      }
      this.pageLoading = false;
    })
  }
}

