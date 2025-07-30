export const metadata = {
  title: 'Sign Up - BuildAIStartups.com',
  description: 'Page description',
}

import Link from 'next/link'
import AuthLogo from '../auth-logo'

export default function SignUp() {
  return (
    <>
      {/* Page header */}
      <div className="max-w-3xl mx-auto text-center pb-12">
        {/* Logo */}
        <AuthLogo />
        {/* Page title */}
        <h1 className="h2 bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 via-slate-200 to-slate-200/60 dark:from-slate-800/70 dark:via-slate-100 dark:to-slate-800/70">
          Create your free account
        </h1>
      </div>

      {/* Form */}
      <div className="max-w-sm mx-auto">

        <form>
