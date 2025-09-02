import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './style/todoList.css';

createRoot(document.getElementById('root')!).render(
    <App />
)
