$(document).ready(function () {

    function getAccountInfoHandler(accountInfo) {
        if (accountInfo.errorCode == 0) {
            if (accountInfo.profile['email']) {
                window.location.replace("../account");
            }
            else {
                $('#mailModal').modal('show');
            }
        }
    }

    gigya.accounts.getAccountInfo({callback: getAccountInfoHandler});

    var params = {
        width: '700',
        height: '300',
        captionText: 'Please login with your preferred service',
        showTermsLink: false,
        pagingButtonStyle: 'floating',
        buttonsStyle: 'fullLogoColored',
        buttonSize: 50,
        containerID: 'loginContainer'
    };
    params['onLogin'] = function (event) {
        var userIdLoginTimes = Cookies.get(event.UID);
        if (userIdLoginTimes){
            userIdLoginTimes = parseInt(userIdLoginTimes,10);
            userIdLoginTimes++;
        } else{
            userIdLoginTimes = 1;
        }
        Cookies.set(event.UID,userIdLoginTimes);
        gigya.accounts.getAccountInfo({callback: getAccountInfoHandler});
    };
    gigya.socialize.showLoginUI(params);

    $("#btnAccept").click(function () {
        window.location.replace("../account");
    });

});