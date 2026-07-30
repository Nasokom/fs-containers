import ReactDOM from 'react-dom/client';

import App from './App';
console.log("API URL:", import.meta.env.VITE_BACKEND_URL)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
