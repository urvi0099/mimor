import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-forgot',
  templateUrl: 'forgot.page.html',
  styleUrls: ['forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  public forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
  })
  public forgotSent = false;

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private navigation: NavigationService) {
    console.log('forgot constructor');
  }

  ngOnInit(){
  }

  public back(): void {
    this.navigation.back();
  }

  public forgot(): void {
    console.log('Test recovery');
    this.forgotSent = true;
  }
}

