import { Skeleton } from "@/components/ui/skeleton";

export function ServicesSkeleton() {
  return (
    <section className="w-full">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3 lg:px-0">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start gap-6 rounded-xl border border-border-muted bg-white p-6"
          >
            <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />

            <div className="flex flex-1 flex-col">
              <Skeleton className="h-6 w-36" />

              <div className="mt-3 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>

              <Skeleton className="mt-4 h-5 w-24" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}