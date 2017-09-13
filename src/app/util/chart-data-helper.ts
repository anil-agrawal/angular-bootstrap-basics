export class ChartDataHelper {

	static formatNumericValue(value:any, unit:any):number{
		let data:any;
		switch(unit){
			case 'count' : {
				data = value;
				break;
			}
			case '%': {
				data = new Number(value).toFixed(2);
				break;
			}
			case 'ms':
			case 'MS':
			case 'Ms': {
				data = new Number(value).toFixed(2);
				break;
			}
			case 'MB':
			case 'Mb':
			case 'mb': {
				data = new Number(value).toFixed(2);
				break;
			}
			case 'GB':
			case 'Gb':
			case 'gb': {
				data = new Number(value).toFixed(2);
				break;
			}
			case 'byte':
			case 'bytes':
			case 'Byte':
			case 'Bytes': {
				data = new Number(value).toFixed(2);
				break;
			}
			case 'mbps':
			case 'MBPS':
			case 'Mbps':
			case 'MBps': {
				data = new Number(value).toFixed(2);
				break;
			}
			default: {
				data = value;
			}
		}
		if (value === undefined || value===null){
			data = 0;
		}
		return data/1;
	}

	static appendValueWithUnit(value:any, unit:any):string{
		let data:any;
		switch (unit) {
			case 'count': {
				data = value+'';
				break;
			}
			case '%': {
				data = new Number(value).toFixed(2) + ' ' + unit;
				break;
			}
			case 'ms':
			case 'MS':
			case 'Ms': {
				data = new Number(value).toFixed(2) + ' ' + unit;
				break;
			}
			case 'MB':
			case 'Mb':
			case 'mb': {
				data = new Number(value).toFixed(2) + ' ' + unit;
				break;
			}
			case 'GB':
			case 'Gb':
			case 'gb': {
				data = new Number(value).toFixed(2) + ' ' + unit;
				break;
			}
			case 'byte':
			case 'bytes':
			case 'Byte':
			case 'Bytes': {
				// data = new Number(value).toFixed(2) + ' ' + unit;
				data = value;
				data = data / 1024; //kb
				data = data / 1024; //mb
				if (data<1024) {
					data = new Number(data).toFixed(2) + ' MB';
				}else{
					data = data / 1024; //gb
					data = new Number(data).toFixed(2) + ' GB';
				}
				break;
			}
			case 'mbps':
			case 'MBPS':
			case 'Mbps':
			case 'MBps': {
				data = new Number(value).toFixed(2) + ' ' + unit;
				break;
			}
			default : {
				data = value+'';
			}
		}
		if (value === undefined || value === null) {
			data = '';
		}
		return data;
	}
}
