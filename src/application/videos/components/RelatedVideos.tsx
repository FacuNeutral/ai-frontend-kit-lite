//* @type Molecule
//* @context Videos
//* @utility Lista lateral de videos relacionados al video en reproducción.

import type { Video } from "@/entities/video.entity";
import VideoCard from "@/components/core/VideoCard";

interface RelatedVideosProps {
  videos: Video[];
}

export default function RelatedVideos({ videos }: RelatedVideosProps) {
  return (
    <div className="w-full lg:w-96 shrink-0 space-y-3">
      {videos.map((v) => (
        <VideoCard key={v.id} video={v} layout="list" />
      ))}
    </div>
  );
}
