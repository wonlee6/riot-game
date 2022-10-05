import React, { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'

const MainPage = lazy(() => import('./pages/MainPage'))
const MatchPage = lazy(() => import('./pages/MatchPage'))

const queryClient = new QueryClient()

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Suspense fallback={<div>...Loading</div>}>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/match' element={<MatchPage />} />
            </Routes>
          </Suspense>
        </RecoilRoot>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
