Parse.initialize("i3YYpkGy0zHRuBevYamiXHNZIGQO8Mmj7IjUxGXE", "sHviJS2dqoTQWIPM3Fx3Si2zv01YQ9KgMIQXMun5");
 
  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : '891874940822755', // Facebook App ID
      status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true,  // initialize Facebook social plugins on the page
      version    : 'v2.2' // point to the latest Facebook Graph API version
    });
 
    // Run code after the Facebook SDK is loaded.
    window.fbLoaded();
  };
 
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  window.fbLoaded = function () {
            FB.Event.subscribe('auth.login', function(response) {
                // when user has been logged in, this block will be triggered.
                var msg = "You're logged in.";
                $("#my-login-message").html(msg);
                // print out the response in the console.
                console.log("Your login response:");
                console.log(response);
                fetch_my_profile();
            });

            $("#my-login-button").click(function(){
                FB.login();
            });

            var fetch_my_profile = function () {
                FB.api('/me', function(response) {
                    console.log(response);
                    var my_name = response.name;
                    var my_gender = response.gender;
                    var my_username = response.username;
                    var my_facebook_id = response.id;

                    $("#my-profile-name").html(my_name);
                    $("#my-profile-gender").html(my_gender);
                    $("#my-profile-username").html(my_username);
                    $("#my-profile-facebook-id").html(my_facebook_id);
                });

                FB.api('/me/picture?width=500', function(response) {
                    console.log(response);
                    var my_picture_url = response.data.url;

                    $("#my-profile-picture").attr('src', my_picture_url);
                });
            };
        }