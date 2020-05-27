exports.getCookie = (cookieName) => {
    var name = cookieName + "=";
    var cookieArray = document.cookie.split(";");

    console.log("cookieArray: " + cookieArray);

    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == " ") {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }

    return "";
};

exports.cookieExists = (cookieName) => {
    var cookie = this.getCookie(cookieName);

    console.log("cookie: " + cookie);

    if (cookie.length != "") {
        return true;
    }

    return false;
};