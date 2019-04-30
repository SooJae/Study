// class Error extends Error{
//     constructor(message, ...params) {
//         super(...params);
//         this.message = message;
//       };
// }
// class Error extends Error{
//     constructor(message, ...params) {
//         super(...params);
//         this.message = message;
//       };
// }


var joinCheckService =(function(){
    
    async function checkForm(focus){
        var formGroup = focus.parent().parent();
        var pwCheck = formGroup.find("#pw2");
        var pw =formGroup.find("#pw"); 

        try{
            if(focus.attr("id") === "id"){
            let res = await checkRexID(focus);
            let res2 = await checkDuplicateID(res,callback);
            console.log(res2);

            }
            if(focus.attr("id") === "nickname"){
                let res= await checkRexNickName(focus);
                await checkDuplicateNickName(res,callback);
            }
            if(focus.attr("id") === "pw"){
                return await checkPW(focus,pwCheck);
            }
            if(focus.attr("id") === "pw2"){
                return await checkPW2(focus,pw);
            }
            if(focus.attr("id") === "email"){
                let res = await checkRexEmail(focus);
                
            }
        } catch (e){
            //return "메롱";
            //return e.message;
            focus.siblings("label").text(e.message);
        }
    }

    var checkRexID = function(focus){
        console.log(focus.val());
         var reg = /[^a-z0-9]/gi; //영어 숫자만 가능

        if(reg.test(focus.val())){
            focus.val(focus.val().replace(reg , ""));
            throw new Error("영어와 숫자로만 입력해주세요");
        } 
        if(4<=focus.val().length && focus.val().length<=12 ){
        return focus.val()
        } 
          	 	
        else {
            throw new Error("아이디를 입력해주세요 (영어+숫자조합 4~12자");
        }  

    };

    var checkRexNickName = function(focus){
        //특수문자 사용불가
        var reg = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi; 
            if(reg.test(focus.val())){
                focus.val(focus.val().replace(reg , ""));
                throw new Error("특수문자는 사용하실 수 없습니다");
            }
            if(2<=focus.val().length && focus.val().length<=8){
                return focus.val();
            }
            else{
                throw new Error("닉네임 입력해주세요 (2~8자)");
                }
    }


    var checkPW = function(focus, pwCheck){
         if(8<=focus.val().length && focus.val().length <=16){
            
         console.log(pwCheck.val().length);
            if(pwCheck.val().length>0){
                 if(focus.val()!=pwCheck.val()){
                       throw new Error("비밀번호가 일치하지 않습니다");
                    }
                 if(focus.val() == pwCheck.val()){
                     focus.siblings("label").text("비밀번호가 일치합니다.")
                }
            }
            else{
                focus.siblings("label").text("사용 가능한 비밀번호입니다");
            }
         }else{
                throw new Error("비밀번호를 입력해주세요 (8~16자)");
         }
    }
        
    var checkPW2 = function(focus,pw){
        if(focus.val() != pw.val()){
            throw new Error("비밀번호가 일치하지 않습니다");
        }
        else{
            focus.siblings("label").text("비밀번호가 일치합니다");
        }
    }

    var checkRexEmail =  function(focus){
    var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
    if(!reg.test(focus.val())){
       throw new Error("이메일의 형식에 맞게 작성해주세요");
    }
    
    else {
       // throw new Error("이메일을 입력해주세요");
        return focus.val();
    }
}

        
    function checkDuplicateID(focus,callback,error){
        $.ajax({
            type:'post',
            url: 'MemberJoinCheckAction.do',
            dataType:"json",
            data:JSON.stringify(focus),
            success:function(result, status, xhr){
                if(callback){
                    callback(result);
                }
            },
            error : function(xhr, status, err){
                if(error){
                    error(err);
                    }
            }
        });
        }
    
    return{
        checkForm:checkForm,
    };
    
    })();
        
    /*	  
              //사용자가 userID에 입력한 값을 가져오겠다.
                 var val ="";
                 var ine = ine;
                 
                 if (ine === "ID") {
                     val = $("#ID").val();
                 //분기점 만들어주고, servlet에서 분기점 또 만들고, SQL에서 인자에 따른 select가 가능한지
                 $.ajax({
                     type:"POST",
                     url: "MemberJoinCheckAction.do",
                     dataType:"json",
                     data:{"val":val, "ine":ine},
                     success: function(data){
                         //비어있다면 오류가 발생하거나 데이터가 비어있다면, 함수를 바로 종료, 즉 파싱 가능한 데이터만 파싱하겠다.
                         if(data == "" ) return;
                         if(data.result.value == 1){ // 중복되는 아이디 없음
                             $("#ID").siblings("label").text("가입 가능한 아이디입니다");
                             designfocus.val()($("#ID").parent(), successfocus.val(), "#ID");
                         }else{
                             $("#ID").siblings("label").text("이미 가입한 아이디 입니다");
                             designfocus.val()($("#ID").parent(), dangerfocus.val(), "#ID");
                         }
                     }
                 });
             }
        
        
        return{
            checkID:checkID
        };
    })();
    
    
    function designfocus.val()(focus.val(), change, sel){
         if(change==="default-focus.val()"){ //기본 폼
             if(focus.val().hasClass("danger-focus.val()")){
                    focus.val().removeClass("danger-focus.val()");
                    focus.val().addClass("default-focus.val()");
                    $(sel).siblings("i").removeClass();
                    $(sel).attr("validCheck","0");
                    
                } else {
                    focus.val().removeClass("success-focus.val()");
                    focus.val().addClass("default-focus.val()");
                    $(sel).siblings("i").removeClass();
                    $(sel).attr("validCheck","0");
                }
             }
         //실패 폼
             else if(change==="danger-focus.val()"){
                 if(focus.val().hasClass("default-focus.val()")){
                     focus.val().removeClass("default-focus.val()");
                     focus.val().addClass("danger-focus.val()");
                     $(sel).siblings("i").removeClass();
                     $(sel).siblings("i").addClass("fas fa-times-circle timesIcon");
                     $(sel).attr("validCheck","0");
                 } else {
                         focus.val().removeClass("success-focus.val()");
                         focus.val().addClass("danger-focus.val()");
                         $(sel).siblings("i").removeClass();
                         $(sel).siblings("i").addClass("fas fa-times-circle timesIcon");
                         $(sel).attr("validCheck","0");
                     }
             }
         //성공 폼
                 else{
                         if(focus.val().hasClass("danger-focus.val()")){
                             focus.val().removeClass("danger-focus.val()");
                             focus.val().addClass("success-focus.val()");
                             $(sel).siblings("i").removeClass();
                             $(sel).siblings("i").addClass("fas fa-check-circle checkIcon");
                             $(sel).attr("validCheck","1");
                         }
                         else{
                             focus.val().removeClass("default-focus.val()");
                             focus.val().addClass("success-focus.val()");
                             $(sel).siblings("i").removeClass();
                             $(sel).siblings("i").addClass("fas fa-check-circle checkIcon");
                             $(sel).attr("validCheck","1");
                         }
                     }
                 }
     
     $(function(){
         "use strict";
         var defaultfocus.val() = "default-focus.val()";
            var dangerfocus.val() = "danger-focus.val()";
            var successfocus.val() = "success-focus.val()";
         
          $(".focus.val()Check").keyup(function(){
                 var focus =$(":focus");
                 var focus.val()Group = $(":focus").parent();
                 var focus.val()=$(focus).val();
                 var $checkFocus=$(":focus").attr("id");
                 
                
                var $id = $("#ID");
                 var $nickName = $("#NickName");
                 var $pw = $("#PW");
                 var $pwCheck = $("#PW2");
                 var $email = $("#Email");
                 
                 var $idVal = $("#ID").val();
                 var $nickNameVal = $("#NickName").val();
                 var $pwVal = $("#PW").val();
                 var pwCheck = $("#PW2").val();
                 var $emailVal = $("#Email").val();
                 
                 else if($checkFocus==="PW")	{
                      if(focus.val()==""){
                         focus.siblings("label").text("비밀번호를 입력해주세요 (8~16자)");
                         designfocus.val()($pw.parent(), defaultfocus.val() ,"#PW");
                      } else if(8<=focus.val().length && focus.val().length <=16){
                         focus.siblings("label").text("사용 가능한 비밀번호입니다");
                         designfocus.val()($pw.parent(), successfocus.val(), "#PW");
                         
                             if(pwCheck.length>0){
                              if($pwVal!=pwCheck){
                                     $pwCheck.siblings("label").text("비밀번호가 일치하지 않습니다");
                                     designfocus.val()($pwCheck.parent(), dangerfocus.val(), "#PW2");
                                 }
                             else if($pwVal==pwCheck){
                                 $pwCheck.siblings("label").text("비밀번호가 일치합니다");
                                 designfocus.val()($pwCheck.parent(), successfocus.val(), "#PW2");
                             }
                         
                         }
                      }else{
                             focus.siblings("label").text("비밀번호를 입력해주세요 (8~16자)");
                             designfocus.val()($pw.parent(), dangerfocus.val(),"#PW");
                      }
                 }else if($checkFocus==="PW2"){
                        if(focus.val()==""){
                         focus.siblings("label").text("비밀번호를 확인해주세요");
                         designfocus.val()($pwCheck.parent(), defaultfocus.val(), "#PW2");
                          }
                        else if($("#PW2").val() != $("#PW").val()){
                         focus.siblings("label").text("비밀번호가 일치하지 않습니다");
                         designfocus.val()($pwCheck.parent(), dangerfocus.val(),"#PW2");
                      } 
                        else{
                         focus.siblings("label").text("비밀번호가 일치합니다");
                         designfocus.val()($pwCheck.parent(), successfocus.val(), "#PW2");
                      } 
                 }
                 else if($checkFocus==="Email"){
                     var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
                     if(!reg.test(focus.val())){
                         focus.siblings("label").text("이메일 형식에 맞게 작성해주세요.");
                         designfocus.val()($email.parent(), dangerfocus.val(), "#Email");
                      }
                     else if(focus.val()==""){
                         focus.siblings("label").text("이메일을 입력해주세요");
                         designfocus.val()($email.parent(), defaultfocus.val(), "#Email");
                     } else {
                         joinCheck("Email"); 
                         }
                     }
             });
         
             
          function joinCheck(ine){
                 //사용자가 userID에 입력한 값을 가져오겠다.
                 var val ="";
                 var ine = ine;
                 
                 if (ine === "ID") {
                     val = $("#ID").val();
                 //분기점 만들어주고, servlet에서 분기점 또 만들고, SQL에서 인자에 따른 select가 가능한지
                 $.ajax({
                     type:"POST",
                     url: "MemberJoinCheckAction.do",
                     dataType:"json",
                     data:{"val":val, "ine":ine},
                     success: function(data){
                         //비어있다면 오류가 발생하거나 데이터가 비어있다면, 함수를 바로 종료, 즉 파싱 가능한 데이터만 파싱하겠다.
                         if(data == "" ) return;
                         if(data.result.value == 1){ // 중복되는 아이디 없음
                             $("#ID").siblings("label").text("가입 가능한 아이디입니다");
                             designfocus.val()($("#ID").parent(), successfocus.val(), "#ID");
                         }else{
                             $("#ID").siblings("label").text("이미 가입한 아이디 입니다");
                             designfocus.val()($("#ID").parent(), dangerfocus.val(), "#ID");
                         }
                     }
                 });
             }
             else if (ine === "NickName") {
                     val = $("#NickName").val();
                     $.ajax({
                         type:"POST",
                         url: "MemberJoinCheckAction.do",
                         dataType:"json",
                         data:{"val":val, "ine":ine},
                         success: function(data){
                             //비어있다면 오류가 발생하거나 데이터가 비어있다면, 함수를 바로 종료, 즉 파싱 가능한 데이터만 파싱하겠다.
                             if(data == "" ) return;
                             if(data.result.value === 0){
                                 $("#NickName").siblings("label").text("이미 가입한 닉네임입니다");
                                 designfocus.val()($("#NickName").parent(), dangerfocus.val(), "#NickName");
                             }
                             if(data.result.value === 1){ // 중복되는 아이디 없음
                                 $("#NickName").siblings("label").text("가입 가능한 닉네임입니다");
                                 designfocus.val()($("#NickName").parent(), successfocus.val(), "#NickName");
                             }
                            
                         }
                     });
                 }
             else if (ine ==="Email") {
                     val = $("#Email").val();
                     
                     $.ajax({
                         type:"POST",
                         url: "MemberJoinCheckAction.do",
                         dataType:"json",
                         data:{"val":encodeURIComponent(val), "ine":ine},
                         success: function(data){
                             //비어있다면 오류가 발생하거나 데이터가 비어있다면, 함수를 바로 종료, 즉 파싱 가능한 데이터만 파싱하겠다.
                             if(data == "" ) return;
                             if(data.result.value == 1){ // 중복되는 아이디 없음
                                 $("#Email").siblings("label").text("가입 가능한 이메일입니다");
                                 designfocus.val()($("#Email").parent(), successfocus.val(), "#Email");
                             }else{
                                 $("#Email").siblings("label").text("이미 가입한 이메일입니다");
                                 designfocus.val()($("#Email").parent(), dangerfocus.val(), "#Email");
                             }
                         }
                     });
                 }
             }
     });
     function changefocus.val()(val){
          if(val == "1"){
             location.href="Loginfocus.val().do";
          }
        }
         
     
     function checkJoinfocus.val()(){
            var array = [];
    
            array.push($("#ID").attr("validCheck"));
            array.push($("#NickName").attr("validCheck"));
            array.push($("#PW").attr("validCheck"));
            array.push($("#PW2").attr("validCheck"));
            array.push($("#Email").attr("validCheck"));
            
            for(var i in array){
                if(array[i]!=1){
                    $("#dangerAlert").html("<strong>회원가입 폼</strong>을 확인해주세요");
                     $("#dangerAlert").addClass("show");
                     $("html").stop().animate({scrollTop: 0}, 100);
                    return false;
                }
            }
        }*/