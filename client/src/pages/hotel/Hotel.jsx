import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Email from "../../components/email/Email";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleXmark, faCircleArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../contexts/SearchContextProvider";
import Reserve from "../../components/reserve/Reserve";
function Hotel() {
	const { searchState } = useContext(SearchContext);
	const { destination, dates, options } = searchState;
	let { id } = useParams();
	const { data, loading } = useFetch(`/hotels/find/${id}`);
	const [slideNumber, setSlideNumber] = useState(0);
	const [openSlide, setOpenSlide] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const handleOpen = (i) => {
		setSlideNumber(i);
		setOpenSlide(true);
	};
	console.log(id);
	const handleDirection = (direction) => {
		let newSliderNumber;
		if (direction === "l") newSliderNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
		else newSliderNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
		setSlideNumber(newSliderNumber);
	};

	const dayDifferent = (date1, date2) => {
		const diffTime = Math.abs(date2 - date1);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays;
	};
	const days = dayDifferent(dates[0].startDate, dates[0].endDate);
	const photos = data.photos || [];
	console.log(photos.length);
	return (
		<>
			<Navbar />
			<Header type="list" />
			{loading ? (
				<div className="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			) : (
				<div className="hotelContainer">
					{openSlide && (
						<div className="slider-hotel">
							<FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpenSlide(false)} />
							<FontAwesomeIcon onClick={() => handleDirection("l")} icon={faCircleArrowLeft} className="arrow" />
							<div className="sliderWrapper">
								<img src={photos[slideNumber]} alt="" className="sliderImg" />
							</div>
							<FontAwesomeIcon onClick={() => handleDirection("r")} icon={faCircleArrowRight} className="arrow" />
						</div>
					)}
					<div className="hotelWrapper">
						<button className="bookNow" onClick={() => setOpenModal(true)}>
							Reserve or Book Now!
						</button>
						<h1 className="hotelTitle">{data.name}</h1>
						<div className="hotelAddress">
							<FontAwesomeIcon icon={faLocationDot} />
							<span>{data.address}</span>
						</div>
						<span className="hotelDistance">Excellent location - {data.distance} from center</span>
						<span className="hotelPriceHighlight">Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
						<div className="hotelImages">
							{photos.map((photo, i) => (
								<div className="hotelImgWrapper" key={i}>
									<img onClick={() => handleOpen(i)} src={photo} alt="" className="hotelImg" />
								</div>
							))}
						</div>
						<div className="hotelDetails">
							<div className="hotelDetailsTexts">
								<h1 className="hotelTitle">{data.title}</h1>
								<p className="hotelDesc">{data.desc}</p>
							</div>
							<div className="hotelDetailsPrice">
								<h1>Perfect for a {days === 0 ? 1 : days}-night stay!</h1>
								<span>Located in the real heart of Krakow, this property has an excellent location score of 9.8!</span>
								<h2>
									<b>${(days === 0 ? 1 : days) * options.room * data.cheapestPrice}</b> ({days === 0 ? 1 : days} nights)
								</h2>
								<button onClick={() => setOpenModal(true)}>Reserve or Book Now!</button>
							</div>
						</div>
					</div>
				</div>
			)}
			{openModal && <Reserve setOpenModal={setOpenModal} hotelId={id} />}
			<Email />
			<Footer />
		</>
	);
}

export default Hotel;
