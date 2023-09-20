import {Routes, Route} from 'react-router-dom'
import HomePage from './page/HomePage'
import AboutPage from './page/AboutPage'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App