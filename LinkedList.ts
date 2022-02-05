export class LinkedListNode<T> {
  public value: T;
  public next: LinkedListNode<T> | null;
  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList<T> {
  private head: LinkedListNode<T> | null = null;
  private tail: LinkedListNode<T> | null = null;

  public append(value: T): void {
    const node = new LinkedListNode(value);
    if (this.head === null) {
      this.head = node;
    } else {
      this.tail!.next = node;
    }
    this.tail = node;
  }

  public toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }

  public remove(callback: (value: T) => boolean): void {
    if (this.head === null) {
      return;
    }
    if (this.head.value && callback(this.head.value)) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current) {
      if (current.next && callback(current.next.value)) {
        current.next = current.next.next;
        if (current.next === null) {
          this.tail = current;
        }
        return;
      }
      current = current.next;
    }
  }

  find(callback: (value: T) => boolean): T | null {
    const result = this.getNode(callback);
    return result ? result.value : null;
  }

  getNode(callback: (value: T) => boolean): LinkedListNode<T> | null {
    let current = this.head;

    while (current) {
      if (callback(current.value)) {
        return current;
      }
      current = current.next;
    }
    return null;
  }
}
