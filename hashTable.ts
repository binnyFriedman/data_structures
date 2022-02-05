import { LinkedList, LinkedListNode } from "./LinkedList";

type Key = string | number;

export class HashTable<K extends string | number, V> {
  _table: LinkedList<[key: K, value: V]>[];

  constructor(size?: number) {
    this._table = new Array(size || 1000).fill(null);
  }
  private hash(key: Key): number {
    key = key.toString();
    const seed = key.length;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = hash + key.charCodeAt(i) * seed;
    }
    return hash % this._table.length;
  }

  get(key: K): V {
    const node = this.getNode(key);
    if (node) {
      return node.value[1];
    }
    return null;
  }

  private getNode(key: K): LinkedListNode<[key: K, value: V]> | null {
    const index = this.hash(key);
    if (this._table[index]) {
      const callback = (node: [key: K, value: V]) => {
        return node[0] === key;
      };
      return this._table[index].getNode(callback);
    }
    return undefined;
  }

  set(key: K, value: V): void {
    const existing = this.getNode(key);
    const index = this.hash(key);

    if (existing) {
      existing.value = [key, value];
    } else {
      if (!this._table[index]) {
        this._table[index] = new LinkedList();
      }
      this._table[index].append([key, value]);
    }
  }

  remove(key: Key): void {
    const index = this.hash(key);
    if (this._table[index]) {
      this._table[index].remove((value) => value[0] === key);
    }
  }

  getKeys(): Key[] {
    const keys: Key[] = [];
    this._table.forEach((list) => {
      if (list) {
        list.toArray().forEach((value) => {
          keys.push(value[0]);
        });
      }
    });
    return keys;
  }
}
