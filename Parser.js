 var TextEditor={
    codetext:"",
    getCode:function()
    {
      check3=true;
      $("#memorymap").text("");
      $("#output").text("");
      $("#outputip").text("");
      $("#outputstack").text("");

      codetext=$("#editor").val();
      return codetext;
      
      
    },
    getLine:function(line)
    {
   
        return Parser.code_line[line].replace(/\s+/g, '');
      
      
    },
    IterateOverCodeLineByLine:function(pre)

    {

      if (MemoryMap.SP.length > 0 )
      {
        
        $("div.numberedtextarea-number.numberedtextarea-number-"+MemoryMap.IP).attr('style', 'background-color:#F9AA33');         
         for (i=0;i<Parser.code_line.length;i++)
          {
            if (i != MemoryMap.IP)
            {
              $("div.numberedtextarea-number.numberedtextarea-number-"+i).attr('style', 'background-color:#232F34');
            }
          }
        
        var tmp=this.getLine(MemoryMap.IP-1);
        Parser.ParseCodeLine(tmp); 
        console.log(this.if_line);
        MemoryMap.IP=MemoryMap.IP+1;
      }
    }
  }

  var Parser={
    code_line:[],
    function_name_array:[],
    function_line_array:[],
    check4:false, // for return statement 
    variable_list:"",
    function_link_list:"",
    return_check:false,
    return_val:"",
    function_check:"",
    ParseCodeLine:function(tmp)
    {
      //  change in the value of variables;
        MemoryMap.sendIP();
        MemoryMap.sendStackvalues();
        //MemoryMap.sendDataValues();
      
      if (!this.check4)
      {
        this.function_check= this.isfunction(tmp);
      }
      if(this.return_check)
      {
        console.log("in side the return check");
        console.log(tmp);
        var resub=tmp;
        var function_name;
        for (i=0;i<this.function_name_array.length;i++)
        {
          if (resub.includes(this.function_name_array[i]))
          {
            function_name=this.function_name_array[i];
          }
        }
        console.log(resub);
        var fun_idx=resub.indexOf(function_name);
        var tmpret="";
        for (i=fun_idx;resub[i-1] !=')' ;i++ )
        {
          tmpret=tmpret+resub[i];
        }
        tmp=tmp.replace(tmpret,this.return_val);
        console.log(tmp,'tmpppppp');
      }
   
      if (tmp[0]=='c' && tmp[1]=='o' && tmp[2]=='u' && tmp[3]=='t' && tmp[4]=='<' && tmp[5]=='<' && !this.function_check)
      {
        console.log("cout statement ",tmp,this.code_line[MemoryMap.IP-1]);
        var cout_value="";
        var cout_array=[];
        for (i=0;i<this.code_line[MemoryMap.IP-1].length-1;i++)
        {
          if (this.code_line[MemoryMap.IP-1][i]=="<")
          {
            cout_array.push(cout_value);
            i=i+1;
            cout_value="";
          }
          else
          {

            cout_value=cout_value+this.code_line[MemoryMap.IP-1][i];
          }
          
        }

        cout_array.push(cout_value);
        console.log(cout_array);
        cout_value="";
        var str="";
        for (k=1;k<cout_array.length;k++)
        {
          console.log(cout_array[k],"nnnnnnnnnnnnnn");
          var functiontmp=cout_array[k].replace(/\s+/g, '');
          if (functiontmp[functiontmp.length-1]==';' && functiontmp[functiontmp.length-2]==')')
          {
            console.log(this.return_val+" innnnnnnn");
            str=str+this.return_val;
          }
          else if(cout_array[k][0]=='"')
          {
            for (y=1;y<cout_array[k].length-2;y++)
            {
              cout_value=cout_value+cout_array[k][y];
            }
            str=str+cout_value;
            cout_value="";
          }
         else if (this.isvariable(cout_array[k]))
         {
          var var_name=this.getvariable_name(cout_array[k]);
          var var_val=this.variable_list.getvalue(var_name);
          cout_value=cout_array[k].replace(var_name,var_val);
          var t="";
          for(g=0;g<cout_value.length-2;g++)
          {
              t=t+cout_value[g];
          }
          cout_value=t;
          if (this.arthimeticline(cout_value))
          {
            cout_value=this.parsearthmetic(cout_value);
          }
          str=str+cout_value;
          cout_value="";

        }
        else
        {
          str=str+cout_array[k];
          if (this.arthimeticline(str))
          {
            str=this.parsearthmetic(str);
          }
        }

        }
        
        var coutval=$("#out").val();
        cout_value=coutval+'\n'+str;
        MemoryMap.sendToOut(cout_value);
      }
      if (tmp[0]=='r' && tmp[1]=='e' && tmp[2]=='t' && tmp[3]=='u' && tmp[4]=='r' && tmp[5]=='n' && this.check4  && tmp[6]!=0)
      {
        this.return_check=true;
        var ret_val=""; // to get the value of return        
        for (i=6;i<tmp.length-1;i++)
        {
          ret_val=ret_val+tmp[i];
        }
        
        this.return_val=ret_val;
        
        console.log(MemoryMap.SP[MemoryMap.SP.length-1]);
        console.log(ret_val);
        if (this.isvariable(ret_val))
        {
          var name=this.getvariable_name(ret_val);
          console.log(name,MemoryMap.SP[MemoryMap.SP.length-1]);
          if (MemoryMap.SP[MemoryMap.SP.length-1].includes(name))
          {
            console.log("variable in stack");
            var val="";
            for (i=name.length;i<MemoryMap.SP[MemoryMap.SP.length-1].length;i++)
            {
              if(MemoryMap.SP[MemoryMap.SP.length-1][i]!=";" && MemoryMap.SP[MemoryMap.SP.length-1][i]!="=")
              {
                val=val+MemoryMap.SP[MemoryMap.SP.length-1][i];
              }
            }
            console.log(val+" stack value");
            this.variable_list.setvalue(name,val.replace(/\s+/g, ''));
            this.return_val=this.parsearthmetic(ret_val);
            console.log(this.parsearthmetic(ret_val));
          }


        }

        MemoryMap.IP=MemoryMap.SP_line_number[MemoryMap.SP_line_number.length-1]-1;
        console.log(MemoryMap.IP);
        MemoryMap.SP_line_number.pop();
        MemoryMap.SP.pop();
        MemoryMap.SP.pop();
        //console.log("indide ppppppppppppppppppppppppppps");
        
        
      }
      else
      {
        this.return_check=false;
      }
      if (tmp[0]=='r' && tmp[1]=='e' && tmp[2]=='t' && tmp[3]=='u' && tmp[4]=='r' && tmp[5]=='n' && tmp[6]==0)
      {
        
        console.log("in return 0")
        MemoryMap.IP=MemoryMap.SP_line_number[MemoryMap.SP_line_number.length-1]-1;
        MemoryMap.SP_line_number.pop();
        MemoryMap.SP.pop();
      }

      if (tmp[0]=='i' && tmp[1]=='f')
        {
          
          if (! Parser.check_if_condition(this.code_line[MemoryMap.IP-1]))  // if condition false
          {
            console.log("inside the check condition");
            //console.log("variable name ", variable_name);
            //console.log("variable vale ",variable_value);
            var check_condition=true;
            while(check_condition)
            {
              MemoryMap.IP=MemoryMap.IP+1;
              var tmp=this.code_line[MemoryMap.IP-1].replace(/\s+/g, '');
              //console.log(tmp);
              //if (tmp[0]=='e' && tmp[1]=='l' && tmp[2]=='s' && tmp[3]=='e')
              if (tmp[0]=='}')
              {
                check_condition=false;
                MemoryMap.IP=MemoryMap.IP;
              }

            }

          }
          else  // if condition true
          {
            Parser.check4=true;
          }

        }
        

    },

    check_if_condition:function(cond)
     {
      var re=this.condition_if(cond);   // left , right, operator
           
          var left=this.variable_list.getvalue(re[0]);  //  add variable check and number check
          //console.log(re[0]+" if condition--- "+left);
          //this.variable_list.printlist(); 
          if (re[2]=='<')
          {
               
              if (left<re[1])
                return true;
              else
                return false;  
          }
          if (re[2]=='>')
          {
            if (left>re[1])
                return true;
              else
                return false;
          }
          if (re[2]=='==')
          {
            if (left==re[1])
                return true;
              else
                return false;
          }
     }
    ,
    condition_if:function(if_line)
      {
        console.log(if_line);
        var if_cond=if_line.replace(/\s+/g, '');
        console.log(if_cond);
        var check2="1";
        var left_operand="";
        var right_operand="";
        var oper;
        for (var i=3;i<if_cond.length-1;i++)
        {
          //console.log(check2);
          if (check2=="2")
          {
            right_operand=right_operand+if_cond[i]; 
          }

          if (if_cond[i]=='>' || if_cond[i]=='<' || if_cond[i]=='=' || if_cond[i]=='!')
          {
            check2="2"
            if (if_cond[i]=='=')
            {
              oper="==";
              i=i+1;
            }

            else if (if_cond[i]=='!')
            {
              oper="!=";
              i=i+1;
            }
            else
            {
              oper=if_cond[i];
            }

          }
          if (check2=="1")
          {
            left_operand=left_operand+if_cond[i];
          
          }
        
        }
        console.log(left_operand +" "+right_operand+" "+oper);
        return [left_operand,right_operand,oper];
      }
    ,
    function_call:function(call_function)
      {
        var fun=call_function;
        fun = fun.replace(/\s+/g, '');
        console.log(fun+"---"+fun.length);
        var fun_name="";
        check=false;
        var fun_arg="";
        for (var i=0;i<fun.length-2;i++)
        {
          if (fun[i] !='(' && check==false)
          
          {
            fun_name=fun_name+fun[i];
          }
          else
          {
            if (check==true)
            {
              fun_arg=fun_arg+fun[i]
            }
            check=true;
          }
        }
        
         variable_value=fun_arg; 
         return [fun_name,fun_arg];
        
        
      }
    ,
    function_definition:function(fun_line)
      {
        var temp=fun_line;
        var func_name=temp.replace(/\s+/g, '');
        var return_type;
        var fun_name_def=" ";
        var check1=3;
        var parameter_type;
        var parameter_name="";
        console.log(func_name);
        //console.log(func_name.length);
        for (var i=0;i<func_name.length;i++)
        {
          //--------return type--------------
          if (func_name[i]=='i' && func_name[i+1]=='n' && func_name[i+2]=='t' && check1==3)
          {
            return_type="int";
            console.log(return_type);
            check1=2;
            i=i+2;
          }
          else if(func_name[i]=='v' && func_name[i+1]=='o' && func_name[i+2]=='i' && func_name[i+3]=='d' && check1==3)
          {
            return_type="void";
            i=i+3;
            check1=2; 
            console.log(return_type +"return type " );
          }

          else if (func_name[i] !='(' && check1==2)
          {
            fun_name_def=fun_name_def+func_name[i];
          }
          if (func_name[i]=='(' && check1==2)
          {
            check1=4;
            //console.log(fun_name_def + " in check");
          }
          else if(check1==4 && func_name[i] !='(')
          {
                  
              if (func_name[i]=='i' && func_name[i+1]=='n' && func_name[i+2]=='t')
                {
                  parameter_type="int";
                  i=i+2
                }
              else if(func_name[i]=='v' && func_name[i+1]=='o' && func_name[i+2]=='i' && func_name[i+3]=='d')
              {
                parameter_type="void";
                i=i+3;
              }
              else if (func_name[i] !=')')
              {
                parameter_name=parameter_name+func_name[i];
              }

            }
        }
        variable_name=parameter_name;
        console.log(return_type +"  "+fun_name_def+"  "+parameter_type+"  "+parameter_name  );
        return [return_type,fun_name_def,parameter_type,parameter_name];
      },

    isfunction:function(functionline)
    {
      var check_val=false;
      console.log(functionline);
      for (i=0;i<this.function_name_array.length;i++)
      {
        console.log(this.function_name_array[i]);
        if (functionline.includes(this.function_name_array[i]) && functionline[functionline.length-1]==';')
        {
          console.log("yes function");
          check_val=true;
          MemoryMap.SP_line_number.push(MemoryMap.IP);
          MemoryMap.IP=this.function_line_array[i];
          check3=false;
          MemoryMap.SP.push(this.function_name_array[i]);
          var re=Parser.function_call(functionline);
          console.log(re[1]+"fdfjfdsfdsjfldsfldjfldsjfldsjfdlsjfds");
          if (this.isvariable(re[1]))
           {

                var val;
                var name=this.getvariable_name(re[1].replace(/\s+/g, ''));
                if (this.arthimeticline(re[1]))
                {
                  val=this.parsearthmetic(re[1]);
                }
                else
                {
                  console.log(" not a arthmetic ");
                  val=this.variable_list.getvalue(name);
                  console.log( val , this.function_link_list.getpara());
                  name=this.function_link_list.getpara(); 
                }
                 
                 
                 this.variable_list.setvalue(this.function_link_list.getpara(),val);
                 //console.log(name);
                 this.variable_list.printlist();
                 this.function_link_list.printlist();
                 MemoryMap.SP.push(name+" = "+val);

           }
          else
          {
            console.log("function name in esleeeeee  "+re[0]+"  fun argument "+re[1]); 
            var what=this.function_link_list.setparaval(re[0].replace(/\s+/g, ''),re[1]);
            //console.log(this.function_link_list.getpara()+"---------------------------------");
            this.variable_list.setvalue(this.function_link_list.getpara(),Number(re[1]));
            console.log(what+"what----"+re[0]);
            //var val=this.variable_list.getvalue("number");
            //console.log(val+"656654545");
            this.variable_list.printlist();
            MemoryMap.SP.push(this.function_link_list.getpara()+" = "+re[1]);

          }
                                      
          //this.function_link_list.printlist();
          this.variable_list.printlist();
          this.function_link_list.printlist();
          
        }
      }
      
      return check_val;
    },

    isvariable:function(variableline)
    {
     var var_array=this.variable_list.allvariable();
     console.log(var_array+" variables ");
     for (i=0;i<var_array.length;i++)
     {
       //console.log(i);
       if (variableline.includes(var_array[i]))
       {
         console.log("variable line");
         console.log("trueeeeeeeeeeeeee");
         return true;
       }
     }
     console.log("flaseeeeeeee")
     return false;
    },
    getvariable_name:function(var_name)
    {
      var var_array=this.variable_list.allvariable();
     //console.log(var_array+" variables ");
     for (i=0;i<var_array.length;i++)
     {
       console.log(i);
       if (var_name.includes(var_array[i]))
       {
         return var_array[i];
       }
     }
    },

    getvar_name_values:function(text)
    {
      
      if (text[0]=='i' && text[1]=='n' && text[2]=='t' &&  text[text.length-1]==';')
      {
        var name="";
        for (i=3;i<text.length;i++)
        {
          if (text[i] !=';' && text[i]!= '=')
          {
            name=name+text[i];
            
          }
          else
          {
            break;
          }
        }

        console.log(name , " name of variable");
        if (text.includes('='))
        {
          var val="";
          console.log(name.length);
          for (i=name.length+4;i<text.length-1;i++)
          {
            console.log(text[i]);
            val=val+text[i];
          }
          console.log("true" , text," initilzing" , name , "      =   " , val);
          this.variable_list.add(name,val,"int");
        }
        else
        {
          this.variable_list.add(name,"nan","int");
        }
        this.variable_list.printlist();
      }
      if (text[0]=='f' && text[1]=='l' && text[2]=='o' && text[2]=='a' && text[2]=='t'&&  text[text.length-1]==';')
      {

      }

     

    },
    arthimeticline:function(text)
    {
      ar_arry=['+','-','*','/'];
      for (i=0;i<ar_arry.length;i++)
      {
        
        if (text.includes(ar_arry[i]))
        {
          //console.log("arithmetic line");
          return true;
        }

      }
      return false;
    },

    parsearthmetic:function(text)
    {
      console.log(text);
      if(this.isvariable(text))
      {
        var var_name=this.getvariable_name(text);
        var name=this.variable_list.getvalue(var_name);
        arthstring=text.replace(var_name,name);
      }

      else
      {
        arthstring=text;
      }

      console.log(arthstring + " expression");
      var value=math.eval(arthstring);
      console.log(value+  " mariaaa");
      return value;

    },
    
    parsecode:function(text)
    {
      
      this.variable_list=new linklist();
      this.function_link_list=new funlinklist();
      this.function_name_array=[];
      this.function_line_array=[];
      this.code_line=[]; 

      var token=text.split("\n");
      var ip_set=false;
      for (var i=0;i<token.length;i++)
      { this.getvar_name_values(token[i].replace(/\s+/g, ''))
         
        this.code_line.push(token[i]);
        var temp=this.code_line[i].replace(/\s+/g, '');
        if (temp.includes('=') && this.isvariable(temp) && !temp.includes('"'))
        {
          console.log(temp);
          var variable=this.getvariable_name(temp);
          console.log(variable+" outttt");
            var value="";
            console.log(temp.indexOf(variable));
            for (r=temp.indexOf(variable)+variable.length+1;r<temp.length-1;r++)
            {
              value=value+temp[r];

            }
            console.log(value+"  inidessssssssssssssssss")
            this.variable_list.setvalue(variable,value);

          
        }
        if (temp[0]=='i' && temp[1]=='n' && temp[2]=='t' && temp[3]=='m' && temp[4]=='a' && temp[5]=='i' && temp[6]=='n' ) // check for main
        {
          MemoryMap.IP=i+1;
          console.log("IP = "+MemoryMap.IP);
          ip_set=true;
         MemoryMap.SP.push("main"); 
        }
        if (temp[temp.length-1]==';' && temp[temp.length-2]==')' && ip_set) // check for funtion call
        {
          console.log(" function line" + i);
          //this.function_call(this.code_line[i]);

        }
        else
        {
          var tmp=this.code_line[i].replace(/\s+/g, '');
          if (tmp[0]=='i' && tmp[1]=='f' && tmp[tmp.length-1]==')')
          {
            this.condition_if(this.code_line[i]);
          }
          else if( tmp[tmp.length-1]==')' && ip_set==false)
          {
            var re=this.function_definition(this.code_line[i]);

          this. function_name_array.push(re[1].replace(/\s+/g, ''));
          this.function_line_array.push(i);
          this.variable_list.add(re[3],"nan",re[2]);
          this.function_link_list.add(re[1].replace(/\s+/g, ''),re[0],re[3],re[2],i+1);
          
          }

        }
        
      }
      console.log(this.code_line);
      this.variable_list.printlist();
      this.function_link_list.printlist();
    },
  }

  var MemoryMap={
    IP:null,
    SP:[],
    SP_line_number:[], // return to line number when pop  
    sendStackvalues:function()
    {
      var out="  Stack"+"\n"+"______________"+"\n";
      for (i=MemoryMap.SP.length-1;i>=0;i--)
      {
          out=out+"  "+MemoryMap.SP[i]+"\n";
        
      }
      $("#outputstack").text(out);
      
    },
    sendIP:function()
    {
      $("#outputip").text("\n" +"  IP = "+MemoryMap.IP);
      
    },
    sendDataValues:function()
    {
      var out1="Data Segment"+"\n"+"____________"+"\n";
      for (i=0;i<Parser.function_name_array.length;i++)
      {
        out1=out1+"  "+Parser.function_name_array[i]+"\n";
      }
      var tmp=Parser.variable_list.allvariable();
      console.log(tmp+"data values variable ");
      for (v=0;v<tmp.length;v++)
      {
        out1=out1+"  "+tmp[v]+"\n";
      }

      $("#output").text(out1);
    },
    sendToOut:function(val)
    {
      $("#out").text(val);
    }
  }
  
  var Output={
    sendToOut:function(val)
    {
      $("#out").text(val);
    }
  }
  
     function runFunction() 
     {
      
       MemoryMap.SP=[];
       Parser.check4=false;
       var codetxt=TextEditor.getCode();
       Parser.parsecode(codetxt);
       $("div.numberedtextarea-number.numberedtextarea-number-"+MemoryMap.IP).attr('style', 'background-color:#F9AA33');
       var i=0;
       for (i=0;i<Parser.code_line.length;i++)
          {
            if (i != MemoryMap.IP)
            {
              $("div.numberedtextarea-number.numberedtextarea-number-"+i).attr('style', 'background-color:#232F34');
            }
          }
       MemoryMap.sendStackvalues();
       MemoryMap.sendIP();
       MemoryMap.sendDataValues();
       MemoryMap.IP=MemoryMap.IP+1;
     

     }

    function downfunction()
    {
      TextEditor.IterateOverCodeLineByLine();
      
    }