$(document).ready(function () {

    function getAccountInfoHandler(accountInfo) {
        if (accountInfo.errorCode == 0) {
            var profile = accountInfo['profile'];
            $("#ageBox").text(profile["age"] + ' years old');
            $("#nameBox").text(profile["firstName"] + ' ' + profile["lastName"]);
            $("#pictureBox").attr('src', profile["thumbnailURL"]);
            $("#emailBox").text(profile["email"]);
        }
        else {
            window.location.replace("../");
        }
    }

    $("#logoutBtn").click(function (event) {
        gigya.accounts.logout();
    });

    gigya.accounts.getAccountInfo({callback: getAccountInfoHandler});


    $("#shareBtn").click(function () {
        var act = new gigya.socialize.UserAction();
        act.setTitle("Profile");  // Setting the Title
        act.setLinkBack("https://demo.gigya.com/my_profile.php");  // Setting the Link Back
        act.setDescription("This is my Profile");   // Setting Description
        act.addActionLink("Read More", "http://localhost/about.php");  // Adding Action Link

// Adding a Media Item (image)
        act.addMediaItem({
            type: 'image',
            src: 'https://demo.gigya.com/images/300x250_myoss_3frames-lg.gif',
            href: 'https://demo.gigya.com/about.php'
        });

        var params =
            {
                userAction: act
                , showMoreButton: true // Enable the "More" button and screen
                , showEmailButton: true // Enable the "Email" button and screen
            };

// Show the "Share" dialog
        gigya.socialize.showShareUI(params);
    });


});