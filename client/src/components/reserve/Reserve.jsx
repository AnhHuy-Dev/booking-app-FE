import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContextProvider";
import axios from "axios";
import { apiUrl } from "../../hooks/constant";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { notifyToast } from "../../components/toast/notifyToast";
import { useRef } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

function Reserve({ setOpenModal, hotelId }) {
	const { data, loading } = useFetch(`/hotels/room/${hotelId}`);
	const [selectedRooms, setSelectedRooms] = useState([]);
	const { searchState } = useContext(SearchContext);
	const { authState } = useContext(AuthContext);
	console.log(data);
	const { user } = authState;
	const { dates } = searchState;
	const getDatesInRange = (startDate, endDate) => {
		const start = new Date(startDate);
		const end = new Date(endDate);

		const date = new Date(start.getTime());

		const dates = [];

		while (date <= end) {
			dates.push(new Date(date).getTime());
			date.setDate(date.getDate() + 1);
		}

		return dates;
	};
	const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

	const isAvailable = (roomNumber) => {
		let isFound;
		if (roomNumber.unavailableDates !== undefined) {
			isFound = roomNumber.unavailableDates.some((date) => alldates.includes(new Date(date).getTime()));
		}
		return !isFound ? "true" : "";
	};

	const handleSelect = (e) => {
		const checked = e.target.checked;
		const value = e.target.value;
		setSelectedRooms((prev) => {
			return checked ? [...prev, value] : prev.filter((item) => item !== value);
		});
	};

	const handleClick = async () => {
		if (selectedRooms.length === 0) {
			notifyToast("Please choose room to reserve!", "info");
			return;
		}
		try {
			await Promise.all(
				selectedRooms.map((roomId) => {
					const res = axios.put(`${apiUrl}/rooms/availability/${roomId}`, {
						dates: alldates,
					});
					return res.data;
				})
			);
			setTimeout(() => setOpenModal(false), 1000);
			notifyToast("Reserve successfully!", "success");
		} catch (err) {}
	};

	return (
		<>
			<ToastContainer />
			<div className="reserve">
				<div className="rContainer">
					<h2>Select your rooms</h2>
					<FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpenModal(false)} />
					{loading ? (
						<div className="lds-ring">
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					) : (
						data.map((item) => {
							return (
								<div className="rItem" key={item._id}>
									<div className="rItemInfo">
										<div className="rTitle">{item.title}</div>
										<div className="rDesc">{item.desc}</div>
										<div className="rMax">
											Max people: <b>{item.maxPeople}</b>
										</div>
										<div className="rPrice">{item.price}</div>
									</div>
									<div className="rSelectRooms">
										{item.roomNumbers.map((roomNumber) => (
											<div className="room" key={roomNumber._id}>
												<label>{roomNumber.number}</label>
												<input type="checkbox" value={roomNumber._id} onChange={(e) => handleSelect(e)} disabled={!isAvailable(roomNumber)} />
											</div>
										))}
									</div>
								</div>
							);
						})
					)}
					<button className="rButton" onClick={() => handleClick()}>
						Reserve Now!
					</button>
				</div>
			</div>
		</>
	);
}

export default Reserve;
