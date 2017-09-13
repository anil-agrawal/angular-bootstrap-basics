import { RestResponse } from '../../to/rest-response';
import { RestURLUtilService } from './rest-urlutil.service';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../../environments/environment';
import { AppUtil } from '../../util/app-util';
import { LocalStorageData } from '../../util/local-storage-data';
import { Logger } from '../../util/logger';

@Injectable()
export class RestUtilService {

  headers: Headers = new Headers();

  constructor(private _http: Http) {
    this.headers.append('Accept', 'application/json');
  }

  get(url: string, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.prepareRestForEnvironment(url, 'get', callback, caller);
  }

  put(url: string, body: object, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.prepareRestForEnvironment(url, 'put', callback, caller, body);
  }

  post(url: string, body: object, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.prepareRestForEnvironment(url, 'post', callback, caller, body);
  }

  patch(url: string, body: object, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.prepareRestForEnvironment(url, 'patch', callback, caller, body);
  }

  delete(url: string, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.prepareRestForEnvironment(url, 'delete', callback, caller);
  }

  options(url: string, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.prepareRestForEnvironment(url, 'options', callback, caller);
  }

  private prepareRestForEnvironment(url: string, method: string, callback: (response: RestResponse, caller: any) => void, caller: any, body?: object) {
    if (environment.env === 'qa') {
      method = method.toLowerCase();
      url = url + '_' + method;
      this._get(url, callback, caller);
    } else {
      method = method.toUpperCase();
      switch (method) {
        case 'GET': { this._get(url, callback, caller); break; }
        case 'PUT': { this._put(url, body, callback, caller); break; }
        case 'POST': { this._post(url, body, callback, caller); break; }
        case 'PATCH': { this._patch(url, body, callback, caller); break; }
        case 'DELETE': { this._delete(url, callback, caller); break; }
        case 'OPTIONS': { this._options(url, callback, caller); break; }
        default: { this._get(url, callback, caller); }
      }
    }
  }

  private _get(url: string, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.headers.delete('Content-Type');
    const localResponse: RestResponse = new RestResponse();
    try {
      const options = new RequestOptions({ headers: this.headers, withCredentials: true });
      const self = this;
      const subscription: Subscription = self._http.get(url, options).subscribe(
        (response: Response) => self.onResponse(response, localResponse),
        (error: any) => self.onError(error, localResponse, callback, caller),
        () => self.onComplete(localResponse, callback, caller)
      );
    } catch (e) {
      localResponse.exp = true;
      localResponse.expMsg = e;
      callback(localResponse, caller);
      Logger.error(e);
    }
  }

  private _put(url: string, body: object, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.headers.delete('Content-Type');
    this.headers.append('Content-Type', 'application/json');
  }

  private _post(url: string, body: object, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.headers.delete('Content-Type');
    this.headers.append('Content-Type', 'application/json');
    const localResponse: RestResponse = new RestResponse();
    try {
      const options = new RequestOptions({ headers: this.headers });
      const self = this;
      const subscription: Subscription = self._http.post(url, JSON.stringify(body), options).subscribe(
        (response: Response) => self.onResponse(response, localResponse),
        (error: any) => self.onError(error, localResponse, callback, caller),
        () => self.onComplete(localResponse, callback, caller)
      );
    } catch (e) {
      localResponse.exp = true;
      localResponse.expMsg = e;
      callback(localResponse, caller);
      Logger.error(e);
    }
  }

  private _patch(url: string, body: object, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.headers.delete('Content-Type');
    this.headers.append('Content-Type', 'application/json');
  }

  private _delete(url: string, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.headers.delete('Content-Type');
  }

  private _options(url: string, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    this.headers.delete('Content-Type');
  }

  onResponse(response: Response, ref: RestResponse): void {
    ref.status = response.status;
    ref.body = response.text();
  }

  onError(error: any, ref: RestResponse, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    ref.success = false;
    try {
      ref.status = error.status;
      if (error.status === 401) {
        AppUtil.userService.onSessionExpired();
      }
      ref.body = error._body;
    } catch (e) { }
    callback(ref, caller);
  }

  onComplete(ref: RestResponse, callback: (response: RestResponse, caller: any) => void, caller: any): void {
    ref.success = true;
    callback(ref, caller);
  }

}
