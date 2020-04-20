$(document).ready(function () {

    function getAccountInfoHandler(accountInfo) {
        if (accountInfo.errorCode == 0) {
            var profile = accountInfo['profile'];
            $("#nameBox").text(profile["firstName"] + ' ' + profile["lastName"]);
            $("#connectedAccounts").text(accountInfo['socialProviders']);
            $("#loggedInTimesBox").text(getCookie('loggedFlag'));

        }
        else {
            window.location.replace("../");
        }
    }

    function setNewAccountInfo(accountInfo) {
        location.reload();
    }

    function getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    gigya.accounts.getAccountInfo({callback: getAccountInfoHandler});
    gigya.socialize.showAddConnectionsUI({
        containerID: "addConnectionsDiv",
        captionText:'Connect with your other Accounts',
        showEditLink: true,
        width: '700',
        height: '200',
        buttonSize: 50,
        onConnectionAdded: setNewAccountInfo
    });

    $("#logoutBtn").click(function (event) {
        gigya.accounts.logout();
    });


});