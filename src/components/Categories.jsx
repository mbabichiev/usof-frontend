import React from "react";
import Category from "./Category";

const Categories = ({categories}) => {

    if(!categories || categories.length === 0) {
        return <>None</>
    }

    return (
        <div>
            Categories: {" "}
            {
                categories.map((category => 
                    <Category category={category} key={category.id}/>    
                ))
            }
        </div>
    )
}

export default Categories;