import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { quillConfig } from '../../shared/constants/config.constants';
import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { WindowRefService } from '../../services/window.service';
import { API } from '../../shared/constants/api.constants';

@Component({
  selector: 'app-building-guidelines',
  templateUrl: 'building-guidelines.page.html',
  styleUrls: ['building-guidelines.page.scss'],
})
export class BuildingGuidelinesPage implements OnInit {

  public buttonText = BUTTONS.next;
  public files: File[] = [];
  public multiplePhotos = false;
  public imageToShow: any;
  public currentBuilding = BUILD_INFO;
  public quillConfig = quillConfig;
  public textarea: string;
  public realEstateVisibility: boolean = true;
  public isFullscreen: boolean;
  public exampleModal: boolean = false;
  public guidelinesFiles = {
    base64FileGuidelines: {},
    blobUrlGuidelines: {},
    isLocalGuidelines: {},
    filesize: {}
  };
  public filenameGuidelines = {};
  public base64Guidelines = {};
  public blobUrlGuidelines = {};
  public isEdit = false;
  public buildId;
  public loading = false;
  public building;
  public buildName;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService,
    private windowRef: WindowRefService,
    private alertController: AlertController) {
    console.log('building guidelines constructor');
  }

  ngOnInit() {
    this.isEdit = this.route.snapshot.routeConfig.path.split('/')[3] === 'edit';
    this.buildId = this.route.snapshot.paramMap.get('buildId');
    if (this.isEdit) {
      this.buttonText = BUTTONS.save;
      this.getBuilding();
    } else this.loading = false;
  }

  public getBuilding() {
    this.apiService.get(API.manager.getBuilding + this.buildId).subscribe((response) => {
      if (response.status) {
        this.building = response.building;
        this.buildName = this.building.name;
        this.guidelinesFiles = {
          base64FileGuidelines: {},
          blobUrlGuidelines: {},
          isLocalGuidelines: {},
          filesize: {}
        };
        this.realEstateVisibility = !(this.building.hide_guidelines === '1');
        if (response.building.filename && response.filename) {
          let filenames = response.filename;
          for (let value in filenames) {
            let filename = filenames[value];
            this.guidelinesFiles.base64FileGuidelines[filename] = null;
            this.guidelinesFiles.blobUrlGuidelines[filename] = '/upload/pdf/' + this.buildId + '/guidelines/' + filename;
            this.guidelinesFiles.isLocalGuidelines[filename] = false;
            this.guidelinesFiles.filesize[filename] = false;
          }
        }
        if (response.old_filename) {
          let filenames = response.old_filename;
          for (let value in filenames) {
            let filename = filenames[value];
            this.guidelinesFiles.base64FileGuidelines[filename] = null;
            this.guidelinesFiles.blobUrlGuidelines[filename] = '/upload/pdf/' + this.buildId + '/' + filename;
            this.guidelinesFiles.isLocalGuidelines[filename] = false;
            this.guidelinesFiles.filesize[filename] = false;
          }
        }
        if (response.very_old_filename) {
          let filename = response.data.very_old_filename;
          this.guidelinesFiles.base64FileGuidelines[filename] = null;
          this.guidelinesFiles.blobUrlGuidelines[filename] = '/upload/pdf/building_' + this.buildId + '_guidlines.pdf';
          this.guidelinesFiles.isLocalGuidelines[filename] = false;
        }
        this.loading = false;
        return;
      }
      this.loading = false;
      this.alert.show(response.message || ERROR.internal);
      this.router.navigateByUrl('manager/dashboard');
    }, () => {
      this.loading = false;
      this.router.navigateByUrl('manager/dashboard');
    });
  }

  public onSelect(event): void {
    console.log(event.target.files);
    if (event.target.files[0].size > 4096000) {
      this.alert.show(ERROR.maxSize)
    }
    this.files.push(event.target.files[0]);
    console.log(this.files);
    this.readFile(this.files[0]).then(file => {
      // Put this string in a request body to upload it to an API.
      // console.log(file);
      let filenameNew = this.files[0].name;
      filenameNew = filenameNew.replace('?', '');
      this.filenameGuidelines[filenameNew] = file;
      let binary = atob(this.filenameGuidelines[filenameNew].split(',')[1]),
        array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      let blob = new Blob([new Uint8Array(array)], { type: this.files[0].type });

      this.guidelinesFiles.base64FileGuidelines[filenameNew] = file;

      this.guidelinesFiles.blobUrlGuidelines[filenameNew] = URL.createObjectURL(blob);

    })
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

  public openFile(url) {
    this.windowRef.nativeWindow.open(url);
  }

  public switchStatus() {
    this.apiService.post(API.manager.triggerHiddenStatusGuide + this.buildId).subscribe((resp) => {
      if (resp.status) {
        this.building.hide_guidelines = resp.newStatus == 'active' ? 1 : 0;
        return;
      }
      this.alert.show(resp.message || ERROR.internal);
    });
  }

  public deleteFile(filename): void {
    // add delete
    delete this.blobUrlGuidelines[filename];
    if (this.guidelinesFiles.isLocalGuidelines[filename] === true) {
      delete this.guidelinesFiles.isLocalGuidelines[filename];
      delete this.guidelinesFiles.blobUrlGuidelines[filename];
      delete this.guidelinesFiles.base64FileGuidelines[filename];
      delete this.guidelinesFiles.filesize[filename];
      this.loading = false;
    } else {
      this.apiService.delete(API.manager.deletePDF + this.buildId + '?guide=' + filename).subscribe((response) => {
        if (response.status) {
          delete this.guidelinesFiles.isLocalGuidelines[filename];
          delete this.guidelinesFiles.blobUrlGuidelines[filename];
          delete this.guidelinesFiles.base64FileGuidelines[filename];
          delete this.guidelinesFiles.filesize[filename];
          this.loading = false;
        }
      });
    }
    ;
  }

  public async showConfirm(key) {
    const alert = await this.alertController.create({
      cssClass: 'remove-level',
      header: 'Confirm',
      subHeader: `Would you like to remove ${key} file?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: () => {
            this.deleteFile(key)
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  public back(): void {
    this.navigation.back();
  }

  public submit(): void {
    console.log('submit');
    // this.router.navigateByUrl('manager/building/time-settings')
    if (this.loading) {
      return;
    }
    this.building.guidlines = this.building.guidlines.replace(/<span class="spellchecker-word-highlight">([\s\S]+?)<\/span>/gim, '$1');
    this.textarea = this.building.guidlines;
    let data = {
      guidlines: this.textarea,
      filename: '',
      base64files: {},
      isedit: this.isEdit
    };
    for (let key in this.guidelinesFiles) {
      if (this.guidelinesFiles.hasOwnProperty(key)) {
        let filenames = Object.keys(this.guidelinesFiles.blobUrlGuidelines);
        data.filename = filenames.join(';');
        for (let fn in this.guidelinesFiles.base64FileGuidelines) {
          if (this.guidelinesFiles.base64FileGuidelines[fn] !== null) {
            data.base64files[fn] = this.guidelinesFiles.base64FileGuidelines[fn];
          } else {
            delete this.guidelinesFiles.base64FileGuidelines[fn];
          }
        }
      }
    }
    this.apiService.put(API.manager.saveInfo + this.buildId, data).subscribe((response) => {
      if (response.status) {
        if (this.isEdit) {
          this.router.navigateByUrl('manager/dashboard');
        } else this.router.navigateByUrl('manager/building/time-settings')
        return;
      }
      this.alert.show(response.message || ERROR.internal);
      this.router.navigateByUrl('manager/dashboard');
      this.loading = false;
    }, function () {
      this.loading = false;
    });
  }


}

