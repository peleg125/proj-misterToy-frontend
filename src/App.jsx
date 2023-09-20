import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/style/main.css'

import { AboutUs } from './pages/AboutUs'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { store } from './store/store'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className='main-layout app'>
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path='/' />
              <Route element={<ToyDetails />} path='/toy/details/:toyId' />
              <Route element={<ToyEdit />} path='/toy/edit/:toyId' />
              <Route element={<ToyEdit />} path='/toy/edit' />
              <Route element={<ToyIndex />} path='/toy' />
              <Route element={<AboutUs />} path='/about' />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
