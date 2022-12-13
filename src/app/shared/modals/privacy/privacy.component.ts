import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-privacy',
  templateUrl: 'privacy.html',
  styleUrls: ['privacy.scss'],
})
export class PrivacyModal implements OnInit {

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController
    ) {
    console.log('privacy constructor');
  }

  ngOnInit(){
  }

  public dismiss(): void {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

