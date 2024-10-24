import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import img1 from '../../assets/img11.jpg'
import img2 from '../../assets/img12.jpg'
import img3 from '../../assets/img13.jpg'
import img4 from '../../assets/img14.jpg'
import img5 from '../../assets/img15.jpg'
import img6 from '../../assets/img16.jpg'
import img7 from '../../assets/img17.jpg'
const Slider = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper"
            >
                <SwiperSlide><img src={img1} alt="" className='min-h-[56vh]'/></SwiperSlide>
                <SwiperSlide><img src={img2} alt="" className='min-h-[56vh]'/></SwiperSlide>
                <SwiperSlide><img src={img3} alt="" className='min-h-[56vh]'/></SwiperSlide>
                <SwiperSlide><img src={img4} alt="" className='min-h-[56vh]'/></SwiperSlide>
                <SwiperSlide><img src={img5} alt="" className='min-h-[56vh]'/></SwiperSlide>
                <SwiperSlide><img src={img6} alt="" className='min-h-[56vh]'/></SwiperSlide>
                <SwiperSlide><img src={img7} alt="" className='min-h-[56vh]'/></SwiperSlide>
                
                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </>
    )
}

export default Slider