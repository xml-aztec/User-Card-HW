import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-2xl mb-4">Страница не найдена</p>
      <Link to="/users" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Вернуться на главную
      </Link>
    </div>
  );
}