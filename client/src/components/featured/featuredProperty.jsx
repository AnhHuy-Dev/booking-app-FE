import useFetch from "../../hooks/useFetch";
import "./featured.css";

const FeaturedProperty = () => {
	const { data, loading } = useFetch("/hotels?featured=true&limit=4");
	return (
		<div className="fp">
			{loading ? (
				<div className="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			) : (
				data.map((item, index) => {
					return (
						<div className="fpItem" key={index}>
							<img src={item.photos[0]} alt="" className="fpImg" />
							<span className="fpName">{item.name}</span>
							<span className="fpCity">{item.city}</span>
							<span className="fpPrice">Starting from ${item.cheapestPrice}</span>
							<div className="fpRating">
								<button>8.9</button>
								<span>Excellent</span>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default FeaturedProperty;
