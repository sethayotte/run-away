import React from 'react';
import Menu from './Menu';
import TicketHorizontal from './TicketHorizontal';
import TicketVertical from './TicketVertical';

const Booking = () => {

    return (
        <div className="pageContent" id="booking">
            <Menu />
            {(window.innerWidth < 850) ? (
                <TicketVertical />
            ) : (
                <TicketHorizontal />
            )}
        </div>
    );
};

export default Booking;