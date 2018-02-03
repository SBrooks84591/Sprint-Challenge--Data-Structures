/* eslint-disable class-methods-use-this */
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    // Do not modify anything inside of the constructor
  }
  // Wraps the given value in a node object and adds the node to the tail of the list
  // If the list is empty, the new element is considered the tail as well as the head
  // If there is one element in the list before the new element is added, the new element becomes the tail of the list
  addToTail(value) {  // creates new node
    const newNode = {
      value, // when key and value have same name, eslint allows just name
      next: null,
    };

    if (this.tail === null) { // checks if there is a tail
      this.tail = newNode;  // adds new node to head and tail
      this.head = newNode;
      return;
    }
    const holder = this.tail; // adds tail to exising node
    holder.next = newNode; // changes pointer from null to the new node
    this.tail = newNode;
  }
  // Removes the current head node from the list, replacing it with the next element in the list
  // Returns the value of the removed node
  removeHead() {
    if (this.head === null) return null; // determine if there is a head
    const oldHead = this.head;
    this.head = this.head.next; // moves pointer from old head to next
     // if the head is the last node, both head and tail must be removed
    if (this.head === null) {
      this.tail = null;
    }
    return oldHead.value;
  }
    /* const node = this.head; // if there is a head, moves the pointer to next head
    this.head = node.next;
    if (this.head === null) {
      this.tail = null; // removes the tail by setting it to null
    }
    return node.value; */
  // }
  // Checks the linked list for the given value
  // Returns true if the the value is found in the list, false otherwise
  contains(value) { // checks the entire linked list to see if contains the // value use an iterative process to check each node on the list
    let node = this.head;
    while (node !== null) {
      if (node.value === value) { return true; }
      node = node.next; // if node does not equal requested value, resets to next node in list
    }
    // for (let key in node) { // linked list - do not use
    // this.head {value: 1, next: {value: 2, next: null}} // linked list do not use
    // }
    return false;
  }
}
    // A special array class that can only store the number of items specified by the `limit` argument
class LimitedArray {
  constructor(limit) {
    // You should not be directly accessing this array from your hash table methods
    // Use the getter and setter methods included in this class to manipulate data in this class
    this.storage = [];
    this.limit = limit;
  }

  checkLimit(index) {
    if (typeof index !== 'number') throw new Error('The supplied index needs to be a number');
    if (this.limit <= index) {
      throw new Error('The supplied index lies out of the array\'s bounds');
    }
  }

  each(cb) {
    for (let i = 0; i < this.storage.length; i++) {
      cb(this.storage[i], i);
    }
  }
  // Use this getter function to fetch elements from this class
  get(index) {
    this.checkLimit(index);
    return this.storage[index];
  }

  get length() {
    return this.storage.length;
  }
  // Use this setter function to add elements to this class
  set(index, value) {
    this.checkLimit(index);
    this.storage[index] = value;
  }
}
/* eslint-disable no-bitwise, operator-assignment */
// This is hash function you'll be using to hash keys
// There's some bit-shifting magic going on here, but essentially, all it is doing is performing the modulo operator
// on the given `str` arg (the key) modded by the limit of the limited array
// This simply ensures that the hash function always returns an index that is within the boundaries of the limited array
const getIndexBelowMax = (str, max) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % max;
};

module.exports = {
  LimitedArray,
  getIndexBelowMax,
  LinkedList
};
