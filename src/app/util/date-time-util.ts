export class DateTimeUtil {

  static monthMap = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec'
  };

  static getShortYear(date: Date): string {
    const year = date.getFullYear();
    return (year + '').substr(2);
  }

  static get24Hours(date: Date): string {
    const hour = date.getHours();
    return hour > 9 ? hour + '' : '0' + hour;
  }

  static getMinutes(date: Date): string {
    const minutes = date.getMinutes();
    return minutes > 9 ? minutes + '' : '0' + minutes;
  }

  static fetchShortDateTime(date: Date): string {
    return date.getDate() + '' + DateTimeUtil.monthMap[date.getMonth()] + '' + DateTimeUtil.getShortYear(date) + ' ' + DateTimeUtil.get24Hours(date) + ':' + DateTimeUtil.getMinutes(date);
  }

  static calculateRoundOffTo5Minutes(timeValue:number): number{
    let result = timeValue / (1000 * 60 * 5);
    result = parseInt(result.toFixed(0));
    result = result * (1000 * 60 * 5);
    return result;
  }

  static calculateRoundOffTo1Minutes(timeValue: number): number {
    let result = timeValue / (1000 * 60 * 1);
    result = parseInt(result.toFixed(0));
    result = result * (1000 * 60 * 1);
    return result;
  }

  static calculateRoundOffTo1Hours(timeValue: number): number {
    let result = timeValue / (1000 * 60 * 60);
    result = parseInt(result.toFixed(0));
    result = result * (1000 * 60 * 60);
    return result;
  }

  static calculateRoundOffTo24Hours(timeValue: number): number {
    let result = timeValue / (1000 * 60 * 60*24);
    result = parseInt(result.toFixed(0));
    result = result * (1000 * 60 * 60*24);
    return result;
  }

  static calculateRoundOffTo168Hours(timeValue: number): number {
    let result = timeValue / (1000 * 60 * 60 * 168);
    result = parseInt(result.toFixed(0));
    result = result * (1000 * 60 * 60 * 168);
    return result;
  }

  static find10MinRange(timeValue: number): { fromTime: number, toTime: number } {
    const baseValue = DateTimeUtil.calculateRoundOffTo1Minutes(timeValue);
    const result = { 'fromTime': 0, 'toTime': 0 };
    if ((baseValue - timeValue) > (1000 * 60 * 1*10 / 2)) {
      if ((baseValue - timeValue) > (1000 * 60 * 3*10 / 4)) {
        result['fromTime'] = baseValue - (1000 * 60 * (1*10 + 1*10 / 2));
        result['toTime'] = result['fromTime'] + (1000 * 60 * 1*10);
      } else {
        result['fromTime'] = baseValue - (1000 * 60 * 1*10);
        result['toTime'] = baseValue;
      }

    } else {
      if ((baseValue - timeValue) > (1000 * 60 * 1*10 / 4)) {
        result['fromTime'] = baseValue - (1000 * 60 * 1*10);
        result['toTime'] = baseValue;
      } else {
        result['fromTime'] = baseValue - (1000 * 60 * 1*10 / 2);
        result['toTime'] = result['fromTime'] + (1000 * 60 * 1*10);
      }
    }
    const halfGap = (10 / 2) * 60 * 1000;
    result['fromTime'] = result['fromTime'] + halfGap;
    result['toTime'] = result['toTime'] + halfGap;
    return  result;
  }

  static find1MinRange(timeValue: number): { fromTime: number, toTime: number } {
    const baseValue = DateTimeUtil.calculateRoundOffTo1Minutes(timeValue);
    const result = { 'fromTime': 0, 'toTime': 0 };
    if ((baseValue - timeValue) > (1000 * 60 * 1/2)) {
      if ((baseValue - timeValue) > (1000 * 60 * 3/4)) {
        result['fromTime'] = baseValue - (1000 * 60 * (1+1/2));
        result['toTime'] = result['fromTime'] + (1000 * 60 * 1);
      } else{
        result['fromTime'] = baseValue - (1000 * 60 * 1);
        result['toTime'] = baseValue;
      }
      
    } else {
      if ((baseValue - timeValue) > (1000 * 60 * 1/4)) {
        result['fromTime'] = baseValue - (1000 * 60 * 1);
        result['toTime'] = baseValue;
      } else {
        result['fromTime'] = baseValue - (1000 * 60 * 1/2);
        result['toTime'] = result['fromTime'] + (1000 * 60 * 1);
      }
    }
    const halfGap = (1 / 2) * 60 * 1000;
    result['fromTime'] = result['fromTime'] + halfGap;
    result['toTime'] = result['toTime'] + halfGap;
    return result;
  }

  static find1HourRange(timeValue: number): { fromTime: number, toTime: number } {
    const baseValue = DateTimeUtil.calculateRoundOffTo1Hours(timeValue);
    const result = { 'fromTime': 0, 'toTime': 0 };
    if ((baseValue - timeValue) > (1000 * 60 * 60 / 2)) {
      if ((baseValue - timeValue) > (1000 * 60 * 60*3 / 4)) {
        result['fromTime'] = baseValue - (1000 * 60 * (60 + 60 / 2));
        result['toTime'] = result['fromTime'] + (1000 * 60 * 60);
      } else {
        result['fromTime'] = baseValue - (1000 * 60 * 60);
        result['toTime'] = baseValue;
      }

    } else {
      if ((baseValue - timeValue) > (1000 * 60 * 60 / 4)) {
        result['fromTime'] = baseValue - (1000 * 60 * 60);
        result['toTime'] = baseValue;
      } else {
        result['fromTime'] = baseValue - (1000 * 60 * 60 / 2);
        result['toTime'] = result['fromTime'] + (1000 * 60 * 60);
      }
    }
    const halfGap = (60 / 2) * 60 * 1000;
    result['fromTime'] = result['fromTime'] + halfGap;
    result['toTime'] = result['toTime'] + halfGap;
    return result;
  }

  static find24HourRange(timeValue: number): { fromTime: number, toTime: number } {
    const baseValue = DateTimeUtil.calculateRoundOffTo1Hours(timeValue);
    const result = { 'fromTime': 0, 'toTime': 0 };
    if ((baseValue - timeValue) > (1000 * 60 * 60*24 / 2)) {
      if ((baseValue - timeValue) > (1000 * 60 * 60 * 3*24 / 4)) {
        result['fromTime'] = baseValue - (1000 * 60 * (60*24 + 60*24 / 2));
        result['toTime'] = result['fromTime'] + (1000 * 60 * 60 * 24);
      } else {
        result['fromTime'] = baseValue - (1000 * 60 * 60*24);
        result['toTime'] = baseValue;
      }

    } else {
      if ((baseValue - timeValue) > (1000 * 60 * 60*24 / 4)) {
        result['fromTime'] = baseValue - (1000 * 60 * 60*24);
        result['toTime'] = baseValue;
      } else {
        result['fromTime'] = baseValue - (1000 * 60 * 60*24 / 2);
        result['toTime'] = result['fromTime'] + (1000 * 60 * 60*24);
      }
    }
    const halfGap = (24*60 / 2) * 60 * 1000;
    result['fromTime'] = result['fromTime'] + halfGap;
    result['toTime'] = result['toTime'] + halfGap;
    return result;
  }

  static find168HourRange(timeValue: number): { fromTime: number, toTime: number } {
    const baseValue = DateTimeUtil.calculateRoundOffTo1Hours(timeValue);
    const result = { 'fromTime': 0, 'toTime': 0 };
    if ((baseValue - timeValue) > (1000 * 60 * 60 * 168 / 2)) {
      if ((baseValue - timeValue) > (1000 * 60 * 60 * 3 * 168 / 4)) {
        result['fromTime'] = baseValue - (1000 * 60 * (60 * 168 + 60 * 168 / 2));
        result['toTime'] = result['fromTime'] + (1000 * 60 * 60 * 168);
      } else {
        result['fromTime'] = baseValue - (1000 * 60 * 60 * 168);
        result['toTime'] = baseValue;
      }

    } else {
      if ((baseValue - timeValue) > (1000 * 60 * 60 * 168 / 4)) {
        result['fromTime'] = baseValue - (1000 * 60 * 60 * 168);
        result['toTime'] = baseValue;
      } else {
        result['fromTime'] = baseValue - (1000 * 60 * 60 * 168 / 2);
        result['toTime'] = result['fromTime'] + (1000 * 60 * 60 * 168);
      }
    } 
    const halfGap = (168 * 60 / 2) * 60 * 1000;
    result['fromTime'] = result['fromTime'] + halfGap;
    result['toTime'] = result['toTime'] + halfGap;
    return result;
  }

  static findTimeRangeAsPerGranularity(timeValue: number, granularity: string): { fromTime: number, toTime: number } {
    let result: { fromTime: number, toTime: number };
    switch(granularity){
      case 'MINUTELY' : {
        result= DateTimeUtil.find1MinRange(timeValue);
        break;
      }
      case 'HOURLY': {
        result = DateTimeUtil.find1HourRange(timeValue);
        break;
      }
      case 'DAILY': {
        result = DateTimeUtil.find24HourRange(timeValue);
        break;
      }
      case 'WEEKLY': {
        result = DateTimeUtil.find168HourRange(timeValue);
        break;
      }
      default : {
        result = DateTimeUtil.find10MinRange(timeValue);
      }
    }
    return result;
  }

}

