import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { format } from 'date-fns';

interface ReviewCardProps {
  author: string;
  rating: number | null;
  content: string;
  created_at: string;
  url: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ author, rating, content, created_at, url }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const getAvatarUrl = () => {
    const seeds = [
      'Aiden', 'Caleb', 'Robert', 'Sara', 'Mason', 'Leo', 'Luis', 'Brian',
      'Brooklyn', 'Wyatt', 'Emery', 'Sarah', 'Jessica', 'Christian', 'Aidan',
      'George', 'Eliza', 'Kimberly', 'Jack', 'Jade'
    ];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${randomSeed}`;
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-md mb-6 border border-zinc-900">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <img
            src={getAvatarUrl()}
            alt={author}
            className="w-10 h-10 rounded-full object-cover bg-gray-800"
          />
          <div>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <h3 className="font-semibold text-white">{author}</h3>
            </a>
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
