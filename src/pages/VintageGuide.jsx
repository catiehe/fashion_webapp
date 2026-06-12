import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const stores = [
  {
    name: 'The Archive',
    neighborhood: 'SoHo',
    style: '90s Minimalist',
    score: '9.4',
    description: 'The premier destination for museum-quality pieces from the heyday of Helmut Lang and Prada.',
    tags: [
      { label: 'Archival', filled: false },
      { label: 'Vintage', filled: true },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7u1UIy9GcJRxTt4Kav-miV1O_GHHMZIXMHhN6SrCVRtAkJto5cJzZx9DbUlHYGBOm-oLLFPTz9Ocww83yVUu8wNIkL2PraYia7hBcS_h4O_3tI8DRmeaxonwIEjpqvKOJhT8X5MX6_RQ5PNHggq7WBsxjvbIWigxhD9wxQ0qQkXHCA95z0pQWMIzZmMJfmOYYjbo_Qx0sX7jQO1k3_Y1j0yJYjrGFaHLlBP4PaJBDL4kz8If0ncauLr7jvaNJrhlzPTmTKOaOwFo',
    link: '/store/Acne%20Studio',
  },
  {
    name: 'James Veloria',
    neighborhood: 'Lower East Side',
    style: 'Avant-Garde',
    score: '9.8',
    description: 'A high-energy curation of colorful, playful, and rare designer finds from the Y2K era.',
    tags: [
      { label: 'Vibrant', filled: false },
      { label: 'Vintage', filled: true },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArynvbZcgTGZhDLRCdv9ophZiSJqIDNVp05w79kuWzTds5-5zjFg4KHuirchsAsfthe-pYtdiC9jDj-Dx5NtmE5h2JIxSCH8sRHdGX6xFf-pBIABlx_FHUjD7CWn5YRg_IAzhPkQYL3bMFCk0uo7yC7XKxrBVyyvUw4fcmcH0PwAD_fc8c5dbAeUk7eZimIsxyECCkpv6HIkMXdHzEv5qmrvVfVTT_KkbcJazh1fardHHTXlBwdLvltl4uTNy-r0gQ2q0dB093-tI',
    link: '/vintage',
  },
  {
    name: 'Desert Island',
    neighborhood: 'Williamsburg',
    style: 'Eclectic',
    score: '8.9',
    description: 'Carefully sourced Americana and unique silhouettes for the modern creative professional.',
    tags: [
      { label: 'Americana', filled: false },
      { label: 'Vintage', filled: true },
    ],
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDldyKS32asskRUOpWuR9YKHQvHbWf2myLPNgETbQUwylALylvPks17zR_e-XFSpDnVU_71khpEHzrBL1pO004LYkS0BwIfQcwsL2A2lS46o31O6lwHID7mbficFWeJSxDajxZ7Y3MqH_dCaqowR6OE3bOLvdLCekdeRJkp1_HQPghpr5e_vrXQMPydf-kl3oeL5k6j0kQLtY27sSUM9CCNhkWTvGO3wwWYtHJVwmIbMTeEnFNTxY6zOmLHUMAvZG3t2_h9lWchP2k',
    link: '/vintage',
  },
]

export default function VintageGuide() {
  const [email, setEmail] = useState('')

  return (
    <>
      <Navbar />

      <main className="max-w-container-max mx-auto px-6 md:px-edge-margin">
        {/* Editorial Intro */}
        <header className="mt-24 mb-12">
          <span className="font-label-caps text-label-caps text-rich-black/40 uppercase tracking-[0.2em] mb-6 block">
            The Curated Tag
          </span>
          <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-rich-black mb-6">
            Vintage.
          </h1>
        </header>

        {/* Featured Posts */}
        <section className="mb-12">
          <div className="grid grid-cols-12 gap-gutter">
            {/* Main feature */}
            <div className="col-span-12 md:col-span-7 group cursor-pointer mb-12 md:mb-0 relative">
              <div className="relative z-10 aspect-[4/3] overflow-hidden mb-8 rounded-lg">
                <img
                  className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                  alt="Vintage designer archive in SoHo"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3ymPt6iOTw-FWE-d-7zZB_6zrAXVjcYxIjNv43rY0NmR98HUuJ2z-UCTa00HH05ugra9jpv_xmanvLBwKU7ft0PQ5YpIM20A3n1lurd59HvvLEtHT8qcSwmOel03q794pB9G8qW-w5N0U22tG6gwoCrhsNqaJyiD0yUbP7NVRl_lj3I_YnjqB3yu35cGCykCkm91GimtpLKL1I7b6a6sZHJRARxZzdORZLyuqyAhNkWxyqXGJ2XLxCAMCGD435z3YaneXE7Yiay8"
                />
              </div>
              <div className="relative z-10">
                <span className="font-label-caps text-label-caps text-rich-black/40 uppercase mb-3 block">Editorial Feature</span>
                <h3 className="font-headline-md text-3xl md:text-4xl mb-4 max-w-xl text-rich-black">
                  The 1996 Silhouette: Why archival Gaultier is dominating the Bowery
                </h3>
                <p className="font-body-lg text-rich-black/70 max-w-lg">
                  Exploring the resurgence of Jean Paul Gaultier's mesh prints and the dealers keeping the aesthetic alive in the 212.
                </p>
              </div>
            </div>

            {/* Side column */}
            <div className="col-span-12 md:col-span-5 flex flex-col pt-12 md:pt-0">
              <div className="md:pl-16 space-y-24">
                <div className="group cursor-pointer">
                  <img
                    className="w-full aspect-video md:aspect-square object-cover mb-6 grayscale rounded-lg"
                    alt="Vintage leather patina"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN0lmbFuHPYCgcUyxWX3zpz4cIkehQR4OdMoNsGQNhNmpgUH3XWLtK-EwcuRXs9m2L3Mx2zRhsiMj4AinjM3L9HX1AjO_TCJsMA2id7fA8G-w1v6y3BZLbnZlWruPnzug-mkTelp9TYV29hZ9t5AaHFd7xKYXURojNDVykxYT6k6RTZPfEqP3bk69rufrb7-SWzt1V5G6HQlEut83_lfXdGuM65CjRLgNoY2srS2KyygEh2-3hpRZe9jdZvx9n2sM5OAABRPBpdRI"
                  />
                  <h4 className="font-headline-md text-2xl mb-2 text-rich-black">
                    The Patina Report: Leather as an Investment
                  </h4>
                  <span className="font-label-caps text-[10px] text-rich-black/40 uppercase">Curation Insight</span>
                </div>
                <div className="group cursor-pointer">
                  <div className="bg-rich-black p-10 text-pure-white mb-6 rounded-lg">
                    <p className="text-2xl italic font-light leading-snug mb-6">
                      "True style is a conversation with the past that never ends."
                    </p>
                    <p className="font-label-caps text-label-caps">— James Veloria</p>
                  </div>
                  <h4 className="font-headline-md text-2xl text-rich-black">
                    Inside the Personal Collection of NYC's Top Curator
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Store Directory */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-rich-black pb-8">
            <h2 className="font-headline-lg text-4xl md:text-headline-lg uppercase tracking-tighter text-rich-black">
              The Vintage Directory
            </h2>
            <div className="flex gap-8 mt-4 md:mt-0">
              <button className="font-label-caps text-label-caps text-rich-black/40 hover:text-rich-black transition-colors">
                Sort by Neighborhood
              </button>
              <button className="font-label-caps text-label-caps text-rich-black border-b-2 border-rich-black pb-1">
                Grid View
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-gutter">
            {stores.map((store) => (
              <Link
                key={store.name}
                to={store.link}
                className="group bg-pure-white p-6 transition-all duration-300 hover:shadow-xl rounded-lg block"
              >
                <div className="relative mb-8 aspect-[3/4] overflow-hidden rounded-md">
                  <img
                    className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                    alt={store.name}
                    src={store.img}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-headline-md text-2xl font-bold text-rich-black">{store.name}</h3>
                    <span className="font-bold text-sm tracking-widest text-rich-black">{store.score}</span>
                  </div>
                  <p className="font-label-caps text-[11px] text-rich-black/60 flex items-center gap-2">
                    {store.neighborhood}
                    <span className="w-1 h-1 bg-rich-black rounded-full inline-block"></span>
                    {store.style}
                  </p>
                  <p className="font-caption text-caption text-rich-black/70 leading-relaxed">{store.description}</p>
                  <div className="flex gap-2 pt-2">
                    {store.tags.map(({ label, filled }) => (
                      <span
                        key={label}
                        className={`px-3 py-1 text-[10px] font-label-caps uppercase ${
                          filled
                            ? 'bg-rich-black text-pure-white'
                            : 'border border-rich-black/20 text-rich-black/60'
                        }`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-32 border-y border-rich-black/10 text-center mb-12">
          <h2 className="font-headline-xl text-5xl md:text-6xl mb-6 tracking-tighter text-rich-black">
            The Vintage Weekly.
          </h2>
          <p className="font-body-lg text-rich-black/60 mb-12 max-w-2xl mx-auto">
            Get the drop on New York's rarest archival releases before they hit the floor. Curated by our editors, sent every Tuesday.
          </p>
          <form
            className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="flex-1 border-0 border-b border-rich-black bg-transparent focus:ring-0 px-0 py-3 font-body-lg placeholder:text-rich-black/30"
            />
            <button
              type="submit"
              className="bg-rich-black text-pure-white font-label-caps text-label-caps px-12 py-4 uppercase tracking-[0.2em] hover:bg-rich-black/80 transition-colors rounded-full"
            >
              Join
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full mt-32 bg-rich-black text-pure-white border-t border-rich-black">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter px-6 md:px-edge-margin py-20 max-w-container-max mx-auto">
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-headline-md text-2xl font-bold mb-6">NYC Style Guide</h3>
            <p className="font-caption text-pure-white/60 max-w-[200px]">© 2024 NYC Style Guide. Curated in Manhattan.</p>
          </div>
          <div className="flex flex-col gap-5">
            <span className="font-label-caps text-label-caps text-pure-white/40 mb-2 uppercase tracking-widest">Neighborhoods</span>
            {['SoHo', 'West Village', 'Lower East Side'].map((n) => (
              <a key={n} href="#" className="font-caption text-pure-white/80 hover:text-pure-white transition-colors">{n}</a>
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <span className="font-label-caps text-label-caps text-pure-white/40 mb-2 uppercase tracking-widest">Styles</span>
            <a href="#" className="font-caption text-pure-white/80 hover:text-pure-white transition-colors">Quiet Luxury</a>
            <a href="#" className="font-caption text-pure-white font-bold underline decoration-2 underline-offset-4">Vintage</a>
            <a href="#" className="font-caption text-pure-white/80 hover:text-pure-white transition-colors">Minimalist</a>
          </div>
          <div className="flex flex-col gap-5">
            <span className="font-label-caps text-label-caps text-pure-white/40 mb-2 uppercase tracking-widest">Connect</span>
            {['Instagram', 'About Us', 'Contact'].map((item) => (
              <a key={item} href="#" className="font-caption text-pure-white/80 hover:text-pure-white transition-colors">{item}</a>
            ))}
          </div>
        </div>
        <div className="w-full overflow-hidden pb-10 opacity-[0.03] select-none pointer-events-none">
          <div className="font-headline-xl text-[20vw] font-bold leading-none whitespace-nowrap text-pure-white">VINTAGE NYC</div>
        </div>
      </footer>
    </>
  )
}
