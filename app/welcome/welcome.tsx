import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper';
import { MovieSection } from '../components/welcome/movieSection';

export function Welcome() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const dummyMovies = [
    { title: "Lilo & Stitch", poster: "https://image.tmdb.org/t/p/original/A89x10Eqt43bPFEWPpbraWwkaFr.jpg", bgimage: "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg" },
    { title: "Lilo & Stitch", poster: "https://image.tmdb.org/t/p/original/A89x10Eqt43bPFEWPpbraWwkaFr.jpg", bgimage: "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg" },
    { title: "Lilo & Stitch", poster: "https://image.tmdb.org/t/p/original/A89x10Eqt43bPFEWPpbraWwkaFr.jpg", bgimage: "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg" },
    { title: "Lilo & Stitch", poster: "https://image.tmdb.org/t/p/original/A89x10Eqt43bPFEWPpbraWwkaFr.jpg", bgimage: "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg" },
    { title: "Lilo & Stitch", poster: "https://image.tmdb.org/t/p/original/A89x10Eqt43bPFEWPpbraWwkaFr.jpg", bgimage: "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg" },
    { title: "Lilo & Stitch", poster: "https://image.tmdb.org/t/p/original/A89x10Eqt43bPFEWPpbraWwkaFr.jpg", bgimage: "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg" },
    { title: "Lilo & Stitch", poster: "https://image.tmdb.org/t/p/original/A89x10Eqt43bPFEWPpbraWwkaFr.jpg", bgimage: "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg" },
    { title: "Lilo & Stitch", poster: "https://image.tmdb.org/t/p/original/A89x10Eqt43bPFEWPpbraWwkaFr.jpg", bgimage: "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg" },
    { title: "Lilo & Stitch", poster: "https://image.tmdb.org/t/p/original/A89x10Eqt43bPFEWPpbraWwkaFr.jpg", bgimage: "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg" },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[100vh] w-full">
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
          <SwiperSlide>
            <div className="relative min-h-screen flex items-center justify-center text-white">
              <div
                className="absolute inset-0 bg-cover bg-center brightness-[0.4]"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg)`,
                  zIndex: -1,
                }}
              ></div>
              <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 z-10">
                <div className="w-60 md:w-72 lg:w-80 flex-shrink-0">
                  <img
                    src="https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"
                    alt="Poster"
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>
                <div className="max-w-xl">
                  <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
                    The Shawshank Redemption
                  </h1>
                  <p className="text-lg mb-8 text-gray-300">
                    Imprisoned in the 1940s for the double murder of his wife and her lover...
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
        </Swiper>
      </div>

      {/* Movie Sections */}
      <div className="px-12 py-12 relative overflow-visible">
        <MovieSection title="Trending movies" items={dummyMovies} />
        <MovieSection title="Top rated movies" items={dummyMovies} />
        <MovieSection title="Trending series" items={dummyMovies} />
      </div>
    </div>
  );
}