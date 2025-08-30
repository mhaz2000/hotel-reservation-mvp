import './App.css'
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { ToastContainer } from 'react-toastify';

function App() {
  const routing = useRoutes(routes);


  return (
    <>
      <main>{routing}</main>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}   // 3 seconds auto close
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}  // Set true if you want RTL for Farsi
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
