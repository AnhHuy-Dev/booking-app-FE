import Destination from "../../components/destination/Destination";
import Email from "../../components/email/Email";
import Featured from "../../components/featured/Featured";
import FeaturedProperty from "../../components/featured/featuredProperty";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./home.css";

function Home() {
	return (
		<>
			<Navbar />
			<Header />
			<div className="home-container">
				<h1 className="home-title">Trending destinations</h1>
				<p className="home-desc">Most popular choices for travelers from Vietnam</p>
				<Destination />
				<h1 className="home-title mt-24">Explore VietNam</h1>
				<p className="home-desc">These popular destination have a lot to offer</p>
				<Featured />
				<h1 className="home-title mt-42">Browse by property type</h1>
				<FeaturedProperty />
				<Email />
				<Footer />
			</div>
		</>
	);
}

export default Home;
