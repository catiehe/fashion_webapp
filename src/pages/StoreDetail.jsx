import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getStore, getAllStores } from '../sanity'

const nearbyStores = [
  {
    name: 'Object & Found',
    type: 'Curation · Luxury',
    distance: '0.2 mi',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP9Cm6Gl8z1NX3rkIbZ8AqaANwhJqXYTQL7lpLcI4o2FFKG-enMLs9G3Ui3gdvdAHY4rDQRb76Gwb7PVoGaUomzEFZ98k0nkQv3mlBK5O9RVTMFgiqm-xgoDKGaiLwNq3Ykdh_BJUKXfBZeP9GtKHmXhDgtwYpXg4MijEWy4LDspRv7c0pm2Fag1We9b3vCT20om1fSjekop1t4kgKqg4lauvGEQoyQO4fZS6ObEHCt5KFCIr-QjN30c-4_sgGh8FffW3QrlsbyS8',
  },
  {
    name: 'The Totem',
    type: 'Minimalist · Designer',
    distance: '0.4 mi',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBn7fpKWlnig44-aYbWWnK-H3ay62ly7_bkXXHury-7Io1RRIN7LMoWQhP22360QC3_y4pdC4cUwrz6Y-r3aPvvNooEQd1DA1ekRZYTHmzzb5NMW5VajqNDk4ZVHMf08u8FM6xJhvU8E_4kYYJvxczMvD_HeETUEgWxqi8NTutVBfTZce8V4oljySX3Fs8k3n_WtEduBv3GpxU11MsbIi3On0H1YDbCrURzfsYmqh8',
  },
  {
    name: 'Resale Lab',
    type: 'Vintage · Rare',
    distance: '0.5 mi',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTR5AEb08ILoDdOjydVAYk0bfdPprIDTsSm58cRzr9c0sMPi9gldTy42dfH0YJDXW405N0TgAfbiVnctGJI1KLi26Qk1QMylZnI5vOaRhmYimh7VGUENhvKNTkB_TcsRygbr7L7_CTGY_twQ2hiCN1HEwiwH1Om5uq4BfjUaumx1v2tlAsmhZBDxOic4R_y6B5O9EZu6QrnoIN2O5H47aZ10NS4-C9Gim1Kk38j-HrGH37I-hWHclpqeCUgC-0K6wn29y7mpB7sVgb4',
  },
]

