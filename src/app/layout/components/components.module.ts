import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { DateTimeRangeComponent } from './date-time-range/date-time-range.component';
import { TagInputModule } from 'ngx-chips';
import { DateRangePickerDirective } from 'angular2-daterangepicker';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DirectivesModule } from './../../directives/directives.module';


@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    DateTimePickerModule,
    TagInputModule,
    FormsModule,
    DirectivesModule
  ],
  declarations: [
    DateTimeRangeComponent,
    DateRangePickerComponent,
    DateRangePickerDirective,
    SpinnerComponent,
  ],
  exports: [
    DateTimeRangeComponent,
    DateRangePickerComponent,
    DateRangePickerDirective,
    SpinnerComponent,
  ],
})
export class ComponentsModule { }
