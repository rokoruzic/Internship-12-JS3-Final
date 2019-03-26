$(document).ready(function () {
if(localStorage.getItem('user')===null)

    $("#registration").show();
    else
    $("#login").show();


    $("#signUpButton").click(function () {
      
        const user = {
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
        const userInfo = JSON.parse( localStorage.getItem('user') );
        if(userInfo.username !== $('#loginUsername').val() || userInfo.password !== $('#loginPassword').val())
        alert("Username or password not correct");
        else
        {
        $("#login").hide();
        $("#users").show();
        }
    });
    $.get('https://jsonplaceholder.typicode.com/users', function (data) {
        console.log(data);
        $(".item__paragraph").each(function (i) {
            $(this).html(`<br>${data[i].name}</br> ${data[i].email}`);
        });

        $(".item__price").each(function (i) {
            $(this).html(data[i].address.city);
        });

        $('.offers__item').each(function (i) {
            $(this).click(function () {
                $("#popup__item").show();
                $('#user__details').html(`<h1>Name: ${data[i].name}</h1> <p>Email: ${data[i].email}</p> 
              <p>Phone: ${data[i].phone}</p> <p>Web: ${data[i].website}</p> <p> Username: ${data[i].username} <br> </br> <h2>Adress:</h2>
               <p>Street: ${data[i].address.street} </p> <p> Suite: ${data[i].address.suite}</p> <p>City: ${data[i].address.city}</p> <p> Zipcode: ${data[i].address.zipcode} </p>
               <br> </br> <h2> Company: </h2> <p>Name: ${data[i].company.name}</p> <p> Phrase: ${data[i].company.catchPhrase}
               <p> Bs: ${data[i].company.bs} </p>`
                );
                $("#popup__item").scroll(function () {
                    if ($(this).scrollTop() > 75)
                        $('#scroll__to__top__button').css("display", "block");
                    else
                        $('#scroll__to__top__button').css("display", "none");
                });
                $('#scroll__to__top__button').click(function () {
                    $('#popup__item').scrollTop(0);
                })
            });
            $('#close__button').click(function () {
                $("#popup__item").hide();

            })
        });
     
        $.get('https://jsonplaceholder.typicode.com/users/1/posts', function (postData) {
            console.log(postData);
            
            $('.posts__button').each(function (i) {
                $(this).click(function (event) {
                   let array =  postData.filter(x => x.userId === i+1);
                  
                    array.forEach(function (item) {
                        $("#user__details").append("<li>" + item.title + "</li>");
                    });
                    $("#popup__item").show();

                    $("#popup__item").scroll(function () {
                        if ($(this).scrollTop() > 75)
                            $('#scroll__to__top__button').css("display", "block");
                        else
                            $('#scroll__to__top__button').css("display", "none");
                    });
                    $('#scroll__to__top__button').click(function () {
                        $('#popup__item').scrollTop(0);
                    })



                    event.stopPropagation();
                });

                $('#close__button').click(function () {
                    $("#popup__item").hide();
                    $('#user__details').html('');




                })
            })

        });
  

      });




















});




































