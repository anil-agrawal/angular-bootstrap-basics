export class NumberUtil {
  static toInt(value: number | string): number {
    if (value !== null && value !== undefined) {
      return parseInt((parseInt(value.toString(), 10)).toFixed(0), 10);
    }
  }

  static formatPercentageValue(value:any) {
	  return new Number(value).toFixed(2);
  }

  static formatTimeValue(value: any) {
	  return new Number(value).toFixed(2);
  }

  static formatBandwidthValue(value: any) {
	  return new Number(value).toFixed(2);
  }
}
