import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "./list.css";
import SearchItem from "../../components/search/SearchItem";
function List() {
	let location = useLocation();
	const [destination, setDestination] = useState(location.state.destination);
	const [openDate, setOpenDate] = useState(false);
	const [date, setDate] = useState(location.state.date);
	const [options, setOptions] = useState(location.state.options);
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
									<input type="number" />
								</div>
								<div className="options-list-item">
									<span>
										Max price <small>per night</small>
									</span>
									<input type="number" />
								</div>
								<div className="options-list-item">
									<span>Adult</span>
									<input type="number" min={1} value={options.adult} />
								</div>
								<div className="options-list-item">
									<span>Children</span>
									<input type="number" min={0} value={options.children} />
								</div>
								<div className="options-list-item">
									<span>Room</span>
									<input type="number" min={1} value={options.room} />
								</div>
							</div>
						</div>
						<button className="btn-list-search">Search</button>
					</div>
					<div className="list-result">
						<SearchItem />
						<SearchItem />
						<SearchItem />
						<SearchItem />
					</div>
				</div>
			</div>
		</>
	);
}

export default List;
