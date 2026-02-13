const Home: React.FC = () => {
  return (
    <div className="fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to React TypeScript App
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A modern, scalable React TypeScript application built with Vite, Tailwind CSS, and Redux Toolkit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="card text-center">
          <div className="text-4xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
          <p className="text-gray-600">
            Built with Vite for instant server start and lightning-fast HMR
          </p>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-4">🎨</div>
          <h3 className="text-xl font-semibold mb-2">Beautiful UI</h3>
          <p className="text-gray-600">
            Styled with Tailwind CSS for rapid and responsive design
          </p>
        </div>

        <div className="card text-center">
          <div className="text-4xl mb-4">🔧</div>
          <h3 className="text-xl font-semibold mb-2">Type-Safe</h3>
          <p className="text-gray-600">
            TypeScript for enhanced developer experience and code quality
          </p>
        </div>
      </div>

      <div className="card bg-primary-50 border-2 border-primary-200">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">
          Production Ready Features
        </h2>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-primary-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>TypeScript:</strong> Full type safety across the application</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Global Error Handling:</strong> React Error Boundary for graceful error recovery</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>API Integration:</strong> Axios with interceptors for consistent API calls</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Routing:</strong> React Router with protected routes</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Toast Notifications:</strong> User-friendly feedback system</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-primary-600 mt-1">✓</span>
            <span className="text-gray-700"><strong>Reusable Components:</strong> Modular and scalable component architecture</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
