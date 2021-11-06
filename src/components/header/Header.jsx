import React from 'react';

import './header.scss';

const Header = ({ onLeft, onRight, month, onToday, onEventCreate }) => {
  return (
    <header className="header">
      <button className="button create-event-btn" onClick={onEventCreate}>
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button className="navigation__today-btn button" onClick={onToday}>
          Today
        </button>
        <button className="icon-button navigation__nav-icon" onClick={onLeft}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="icon-button navigation__nav-icon" onClick={onRight}>
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{month}</span>
      </div>
    </header>
  );
};

export default Header;
