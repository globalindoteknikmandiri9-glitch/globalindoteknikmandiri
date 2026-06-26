import { ChevronRightIcon } from "lucide-react"

export default function ArticleDetailSkeleton() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Breadcrumb Skeleton */}
      <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 pt-8 pb-6">
        <nav className="flex items-center gap-2 text-[11px] mb-8 uppercase tracking-wider font-bold">
          <div className="w-16 h-3 bg-muted rounded animate-pulse" />
          <ChevronRightIcon className="h-3 w-3 text-muted-foreground/40" />
          <div className="w-16 h-3 bg-muted rounded animate-pulse" />
          <ChevronRightIcon className="h-3 w-3 text-muted-foreground/40" />
          <div className="w-24 h-3 bg-muted rounded animate-pulse" />
        </nav>
      </div>

      {/* Hero Skeleton */}
      <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 mb-12">
        <div className="w-full aspect-[2/1] bg-muted rounded-2xl animate-pulse mb-8" />
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="w-32 h-6 bg-muted rounded-full animate-pulse mb-6" />
          <div className="w-full max-w-2xl h-12 bg-muted rounded-lg animate-pulse mb-4" />
          <div className="w-3/4 max-w-lg h-12 bg-muted rounded-lg animate-pulse mb-8" />
          <div className="flex items-center justify-center gap-6">
            <div className="w-24 h-4 bg-muted rounded animate-pulse" />
            <div className="w-24 h-4 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8 pb-24">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="w-full h-4 bg-muted rounded animate-pulse" />
          <div className="w-full h-4 bg-muted rounded animate-pulse" />
          <div className="w-11/12 h-4 bg-muted rounded animate-pulse" />
          <div className="w-full h-4 bg-muted rounded animate-pulse" />
          <div className="w-4/5 h-4 bg-muted rounded animate-pulse" />
        </div>
        <div className="space-y-4 max-w-3xl mx-auto mt-8">
          <div className="w-full h-4 bg-muted rounded animate-pulse" />
          <div className="w-10/12 h-4 bg-muted rounded animate-pulse" />
          <div className="w-full h-4 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  )
}
