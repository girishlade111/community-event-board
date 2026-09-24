import { Link } from 'react-router'
import { CalendarDays, HeartHandshake, MapPin, Sparkles } from 'lucide-react'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import { EVENTS } from '@/data/events'

const PRINCIPLES = [
  {
    icon: Sparkles,
    title: 'Curated, not crawled',
    body: 'Every listing is read by a person before it goes up. If we wouldn\u2019t tell a friend about it, it doesn\u2019t make the page.',
  },
  {
    icon: HeartHandshake,
    title: 'Community first',
    body: 'Free events, fundraisers and volunteer calls always get top billing — no pay-to-play, no promoted slots.',
  },
  {
    icon: MapPin,
    title: 'Hyperlocal',
    body: 'Riverton only. If you can\u2019t get there on the number 4 bus, you won\u2019t find it here.',
  },
]

export default function About() {
  const freeCount = EVENTS.filter((e) => e.price === 0).length
  const venueCount = new Set(EVENTS.map((e) => e.venue)).size

  return (
    <div className="min-h-screen bg-[#faf9f7] text-stone-900">
      <Header />

      <main className="mx-auto max-w-5xl px-5 pb-24 pt-14 sm:pt-20">
        <p className="text-sm font-medium text-stone-400">About townhall</p>
        <h1 className="font-display mt-3 max-w-3xl text-[44px] leading-[1.08] text-stone-900 sm:text-6xl">
          A town is only as good as <em className="italic">its nights out</em>
        </h1>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-stone-600">
          townhall started as a printed A4 sheet taped to the window of the Inkwell
          Caf&eacute; — ten gigs, one quiz night and a dog show. It turns out people
          really wanted to know what was on. Three years later we&rsquo;re the same
          simple idea, just easier to read on your phone: every event in Riverton,
          curated by people who actually live here.
        </p>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { n: String(EVENTS.length), l: 'events listed right now' },
            { n: String(freeCount), l: 'completely free' },
            { n: String(venueCount), l: 'local venues' },
            { n: '1', l: 'very small team' },
          ].map((s) => (
            <div
              key={s.l}
              className="rounded-3xl border border-stone-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            >
              <p className="font-display text-4xl italic text-stone-900">{s.n}</p>
              <p className="mt-1.5 text-[13px] leading-snug text-stone-500">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Principles */}
        <h2 className="font-display mt-20 text-3xl italic text-stone-900">How we work</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            >
              <p.icon className="h-5 w-5 text-stone-400" />
              <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-stone-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-20 rounded-3xl bg-stone-900 p-8 text-white sm:p-12">
          <h2 className="font-display text-3xl italic sm:text-4xl">Say hello</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-stone-300">
            Running something in Riverton? Spotted an error on a listing? Just want to
            argue about which pub quiz is hardest? We&rsquo;d love to hear from you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/submit"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-stone-200"
            >
              Submit an event
            </Link>
            <a
              href="mailto:hello@townhall.example"
              className="rounded-full border border-stone-600 px-5 py-2.5 text-sm font-medium text-stone-200 transition hover:border-stone-400 hover:text-white"
            >
              hello@townhall.example
            </a>
          </div>
        </div>

        <p className="mt-16 flex items-center gap-2 text-[13px] text-stone-400">
          <CalendarDays className="h-4 w-4" />
          Updated daily by hand. No algorithms were harmed.
        </p>
      </main>

      <Footer />
    </div>
  )
}
