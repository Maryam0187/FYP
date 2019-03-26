function savefilefunction(){

    console.log("function in ")
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", "http://localhost:3000/filedata/");
    xmlhttp.setRequestHeader("Content-Type", "application/json");

    var data=$('#editor2').val();
    var filename=$('#filename').val();
    console.log(data);
    xmlhttp.send(JSON.stringify({"textdata":data,"name":filename }));
}
    