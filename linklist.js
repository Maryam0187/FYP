class Node
{
    constructor(variable_name,variable_value,variable_type)
    {
        this.variable_name=variable_name;
        this.variable_value=variable_value;
        this.variable_type=variable_type;
        this.next=null;
    }
}

class linklist{
    constructor()
    {
        this.head = null;
        this.size=0;
    }

    add (element,value,type)
    {
        var node = new Node(element,value,type);
        var current;
        
        if (this.head == null)
        {
            this.head = node;
        }
        else
        {
            current=this.head;
             while (current.next)
             {
                 current=current.next;
             }
             current.next=node;

        }
        this.size++;     
    }

    find (element)
    {
        var count = 0;
        var current= this.head;

        while (current != null)
        {
            if (current.variable_name==element)
            {
                return count;
            }
            count++;
            current=current.next;

        }

        return -1;
    }
    allvariable()
    {
        var count = 0;
        var current= this.head;
        var variable_array=[];

        while (current != null)
        {    
            variable_array.push(current.variable_name);
            current=current.next;

        }

        return variable_array;

    }

    getvalue(element)
    {
        var count = 0;
        var current= this.head;

        while (current != null)
        {
            if (current.variable_name==element)
            {
                return current.variable_value;
            }
            count++;
            current=current.next;

        }

        return "NAN";
    }
    setvalue(element,vale)
    {
        var count = 0;
        var current= this.head;
         
        while (current != null)
         {
            console.log("set values----------out"+vale);
            if (current.variable_name==element)
            {
                console.log("set values----------in"+current.variable_name);
                current.variable_value=vale;
                console.log("in------------------"+current.variable_value);
                return 1;
            }
            count++;
            current=current.next;

        }

        return -1;
    }

    isEmpty()
    {
        if (this.size==0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    printlist()
    {
        var curr = this.head;
        var str= "";

        while(curr)
        {
            str +=curr.variable_name + " "+curr.variable_value+" "+curr.variable_type+" ";
            curr = curr.next;
        }
        console.log("--------variable list-----------");
        console.log(str);
    }

}