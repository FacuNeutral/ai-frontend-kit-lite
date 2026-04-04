//* @type Molecule
//* @context Videos
//* @utility Card de preview de video con dos variantes de layout: grid y list.

import { Link } from "react-router-dom";
import type { Video } from "@/entities/video.entity";

interface VideoCardProps {
  video: Video;
  layout?: "grid" | "list";
}

export default function VideoCard({ video, layout = "grid" }: VideoCardProps) {
  if (layout === "list") {
    return (
      <Link to={`/watch/${video.id}`} className="flex gap-3 group">
        {/* <Tag> Media — thumbnail */}
        <div className="relative w-40 md:w-44 shrink-0 aspect-video rounded-lg overflow-hidden bg-neutral dark:bg-neutral-surface-dark">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
          <span className="absolute bottom-1 right-1 bg-neutral/80 dark:bg-neutral-dark/80 text-neutral-dark dark:text-neutral text-xs px-1 rounded font-medium">
            {video.duration}
          </span>
        </div>
        {/* <Tag> Metadata */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-neutral-dark dark:text-neutral line-clamp-2 leading-5">{video.title}</h3>
          <p className="text-xs text-neutral-off-dark dark:text-neutral-off mt-1">{video.channel}</p>
          <p className="text-xs text-neutral-off-dark dark:text-neutral-off">
            {video.views} · {video.timestamp}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/watch/${video.id}`} className="group flex flex-col gap-2">
      {/* <Tag> Media — thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral dark:bg-neutral-surface-dark">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 bg-neutral/80 dark:bg-neutral-dark/80 text-neutral-dark dark:text-neutral text-xs px-1.5 py-0.5 rounded font-medium">
          {video.duration}
        </span>
      </div>
      {/* <Tag> Metadata — avatar, título, canal */}
      <div className="flex gap-3">
        <img
          src={video.channelAvatar}
          alt={video.channel}
          className="w-9 h-9 rounded-full shrink-0 mt-0.5"
        />
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-neutral-dark dark:text-neutral line-clamp-2 leading-5">
            {video.title}
          </h3>
          <p className="text-xs text-neutral-off-dark dark:text-neutral-off mt-1 hover:text-neutral-dark dark:hover:text-neutral transition-colors">
            {video.channel}
          </p>
          <p className="text-xs text-neutral-off-dark dark:text-neutral-off">
            {video.views} · {video.timestamp}
          </p>
        </div>
      </div>
    </Link>
  );
}
