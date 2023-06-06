export const searchReducer = (state, action) => {
	const { type, payload } = action;
	switch (type) {
		case "NEW_SEARCH":
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};
