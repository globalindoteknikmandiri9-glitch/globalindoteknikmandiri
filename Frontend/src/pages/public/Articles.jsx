import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Helmet } from "react-helmet-async"
import { Search, Loader2, ArrowRight, UserCircle2, ArrowUpRight, Newspaper } from "lucide-react"
import api from "@/services/axios"
import { getAssetUrl, cn } from "@/lib/utils"

export default function Articles() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true)
        const response = await api.get("/public/articles")
        setArticles(response.data)
      } catch (error) {
        console.error("Gagal mengambil data artikel:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  // Derived state
  const filteredArticles = useMemo(() => {
    let result = articles

    if (search) {
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          (a.content && a.content.toLowerCase().includes(search.toLowerCase()))
      )
    }
    
    return result
  }, [articles, search])

  // Featured and Recent logic
  const { featuredArticle, recentArticles, remainingArticles } = useMemo(() => {
    if (filteredArticles.length === 0) return { featuredArticle: null, recentArticles: [], remainingArticles: [] }
    
    const isBaseState = page === 1 && search === ""
    
    if (isBaseState) {
      return {
        featuredArticle: filteredArticles[0],
        recentArticles: filteredArticles.slice(1, 4),
        remainingArticles: filteredArticles.slice(4)
      }
    }
    
    return {
      featuredArticle: null,
      recentArticles: [],
      remainingArticles: filteredArticles
    }
  }, [filteredArticles, page, search])

  const totalPages = Math.ceil(remainingArticles.length / itemsPerPage)
  const paginated = remainingArticles.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const paginationPages = () => {
    let pages = []
    for (let i = 1; i <= totalPages; i++) pages.push(i)
    return pages
  }

  // Helpers
  function getImageUrl(url) {
    if (!url) return null
    return getAssetUrl(url)
  }

  function formatDate(dateStr) {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <>
      <Helmet>
        <title>Blog & Knowledge — CV Globalindo Teknik Mandiri</title>
      </Helmet>

      {/* Main Container - Off-White Background inspired by Tumbas */}
      <div className="bg-[#F8F9FA] min-h-screen text-slate-900 font-sans pb-32 selection:bg-emerald-100">
        
        {/* HEADER SECTION */}
        <div className="container mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 pt-24 lg:pt-32 pb-12">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-4">
                Knowledge Center
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed">
                Temukan pembaruan terbaru, wawasan teknis, kalibrasi alat ukur, dan berita dari tim CV Globalindo Teknik Mandiri.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
              className="relative w-full lg:w-[400px] shrink-0"
            >
              <div className="flex items-center w-full h-14 bg-white rounded-full border border-slate-200 px-5 focus-within:border-slate-400 focus-within:ring-4 focus-within:ring-slate-100 transition-all shadow-sm">
                <Search className="h-5 w-5 text-slate-400 mr-3" />
                <input 
                  type="text"
                  placeholder="Cari artikel atau referensi..."
                  value={search}
                  onChange={(e) => {setSearch(e.target.value); setPage(1);}}
                  className="flex-1 bg-transparent border-none focus:outline-none text-base text-slate-700 placeholder:text-slate-400 font-medium"
                />
              </div>
            </motion.div>
          </div>
          
          {/* Subtle separator instead of categories */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="w-full h-px bg-slate-200" />
        </div>

        {/* LOADING STATE */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400 mb-4" />
          </div>
        ) : (
          <div className="container mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8">
            
            {/* ASYMMETRICAL TOP SECTION (Featured + Recent) */}
            {featuredArticle && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
                
                {/* LEFT: Featured Article (col-8) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                  className="lg:col-span-8 flex flex-col group cursor-pointer"
                  onClick={() => navigate(`/artikel/${featuredArticle.slug}`)}
                >
                  <div className="relative w-full aspect-[16/9] lg:aspect-[1.8/1] rounded-[32px] overflow-hidden mb-6 bg-slate-200 border border-slate-200/50">
                    {getImageUrl(featuredArticle.image_url) ? (
                      <img 
                        src={getImageUrl(featuredArticle.image_url)} 
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.3,1)]"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                         <Newspaper className="h-16 w-16 text-slate-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>
                  
                  <div className="px-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 text-xs font-bold rounded-full border border-slate-900 bg-slate-900 text-white">
                        Featured
                      </span>
                      <span className="text-sm text-slate-500 font-medium">{formatDate(featuredArticle.createdAt)}</span>
                    </div>
                    
                    <h2 className="text-3xl lg:text-[40px] font-bold tracking-tight leading-[1.2] text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors">
                      {featuredArticle.title}
                    </h2>
                    
                    <p className="text-slate-500 text-lg leading-relaxed line-clamp-2 mb-6 max-w-3xl">
                      {featuredArticle.content.replace(/<[^>]+>/g, "")}
                    </p>

                    <div className="flex items-center gap-3 mt-auto">
                      <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center">
                        <UserCircle2 className="h-6 w-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Admin Engineering</p>
                        <p className="text-xs font-medium text-slate-500">Author</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* RIGHT: Recent Articles (col-4) */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                  className="lg:col-span-4 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6 px-2">
                    <h3 className="text-xl font-bold text-slate-900">Recent Articles</h3>
                    <button className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                      View all <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    {recentArticles.map((article) => {
                      return (
                        <div 
                          key={article.id} 
                          onClick={() => navigate(`/artikel/${article.slug}`)}
                          className="group flex gap-5 bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5"
                        >
                          <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden bg-slate-100 relative">
                            {getImageUrl(article.image_url) ? (
                              <img src={getImageUrl(article.image_url)} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                               <div className="w-full h-full flex items-center justify-center">
                                 <Newspaper className="h-6 w-6 text-slate-300" />
                               </div>
                            )}
                          </div>
                          <div className="flex flex-col justify-center flex-1 py-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider mb-2 text-slate-400">
                              Publication
                            </span>
                            <h4 className="text-base font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
                              {article.title}
                            </h4>
                            <span className="text-xs text-slate-400 font-medium mt-auto block">{formatDate(article.createdAt)}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </motion.div>

              </div>
            )}

            {/* EMPTY STATE */}
            {paginated.length === 0 && !featuredArticle ? (
              <div className="text-center py-20 bg-white rounded-[32px] border border-slate-200 max-w-2xl mx-auto px-6 shadow-sm">
                <Search className="h-10 w-10 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Tidak ada artikel</h3>
                <p className="text-slate-500 mb-6">Pencarian Anda tidak membuahkan hasil.</p>
                <button
                  onClick={() => { setSearch(""); setPage(1) }}
                  className="h-12 px-8 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <>
                {/* MORE ARTICLES GRID */}
                <div className="mb-8 px-2">
                  <h3 className="text-2xl font-bold text-slate-900">More Articles</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {paginated.map((article, i) => {
                    return (
                      <motion.article
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }}
                        key={article.id}
                        onClick={() => navigate(`/artikel/${article.slug}`)}
                        className="group flex flex-col bg-white p-4 rounded-[32px] border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-all hover:-translate-y-1"
                      >
                        <div className="relative aspect-[4/3] w-full rounded-[24px] overflow-hidden mb-5 bg-slate-100">
                          {getImageUrl(article.image_url) ? (
                            <img
                              src={getImageUrl(article.image_url)}
                              alt={article.title}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.3,1)]"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                               <Newspaper className="h-12 w-12 text-slate-300" />
                             </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col flex-1 px-2 pb-2">
                          <span className="text-xs font-medium text-slate-500 mb-2">{formatDate(article.createdAt)}</span>
                          <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-sm text-slate-500 line-clamp-2 mb-6">
                            {article.content.replace(/<[^>]+>/g, "")}
                          </p>
                          
                          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center">
                                <UserCircle2 className="h-5 w-5 text-slate-400" />
                              </div>
                              <span className="text-sm font-bold text-slate-900">Admin</span>
                            </div>
                            <div className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-600 transition-colors text-slate-400">
                              <ArrowUpRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    )
                  })}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                  <div className="mt-16 flex items-center justify-center gap-2">
                    {paginationPages().map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={cn(
                          "w-12 h-12 flex items-center justify-center rounded-full text-base font-bold transition-all",
                          page === p
                            ? "bg-slate-900 text-white shadow-md"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  )
}
