import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewCardProps {
  author: string;
  rating: number | null;
  content: string;
  created_at: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ author, rating, content, created_at }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className="bg-zinc-900 p-6 rounded-md mb-6 border border-zinc-800">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-600" />
          <div>
            <h3 className="font-semibold text-white">{author}</h3>
            <p className="text-xs text-gray-400">
              {format(new Date(created_at), 'dd MMM yyyy HH:mm:ss')}
            </p>
          </div>
        </div>
        {rating !== null && (
          <div className="flex items-center gap-1 text-yellow-400">
            <Star size={14} className="fill-yellow-400" />
            <span className="text-sm">{rating}</span>
          </div>
        )}
      </div>

      <p className={`text-gray-300 text-sm leading-relaxed ${expanded ? '' : 'line-clamp-4'}`}>
        {content}
      </p>

      {content.length > 300 && (
        <button
          onClick={toggleExpanded}
          className="mt-2 text-blue-400 hover:underline text-sm"
        >
          {expanded ? 'Show Less' : 'Read More'}
        </button>
      )}
    </div>
  );
};
