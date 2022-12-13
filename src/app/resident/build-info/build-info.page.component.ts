import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { BUILD_INFO } from '../../shared/constants/mock';

@Component({
  selector: 'app-build-info',
  templateUrl: './build-info.page.html',
  styleUrls: ['./build-info.page.scss'],
})
export class BuildInfoPage implements OnInit {

  public building;
  public searchFilter: string = '';
  public fromPage: boolean = true;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public keyPDF = {};
  public fileInfo;
  public parking;
  public loading = true;

  constructor(private router: Router,
    private rolesService: RolesService,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private alert: AlertService) {
    console.log('building information constructor');
  }

  ngOnInit() {
    if (this.buildId) {
      this.getInfo();
    }
  }

  public getInfo() {
    let location,
      parking,
      mapInited = false,
      marker, pmarker, map, m;
    this.apiService.get('/booking/askQuest4?id=' + this.buildId)
      .subscribe((response) => {
        if (response.status === true) {
          this.building = response.building;

          for (let m in this.building.categories) {
            this.keyPDF[m] = this.building.categories[m].name;
          }

          this.fileInfo = response.fileInfo;

          // location = new google.maps.LatLng(this.building.lat, this.building.lng);

          if (this.building.parking) {
            var p = this.building.parking;
            this.parking = {};
          }
          this.loading = false;
          return;
        }
        this.loading = false;
        this.alert.show(response.message || ERROR.internal)
        this.router.navigateByUrl('resident/dashboard')
      }, () => {
        this.loading = false;
        this.router.navigateByUrl('resident/dashboard');
      });
  }

  public fromFileInfo() {
    // TO DO
  }

  public back(): void {
    this.router.navigateByUrl('resident/dashboard')
  }

}
