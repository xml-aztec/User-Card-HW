// src/components/UserCard.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function UserCard({ user }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Создаем инициалы для случая, если аватар не загрузится
  const initials = `${user.name.firstname.charAt(0)}${user.name.lastname.charAt(0)}`;
  
  return (
    <div 
      className={`bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
        isHovered ? 'shadow-xl translate-y-[-8px]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 flex items-center justify-center">
              <img
                src={`https://i.pravatar.cc/256?img=${user.id}`}
                alt={user.username}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-blue-500 text-white text-3xl font-bold" style={{display: 'none'}}>
                {initials}
              </div>
            </div>
            <div className={`absolute -right-2 -bottom-2 w-8 h-8 rounded-full bg-green-500 border-2 border-white flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {user.name.firstname} {user.name.lastname}
        </h2>
        <p className="text-blue-600 font-medium mb-3">@{user.username}</p>
        
        <div className="flex items-center justify-center mb-3 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="truncate">{user.email}</span>
        </div>
        
        <div className="flex items-center justify-center mb-6 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{user.address.city}</span>
        </div>
        
        <Link
          to={`/users/${user.id}`}
          className="btn btn-primary block w-full"
        >
          <span>Подробнее</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}