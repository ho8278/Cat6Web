export const yieldSecond = async (time) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, time);
	});
};
