import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { API } from '../../shared/constants/api.constants';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-building-logo',
  templateUrl: 'building-email-logo.page.html',
  styleUrls: ['building-email-logo.page.scss'],
})
export class EmailLogoPage implements OnInit {

  public buttonText = BUTTONS.submit;
  public limit: boolean = false;
  public buildName = '';
  public files = [];
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public loading = false;
  public uploadedLogo: any = 'assets/img/icons/image-icon.png';

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService) {
    console.log('building email logo constructor');
  }

  ngOnInit() {
    if (this.buildId) {
      this.getBuilding();
    } else this.router.navigateByUrl('manager/buildings')
  }

  public getBuilding() {
    this.apiService.get(API.manager.getBuilding + this.buildId)
      .subscribe((response) => {
        if (response.status) {
          this.buildName = response.building.name;
          if (!response.building.email_logo) {
            this.uploadedLogo = 'assets/img/logoNew.png';
          } else {
            this.uploadedLogo = environment.baseUrl + '/img/email_logos/' + response.building.email_logo;
          }
        }
      })
  }

  public onSelect(event): void {
    this.files.push(...event.addedFiles);
    this.readFile(this.files[0]).then(fileContents => {
      // Put this string in a request body to upload it to an API.
      console.log(fileContents);
      this.uploadedLogo = fileContents;
    })
    if (event.rejectedFiles.length > 0) {
      if (event.rejectedFiles[0].reason === 'size') {
        this.alert.show(ERROR.maxSize);
      }
      if (event.rejectedFiles[0].reason === 'type') {
        this.alert.show(ERROR.imageExt)
      }
      if (event.rejectedFiles[0].reason === 'no_multiple') {
        this.alert.show('You can upload only one image')
      }
    }
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        return resolve((e.target as FileReader).result);
      };
      reader.onerror = e => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };
      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }
      reader.readAsDataURL(file);
    });
  }

  public redirect(template) {
    this.router.navigateByUrl(`manager/building/email-templates/edit/${template}`);
  }

  public back(): void {
    this.navigation.back();
  }

  public submit(): void {
    this.loading = true;
    this.apiService.put('/api/manager/saveEmailLogo' + (this.buildId ? '/' + this.buildId : ''), {
      logo: (this.uploadedLogo ? this.uploadedLogo : ''),
    }).subscribe((response) => {
      if (response.status) {
        this.loading = false;
        this.router.navigateByUrl(`manager/building/${this.buildId}/email-templates`)
        return;
      }
      this.loading = false;
      this.alert.show(response.message || ERROR.internal);
    }, () => {
      this.loading = false;
    });
    console.log(this.files);
  }

}

