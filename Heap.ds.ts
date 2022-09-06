export class MinHeap {
  private _heap: number[] = [];

  getMin() {
    return this._heap[0];
  }

  insert(value: number) {
    this._heap.push(value);

    if (this._heap.length > 1) {
      let current = this._heap.length - 1;
      while (
        current > 1 &&
        this._heap[Math.floor(current / 2)] < this._heap[current]
      ) {
        this.swap(current, Math.floor(current / 2));
        current = Math.floor(current / 2);
      }
    }
  }
  swap(index_a: number, index_b: number) {
    if (index_a > this._heap.length - 1 || index_b > this._heap.length - 1) {
      throw new Error("Index out of bounds");
    }
    let temp = this._heap[index_a];
    this._heap[index_a] = this._heap[index_b];
    this._heap[index_b] = temp;
  }
}
