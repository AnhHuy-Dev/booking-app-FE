import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faCar, faEarthAmericas, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { faUser, faCalendar } from "@fortawesome/free-regular-svg-icons";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { format } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";

function Header({ type }) {
	const navigate = useNavigate();
	const [destination, setDestination] = useState("");
	const [openDate, setOpenDate] = useState(false);
	const [date, setDate] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		},
	]);
	const { startDate, endDate } = date[0];

	const [options, setOptions] = useState({
		adult: 1,
		children: 0,
		room: 1,
	});
	const changeOptions = (name, type) => {
		setOptions((prev) => {
			return {
				...prev,
				[name]: type === "i" ? options[name] + 1 : options[name] - 1,
			};
		});
	};
	const [openOptions, setOpenOptions] = useState(false);

	const handleSearch = () => {
		if (destination === "") alert("Type your destination you want to go!");
		else
			navigate("/hotels", {
				state: { destination, date, options },
			});
	};
	return (
		<div className="header">
			<div className="header-container">
				<div className="header-list">
					<div className="header-list-item active">
						<FontAwesomeIcon icon={faBed} />
						<span>Stays</span>
					</div>
					<div className="header-list-item">
						<FontAwesomeIcon icon={faPlane} />
						<span>Flights</span>
					</div>
					<div className="header-list-item">
						<FontAwesomeIcon icon={faEarthAmericas} />
						<span>Fligh+Hotel</span>
					</div>
					<div className="header-list-item">
						<FontAwesomeIcon icon={faCar} />
						<span>Car rentals</span>
					</div>
					<div className="header-list-item">
						<FontAwesomeIcon icon={faTaxi} />
						<span>Aiport taxi</span>
					</div>
				</div>
				{type !== "list" && (
					<>
						<h1 className="title">Find your next day</h1>
						<p className="description">Search deals on hotels, homes, and much more...</p>
						<div className="header-search">
							<div className="hearder-search-item">
								<FontAwesomeIcon icon={faBed} fontSize="18px" />
								<input type="text" name="destination" value={destination} placeholder="Where are you going ?" onChange={(e) => setDestination(e.target.value)} required />
							</div>
							<div className="hearder-search-item" onClick={() => setOpenDate(!openDate)}>
								<FontAwesomeIcon icon={faCalendar} fontSize="19px" />
								<span>{`${format(startDate, "MM/dd/yyyy")} to ${format(endDate, "MM/dd/yyyy")}`}</span>
							</div>
							{openDate && <DateRange className="date" editableDateInputs={true} onChange={(item) => setDate([item.selection])} moveRangeOnFirstSelection={false} ranges={date} />}
							<div className="hearder-search-item" onClick={() => setOpenOptions(!openOptions)}>
								<FontAwesomeIcon icon={faUser} fontSize="18px" />
								<span>{`${options.adult} adults - ${options.children} children - ${options.room} rooms`}</span>
							</div>
							{openOptions && (
								<div className="options">
									<div className="options-item">
										<span className="options-text">Adults</span>
										<div className="options-counter">
											<button onClick={() => changeOptions("adult", "d")} disabled={options.adult < 2}>
												-
											</button>
											<span>{options.adult}</span>
											<button onClick={() => changeOptions("adult", "i")}>+</button>
										</div>
									</div>
									<div className="options-item">
										<span className="options-text">Children</span>
										<div className="options-counter">
											<button onClick={() => changeOptions("children", "d")} disabled={options.children < 1}>
												-
											</button>
											<span>{options.children}</span>
											<button onClick={() => changeOptions("children", "i")}>+</button>
										</div>
									</div>
									<div className="options-item">
										<span className="options-text">Rooms</span>
										<div className="options-counter">
											<button onClick={() => changeOptions("room", "d")} disabled={options.room < 2}>
												-
											</button>
											<span>{options.room}</span>
											<button onClick={() => changeOptions("room", "i")}>+</button>
										</div>
									</div>
								</div>
							)}
							<div className="hearder-search-item" onClick={() => handleSearch()}>
								<button>Search</button>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Header;
