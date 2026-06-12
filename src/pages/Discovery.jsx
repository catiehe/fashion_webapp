import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const cards = [
  {
    id: 1,
    neighborhood: 'NOLITA',
    title: 'The Best Vintage in Nolita',
    description: "A curated walk through the backstreets where the city's best archival pieces are hiding in plain sight.",
    tags: ['# ARCHIVAL', '# 90S MINIMALISM'],
    aspect: 'aspect-[3/4]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6AcFy9RlvUWOgC2exke3BzASEQx8Oyjgj6AJGdvRhMOJ9chdcsE1groMO-NTp_l_crpGHPW0CDT_MGc1Cehut0BNgu39VXycsmVnBPH-5Qb75ybij9rKGkuy3i8ryxagkI8WK1rfP8DUlgTUXoUfDjvhedEfxWbZZX7b7_1td_kF9ZUZaUJfmL8Idb0aroWtauaspN5YPrj24L5a9My75_0UetatAQTUd7oZl_fcD11X4hlBpqLPOal7vHluGxqN-I0B0008I_lM',
    link: '/vintage',
  },
  {
    id: 2,
    neighborhood: 'WEST VILLAGE',
    title: 'Quiet Luxury Finds',
    description: 'Inside the hidden atelier where the fabrics do the talking. No logos, just craftsmanship.',
    tags: ['# CASHMERE', '# BESPOKE'],
    aspect: 'aspect-square',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDN9NDKf_egDEKUN9-mu416qBMWpvwCzMAeW5mnWY6-2i2fN4NflUiAy29wJNjLfrXwxQ4i1-z0__-EbOyKr-zWmb1A2ysK-8Jg20EfPbWNHH0bVwqkxhJj6qjGUVS_4tfphIGDkhxmxv8Bsvg5Wg5HriSefKw-SfM72YxVJ_1WsT6P5A3nvrq4RJuf3-pOWW_EYGLYtQ18q-iEYvItkNRFonCoWJG-yMYli9YgfNG6Zg_KSpkR46KZCXWeDg8EaFxmmz5T3aSKnRc',
    link: '/store/Acne%20Studio',
  },
  {
    id: 3,
    neighborhood: 'LOWER EAST SIDE',
    title: 'The LES Gallery Haul',
    description: "Breaking down the wardrobe of the art world's inner circle. Edgy, dark, and tailored.",
    tags: ['# AVANT-GARDE'],
    aspect: 'aspect-[4/5]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvPdaO5OywTKFL6oKdGZfKcD3hj9rtDNAoErQjiskQKRL-ZAVCNmUeU07ChhqN5xzuyX7VTEf6FZ02SQIUlEllPQWI7dHR3Qn0AqMjVHVhiHna9TiMuQstWSLO3wjdcrCeVBKztOVC6XvQj3LlPGvcmN-4ogf45ibFIxfdBM3im0yRtzCjSULg91JBRgScWh0OItfTE_ggLijPBj00OWRNHUqBxUD49zPDxtsWvEGmNB5mWIyOJTYsFhU-hMdr3Mtz6JT-w8io',
    link: '/vintage',
  },
  {
    id: 4,
    neighborhood: 'UPPER EAST SIDE',
    title: 'Madison Ave Pop-up',
    description: 'A limited-run exhibition of leather goods that marries French heritage with NYC grit.',
    tags: [],
    aspect: 'aspect-[3/2]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCauZc4WUewIj_3CzpbU26DWUMe7G2R43MaaUgT-xLL4PmhxP2ceTx0U0K2gz3E74VuIXYIY0pct8ixE_9uEX6SW9x5ZuuENXuQqe0vlYx-r3PmX40yv5SRgSe4hTUUN5Ja9aTdA8ezpks4XNRJsj30oLeyN5i8tIQDTR7lYq26gb9jvM9YAzpu9pf4gUEOEdUhuTmR4U6qC6qBjlbWrdTIt3BYg_EbwTgsiFkfasIH04x9sO-yDbX5N-5JQt4uV7nT7iStkAXlNgY',
    link: '/map',
  },
  {
    id: 5,
    neighborhood: 'WILLIAMSBURG',
    title: 'Brooklyn Concept Ateliers',
    description: 'Why the new center of fashion gravity has shifted across the bridge.',
    tags: [],
    aspect: 'aspect-video',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcgUnj4fa9L2HvBc6LhWzQxZYUIbR8oFpcs6NPDC1VglX6NBKOAPXCuEgry_N7igWUWzcekloWJD5rcrKzxzDAtzz7EUmb8Mmakj-O3f1kMjVHVhiHna9TiMuQstWSLO3wjdcrCeVBKztOVC6XvQj3LlPGvcmN-4ogf45ibFIxfdBM3im0yRtzCjSULg91JBRgScWh0OItfTE_ggLijPBj00OWRNHUqBxUD49zPDxtsWvEGmNB5mWIyOJTYsFhU-hMdr3Mtz6JT-w8io',
    link: '/store/Acne%20Studio',
  },
  {
    id: 6,
    neighborhood: 'CHELSEA',
    title: 'Chelsea: The Silk List',
    description: 'A deep dive into the luxury textures dominating the High Line walkways.',
    tags: [],
    aspect: 'aspect-[3/4]',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcZ6tUdpwyL5WvTNDFZ2W1dblI22qlHljAtPFwRsvDskDwDTZpKHcze1XmELUV0HEpu6tgOSXvhiRQ_nCbRQBxitGH0bs0uFalguvV2V3HPSM9DeG7lGXHU3_kyizj0-_hD3M0PlPkDydkkIqhsyIvQJkln_7lb7TU4x1X-3CiKyozcQvJKURm6ZxVJqbMTxJppwKFpug9cATYvH5NsusuRw6Me0Af1VM9nSZXgDf4PeTiQkkEwKkqxKjyjYp4Ot9dstuITIN2w08',
    link: '/vintage',
  },
]

