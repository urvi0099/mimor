import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

import { BOOKINGS } from '../../constants/mock';
import { WindowRefService } from '../../../services/window.service';
import { ApiService } from '../../../services/api.service';
import { AlertService } from '../../../services/alert.service';
import { ERROR } from '../../constants/errors.constants';
import { API } from '../../constants/api.constants';

@Component({
  selector: 'app-add-parcel',
  templateUrl: 'add-parcel.html',
  styleUrls: ['add-parcel.scss'],
})
export class AddParcelModal implements OnInit {

  public isApartmentValid = false;
  public isResident = false;
  public other = 'Other';
  public isApartmentsFetched = true;
  public isSubmitted = false;
  public checkboxModel = this.windowRef.nativeWindow.localStorage.getItem('checkboxModel') ?
    JSON.parse(this.windowRef.nativeWindow.localStorage.getItem('checkboxModel')) :
    {
      sms: true,
      email: true
    };
  public apartment: string;
  public carrierId = '';
  public form = {
    apartment: '',
    userId: '',
    carrier: {
      id: '0',
      name: '',
    },
  };
  public carriers = [
    {
      "id": "1",
      "name": "Australia Post",
    },
    {
      "id": "2",
      "name": "Startrack",
    },
    {
      "id": "3",
      "name": "Other",
    }
  ];
  public users = [];
  public bookings = [];
  public apartments = [];
  public locations = [
    {
      "location": "Back Office"
    },
    {
      "location": "Front Office"
    },
    {
      "location": "Concierge desk"
    }
  ];
  public parcelsToAdd = [];
  public formData: any = {};
  public isUnknown = false;
  public unknown = {
    name: null,
    email: null,
    phone: null,
    message: this.windowRef.nativeWindow.localStorage.getItem('message')
  }
  public model: any = {};

