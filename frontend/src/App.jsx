import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar/>

    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/forgotpassword' element={<ForgotPassword/>}/>
    </Routes>

    </BrowserRouter>
 
    </>
  )
}

export default App
