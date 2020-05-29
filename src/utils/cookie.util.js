exports.getCookie = (cookieName) => {
    var name = cookieName + "=";
    var cookieArray = document.cookie.split(";");

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
    if (cookie.length != "") {
        return true;
    }

    return false;
};

exports.deleteCookie = (cookieName) => {
    if (this.cookieExists(cookieName)) {
        document.cookie = cookieName
            + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    }
}