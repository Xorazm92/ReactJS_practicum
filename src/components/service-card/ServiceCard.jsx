import React from 'react';
import './service-card.css';

export const ServiceCard = ({ number, title, text }) => {
  return (
    <div className="service-card">
      <div className="service-number">
        <span>{number}</span>
      </div>
      <div className="service-content">
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}; 