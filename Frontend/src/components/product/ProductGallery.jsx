import { useState } from "react"
import { Play } from "lucide-react"

function getYoutubeId(url) {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export default function ProductGallery({ media = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeMedia = media[activeIndex] || {
    type: "image",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800",
  }

  const getThumbnailUrl = (item) => {
    if (item.type === "image") return item.url
    if (item.type === "youtube") {
      const id = getYoutubeId(item.url)
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ""
    }
    return ""
  }

  const handleMediaClick = (item) => {
    if (item.type === "youtube") {
      window.open(item.url, "_blank")
    }
  }

  const activeYoutubeId = activeMedia.type === "youtube" ? getYoutubeId(activeMedia.url) : null
  const activeMainUrl = activeYoutubeId
    ? `https://img.youtube.com/vi/${activeYoutubeId}/maxresdefault.jpg`
    : activeMedia.url

  return (
    <div className="space-y-4">
      {/* Main Viewport */}
      <div
        onClick={() => handleMediaClick(activeMedia)}
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm group ${
          activeMedia.type === "youtube" ? "cursor-pointer" : "cursor-default"
        }`}
      >
        <img
          src={activeMainUrl}
          alt="Product Preview"
          onError={(e) => {
            if (activeYoutubeId && e.target.src.includes("maxresdefault")) {
              e.target.src = `https://img.youtube.com/vi/${activeYoutubeId}/hqdefault.jpg`
            }
          }}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-101"
        />

        {/* YouTube Play Icon and Hover Overlay */}
        {activeMedia.type === "youtube" && (
          <>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-250 flex items-center justify-center" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-warning flex items-center justify-center text-warning-foreground shadow-lg group-hover:scale-105 active:scale-95 transition-transform duration-200">
                <Play className="h-6 w-6 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-100 bg-black/40 px-2 py-0.5 rounded border border-white/5 backdrop-blur-xs">
                Klik untuk menonton di YouTube
              </span>
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Row */}
      {media.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {media.map((item, index) => {
            const isActive = index === activeIndex
            const isYoutube = item.type === "youtube"
            const thumbUrl = getThumbnailUrl(item)

            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative w-20 sm:w-24 aspect-[4/3] rounded-lg border overflow-hidden shrink-0 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-accent ring-2 ring-accent/20"
                    : "border-border hover:border-border/80"
                }`}
              >
                <img
                  src={thumbUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {isYoutube && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="h-4.5 w-4.5 text-white fill-current" />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
