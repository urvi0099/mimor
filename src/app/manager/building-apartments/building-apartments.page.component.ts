import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { BUTTONS } from '../../shared/constants/buttons.constants';
import { ERROR } from '../../shared/constants/errors.constants';
import { AlertService } from '../../services/alert.service';
import { API } from '../../shared/constants/api.constants';

@Component({
  selector: 'app-building-apartments',
  templateUrl: 'building-apartments.page.html',
  styleUrls: ['building-apartments.page.scss'],
})
export class BuildingApartmentsPage implements OnInit {

  public buttonText = BUTTONS.next;
  public levels;
  public levelsValues = [];
  public selectedLevelNum: any;
  public selectedLevel: any;
  public levelNames;
  public levelsNames = [];
  public apartmentNames: Array<string>;
  public buildId;
  public building;
  public buildName;
  public deletedLevels = [];
  public deletedApartments = [];
  public count = 0;
  public limit = 0;
  public limitReached = false;
  public lastLevel = 0;
  public startLevel = 0;
  public nextLevel;
  public loading = true;
  public isEdit = false;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService,
    private alertController: AlertController) {
    console.log('building apartment constructor');
  }

  ngOnInit() {
    this.buildId = this.route.snapshot.paramMap.get('buildId');
    this.isEdit = this.route.snapshot.routeConfig.path.split('/')[3] === 'edit';
    if (this.isEdit) {
      this.buttonText = BUTTONS.save;
      this.getApartments();
    } else this.loading = false;
  }

  public getApartments() {
    this.apiService.get(API.manager.getBuildingApartments + this.buildId)
      .subscribe((response) => {
        console.log(response);
        if (response.status) {
          this.building = response.building;
          this.buildName = this.building.name;

          if (response.apartments.length > 0) {
            let levels = {},
              i,
              a;
            for (i in response.apartments) {
              a = response.apartments[i];
              if (!levels[a['l_sort']]) {
                levels[a['l_sort']] = {
                  level: a.level,
                  oldLevel: a.level,
                  apartments: []
                };
                // this.levelsNames[a['l_sort']] = {};
              }

              if (a.status === 'active') {
                levels[a['l_sort']].apartments.push(a);
                // this.levelsNames[a.name] = true;
                this.count++;
              } else if (a.status === 'hidden') {
                levels[a['l_sort']].id = a.id;
              }
            }
            this.levels = levels;
            this.levelsValues = Object.values(this.levels);
            this.selectedLevel = this.levelsValues[0];
            this.selectedLevelNum = this.levelsValues.findIndex(l => l.id == this.selectedLevel.id);

            let keys = Object.keys(this.levels);

            this.lastLevel = keys.length - 1;
            this.nextLevel = keys.length;
            this.selectedLevelNum = keys[0];
          } else {
            this.levels = {};
            this.lastLevel = 0;
            this.nextLevel = 0;
          }
          this.limit = parseInt(response.limit);
          this.loading = false;
          return false;
        }
        this.alert.show(response.message || ERROR.internal);
        this.router.navigateByUrl('manager/dashboard');
      }, () => {
        this.router.navigateByUrl('manager/dashboard');
      });
  }

  public fillNames() {
    this.apartmentNames = [];
    this.levelNames = [];
    this.levelsValues.forEach(level => {
      this.levelNames.push(level.level);
      if (level.apartments.length > 0) {
        level.apartments.forEach(ap => {
          this.apartmentNames.push(ap.name);
        })
      }
    })
  }

  public showLevelApartments(level: any): void {
    this.selectedLevelNum = this.levelsValues.findIndex(l => l.id == level.id);
    this.selectedLevel = level;
    this.apartmentNames = [];
  }

  public removeApartment(i): void {
    console.log(i);
    this.deletedApartments.push(this.levelsValues[this.selectedLevelNum].apartments[i]);
    this.levelsValues[this.selectedLevelNum].apartments.splice(i, 1);
  }

  public enterKey(event): boolean {
    let charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  public addApartments(l) {
    let style = this.levelsValues[l].style,
      i, s,
      apartments = [],
      save = {};
    if (!style) {
      this.alert.show(ERROR.apartments.chooseStyle);
      return false;
    };
    let prefix = this.levelsValues[l].prefix || '';
    let suffix = this.levelsValues[l].suffix || '';
    let start = this.levelsValues[l].start ? parseInt(this.levelsValues[l].start) : false;
    let finish = this.levelsValues[l].finish ? parseInt(this.levelsValues[l].finish) : false;
    if (!start || isNaN(start)) {
      this.alert.show(ERROR.apartments.setStart);
      return false;
    }

    if (!finish || isNaN(finish)) {
      this.alert.show(ERROR.apartments.setFinish);
      return false;
    }

    if (start >= finish) {
      this.alert.show(ERROR.apartments.startGreater);
      return false;
    }

    for (i = start; i <= finish; i++) {
      save = {};
      s = prefix;

      if (style === 'numbering') {
        s += this.levelsValues[l].level;

        if (i < 10) {
          s += '0';
        }
      }
      s += i;
      s += suffix;

      if (this.apartmentNames.includes(s)) {
        this.alert.show(ERROR.apartments.numberExists);
        return false;
      }
      save['name'] = s;
      save['level'] = String(l);
      save['a_sort'] = apartments.length;
      save['l_sort'] = l;

      this.levelsValues[l].apartments.push(save);
    }

    this.levelsValues[l].prefix = '';
    this.levelsValues[l].suffix = '';
    this.levelsValues[l].start = '';
    this.levelsValues[l].finish = '';
    this.fillNames();
    return apartments;
  };

  public addManually(selectedLevel) {
    if (!selectedLevel && selectedLevel !== 0) {
      this.alert.show(ERROR.apartments.createLevel);
      return false;
    }

    var manualAppName = this.levelsValues[selectedLevel].manually,
      save = {};

    if (!manualAppName || manualAppName.length === 0) {
      this.alert.show(ERROR.apartments.emptyManual);
      return false;
    }

    if (this.apartmentNames.includes(manualAppName)) {
      this.alert.show(ERROR.apartments.numberExists);
      return;
    }

    save['name'] = manualAppName;
    save['level'] = String(selectedLevel);
    save['a_sort'] = this.levelsValues[selectedLevel].apartments.length;
    save['l_sort'] = selectedLevel;

    this.levels[selectedLevel].apartments.push(save);
    this.levels[selectedLevel].manually = '';
  };

  public removeLevel(selectedLevel) {
    if (!selectedLevel && selectedLevel !== 0) {
      this.alert.show(ERROR.apartments.createLevel);
      return;
    }
    this.deletedLevels.push(this.levelsValues[selectedLevel]);
    this.levelsValues.splice(selectedLevel, 1);
    if (this.levelsValues.length > 0) {
      this.selectedLevel = this.levelsValues[0];
      this.selectedLevelNum = this.levelsValues.findIndex(l => l.id == this.selectedLevel.id);
    } else {
      this.selectedLevelNum = false;
      this.selectedLevel = false;
    }
  }

  public addLevel(name) {
    // this.loadingModal = true;

    let newLevelName = name;
    let nextLevel = newLevelName;

    if (this.levelsNames.includes(newLevelName)) {
      this.alert.show(ERROR.apartments.levelExists);
      return;
    }
    let nextLevelIndex = this.levelsValues.length;
    this.levelsValues[nextLevelIndex] = {
      level: nextLevel,
      new: true,
      apartments: []
    };
    this.selectedLevel = this.levelsValues[this.levelsValues.length - 1];
    this.selectedLevelNum = this.levelsValues.findIndex(l => l.id == this.selectedLevel.id);
    this.fillNames();
    // this.loadingModal = false;

  };

  public async showConfirm(selectedLevel) {
    const alert = await this.alertController.create({
      cssClass: 'remove-level',
      header: 'Confirm',
      subHeader: 'Would you like to remove this level?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: () => {
            this.removeLevel(selectedLevel);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  public async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'add-level',
      header: 'Confirm',
      subHeader: 'Level number',
      inputs: [
        {
          name: 'name',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Close',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: (data) => {
            this.addLevel(data.name);
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
    // this.router.navigateByUrl('manager/building/guidelines');\
    if (this.loading) {
      return;
    }
    this.loading = true;
    let payload = {
      levels: this.levelsValues,
      deletedLevels: this.deletedLevels,
      deletedApartments: this.deletedApartments,
      isedit: this.isEdit
    }
    this.apiService.put(API.manager.saveApartments + this.buildId, payload
      ).subscribe((response) => {
      if (response.status === true) {
        if (this.isEdit) {
          this.router.navigateByUrl('manager/dashboard');
        } else this.router.navigateByUrl('manager/building/guidelines');
        return false;
      }
      this.alert.show(response.message || ERROR.internal)
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }


}

