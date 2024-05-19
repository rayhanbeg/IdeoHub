
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from "../assets/images/carousel1.jpg"
import image2 from "../assets/images/carousel2.jpg"
import image3 from "../assets/images/carousel3.jpg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slider from './Slider';
const Carousel = () => {
    return (
        <div className='container px-6 py-10 mx-auto'>
          <Swiper
            spaceBetween={30}
            
            centeredSlides={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <Slider image={image1} text='Get Your Web Development Project Done in minutes'/>
            </SwiperSlide>
            <SwiperSlide>
              <Slider image={image2} text='Get Your Web Development Project Done in minutes'/>
            </SwiperSlide>
            <SwiperSlide>
              <Slider image={image3} text='Start Your Digital Marketing Compaigns up a Running'/>
            </SwiperSlide>
          </Swiper>
        </div>
      );
};

export default Carousel;