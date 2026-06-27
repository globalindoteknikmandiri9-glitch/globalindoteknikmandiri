import { useState, useEffect, useMemo } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Calendar, Clock, ChevronRightIcon, BookOpen, Link as LinkIcon, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import api from "@/services/axios"
import { getAssetUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import ArticleDetailSkeleton from "./ArticleDetailSkeleton"

function formatDate(dateStr) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
}

function estimateReadTime(content) {
  if (!content) return "1 Menit"
  const plain = content.replace(/<[^>]+>/g, "").trim()
  const words = plain.split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} Menit`
}

function getSnippet(content, maxLen = 160) {
  if (!content) return ""
  const plain = content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim()
  return plain.length > maxLen ? plain.slice(0, maxLen) + "…" : plain
}

export default function ArticleDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [allArticles, setAllArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        setLoading(true)
        setError(false)
        const [articleRes, allRes] = await Promise.all([
          api.get(`/public/articles/${slug}`),
          api.get("/public/articles")
        ])
        setArticle(articleRes.data)
        setAllArticles(allRes.data)
      } catch (err) {
        console.error("Failed to fetch article details:", err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchArticleData()
    // Scroll to top on slug change
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [slug])

  const { prevArticle, nextArticle, relatedArticles } = useMemo(() => {
    if (!article || allArticles.length === 0) return { prevArticle: null, nextArticle: null, relatedArticles: [] }
    
    const currentIndex = allArticles.findIndex(a => a.id === article.id)
    const prev = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null
    const next = currentIndex > 0 ? allArticles[currentIndex - 1] : null
    
    const related = allArticles.filter(a => a.id !== article.id).slice(0, 3)
    
    return { prevArticle: prev, nextArticle: next, relatedArticles: related }
  }, [article, allArticles])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("Link berhasil disalin!")
  }

  const shareLinks = useMemo(() => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(article?.title || "")
    return {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://x.com/intent/tweet?url=${url}&text=${text}`
    }
  }, [article])

  if (loading) return <ArticleDetailSkeleton />

  if (error || !article) {
    return (
      <div className="bg-background min-h-screen text-foreground flex flex-col items-center justify-center p-6 text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground/30 mb-6" />
        <h1 className="text-2xl font-bold mb-3">Artikel tidak ditemukan</h1>
        <p className="text-muted-foreground mb-8 max-w-md leading-relaxed text-sm">
          Maaf, artikel yang Anda cari mungkin telah dihapus atau URL yang Anda masukkan salah.
        </p>
        <Button onClick={() => navigate("/artikel")} className="rounded-xl px-8">
          Kembali ke Halaman Artikel
        </Button>
      </div>
    )
  }

  const currentUrl = window.location.href
  const imageUrl = article.image_url ? getAssetUrl(article.image_url) : null

  return (
    <>
      <Helmet>
        <title>{`${article.title} — CV Globalindo Teknik Mandiri`}</title>
        <meta name="description" content={getSnippet(article.content)} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={getSnippet(article.content)} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:url" content={currentUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="bg-background min-h-screen text-foreground pb-20 pt-20 md:pt-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center flex-wrap gap-2 text-[11px] py-8 text-muted-foreground/60 font-bold uppercase tracking-wider">
            <Link to="/" className="hover:text-accent transition-colors">Beranda</Link>
            <ChevronRightIcon className="h-3 w-3 shrink-0" />
            <Link to="/artikel" className="hover:text-accent transition-colors">Knowledge Center</Link>
            <ChevronRightIcon className="h-3 w-3 shrink-0" />
            <span className="text-foreground truncate max-w-[150px] sm:max-w-[300px]" title={article.title}>{article.title}</span>
          </nav>

          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10 md:mb-14"
          >
            {imageUrl && (
              <div className="w-full aspect-video md:aspect-[2/1] rounded-2xl overflow-hidden bg-muted relative mb-8 md:mb-12 shadow-sm border border-border/50">
                <img 
                  src={imageUrl} 
                  alt={article.title} 
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
            
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold text-accent uppercase tracking-widest mb-6 px-3 py-1 bg-accent/10 rounded-full">
                Engineering Insight
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight md:leading-tight lg:leading-tight mb-8">
                {article.title}
              </h1>
              
              <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-3 text-xs text-muted-foreground font-medium">
                <span className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-[10px]">
                    {article.author_name ? article.author_name.charAt(0).toUpperCase() : 'G'}
                  </div>
                  {article.author_name || "Globalindo Team"}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-muted-foreground/70" />
                  <time>{formatDate(article.createdAt)}</time>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground/70" />
                  <span>{article.read_time ? `${article.read_time} Menit` : estimateReadTime(article.content)}</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-sm md:prose-lg"
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br/>") }}
          />

          {/* Share & Tags Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Share2 className="h-4 w-4 text-muted-foreground" />
                Bagikan:
              </span>
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103v3.368h-2.392c-1.312 0-1.921.42-1.921 1.736v2.351h4.156l-.546 3.667h-3.61v7.98h-3.013z"/></svg>
              </a>
              <a href={shareLinks.x} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-zinc-100 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white hover:border-zinc-300 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <button onClick={copyToClipboard} className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <LinkIcon className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
          
          {/* Previous / Next Article */}
          {(prevArticle || nextArticle) && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border pt-8">
              {prevArticle ? (
                <Link to={`/artikel/${prevArticle.slug}`} className="group flex flex-col p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all text-left">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground mb-2 flex items-center gap-1 group-hover:text-accent transition-colors">
                    <ChevronLeft className="h-3 w-3" /> Artikel Sebelumnya
                  </span>
                  <span className="font-semibold text-foreground text-sm line-clamp-2">{prevArticle.title}</span>
                </Link>
              ) : <div />}
              
              {nextArticle && (
                <Link to={`/artikel/${nextArticle.slug}`} className="group flex flex-col p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all text-right md:items-end">
                  <span className="text-[10px] uppercase font-bold text-muted-foreground mb-2 flex items-center justify-end gap-1 group-hover:text-accent transition-colors">
                    Artikel Selanjutnya <ChevronRight className="h-3 w-3" />
                  </span>
                  <span className="font-semibold text-foreground text-sm line-clamp-2">{nextArticle.title}</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="bg-muted/20 border-t border-border py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-10 text-center">Artikel Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((item, i) => (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  key={item.id}
                  onClick={() => navigate(`/artikel/${item.slug}`)}
                  className="group surface-card overflow-hidden flex flex-col h-full hover:shadow-card-hover hover:border-border/80 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer rounded-2xl border border-border"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted/30 border-b border-border shrink-0">
                    {item.image_url ? (
                      <img
                        src={getAssetUrl(item.image_url)}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="h-10 w-10 text-muted-foreground/20" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-3 font-semibold uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <time>{formatDate(item.createdAt)}</time>
                        </span>
                      </div>
                      <h3 className="font-bold text-foreground text-sm leading-snug mb-3 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {getSnippet(item.content, 120)}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
