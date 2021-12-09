import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

const MainPage = lazy(() => import('./pages/main-page'))
const SandEmailPage = lazy(() => import('./pages/email-page'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/send_email' element={<SandEmailPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
