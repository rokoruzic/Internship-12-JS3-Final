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
    $.get('https://jsonplaceholder.typicode.com/users', function (userData) {
        console.log(userData);
        $(".item__paragraph").each(function (i) {
            $(this).html(`<br>${userData[i].name}</br> ${userData[i].email}`);

         
        });

        $(".item__price").each(function (i) {
            $(this).html(userData[i].address.city);
        });
        
        $.each($('.offers__item'), function (index, item) {
            $(item).attr('userId', userData[index].id);
        });

        $('.offers__item').each(function (i) {
            
            $(this).click(function () {
                $("#popup__item").show();
                $('#user__details').html(`<h1>Name: ${userData[i].name}</h1> <p>Email: ${userData[i].email}</p> 
              <p>Phone: ${userData[i].phone}</p> <p>Web: ${userData[i].website}</p> <p> Username: ${userData[i].username} <br> </br> <h2>Adress:</h2>
               <p>Street: ${userData[i].address.street} </p> <p> Suite: ${userData[i].address.suite}</p> <p>City: ${userData[i].address.city}</p> <p> Zipcode: ${userData[i].address.zipcode} </p>
               <br> </br> <h2> Company: </h2> <p>Name: ${userData[i].company.name}</p> <p> Phrase: ${userData[i].company.catchPhrase}
               <p> Bs: ${userData[i].company.bs} </p>`
                );
                $("#popup__item").scroll(function () {
                    if ($(this).scrollTop() > 75)
                        $('.scroll__to__top__button').css("display", "block");
                    else
                        $('.scroll__to__top__button').css("display", "none");
                });
                $('.scroll__to__top__button').click(function () {
                    $('#popup__item').scrollTop(0);
                })
            });
            $('.close__button').click(function () {
                $("#popup__item").hide();

            })
        });

     
        $.get('https://jsonplaceholder.typicode.com/users/1/posts', function (postData) {
            console.log(postData);
            $('.posts__button').each(function (i) {
                $(this).click(function (event) {
                    let userPosts = postData.filter(x => x.userId == $('.offers__item').eq(i).attr('userId'));
                    $("#user__details").append(`<h1>UserId: ${$('.offers__item').eq(i).attr('userId')} <br> </br>`);
                    userPosts.forEach(function (post) {
                        $("#user__details").append(`<h1> ${post.title} </h1>
                        <p>PostId: ${post.id}</p> <p>Post: ${post.body} </p> <br> </br> `);
                    });
                    $("#popup__item").show();

                    $("#popup__item").scroll(function () {
                        if ($(this).scrollTop() > 75)
                            $('.scroll__to__top__button').css("display", "block");
                        else
                            $('.scroll__to__top__button').css("display", "none");
                    });
                    $('.scroll__to__top__button').click(function () {
                        $('#popup__item').scrollTop(0);
                    })
                    event.stopPropagation();
                });
                $('.close__button').click(function () {
                    $("#popup__item").hide();
                    $('#user__details').html('');

                })
            })

        });
        $('.new__post__button').each(function (i) {
        $(this).click(function (event) {
            $("#submit__post").show();
            $("#submit__post").attr('userId',$('.offers__item').eq(i).attr('userId'));
            event.stopPropagation();
            $('.close__button').click(function () {
                $("#submit__post").hide();
                $('#post__title').val('');
                $('#post__body').val('');

            })
        });

        });
        $('#submit__post__button').click(function(){
            var post = {
                title: $('#post__title').val(),
                body: $('#post__body').val(),
                userId: $("#submit__post").attr('userId')

            };
            if(post.title.length<1 || post.body.length<1)
            alert("Title and/or body musn't be empty");
            else
            {
             $("#submit__post").hide();
            $.ajax({
                type: "POST",
                url: "https://jsonplaceholder.typicode.com/posts",
                data: JSON.stringify(post),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(){
                    alert("Success!")
                    ;},
                failure: function() {
                    alert("Failure!");
                }
            });
           
            $('#post__title').val('');
            $('#post__body').val('');

        }
        });


    });

});




































