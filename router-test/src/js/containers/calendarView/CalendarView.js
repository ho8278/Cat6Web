import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import Monthly from './Monthly';
import Weekly from './Weekly';
// store
import { useCalendarState } from 'js/stores/calendarState';
const CalendarView = () => {
	const [ calendarState, setCalendarState ] = useCalendarState();
	const { mode } = calendarState;
	return <div id="calendar-view">{mode === 'monthly' ? <Monthly /> : <Weekly />}</div>;
};

export default CalendarView;
