import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-resident',
  templateUrl: 'resident.page.html',
  styleUrls: ['resident.page.scss'],
})
export class ResidentPage implements OnInit {

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router) {
    console.log('guest constructor');
  }
  
  ngOnInit(){
  }
}

