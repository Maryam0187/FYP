function signbutton()
{
    console.log("1234");
    var name=$('#Sname').val();
    var pass=$('#Spassword').val();
    console.log(name+"  "+pass);
    if(name=="user" && pass=="1234")
    {
        $('#Sform').attr('action','home.html');    
    }
}