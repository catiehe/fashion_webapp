import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getAllStores } from '../sanity'

export default function Boutiques() {
  const navigate = useNavigate()
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storesData = await getAllStores()
        setStores(storesData || [])
      } catch (error) {
        console.error('Error fetching stores:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStores()
  }, [])

  return (
    <>
      <Navbar />
      <main className="max-w-container-max mx-auto overflow-hidden">
        <section className="px-edge-margin mt-32 mb-32 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-headline-xl text-headline-xl mb-8 uppercase text-rich-black">
              Boutiques
            </h1>
            <p className="font-body-lg text-2xl text-rich-black/60 mb-20">
              Curated retail spaces across New York City. Select a store to explore its story.
            </p>
          </div>

          {loading ? (
            <div className="text-center text-rich-black/40">Loading stores...</div>
          ) : stores.length === 0 ? (
            <div className="text-center text-rich-black/40">No stores available</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stores.map((store) => (
                <button
                  key={store._id}
                  onClick={() => navigate(`/store/${store.name}`)}
                  className="group bg-pure-white p-8 rounded-xl border border-rich-black/10 hover:border-rich-black/40 transition-all duration-300 text-left hover:shadow-lg"
                >
                  <div className="aspect-square overflow-hidden rounded-lg mb-6 bg-ice-blue">
                    {store.image?.asset?.url && (
                      <img
                        src={store.image.asset.url}
                        alt={store.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    )}
                  </div>
                  <h2 className="font-headline-md text-3xl uppercase tracking-tighter text-rich-black mb-2 group-hover:opacity-70 transition-opacity">
                    {store.name}
                  </h2>
                  {store.neighborhood && (
                    <p className="font-label-caps text-sm text-rich-black/40 uppercase">
                      {store.neighborhood}
                    </p>
                  )}
                </button>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="w-full bg-rich-black text-ice-blue py-32 border-t border-pure-white/10 mt-32">
        <div className="max-w-container-max mx-auto px-edge-margin">
          <div className="grid grid-cols-12 gap-gutter items-start mb-32">
            <div className="col-span-12 md:col-span-6">
              <h2 className="font-headline-xl text-8xl uppercase tracking-tighter mb-8 text-pure-white">NYC Style Guide</h2>
              <p className="font-body-lg text-xl opacity-40 max-w-sm">
                Curated precision. Architectural perspective. The definitive guide to New York retail.
              </p>
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
