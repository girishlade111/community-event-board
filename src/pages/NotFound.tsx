import { Link } from 'react-router'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf9f7] text-stone-900">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-24 text-center">
        <p className="font-display text-7xl italic text-stone-900">404</p>
        <p className="font-display mt-2 text-2xl italic text-stone-900">
          This page left early
        </p>
        <p className="mt-3 max-w-sm text-sm text-stone-500">
          Whatever was here isn&rsquo;t anymore — but there&rsquo;s plenty still on.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
        >
          Back to what&rsquo;s on
        </Link>
      </main>
      <Footer />
    </div>
  )
}
