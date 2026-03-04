import { Shield, MapPin, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  
  return (
    <header className="bg-gray-900/80 backdrop-blur-xl border-b border-raksha-cyan/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-raksha-cyan to-blue-500 rounded-2xl raksha-glow">
              <Shield className="w-8 h-8 text-shield-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-raksha-cyan to-shield-gold bg-clip-text text-transparent">
                Nagar Raksha
              </h1>
              <p className="text-sm text-gray-400">{t('header.tagline')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-shield-gold fill-shield-gold" />
              <span id="raksha-count">0</span> Raksha Stars
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Delhi Ward #7</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
