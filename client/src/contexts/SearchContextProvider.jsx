import { createContext, useReducer } from "react";
import { searchReducer } from "../reducers/searchReducer";

export const SearchContext = createContext();

function SearchContextProvider({ children }) {
	const [searchState, dispatch] = useReducer(searchReducer, {
		destination: undefined,
		dates: [],
		options: {
			adult: undefined,
			children: undefined,
			room: undefined,
		},
	});

	const contextData = { searchState, dispatch };
	return <SearchContext.Provider value={contextData}>{children}</SearchContext.Provider>;
}

export default SearchContextProvider;
