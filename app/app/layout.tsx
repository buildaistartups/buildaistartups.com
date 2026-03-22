import AppProvider from './app-provider'
import { CurrencyProvider } from '@/components/app/currency-provider'
import Sidebar from '@/components/app/sidebar'
import AppHeader from '@/components/app/header'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <CurrencyProvider>
        <div className="flex h-[100dvh] overflow-hidden">
          <Sidebar />
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
            <AppHeader />
            <main className="grow">
              {children}
            </main>
          </div>
        </div>
      </CurrencyProvider>
    </AppProvider>
  )
}
