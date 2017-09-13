import { LoginComponent } from '../../login/login.component';
import { RestResponse } from '../../to/rest-response';
import { LocalStorageData } from '../../util/local-storage-data';
import { Logger } from '../../util/logger';
import { AppUtil } from './../../util/app-util';
import { RestUtilService } from '../common/rest-util.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  userLogin(formData: Object, caller: any): boolean {
    try {
      AppUtil.restUtilService.post(AppUtil.restURLUtilService.USER_LOGIN, formData, this.onLogin, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  userLogout(caller: any): boolean {
    try {
      AppUtil.restUtilService.get(AppUtil.restURLUtilService.USER_LOGOUT, this.onLogout, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  userSignUp(formData: Object, caller: any): boolean {
    try {
      AppUtil.restUtilService.post(AppUtil.restURLUtilService.USER_SIGNUP, formData, this.onSignUp, caller);
    } catch (e) {
      Logger.error(e);
    }
    return false;
  }

  private onLogin(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      AppUtil.cookie.remove(LocalStorageData.LOGGED_IN_STATUS);
      AppUtil.cookie.put(LocalStorageData.SESSION_ID, response.responseBodyAsJson()['jsessionid']);
      Logger.trace('LocalStorageData.SESSION_ID : ' + AppUtil.cookie.get(LocalStorageData.SESSION_ID));
      AppUtil.cookie.put(LocalStorageData.LOGGED_IN_STATUS, 'true');
      (<LoginComponent>caller).onSuccessfulLogin();
      AppUtil.toast.success('User logged in successfully', 'Success');
    } else {
      AppUtil.cookie.remove(LocalStorageData.LOGGED_IN_STATUS);
      AppUtil.cookie.remove(LocalStorageData.SESSION_ID);
      AppUtil.cookie.put(LocalStorageData.LOGGED_IN_STATUS, 'false');
      AppUtil.toast.error('Login failed', 'Error');
    }
  }

  private onLogout(response: RestResponse, caller: any): void {
    // Don't need to check response status, assuming user logged-out successfully
    AppUtil.userService.onSessionExpired(true);
    try{
      (<LoginComponent>caller).onSuccessfulLogout();
    }catch(e){
      Logger.trace('May be log-out process may not be initialized by login page')
    }
    
  }

  onSessionExpired(isLoggedOut: boolean = false) {
    AppUtil.cookie.remove(LocalStorageData.LOGGED_IN_STATUS);
    AppUtil.cookie.remove(LocalStorageData.LOGGED_OUT_STATUS);
    AppUtil.cookie.remove(LocalStorageData.SESSION_ID);
    AppUtil.cookie.put(LocalStorageData.LOGGED_IN_STATUS, 'false');
    AppUtil.cookie.put(LocalStorageData.LOGGED_OUT_STATUS, 'true');
    if (!isLoggedOut) {
      AppUtil.toast.error('Session expired', 'Error');
      AppUtil.router.navigate(['/login']);
    }

  }

  private onSignUp(response: RestResponse, caller: any): void {
    if (response.status === 200) {
      AppUtil.toast.success('User added successfully', 'Success');
    } else {
      AppUtil.toast.error('User could not be added', 'Error');
    }
  }

}
