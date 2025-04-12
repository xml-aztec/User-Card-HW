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
    return <div className="text-center p-4">Загрузка...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center p-4 text-red-500">Ошибка: {error}</div>;
  }

  if (!currentUser) {
    return <div className="text-center p-4">Пользователь не найден</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{currentUser.name.firstname} {currentUser.name.lastname}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>Телефон:</strong> {currentUser.phone}</p>
        <p><strong>Адрес:</strong> {currentUser.address.street}, {currentUser.address.city}, {currentUser.address.zipcode}</p>
        <p><strong>Геолокация:</strong> {currentUser.address.geolocation.lat}, {currentUser.address.geolocation.long}</p>
        <p><strong>Имя пользователя:</strong> {currentUser.username}</p>
        <p><strong>Пароль:</strong> {currentUser.password}</p>
        <Link to="/users" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Назад к списку пользователей
        </Link>
      </div>
    </div>
  );
}