import banner1 from "../../assets/images/banner/1.jpg"
import banner2 from "../../assets/images/banner/2.jpg"
import banner3 from "../../assets/images/banner/3.jpg"
import banner4 from "../../assets/images/banner/4.jpg"
import Services from "../Services/Services";
import AboutUs from "./AboutUs/AboutUs";


const Home = () => {
    return (
        <div className="relative" > 
           
            <div className="carousel w-full ">
                <div id="slide1" className="carousel-item relative w-full ">
                    <img src={banner1} className="w-full  max-h-[530px]" />
                    <div className="absolute flex gap-3 transform -translate-y-1/2  right-5 top-[90%]">
                        <a href="#slide4" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src={banner2} className="w-full max-h-[530px]" />
                    <div className="absolute flex gap-3 transform -translate-y-1/2  right-5 top-[90%]">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src={banner3} className="w-full max-h-[530px]" />
                    <div className="absolute flex gap-3 transform -translate-y-1/2  right-5 top-[90%]">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <img src={banner4} className="w-full max-h-[530px]" />
                    <div className="absolute flex gap-3 transform -translate-y-1/2  right-5 top-[90%]">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            <div className="w-[460px] h-[580px] absolute top-0 left-3 text-white  bg-gradient-to-r from-[#151515] to-rgba(21, 21, 21, 0) text-4xl " >
                <h1 className="p-[200px]" >Affordable Price For Car Servicing</h1>
            </div>

            <AboutUs></AboutUs>
            <Services></Services>
        </div>
    );
};

export default Home;