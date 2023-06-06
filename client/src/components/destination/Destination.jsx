import "./destination.css";
import useFetch from "../../hooks/useFetch";
function Destination() {
	const { data, loading } = useFetch(`/hotels/countByCity?cities=Australia,America,London`);
	return (
		<div className="destination">
			{loading ? (
				<div className="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			) : (
				<div className="destination-first mt-24">
					<div className="destination-item">
						<img
							className="destination-img"
							src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
							alt=""
						/>
						<p>Australia</p>
						<span>{data[0]} properties</span>
					</div>
					<div className="destination-item">
						<img
							className="destination-img"
							src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
							alt=""
						/>
						<p>America</p>
						<span>{data[1]} properties</span>
					</div>
					<div className="destination-item">
						<img
							className="destination-img"
							src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
							alt=""
						/>
						<p>London</p>
						<span>{data[2]} properties</span>
					</div>
				</div>
			)}
		</div>
	);
}

export default Destination;
