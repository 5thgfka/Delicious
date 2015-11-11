// setup our Delicious credentials, and callback URL to monitor
deliciousOptions = {
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    redirectUri: 'https://www.baidu.com'
};

function auth20() {
	var url = "https://delicious.com/auth/authorize?client_id=" + deliciousOptions.clientId + "&redirect_uri=" + deliciousOptions.redirectUri;
	childWindow = window.open(url, '_blank');

	window.int = self.setInterval(function() {
        var currentURL = childWindow.window.location.href;
        var callbackURL = deliciousOptions.redirectUri;
        var inCallback = currentURL.indexOf(callbackURL);

        // location has changed to our callback url, parse the oauth code
        if (inCallback == 0) {

            // stop the interval from checking for url changes
            window.clearInterval(int)

            // parse the oauth code
            var code = childWindow.window.location.search;
            code = code.split('code=');
            code = code[1];
            window.authCode = code;
            // close the childWindow
            childWindow.close();

            setTimeout(function() {
                // push login screen to get username
                console.log('before push login');
                bb.pushScreen('login.html', 'login');
                console.log('after push login');
            }, 1000);
        }
    }, 1000);
}

function getAccessToken() {

    //var url = 'https://avosapi.delicious.com/api/v1/oauth/token?client_id=' + deliciousOptions.clientId + '&redirect_uri=' + deliciousOptions.redirectUri + '&client_secret=' + deliciousOptions.clientSecret + '&grant_type=credentials&code=' + authCode;
    var url = 'https://avosapi.delicious.com/api/v1/oauth/token?client_id=' + deliciousOptions.clientId + '&redirect_uri=' + deliciousOptions.redirectUri + '&client_secret=' + deliciousOptions.clientSecret + '&grant_type=credentials';
    $.ajax({
        type: 'POST',
        url: url,
        success: function(data) {
            var response = data;

            // parse 'access_token' from the response
            var theAccessToken = response["access_token"];
            window.accessToken = theAccessToken;

            // get authenticated users' info/name
            //alert("theAccessToken: " + theAccessToken);
            getUserInfo();

        },

        error: function(data) {
            alert('Error getting access_token: ' + data.responseText);
            return false;
        }
    });
}

// 获取用户的个人页面
function getUserInfo() {
}

