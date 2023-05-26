import "./featured.css";
import React, { Component } from "react";
import Slider from "react-slick";
export default class Featured extends Component {
	render() {
		const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 5,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
		};
		return (
			<div className="featured">
				<Slider {...settings} className="slider">
					<div className="featured-item">
						<img src="https://r-xx.bstatic.com/xdata/images/city/170x136/688907.jpg?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&o=" alt="" />
						<h2>Nha Trang</h2>
						<p>1,660 properties</p>
					</div>
					<div className="featured-item">
						<img src="https://q-xx.bstatic.com/xdata/images/city/170x136/688831.jpg?k=7b999c7babe3487598fc4dd89365db2c4778827eac8cb2a47d48505c97959a78&o=" alt="" />
						<h2>Da Lat</h2>
						<p>2,145 properties</p>
					</div>
					<div className="featured-item">
						<img src="https://r-xx.bstatic.com/xdata/images/city/170x136/688907.jpg?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&o=" alt="" />
						<h2>Vung Tau</h2>
						<p>1,829 properties</p>
					</div>
					<div className="featured-item">
						<img src="https://r-xx.bstatic.com/xdata/images/city/170x136/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=" alt="" />
						<h2>Da Nang</h2>
						<p>2,690 properties</p>
					</div>
					<div className="featured-item">
						<img src="https://r-xx.bstatic.com/xdata/images/city/170x136/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=" alt="" />
						<h2>Ho Chi Minh City</h2>
						<p>5,660 properties</p>
					</div>
					<div className="featured-item">
						<img src="https://q-xx.bstatic.com/xdata/images/city/170x136/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o=" alt="" />
						<h2>Ha Noi</h2>
						<p>3,120 properties</p>
					</div>
					<div className="featured-item">
						<img src="https://q-xx.bstatic.com/xdata/images/city/170x136/781588.jpg?k=11df01b67f649ffe1aec4e8697488b97807e94430045132f5f066f2aad58614e&o=" alt="" />
						<h2>Phan Thiet</h2>
						<p>151 properties</p>
					</div>
				</Slider>
			</div>
		);
	}
}
