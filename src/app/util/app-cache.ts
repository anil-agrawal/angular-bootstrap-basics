export class AppCache {

  static cache = {};

  static push(path: string, data: object): void {
    AppCache.cache[path] = data;
  }

  static fetch(path: string): object {
    return AppCache.cache[path];
  }

}
