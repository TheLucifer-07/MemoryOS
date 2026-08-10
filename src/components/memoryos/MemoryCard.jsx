import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';

export default function MemoryCard({ memory, onClick }) {
  const { title, date, location, people, story, tags, image, collection } = memory;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-3xl border border-border/80 bg-[#FEFCF8] text-left shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-border-hover hover:shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary overflow-hidden"
    >
      {/* Media area */}
      {image ? (
        <div className="h-44 w-full overflow-hidden bg-border/30">
          <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
          <span className="font-display text-4xl font-extrabold text-primary-200 select-none">
            {title?.[0] ?? '?'}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-base font-bold leading-snug text-heading line-clamp-2">
          {title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-muted">
          {date && (
            <span className="flex items-center gap-1">
              <Calendar size={11} strokeWidth={2} />
              {date}
            </span>
          )}
          {location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} strokeWidth={2} />
              {location}
            </span>
          )}
          {people?.length > 0 && (
            <span className="flex items-center gap-1">
              <Users size={11} strokeWidth={2} />
              {people.join(', ')}
            </span>
          )}
        </div>

        {story && (
          <p className="mt-3 text-sm leading-6 text-text line-clamp-2">{story}</p>
        )}

        {tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-pill border border-border/70 bg-background px-2.5 py-0.5 text-[11px] font-medium text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  );
}
