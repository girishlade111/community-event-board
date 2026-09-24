export type Category =
  | 'Music'
  | 'Arts & Theatre'
  | 'Food & Drink'
  | 'Sports'
  | 'Community'
  | 'Family'
  | 'Nightlife'
  | 'Markets'

export interface LocalEvent {
  id: string
  title: string
  category: Category
  /** ISO date string, e.g. 2026-07-25 */
  date: string
  time: string
  venue: string
  address: string
  /** 0 means free */
  price: number
  description: string
  ticketUrl: string
  featured?: boolean
}

export interface CategoryMeta {
  label: Category
  /** small indicator dot color */
  dot: string
  /** cover artwork path */
  cover: string
}
