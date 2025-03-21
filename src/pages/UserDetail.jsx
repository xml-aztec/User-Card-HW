import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/users/${id}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{user.name.firstname} {user.name.lastname}</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Телефон:</strong> {user.phone}</p>
        <p><strong>Адрес:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
        <p><strong>Геолокация:</strong> {user.address.geolocation.lat}, {user.address.geolocation.long}</p>
        <p><strong>Имя пользователя:</strong> {user.username}</p>
        <p><strong>Пароль:</strong> {user.password}</p>
        <Link to="/users" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Назад к списку пользователей
        </Link>
      </div>
    </div>
  );
}