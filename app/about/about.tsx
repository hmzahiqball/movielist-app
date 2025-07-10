import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { AboutSection } from '../components/about/aboutSection'
import { FAQSection } from '../components/about/faqSection'
export function About() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="flex justify-center mt-10 mb-10">
        <img
          src="/favicon.png"
          alt="tMovies Logo"
          className="h-16"
        />
      </div>
      <div className="w-full">
        
      <div className="border-1 border-red-600 p-6 rounded-md max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-start gap-6">
            <div className="bottom-0">
              <h3 className="text-3xl font-bold relative inline-block">
                About FilmScape
                <span className="absolute bottom-0 left-0 w-3/4 h-[3px] bg-red-500 rounded-full" />
              </h3>
            </div>
            <AboutSection/>
            <div className="bottom-0">
              <h3 className="text-3xl font-bold relative inline-block">
                FAQ❓❓
                <span className="absolute bottom-0 left-0 w-3/4 h-[3px] bg-red-500 rounded-full" />
              </h3>
            </div>
            <FAQSection/>
        </div>
      </div>
      </div>
    </div>
  )
}
