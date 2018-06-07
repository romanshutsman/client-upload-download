import {Injectable} from '@angular/core';
import { environment } from './../../environments/environment';
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';


const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  public getFiles() {
    return this.http.get(API_URL + '/data');
  }
  public uploadFiles(body) {
    return this.http.post(API_URL + '/upload', body);
  }

  public download(file) {
    const  headers = new Headers();
    headers.append('content-type', 'application/json');
    return this.http.get(API_URL + '/download/' + file, {
      responseType : 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
  } );
  }

}
