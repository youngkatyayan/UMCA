
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/store/Store.js'
import ScrollProgressBar from './components/pages/ScrollProgressBar .jsx'
createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
    <ScrollProgressBar/>
      <App />
    </Provider>
  </Router>

)
