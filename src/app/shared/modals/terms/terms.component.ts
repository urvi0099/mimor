import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-terms',
  templateUrl: 'terms.html',
  styleUrls: ['terms.scss'],
})
export class TermsModal implements OnInit {

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController
    ) {
    console.log('terms constructor');
  }

  ngOnInit(){
  }

  public dismiss(): void {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

