import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "./list.css";
import SearchItem from "../../components/search/SearchItem";
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContextProvider";
function List() {
	let location = useLocation();
	const { dispatch } = useContext(SearchContext);
	const [destination, setDestination] = useState(location.state.destination);
	const [openDate, setOpenDate] = useState(false);
	const [date, setDate] = useState(location.state.date);
	const [options, setOptions] = useState(location.state.options);
	const [min, setMin] = useState(undefined);
	const [max, setMax] = useState(undefined);
	const changeOptions = (e) => {
		setOptions((prev) => {
			return {
				...prev,
				[e.target.name]: e.target.value,
			};
		});
	};
	console.log(options);
	const { data, loading, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`);

	const handleSearch = () => {
		dispatch({
			type: "NEW_SEARCH",
			payload: {
				destination,
				dates: date,
				options: options,
			},
		});
		reFetch();
	};
	return (
		<>
			<Navbar />
			<Header type="list" />
			<div className="list-container">
				<div className="list-wrapper">
					<div className="list-search">
						<div className="list-title">Search</div>
						<div className="list-item">
							<label htmlFor="destination">Destination</label>
							<input type="text" id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
						</div>
						<div className="list-item">
							<label>Check-in date</label>
							<span onClick={() => setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} - ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
							{openDate && <DateRange editableDateInputs={true} onChange={(item) => setDate([item.selection])} moveRangeOnFirstSelection={false} ranges={date} />}
						</div>
						<div className="list-item">
							<label>Options</label>
							<div className="options-list">
								<div className="options-list-item">
									<span>
										Min price <small>per night</small>
									</span>
									<input type="number" defaultValue={min || 0} onChange={(e) => setMin(e.target.value)} />
								</div>
								<div className="options-list-item">
									<span>
										Max price <small>per night</small>
									</span>
									<input type="number" defaultValue={max || 1000} onChange={(e) => setMax(e.target.value)} />
								</div>
								<div className="options-list-item">
									<span>Adult</span>
									<input type="number" name="adult" min={1} defaultValue={options.adult} onChange={(e) => changeOptions(e)} />
								</div>
								<div className="options-list-item">
									<span>Children</span>
									<input type="number" name="children" min={0} defaultValue={options.children} onChange={(e) => changeOptions(e)} />
								</div>
								<div className="options-list-item">
									<span>Room</span>
									<input type="number" name="room" min={1} defaultValue={options.room} onChange={(e) => changeOptions(e)} />
								</div>
							</div>
						</div>
						<button className="btn-list-search" onClick={() => handleSearch()}>
							Search
						</button>
					</div>
					<div className="list-result">
						{loading ? (
							<div className="lds-ring">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						) : (
							data.map((item, index) => {
								return <SearchItem hotel={item} key={index} />;
							})
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default List;
