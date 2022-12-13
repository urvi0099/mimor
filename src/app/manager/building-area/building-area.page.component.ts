import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { AREAS, BUILD_INFO } from '../../shared/constants/mock';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { areaConfig } from '../../shared/constants/config.constants';
import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { WindowRefService } from '../../services/window.service';
import { environment } from '../../../environments/environment';
import { API } from '../../shared/constants/api.constants';

@Component({
  selector: 'app-building-area',
  templateUrl: 'building-area.page.html',
  styleUrls: ['building-area.page.scss'],
})
export class BuildingAreaPage implements OnInit {

  @ViewChild(ImageCropperComponent)
  imageCropper: ImageCropperComponent;
  public quillConfig = areaConfig;
  public buildName = BUILD_INFO.name;
  public areaForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    price: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.pattern('^-?\d*(\.\d+)?$')]),
    fee: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.pattern('^-?\d*(\.\d+)?$')]),
    cert_required: new FormControl(false, Validators.required),
    c2a_mobile: new FormControl('', [Validators.required]),
    rules: new FormControl('', [Validators.required]),
    addit_email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
  });
  public areas = [];
  public area;
  public title = 'Create new common area';
  public isEdit = this.route.snapshot.paramMap.get('areaId') ? true : false;
  public buttonText = BUTTONS.save;
  public filenames = {};
  public submitted = false;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public isCropped = true;
  public isCroppedButton = false;
  public files: File[] = [];
  public noticeFiles = {};
  public resultAreaFiles = {
    'filesizes': {},
    'base64': {},
    'blobUrl': {},
    'isLocal': {},
    'arrFiles' : {}
  };
  public buildId;
  public areaId = this.route.snapshot.paramMap.get('areaId');
  public deletedAreas = [];

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alertController: AlertController,
    private alert: AlertService,
    private windowRef: WindowRefService) {
    console.log('building area constructor');
  }

  ngOnInit() {
    this.buildId = this.route.snapshot.paramMap.get('buildId');
    if(this.buildId){
      this.getAreas();
    }
    else this.router.navigateByUrl('manager/dashboard/'+ this.buildId)
  }

  public getAreas() {
    this.apiService.post('/api/manager/get_common_areas/' + this.buildId, { area_id: this.areaId }).subscribe((response) => {
      if (response.status) {
        this.areas = response.common_areas;
        console.log(response);
        if (this.isEdit) {
          this.area = response.common_areas[0];
          this.title = 'Change ' + this.area.name;
          this.patchForm(this.area);
        }
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
              this.resultAreaFiles.arrFiles[filename] = environment.baseUrl + '/upload/pdf/' + this.buildId + '/common_areas/' + areaId + '/' + filename;
              this.resultAreaFiles.blobUrl[filename] = environment.baseUrl + '/upload/pdf/' + this.buildId + '/common_areas/' + areaId + '/' + filename;
              this.resultAreaFiles.isLocal[filename] = false;
              console.log(this.resultAreaFiles);
            }
          }
        }
      }
      // this.loading = false;
    })
  }

  public patchForm(area) {
    this.areaForm.patchValue({
      name: area.name,
      description: area.description,
      rules: area.rules,
      price: area.price,
      fee: area.fee,
      addit_email: area.addit_email || '',
      cert_required: area.cert_required || false
    })
  }


  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  public imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  public imageLoaded(image: LoadedImage) {
    this.isCroppedButton = true;
    this.isCropped = false;
  }

  public deleteResultImage() {
    this.croppedImage = '';
    this.imageChangedEvent = '';
  }

  public back(): void {
    this.router.navigateByUrl('manager/dashboard/' + this.buildId);
  }

  public async showConfirm(name?) {
    let message = 'Are you sure to go back? You changes will not be saved!';
    if (name) {
      message = `Are you sure you want to delete this common area? All data would be lost!`;
    }
    const alert = await this.alertController.create({
      cssClass: 'remove-level',
      header: 'Confirm',
      subHeader: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: () => {
            if (name) {
              this.deleteArea();
            } else this.back();
          }
        }
      ]
    });

    await alert.present();
  }


  public onSelect(event): void {
    console.log(event.target.files);
    if (event.target.files[0].size > 4096000) {
      this.alert.show(ERROR.maxSize)
    }
    this.files.push(event.target.files[0]);
    console.log(this.files);
    this.readFile(this.files[this.files.length - 1]).then(file => {
      // Put this string in a request body to upload it to an API.
      // console.log(file);
      let filenameNew = this.files[this.files.length - 1].name;
      filenameNew = filenameNew.replace('?', '');
      this.noticeFiles[filenameNew] = file;
      let binary = atob(this.noticeFiles[filenameNew].split(',')[1]),
        array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      let blob = new Blob([new Uint8Array(array)], { type: this.files[this.files.length - 1].type });

      this.resultAreaFiles.base64[filenameNew] = file;

      this.resultAreaFiles.blobUrl[filenameNew] = URL.createObjectURL(blob);

      console.log(this.resultAreaFiles)
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

  public toggleCrop() {
    this.imageCropper.crop();
    this.isCroppedButton = false;
    this.isCropped = true;
  }

  public deleteArea() {
    console.log('delete');
    if (this.areaId) {
      this.deletedAreas.push(this.areaId);
    }
  }

  public submit(): void {
    // this.router.navigateByUrl('manager/buildings')
    this.submitted = true;
    this.areas[0] = { ...this.area, ...this.areaForm.value};
    let data = {
      building_id: this.buildId,
      common_areas: this.areas,
      deleted_areas: this.deletedAreas,
      isedit: this.isEdit,
    };
    
    data.common_areas[0].c2a_mobile = this.areas[0].c2a_mobile.value;
    data.common_areas[0].cert_required = data.common_areas[0].cert_required === true ? 1 : 0;

    for (let commonArea in this.areas) {
      this.areas[commonArea].image = this.croppedImage;

      for (let cat in this.filenames) {
        if (this.areas[commonArea].id == cat) {
          this.filenames[cat] = this.filenames[cat].filter(function (value) {
            return value;
          });
          this.areas[commonArea].filenames = this.filenames[cat].join(';');
        }
      }
    }
    console.log(data);
    if (this.areas) {
      this.apiService.post(API.manager.saveCommonAreas + this.buildId, data).subscribe((response) => {
        if (response.status) {
          this.router.navigateByUrl(`manager/building/${this.buildId}/common-areas/show`);
          return;
        }
        this.alert.show(response.message || ERROR.internal)
      });
    }
  }

}

