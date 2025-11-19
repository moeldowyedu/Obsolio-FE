import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'

const NotFoundPage = () => {
  return (
    <MainLayout showFooter={false}>
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="glass-card rounded-3xl p-12 md:p-16 max-w-2xl mx-auto">
            <span className="material-icons text-8xl text-gray-400 mb-6">error_outline</span>
            <h1 className="text-6xl font-bold text-secondary-900 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-secondary-900 mb-4">Page Not Found</h2>
            <p className="text-secondary-600 mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="glass-btn-primary rounded-xl px-8 py-3 inline-block">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default NotFoundPage
