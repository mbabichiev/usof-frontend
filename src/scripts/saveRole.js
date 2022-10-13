module.exports = function saveRole(role) {

    if(role === "admin") {
        document.cookie = "role=admin;path=/";
    }
    else {
        document.cookie = "role=user;path=/";
    }
}