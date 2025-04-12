// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../store/async/usersAsync';
import UserCard from '../components/UserCard';

export default function Home() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  // Фильтрация пользователей по поисковому запросу
  const filteredUsers = users.filter(user => {
    const fullName = `${user.name.firstname} ${user.name.lastname}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || 
           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container-custom">
      {/* Заголовок и поисковая строка */}
      <div className="mb-10">
        <h1 className="page-title">Наши пользователи</h1>
        
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Поиск пользователя..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <div className="absolute top-0 left-0 h-full flex items-center pl-4 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {status === 'loading' && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="loading-spinner mb-4"></div>
          <p className="text-gray-600">Загружаем пользователей...</p>
        </div>
      )}
      
      {status === 'failed' && (
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md max-w-xl mx-auto">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">Ошибка загрузки данных</h3>
              <p className="mt-1 text-red-700">{error}</p>
              <button 
                onClick={() => dispatch(fetchUsers())}
                className="mt-3 bg-red-100 text-red-800 py-1 px-3 rounded-md hover:bg-red-200 transition-colors duration-200"
              >
                Попробовать снова
              </button>
            </div>
          </div>
        </div>
      )}
      
      {status === 'succeeded' && (
        <>
          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Нет результатов</h3>
              <p className="text-gray-500">Попробуйте изменить поисковый запрос</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}