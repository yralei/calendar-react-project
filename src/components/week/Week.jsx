import React from 'react';
import Day from '../day/Day';

import './week.scss';

const Week = ({ weekDates, events, toggleModal, hangleDeleteEvent }) => {
  return (
    <div className="calendar__week">
      {weekDates.map(dayStart => {
        const dayEnd = new Date(dayStart.getTime()).setHours(dayStart.getHours() + 24);

        //getting all events from the day we will render
        const dayEvents = events.filter(
          event => event.dateFrom > dayStart && event.dateTo < dayEnd,
        );
        const isCurrentDay = dayStart.getDate() === new Date().getDate();
        return (
          <Day
            isCurrentDay={isCurrentDay}
            hangleDeleteEvent={hangleDeleteEvent}
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            toggleModal={toggleModal}
          />
        );
      })}
    </div>
  );
};

export default Week;
