import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { FirebaseProvider } from './context/firebase'
import { Outlet, BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './views/signin'

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>,
);
