import React, { useState, useEffect } from 'react';

export const userData = {
	state: { schedule: [] },
	setState(userData) {
		this.state = userData;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
userData.setState = userData.setState.bind(userData);

// this is the custom hook we'll call on components.
export function useUserData() {
	const [ state, set ] = useState(userData.state);
	if (!userData.setters.includes(set)) {
		userData.setters.push(set);
	}
	useEffect(
		() => () => {
			userData.setters = userData.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, userData.setState ];
}
