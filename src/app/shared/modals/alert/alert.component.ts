import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.html',
  styleUrls: ['alert.scss'],
})
export class AlertModal implements OnInit {

  @Input() message: any;
  @Input() title: any;

  constructor(private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public modalController: ModalController
  ) {
    console.log('alert constructor');
  }

  ngOnInit() {
    
  }

  public dismiss(): void {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}

