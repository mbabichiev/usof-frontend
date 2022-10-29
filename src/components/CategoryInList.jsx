import React, { useState } from "react";

const CategoryInList = (props) => {

    const [byPost, setByPost] = useState(props.byPost)

    let linkStyle = {color:"white"};
    if(byPost) {
        linkStyle = {backgroundColor:"rgb(224, 224, 224)", color:"black"};
    }

    function tapToCategory() {
        if(byPost) {
            setByPost(false);
            props.removeCategory(props.category.id);
        }
        else {
            setByPost(true);
            props.addCategory(props.category.id);
        }
    }

    return (
        <text onClick={tapToCategory} style={linkStyle} className="btn me-2 btn-sm border">{props.category.title}</text>
    )
}

export default CategoryInList;