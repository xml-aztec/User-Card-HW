import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/users" className="text-2xl font-bold">User List</Link>
        <nav>
          <Link to="/users" className="hover:text-blue-200">Users</Link>
        </nav>
      </div>
    </header>
  );
}