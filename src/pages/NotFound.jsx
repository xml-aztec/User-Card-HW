import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container mx-auto min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="relative">
          <div className="text-9xl font-extrabold text-gray-200">404</div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <svg className="h-32 w-32 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Страница не найдена
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Извините, но страница, которую вы пытаетесь открыть, не существует или была перемещена.
        </p>
        <div className="mt-8">
          <Link
            to="/users"
            className="btn btn-primary px-6 py-3 text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}