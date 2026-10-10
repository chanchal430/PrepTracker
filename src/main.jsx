import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify';
import { QuestionProvider } from './context/QuestionContext';
import AppRouter from './router/AppRouter.jsx';

createRoot(document.getElementById('root')).render(
    <QuestionProvider>
      <AppRouter />
      <ToastContainer />
    </QuestionProvider>
)
