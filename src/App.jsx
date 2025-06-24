import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Globe, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const sections = {
  home: {
    ru: 'Добро пожаловать на главную страницу!',
    en: 'Welcome to the homepage!'
  },
  about: {
    ru: 'Раздел "О нас" с описанием компании.',
    en: 'The "About" section with company info.'
  },
  services: {
    ru: 'Наши услуги включают веб-разработку и дизайн.',
    en: 'Our services include web development and design.'
  },
  contact: {
    ru: 'Свяжитесь с нами по электронной почте или телефону.',
    en: 'Contact us via email or phone.'
  }
};

export default function App() {
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('ru');
  const [activeSection, setActiveSection] = useState('home');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(lang === 'ru' ? 'en' : 'ru');
  const goHome = () => setActiveSection('home');

  return (
    <div className={theme === 'dark' ? 'bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <header className="flex justify-between items-center p-4 border-b shadow-md sticky top-0 bg-inherit z-10">
        <Button variant="ghost" onClick={goHome} className="flex items-center gap-2">
          <Home /> Logo
        </Button>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === 'light' ? <Moon /> : <Sun />}
          </Button>
          <Button variant="ghost" onClick={toggleLang}>
            <Globe />
          </Button>
        </div>
      </header>

      <main className="p-4">
        <div className="flex gap-4 mb-6 flex-wrap">
          {Object.keys(sections).map(key => (
            <Button
              key={key}
              variant={activeSection === key ? 'default' : 'outline'}
              onClick={() => setActiveSection(key)}
              className={
                theme === 'dark' && activeSection !== key
                  ? 'border-white text-black bg-white hover:bg-gray-200'
                  : ''
              }
            >
              {lang === 'ru'
                ? key === 'home' ? 'Главная' :
                  key === 'about' ? 'О нас' :
                  key === 'services' ? 'Услуги' : 'Контакты'
                : key.charAt(0).toUpperCase() + key.slice(1)}
            </Button>
          ))}
        </div>

        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-lg">{sections[activeSection][lang]}</p>
        </motion.div>
      </main>
    </div>
  );
}
