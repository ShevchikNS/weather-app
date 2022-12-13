import React, {useState} from 'react';
import ReactDOM from "react-dom";

const Header = () => {
    var date = new Date();

    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric',
    };

    return (
        <div className="header">
            <h2 className="MainTitle">Данные метеостанции ОАО "Гродно Азот"</h2>
            <h1 className="SubTitle">{date.toLocaleString("Ru", options)}</h1>
        </div>
    );
};

export default Header;