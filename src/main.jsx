import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { FirebaseProvider } from './context/firebase'
import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './views/signin'
import ImageList from './views/imageList'

const Layout = () => {
  return (
    <div className='text-white font-main min-h-screen flex justify-center items-center bg-neutral-900'>
      <Outlet />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<App />}/>
            <Route path='signIn' element={<SignIn />} />
            <Route path='images' element={<ImageList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>,
);
