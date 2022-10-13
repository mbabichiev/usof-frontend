module.exports = function sortPosts(posts, sortingType) {

    if(sortingType === "popular") {
        return [...posts].sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes))
    }
    else if(sortingType === "newest") {
        return [...posts].sort((a, b) => b.publish_date - a.publish_date)
    }
    else if(sortingType === "oldest") {
        return [...posts].sort((a, b) => a.publish_date - b.publish_date)
    }
}