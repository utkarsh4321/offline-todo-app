import React, { useEffect, useState } from 'react';

function Timing() {
  const [dateText, setDateText] = useState('');
  const [timeText, setTimeText] = useState('');

  const calcDate = () => {
    const date = new Date();

    const dateText = date
      .toLocaleString('default', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
      })
      .replace(',', '');
    setDateText(dateText);
  };
  const calcTime = () => {
    const date = new Date();
    const timeText = date.toLocaleString('default', {
      hour: '2-digit',
      hour12: true,
      minute: '2-digit',
    });
    setTimeText(timeText);
  };
  useEffect(() => {
    if (!dateText || !timeText) {
      calcTime();
      calcDate();
    }
    const dateInterval = setInterval(() => {
      calcDate();
    }, 1000 * 60 * 60 * 24);
    const timeInterval = setInterval(() => {
      calcTime();
    }, 1000);
    return () => {
      clearInterval(dateInterval);
      clearInterval(timeInterval);
    };
  }, []);
  return (
    <div
      className="md:text-2xl dark:text-gray-400"
      tabIndex={0}
      aria-label="Current date and time"
    >
      <div className="inline">Today</div>
      <div className="sm:text-7xl text-5xl font-extrabold dark:text-darkSecondary">
        <span>{dateText}</span>
        {/* <span className="mr-3">Wed</span>
        <span className="mr-3">2</span>
        <span>Dec</span> */}
      </div>
      <div className="text-center">
        <span tabIndex={0} aria-label="current time">
          {timeText}
        </span>
      </div>
    </div>
  );
}

export default Timing;
