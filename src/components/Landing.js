import React from 'react';
import Menu from './Menu';
import TicketHorizontal from './TicketHorizontal';
import TicketVertical from './TicketVertical';

const Landing = () => {

    return (
        <div className="pageContent" id="landing">
            <Menu />
            <section className="landingBody">
                <h1>Ready to get out of town?</h1>
                <button className="buttonMain">Let's Go</button>
            </section>
        </div>
    );
};

export default Landing;