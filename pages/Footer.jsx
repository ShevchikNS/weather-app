import React from 'react';

const Footer = ({pressure, windSpeed}) => {
    return (
        <div className="footer">
            <div className="footerItems">
                <div className="items">
                    <div className="nameItem">????????</div>
                    <div className="characterItem">{pressure} ??. ??. ??.</div>
                </div>
                <div className="items">
                    <div className="nameItem">???????? ?????</div>
                    <div className="characterItem">{windSpeed} ?/?</div>
                </div>
                {/*<div className="items">*/}
                {/*    <div className="nameItem">???????????</div>*/}
                {/*    <div className="characterItem">{windDirection}</div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Footer;