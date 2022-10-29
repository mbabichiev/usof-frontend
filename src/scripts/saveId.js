module.exports = function saveId(id) {
    document.cookie = `id=${id};path=/`;
}