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
            <div className="relative min-h-screen flex items-center justify-center text-white">
              {/* Background blur image */}
              <div
                className="absolute inset-0 bg-cover bg-center brightness-[0.4]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg)`,
                  zIndex: -1,
                }}
              ></div>

              {/* Kontainer konten */}
              <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 z-10">
                
                {/* Kanan: Poster */}
                <div className="w-60 md:w-72 lg:w-80 flex-shrink-0">
                  <img
                    src="https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"
                    alt="Poster"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>

                {/* Kiri: Judul dan deskripsi */}
                <div className="max-w-xl">
                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                    The Shawshank Redemption
                  </h1>
                  <p className="text-lg mb-8 text-gray-300">
                    Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.
                  </p>
                  <div className="flex gap-4">
                    <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
                      Watch trailer
                    </button>
                    <button className="px-6 py-2 bg-red-600 rounded-full hover:bg-red-700 transition">
                      Watch now
                    </button>
                  </div>
                </div>
              
                
              </div>
            </div>
          </SwiperSlide>

        ))}
      </Swiper>
    </div>
  );
}
