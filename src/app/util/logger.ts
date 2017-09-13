export class Logger {

  static debugEnabled = true;
  static traceEnabled = false;
  static infoEnabled = true;
  static errorEnabled = true;

  static debug(msg: string, data?: any) {
    if (Logger.debugEnabled) {
      console.log(msg);
    }
  }

  static trace(msg: string, data?: any, other?: any) {
    if (Logger.traceEnabled) {
      console.log(msg);
    }
  }

  static info(msg: string, data?: any) {
    if (Logger.infoEnabled) {
      console.log(msg);
    }
  }

  static error(msg: string, data?: any) {
    if (Logger.errorEnabled) {
      console.log(msg);
    }
  }

}
