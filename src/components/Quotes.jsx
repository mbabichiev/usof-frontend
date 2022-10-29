import React from "react";


const Quotes = () => {

    const quotes = [
        {
            author: "Stephen King",
            content: "Life is like a wheel. Sooner or later, it always come around to where you started again."
        },
        {
            author: "Ayn Rand",
            content: "A creative man is motivated by the desire to achieve, not by the desire to beat others."
        },
        {   
            author: "Dean Koontz",
            content: "If something in your writing gives support to people in their lives, that's more than just entertainment-which is what we writers all struggle to do, to touch people."
        },
        {   
            author: "J.K. Rowling",
            content: "It is impossible to live without failing at something, unless you live so cautiously that you might as well not have lived at all — in which case, you fail by default."
        }
    ]

    return (
        <div>
            {quotes.map(quote => 
                <div style={{fontSize: "20px"}} className="border py-3 px-3">
                    <i>“{quote.content}”

                        <div className="py-2">
                            <div className="nav justify-content-end">
                                {quote.author}
                            </div>
                        </div>
                    </i>
                </div>    
            )}

        </div>
    )

}

export default Quotes;