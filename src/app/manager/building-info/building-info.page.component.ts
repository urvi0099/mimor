import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { BUILD_INFO, CATEGORIES } from '../../shared/constants/mock';
import { quillConfig } from '../../shared/constants/config.constants';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { AlertService } from '../../services/alert.service';
import { WindowRefService } from '../../services/window.service';
import { API } from '../../shared/constants/api.constants';
import { ERROR } from '../../shared/constants/errors.constants';

@Component({
  selector: 'app-building-info',
  templateUrl: 'building-info.page.html',
  styleUrls: ['building-info.page.scss'],
})
export class BuildingInfoPage implements OnInit {

  public buttonText = BUTTONS.next;
  public address = new FormControl('', [Validators.required]);
  public name = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
  public files: File[] = [];
  public building: any = BUILD_INFO;
  public categories: any = CATEGORIES;
  public selected = [];
  public showExample: boolean = false;
  public category;
  public noCategories: boolean = true;
  public quillConfig = quillConfig;
  public resultArrCategory: any = {};
  public isFullscreen: boolean = false;
  public buildName;
  public buildId;
  public keyPDF = [];
  public flagPdg;
  public fileInfo;
  public fileInfoServer;
  public pdf;
  public loading = false;
  public isEdit = false;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService,
    private windowRef: WindowRefService) {
    console.log('building info constructor');
  }

  ngOnInit() {
    this.isEdit = this.route.snapshot.routeConfig.path.split('/')[3] === 'edit';
    this.buildId = this.route.snapshot.paramMap.get('buildId');
    if(this.isEdit){
      this.getBuilding();
    }
  }

  public getBuilding() {
    this.apiService.get(API.manager.getBuilding + this.buildId + '?categories=true')
      .subscribe((response) => {
        if (response.status === true) {
          this.building = response.building;
          this.buildName = this.building.name;
          this.categories = {};

          let i, k, m, key;
          i = 0;

          this.categories = response.categories;

          this.selected = [];

          for (k in this.building.categories) {
            this.selected.push({
              description: this.building.categories[k].description,
              position: this.building.categories[k].position,
              id: this.building.categories[k].id,
              name: this.building.categories[k].name,
              hidden: this.building.categories[k].hidden,
              content_category_id: this.building.categories[k].content_category_id
            });

            if (!!this.building.categories[k].filename) {
              let filenames = this.building.categories[k].filename.split(';');

              this.selected[i].filename = {};

              for (let index in filenames) {
                if (filenames.hasOwnProperty(index)) {
                  this.selected[i].filename[filenames[index]] = location.origin + '/upload/pdf/' + this.buildId + '/' + filenames[index];
                }
              }
            }
            i++;
          }
          for (m in this.categories) {
            this.keyPDF[m] = (this.categories[m].name).replace(/\W/g, '_');
          }

          if (response.fileInfo) {
            this.fileInfo = response.fileInfo;
            if (this.flagPdg) {
              this.fileInfoServer = response.fileInfo;
              this.flagPdg = false;
            }

            for (let keyPdf in this.fileInfo) {
              if (this.fileInfo.hasOwnProperty(keyPdf)) {
                for (let categoryIndex in this.keyPDF) {
                  if (this.keyPDF.hasOwnProperty(categoryIndex)) {
                    if (this.keyPDF[categoryIndex] == keyPdf) {
                      this.pdf[this.categories[categoryIndex].name] = [];

                      this.resultArrCategory[this.categories[categoryIndex].name] = {
                        arrFiles: {},
                        blobUrl: {},
                        isLocal: {}
                      };
                      for (let fileIndex in this.fileInfo[keyPdf]) {
                        if (this.fileInfo[keyPdf].hasOwnProperty(fileIndex)) {
                          this.pdf[this.categories[categoryIndex].name].push(location.origin + '/upload/pdf/' + this.buildId + '/' + this.fileInfo[keyPdf][fileIndex]);
                          this.resultArrCategory[this.categories[categoryIndex].name].arrFiles[this.fileInfo[keyPdf][fileIndex]] = location.origin + '/upload/pdf/' + this.buildId + '/' + this.fileInfo[keyPdf][fileIndex];
                          this.resultArrCategory[this.categories[categoryIndex].name].blobUrl[this.fileInfo[keyPdf][fileIndex]] = location.origin + '/upload/pdf/' + this.buildId + '/' + this.fileInfo[keyPdf][fileIndex];
                          this.resultArrCategory[this.categories[categoryIndex].name].isLocal[this.fileInfo[keyPdf][fileIndex]] = false;
                        }
                      }
                      break;
                    }
                  }
                }
              }
            }
          }
          this.noCategories = Object.keys(this.selected).length === 0;
          return false;
        }
        this.alert.show(response.message || ERROR.internal);
        this.router.navigateByUrl('manager/dashboard');
      }, () => {
        this.router.navigateByUrl('manager/dashboard');
      });
  }

  public onSelect(event: any, category: string): void {
    this.files.push(event.target.files[0]);
    this.readFile(this.files[this.files.length - 1]).then(fileContents => {
      let filenameNew = this.files[this.files.length - 1].name;
      filenameNew = filenameNew.replace('?', '');
      this.resultArrCategory[category].base64[`${filenameNew}`] = fileContents;
      let binary = atob(this.resultArrCategory[category].base64[`${filenameNew}`].split(',')[1]),
        array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      let blob = new Blob([new Uint8Array(array)], { type: this.files[this.files.length - 1].type });

      this.resultArrCategory[category].blobUrl[`${filenameNew}`] = URL.createObjectURL(blob);
      // Put this string in a request body to upload it to an API.
    })
    // Add size validation
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

  public deletePdf(category: string, name: string) {
    delete this.resultArrCategory[category].blobUrl[name];
    delete this.resultArrCategory[category].base64[name]
  }

  public addCategory(category) {
    if (category) {
      this.selected.unshift({
        description: this.categories[category].description,
        id: this.categories[category].id,
        position: -1,
        name: this.categories[category].name,
        hidden: 0
      });
      this.resultArrCategory[this.categories[category].name] = {};
      this.resultArrCategory[this.categories[category].name].blobUrl = {};
      this.resultArrCategory[this.categories[category].name].base64 = {};
      this.noCategories = false;
    }
  };

  public removeCategory(id) {
    this.selected.forEach((el, index) => {
      if (el.id === id) {
        this.selected.splice(index, 1);
      }
    })
  }

  public onRemove(event): void {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public back(): void {
    this.navigation.back();
  }

  public submit(): void {
    console.log(this.files);
    // this.router.navigateByUrl('manager/building/contdet');

    if (this.loading) {
      return;
    }

    this.loading = true;

    let data = {
      categories: {},
      description: this.building.description || '',
      pdf: {},
      isedit: this.isEdit
    };

    for (let category in this.selected) {
      if (this.selected.hasOwnProperty(category)) {

        data.categories[category] = {
          description: this.selected[category].description,
          id: this.selected[category].id,
          hidden: this.selected[category].hidden
        };
        if (this.selected[category].filename) {
          let filenames = Object.keys(this.selected[category].filename);

          data.categories[category].filename = filenames.join(';');

          for (let i in this.resultArrCategory) {
            Object.assign(data.pdf, this.resultArrCategory[i].arrFiles);
          }
        }
      }
    }

    this.apiService.put(API.manager.saveInfo + this.buildId, data)
      .subscribe((response) => {
        if (response.status === true) {
          if(this.isEdit){
            this.router.navigateByUrl('manager/dashboard');
          } else  this.router.navigateByUrl('manager/building/contdet');
          return;
        }
        this.alert.show(response.message || ERROR.internal);
        this.loading = false;
      }, () => {
        this.loading = false;
      });

  }

  public log(i) {
    console.log(i)
  }
}

