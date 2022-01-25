class NODE{
    constructor(data){
        this.id=null
        this.data=data
        this.next=null
        this.prev=null
    }
}

export default class DLL{
    constructor(){
        this.start=null
        this.dataNo=0
    }
    insertBeg(data){
        let temp=this.start
        this.start=new NODE(data)
        this.start.id=++(this.dataNo)
        this.start.next=temp
        if(temp!=null){
            temp.prev=this.start
        }
    }
    insertEnd(data){
        let input=new NODE(data)
        input.id=++(this.dataNo)
        let ptr=this.start
        if(ptr==null){
            this.start=input
            return
        }
        while(ptr.next!=null){
            ptr=ptr.next
        }
        ptr.next=input
        input.prev=ptr
    }
    //insert after a specific id
    insertAfter(id,data){
        let ptr=this.start
        let temp=new NODE(data)
        while(ptr.id!=id){
            if(ptr.next==null){
                console.log('Data not found')
                return
            }
            else    
                ptr=ptr.next
        }
        if(ptr.next==null){
            this.insertEnd(data)
            return
        }
        else
            ptr.next.prev=temp
        temp.next=ptr.next
        temp.prev=ptr
        ptr.next=temp
        temp.id=++(this.dataNo)
        console.log('added after id')
    }
    //can add an array of songs to the linked list, where array contains an array of audios
    addArray(array){
        for(let i=0;i<array.length;i++){
            this.insertEnd(array[i])
        }
    }
    deleteId(id){
        let ptr=this.start
        while(ptr.id!=id){
            ptr=ptr.next
        }
        ptr.prev.next=ptr.next
        ptr.next.prev=ptr.prev
        ptr=null
    }
    //returns all the items of the linked list as an array of objects. {id:...,data:...}
    getArray(){
        let arr=[]
        let ptr=this.start
        while(ptr!=null){
            let obj={
                id:ptr.id,
                data:ptr.data
            }
            arr.push(obj)
            ptr=ptr.next
        }
        return arr
    }

}
