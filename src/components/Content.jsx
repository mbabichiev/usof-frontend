import React, { useEffect, useState } from "react";


const Content = (props) => {

    const [content, setContent] = useState([]);

    useEffect(() => {
        if(props.content) {
            setContent(props.content.split("\n"));   
        }
    }, [props.content])


    return (
        <div>
            { (content && content.length !== 0) && 
                content.map(part => 
                    <p>{part}</p>
                )
            }
        </div>   
    )
}

export default Content;