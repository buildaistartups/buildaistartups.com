'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const CurrencyContext = createContext<{ currency: string; setCurrency: (c: string) => void }>({ currency: 'EUR', setCurrency: () => {} })

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState('EUR')

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from('profiles').select('currency').eq('id', user.id).single()
      if (data?.currency) setCurrencyState(data.currency)
    }
    load()
  }, [])

  async function setCurrency(code: string) {
    setCurrencyState(code)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) await supabase.from('profiles').update({ currency: code }).eq('id', user.id)
  }

  return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>
}

export function useCurrency() { return useContext(CurrencyContext) }
