import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Header from './components/header/Header.jsx';
import Calendar from './components/calendar/Calendar.jsx';
import { getWeekStartDate, generateWeekRange } from '../src/utils/dateUtils.js';

import './common.scss';

const App = () => {
  const date = new Date();
  const [weekDates, setWeekDates] = useState(generateWeekRange(getWeekStartDate(date)));
  const [monthText, setMonthText] = useState('');
  const [isModal, setIsModal] = useState(false);

  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const handleLeft = () => {
    const nextWeekFirstDay = moment(weekDates[0]).subtract(7, 'day').toDate();
    setWeekDates(generateWeekRange(nextWeekFirstDay));
  };

  const handleRight = () => {
    const nextWeekFirstDay = moment(weekDates[6]).add(1, 'day').toDate();
    setWeekDates(generateWeekRange(nextWeekFirstDay));
  };
  const handleTodayBtn = () => {
    setWeekDates(generateWeekRange(getWeekStartDate(date)));
  };

  useEffect(() => {
    const firstDayMonth = moment(weekDates[0]).format('MMMM');
    const lastDayMonth = moment(weekDates[6]).format('MMMM');
    const toSet =
      firstDayMonth === lastDayMonth ? firstDayMonth : `${firstDayMonth} - ${lastDayMonth}`;
    setMonthText(toSet);
  }, [weekDates]);

  return (
    <>
      <Header
        onToday={handleTodayBtn}
        onLeft={handleLeft}
        onRight={handleRight}
        month={monthText}
        onEventCreate={toggleModal}
      />

      <Calendar weekDates={weekDates} toggleModal={toggleModal} isModal={isModal} />
    </>
  );
};

export default App;
