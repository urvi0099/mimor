import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ModalController} from '@ionic/angular';
import {SignaturePad} from 'angular2-signaturepad';

import {ApiService} from '../../services/api.service';
import {RolesService} from '../../services/roles.service';
import {BUILD_INFO, PARCELS} from '../../shared/constants/mock';
import {NavigationService} from '../../services/navigation.service';
import {AlertService} from '../../services/alert.service';
import {AddParcelModal} from '../../shared/modals/add-parcel/add-parcel.component';
import {API} from '../../shared/constants/api.constants';


@Component({
    selector: 'app-building-parcels',
    templateUrl: 'building-parcels.page.html',
    styleUrls: ['building-parcels.page.scss'],
})
export class BuildingParcelsPage implements OnInit {

    @ViewChild(SignaturePad) signaturePad: SignaturePad;

    public buildName = '';
    public isPageLoading = true;
    public isNextPageAvailable = false;
    public pageSize = 5;
    public page = 1;
    public form: any = {search: ''};
    public sortByAp = false;
    public selectedParcelId = null;
    public tableHeaders = [
        'Name',
        'Apartment #',
        'Location',
        'Status',
        'Date',
        'Action'
    ];
    public sortingBy = [{id: 1, name: 'Date'}, {id: 2, name: 'Apartment'}];
    public parcels: any = [];
    public confirmModalOpen = false;
    public parcel: any;
    public signature: any;
    public filename: any;
    public buildId = this.route.snapshot.paramMap.get('buildId');
    public building;

    private signaturePadOptions: Object = {
        'canvasHeight': 500
    };

    constructor(private http: HttpClient,
                private apiService: ApiService,
                private router: Router,
                private route: ActivatedRoute,
                private rolesService: RolesService,
                private navigation: NavigationService,
                private alert: AlertService,
                private modalController: ModalController,
                private alertController: AlertController) {
        console.log('building congratulations constructor');
        this.form.sorting = this.sortingBy[0];
    }

    ngOnInit() {
        if (!this.buildId) {
            this.router.navigateByUrl('manager/buildings');
        } else {
            this.selectBuilding();
        }

    }

    public getBuilding() {
        this.apiService.get(API.manager.getBuilding + this.buildId)
            .subscribe(response => {
                if (response.status) {
                    console.log(response)
                    this.building = response.building;
                    this.buildName = this.building.name;
                }
            });
    }

    public selectBuilding(): void {
        this.apiService
            .put(API.client.selectBuilding, {id: this.buildId})
            .subscribe(() => {
                this.getBuilding();
                this.getParcels();
            });
    }

    public getParcels() {
        this.apiService
            .get(API.manager.parcels + `?buildId=${this.buildId}&per_page=${this.pageSize}&page=${this.page}&apartment_order='${this.sortByAp}&recipient_name=${this.form.search}`)
            .subscribe((response) => {
                console.log(response);
                if (!response.status) return;
                this.parcels = response.data.map(parcel => {
                    parcel.updated_at = new Date(parcel.updated_at.replace(' ', 'T'));
                    return parcel;
                });
                this.isNextPageAvailable = !!response.next_page_url;
                this.isPageLoading = false;
            });
    }

    public showConfirmPickup(event, parcelId) {
        this.parcel = this.parcels.find(el => el.id === parcelId);
        this.confirmModalOpen = true;
    };

    public closeConfirmModal() {
        if (this.confirmModalOpen) this.confirmModalOpen = false;
    }

    public drawComplete() {
        this.signature = this.signaturePad.toDataURL();
    }

    public clearSignature() {
        this.signaturePad.clear();
        this.signature = '';
    }

    public markAsReceived = (id, sign) => {
        this.filename = `Parcel${id}Signature.png`;
        let putParams = {files: {}, buildId: null};
        putParams.files[this.filename] = this.signature;
        putParams.buildId = this.buildId;
        this.apiService
            .put(`/api/manager/parcels/${id}/mark-as-received`, putParams)
            .subscribe(() => {
                this.confirmModalOpen = false;
                this.signature = undefined;
                this.getParcels();
            });
        this.confirmModalOpen = false;
    }

    public changePage(n) {
        this.page += n;
        this.getParcels();
    };

    public back(): void {
        this.navigation.back();
    }

    public submit(): void {
        this.router.navigateByUrl('manager/buildings')
    }

    public async deleteParcel(id) {
        const alert = await this.alertController.create({
            cssClass: 'remove-level',
            header: 'Confirm',
            subHeader: 'Would you like to remove this parcel?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Confirm',
                    handler: () => {
                        this.apiService.delete(API.manager.parcels + '/' + id)
                            .subscribe(() => this.getParcels());
                        console.log('Confirm Ok');
                    }
                }
            ]
        });
        await alert.present();
    }

    async addParcel(type) {
        const modal = await this.modalController.create({
            component: AddParcelModal,
            componentProps: {
                buildId: this.buildId
            },
            cssClass: 'add-parcel-modal'
        });
        modal.onDidDismiss().then(() => {
            this.getParcels();
        });
        return await modal.present();
    }


}

