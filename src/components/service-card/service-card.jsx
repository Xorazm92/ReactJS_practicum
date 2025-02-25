import React from "react";

export const ServiceCard = ({title, number, text})=>{
    return(
        <div>
            <h3>{title}</h3>
            <p>{number}</p>
            <p>{text}</p>
        </div>
    )
}

