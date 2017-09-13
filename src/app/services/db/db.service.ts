import { Injectable, OnInit } from '@angular/core';
import { AppUtil } from '../../util/app-util';
import { FilterOptions } from '../../util/filter-options';
import { SerializationHelper } from '../../util/serialization-helper';
import { Logger } from '../../util/logger';
import { DashboardTO } from './../../to/dashboard/dashboard.to';

@Injectable()
export class DBService implements OnInit{
	
	db:any;
	idbTransaction: any; 
	idbKeyRange: any;

	ngOnInit(){
		this.db = window['indexedDB'] || window['mozIndexedDB'] || window['webkitIndexedDB'] || window['msIndexedDB'];
		this.idbTransaction = window['IDBTransaction'] || window['webkitIDBTransaction'] || window['msIDBTransaction'];
		this.idbKeyRange = window['IDBKeyRange'] || window['webkitIDBKeyRange'] || window['msIDBKeyRange'];
		if (!this.db) {
			Logger.error("Your browser doesn't support a stable version of IndexedDB.")
		}
	}

}