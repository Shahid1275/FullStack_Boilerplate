const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">React TS App</h3>
            <p className="text-gray-400">
              A production-ready React TypeScript application with Vite, Tailwind CSS, and Redux Toolkit.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition">Home</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition">About</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Email: info@reactapp.com</p>
            <p className="text-gray-400">Phone: +1 234 567 890</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} React TS App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
