import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import CalendarView from '@/sections/CalendarView'
import { EVENTS } from '@/data/events'

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-[#faf9f7] text-stone-900">
      <Header />

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-14 sm:pt-20">
        <h1 className="font-display max-w-2xl text-[44px] leading-[1.05] text-stone-900 sm:text-6xl">
          The month, <em className="italic">at a glance</em>
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-500">
          Dots mark days with something on — pick one to see what&rsquo;s happening.
        </p>
        <div className="mt-10">
          <CalendarView events={EVENTS} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
