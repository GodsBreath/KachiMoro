export class Object {
  id: any;
}

export class KMArray<T> extends Array {
  constructor();
  constructor(array: Array<T>);
  constructor(array?: any) {
    super();

    if (array) {
      var args = [0, 0].concat(array);
      this.splice.apply(this, args);
    }
  }
  remove(index: number): T {
    return <T> this.splice(index, 1)[0];
  }
}