export default function StoreDetail() {
  const { storeName } = useParams()
  const navigate = useNavigate()
  const [store, setStore] = useState(null)
  const [loading, setLoading] = useState(true)
  const [embeds, setEmbeds] = useState([])
  const [allStores, setAllStores] = useState([])

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const storeData = await getStore(storeName)
        setStore(storeData)

        if (storeData?.socialPosts) {
          setEmbeds(storeData.socialPosts)

          // Reload TikTok embed script after data loads
          setTimeout(() => {
            if (window.tiktok && window.tiktok.embed) {
              window.tiktok.embed.process()
            }
          }, 500)
        }
      } catch (error) {
        console.error('Error fetching store:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStore()

    // Load TikTok's embed script
    if (!window.tiktok) {
      const script = document.createElement('script')
      script.src = 'https://www.tiktok.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [storeName])

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const stores = await getAllStores()
        setAllStores(stores || [])
      } catch (error) {
        console.error('Error fetching stores:', error)
      }
    }
    fetchStores()
  }, [])

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
    document.querySelectorAll('.reveal-section').forEach((el) => {
      el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-12')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />

      <main className="max-w-container-max mx-auto overflow-hidden">
        {/* Store Selector Dropdown */}
        <div className="px-edge-margin mt-8 flex items-center gap-4">
          <label className="font-label-caps text-label-caps uppercase tracking-widest text-rich-black text-sm">
            Select Store:
          </label>
          <select
            value={storeName || ''}
            onChange={(e) => {
              if (e.target.value) {
                navigate(`/store/${e.target.value}`)
              }
            }}
            className="px-4 py-2 border border-rich-black/20 bg-pure-white rounded-lg font-body-lg text-rich-black cursor-pointer hover:border-rich-black/40 transition-colors"
          >
            <option value="">Choose a store...</option>
            {allStores.map((s) => (
              <option key={s._id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        {/* Hero Gallery */}
        <section className="reveal-section px-edge-margin mt-12 relative">
          <div className="absolute -left-12 top-0 select-none pointer-events-none z-0">
            <span className="text-[300px] ghost-text leading-none uppercase font-bold">01</span>
          </div>
          <div className="grid grid-cols-12 gap-gutter relative z-10">
            <div className="col-span-12 md:col-span-8 grid grid-cols-8 gap-4">
              <div className="col-span-5 aspect-[4/5] overflow-hidden rounded-xl bg-pure-white">
                <img
                  alt="Boutique Interior"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGys4jeAeA2uhFkgP7iTyxLqS1HyI2r427fN_RDrzCBowx6DYiQU-xxqcOikR5LzYomt28OzkZWJGO_rudS3EYkCP3x8OUpAE86PmRsBAQ40EZKJmx0wg5FNk46IVNxdC5ElsVC5gHHR3rIO_myVUqGo5avAzMWIHC0unJEMTpzbPgbWnvTei8A4CwRb0rwjCa6PUyJMBkbXKROeBjtBqpl6aUYmLWTBk5eaWCBkupV1L1ZJbpsmXfldjQH-aMs2XINsfl5gciidg"
                />
              </div>
              <div className="col-span-3 space-y-4">
                <div className="aspect-square overflow-hidden rounded-xl bg-pure-white">
                  <img
                    alt="Metallic Sculpture Coil"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN9NDKf_egDEKUN9-mu416qBMWpvwCzMAeW5mnWY6-2i2fN4NflUiAy29wJNjLfrXwxQ4i1-z0__-EbOyKr-zWmb1A2ysK-8Jg20EfPbWNHH0bVwqkxhJj6qjGUVS_4tfphIGDkhxmxv8Bsvg5Wg5HriSefKw-SfM72YxVJ_1WsT6P5A3nvrq4RJuf3-pOWW_EYGLYtQ18q-iEYvItkNRFonCoWJG-yMYli9YgfNG6Zg_KSpkR46KZCXWeDg8EaFxmmz5T3aSKnRc"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden rounded-xl bg-pure-white">
                  <img
                    alt="Titanium Ring Detail"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcZ6tUdpwyL5WvTNDFZ2W1dblI22qlHljAtPFwRsvDskDwDTZpKHcze1XmELUV0HEpu6tgOSXvhiRQ_nCbRQBxitGH0bs0uFalguvV2V3HPSM9DeG7lGXHU3_kyizj0-_hD3M0PlPkDydkkIqhsyIvQJkln_7lb7TU4x1X-3CiKyozcQvJKURm6ZxVJqbMTxJppwKFpug9cATYvH5NsusuRw6Me0Af1VM9nSZXgDf4PeTiQkkEwKkqxKjyjYp4Ot9dstuITIN2w08"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
              <div className="bg-pure-white p-10 rounded-xl">
                <h2 className="font-headline-md text-headline-md leading-tight mb-6 text-rich-black italic">
                  "A temple to the ephemeral beauty of 90s minimalism."
                </h2>
                <span className="font-label-caps text-label-caps opacity-40 uppercase tracking-widest text-xs">
                  — THE ARCHIVE FOUNDER
                </span>
              </div>
              <div className="flex-grow grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden rounded-xl bg-pure-white">
                  <img
                    alt="Silver Ribbons"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7u1UIy9GcJRxTt4Kav-miV1O_GHHMZIXMHhN6SrCVRtAkJto5cJzZx9DbUlHYGBOm-oLLFPTz9Ocww83yVUu8wNIkL2PraYia7hBcS_h4O_3tI8DRmeaxonwIEjpqvKOJhT8X5MX6_RQ5PNHggq7WBsxjvbIWigxhD9wxQ0qQkXHCA95z0pQWMIzZmMJfmOYYjbo_Qx0sX7jQO1k3_Y1j0yJYjrGFaHLlBP4PaJBDL4kz8If0ncauLr7jvaNJrhlzPTmTKOaOwFo"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-xl bg-pure-white">
                  <img
                    alt="Detail Shot"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDalh5ifSrU1j-4rwjOd2XcqLZm4p8WiQ8hQZyQtvraOIeig11q0dzsenPRFNbPfoYsjDr9ebJAJ3xjAPOqrRfztnoZUVB1-nDOuar3Kte1LcEj_NvP7ByHuo6w6b5EUGJREKDzW0D6MYmn8U24_saxCdDAFewJoX7ZO-3WYiaadAUgox5heTm1QXhzYKTNzunf7zDr8N5qs7oPW0r9Zt8QoAkRA7HDCl3FiJJ1Jd3Z1Q_DuTUsB0LFTq63_joSyX8S_ula8gunNHo"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Store Profile */}
        <section className="reveal-section px-edge-margin mt-section-gap">
          <div className="grid grid-cols-12 gap-gutter items-start border-t border-rich-black/10 pt-16">
            {store && (
              <>
                <div className="col-span-12 md:col-span-7">
                  <div className="flex gap-4 mb-12">
                    <span className="px-4 py-1 border border-rich-black/20 text-label-caps uppercase tracking-tighter text-rich-black">02</span>
                    <span className="px-4 py-1 bg-pure-white text-label-caps uppercase tracking-tighter text-rich-black rounded-full text-xs">{store.neighborhood}</span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl mb-12 uppercase text-rich-black">{store.name}</h1>
                  <p className="font-headline-md text-3xl max-w-3xl leading-relaxed text-rich-black/80">
                    {store.description || 'Curated boutique experience in NYC'}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-4 md:col-start-9 space-y-16 mt-12 md:mt-0">
                  <div className="border-l-2 border-rich-black pl-8 py-2">
                    <p className="font-label-caps text-label-caps opacity-40 uppercase mb-4 tracking-widest text-rich-black">Address</p>
                    <p className="font-body-lg text-2xl text-rich-black">
                      {store.address}
                    </p>
                  </div>
                  <div className="border-l-2 border-rich-black pl-8 py-2">
                    <p className="font-label-caps text-label-caps opacity-40 uppercase mb-4 tracking-widest text-rich-black">Hours</p>
                    <p className="font-body-lg text-2xl text-rich-black">{store.hours || 'Daily: 11:00 AM — 7:00 PM'}</p>
                  </div>
                  <button className="w-full bg-rich-black text-pure-white py-6 rounded-full font-label-caps uppercase tracking-widest hover:opacity-90 transition-opacity text-lg">
                    Request Appointment
                  </button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Editorial */}
        <section className="reveal-section px-edge-margin mt-section-gap grid grid-cols-12 gap-gutter relative">
          <div className="absolute -right-24 top-0 select-none pointer-events-none z-0">
            <span className="text-[350px] ghost-text uppercase leading-none font-bold">03</span>
          </div>
          <div className="col-span-12 md:col-span-6 space-y-12 py-12 relative z-10">
            <h3 className="font-label-caps text-label-caps uppercase tracking-[0.3em] flex items-center gap-6 text-rich-black">
              <span className="w-20 h-px bg-rich-black inline-block"></span>
              Field Notes
            </h3>
            <div className="font-body-lg text-2xl leading-relaxed text-rich-black/70 space-y-10 max-w-xl">
              <p>
                Walking into The Archive is less like entering a retail space and more like stepping into a gallery of fashion history. The curation here is surgical—focused predominantly on the 1990s and early 2000s era of Antwerp Six and Japanese minimalism.
              </p>
              <p>
                The staff possesses an encyclopedic knowledge of fabric compositions and collection years, often identifying a piece's provenance before you've even touched the tag. It's a quiet space; the high ceilings of the SoHo loft absorb the city's frantic hum.
              </p>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 bg-rich-black text-pure-white p-16 flex flex-col justify-between rounded-xl relative z-10">
            <div>
              <h3 className="font-label-caps text-label-caps uppercase tracking-[0.4em] mb-20 opacity-40">The Metric</h3>
              <div className="divide-y divide-pure-white/10">
                {[
                  { label: 'Vibe', score: '9.5', color: '' },
                  { label: 'Range', score: '8.0', color: '' },
                  { label: 'Discovery', score: '10.', color: 'text-ice-blue' },
                ].map(({ label, score, color }) => (
                  <div key={label} className="flex justify-between items-baseline py-8 group border-b border-pure-white/10">
                    <span className={`font-label-caps text-label-caps opacity-60 uppercase ${color}`}>{label}</span>
                    <span className={`font-headline-lg text-8xl transition-transform group-hover:scale-105 ${color}`}>{score}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-20 font-caption italic opacity-40 text-sm">
              *Scored based on proprietary editorial standards for authenticity and rarity.
            </p>
          </div>
        </section>

        {/* What Creators Are Saying */}
        <section className="reveal-section px-edge-margin mt-section-gap relative">
          <h3 className="font-label-caps text-label-caps uppercase tracking-[0.3em] mb-16 text-rich-black">
            What Creators Are Saying
          </h3>
          <div className="grid grid-cols-12 gap-gutter">
            {embeds.map((embed, idx) => (
              <div key={idx} className="col-span-12 md:col-span-4 bg-pure-white rounded-xl overflow-hidden">
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: embed.embedHtml }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Map Interlude */}
        <section className="reveal-section mt-section-gap w-full h-[600px] bg-pure-white relative overflow-hidden grayscale contrast-125">
          <img
            className="w-full h-full object-cover opacity-60"
            alt="Stylized map of SoHo"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAnWeMfqAVzpl5HbGaHBZeegQgdR4TUIgqnbKiYIFFrixN6WOyw2_ugr2s64orBECiDfmCxdp8oFlzIfXm_1u3piKLI5os0xQx6wTZn65M5wB0aMEf2Vf51rc5Zypm9khHwv4TTurYtiz1Kty9F6Use0SQxcOYuzKld3amx9H6mfrMHELkTNFN08EW5W9XVdqfUPg_9K3vrUFuSMmLkkQWz85sug_fNtMmLcR-scpC4ypEMBuLvMgRF5L7qctZARJ0dS6C03kxH1Mc"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-rich-black flex items-center justify-center animate-pulse">
              <div className="w-4 h-4 bg-rich-black rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Nearby Stores */}
        <section className="reveal-section px-edge-margin mt-section-gap mb-section-gap relative">
          <div className="absolute -left-12 -top-12 select-none pointer-events-none z-0">
            <span className="text-[300px] ghost-text uppercase leading-none font-bold">04</span>
          </div>
          <h3 className="font-label-caps text-label-caps mb-24 uppercase tracking-[0.5em] text-center text-rich-black relative z-10">
            Satellite Explorations
          </h3>
          <div className="grid grid-cols-12 gap-gutter relative z-10">
            {nearbyStores.map((store, i) => (
              <div
                key={store.name}
                className={`col-span-12 md:col-span-4 group cursor-pointer bg-pure-white p-6 rounded-xl ${i === 1 ? 'mt-24 md:mt-0' : ''} ${i === 2 ? 'mt-48 md:mt-0' : ''}`}
              >
                <div className="aspect-[3/4] overflow-hidden mb-10 bg-ice-blue rounded-lg">
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    src={store.img}
                    alt={store.name}
                  />
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-label-caps text-sm text-rich-black/40 uppercase mb-2">{store.type}</p>
                    <h4 className="font-headline-md text-3xl uppercase tracking-tighter text-rich-black">{store.name}</h4>
                  </div>
                  <span className="font-label-caps text-rich-black/40">{store.distance}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-rich-black text-ice-blue py-32 border-t border-pure-white/10">
        <div className="max-w-container-max mx-auto px-edge-margin">
          <div className="grid grid-cols-12 gap-gutter items-start mb-32">
            <div className="col-span-12 md:col-span-6">
              <h2 className="font-headline-xl text-8xl uppercase tracking-tighter mb-8 text-pure-white">NYC Style Guide</h2>
              <p className="font-body-lg text-xl opacity-40 max-w-sm">
                Curated precision. Architectural perspective. The definitive guide to New York retail.
              </p>
            </div>
            <div className="col-span-6 md:col-span-2 space-y-6">
              <h5 className="font-label-caps uppercase tracking-widest opacity-30 text-xs text-pure-white">Neighborhoods</h5>
              <ul className="space-y-4 font-label-caps uppercase">
                {['SoHo', 'West Village', 'Lower East Side'].map((n) => (
                  <li key={n}>
                    <a href="#" className="hover:text-pure-white transition-colors">{n}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-6 md:col-span-2 space-y-6">
              <h5 className="font-label-caps uppercase tracking-widest opacity-30 text-xs text-pure-white">Editorial</h5>
              <ul className="space-y-4 font-label-caps uppercase">
                {['The Metric', 'The Archive', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-pure-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 md:col-span-2 space-y-6 md:mt-0 mt-12">
              <h5 className="font-label-caps uppercase tracking-widest opacity-30 text-xs text-pure-white">Social</h5>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-4xl">public</span>
                <span className="material-symbols-outlined text-4xl">share</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center border-t border-pure-white/10 pt-16 font-label-caps opacity-30 text-xs tracking-widest uppercase text-pure-white">
            <span>© 2024 Manhattan Editorial Group</span>
            <span>All Rights Reserved</span>
          </div>
        </div>
      </footer>
    </>
  )
}
