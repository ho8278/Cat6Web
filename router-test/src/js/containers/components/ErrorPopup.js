import React, { useState, useEffect } from 'react';
import 'sass/app.css';
// store
import { useErrorState } from 'js/stores/errorState';
// components
import { yieldSecond } from 'js/containers/components/yieldSecond';

const ErrorPopup = () => {
	const [ errorState, setErrorState ] = useErrorState();
	const { active, mode, message } = errorState;

	useEffect(
		() => {
			if (active) {
				(async () => {
					await yieldSecond(2000);
					setErrorState({ ...errorState, active: false });
				})();
			}
		},
		[ active ]
	);
	useEffect(() => {}, [ mode ]);

	if (!active) return null;
	if (active)
		return (
			<div id="error-panel">
				<div id="error-popup" className={mode}>
					{message.map((a, i) => (
						<div key={i} className="error-message">
							{a}
						</div>
					))}
				</div>
			</div>
		);
};

export default ErrorPopup;
