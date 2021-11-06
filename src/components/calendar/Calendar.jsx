import React, { useState, useEffect } from 'react';

import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';
import { fetchEventsList, createEvent, deleteEvent } from '../../gateway/gateWay';
import Modal from '../modal/Modal';

import './calendar.scss';

const Calendar = ({ weekDates, isModal, toggleModal }) => {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    fetchEventsList().then(eventsList => {
      setEvents(eventsList);
    });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = newEvent => {
    createEvent(newEvent).then(() => fetchEvents());

    toggleModal();
  };

  const hangleDeleteEvent = id => {
    deleteEvent(id).then(() => fetchEvents());
  };

  return (
    <>
      {isModal && <Modal toggleModal={toggleModal} handleAddEvent={handleAddEvent} />}
      <section className="calendar">
        <Navigation weekDates={weekDates} />
        <div className="calendar__body">
          <div className="calendar__week-container">
            <Sidebar key={Math.random()} />
            <Week
              hangleDeleteEvent={hangleDeleteEvent}
              weekDates={weekDates}
              events={events}
              isModal={isModal}
              toggleModal={toggleModal}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Calendar;
