import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.html',
  styleUrls: ['contact.scss'],
})
export class ContactModal implements OnInit {

  @Input() model: any;
  @Input() cont_det_switchers: any;
  @Input() contDets: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController
  ) {
    console.log('contact constructor');
  }

  ngOnInit() {
  }

  public dismiss(): void {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  public isNoBuildingInfo(): boolean {
    if (!this.cont_det_switchers.owner_corp_global && !this.cont_det_switchers.building_global) {
      return true;
    }
    return false;
  }

}

