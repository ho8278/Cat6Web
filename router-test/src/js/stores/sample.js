import React, { useState, useEffect } from 'react';

export const sample = {
	state: 0,
	setState(sample) {
		this.state = sample;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
sample.setState = sample.setState.bind(sample);

// this is the custom hook we'll call on components.
export function useSample() {
	const [ state, set ] = useState(sample.state);
	if (!sample.setters.includes(set)) {
		sample.setters.push(set);
	}
	useEffect(
		() => () => {
			sample.setters = sample.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, sample.setState ];
}
