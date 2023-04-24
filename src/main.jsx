import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { FirebaseProvider } from './context/firebase'
import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom'
import ImageList from './views/imageList'
import ImagePage from './views/imagePage'
import NavBar from './components/NavBar'
import Albums from './views/albums'
import ImageUpload from "./views/imageUpload";

const Layout = () => {
  return (
    <div 
      className='text-white font-main min-h-screen flex flex-col justify-center items-center 
               bg-neutral-900'
    >
      <NavBar />
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
            <Route path='images' element={<ImageList />} />
            <Route path='images/:id' element={<ImagePage />} />
            <Route path='albums' element={<Albums />} />
            <Route path='upload/:id' element={<ImageUpload />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>,
);
