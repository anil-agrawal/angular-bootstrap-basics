import { ChangeDetectorRef, ElementRef, ViewContainerRef, ViewRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { DateRangePickerDirective } from 'angular2-daterangepicker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export class SerializationHelper {
  static toInstance<T>(obj: T, json: any): T {
    let jsonObj = {};
    if (typeof json === 'string') {
      jsonObj = JSON.parse(json);
    } else {
      jsonObj = json;
    }

    if (typeof obj['fromJSON'] === 'function') {
      obj['fromJSON'](jsonObj);
    } else {
      for (const propName in jsonObj) {
        if (jsonObj.hasOwnProperty(propName)) {
          let replaceValue = false;
          if (jsonObj[propName] instanceof ElementRef) {
            // Do not override ElementRef instances if already present
            if (obj[propName] === null || obj[propName] === undefined) {
              replaceValue = true;
            }
          } else if (jsonObj[propName] instanceof ChangeDetectorRef) { 
            // Do not override ChangeDetectorRef instances if already present
            if (obj[propName] === null || obj[propName] === undefined) {
              replaceValue = true;
            }
          } else if (jsonObj[propName] instanceof ViewContainerRef) { 
            // Do not override ViewContainerRef instances if already present
            if (obj[propName] === null || obj[propName] === undefined) {
              replaceValue = true;
            }
          } else if (jsonObj[propName] instanceof TranslateService) { 
            // Do not override TranslateService instances if already present
            if (obj[propName] === null || obj[propName] === undefined) {
              replaceValue = true;
            }
          } else if (jsonObj[propName] instanceof Router) {
            // Do not override Router instances if already present
            if (obj[propName] === null || obj[propName] === undefined) {
              replaceValue = true;
            }
          } else if (jsonObj[propName] instanceof DateRangePickerDirective) {
            // Do not override DateRangePickerDirective instances if already present
            if (obj[propName] === null || obj[propName] === undefined) {
              replaceValue = true;
            }
          } else if (jsonObj[propName] instanceof ViewRef) {
            // Do not override ViewRef instances if already present
            if (obj[propName] === null || obj[propName] === undefined) {
              replaceValue = true;
            }
          } else if (jsonObj[propName] instanceof NgbModal) {
            // Do not override NgbModal instances if already present
            if (obj[propName] === null || obj[propName] === undefined) {
              replaceValue = true;
            }
          } else if (jsonObj[propName]!==null && (jsonObj[propName]).constructor !== null && (jsonObj[propName]).constructor.name === 'ViewRef_') {
            // Special handling for ChangeDetectorRef, as its instance doesn't succeed instanceof test
            // Do not override ChangeDetectorRef instances if already present
            if (obj[propName] === null || obj[propName] === undefined) {
              replaceValue = true;
            }
          } else if (jsonObj[propName] !== null && (jsonObj[propName]).constructor !== null && (jsonObj[propName]).constructor.name === 'TemplateRef_') {
            // Special handling for ng-template, as its instance doesn't succeed instanceof test
            // Do not override ng-template instances if already present
            if (obj[propName] === null || obj[propName] === undefined) {
              replaceValue = true;
            }
          } else {
            replaceValue = true;
          }
          if (replaceValue){
            obj[propName] = jsonObj[propName];
          }
          
        }
      }
    }
    return obj;
  }

  static clone(object:any):any{
    return JSON.parse(JSON.stringify(object));
  }
}
