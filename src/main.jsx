import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from "./store/store.js";
import { LikedMoviesProvider } from './pages/context/LikedMoviesContext'; // Import the provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <LikedMoviesProvider>
      <App />
    </LikedMoviesProvider>
  </Provider>
);
