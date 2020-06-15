exports.checkUsername = (username) => {
    if (username.length <= 0) {
        return "Please enter a username";
    } else if (/\s/.test(username)) {
        return "Username can not include spaces";
    } else if (!/^[a-z0-9]+$/i.test(username)) {
        return "Username can not include special characters";
    } else if (username.length > 45) {
        return "Username can not exceed 45 characters";
    } else {
        return "";
    }
};

exports.checkEmail = (email) => {
    if (email.length <= 0) {
        return "Please enter an email";
    } else if (/\s/.test(email)) {
        return "Email can not include spaces";
    } else if (email.length > 255) {
        return "Email can not exceed 255 characters";
    } else if (email.includes(":")) {
        return "Email can not include ':'";
    } else if (!email.includes("@")) {
        return "Email must include '@'";
    } else {
        return "";
    }
};

exports.checkUserId = (userId) => {
    if (userId.length <= 0) {
        return "Please enter an email or username";
    } else if (/\s/.test(userId)) {
        return "Email or username can not include spaces";
    } else if (userId.length > 255) {
        return "Email or username can not exceed 255 characters";
    } else if (userId.includes(":")) {
        return "Email or username can not include ':'";
    } else {
        return "";
    }
};

exports.checkPassword = (password) => {
    if (password.length < 6) {
        return "Password must be more than 6 characters";
    } else if (password.includes(":")) {
        return "Password can not include ':'";
    } else {
        return "";
    }
};

exports.checkCode = (code) => {
    if (code.length != 8) {
        return "Code must be 8 characters";
    } else {
        return "";
    }
};