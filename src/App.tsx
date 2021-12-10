import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

const MainPage = lazy(() => import('./pages/main-page'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>...Loading</div>}>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
