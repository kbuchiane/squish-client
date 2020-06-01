exports.getCookie = (cookieName) => {
    let name = cookieName + "=";
    let cookieArray = document.cookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
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
    let cookie = this.getCookie(cookieName);
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