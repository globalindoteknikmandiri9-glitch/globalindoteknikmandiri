import React from "react"
import { Button } from "./ui/button"
import { AlertTriangle } from "lucide-react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-800">Oops! Terjadi Kesalahan</h1>
              <p className="text-slate-500 text-sm">
                Maaf, sistem kami menemui masalah yang tidak terduga. Silakan coba muat ulang halaman atau kembali ke Beranda.
              </p>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <div className="bg-slate-100 p-4 rounded-lg text-left overflow-auto text-xs text-rose-600 font-mono max-h-32">
                {this.state.error.toString()}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Button variant="outline" onClick={() => window.location.reload()} className="w-full sm:w-auto">
                Muat Ulang
              </Button>
              <Button onClick={() => window.location.href = "/"} className="w-full sm:w-auto">
                Ke Beranda
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
