import { useParams, Navigate } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { productsData } from "@/data/products"

import ProductBreadcrumb from "@/components/product/ProductBreadcrumb"
import ProductGallery from "@/components/product/ProductGallery"
import ProductInfo from "@/components/product/ProductInfo"
import ProductSpecs from "@/components/product/ProductSpecs"
import ProductDocuments from "@/components/product/ProductDocuments"
import RelatedProducts from "@/components/product/RelatedProducts"

export default function ProductDetail() {
  const { slug } = useParams()
  const product = productsData.find((p) => p.slug === slug)

  if (!product) {
    return <Navigate to="/404" replace />
  }

  return (
    <>
      <Helmet>
        <title>{`${product.name} — CV Globalindo Teknik Mandiri`}</title>
        <meta name="description" content={product.shortDescription || product.spec} />
      </Helmet>

      <div className="bg-background min-h-screen text-foreground animate-page-fade">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          {/* 1. Breadcrumb */}
          <ProductBreadcrumb category={product.category} name={product.name} />

          {/* 2 & 3. Main Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Product Gallery (col-span-7) */}
            <div className="lg:col-span-7">
              <ProductGallery media={product.media} />
            </div>

            {/* Right: Product Information (col-span-5) */}
            <div className="lg:col-span-5">
              <ProductInfo
                name={product.name}
                sku={product.sku}
                category={product.category}
                stockStatus={product.stockStatus}
                shortDescription={product.shortDescription}
                description={product.description}
              />
            </div>
          </div>

          {/* Spacing wrapper */}
          <div className="mt-16 space-y-16">
            {/* 4. Technical Specifications */}
            <ProductSpecs specifications={product.specifications} />

            {/* Documents Section */}
            <ProductDocuments documents={product.documents} />

            {/* 5. Related Products */}
            <RelatedProducts currentId={product.id} category={product.category} />
          </div>
        </div>
      </div>
    </>
  )
}
