import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById } from '../store/async/usersAsync';

export default function UserDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser, status, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserById(id));
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <div className="container-custom flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="loading-spinner mb-4"></div>
          <p className="text-gray-600">Загрузка информации о пользователе...</p>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="container-custom">
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
              <div className="mt-3 flex space-x-3">
                <button 
                  onClick={() => dispatch(fetchUserById(id))}
                  className="bg-red-100 text-red-800 py-1 px-3 rounded-md hover:bg-red-200 transition-colors duration-200"
                >
                  Попробовать снова
                </button>
                <Link 
                  to="/users" 
                  className="bg-gray-100 text-gray-800 py-1 px-3 rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                  Вернуться к списку
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="container-custom">
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Пользователь не найден</h2>
          <p className="text-gray-600 mb-6">Информация о запрашиваемом пользователе отсутствует.</p>
          <Link
            to="/users"
            className="btn btn-primary"
          >
            Вернуться к списку пользователей
          </Link>
        </div>
      </div>
    );
  }

  // Скрытие части пароля
  const maskPassword = (password) => {
    return password.substring(0, 3) + '•'.repeat(Math.max(0, password.length - 3));
  };
  
  // Получаем инициалы для аватара
  const initials = `${currentUser.name.firstname.charAt(0)}${currentUser.name.lastname.charAt(0)}`;

  return (
    <div className="container-custom">
      <div className="max-w-4xl mx-auto">
        {/* Навигационная хлебная крошка */}
        <div className="mb-6 flex items-center text-sm text-gray-600">
          <Link to="/users" className="hover:text-blue-600 transition-colors">Пользователи</Link>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-400">{currentUser.name.firstname} {currentUser.name.lastname}</span>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Верхняя часть профиля */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative">
            <Link 
              to="/users" 
              className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
          
          {/* Информация о пользователе */}
          <div className="relative px-6 pb-8">
            {/* Аватар */}
            <div className="absolute -top-16 left-6">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-200 flex items-center justify-center shadow-lg">
                <img
                  src={`https://i.pravatar.cc/256?img=${currentUser.id}`}
                  alt={currentUser.username}
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
            </div>
            
            {/* Имя и тег */}
            <div className="pt-20">
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{currentUser.name.firstname} {currentUser.name.lastname}</h1>
                  <p className="text-blue-600 font-medium">@{currentUser.username}</p>
                </div>
                <Link
                  to="/users"
                  className="btn btn-primary mt-2 md:mt-0"
                >
                  <span>Все пользователи</span>
                </Link>
              </div>
              
              {/* Карточки с информацией */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Основная информация */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Основная информация</h2>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">Email</div>
                        <div className="font-medium text-gray-800">{currentUser.email}</div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">Телефон</div>
                        <div className="font-medium text-gray-800">{currentUser.phone}</div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">Логин</div>
                        <div className="font-medium text-gray-800">{currentUser.username}</div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">Пароль</div>
                        <div className="font-medium text-gray-800 relative group">
                          <span>{maskPassword(currentUser.password)}</span>
                          <span className="absolute inset-0 bg-gray-800 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded">
                            {currentUser.password}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Адрес и местоположение */}
                <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Адрес и местоположение</h2>
                  
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">Улица</div>
                        <div className="font-medium text-gray-800">{currentUser.address.street}</div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">Город</div>
                        <div className="font-medium text-gray-800">{currentUser.address.city}</div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">Почтовый индекс</div>
                        <div className="font-medium text-gray-800">{currentUser.address.zipcode}</div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-500 text-sm">Координаты</div>
                        <div className="font-medium text-gray-800">
                          {currentUser.address.geolocation.lat}, {currentUser.address.geolocation.long}
                        </div>
                        <a 
                          href={`https://maps.google.com/?q=${currentUser.address.geolocation.lat},${currentUser.address.geolocation.long}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block"
                        >
                          Открыть в Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}