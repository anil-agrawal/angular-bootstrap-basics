import { Injectable } from '@angular/core';
import { AppUtil } from '../../util/app-util';
import { LocalStorageData } from '../../util/local-storage-data';
import { Logger } from '../../util/logger';

@Injectable()
export class ComponentHolderService {

  private componentHolder = {};

  push(uid: string, component: any): void {
    this.componentHolder[uid] = component;
  }

  get(uid: string): any {
    return this.componentHolder[uid];
  }

  getUIDs(): string[] {
    return Object.keys(this.componentHolder);
  }

}
