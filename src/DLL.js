class NODE {
  constructor(data) {
    this.id = null;
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export default class DLL {
  constructor() {
    this.start = null;
    this.end = null;
    this.dataNo = 0; //assigned to the id of a node, increased everytime a data is added
    this.totalNo = 0; //total number of nodes in the DLL
    this.looping = false; //linear DLL when false, circular DLL when true
    this.shuffling = false; //randomises the position of nodes when true
    this.head1 = null; //movable pointer
    this.initialArr=[];
  }

  //function to insert node at the beginning
  insertBeginning(data) {
    ++this.totalNo;
    let temp = this.start;
    this.start = new NODE(data);
    this.start.id = ++this.dataNo;
    this.start.next = temp;
    // node inserted for circular DLL
    if (temp != null) {
      temp.prev = this.start;
      if (this.totalNo == 2) {
        this.end = temp;
      }
      this.end.next = this.start;
      this.start.prev = this.end;
    }
    this.head1 = this.start; //movable pointer points to start by default
    // DLL made linear if this.looping is false
    if(!this.looping) 
      this.unloop();
  }

  //function to insert node at the end
  insertEnd(data) {
    ++this.totalNo;
    let input = new NODE(data);
    input.id = ++this.dataNo;
    let ptr = this.start;
    //if start is null, data inserted at start
    if (ptr == null) {
      this.start = input;
      this.end = this.start;
      this.head1=this.start;
      if(!this.looping)
        this.unloop();
      return;
    }
    while (ptr != this.end) {
      ptr = ptr.next;
    }
    ptr.next = input;
    input.next = this.start;
    input.prev = ptr;
    this.start.prev = input;
    this.end = input;
    this.head1 = this.start; //movable pointer points to start by default
    // DLL made linear if this.looping is false
    if(!this.looping)
      this.unloop();
  }

  //function to add an array of data
  addArray(array) {
    for (let i = 0; i < array.length; i++) {
      this.insertEnd(array[i]);
    }
  }

  //returns all the items of the linked list as an array of objects. {id:...,data:...}
  getArray() {
    let obj = {};
    let arr = [];
    let ptr = this.head1;
    if (ptr == null) return arr;
    while (ptr.next != this.start && ptr.next != null) {
      obj = {
        id: ptr.id,
        data: ptr.data,
      };
      arr.push(obj);
      ptr = ptr.next;
    }
    obj = {
      id: this.end.id,
      data: this.end.data,
    };
    arr.push(obj);
    return arr;
  }

  //returns current head position
  head() {
    return this.head1.data;
  }

  // moves head to the next node and returns it
  next() {
    if (this.head1.next != null) this.head1 = this.head1.next;
    return this.head1.data;
  }

  // moves head to the previous node and returns it
  previous() {
    if (this.head1.prev != null) this.head1 = this.head1.prev;
    return this.head1.data;
  }

  // clears all data of the DLL
  clear() {
    this.totalNo -= this.getArray().length;
    this.start = null;
    this.head1=null;
    this.shuffling=false;
  }

  // randomises position of nodes
  shuffle() {
    let arr = this.getArray();
    let arr2 = [...this.getArray()];
    if(this.shuffling==false){
      this.initialArr=[...arr2];
    }
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      if (j == 0) continue;
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    this.clear();
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].data;
    }
    this.addArray(arr);
    this.shuffling=true;
  }

  unshuffle(){
    this.clear();
    for(let i=0;i<this.initialArr.length;i++){
      this.initialArr[i]=this.initialArr[i].data;
    }
    this.addArray(this.initialArr);
    this.shuffling=false;
  }

  // function to make DLL circular from linear
  loop() {
    if (this.start.next != null) {
      this.end.next = this.start;
      this.start.prev = this.end;
    }
    this.looping = true;
  }

  // function to make DLL linear from circular
  unloop() {
    if (this.start.next != null) {
      this.end.next = null;
      this.start.prev = null;
    }
    this.looping = false;
  }
}