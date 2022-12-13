import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from '../services/api.service';

@Component({
	selector: 'app-agent',
	templateUrl: 'auth.page.html',
	styleUrls: ['auth.page.scss'],
})
export class AuthPage implements OnInit {

	constructor( private http: HttpClient,
				 private apiService: ApiService,
				 private router: Router,
				 private route: ActivatedRoute ) {
		console.log('auth constructor');
	}

	ngOnInit() {
	}

}

