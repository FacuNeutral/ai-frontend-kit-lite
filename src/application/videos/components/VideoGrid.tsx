//* @type Organism
//* @context Videos
//* @utility Grid responsivo de video cards con estado de carga (skeletons).

import type { Video } from "@/entities/video.entity";
import VideoCard from "@/components/core/VideoCard";
import VideoCardSkeleton from "@/components/core/VideoCardSkeleton";

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
}

export default function VideoGrid({ videos, loading }: VideoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 pt-4 pb-8">
      {loading
        ? Array.from({ length: 12 }).map((_, i) => <VideoCardSkeleton key={i} />)
        : videos.map((v) => <VideoCard key={v.id} video={v} />)}
    </div>
  );
}
