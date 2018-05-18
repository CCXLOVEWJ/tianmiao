$(document).ready(function () {
    //获取用户列表
    var userList = getUserList();
    /**
     * username部分
     * @type {RegExp}
     */
    var name_reg = /^[\u4e00-\u9fa5]{4,20}$|^[\dA-Za-z_\-]{4,20}$/;
    $("#username").focus(function () {
        if($(this).val().length == 0) {
            $(this).parent(".signup-name").next("div").css("top",60);
            $(this).parent(".signup-name").next("div").html("<i></i>支持中文，字母，数字，'-'，'_'的多种组合");
        }
    });
    $("#username").blur(function () {
        if ($(this).val().length == 0) {
            $(this).parent("div").css("border","1px solid #ddd");
            $(this).parent("div").next(".text-tips").text("");
            $(this).parent("div").next(".text-tips").css("color","#c5c5c5");
        }else if ($(this).val().length>0 && $(this).val().length<4) {
            $(this).parent("div").css("border","1px solid #e22");
            $(this).parent("div").next(".text-tips").html("<i></i>长度只能在4-20个字符之间");
            $(this).parent("div").next(".text-tips").css("color","#e22");
            $(this).parent("div").next(".text-tips").children("i").css("backgroundPosition","-17px -117px");
        }else if (!($(this).val().match(name_reg))) {
            $(this).parent("div").css("border","1px solid #e22");
            $(this).parent("div").next(".text-tips").html("<i></i>格式错误，仅支持汉字、字母、数字、“-”“_”的组合");
            $(this).parent("div").next(".text-tips").css("color","#e22");
            $(this).parent("div").next(".text-tips").children("i").css("backgroundPosition","-17px -117px");
        }else {
            for(var i = 0; i < userList.length; i++) {
                if ($(this).val() == userList[i].name) {
                    $(this).parent("div").css("border","1px solid #e22");
                    $(this).parent("div").next(".text-tips").html("<i></i>该用户名已被注册");
                    $(this).parent("div").next(".text-tips").css("color","#e22");
                    $(this).parent("div").next(".text-tips").children("i").css("backgroundPosition","-17px -117px");
                    return;
                }
            }
            $(this).parent("div").css("border","1px solid #ddd");
            $(this).parent("div").next(".text-tips").html("");
        }
    });
    /**
     * password部分
     */
    var psw_reg_ok = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/;
    var psw_reg_simpleWord = /^[A-Za-z]+$/;
    var psw_reg_simpleNum = /^\d+$/;
    var psw_reg_simpleSymbol = /[^%&',;=?$\x22]+/;
    $("#password").focus(function () {
        if($(this).val().length == 0) {
            $(this).parent(".signup-psw").next("div").css("top",140);
            $(this).parent(".signup-psw").next("div").html("<i></i>建议使用字母、数字和符号两种以上的组合，6-20个字符");
        }
    });
    $("#password").blur(function () {
        if ($(this).val().length == 0) {
            $(this).parent("div").css("border","1px solid #ddd");
            $(this).parent("div").next(".text-tips").text("");
            $(this).parent("div").next(".text-tips").css("color","#c5c5c5");
        } else if (($(this).val().length > 0 && $(this).val().length < 6) || $(this).val().length > 20) {
            $(this).parent("div").css("border","1px solid #e22");
            $(this).parent("div").next(".text-tips").html("<i></i>长度只能在6-20个字符之间");
            $(this).parent("div").next(".text-tips").css("color","#e22");
            $(this).parent("div").next(".text-tips").children("i").css("backgroundPosition","-17px -100px");
        } else if ($(this).val().match(psw_reg_simpleWord) || $(this).val().match(psw_reg_simpleNum)) {
            $(this).parent("div").next(".text-tips").html("<i></i>有被盗风险,建议使用字母、数字和符号两种及以上组合");
            $(this).parent("div").next(".text-tips").css("color","#c5c5c5");
            $(this).parent("div").next(".text-tips").children("i").css("background-position","-17px -134px");
        } /*else if () {
            $(this).parent("div").next(".text-tips").html("<i></i>安全强度适中，可以使用三种以上的组合来提高安全强度");
            $(this).parent("div").next(".text-tips").css("color","#c5c5c5");
            $(this).parent("div").next(".text-tips").children("i").css("background-position","-34px -117px");
        }*/else {
            $(this).parent("div").css("border","1px solid #ddd");
            $(this).parent("div").next(".text-tips").html("<i></i>你的密码很安全");
            $(this).parent("div").next(".text-tips").css("color","#c5c5c5");
            $(this).parent("div").next(".text-tips").children("i").css("background-position","-34px -134px");
        }
    });
    /**
     * ms-password部分
     */
    $("#ms-password").focus(function () {
        if($(this).val().length == 0) {
            $(this).parent(".signup-ms_psw").next("div").css("top",220);
            $(this).parent(".signup-ms_psw").next("div").html("<i></i>请再次输入密码");
        }
    });
    $("#ms-password").blur(function () {
        if($(this).val().length == 0) {
            $(this).parent("div").css("border","1px solid #ddd");
            $(this).parent("div").next(".text-tips").text("");
            $(this).parent("div").next(".text-tips").css("color","#c5c5c5");
        }else if($(this).val() != $("#password").val()) {
            $(this).parent("div").css("border","1px solid #e22");
            $(this).parent("div").next(".text-tips").html("<i></i>两次密码不匹配");
            $(this).parent("div").next(".text-tips").css("color","#e22");
            $(this).parent("div").next(".text-tips").children("i").css("backgroundPosition","-68px -100px");
        }else {
            $(this).parent("div").next(".text-tips").html("");
            $(this).parent("div").css("border","1px solid #ddd");
        }
    });
    /**
     * tel部分
     * @type {RegExp}
     */
    var tel_reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[3|6|7|8]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    $("#tel").focus(function () {
        if($(this).val().length == 0) {
            $(this).parent(".signup-tel").next("div").css("top",310);
            $(this).parent(".signup-tel").next("div").html("<i></i>验证完后，你可以使用该手机登陆和找回密码");
        }
    });
    $("#tel").blur(function () {
        if($(this).val().length == 0) {
            $(this).parent("div").css("border","1px solid #ddd");
            $(this).parent("div").next(".text-tips").text("");
            $(this).parent("div").next(".text-tips").css("color","#c5c5c5");
        } else if (($(this).val().length != 11) || (!($(this).val().match(tel_reg)))) {
            $(this).parent("div").css("border","1px solid #e22");
            $(this).parent("div").next(".text-tips").html("<i></i>格式有误");
            $(this).parent("div").next(".text-tips").css("color","#e22");
            $(this).parent("div").next(".text-tips").children("i").css("backgroundPosition","-68px -100px");
        } else {
            for (var i = 0; i< userList.length; i++) {
                if ($(this).val() == userList[i].tel) {
                    $(this).parent("div").css("border","1px solid #e22");
                    $(this).parent("div").next(".text-tips").html("<i></i>该手机号已被占用");
                    $(this).parent("div").next(".text-tips").css("color","#e22");
                    $(this).parent("div").next(".text-tips").children("i").css("backgroundPosition","-17px -117px");
                    return;
                }
            }
            $(this).parent("div").next(".text-tips").html("");
            $(this).parent("div").css("border","1px solid #ddd");
        }
    });
    /**
     * auth-code部分
     */
    getCode();
    $(".auth-code>a").click(function (e) {
        getCode();
        e.preventDefault();//不然页面会向顶部跳一下
    });
    $("#auth_code").focus(function () {
        if($(this).val().length == 0) {
            $(this).parent(".signup-auth_code").next("div").css("top",390);
            $(this).parent(".signup-auth_code").next("div").html("<i></i>点击更换图片");
        }
    });
    $("#auth_code").blur(function () {
        if($(this).val()== 0) {
            $(this).parent("div").css("border","1px solid #ddd");
            $(this).parent("div").next(".text-tips").text("");
            $(this).parent("div").next(".text-tips").css("color","#c5c5c5");
        }else if ($(this).val().toUpperCase() != $(".auth-code>a").text().toUpperCase()) {  //val()不能获取a链接的值
            $(this).parent("div").css("border","1px solid #e22");
            $(this).parent("div").next(".text-tips").html("<i></i>验证码不正确");
            $(this).parent("div").next(".text-tips").css("color","#e22");
            $(this).parent("div").next(".text-tips").children("i").css("backgroundPosition","-68px -100px");
        }else {
            $(this).parent("div").css("border","1px solid #ddd");
            $(this).parent("div").next(".text-tips").html("<i></i>验证码正确!");
            $(this).parent("div").next(".text-tips").css("color","#c5c5c5");
            $(this).parent("div").next(".text-tips").children("i").css("background-position","0 -117px");
        }
    });
    /**
     * 注册部分
     */
    $("#ok").click(function (e) {
        for(var i = 0; i< 5; i++) {
            if($("input").eq(i).val().length == 0) {
                $("input").eq(i).focus();
                $("input").eq(i).parent("div").css("border","1px solid #e22");
                $("input").eq(i).parent("div").next(".text-tips").html("<i></i>此处不能为空");
                $("input").eq(i).parent("div").next(".text-tips").css("color","#e22");
                $("input").eq(i).parent("div").next(".text-tips").children("i").css("backgroundPosition","-17px -100px");
                e.preventDefault();
                return;
            }else {
                userList.push(new user($("#username").val(),$("#password"),$("#tel").val()));
                localStorage.setItem("userList",JSON.stringify(userList));
                alert("注册成功!!!");
                location.reload();
                return;
            }
        }
    });
    $(".clear_userList").hover(function () {
        $(this).animate({"opacity":"1"},500);
    },
        function () {
            $(this).animate({"opacity":"0"},500);
        });
    $(".clear_userList").click(function () {
        var confirm_btn = confirm("确认清空用户列表吗?");
        if(confirm_btn==true) {
            localStorage.removeItem("userList");
            alert("用户列表已清空( • ̀ω•́ )✧");
            location.reload();
            return;
        }
    });
    /**
     * 设置验证码
     */
    function getCode() {
        var str = "1234567890qazwsxedcrfvtgbyhnujmikolpQAZWSXEDCRFVTGBYHNUJMIKOLP";
        var auth_code = "";
        for(var i = 0; i < 4; i++) {
            var index = Math.floor(Math.random()*62);
            auth_code += str[index];
        }
        $(".auth-code>a").text(auth_code);
    }

    /**
     * 创建用户对象
     * @param name
     * @param password
     * @param tel
     */
    function user(name,password,tel) {
        this.name = name;
        this.password = password;
        this.tel = tel;
    }
    /**
     * 获取用户列表
     * @returns {*}
     */
    function getUserList(){
        var userList = localStorage.getItem('userList');
        if(userList != null){
            return JSON.parse(userList);
        }else{
            return new Array();
        }
    }
});