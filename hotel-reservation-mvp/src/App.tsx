import './App.css'
import { useRoutes } from 'react-router-dom';
import routes from './routes';

function App() {
  const routing = useRoutes(routes);


  return (
    <main>{routing}</main>

  )
}

export default App
