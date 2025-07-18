import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "./components/ui/provider.jsx";

import "@fontsource/poppins";

createRoot(document.getElementById('root')).render(
  <Provider>
    <App />
  </Provider>
);