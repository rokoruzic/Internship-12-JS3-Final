$(document).ready(function () {


    $("#signUpButton").click(function () {
      
        let user = {
            username: $('#inputUsername').val(),
            password: $('#inputPassword').val()
        };
        if (user.username.length < 5 || user.password < 5)
            alert("Username or password too short")
        else if (user.password !== $('#inputRepeatedPassword').val())
            alert("Passwords don't match")
        else
        {
            localStorage.setItem('user',JSON.stringify(user));
            $("#registration").hide();
            $("#login").show();

        }
    });
    $("#signInButton").click(function () {
        let userInfo = JSON.parse( localStorage.getItem('user') );
        if(userInfo.username !== $('#loginUsername').val() && userInfo.password !== $('#loginPassword').val())
        alert("Username or password not correct");
        else
        {
        $("#login").hide();
        $("#users").show();

        }


    });

});














