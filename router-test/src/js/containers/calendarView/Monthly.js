import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import MonthlyCell from './MonthlyCell';
import { getSchedule } from 'js/containers/components/UserDataController';
// store
import { useCalendarState } from 'js/stores/calendarState';
import { useUserData } from 'js/stores/userData';

const Monthly = () => {
	const [ calendarState, setCalendarState ] = useCalendarState();
	const { date } = calendarState;

	const [ days ] = useState([ '일', '월', '화', '수', '목', '금', '토' ]);
	const [ dates, setDates ] = useState([]); // 달력의 행
	const [ userData ] = useUserData();
	const { schedule } = userData; // 유저의 스케쥴
	const [ curSchedule, setCurSchedule ] = useState([]); // 현재 달력 날짜 안에 포함된 스케쥴

	useEffect(
		() => {
			const { firstDate, lastDate } = getFirstAndLastDate();
			setDates(makeCalendar(firstDate, lastDate));
		},
		[ date ]
	);

	useEffect(
		() => {
			const { firstDate, lastDate } = getFirstAndLastDate();
			setCurSchedule(getSchedule(firstDate, lastDate, schedule));
		},
		[ userData ]
	);

	const getFirstAndLastDate = () => {
		const year = date.getFullYear();
		const month = date.getMonth();
		let firstDate = new Date(year, month, 1);
		firstDate = new Date(year, month, -firstDate.getDay() + 1);
		let lastDate = new Date(year, month + 1, 0);
		lastDate = new Date(year, month + 1, 6 - lastDate.getDay());
		return { firstDate: firstDate, lastDate: lastDate };
	};

	const makeCalendar = (firstDate, lastDate) => {
		let tempDate = new Date(firstDate);
		let newDates = [];
		let index = 0;
		while (tempDate.getMonth() !== lastDate.getMonth() || tempDate.getDate() !== lastDate.getDate()) {
			if (index % 7 === 0) newDates[parseInt(index / 7)] = [];
			newDates[parseInt(index / 7)].push(tempDate);
			tempDate = new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + 1);
			index++;
		}
		newDates[parseInt(index / 7)].push(tempDate); // 달력의 시작이 1일이고, 전 달이 30일로 끝나는 날 때문에 따로 배치
		setCurSchedule(getSchedule(firstDate, lastDate, schedule));
		return newDates.slice();
	};

	const getCurDateSchedule = (curDate) => {
		const curDateSchedule = [];
		curSchedule.forEach((date) => {
			if (date.curDate.getTime() - curDate.getTime() === 0) {
				curDateSchedule.push(date);
			}
		});

		return curDateSchedule;
	};

	return (
		<div id="monthly-view">
			<div className="day-row">
				{days.map((a, i) => (
					<div key={i} className="day-cell">
						{a}
					</div>
				))}
			</div>

			{dates.map((a, i) => (
				<div key={i} className="monthly-row">
					{a.map((b, j) => <MonthlyCell key={j} date={b} schedule={getCurDateSchedule(b)} />)}
				</div>
			))}
		</div>
	);
};

export default Monthly;
