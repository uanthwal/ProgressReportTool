/*
 * @Author: Upendra <uanthwal@gmail.com>
 * @Date: 2017-06-15 15:03:39
 * @Last Modified by: Upendra
 * @Last Modified time: 2017-06-29 19:03:57
 */
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import { HttpClientService } from './shared/http/base.http.service';
import { URL_CONFIG } from './app.config';

@Injectable()
export class AppService {
  
  constructor(private httpClient: HttpClientService) {
  }

  fetchAccessToOperationalReports(){
    return this.httpClient.get_vr(URL_CONFIG.BASE_URL)
      .map(res => res.json());
  }
}
