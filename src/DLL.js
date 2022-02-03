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
    this.end = this.start;
    this.dataNo = 0;
    this.totalNo = 0;
    this.looped=true;
  }
  insertBeg(data) {
    ++this.totalNo;
    let temp = this.start;
    this.start = new NODE(data);
    this.start.id = ++this.dataNo;
    this.start.next = temp;
    if (temp != null) {
      temp.prev = this.start;
      if (this.totalNo == 2) {
        this.end = temp;
      }
      this.end.next = this.start;
      this.start.prev = this.end;
    }
  }
  insertEnd(data) {
    ++this.totalNo;
    let input = new NODE(data);
    input.id = ++this.dataNo;
    let ptr = this.start;
    if (ptr == null) {
      this.start = input;
      this.end = this.start;
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
  }
  //insert after a specific id
  insertAfter(id, data) {
    ++this.totalNo;
    let ptr = this.start;
    let temp = new NODE(data);
    while (ptr.id != id) {
      if (ptr.next == this.start) {
        console.log("Data not found");
        return;
      } else ptr = ptr.next;
    }
    if (ptr.next == this.start || ptr.next == null) {
      --this.totalNo;
      this.insertEnd(data);
      return;
    } else ptr.next.prev = temp;
    temp.next = ptr.next;
    temp.prev = ptr;
    ptr.next = temp;
    temp.id = ++this.dataNo;
  }
  //can add an array of songs to the linked list, where array contains an array of audios
  addArray(array) {
    for (let i = 0; i < array.length; i++) {
      this.insertEnd(array[i]);
    }
  }
  deleteId(id) {
    --this.totalNo;
    let ptr = this.start;
    while (ptr.id != id) {
      ptr = ptr.next;
    }
    if (ptr.next == null || ptr.next == ptr) {
      this.start = null;
      this.end = null;
      return;
    }
    ptr.prev.next = ptr.next;
    ptr.next.prev = ptr.prev;
    if (ptr == this.start) {
      this.start = ptr.next;
    } else if (ptr == this.end) {
      this.end = ptr.prev;
    }
    ptr = null;
  }
  //returns all the items of the linked list as an array of objects. {id:...,data:...}
  getArray() {
    let obj = {};
    let arr = [];
    let ptr = this.start;
    if (ptr == null) return arr;
    if(ptr.next==null){
      obj={
        id:ptr.id,
        data:ptr.data
      };
      arr.push(obj);
      return arr;
    }
    while (ptr.next != this.start) {
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
  returnNext() {
    // only returns what's next
    return this.start.next.data;
  }
  returnPrevious() {
    return this.start.previous.data;
  }
  next() {
    // returns returns what's next and sets that as the new head
    if (this.start.next != null) this.start = this.start.next;
    return this.start.data;
  }
  previous() {
    if (this.start.prev != null) this.start = this.start.prev;
    return this.start.data;
  }
  head() {
    return this.start.data;
  }
  clear() {
    this.totalNo -= this.getArray().length;
    this.start = null;
  }
  shuffle() {
    let arr = this.getArray();
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
  }
  loop(){
    if(!this.looped){
      if(this.start.next!=null){
        this.end.next=this.start;
        this.start.prev=this.end;
      }
      this.looped=true;
    }
  }
  unloop(){
    if(this.looped){
      if(this.start.next!=null){
        this.end.next=null;
        this.start.prev=null;         
    }
    this.looped=false;
  }
}
}

// Make array of next song dekhi last song samma
// Clear DLL
// sort that array
// this.addArray([array])
