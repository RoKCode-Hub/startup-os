
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { LogIn, LogOut } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <footer className="bg-gray-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <h3 className="text-3xl font-serif font-bold mb-6">STARTUP OS</h3>
            <p className="text-gray-400 max-w-md text-lg leading-relaxed">
              A design studio creating minimal, beautiful digital experiences that connect brands with people.
            </p>
            <div className="mt-8 flex space-x-5">
              <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
                <span className="sr-only">Twitter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
                <span className="sr-only">Instagram</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all transform hover:scale-110">
                <span className="sr-only">LinkedIn</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3 md:ml-auto">
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-accent1">Links</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#podcast-preview" className="text-gray-400 hover:text-white transition-colors">Podcast</a></li>
              <li><a href="#blog-preview" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider text-accent1">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-accent1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                hello@startupos.com
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-accent1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-accent1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                123 Design St, Creative City
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© {year} Startup OS. All rights reserved.</p>
          
          <div className="flex items-center mt-6 md:mt-0">
            {isAuthenticated ? (
              <button 
                onClick={logout} 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
              >
                <LogIn size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
