import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { CheckCircle2 } from 'lucide-react'
import Header from '@/sections/Header'
import Footer from '@/sections/Footer'
import { CATEGORIES } from '@/data/events'

const inputCls =
  'h-11 w-full rounded-xl border border-stone-200 bg-white px-4 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-400'
const labelCls = 'mb-1.5 block text-[13px] font-medium text-stone-600'

export default function Submit() {
  const [isFree, setIsFree] = useState(false)
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] text-stone-900">
      <Header />

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-14 sm:pt-20">
        {sent ? (
          <div className="rounded-3xl border border-stone-200/80 bg-white p-10 text-center shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
            <h1 className="font-display mt-5 text-3xl italic text-stone-900">
              Thanks — it&rsquo;s in the queue
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-stone-500">
              A human reads every submission. If it&rsquo;s a fit for the board,
              you&rsquo;ll see it listed within a day or two — we&rsquo;ll email you
              when it&rsquo;s live.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Link
                to="/"
                className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Back to events
              </Link>
              <button
                onClick={() => setSent(false)}
                className="rounded-full border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-600 transition hover:border-stone-300 hover:text-stone-900"
              >
                Submit another
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="font-display text-[44px] leading-[1.05] text-stone-900 sm:text-6xl">
              Put your event <em className="italic">on the board</em>
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-stone-500">
              Listing is free. Tell us what&rsquo;s happening and we&rsquo;ll take it
              from there — most events go live within 48 hours.
            </p>

            <form onSubmit={onSubmit} className="mt-10 space-y-5">
              <div>
                <label htmlFor="title" className={labelCls}>
                  Event title
                </label>
                <input
                  id="title"
                  required
                  placeholder="e.g. Vinyl Night at The Foxhole"
                  className={inputCls}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="category" className={labelCls}>
                    Category
                  </label>
                  <select id="category" required className={inputCls} defaultValue="">
                    <option value="" disabled>
                      Choose one…
                    </option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="venue" className={labelCls}>
                    Venue
                  </label>
                  <input id="venue" required placeholder="Where is it?" className={inputCls} />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className={labelCls}>
                    Date
                  </label>
                  <input id="date" type="date" required className={inputCls} />
                </div>
                <div>
                  <label htmlFor="time" className={labelCls}>
                    Start time
                  </label>
                  <input id="time" type="time" required className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Price</label>
                <div className="flex items-center gap-3">
                  <div className="flex rounded-full border border-stone-200 bg-white p-1">
                    {[
                      { v: false, l: 'Paid' },
                      { v: true, l: 'Free' },
                    ].map((o) => (
                      <button
                        key={o.l}
                        type="button"
                        onClick={() => setIsFree(o.v)}
                        className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition ${
                          isFree === o.v
                            ? 'bg-stone-900 text-white'
                            : 'text-stone-500 hover:text-stone-900'
                        }`}
                      >
                        {o.l}
                      </button>
                    ))}
                  </div>
                  {!isFree && (
                    <div className="relative w-28">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-stone-400">
                        $
                      </span>
                      <input
                        type="number"
                        min={1}
                        required={!isFree}
                        placeholder="20"
                        className={`${inputCls} pl-8`}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="ticketUrl" className={labelCls}>
                  Ticket or RSVP link <span className="text-stone-400">(optional)</span>
                </label>
                <input
                  id="ticketUrl"
                  type="url"
                  placeholder="https://…"
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="description" className={labelCls}>
                  Description
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  placeholder="What should people expect? Who's it for? Anything they should bring?"
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-400"
                />
              </div>

              <div>
                <label htmlFor="email" className={labelCls}>
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="So we can reach you with questions"
                  className={inputCls}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-stone-900 py-3.5 text-sm font-semibold text-white transition hover:bg-stone-700"
              >
                Submit for review
              </button>
              <p className="text-center text-xs text-stone-400">
                Demo form — submissions aren&rsquo;t stored anywhere.
              </p>
            </form>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}
