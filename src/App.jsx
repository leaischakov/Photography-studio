import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import Admin from './components/admin/Admin';
import User from './components/user/User';



// import mainStore from '../../store/mainStore'


//import User from './components/user/User';
import ServicesArray from './components/servicesArray/ServicesArray';
import Header from './components/header/header';
import Meeting from './components/meeting/Meeting';
import Gallery from './components/gallery/gallery';
import LogIn from './components/logIn/LogIn';




function App() {



  return (<>
    <Header />

    {/* <Meeting></Meeting> */}


    {/* <Meeting/> */}

    <BrowserRouter>


      <Routes>

        {/* <Route path='/' element={<User />} /> */}
        <Route path='/' element={<User></User>}></Route>
        {/* <Route path='/logIn' element={<LogIn></LogIn>}></Route> */}
        <Route path='/admin' element={<Admin />} />
        {/* <Route path='/admin' element={<LogIn></LogIn>} /> */}
        <Route path='/admin/meeting' element={<Meeting />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/admin/services' element={<ServicesArray />} />


      </Routes>
    </BrowserRouter>




  </>
  )
}

export default App
