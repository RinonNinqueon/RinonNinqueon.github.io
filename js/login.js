/**
 * Created by stepa on 05.08.2016.
 */
function login_request()
{
    // указываем класс process для div-а сообщений и плавно показываем его
    //<div class="alert alert-success" role="alert">...</div>
    $("#login_result").removeClass().addClass('alert alert-warning').text('Проверка....').fadeIn(1000);

    // проверяем через AJAX имя пользователя пароль
    $.post("login.php", {login:$('#login_edit').val(), password:md5($('#password_edit').val()),submit:1}, function(data)
    {
        if(data == 1)
        {
            // логин верный
            $("#login_result").fadeTo(200,0.1,function()
            {
                $(this).html('Всё верно.....').removeClass().addClass('alert alert-success').fadeTo(900,1,
                    function()
                    {
//                        document.location='secure.php';
//                        jQuery.noConflict();
                        $('#myModal').modal('hide');

                        login_check();
                    });
            });
        }
        else
        {
            // логин неверный
            $("#login_result").fadeTo(200,0.1,function()
            {
                $(this).html('Ошибочка вышла ...').removeClass().addClass('alert alert-danger').fadeTo(900,1);
            });
        }
    });
}

function login_check()
{
//    var id = Cookies.get('id');

//    if (id != null)
//    {
/*        var c_nick = Cookies.get('nick');
        if (c_nick != null) {
            var c_nick = c_nick.replace(/\+/g, ' ');
            $("#userpanel").html(c_nick);
        }
        $("#login").hide();
        $("#register").hide();
        $("#logout").show();
        $("#userpanel").show();
*/

        $.post("check.php", {submit: 1}, function (data) {
            var parsed = JSON.parse(data);
            if (parsed.result == 1)
            {
                // логин верный
                $("#login_result").fadeTo(200, 0.1, function () {
                    $(this).html('Всё верно.....').removeClass().addClass('alert alert-success').fadeTo(900, 1,
                        function () {
//                        document.location='secure.php';
                            $("#login").hide();
                            $("#register").hide();
                            $("#logout").show();
                            $("#userpanel").html(parsed.nick);
                            $("#userpanel").show();
                        });
                });
            }
            else
            {
                // логин неверный
                $("#login").show();
                $("#register").show();
                $("#logout").hide();
                $("#userpanel").hide();
            }
        });
/*    }
    else
    {
        $("#login").show();
        $("#register").show();
        $("#logout").hide();
        $("#userpanel").hide();
    }*/
}

function logout()
{
    $.post("logout.php", {submit: 1}, function (data) {
        if (data == 1)
        {
            $("#login").show();
            $("#register").show();
            $("#logout").hide();
            $("#userpanel").hide();
        }
    });
}