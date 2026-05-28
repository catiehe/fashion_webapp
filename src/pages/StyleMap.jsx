import { useState } from 'react'
import Navbar from '../components/Navbar'

const neighborhoods = ['SoHo', 'West Village', 'Lower East Side']
const aesthetics = ['All Styles', 'Quiet Luxury', 'Vintage', 'Minimalist', 'Avant-Garde']

export default function StyleMap() {
  const [activeNeighborhoods, setActiveNeighborhoods] = useState(['SoHo'])
  const [activeAesthetic, setActiveAesthetic] = useState('All Styles')

  function toggleNeighborhood(name) {
    setActiveNeighborhoods((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  return (
    <div className="bg-pure-white text-rich-black">
      <Navbar />

      <main className="flex flex-col md:flex-row-reverse map-container overflow-hidden">
        {/* Map */}
        <section className="flex-1 relative overflow-hidden bg-ice-blue">
          <iframe
            title="SoHo Style Map"
            allowFullScreen
            className="w-full h-full border-0"
            loading="lazy"
            src={`https://api.mapbox.com/styles/v1/catiehe/cmpj358rd000p01s1ed9w50q0.html?title=view&access_token=${import.meta.env.VITE_MAPBOX_TOKEN}&zoomwheel=true&fresh=true#14/40.7237/-73.9996`}
          />
          <div className="absolute top-10 right-10 flex flex-col gap-px z-20">
            <button className="w-14 h-14 bg-pure-white border border-rich-black flex items-center justify-center hover:bg-ice-blue transition-colors">
              <span className="material-symbols-outlined font-light text-rich-black">add</span>
            </button>
            <button className="w-14 h-14 bg-pure-white border-x border-b border-rich-black flex items-center justify-center hover:bg-ice-blue transition-colors">
              <span className="material-symbols-outlined font-light text-rich-black">remove</span>
            </button>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="w-full md:w-[450px] bg-ice-blue text-rich-black border-r border-rich-black z-30 flex flex-col h-full overflow-y-auto">
          <div className="p-12 flex flex-col h-full">
            <h1 className="text-radical-display font-bold mb-16 uppercase">SOHO</h1>

            <div className="space-y-16">
              {/* Neighborhoods */}
              <div>
                <h3 className="font-label-caps text-[12px] uppercase mb-8 tracking-[0.2em] opacity-60">Neighborhoods</h3>
                <div className="space-y-4">
                  {neighborhoods.map((name) => {
                    const active = activeNeighborhoods.includes(name)
                    return (
                      <label
                        key={name}
                        className={`flex items-center justify-between cursor-pointer group transition-opacity ${active ? '' : 'opacity-30 hover:opacity-100'}`}
                      >
                        <span className="text-2xl font-medium">{name}</span>
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggleNeighborhood(name)}
                          className="w-5 h-5 border-2 border-rich-black bg-transparent checked:bg-rich-black focus:ring-0 rounded-none text-rich-black"
                        />
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Aesthetics */}
              <div>
                <h3 className="font-label-caps text-[12px] uppercase mb-8 tracking-[0.2em] opacity-60">Aesthetic Style</h3>
                <div className="flex flex-col gap-4">
                  {aesthetics.map((style) => {
                    const active = activeAesthetic === style
                    return (
                      <button
                        key={style}
                        onClick={() => setActiveAesthetic(style)}
                        className={`text-left py-2 text-2xl uppercase transition-all ${
                          active
                            ? 'border-b-2 border-rich-black font-bold'
                            : 'border-b border-rich-black/10 font-medium opacity-40 hover:opacity-100'
                        }`}
                      >
                        {style}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-auto pt-16">
              <button className="w-full py-6 bg-rich-black text-pure-white font-label-caps text-sm uppercase tracking-widest hover:bg-rich-black/90 transition-colors">
                Switch to List View
              </button>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-pure-white w-full border-t border-rich-black">
        <div className="px-edge-margin py-24 max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-6">
              <div className="text-headline-lg font-bold uppercase mb-8 leading-none">NYC Style Guide</div>
              <p className="text-body-lg max-w-md opacity-70 mb-12">
                The definitive catalog of Manhattan's most precise retail architectural and aesthetic statements.
              </p>
              <div className="text-sm font-medium tracking-wider opacity-50 uppercase">© 2024 Editorial Precision Group</div>
            </div>
            <div className="md:col-span-3 space-y-8">
              <h5 className="font-label-caps text-xs uppercase tracking-[0.3em] opacity-40">Locations</h5>
              <ul className="space-y-4 text-xl font-medium">
                {['Upper East Side', 'Tribeca', 'Chelsea'].map((n) => (
                  <li key={n}><a href="#" className="hover:underline">{n}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3 space-y-8">
              <h5 className="font-label-caps text-xs uppercase tracking-[0.3em] opacity-40">Contact</h5>
              <ul className="space-y-4 text-xl font-medium">
                {['Newsletter', 'Submissions', 'Instagram'].map((item) => (
                  <li key={item}><a href="#" className="hover:underline">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
