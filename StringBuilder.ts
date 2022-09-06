class ResizableArray<T> {
  private array: T[];
  private size: number;
  constructor(size = 0) {
    this.array = new Array(size);
    this.size = size;
  }
  get(index: number): T {
    return this.array[index];
  }

  push(value: T) {
    if (this.size >= this.array.length) {
      this.doubleArray();
    }
    this.array.push(value);
  }

  get length() {
    return this.array.length;
  }

  doubleArray() {
    let nArray = new Array(this.size * 2);
    for (let i = 0; i < this.size; i++) {
      nArray[i] = this.array[i];
    }
    this.array = nArray;
    this.size = this.size * 2;
  }

  getArray() {
    return this.array;
  }
}

export class StringBuilder {
  private _resizable_array_impl = new ResizableArray();

  constructor(value: string = "") {
    this.append(value);
  }

  append(value: string) {
    for (let i = 0; i < value.length; i++) {
      this._resizable_array_impl.push(value.charAt(i));
    }
  }

  toString(): string {
    return this._resizable_array_impl.getArray().join("");
  }
}

function testStringBuilder() {
  let sb = new StringBuilder("Hello");
  sb.append(" World");
  console.log(sb.toString());
}
testStringBuilder();
