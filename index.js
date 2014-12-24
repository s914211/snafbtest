$(document).ready(function(){
    Parse.initialize("i3YYpkGy0zHRuBevYamiXHNZIGQO8Mmj7IjUxGXE", "sHviJS2dqoTQWIPM3Fx3Si2zv01YQ9KgMIQXMun5");
    var fetch_my_profile = function () {
                    FB.api('/me', function(response) {
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
                        var my_picture_url = response.data.url;
                        $("#my-profile-picture").attr('src', my_picture_url);
                    });
                    FB.api("/me/friends",function (response) {
                        if (response && !response.error) {
                            console.log(response);
                            console.log(response.name);
                            $('#myfriends').html(response.name);
                        }
                    });
    };
    $("#my-login-button").click(function(){
        Parse.FacebookUtils.logIn("user_friends", {
            success: function(user) {
                if (!user.existed()){
                    alert("User signed up and logged in through Facebook!");
                } 
                else{
                    alert("User logged in through Facebook!");
                    fetch_my_profile();
                }
            },
            error: function(user, error) {
                alert("User cancelled the Facebook login or did not fully authorize.");
            }
        });
    });
    $("#logout").click(function(){
        Parse.User.logOut();
        FB.getLoginStatus(function(response) {
            if (response && response.status === 'connected') {
                FB.logout(function(response) {
                    document.location.reload();
                });
            }
        });
    });
})