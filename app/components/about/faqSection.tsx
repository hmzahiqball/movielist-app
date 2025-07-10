import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
export function FAQSection() {
  return (
    <div className="join w-full join-vertical bg-base-100">
        <div className="collapse collapse-arrow join-item bg-base-100 border-base-300 border">
          <input type="checkbox" name="faq-accordion" defaultChecked/>
          <div className="collapse-title font-semibold">❓What even is this site, mate?</div>
          <div className="collapse-content text-sm">
            Basically, it’s like your go-to Netflix stalker but cooler...
          </div>
        </div>
        <div className="collapse collapse-arrow join-item bg-base-100 border-base-300 border">
          <input type="checkbox" name="faq-accordion"/>
          <div className="collapse-title font-semibold">❓Is this site legal or like... FBI watchlist material?</div>
          <div className="collapse-content text-sm">
            Calm down FBI, it’s just frontend stuff.
            Everything here is powered by the official <a href='https://developer.themoviedb.org/docs/getting-started'>TMDB API</a>, so we ain't pirating anything. We just showing info — no streaming, no bootlegs, no shady biz.
            No need to open incognito 👀
          </div>
        </div>
        <div className="collapse collapse-arrow join-item bg-base-100 border-base-300 border">
          <input type="checkbox" name="faq-accordion" />
          <div className="collapse-title font-semibold">❓Can I watch movies/series here?</div>
          <div className="collapse-content text-sm">
            Nah fam, we don’t do that. This ain’t 123movies or Soap2day.
            But you can see trailers, info, ratings, cast, and vibes before you commit to watching it elsewhere.
            We’re like your movie matchmaker, fr fr. 💘
          </div>
        </div>
        <div className="collapse collapse-arrow join-item bg-base-100 border-base-300 border">
          <input type="checkbox" name="faq-accordion" />
          <div className="collapse-title font-semibold">❓Why does it look this fire tho?</div>
          <div className="collapse-content text-sm">
            TailwindCSS and DaisyUI did their thing.
            Also the dev is kinda cracked with that clean UI + React flow — respect the hustle 🧑‍💻🔥
          </div>
        </div>
        <div className="collapse collapse-arrow join-item bg-base-100 border-base-300 border">
          <input type="checkbox" name="faq-accordion" />
          <div className="collapse-title font-semibold">❓Can I write reviews or give ratings?</div>
          <div className="collapse-content text-sm">
            Not yet, babes.
            Right now we just fetch other people’s thoughts. But in a future update, you’ll be able to drop your ✨spicy takes✨ and rate movies like a certified critic.
          </div>
        </div>
        <div className="collapse collapse-arrow join-item bg-base-100 border-base-300 border">
          <input type="checkbox" name="faq-accordion" />
          <div className="collapse-title font-semibold">❓Who made this, and why tho?</div>
          <div className="collapse-content text-sm">
            This is a solo dev project by a tech-head who's down bad for movies and web dev.
            It’s part of a portfolio thing, but also just vibes.
            No cap, this is a passion project turned ✨masterpiece✨
          </div>
        </div>
        <div className="collapse collapse-arrow join-item bg-base-100 border-base-300 border">
          <input type="checkbox" name="faq-accordion" />
          <div className="collapse-title font-semibold">❓Any new features coming or is this just it?</div>
          <div className="collapse-content text-sm">
            Oh we cooking 🔥
            Here’s the upcoming glow-ups:
            <ul className="list bg-base-100 rounded-box shadow-md">

              <li className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">01</div>
                <div className="list-col-wrap">
                  <div>User login & profiles</div>
                </div>
              </li>

              <li className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">02</div>
                <div className="list-col-wrap">
                  <div>Custom reviews & ratings</div>
                </div>
              </li>

              <li className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">03</div>
                <div className="list-col-wrap">
                  <div>Save your fav movies/series</div>
                </div>
              </li>

              <li className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">04</div>
                <div className="list-col-wrap">
                  <div>Maybe even dark mode toggle that doesn’t gaslight you 💀</div>
                </div>
              </li>

            </ul>
          </div>
        </div>
        <div className="collapse collapse-arrow join-item bg-base-100 border-base-300 border">
          <input type="checkbox" name="faq-accordion"/>
          <div className="collapse-title font-semibold">❓Can I give feedback or just vibe quietly?</div>
          <div className="collapse-content text-sm">
            Both, innit. If you got feedback, we’d love to hear it — hit me up on github.
            If you just wanna lurk and scroll for hours, that’s cool too. We see you 👀💕
          </div>
        </div>
    </div>
  )
}
