import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  fetchMovieReviewsById
} from '../../lib/api';
import { ReviewCard } from "./reviewCard";

interface ReviewUsersProps {
  movieId: string;
}

export function ReviewUsers({ movieId }: ReviewUsersProps) {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovieReviewsById(movieId, "1");
        setReviews(data);
      } catch (err) {
        console.error("Gagal load rekomendasi film:", err);
      }
    };

    loadMovies();
  }, [movieId]);

  if (reviews.length === 0) return null;

  return (
    <div className="mt-2">
      <div className="mb-4">
        <h1 className="text-3xl font-bold relative inline-block text-white">
          Reviews
          <span className="absolute bottom-0 left-0 w-3/4 h-[3px] bg-red-500 rounded-full" />
        </h1>
      </div>
      {reviews.map((review) => (
  <ReviewCard
    key={review.id}
    author={review.author}
    rating={review.author_details.rating}
    content={review.content}
    created_at={review.created_at}
  />
))}
    </div>
  );
}

