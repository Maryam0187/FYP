class tokenizefor{
    constructor()
    {
        this.starting_value="";
        this.condition="";
        this.increment="";
        this.variable_name="";
        this.body=[];
    }
}
  

function turnrecursion()
{
    var forarray=[];
    var code=$("#editor").val();
    var text=code.split("\n");
    var a=0;
    //  ++++++++++++++++++++++tokenize for statement++++++++++++++++++++++++ 
    
    for (i=0;i<text.length;i++)
    {
        text[i]=text[i].replace(/\s+/g, '');
        if (text[i][0]=='f' && text[i][1]=='o' && text[i][2]=='r')
        {
            var line=text[i].split(";");
            console.log(line);
            forarray.push(new tokenizefor());
            var tmp="";
            forarray[a].condition=line[1];
            for (y=7;line[0][y]!='=';y++)
            {
                tmp=tmp+line[0][y];
            }
            forarray[a].variable_name=tmp;
            tmp="";
            for (z=y+1;z<line[0].length;z++)
            {
                tmp=tmp+line[0][z];
            }
            forarray[a].starting_value=tmp;
            console.log(tmp);
            tmp="";
            for (z=0;z<line[2].length-1;z++)
            {
                tmp=tmp+line[2][z];
            }
            forarray[a].increment=tmp; 
            //console.log(tmp+"   "+a+"in if"+"  "+text[i]);
            a++

        }
        else
        {
            if(a>0)
            {
                forarray[a-1].body.push(text[i]);
            }
            
            
        }
        if(text[i]=='}')
        {
            
            a=a-1;
            console.log(a+"  "+text[i]);
        } 
            
    }

    // +++++++++++++++++++++++++++++++END+++++++++++++++++++++++++++++++


    console.log(forarray.length);
    // ++++++++++++++++++++++++++++removing bracket++++++++++++++++++++++++++++++
    var body1="";
    for (i=0;i<forarray[0].body.length;i++)
    {
        if(forarray[0].body[i]!='}' && forarray[0].body[i] !="{")
        {
            body1=body1+forarray[0].body[i] + "\n";
        }
    }

    var body2="";
    for (i=0;i<forarray[1].body.length;i++)
    {
        if(forarray[1].body[i]!='}' && forarray[1].body[i]!='{')
        {
            body2=body2+forarray[1].body[i]+"\n";
        }
    }
    //++++++++++++++++++++++++++++++++function 1 & 2 arguments +++++++++++++++++++++++++
    fun1_arg="";
    fun2_arg=""; 
    if (forarray[0].increment.includes("--"))
    {
        fun1_arg=forarray[0].variable_name+"-1";
    }
    else if (forarray[0].increment.includes("++"))
    {
        fun1_arg=forarray[0].variable_name+"+1";
    }
    else
    {
        console.log("in else");
        var tmp="";
        var check=false;
        for (i=0;i<forarray[0].increment.length;i++)
        {
            console.log(forarray[0].increment[i]);

            if(check)
            {
                tmp=tmp+forarray[0].increment[i];
            }
            if(forarray[0].increment[i]=='=')
            {
                check=true;
            }

        }
        fun1_arg=tmp;

    } 

    if (forarray[1].increment.includes("--"))
    {
        fun2_arg=forarray[1].variable_name+"-1"
    }
    else if(forarray[1].increment.includes("++"))
    {
        fun2_arg=forarray[1].variable_name+"+1";
    }
    else
    {
        var tmp="";
        var check=false;
        for (i=0;i<forarray[1].increment.length;i++)
        {
            
            if(check)
            {
                tmp=tmp+forarray[1].increment[i];
            }
            if(forarray[1].increment[i]=='=')
            {
                check=true;
            }

        }
        fun2_arg=tmp;

    }

    console.log(body1+"checking body-------------");
    var oneditor="void function (int "+forarray[1].variable_name+")" + " \n" + 
    "{"+ "\n" +
    "   if ("+forarray[1].variable_name+">0)" +"\n"+
    "   {" + "\n"+
    "       "+body2+ "\n"+
    "       function("+fun2_arg+");"+"\n"+
    "   }"+"\n"+
    "   else"+"\n"+
    "   {" + "\n" +
    "       return;"+"\n"+
    "   }"+"\n"+
    "}"+"\n"+"\n"+

    "void function2 (int "+forarray[0].variable_name+")"+ "\n" +
    "{"+ "\n" +
    "   if ("+forarray[0].variable_name+" > 0)"+"\n"+
    "   {"+"\n"+
    "       function("+forarray[1].starting_value+");"+"\n"+
    "       "+body1+"\n"+
    "       function2("+fun1_arg+");"+"\n"+
    "   }"+"\n"+
    "   else"+"\n"+
    "   {"+"\n"+
    "       return;"+"\n" +
    "   }"+"\n"+
    "}";
    $("#editor2").text(oneditor);
    console.log(forarray);
}