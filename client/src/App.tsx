import About from './components/About';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Lab from './components/Lab';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Services from './components/Services';
import SideSocial from './components/SideSocial';
import { useContent } from './hooks/useContent';
import { useLang } from './hooks/usePreferences';
import { useReveal } from './hooks/useReveal';

export default function App() {
  const [lang, setLang] = useLang();
  const { content, error } = useContent(lang);

  // İçerik geldiğinde / dil değiştiğinde beliren animasyonları başlat
  useReveal([content]);

  // API'ye ulaşılamadıysa (ör. server çalışmıyor)
  if (error && !content) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6 text-center">
        <div>
          <p className="font-serif text-4xl italic text-white">Bağlantı hatası</p>
          <p className="mt-4 text-neutral-400">
            API'ye ulaşılamadı. <code className="font-mono text-sm">server</code> klasöründe{' '}
            <code className="font-mono text-sm">npm run dev</code> çalıştığından emin ol.
          </p>
        </div>
      </div>
    );
  }

  // İçerik yüklenirken
  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="eyebrow animate-pulse text-neutral-500">Fadime Mutlu</span>
      </div>
    );
  }

  return (
    <>
      <Navbar content={content} lang={lang} onLangChange={setLang} />
      <SideSocial content={content} />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Experience content={content} />
        <Services content={content} />
        <Projects content={content} />
        <Lab content={content} />
        <Education content={content} />
        <Faq content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </>
  );
}
