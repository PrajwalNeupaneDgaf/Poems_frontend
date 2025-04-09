import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Home from './Pages/Home'
import SearchResult from './Pages/SearchResult'
import Book from './Pages/Book'
import Auth from './Pages/Auth'
import AdminHome from './Pages/Admin/AdminHome'
import AddPoem from './Pages/Admin/Add'
import ManagePoem from './Pages/Admin/ManagePoems'
import PoemDetails from './Pages/Admin/PoemDetails'
import Textify from './Pages/Admin/Textify'


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/search/:text' element={<SearchResult/>}/>
          <Route path='/book/:uid' element={<Book/>}/>
          <Route path='/auth' element={<Auth/>}/>

          <Route path='/admin' element={<AdminHome/>}/>
          <Route path='/admin/add' element={<AddPoem/>}/>
          <Route path='/admin/textify' element={<Textify/>}/>
          <Route path='/admin/manage/:id' element={<ManagePoem/>}/>
          <Route path='/admin/poemdetails/:id' element={<PoemDetails/>}/>
        </Routes>
      </Router>

    </div>
  )
}

export default App