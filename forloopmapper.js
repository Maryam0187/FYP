class tokenize_for {
    constructor() {
        this.starting_value = "";
        this.condition = "";
        this.increment = "";
        this.variable_name = "";
        this.body = [];
    }
}

var forLoopMapper = {
    forarray: [],
    text: "",

    ParseCode: function (code) {
        text = code.split("\n");
        this.TokenizeIterativeCode();
        this.mapiterativeToRecursive();
    },

    TokenizeIterativeCode: function () {
        var a = 0;
        for (i = 0; i < text.length; i++) {
            text[i] = text[i].replace(/\s+/g, '');
            if (text[i][0] == 'f' && text[i][1] == 'o' && text[i][2] == 'r') {
                var line = text[i].split(";");
                console.log(line);
                this.forarray.push(new tokenize_for());
                var tmp = "";
                this.forarray[a].condition = line[1];
                for (y = 7; line[0][y] != '='; y++) {
                    tmp = tmp + line[0][y];
                }
                this.forarray[a].variable_name = tmp;
                tmp = "";
                for (z = y + 1; z < line[0].length; z++) {
                    tmp = tmp + line[0][z];
                }
                this.forarray[a].starting_value = tmp;
                console.log(tmp);
                tmp = "";
                for (z = 0; z < line[2].length - 1; z++) {
                    tmp = tmp + line[2][z];
                }
                this.forarray[a].increment = tmp;
                //console.log(tmp+"   "+a+"in if"+"  "+text[i]);
                a++

            }
            else {
                if (a > 0) {
                    this.forarray[a - 1].body.push(text[i]);
                }


            }
            if (text[i] == '}') {

                a = a - 1;
                console.log(a + "  " + text[i]);
            }

        }
        console.log(this.forarray.length);

    },

    mapiterativeToRecursive: function () {
        if (this.forarray.length == 1) {
            var body1 = "";
            for (i = 0; i < this.forarray[0].body.length; i++) {
                if (this.forarray[0].body[i] != '}' && this.forarray[0].body[i] != "{") {
                    body1 = body1 + this.forarray[0].body[i] + "\n";
                }
            }
            var fun1_arg = "";
            if (this.forarray[0].increment.includes("--")) {
                fun1_arg = this.forarray[0].variable_name + "-1";
            }
            else if (this.forarray[0].increment.includes("++")) {
                fun1_arg = this.forarray[0].variable_name + "+1";
            }
            else {
                console.log("in else");
                var tmp = "";
                var check = false;
                for (i = 0; i < this.forarray[0].increment.length; i++) {
                    console.log(this.forarray[0].increment[i]);

                    if (check) {
                        tmp = tmp + this.forarray[0].increment[i];
                    }
                    if (this.forarray[0].increment[i] == '=') {
                        check = true;
                    }

                }
                fun1_arg = tmp;

            }

            var oneditor = "void function(int " + this.forarray[0].variable_name + ")" + "\n" +
                "{" + "\n" +
                "   if (" + this.forarray[0].condition + ")" + "\n" +
                "   {" + "\n" +
                "       " + body1 + "\n" +
                "       function(" + fun1_arg + ");" + "\n" +
                "   }" + "\n" +
                "   else" + "\n" +
                "   {" + "\n" +
                "       return;" + "\n" +
                "   }" + "\n" +
                "}";
                TextEditor.SendConvertedCode(oneditor)
                console.log(this.forarray);
        }


        else {
            var body1 = "";
            for (i = 0; i <this.forarray[0].body.length; i++) {
                if (this.forarray[0].body[i] != '}' && this.forarray[0].body[i] != "{") {
                    body1 = body1 + this.forarray[0].body[i] + "\n";
                }
            }

            var body2 = "";
            for (i = 0; i < this.forarray[1].body.length; i++) {
                if (this.forarray[1].body[i] != '}' && this.forarray[1].body[i] != '{') {
                    body2 = body2 + this.forarray[1].body[i] + "\n";
                }
            }
            //++++++++++++++++++++++++++++++++function 1 & 2 arguments +++++++++++++++++++++++++
            fun1_arg = "";
            fun2_arg = "";
            if (this.forarray[0].increment.includes("--")) {
                fun1_arg = this.forarray[0].variable_name + "-1";
            }
            else if (this.forarray[0].increment.includes("++")) {
                fun1_arg = this.forarray[0].variable_name + "+1";
            }
            else {
                console.log("in else");
                var tmp = "";
                var check = false;
                for (i = 0; i < this.forarray[0].increment.length; i++) {
                    console.log(this.forarray[0].increment[i]);

                    if (check) {
                        tmp = tmp + this.forarray[0].increment[i];
                    }
                    if (this.forarray[0].increment[i] == '=') {
                        check = true;
                    }

                }
                fun1_arg = tmp;

            }

            if (this.forarray[1].increment.includes("--")) {
                fun2_arg = this.forarray[1].variable_name + "-1"
            }
            else if (this.forarray[1].increment.includes("++")) {
                fun2_arg = this.forarray[1].variable_name + "+1";
            }
            else {
                var tmp = "";
                var check = false;
                for (i = 0; i < this.forarray[1].increment.length; i++) {

                    if (check) {
                        tmp = tmp + this.forarray[1].increment[i];
                    }
                    if (this.forarray[1].increment[i] == '=') {
                        check = true;
                    }

                }
                fun2_arg = tmp;

            }

            console.log(body1 + "checking body-------------");
            var oneditor = "void function (int " + this.forarray[1].variable_name + ")" + " \n" +
                "{" + "\n" +
                "   if (" +this.forarray[1].condition + ")" + "\n" +
                "   {" + "\n" +
                "       " + body2 + "\n" +
                "       function(" + fun2_arg + ");" + "\n" +
                "   }" + "\n" +
                "   else" + "\n" +
                "   {" + "\n" +
                "       return;" + "\n" +
                "   }" + "\n" +
                "}" + "\n" + "\n" +

                "void function2 (int " +this.forarray[0].variable_name + ")" + "\n" +
                "{" + "\n" +
                "   if (" + this.forarray[0].condition + ")" + "\n" +
                "   {" + "\n" +
                "       function(" + this.forarray[1].starting_value + ");" + "\n" +
                "       " + body1 + "\n" +
                "       function2(" + fun1_arg + ");" + "\n" +
                "   }" + "\n" +
                "   else" + "\n" +
                "   {" + "\n" +
                "       return;" + "\n" +
                "   }" + "\n" +
                "}";
            TextEditor.SendConvertedCode(oneditor)
            console.log(this.forarray);
        }
    $('#editor2').numberedtextarea();


    }


}

var TextEditor = {
    code: "",

    getCode: function () {
        code = $("#editor").val();
        console.log(code);
        forLoopMapper.ParseCode(code)
    }
,
    SendConvertedCode:function(oneditor) {
        $("#editor2").text(oneditor);
        
    }
}

function ConvertCode() {
    TextEditor.getCode();
}


