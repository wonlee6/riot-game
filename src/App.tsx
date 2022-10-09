import React, { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import LoadingSpinner from './components/common/LoadingSpinner'

const MainPage = lazy(() => import('./pages/MainPage'))
const MatchPage = lazy(() => import('./pages/MatchPage'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<MainLoadingSpinner />}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/match' element={<MatchPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App

const MainLoadingSpinner = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoadingSpinner />
    </div>
  )
}
