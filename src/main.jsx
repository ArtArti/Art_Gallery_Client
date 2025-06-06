
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { AuthProvider } from './AuthContect/AuthContext'

createRoot(document.getElementById('root')).render(   
      <AuthProvider>
          <RouterProvider router={router}/>
      </AuthProvider> 
      
     
)
