import "./searchItem.css";
import { Link } from "react-router-dom";
function SearchItem({ hotel }) {
	return (
		<div className="searchItem">
			<img src={hotel.photos[0]} width="200px" />
			<div className="searchDesc">
				<h1 className="searchTitle">{hotel.name}</h1>
				<span className="searchDistance">{hotel.distance} from center</span>
				<span className="searchTaxiOp">Free airport taxi</span>
				<span className="searchSubtitle">Studio Apartment with Air conditioning</span>
				<span className="searchFeatures">{hotel.desc}</span>
				<span className="searchCancelOp">Free cancellation </span>
				<span className="searchCancelOpSubtitle">You can cancel later, so lock in this great price today!</span>
			</div>
			<div className="searchDetails">
				{hotel.rating && (
					<div className="searchExellent">
						<span>Exellent</span>
						<button>8.9</button>
					</div>
				)}
				<div className="searchDetailsText">
					<span className="searchPrice">${hotel.cheapestPrice}</span>
					<span className="searchFee">Includes taxes and fees</span>
					<Link to={`/hotels/${hotel._id}`}>
						<button>See availability</button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export default SearchItem;
