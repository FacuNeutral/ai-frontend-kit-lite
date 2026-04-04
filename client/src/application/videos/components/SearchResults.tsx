//* @type Organism
//* @context Videos
//* @utility Muestra los resultados de búsqueda en formato lista con estado vacío.

import type { Video } from "@/entities/video.entity";
import VideoCard from "@/components/core/VideoCard";

interface SearchResultsProps {
  query: string;
  results: Video[];
}

export default function SearchResults({ query, results }: SearchResultsProps) {
  return (
    <div className="pb-8">
      {/* <Tag> Header — título de búsqueda */}
      <h2 className="text-lg font-medium text-neutral-dark dark:text-neutral mb-4">
        Resultados para: <span className="text-neutral-off-dark dark:text-neutral-off">"{query}"</span>
      </h2>
      {/* <Tag> List | Empty State */}
      {results.length === 0 ? (
        <p className="text-neutral-off-dark dark:text-neutral-off text-center mt-20">No se encontraron resultados</p>
      ) : (
        <div className="space-y-4 max-w-3xl">
          {results.map((v) => (
            <VideoCard key={v.id} video={v} layout="list" />
          ))}
        </div>
      )}
    </div>
  );
}
