import React, { useState, useEffect } from 'react';

export const dragAndDrop = {
	state: { from: null, to: null },
	setState(dragAndDrop) {
		this.state = dragAndDrop;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
dragAndDrop.setState = dragAndDrop.setState.bind(dragAndDrop);

// this is the custom hook we'll call on components.
export function useDragAndDrop() {
	const [ state, set ] = useState(dragAndDrop.state);
	if (!dragAndDrop.setters.includes(set)) {
		dragAndDrop.setters.push(set);
	}
	useEffect(
		() => () => {
			dragAndDrop.setters = dragAndDrop.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, dragAndDrop.setState ];
}
