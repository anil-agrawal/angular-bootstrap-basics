import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { UserService } from '../services/user/user.service';
import { Logger } from '../util/logger';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [routerTransition()]
})
export class SignupComponent implements OnInit {

  formData = { 'name': '', 'email': '', 'username': '', 'password': '', 'cnfPassword': '' };

  constructor(private _userService: UserService) { }

  ngOnInit() { }

  onSignUp() {
    Logger.trace('formData : ' + JSON.stringify(this.formData));
    this._userService.userSignUp(this.formData, this);
  }
}
