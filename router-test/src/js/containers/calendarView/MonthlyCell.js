import React, { useState, useEffect } from 'react';
import 'sass/app.css';
import { editDate } from 'js/containers/components/UserDataController';
import { useAddFormState } from 'js/stores/addFormState';
import { useErrorState } from 'js/stores/errorState';
import { useUserData } from 'js/stores/userData';
import { useDragAndDrop } from 'js/stores/dragAndDrop';

const MonthlyCell = (props) => {
	const { date, schedule } = props;
	const [ addFormState, setAddFormState ] = useAddFormState();
	const { active } = addFormState;
	const [ errorState, setErrorState ] = useErrorState();
	const [ userData, setUserData ] = useUserData();
	const [ dragAndDrop, setDragAndDrop ] = useDragAndDrop();
	const [ curDateStr, setCurDateStr ] = useState('');

	useEffect(
		() => {
			let newCurDateStr = date.getDate();
			if (schedule.length !== 0) {
				newCurDateStr += ' (' + schedule.length + ')';
			}
			setCurDateStr(newCurDateStr);
		},
		[ schedule ]
	);

	const onClickDate = () => {
		if (!active) {
			const startHour = new Date().getHours();
			setAddFormState({
				...addFormState,
				active: true,
				mode: 'add',
				title: '',
				curDate: date,
				startHour: startHour,
				endHour: startHour + 1
			});
		}
	};

	const onClickSchedule = (e, schedule) => {
		e.stopPropagation();
		const { title, curDate, startHour, endHour } = schedule;

		if (!active) {
			setAddFormState({
				...addFormState,
				active: true,
				mode: 'edit',
				title: title,
				curDate: curDate,
				startHour: startHour,
				endHour: endHour
			});
		}
	};

	const onDropSchedule = (e) => {
		const newSchedule = editDate(dragAndDrop.to, dragAndDrop.from, userData.schedule);

		if (newSchedule !== false) {
			setUserData({ ...userData, schedule: newSchedule });
			setAddFormState({ ...addFormState, active: false });
			setErrorState({
				...errorState,
				active: true,
				mode: 'edit',
				message: [ [ '일정이 수정 되었습니다.' ] ]
			});
		} else {
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [ [ '일정을 수정할 수 없습니다.' ], [ '해당 시간에 이미 다른 일정이 존재합니다.' ] ]
			});
		}
	};

	const onDragCell = (e, schedule) => {
		setDragAndDrop({ ...dragAndDrop, from: schedule });
	};

	const onDragEnterCell = (e) => {
		const { title, startHour, endHour } = dragAndDrop.from;
		const newScheduleForm = { title: title, curDate: date, startHour: startHour, endHour: endHour };
		setDragAndDrop({ ...dragAndDrop, to: newScheduleForm });
	};

	return (
		<div className="monthly-cell" onClick={onClickDate} onDragEnter={onDragEnterCell} onDragEnd={onDropSchedule}>
			<p>{curDateStr}</p>

			{schedule.map((a, i) => (
				<div
					key={i}
					className="monthly-schedule"
					onClick={(e) => onClickSchedule(e, a)}
					draggable
					onDragStart={(e) => onDragCell(e, a)}
				>
					<p>{a.startHour + '시 ~ ' + a.endHour + '시'}</p>
					<p>{a.title}</p>
				</div>
			))}
		</div>
	);
};

export default MonthlyCell;
