import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customers/pages/Home/HomePage'
import Navbar from '../customers/components/Navbar/Navbar'
import Cart from '../customers/pages/Cart/Cart'
import Profile from '../customers/pages/Profile/Profile'
import PaymentSuccess from '../customers/pages/PaymentSuccess/PaymentSuccess'
import Search from '../customers/components/Search/Search'
import CreateRestaurantForm from '../Admin/AddRestaurants/CreateRestaurantForm'
import Restaurant from '../customers/pages/Restaurant/Restaurant'
import PasswordChangeSuccess from '../customers/pages/Auth/PasswordChangeSuccess'
import NotFound from '../customers/pages/NotFound/NotFound'
import LoginForm from '../customers/components/Login/login'
import RegistrationForm from '../customers/components/Register/Register'
import Footer from '../customers/components/Footer/Footer'

const CustomerRoutes = () => {
  return (
    <div className='relative'>
        <nav className="sticky top-0 z-50">
            <Navbar/>
        </nav>
        <Routes>
            <Route exact path='/' element={<HomePage/>}/>
            <Route exact path='/account/:register' element={<HomePage/>}/>
            <Route exact path='/restaurant/:city/:title/:id' element={<Restaurant/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/account/login' element = {<LoginForm />} />
            <Route path='/account/register' element = {<RegistrationForm/>} />
            <Route path='/payment/success/:id' element={<PaymentSuccess/>}/>
            <Route path='/my-profile/*' element={<Profile/>}/>
            <Route path='/search' element={<Search/>}/>
            <Route path='/admin/add-restaurant' element={<CreateRestaurantForm/>}/>
            <Route exact path='/password_change_success' element={<PasswordChangeSuccess/>}/>
            <Route exact path='/*' element={<NotFound/>}/>
        </Routes>
        <footer className="z-50">
          <Footer />
        </footer>
    </div>
  )
}

export default CustomerRoutes