  public deleteModalOpen = false;
  public isEdit = false;
  public editId;
  public bookingUsers = [];
  public selectedApartments = [];
  public uniqueUsers = [];
  public selectedUsers = [];
  public deleteId;
  public manyParcels = false;
  public filteredResidents;
  public resident = new FormControl();
  public filteredApartments;
  public unApartment = new FormControl();
  public buildId;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController,
    private windowRef: WindowRefService,
    private apiService: ApiService,
    private alert: AlertService
  ) {
    console.log('terms constructor');
    this.formData.location = 'Desk';
    this.model.selectedApartment = null;
    this.model.selectedUser = null;
  }

  ngOnInit() {
    console.log(this.buildId);
    this.getActiveBookings();
    this.getCarriers();
    this.filteredResidents = this.resident.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.searchResidents(name) : this.uniqueUsers.slice())
      );
    this.filteredApartments = this.unApartment.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.searchApartments(name) : this.apartments.slice())
      );
  }

  public selectApartment() {
    this.model.selectedApartment = this.apartments.find(ap => ap.name === this.unApartment.value);
  }

  public selectResident() {
    this.model.selectedUser = this.uniqueUsers.find(user => user.name === this.resident.value);
  }

  public getActiveBookings() {
    this.apiService.get(API.manager.getActiveBookings + this.buildId)
      .subscribe((response) => {
        this.bookings = response.bookings;
        this.bookingUsers = this.bookings.map(booking => booking.user);
        this.apartments = this.bookings.map(booking => booking.apartment);
        this.selectedApartments = this.apartments.filter(ap => parseInt(ap.name));
        let uniqueNames = [];
        this.uniqueUsers = [];
        this.bookingUsers.forEach((el) => {
          if (!uniqueNames.includes(el.name)) {
            uniqueNames.push(el.name);
            this.uniqueUsers.push(el);
          }
        })
        this.selectedUsers = this.uniqueUsers;
      }
      )
  };

  public getCarriers() {
    this.carriers = this.sortCarriers(this.carriers)
    this.form.carrier = this.carriers[this.carriers.length - 1];
    this.carrierId = this.form.carrier.id;
  };

  public sortCarriers(carriers) {
    carriers.sort((a, b) => {
      if (a.name === this.other) return 1;
      if (b.name === this.other) return -1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
    });
    return carriers;
  };

  public dismiss(): void {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  public toggleUnknown() {
    this.isUnknown = !this.isUnknown;
    this.users = [];
    this.form.userId = '';
  }

  public onEnterApartmentNumber() {
    const value = this.form.apartment;
    console.log(this.form.apartment)
    if (parseInt(value)) {
      this.isResident = false;
      const apartmentNumber = value;
      this.users = this.bookings
        .filter(booking => booking.apartment.name === apartmentNumber)
        .map(booking => booking.user);
      this.isApartmentValid = this.bookings.find(el => el.apartment.name === value);
      if (!this.isApartmentValid) {
        this.clearUnknown();
      }
    } else if (value) {
      this.isResident = true;
      this.clearUnknown();
      this.users = this.uniqueUsers.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase()));
    }
  };

  public clearUnknown() {
    this.isUnknown = false;
    this.unknown = {
      name: null,
      email: null,
      phone: null,
      message: this.windowRef.nativeWindow.localStorage.getItem('message')
    };
  }

  public searchApartments(value) {
    if (this.model.selectedUser) {
      this.selectedApartments = this.bookings
        .filter(el => el.user_id === this.model.selectedUser.id)
        .map(el => el.apartment);
    } else {
      this.selectedApartments = this.apartments.filter(ap => parseInt(ap.name) && ap.name.includes(value));
    }
  }

  public searchResidents(value) {
    if (this.model.selectedApartment) {
      this.selectedUsers = this.bookings
        .filter(book => book.appartment_id === this.model.selectedApartment.id)
        .map(book => book.user);
    } else {
      this.selectedUsers = this.uniqueUsers.filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase()));
    }
    this.isResident = true;
    this.clearUnknown();
  };

  public prepareInfoForPrint() {
    let output = '';
    for (let el in this.unknown) {
      if (this.unknown[el]) {
        output += `<div>${el}: ${this.unknown[el]}</div>`;
      }
    }
    output = '<html><body>' + output + '</body></html>';
    this.printInfoDialog(output);
  }

  public printInfoDialog(data) {
    let mywindow = this.windowRef.nativeWindow.open('', 'Parcel', 'height=400,width=600');
    mywindow.document.write(`<html><head><title>Mimor - Apartment #${this.form.apartment} Parcel</title>`);
    mywindow.document.write('</head><body><br>');
    mywindow.document.write(data);
    mywindow.document.write('</body></html>');
    mywindow.document.close();
    mywindow.focus();
    mywindow.print();
    mywindow.close();
  };

  public checkForm() {
    return (!this.isApartmentValid && !this.isResident) || (!this.form.userId && !this.isUnknown) ||
      !this.form.carrier || this.isSubmitted || !this.formData.location ||
      (!this.checkboxModel.sms && !this.checkboxModel.email && !this.isUnknown)
  }

  public checkAddForm() {
    return !this.model.selectedApartment ||
      (!this.model.selectedUser && !this.isUnknown) ||
      (!this.checkboxModel.sms && !this.checkboxModel.email) ||
      !this.form.carrier ||
      !this.formData.location
  }

  public createParcel(addMore) {
    let apartment;
    if (!this.isResident) {
      apartment = this.bookings.find(booking => booking.apartment.name === this.form.apartment);
    } else apartment = this.bookings.find(booking => parseInt(booking.user.id) === parseInt(this.form.userId));
    this.isSubmitted = true;
    const resident = this.uniqueUsers.find(user => parseInt(this.form.userId) === parseInt(user.id));
    if (this.unknown.message) this.windowRef.nativeWindow.localStorage.setItem('message', this.unknown.message);
    let dataToSend = JSON.parse(JSON.stringify(this.unknown));
    if (this.isUnknown && !this.unknown.name) dataToSend.name = 'Unknown';
    const createdParcel = {
      apartment: apartment.apartment,
      sms: this.checkboxModel.sms,
      email: this.checkboxModel.email,
      carrier: this.form.carrier,
      location: this.formData.location,
      resident,
      unknown: this.isUnknown ? dataToSend : {}
    };
    if (addMore) {
      this.parcelsToAdd.push(createdParcel);
      this.manyParcels = true;
    } else {
      this.sendParcel(createdParcel);
    }
  };

  public sendParcel(parcel) {
    console.log(parcel);
    this.apiService.post('/api/manager/parcels', { parcels_array: [parcel], buildId: this.buildId })
      .subscribe(res => {
        if (res.status) {
          console.log(res);
          this.dismiss();
        } else {
          this.alert.show(res.data || ERROR.internal);
        }
      })
  }

  public sendParcels() {
    this.apiService.post('/api/manager/parcels', { parcels_array: this.parcelsToAdd, buildId: this.buildId })
      .subscribe(res => {
        if (res.status) {
          console.log(res);
          this.dismiss();
        } else {
          this.alert.show(res.data || ERROR.internal);
        }
      })
  };

  public addParcelByOne() {
    let parcel: any = {
      apartment: this.model.selectedApartment,
      resident: this.model.selectedUser,
      sms: this.checkboxModel.sms,
      email: this.checkboxModel.email,
      carrier: this.form.carrier,
      location: this.formData.location,
    };
    if (this.isUnknown) {
      parcel.unknown = JSON.parse(JSON.stringify(this.unknown));
    }
    if (this.isEdit) {
      this.parcelsToAdd[this.editId] = parcel;
      this.isEdit = false;
    } else this.parcelsToAdd.push(parcel);
    this.model.selectedApartment = null;
    this.model.selectedUser = null;
    this.unApartment.setValue('');
    this.resident.setValue('');
    this.form.carrier = this.carriers[this.carriers.length - 1];
    this.unknown = {
      name: null,
      email: null,
      phone: null,
      message: this.windowRef.nativeWindow.localStorage.getItem('message')
    }
    this.isUnknown = false;
  }

  public sortParcels(sort) {
    if (sort === 1) {
      this.parcelsToAdd
        .sort((a, b) => parseInt(a.apartment.name) < parseInt(b.apartment.name) ? -1 : 1)
    } else if (sort === 2) {
      this.parcelsToAdd
        .sort((a, b) => a.resident.name < b.resident.name ? -1 : 1)
    } else if (sort === 3) {
      this.parcelsToAdd
        .sort((a, b) => a.carrier.name < b.carrier.name ? -1 : 1)
    } else if (sort === 4) {
      this.parcelsToAdd
        .sort((a, b) => a.location < b.location ? -1 : 1)
    } else if (sort === 5) {
      this.parcelsToAdd
        .sort((a, b) => a.sms && !b.sms ? -1 : 1)
    } else if (sort === 6) {
      this.parcelsToAdd
        .sort((a, b) => a.email && !b.email ? -1 : 1)
    }
  }

  public addParcels(ev) {
    this.createParcel(true);
  };

  public editParcel(id) {
    this.isEdit = true;
    this.editId = id;
    const parcel = this.parcelsToAdd[id];
    this.model.selectedApartment = parcel.apartment;
    this.unApartment.setValue(parcel.apartment.name);
    this.model.selectedUser = parcel.resident;
    this.resident.setValue(parcel.resident.name);
    this.checkboxModel.sms = parcel.sms;
    this.checkboxModel.email = parcel.email;
    this.form.carrier = this.carriers.find(car => car.name === parcel.carrier.name);
    this.formData.location = parcel.location;
    if (parcel.unknown) {
      this.unknown = parcel.unknown;
      this.isUnknown = true;
    }
  }

  public deleteParcel(id) {
    this.deleteId = id;
    this.deleteModalOpen = true;
    this.confirmDelete();
  }

  public confirmDelete() {
    this.deleteModalOpen = false;
    this.parcelsToAdd.splice(this.deleteId, 1);
  }

  public closeDeleteModal() {
    this.deleteModalOpen = false;
  }

}

