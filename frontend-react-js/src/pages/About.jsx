const About = () => {
  return (
    <div className="fade-in">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About This Project</h1>
      
      <div className="card mb-8">
        <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Frontend</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• React 18.3</li>
              <li>• Vite 5.x</li>
              <li>• Tailwind CSS 3.x</li>
              <li>• Redux Toolkit</li>
              <li>• React Router v6</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Development Tools</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• ESLint</li>
              <li>• PostCSS</li>
              <li>• Autoprefixer</li>
              <li>• Hot Module Replacement</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Project Structure</h2>
        <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
{`src/
├── components/
│   ├── common/          # Reusable components
│   └── layout/          # Layout components
├── pages/               # Page components
├── routes/              # Route configuration
├── store/               # Redux store
│   └── slices/          # Redux slices
├── services/            # API services
├── hooks/               # Custom hooks
├── utils/               # Utility functions
├── config/              # Configuration files
├── constants/           # Constants
└── assets/              # Static assets`}
        </pre>
      </div>
    </div>
  )
}

export default About
