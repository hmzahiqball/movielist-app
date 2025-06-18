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
            <div className="relative min-h-screen flex items-center justify-center">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg)`,
                  filter: 'blur(5px)',
                  zIndex: -1,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
              <div className="container mx-auto px-4 relative">
                <div className="max-w-md mx-auto bg-black bg-opacity-70 p-6 rounded-xl shadow-xl text-white">
                  <feature.icon className="h-10 w-10 mb-4 text-primary" />
                  <h1 className="text-4xl font-bold">{feature.name}</h1>
                  <p className="py-4 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
