import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-agent',
  templateUrl: 'agent.page.html',
  styleUrls: ['agent.page.scss'],
})
export class AgentPage implements OnInit {

  constructor(private http: HttpClient,
    private apiService: ApiService,
    private router: Router) {
    console.log('agent constructor');
  }

  ngOnInit(){
  }

}

