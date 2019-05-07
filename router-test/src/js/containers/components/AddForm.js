import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'sass/app.css';
import { insertDate, deleteDate, editDate } from 'js/containers/components/UserDataController';
// store
import { useAddFormState } from 'js/stores/addFormState';
import { useUserData } from 'js/stores/userData';
import { useErrorState } from 'js/stores/errorState';

const AddForm = () => {
	const [ addFormState, setAddFormState ] = useAddFormState();
	const { active, mode } = addFormState;

	const [ hourOptions ] = useState([
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		23,
		24
	]);

	const [ newAddFormState, setNewAddFormState ] = useState({
		title: '',
		curDate: new Date(),
		startHour: 0,
		endHour: 1
	});
	const { title, curDate, startHour, endHour } = newAddFormState;
	const [ userData, setUserData ] = useUserData();
	const { schedule } = userData;
	const [ beforeEdit, setBeforeEdit ] = useState();
	const [ errorState, setErrorState ] = useErrorState();

	useEffect(
		() => {
			if (active) {
				const { title, curDate, startHour, endHour } = addFormState;
				setNewAddFormState({ title, curDate, startHour, endHour });
				if (mode === 'edit') {
					setBeforeEdit({ title, curDate, startHour, endHour });
				}
			}
		},
		[ active ]
	);

	const onChangeCurDate = (value) => {
		setNewAddFormState({ ...newAddFormState, curDate: value });
	};

	const onChangeNewAddFormState = (e) => {
		const { id, value } = e.target;
		switch (id) {
			case 'input-title':
				setNewAddFormState({ ...newAddFormState, title: value });
				break;
			case 'hour-start-select':
				const newStartHour = value * 1;
				const newEndHour = newStartHour < endHour ? endHour : newStartHour + 1;
				setNewAddFormState({ ...newAddFormState, startHour: newStartHour, endHour: newEndHour });
				break;
			case 'hour-end-select':
				setNewAddFormState({ ...newAddFormState, endHour: value * 1 });
				break;
			default:
				break;
		}
	};

	const onClickCancel = () => {
		setAddFormState({ ...addFormState, active: false });
	};

	const onClickAdd = () => {
		if (title === '') return;

		const newSchedule = insertDate(newAddFormState, schedule);
		if (newSchedule !== false) {
			setUserData({ ...userData, schedule: newSchedule });
			setAddFormState({ ...addFormState, active: false });
			setErrorState({
				...errorState,
				active: true,
				mode: 'add',
				message: [ [ '일정이 추가 되었습니다.' ] ]
			});
		} else {
			setErrorState({
				...errorState,
				active: true,
				mode: 'fail',
				message: [ [ '일정을 추가할 수 없습니다.' ], [ '해당 시간에 이미 다른 일정이 존재합니다.' ] ]
			});
		}
	};

	const onClickEdit = () => {
		if (title === '') return;

		const newSchedule = editDate(newAddFormState, beforeEdit, schedule);

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

	const onClickDelete = () => {
		const newSchedule = deleteDate(curDate, startHour, endHour, schedule);
		setUserData({ ...userData, schedule: newSchedule });
		setAddFormState({ ...addFormState, active: false });
		setErrorState({
			...errorState,
			active: true,
			mode: 'delete',
			message: [ [ '일정이 삭제 되었습니다.' ] ]
		});
	};

	if (!active) return null;
	else if (active)
		return (
			<div id="panel">
				<div id="add-form">
					<div id="add-form-title">{mode === 'add' ? '일정 추가' : '일정 수정'}</div>
					<div id="input-form">
						<div className="label">제목</div>
						<input id="input-title" value={title} onChange={onChangeNewAddFormState} />
					</div>
					<div id="date-picker-form">
						<div className="label">날짜</div>
						<div id="date-picker">
							<DatePicker selected={curDate} onChange={onChangeCurDate} />
						</div>
					</div>
					<div id="hour-picker-form">
						<div className="label">시간</div>
						<select id="hour-start-select" value={startHour} onChange={onChangeNewAddFormState}>
							{hourOptions.map(
								(a, i) =>
									i < 24 ? (
										<option key={i} value={a}>
											{a}
										</option>
									) : null
							)}
						</select>
						<div className="label">시 부터</div>
						<select id="hour-end-select" value={endHour} onChange={onChangeNewAddFormState}>
							{hourOptions.map(
								(a, i) =>
									i > startHour ? (
										<option key={i} value={a}>
											{a}
										</option>
									) : null
							)}
						</select>
						<div className="label">시 까지</div>
					</div>
					<div id="option-form">
						<div id="cancel-btn" className="btn" onClick={onClickCancel}>
							취소
						</div>
						{mode === 'add' ? (
							<div id="add-btn" className="btn" onClick={onClickAdd}>
								저장
							</div>
						) : null}
						{mode === 'edit' ? (
							<div id="edit-btn" className="btn" onClick={onClickEdit}>
								수정
							</div>
						) : null}

						{mode === 'edit' ? (
							<div id="delete-btn" className="btn" onClick={onClickDelete}>
								삭제
							</div>
						) : null}
					</div>
				</div>
			</div>
		);
};

export default AddForm;
