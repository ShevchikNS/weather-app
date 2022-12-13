import React from 'react';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footerItems">
                <div className="items">
                    <div className="nameItem">Давление</div>
                    {/*<div className="characterItem">{pressure}</div>*/}
                </div>
                <div className="items">
                    <div className="nameItem">Скорость ветра</div>
                    {/*<div className="characterItem">{windSpeed}</div>*/}
                </div>
                <div className="items">
                    <div className="nameItem">Направление</div>
                    {/*<div className="characterItem">{windDirection}</div>*/}
                </div>
            </div>
        </div>
    );
};

export default Footer;