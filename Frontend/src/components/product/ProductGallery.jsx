import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Play, ChevronLeft, ChevronRight, Search, X } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"

import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import Counter from "yet-another-react-lightbox/plugins/counter"
import "yet-another-react-lightbox/plugins/counter.css"

function getYoutubeId(url) {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

export default function ProductGallery({ media = [] }) {
  const items = media.length > 0 ? media : [{
    type: "image",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800",
  }]

  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [videoModalOpen, setVideoModalOpen] = useState(false)
  const [activeVideoId, setActiveVideoId] = useState(null)
  const [yarlIndex, setYarlIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, active: items.length > 1 })

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(items.length > 1)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap())
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    onSelect() // Init state
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi])

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev()
  const scrollNext = () => emblaApi && emblaApi.scrollNext()
  const scrollTo = (index) => emblaApi && emblaApi.scrollTo(index)

  const showNavButtons = items.length > 1

  useEffect(() => {
    if (!showNavButtons || !emblaApi) return
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        emblaApi.scrollPrev()
      } else if (e.key === "ArrowRight") {
        emblaApi.scrollNext()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [emblaApi, showNavButtons])

  const getThumbnailUrl = (item) => {
    if (item.type === "image") return item.url
    if (item.type === "youtube") {
      const id = getYoutubeId(item.url)
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : ""
    }
    return ""
  }

  // Separate images for YARL to prevent iframe gesture hijacking
  const imageItems = items.map((item, index) => ({ ...item, originalIndex: index })).filter(item => item.type !== "youtube")
  
  const yarlSlides = imageItems.map((item) => ({
    type: "image",
    src: item.url,
  }))

  return (
    <div className="space-y-4">
      {/* Main Viewport Container */}
      <div className="relative group w-full h-[320px] min-h-[320px] lg:h-[500px] lg:min-h-[500px] bg-slate-955 rounded-2xl border border-border shadow-sm overflow-hidden flex items-center justify-center bg-slate-950">
        {/* Media Counter */}
        {items.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider select-none z-10 shadow-md">
            {activeIndex + 1} / {items.length}
          </div>
        )}

        {/* Zoom Icon Hint at bottom-right */}
        {items[activeIndex] && items[activeIndex].type !== "youtube" && (
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 shadow-sm select-none pointer-events-none transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-10">
            <Search className="h-3.5 w-3.5 text-white" />
            <span>Klik untuk memperbesar</span>
          </div>
        )}

        <div
          ref={emblaRef}
          className="h-full w-full overflow-hidden"
        >
          <div className="flex h-full w-full items-center">
            {items.map((item, index) => {
              const isYoutube = item.type === "youtube"
              const youtubeId = isYoutube ? getYoutubeId(item.url) : null
              const mainUrl = youtubeId
                ? `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
                : item.url

              return (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 h-full relative select-none flex items-center justify-center bg-slate-955 bg-slate-955 bg-slate-950 bg-slate-950 bg-slate-950"
                >
                  <div className="w-full h-full flex items-center justify-center relative">
                    <img
                      src={mainUrl}
                      alt={`Product Preview ${index + 1}`}
                      onError={(e) => {
                        if (youtubeId && e.target.src.includes("maxresdefault")) {
                          e.target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                        }
                      }}
                      className={`w-full h-full object-contain select-none transition-transform duration-200 ${
                        isYoutube ? "cursor-pointer" : "cursor-zoom-in"
                      }`}
                      draggable="false"
                      onClick={() => {
                        if (isYoutube) {
                          setActiveVideoId(youtubeId)
                          setVideoModalOpen(true)
                        } else {
                          const idx = imageItems.findIndex(i => i.originalIndex === index)
                          setYarlIndex(idx >= 0 ? idx : 0)
                          setLightboxOpen(true)
                        }
                      }}
                    />

                    {/* YouTube Play Icon and Hover Overlay */}
                    {isYoutube && (
                      <>
                        <div 
                          className="absolute inset-0 bg-black/20 hover:bg-black/35 transition-colors duration-200 flex items-center justify-center cursor-pointer"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            setActiveVideoId(youtubeId);
                            setVideoModalOpen(true); 
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-14 h-14 rounded-full bg-warning flex items-center justify-center text-warning-foreground shadow-lg group-hover:scale-105 active:scale-95 transition-transform duration-200">
                            <Play className="h-6 w-6 fill-current ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-center pointer-events-none">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-100 bg-black/40 px-2 py-0.5 rounded border border-white/5 backdrop-blur-xs">
                            Klik untuk memutar video
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Previous and Next Buttons - Vertically Centered */}
        {showNavButtons && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                scrollPrev()
              }}
              disabled={!canScrollPrev}
              className={`absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl hidden sm:flex items-center justify-center transition-all duration-200 z-10 ${
                !canScrollPrev 
                  ? "opacity-50 cursor-not-allowed" 
                  : "active:scale-95 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-900 cursor-pointer"
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-slate-800 dark:text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                scrollNext()
              }}
              disabled={!canScrollNext}
              className={`absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl hidden sm:flex items-center justify-center transition-all duration-200 z-10 ${
                !canScrollNext 
                  ? "opacity-50 cursor-not-allowed" 
                  : "active:scale-95 text-slate-800 dark:text-white hover:bg-white dark:hover:bg-slate-900 cursor-pointer"
              }`}
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-slate-800 dark:text-white" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Row */}
      {items.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {items.map((item, index) => {
            const isActive = index === activeIndex
            const isYoutube = item.type === "youtube"
            const thumbUrl = getThumbnailUrl(item)

            return (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`relative w-20 sm:w-24 aspect-[4/3] rounded-lg border overflow-hidden shrink-0 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-primary ring-2 ring-primary shadow-md opacity-100"
                    : "border-border opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={thumbUrl}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {isYoutube && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-warning flex items-center justify-center text-warning-foreground shadow-lg">
                      <Play className="h-4 w-4 fill-current ml-0.5" />
                    </div>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}

      {/* Lightbox for full screen inspection (IMAGES ONLY) */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={yarlIndex}
        slides={yarlSlides}
        carousel={{ finite: true }}
        plugins={[Thumbnails, Zoom, Counter]}
        animation={{ fade: 200, swipe: 200 }}
        controller={{ closeOnBackdropClick: true }}
        on={{
          view: ({ index }) => {
            setYarlIndex(index)
            const originalIndex = imageItems[index]?.originalIndex
            if (originalIndex !== undefined) {
              setActiveIndex(originalIndex)
              if (emblaApi) emblaApi.scrollTo(originalIndex)
            }
          },
        }}
      />

      {/* Dedicated Video Modal for Native Mobile Support */}
      {videoModalOpen && activeVideoId && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-6 lg:p-8"
          onClick={() => {
            setVideoModalOpen(false)
            setActiveVideoId(null)
          }}
        >
          {/* Close Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation()
              setVideoModalOpen(false)
              setActiveVideoId(null)
            }}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-red-400 transition-colors z-[10000] bg-black/60 hover:bg-black/90 rounded-full p-2.5 shadow-xl border border-white/20"
            aria-label="Tutup video"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>
          
          <div 
            className="w-full max-w-5xl aspect-video relative rounded-xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideoId}?rel=0&showinfo=1&autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
