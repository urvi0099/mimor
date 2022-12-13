import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiService {

	constructor(
		private http: HttpClient,
	) {
	}

	public get( query ): Observable<any> {
		let headers = new HttpHeaders();
		headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		headers.append('Access-Control-Allow-Credentials', 'true');
		// return this.http.get(environment.baseUrl + query, { headers, withCredentials: true })
		return this.http.get(environment.baseUrl + query, { headers })
	}

	public getText( query ): Observable<any> {
		let HTTPOptions: Object = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
				'Access-Control-Allow-Credentials': 'true'
			}),
			responseType: 'text'
		}
		return this.http.get(environment.baseUrl + query, HTTPOptions)
	}

	public getFile( query ): Observable<any> {
		let HTTPOptions: Object = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
				'Access-Control-Allow-Credentials': 'true'
			}),
			responseType: 'blob'
		}
		return this.http.get(environment.baseUrl + query, HTTPOptions)
	}

	public postText( query ): Observable<any> {
		let HTTPOptions: Object = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
				'Access-Control-Allow-Credentials': 'true'
			}),
			responseType: 'text'
		}
		return this.http.get(environment.baseUrl + query, HTTPOptions)
	}

	public post( query, payload? ): Observable<any> {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		headers.append('accept', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		headers.append('Access-Control-Allow-Credentials', 'true');
		// return this.http.post(environment.baseUrl + query, payload, { headers, withCredentials: true })
		return this.http.post(environment.baseUrl + query, payload, { headers })
	}

	public put( query, payload? ): Observable<any> {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		headers.append('accept', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		headers.append('Access-Control-Allow-Credentials', 'true');
		// return this.http.put(environment.baseUrl + query, payload, { headers, withCredentials: true })
		return this.http.put(environment.baseUrl + query, payload, { headers })
	}


	public delete( query ): Observable<any> {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		headers.append('accept', 'application/json');
		headers.append('Access-Control-Allow-Origin', '*');
		headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
		headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		headers.append('Access-Control-Allow-Credentials', 'true');
		// return this.http.put(environment.baseUrl + query, payload, { headers, withCredentials: true })
		return this.http.delete(environment.baseUrl + query, { headers })
	}

}
