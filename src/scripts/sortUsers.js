module.exports = function sortUsers(users) {
    return [...users].sort((a, b) => (b.rating - a.rating))
}