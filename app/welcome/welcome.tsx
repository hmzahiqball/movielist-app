import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper';

const features = [
  {
    name: 'Push to deploy.',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'SSL certificates.',
    description:
      'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    icon: LockClosedIcon,
  },
  {
    name: 'Database backups.',
    description:
      'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ServerIcon,
  },
];

export function Welcome() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <div className="hero bg-black min-h-screen relative text-white">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="w-full h-full"
      >
        {features.map((feature, index) => (
          <SwiperSlide key={index}>
            <div
              className="hero-content flex-col lg:flex-row min-h-screen p-8 bg-black bg-opacity-60"
              style={{
                backgroundImage: `url(https://picsum.photos/id/${
                  1020 + index
                }/1600/900)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="max-w-md bg-black bg-opacity-70 p-6 rounded-xl shadow-xl text-white">
                <feature.icon className="h-10 w-10 mb-4 text-primary" />
                <h1 className="text-4xl font-bold">{feature.name}</h1>
                <p className="py-4 text-sm leading-relaxed">
                  {feature.description}
                </p>
                <button className="btn btn-primary">Get Started</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-4">
        <button
          className="btn btn-circle btn-outline"
          onClick={() => swiperInstance?.slidePrev()}
        >
          &#x2039;
        </button>
        <button
          className="btn btn-circle btn-outline"
          onClick={() => swiperInstance?.slideNext()}
        >
          &#x203A;
        </button>
      </div>
    </div>
  );
}
