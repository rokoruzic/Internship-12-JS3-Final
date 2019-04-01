$(document).ready(function() {
  if (localStorage.getItem('user') === null)
    $('#registration__container').show();
  else $('#login__container').show();

  $('#signUpButton').click(function() {
    const user = {
      username: $('#inputUsername').val(),
      password: $('#inputPassword').val()
    };
    if (user.username.length < 5 || user.password < 5)
      alert('Username or password too short');
    else if (user.password !== $('#inputRepeatedPassword').val())
      alert('Passwords dont match');
    else {
      localStorage.setItem('user', JSON.stringify(user));
      $('#registration__container').hide();
      if ($('#log__checkbox').is(':checked')) {
        $('.login__background').hide();
        $('#users').show();
      } else $('#login__container').show();
    }
  });

  $('#signInButton').click(function() {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    if (
      userInfo.username !== $('#loginUsername').val() ||
      userInfo.password !== $('#loginPassword').val()
    )
      alert('Username or password not correct');
    else {
      $('#login__container').hide();
      $('.login__background').hide();
      $('#users').show();
    }
    $('#loginPassword').val('');
  });
  $('#log__off__button').click(function() {
    $('#users').hide();
    $('#login__container').show();
    $('.login__background').show();
  });
  $.get('https://jsonplaceholder.typicode.com/users', function(userData) {
    console.log(userData);
    $('.item__paragraph').each(function(i) {
      $(this).html(`<br>${userData[i].name}</br> ${userData[i].email}`);
    });

    $('.item__price').each(function(i) {
      $(this).html(userData[i].address.city);
    });

    $.each($('.offers__item'), function(index, item) {
      $(item).attr('userId', userData[index].id);
    });
    $('.offers__item').click(function() {
      $('#popup__item').show();
      let userDataFiltered = userData.find(x => x.id == $(this).attr('userId'));
      $(
        '#user__details'
      ).html(`<h1>Name: ${userDataFiltered.name}</h1> <p>Email: ${userDataFiltered.email}</p> 
              <p>Phone: ${
                userDataFiltered.phone
              }</p> <p>Web: ${userDataFiltered.website}</p> <p> Username: ${userDataFiltered.username} <br> </br> <h2>Adress:</h2>
               <p>Street: ${
                 userDataFiltered.address.street
               } </p> <p> Suite: ${userDataFiltered.address.suite}</p> <p>City: ${userDataFiltered.address.city}</p> <p> Zipcode: ${userDataFiltered.address.zipcode} </p>
               <br> </br> <h2> Company: </h2> <p>Name: ${
                 userDataFiltered.company.name
               }</p> <p> Phrase: ${userDataFiltered.company.catchPhrase}
               <p> Bs: ${userDataFiltered.company.bs} </p>`);
      $('#popup__item').scroll(function() {
        if ($(this).scrollTop() > 75)
          $('.scroll__to__top__button').css('display', 'block');
        else $('.scroll__to__top__button').css('display', 'none');
      });
      $('.scroll__to__top__button').click(function() {
        $('#popup__item').scrollTop(0);
      });
    });
    $('.close__button').click(function() {
      $('#popup__item').hide();
    });
    $.get('https://jsonplaceholder.typicode.com/users/1/posts', function(
      postData
    ) {
      $('.posts__button').click(function(event) {
        let userPosts = postData.filter(
          x =>
            x.userId ==
            $(this)
              .parent('.offers__item')
              .attr('userId')
        );
        $('#user__details').append(
          `<h1>UserId: ${$(this)
            .parent('.offers__item')
            .attr('userId')} <br> </br>`
        );
        userPosts.forEach(function(post) {
          $('#user__details').append(`<h1> ${post.title} </h1>
                        <p>PostId: ${
                          post.id
                        }</p> <p>Post: ${post.body} </p> <br> </br> `);
        });
        $('#popup__item').show();
        $('#popup__item').scroll(function() {
          if ($(this).scrollTop() > 75)
            $('.scroll__to__top__button').css('display', 'block');
          else $('.scroll__to__top__button').css('display', 'none');
        });
        $('.scroll__to__top__button').click(function() {
          $('#popup__item').scrollTop(0);
        });
        event.stopPropagation();
      });
      $('.close__button').click(function() {
        $('#popup__item').hide();
        $('#user__details').html('');
      });
    });
    $('.new__post__button').click(function(event) {
      $('#submit__post').show();
      $('#submit__post').attr(
        'userId',
        $(this)
          .parent('.offers__item')
          .attr('userId')
      );
      event.stopPropagation();
      $('.close__button').click(function() {
        $('#submit__post').hide();
        $('#post__title').val('');
        $('#post__body').val('');
      });
    });

    $('#submit__post__button').click(function() {
      var post = {
        title: $('#post__title').val(),
        body: $('#post__body').val(),
        userId: $('#submit__post').attr('userId')
      };
      if (!post.title.trim() || !post.body.trim())
        alert('Title and/or body musnt be empty');
      else {
        $('#submit__post').hide();
        $.ajax({
          type: 'POST',
          url: 'https://jsonplaceholder.typicode.com/posts',
          data: JSON.stringify(post),
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          success: function() {
            alert('Success!');
          },
          error: function() {
            alert('Failure');
          }
        });
        $('#post__title').val('');
        $('#post__body').val('');
      }
    });
  });
});
