export class KMObject {
  id: any;
}

export class KMArray<T> extends Array {
  constructor();
  constructor(array: Array<T>);
  constructor(...elements: any[]);
  constructor(arg?: any) {
    super();

    if (Array.isArray(arg)) {
      var args = [0, 0].concat(arg);
      this.splice.apply(this, args);
    }
  }
  remove(index: number): T {
    return <T> this.splice(index, 1)[0];
  }
}
