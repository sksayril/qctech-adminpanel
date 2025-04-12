import { useState } from 'react';
import { Menu, X, LayoutDashboard, Users, TrendingUp, ChevronRight } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Salesmen', path: '/salesmen' },
    { icon: TrendingUp, label: 'Sales', path: '/sales' },
  ];

  return (
    <div 
      className={`bg-white shadow-lg h-screen transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className={`font-bold text-xl ${!isExpanded && 'hidden'}`}>QC Tech</h2>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      <nav className="p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-3 mb-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              {isExpanded && (
                <>
                  <span className="ml-3">{item.label}</span>
                  <ChevronRight 
                    size={16} 
                    className={`ml-auto ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  />
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}