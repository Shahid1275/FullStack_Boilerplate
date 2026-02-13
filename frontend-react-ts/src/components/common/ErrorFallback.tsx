import { FallbackProps } from 'react-error-boundary'

const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            {error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={resetErrorBoundary}
            className="btn btn-primary w-full"
          >
            Try Again
          </button>
        </div>
        
        {import.meta.env.MODE === 'development' && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Error Details (Dev Mode)</h3>
            <pre className="text-xs text-red-600 overflow-auto">
              {error?.stack}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default ErrorFallback
