// src/components/UserCard.jsx
import { Link } from 'react-router-dom';

export default function UserCard({ user }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out">
      <img
        src={`https://i.pravatar.cc/150?img=${user.id}`}
        alt={user.username}
        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
      />
      <h2 className="text-xl font-semibold text-center text-gray-800">
        {user.name.firstname} {user.name.lastname}
      </h2>
      <p className="text-gray-600 text-center mt-2">{user.email}</p>
      <p className="text-gray-600 text-center">
        {user.address.city}, {user.address.street}
      </p>
      <div className="mt-4 text-center">
        <Link
          to={`/users/${user.id}`}
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}