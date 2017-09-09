import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  listAgents(): Promise<any> {
    return this.http.get(environment.rasa_ui_api+'/agents').toPromise();
  }

  getStatus(): Promise<any> {
    return this.http.get(environment.rasa_ui_api+'/rasa/status').toPromise();
  }

  getBotResponse(userQuery, model): Promise<any> {
    return this.http.get(environment.rasa_ui_api+'/rasa/parse?q='+userQuery+'&model='+model).toPromise();
  }
}
