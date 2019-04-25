import React, { useState, useEffect } from 'react';

export const calendarState = {
	state: { mode: 'monthly', date: new Date() },
	setState(calendarState) {
		this.state = calendarState;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
calendarState.setState = calendarState.setState.bind(calendarState);

// this is the custom hook we'll call on components.
export function useCalendarState() {
	const [ state, set ] = useState(calendarState.state);
	if (!calendarState.setters.includes(set)) {
		calendarState.setters.push(set);
	}
	useEffect(
		() => () => {
			calendarState.setters = calendarState.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, calendarState.setState ];
}
