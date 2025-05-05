
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Create root with non-null assertion on the element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

root.render(<App />);