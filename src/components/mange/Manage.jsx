import React from "react";
import "./Manage.css";

const Manage = () => {
  
  return (
    <div className="manage container">
      <div className="different-manage">
        <h2>Whats different about Manage?</h2>
        <p>
          Manage provides all the functional your team needs, without the
          complexity.Our software is tailor-made for modern digital product
          teams.
        </p>
      </div>
      <div className="qualities">
        {Data.map((item,i)=>{
          return(
          <div className="quality">
            <div className="number">{item.number}</div>
            <div className="quality-detail">
              <h3>{item.heading}</h3>
              <p>
                {item.text}
              </p>
            </div>          
        </div>

          )
        })}
        
      </div>
    </div>
  );
};

export default Manage;
