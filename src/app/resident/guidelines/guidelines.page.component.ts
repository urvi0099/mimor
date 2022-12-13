import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BUILDING } from '../../shared/constants/mock';
import { ApiService } from '../../services/api.service';
import { NavigationService } from '../../services/navigation.service';
import { WindowRefService } from '../../services/window.service';
import { RolesService } from '../../services/roles.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { AlertService } from '../../services/alert.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-guidelines',
  templateUrl: 'guidelines.page.html',
  styleUrls: ['guidelines.page.scss'],
})
export class GuidelinesPage implements OnInit {

  public model: any = {};
  public pageLoading = true;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public id;
  public guidelinesFilesTenant;
  public fileName;
  public filenames;
  public environment = environment;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private windowRef: WindowRefService,
    private rolesService: RolesService,
    private alert: AlertService) {
    console.log('guidelines constructor');
  }

  ngOnInit() {
    if (this.buildId) {
      this.getBuilding();
    } else this.router.navigateByUrl('resident/dashboard');
  }

  public getBuilding() {
    this.apiService.get('/booking/askQuest3?id=' + this.buildId)
      .subscribe((response) => {
        if (response.status) {
          console.log(response)
          this.model = response.model;
          this.pageLoading = false;
          this.id = this.model.id;
          this.guidelinesFilesTenant = {
            blobUrlGuidelines: {}
          };
          if (response.model.filename) {
            let fileName = response.model.filename;
            this.fileName = fileName.split(';');
            for (let value in this.fileName) {
              let filename = this.fileName[value];
              this.guidelinesFilesTenant.blobUrlGuidelines[filename] = '/upload/pdf/' + this.id + '/guidelines/' + filename;
            }
          }
          if (response.result.old_filename) {
            let filenames = response.result.old_filename;
            for (let value in filenames) {
              let filename = filenames[value];
              this.guidelinesFilesTenant.blobUrlGuidelines[filename] = '/upload/pdf/' + this.id + '/' + filename;
            }
          }
          if (response.result.very_old_filename) {
            let filename = response.result.very_old_filename;
            this.guidelinesFilesTenant.blobUrlGuidelines[filename] = '/upload/pdf/building_' + this.id + '_guidlines.pdf';
          }
          return;
        }
        this.alert.show(response.message || ERROR.internal);
        this.router.navigateByUrl('resident/dashboard')
      }, () => {
        this.router.navigateByUrl('resident/dashboard')
      });
  }

  public back(): void {
    this.navigation.back();
  }

  public dashboard(): void {
    this.router.navigateByUrl('resident/dashboard')
  }

  public sendEmail(): void {
    console.log('Send email');
  }

  public printElem(data): void {
    let mywindow = this.windowRef.nativeWindow.open('', 'Building name guidelines', 'height=400,width=600');
    mywindow.document.write('<html><head><title>Mimor - Building name guidelines</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10
    mywindow.print();
    mywindow.close();
  };

  public downloadFile(id, key) {
    this.apiService.getFile(`/api/client/download_pdf/${id}?filename=${key}`).subscribe(res => {
      console.log(res);
      var newBlob = new Blob([res], { type: "application/pdf" });
      console.log(newBlob);
      // this.printElem(newBlob);
      var downloadURL = this.windowRef.nativeWindow.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "help.pdf";
      link.click();
    });
  }

  public viewFile(value){
    let url1: any = value.replaceAll(' ', '%20');
    // let url  = encodeURIComponent(`${value}`);
    console.log(`${environment.baseUrl}${url1}`, value);
    this.windowRef.nativeWindow.open(`${environment.baseUrl}${url1}`);
  }
}

