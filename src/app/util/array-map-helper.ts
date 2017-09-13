export class ArrayMapHelper {

  static fetchKeySet(object: any): any[] {
    return Object.keys(object);
  }

  static addAllInList(container:any[], data:any[]):any[]{
    const arr = container.slice(0);
    data = ArrayMapHelper.clone(data);
    for(const indx in data){
      if (arr.indexOf(data[indx])<0){
        arr.push(data[indx]);
      }
    }
    return arr;
  }

  static addAllInMap(container: any, data: any): any {
    const map = new Object(container);
    data = ArrayMapHelper.clone(data);
    const keys = Object.keys(data);
    for (const indx in keys) {
      const key = keys[indx];
      map[key] = data[key];
    }
    return map;
  }

  static updateAllInMap(container: any, data: any): any {
    const map = container;
    data = ArrayMapHelper.clone(data);
    const keys = Object.keys(data);
    for (const indx in keys) {
      const key = keys[indx];
      map[key] = data[key];
    }
    return map;
  }

  static removeFromMap(container: any, key: any): any {
    const map = new Object(container);
    delete map[key];
    return map;
  }

  static removeFromList(container: any[], data: any): any[] {
    const arr = [];
    for (const indx in container) {
      if (container[indx]!==data) {
        arr.push(container[indx]);
      }
    }
    return arr;
  }

  static clone(object:any):any{
    return JSON.parse(JSON.stringify(object));
  }

  static cloneComponent(object: any): any {
    const elRef = object['elRef'];
    const _elRef = object['_elRef'];
    const changeDetectorRef = object['changeDetectorRef'];
    const _changeDetectorRef = object['_changeDetectorRef'];
    const pageHeader = object['pageHeader'];
    const echart = object['echart'];
    object['elRef'] = undefined;
    object['_elRef'] = undefined;
    object['pageHeader'] = undefined;
    object['changeDetectorRef'] = undefined;
    object['_changeDetectorRef'] = undefined;
    object['echart'] = undefined;
    const result = JSON.parse(JSON.stringify(object));
    object['elRef'] = elRef;
    object['_elRef'] = _elRef;
    object['pageHeader'] = pageHeader; 
    object['changeDetectorRef'] = changeDetectorRef;
    object['_changeDetectorRef'] = _changeDetectorRef;
    object['echart'] = echart;
    return result;
  }

}
