import React from "react";
import { Icon } from 'react-icons-kit'
import {ic_check_circle} from 'react-icons-kit/md/ic_check_circle'

const Confirmation = () => {
  return (
    <div className="pageContent" id="landing">
      <section className="landingBody">
          <Icon className="confirmationIcon" size={70} icon={ic_check_circle} />
        <h1 className="confirmationHeader">Safe Travels.</h1>
        <p className="inputInstructions">
          You will be automatically redirected to your booking.
        </p>
      </section>
    </div>
  );
};

export default Confirmation;
