import React, { useState, useEffect } from 'react';

export const errorState = {
	state: { active: false, mode: null, message: [] },
	setState(errorState) {
		this.state = errorState;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
errorState.setState = errorState.setState.bind(errorState);

// this is the custom hook we'll call on components.
export function useErrorState() {
	const [ state, set ] = useState(errorState.state);
	if (!errorState.setters.includes(set)) {
		errorState.setters.push(set);
	}
	useEffect(
		() => () => {
			errorState.setters = errorState.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, errorState.setState ];
}
