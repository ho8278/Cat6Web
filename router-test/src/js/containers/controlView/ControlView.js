import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import { useCalendarState } from 'js/stores/calendarState';
const ControlView = () => {
	const [ calendarState, setCalendarState ] = useCalendarState();
	const { mode, date } = calendarState;
	const [ curDateStr, setCurDateStr ] = useState('');

	useEffect(
		() => {
			let newCurDate;
			if (mode === 'monthly') {
				newCurDate = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월';
			} else if (mode === 'weekly') {
				let lastDate = parseInt((date.getDate() + (6 - date.getDay())) / 7) + 1;
				newCurDate = date.getFullYear() + '년 ' + (date.getMonth() + 1) + '월 ' + lastDate + '주';
			}
			setCurDateStr(newCurDate);
		},
		[ date, mode ]
	);

	const onClickLeft = () => {
		changeDate(-1);
	};

	const onClickRight = () => {
		changeDate(1);
	};

	const onClickDateView = () => {
		setCalendarState({ ...calendarState, date: new Date() });
	};

	const changeDate = (value) => {
		let newDate;
		if (mode === 'weekly') {
			newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + value * 7);
		} else if (mode === 'monthly') {
			newDate = new Date(date.getFullYear(), date.getMonth() + value, date.getDate());
		}
		setCalendarState({ ...calendarState, date: newDate });
	};

	const onClickModeController = () => {
		const nextMode = mode === 'monthly' ? 'weekly' : 'monthly';
		setCalendarState({ ...calendarState, mode: nextMode });
	};

	return (
		<div id="control-view">
			<div id="week-controller">
				<div className="arrow-btn" onClick={onClickLeft}>
					<img src={require('img/arrow-left.png')} />
				</div>
				<div id="date-view" onClick={onClickDateView}>
					{curDateStr}
				</div>
				<div className="arrow-btn" onClick={onClickRight}>
					<img src={require('img/arrow-right.png')} />
				</div>
			</div>
			<div id="mode-controller">
				<div id="mode-btn" className={mode === 'monthly' ? 'active' : null} onClick={onClickModeController}>
					월
				</div>
				<div id="mode-btn" className={mode === 'weekly' ? 'active' : null} onClick={onClickModeController}>
					주
				</div>
			</div>
		</div>
	);
};

export default ControlView;
