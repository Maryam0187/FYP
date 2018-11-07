class Nodefun
{
    constructor(function_name,return_type,parameter_name,parameter_type,function_line)
    {
        this.function_name=function_name;
        this.return_type=return_type;
        this.parameter_name=parameter_name;
        this.parameter_type=parameter_type;
        this.function_line=function_line;
        this.parameter_value="NAN";
        this.next=null;
    }
}

class funlinklist{
    constructor()
    {
        this.head = null;
        this.size=0;
    }

    add (function_name,return_type,parameter_name,parameter_type,function_line)
    {
        var node = new Nodefun(function_name,return_type,parameter_name,parameter_type,function_line);
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
            if (current.function_name==element)
            {
                return count;
            }
            count++;
            current=current.next;

        }

        return -1;
    }

    setparaval(element,val)
    {
        var count = 0;
        var current= this.head;

        while (current != null)
        {    console.log(current.function_name);
            if (current.function_name==element)
            {
                current.parameter_value=val;
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
            str +=curr.function_name + " "+curr.function_line+" "+curr.parameter_name+" "+curr.parameter_value+" ";
            curr = curr.next;
        }
        console.log("------function list-------");
        console.log(str);
    }

}