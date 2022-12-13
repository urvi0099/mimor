import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { ApiService } from '../../services/api.service';
import { RolesService } from '../../services/roles.service';
import { NavigationService } from '../../services/navigation.service';
import { AlertService } from '../../services/alert.service';
import { ERROR } from '../../shared/constants/errors.constants';
import { API } from '../../shared/constants/api.constants';

@Component({
  selector: 'app-trade-access',
  templateUrl: 'manager-trade-access.page.html',
  styleUrls: ['manager-trade-access.page.scss'],
})
export class ManagerTradeAccess implements OnInit {

  public services = [];
  public trades = [];
  public trade;
  public areas = []
  public isEdit = false;
  public file = {
    name: null,
    content: null
  };
  public instructions = [];
  public instruction = new FormControl();
  public filteredInstructions;
  public deletedFile: boolean = false;
  public radio = [{
    id: 1,
    type: '24/7 Instant Access'
  }, {
    id: 2,
    type: 'Custom Range'
  }];
  public when = this.radio[0];
  public localeDate = new Date().toLocaleString("en-US", {
    timeZone: 'Australia/Sydney'
  });
  public today = new Date(this.localeDate);
  public tomorrow = new Date(this.today);
  public selectedDate;
  public mindate;
  public timeRanges = [
    '12:00 am', '01:00 am', '02:00 am', '03:00 am', '04:00 am', '05:00 am', '06:00 am', '07:00 am', '08:00 am', '09:00 am', '10:00 am', '11:00 am',
    '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm', '07:00 pm', '08:00 pm', '09:00 pm', '10:00 pm', '11:00 pm',
  ];
  public limitsFrom = [];
  public limitsTo = [];
  public timeFrom = '12:00 pm';
  public timeTo = '01:00 pm';
  public timeError = false;
  public buildId = this.route.snapshot.paramMap.get('buildId');
  public tradeId = this.route.snapshot.paramMap.get('tradeId');
  public loading;
  public foundTrade;
  public hasAccess;
  public timeFromCheck;
  public timeToCheck;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private rolesService: RolesService,
    private navigation: NavigationService,
    private alert: AlertService,
    private alertController: AlertController) {
    console.log('manager trade give access constructor');
  }

  ngOnInit() {
    if (this.buildId) {
      this.tomorrow.setDate(this.tomorrow.getDate() + 1);
      this.selectedDate = this.today.getHours() < 22 ? this.today : this.tomorrow;
      this.mindate = this.today.getHours() < 22 ? this.today : this.tomorrow;
      this.trade = this.trades.find(el => el.id === parseInt(this.route.snapshot.paramMap.get('tradeId')));
      this.isEdit = this.route.snapshot.url[this.route.snapshot.url.length - 1].path === 'edit';
      this.filteredInstructions = this.instruction.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.instructions.slice())
        );
      this.getAreas();
      this.getTrades();
      this.getInstructions();
    } else this.router.navigateByUrl('manager/buildings');
  }

  private _filter(name: string): Array<any> {
    const filterValue = name.toLowerCase();
    return this.instructions.filter(option => option.instruction.toLowerCase().includes(filterValue));
  }

  public getAreas() {
    this.apiService.post(API.manager.getCommonAreas + this.buildId).subscribe((response) => {
      if (response && response.status) {
        this.loading = false;
        let foundAreas = response.common_areas;
        for (let el in foundAreas) {
          foundAreas[el].checked = false;
        }
        this.areas = foundAreas;
        this.patchForm();
        return;
      }
      this.router.navigateByUrl('manager/dashboard/' + this.buildId);
    }, () => {
      this.router.navigateByUrl('manager/dashboard/' + this.buildId);
    });
  }

  public patchForm() {
    if (this.trade && this.areas) {
      this.apiService.get(`/api/manager/building/${this.buildId}/trades/${this.tradeId}/access`)
        .subscribe((response) => {
          if (response.data.access && response.data.access.length !== 0) {
            let access = response.data.access;
            this.hasAccess = true;
            access.locations.forEach(el => {
              this.areas.map(ar => {
                if (ar.id === el) {
                  ar.checked = true;
                }
              })
            })
            if (access.instruction) {
              this.instruction.setValue(access.instruction);
            }
            if (access.filename) {
              this.file.name = access.filename;
            }
            if (access.timeslots) {
              let slots = access.timeslots;
              this.when = this.radio[1];
              if (new Date(slots.date) < this.today) {
                this.timeFromCheck = slots.slots.start;
                this.timeToCheck = slots.slots.end;
                this.getTime();
                return;
              }
              this.selectedDate = new Date(slots.date);
              this.timeFrom = slots.slots.start;
              this.timeTo = slots.slots.end;
              this.getTime();
            }
          }
        })
    }
  }

  public getTrades() {
    this.apiService.get(`/api/manager/building/${this.buildId}/trades`).subscribe((response) => {
      if (response.status && response.data) {
        this.foundTrade = response.data.find(el => el.id === this.tradeId);
        if (this.foundTrade) {
          this.getServices();
        }
      }
    })
  }

  public getServices() {
    this.apiService.get(API.manager.services).subscribe((response) => {
      if (response && response.status === true) {
        if (response.data.length !== 0) {
          this.services = response.data;
          this.foundTrade.serviceName = this.services.find(el => this.foundTrade.service_id === el.id).name;
          this.trade = this.foundTrade;
          this.patchForm();
        }
      }
    });
  }

  public getInstructions(){
    this.apiService.get('/api/manager/building/' + this.buildId + '/access-instruction')
    .subscribe((response) => {
      if (response && response.data) {
        this.instructions = response.data;
      }
    })
  }

  public async showConfirm(tradeId) {
    const alert = await this.alertController.create({
      cssClass: 'remove-level',
      header: 'Confirm',
      subHeader: `Are you sure you want to delete this trade's access?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirm',
          handler: () => {
            console.log('Confirm Ok');
            this.loading = true;
            this.apiService.delete('/api/manager/building/' + this.buildId + '/trades/' + this.tradeId + '/access')
              .subscribe((response) => {
                if (response && response.status) {
                  this.router.navigateByUrl(`manager/building/${this.buildId}/trades`)
                  return;
                }
                this.alert.show(response.message || ERROR.internal);
                this.loading = false;
              })
          }
        }
      ]
    });
    await alert.present();
  }

  public onSelect(event): void {
    if (event.target.files[0].size > 4096000) {
      this.alert.show(ERROR.maxSize)
    }

    this.readFile(event.target.files[0]).then(file => {
      // Put this string in a request body to upload it to an API.
      console.log(file);
      this.file.name = event.target.files[0].name.replace('?', '');
      this.file.content = file;
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

  public deleteFile() {
    this.file.name = '';
    this.file.content = '';
  }

  public back(): void {
    this.navigation.back();
  }

  public onTimeChange(from) {
    if (from) {
      let indexTo = this.timeRanges.indexOf(this.timeFrom) + 1;
      this.limitsTo = this.timeRanges.slice(indexTo);
      if (this.timeRanges.indexOf(this.timeTo) <= this.timeRanges.indexOf(this.timeFrom)) {
        this.timeError = true;
        return;
      }
      this.timeError = false;
      return;
    }
    this.timeError = false;
  };
  public selectedAreas() {
    if (this.areas) {
      return !this.areas.find(el => el.checked) || this.timeFrom === this.timeTo
    }
  };
  public getTime() {
    let date = this.today;
    if (this.selectedDate.getDate() === date.getDate() &&
      this.selectedDate.getMonth() === date.getMonth() &&
      this.selectedDate.getFullYear() === date.getFullYear()) {
      let hoursFrom: any = date.getHours() + 1;
      let hoursTo: any = date.getHours() + 2;
      let ampmFrom = hoursFrom >= 12 ? 'pm' : 'am';
      let ampmTo = hoursTo >= 12 ? 'pm' : 'am';
      hoursFrom = hoursFrom % 12;
      hoursTo = hoursTo % 12;
      hoursFrom = hoursFrom ? hoursFrom : 12;
      hoursTo = hoursTo ? hoursTo : 12;
      hoursFrom = hoursFrom < 10 ? '0' + hoursFrom : hoursFrom;
      hoursTo = hoursTo < 10 ? '0' + hoursTo : hoursTo;
      this.timeFrom = hoursFrom + ':00 ' + ampmFrom;
      this.timeTo = hoursTo + ':00 ' + ampmTo;
      let indexFrom = this.timeRanges.indexOf(this.timeFrom);
      let indexTo = this.timeRanges.indexOf(this.timeTo);
      this.limitsFrom = this.timeRanges.slice(indexFrom);
      this.limitsFrom.pop();
      this.limitsTo = this.timeRanges.slice(indexTo);
      // if (this.limitsFrom.includes(this.timeFromCheck)) {
      //   this.timeFrom = this.timeFromCheck;
      // }
      // if (this.limitsTo.includes(this.timeToCheck)) {
      //   this.timeTo = this.timeToCheck;
      // }
    } else {
      this.limitsFrom = JSON.parse(JSON.stringify(this.timeRanges));
      this.limitsTo = JSON.parse(JSON.stringify(this.timeRanges));
    }
  };

  public submit() {
    let locations = this.areas.filter(el => el.checked).map(el => el.id);
    let timeslots = {};
    if (this.when.id === 2) {
      timeslots = {
        date: this.selectedDate.toDateString(),
        slots: {
          start: this.timeFrom,
          end: this.timeTo
        }
      };
    }
    let putParams: any = {
      locations,
      trade_id: this.tradeId,
      timeslots
    }
    if (this.instruction.value) {
      putParams.instruction = this.instruction.value;
    }
    if (this.file.name && this.file.content) {
      putParams.files = {};
      putParams.files[this.file.name] = this.file.content;
    }
    if (this.deletedFile && !this.file.name){
      putParams.files = {};
    }
    this.apiService.put('/api/manager/building/' + this.buildId + '/trades/' + this.tradeId + '/access', putParams)
      .subscribe((response) => {
        if (response && response.status) {
          this.router.navigateByUrl(`manager/building/${this.buildId}/trades`)
          return;
        }
        this.alert.show(response.message || ERROR.internal);
        this.loading = false;
      })
  }

}

