import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { FirebaseProvider } from './context/firebase'
import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom'
import ImageList from './views/imageList'
import ImagePage from './views/imagePage'
import NavBar from './components/NavBar'
import ImageUpload from "./views/imageUpload";

/**
 * Layout for the app, contains a reference to the navbar and the rest of the application (rendered
 * inside outlet by react-router)
 * @returns 
 */
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

/**
 * Creates a root for the project to be rendered inside as well as several paths to be navigated 
 * throught the project
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<App />}/>
            <Route path='images' element={<ImageList />} />
            <Route path='images/:id' element={<ImagePage />} />
            <Route path='upload/' element={<ImageUpload />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>,
);
