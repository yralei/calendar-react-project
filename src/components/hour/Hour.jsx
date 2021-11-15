import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Event from '../event/Event';
import { formatMins } from '../../../src/utils/dateUtils.js';
import './hour.scss';

const Hour = ({ dataHour, hourEvents, hangleDeleteEvent, isCurrentDay, toggleModal }) => {
  const [hour, setHour] = useState(new Date().getHours());

  const [minutes, setMinutes] = useState(new Date().getMinutes());

  useEffect(() => {
    if (minutes === 60) {
      setMinutes(0);
      setHour(hour + 1);
    }

    // const intervalId = setInterval(() => {
    //   setMinutes(minutes + 1);
    // }, 60000);

    // return () => {
    //   clearInterval(intervalId);
    // };
  });
  return (
    <div
      className="calendar__time-slot"
      data-time={dataHour + 1}
      onClick={() => {
        if (hourEvents.length === 0) {
          toggleModal();
        }
      }}
    >
      {isCurrentDay && hour === dataHour && (
        <div className="redLine" style={{ top: minutes }}></div>
      )}
      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${dateFrom.getHours()}:${formatMins(dateFrom.getMinutes())}`;
        const eventEnd = `${dateTo.getHours()}:${formatMins(dateTo.getMinutes())}`;

        return (
          <Event
            key={id}
            //calculating event height = duration of event in minutes
            height={(dateTo.getTime() - dateFrom.getTime()) / (1000 * 60)}
            marginTop={dateFrom.getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            isCurrentDay={isCurrentDay}
            hangleDeleteEvent={hangleDeleteEvent}
            id={id}
          />
        );
      })}
    </div>
  );
};

Hour.propTypes = {
  dataHour: PropTypes.number.isRequired,
  hourEvents: PropTypes.array.isRequired,
  hangleDeleteEvent: PropTypes.func.isRequired,
  isCurrentDay: PropTypes.bool.isRequired,
};

export default Hour;
