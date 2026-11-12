import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import './index.css'
import App from './App.jsx'

// 2. إنشاء نسخة من QueryClient
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // عشان ما يعيد جلب البيانات كل ما تضغط على نافذة المتصفح
            retry: 1, // عدد المحاولات لو فشل الطلب
        },
    },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);