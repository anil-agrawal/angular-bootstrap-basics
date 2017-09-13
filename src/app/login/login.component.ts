import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AppUtil } from '../util/app-util';
import { LocalStorageData } from '../util/local-storage-data';
import { Logger } from '../util/logger';
import { UserService } from './../services/user/user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    formData = { 'username': '', 'password': '' };

    alertClosed = true;

    constructor() {
    }

    ngOnInit() {
        if (window.location.pathname === '/logout') {
            if (AppUtil.cookie.get(LocalStorageData.LOGGED_OUT_STATUS) === 'true' && AppUtil.cookie.get(LocalStorageData.LOGGED_IN_STATUS) === 'false') {
                // No action required
            } else {
                AppUtil.userService.userLogout(this);
            }
        } else if (window.location.pathname === '/login') {
            if (AppUtil.cookie.get(LocalStorageData.LOGGED_IN_STATUS) === 'true') {
                this.onSuccessfulLogin();
            }
        }
    }

    onLoggedin() {
        Logger.trace('formData : ' + JSON.stringify(this.formData));
        AppUtil.userService.userLogin(this.formData, this);
    }

    onSuccessfulLogin() {
        this.alertClosed = true;
        AppUtil.router.navigate(['/']);
    }

    onSuccessfulLogout() {
        this.alertClosed = false;
        // this._router.navigate(['/login']);
    }

    hasLoginError(): boolean {
        if (AppUtil.cookie.get(LocalStorageData.LOGGED_IN_STATUS) === 'false') {
            return true;
        } else {
            return false;
        }
    }

    hasLoggedOut(): boolean {
        if (AppUtil.cookie.get(LocalStorageData.LOGGED_OUT_STATUS) === 'true') {
            return true;
        } else {
            return false;
        }
    }

    onKeyPress(param:any):void{
        if(param['code']==='Enter'){
            this.onLoggedin();
        }
    }

}
