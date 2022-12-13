import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manager',
  templateUrl: 'manager.page.html',
  styleUrls: ['manager.page.scss'],
})
export class ManagerPage implements OnInit {

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router) {
    console.log('manager constructor');
  }
  
  ngOnInit(){

  }

 

}