export default function Discovery() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-12')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.masonry-item').forEach((el) => {
      el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-12')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />

      <main className="max-w-container-max mx-auto px-edge-margin mt-24 mb-60">
        {/* Hero */}
        <section className="mb-48 grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-9">
            <span className="font-label-caps text-rich-black/60 uppercase block mb-8 ghost-typography !opacity-40">
              Edition 01 — Fall 2024
            </span>
            <h1 className="font-helvetica font-light text-[80px] md:text-[140px] leading-[0.9] tracking-tight uppercase asymmetric-typography text-rich-black">
              The pulse of <span className="font-bold">New York</span>, filtered for the discerning.
            </h1>
          </div>
          <div className="md:col-span-3 flex items-end">
            <p className="font-body-lg text-rich-black leading-relaxed opacity-80 border-l border-rich-black/10 pl-8 pb-4">
              Discover the intersection of archival vintage, emerging ateliers, and the architectural havens of the five boroughs.
            </p>
          </div>
        </section>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {cards.map((card) => (
            <div
              key={card.id}
              className="masonry-item group cursor-pointer bg-pure-white p-6 rounded-lg transition-transform duration-500 hover:-translate-y-2"
            >
              <Link to={card.link}>
                <div className={`relative overflow-hidden mb-8 ${card.aspect}`}>
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                  />
                  <div className="absolute bottom-6 left-6">
                    <span className="px-4 py-2 bg-rich-black text-ice-blue text-[10px] font-label-caps uppercase">
                      {card.neighborhood}
                    </span>
                  </div>
                </div>
                <div className="px-2">
                  <h3 className="font-helvetica font-bold text-3xl uppercase leading-none mb-4 group-hover:underline decoration-1 text-rich-black">
                    {card.title}
                  </h3>
                  <p className="font-body-lg text-rich-black/70 mb-6 text-sm">{card.description}</p>
                  {card.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {card.tags.map((tag) => (
                        <span key={tag} className="text-[11px] font-bold uppercase tracking-widest text-rich-black/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-48 text-center">
          <button className="px-16 py-6 bg-rich-black text-white font-label-caps uppercase tracking-[0.2em] text-xs hover:bg-rich-black/90 transition-all rounded-full">
            Load More Content
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-rich-black/5 bg-rich-black py-32 text-white">
        <div className="max-w-container-max mx-auto px-edge-margin">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-24 mb-32">
            <div className="col-span-2">
              <h2 className="font-helvetica font-bold text-[120px] uppercase tracking-tighter mb-8 leading-none opacity-10 whitespace-nowrap overflow-hidden">
                NYC STYLE GUIDE
              </h2>
              <p className="font-body-lg text-white/60 max-w-md mt-12">
                The ultimate curator for the fashion-forward traveler and resident. Manhattan, Brooklyn, Queens — curated with surgical precision.
              </p>
            </div>
            <div>
              <h4 className="font-label-caps text-[11px] uppercase tracking-widest text-white/40 mb-10">NEIGHBORHOODS</h4>
              <ul className="space-y-6">
                {['SoHo', 'West Village', 'Lower East Side'].map((n) => (
                  <li key={n}>
                    <a href="#" className="font-helvetica text-lg uppercase font-bold hover:opacity-50 transition-opacity">
                      {n}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-label-caps text-[11px] uppercase tracking-widest text-white/40 mb-10">EDITORIAL</h4>
              <ul className="space-y-6">
                {['About', 'Newsletter', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-helvetica text-lg uppercase font-bold hover:opacity-50 transition-opacity">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="font-helvetica text-xs uppercase tracking-widest text-white/40">
              © 2024 NYC Style Guide. Editorial Precision System.
            </p>
            <div className="flex gap-12">
              {['Privacy', 'Terms', 'Instagram'].map((item) => (
                <a key={item} href="#" className="font-helvetica text-xs uppercase font-bold">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Map Button */}
      <Link
        to="/map"
        className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-rich-black text-white px-10 py-4 rounded-full flex items-center gap-4 shadow-xl hover:scale-105 transition-transform z-50"
      >
        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
          map
        </span>
        <span className="font-label-caps text-[11px] tracking-[0.2em] uppercase font-bold">Map Explorer</span>
      </Link>
    </>
  )
}
