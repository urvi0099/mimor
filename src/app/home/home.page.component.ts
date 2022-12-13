import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private http: HttpClient,
    private apiService: ApiService) {
    console.log('constructor');
  }
  

  ngOnInit(){
    console.log('init');
  }

}

