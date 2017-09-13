import { Component, OnInit, Input } from '@angular/core';
import { Constants } from '../../../util/constants'
import { BaseComponent } from '../../../util/base-component';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent extends BaseComponent {

	@Input() show = false;
	@Input() marginLeft = 0;
	@Input() marginTop = 0;
	width :number;
	height: number;

	constructor(){
		super();
		this.width = Constants.SPINNER_SIZE;
		this.height = Constants.SPINNER_SIZE;
	}

}
