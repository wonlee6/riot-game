import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import App from './App'
import { ReactQueryDevtools } from 'react-query/devtools'

const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript

const queryClient = new QueryClient()

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      {/* devtools */}
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      <App />
    </QueryClientProvider>
  </RecoilRoot>
)
