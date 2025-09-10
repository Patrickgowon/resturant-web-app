import './style.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Homepagefood from './Pages/homepagefood';
import Menupage from './Pages/menupage';
import Aboutfood from './Pages/aboutfoodpage';
import Contactfood from './Pages/contactpag';
import Loginfood from './Pages/loginfoodpage';
import SignInfood from './Pages/signinfoodpage';
import OrderNow from './Pages/orderfoodpage';
import Breakfast from './Pages/jason';
import OrderPage from './Pages/orderfoodbox';
import Dashboard from './adminpages/admin';
import OrdersPage from './adminpages/order';
import MenuPage from './adminpages/menu';
import SettingsPage from './adminpages/settings';
import AnalyticsPage from './adminpages/analystic';
import CustomerPage from './adminpages/customer';
import WalletPage from './Pages/walletpage';
import FoodOrderPage from './Pages/ordercart';



const App = () =>{
  return(
    <BrowserRouter>
    
            
            
    <Routes>
      <Route path='/ordercart' element={<FoodOrderPage/>}/>
      <Route path='wallet' element={<WalletPage/>}/>
      <Route path='/setting' element={<SettingsPage/>}/>
      <Route path='/analystic' element={<AnalyticsPage/>}/>
      <Route path='/customer' element={ <CustomerPage/>}/>
      <Route path='/menu' element={<MenuPage/>}/>
      <Route path='/order' element={<OrdersPage/>}/>
      <Route path='/admin' element={<Dashboard/>}/>
      <Route path='/orders' element={<OrderPage/>}/>
      <Route path='/menu/breakfast' element={<Breakfast/>}/>
      <Route path='/orderfood' element={<OrderNow/>}/>
      <Route path='/signfood' element={ <SignInfood/>}/>
      <Route path='/loginfood' element={<Loginfood/>}/>
      <Route path='/cont' element={<Contactfood/>}/>
      <Route path='/about' element={<Aboutfood/>}/>
      <Route path='/menu2' element={<Menupage/>}/>
      <Route path='/' element={<Homepagefood/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}
export default App;

