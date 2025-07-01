import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {
  fetchMovieReviewsById,
  fetchTvReviewsById
} from '../../lib/api';
import { ReviewCard } from "./reviewCard";

interface ReviewUsersProps {
  Id: string;
  Type: string;
}

export function ReviewUsers({ Id, Type }: ReviewUsersProps) {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        let data;
        if (Type === "movies") {
          data = await fetchMovieReviewsById(Id, "1");
        } else if (Type === "series") {
          data = await fetchTvReviewsById(Id, "1");
        }
        setReviews(data);
      } catch (err) {
        console.error("Gagal load rekomendasi film:", err);
      }
    };

    loadMovies();
  }, [Id]);

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
          url={review.url}
        />
      ))}
    </div>
  );
}

