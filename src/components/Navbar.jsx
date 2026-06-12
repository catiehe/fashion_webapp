import { NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Discovery', end: true },
  { to: '/map', label: 'Map' },
  { to: '/store/Acne%20Studio', label: 'Boutiques' },
  { to: '/vintage', label: 'Pop-ups' },
]

export default function Navbar() {
  return (
    <header className="w-full top-0 sticky bg-background/95 backdrop-blur-md z-50 border-b border-rich-black/5">
      <nav className="flex justify-between items-center w-full px-edge-margin py-8 max-w-container-max mx-auto">
        <div className="flex items-center gap-16">
          <NavLink
            to="/"
            className="font-helvetica font-bold text-4xl tracking-tighter uppercase text-rich-black"
          >
            NYC Style Guide
          </NavLink>
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `font-label-caps text-label-caps transition-colors ${
                    isActive
                      ? 'text-rich-black border-b-2 border-rich-black pb-1'
                      : 'text-on-surface-variant hover:text-rich-black'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <button className="material-symbols-outlined text-rich-black">search</button>
          <button className="material-symbols-outlined text-rich-black">account_circle</button>
        </div>
      </nav>
    </header>
  )
}
