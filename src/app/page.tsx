import Script from 'next/script'
import { client } from '../lib/sanity.client'
import { homePageQuery } from '../lib/queries'
import { urlFor } from '../sanity/lib/image'
import Image from 'next/image'
import ClientWrapper from '../components/ClientWrapper'

// Define types for the data structure
interface ServiceItem {
  title: string
  subtitle: string
  price: string
  isFree: boolean
}

interface TestimonialItem {
  avatar: any
  quote: string
  signature: string
}

interface HeroSection {
  heading: string
  statText: string
  heroText: string
  ctaLabel: string
  heroImage: any
  avatars: any[]
}

interface FactItem {
  number: string
  title: string
  description: string
  order: number
}

interface AboutSection {
  mainTitle: string
  subtitle: string
  facts: FactItem[]
  bioTitle: string
  bioText: string
  ctaLabel: string
  bioImage: any
  signature: string
}

interface DecisionSection {
  headline: string
  accentWord: string
  imageNumber: string
  image: any
  subtitle: string
  note: string
  desktopCtaLabel: string
  mobileCtaLabel: string
}

interface ConcernItem {
  title: string
  body: string
  isDefaultOpen: boolean
  order: number
}

interface ConcernsSection {
  image: any
  items: ConcernItem[]
}

interface JourneyStep {
  number: string
  title: string
  body: string
  order: number
}

interface LifestyleSection {
  eyebrow: string
  mainHeading: string
  accentWords: string[]
  backgroundImage: any
}

interface JourneySection {
  title: string
  subtitle: string
  portraitImage: any
  steps: JourneyStep[]
}

interface ServicesSection {
  title: string
  ctaLabel: string
  items: ServiceItem[]
}

interface TestimonialsSection {
  items: TestimonialItem[]
}

interface ContactSection {
  title: string
  subtitle: string
  portrait: any
  footerSignature: string
  footerSubtitle: string
  contactEmail: string
  instagramUrl: string
  linkedinUrl: string
  quickLinks: { label: string, href: string }[]
}

interface HomePageData {
  hero: HeroSection
  about: AboutSection
  decision: DecisionSection
  concerns: ConcernsSection
  lifestyle: LifestyleSection
  journey: JourneySection
  servicesSection: ServicesSection
  testimonialsSection: TestimonialsSection
  contactSection: ContactSection
}

export default async function Home() {
  // Fetch the homepage data from Sanity
  const data: HomePageData | null = await client.fetch(homePageQuery)

  // Fallback data in case nothing is available from Sanity
  const hero = data?.hero
  const about = data?.about
  const decision = data?.decision
  const concerns = data?.concerns
  const lifestyle = data?.lifestyle
  const journey = data?.journey
  const services = data?.servicesSection
  const testimonials = data?.testimonialsSection
  const contact = data?.contactSection
  return (
    <ClientWrapper data={data}>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg main-nav position-relative">
        <div className="container-fluid px-4 px-lg-5">
          {/* left */}
          <a href="#" className="btn btn-outline-dark book-btn d-none d-lg-inline-flex me-3">Book a Session</a>

          {/* centered brand */}
          <a className="navbar-brand navbar-brand-centered" href="#">Mohamad Ahmad</a>

          {/* toggler */}
          <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                  aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* right nav */}
          <div className="collapse navbar-collapse justify-content-end" id="mainNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#about">About </a></li>
              <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#testimonials">Client Results</a></li>
              <li className="nav-item"><a className="nav-link" href="#golden-visa">Golden Visa</a></li>
              <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-wrapper">
        <div className="hero-fluid">
          <div className="hero-grid">

            {/* HEADING */}
            <div className="hero-heading">
              <h1 className="hero-title">
                <span className="hero-line hero-line-1">
                  <span className="hero-main">Create a</span>
                  <span className="accent accent-life">life</span>
                  <span className="hero-main">that</span>
                </span>
                <span className="hero-line hero-line-2">
                  <span className="hero-main">feels</span>
                  <span className="hero-main">like</span>
                </span>
                <span className="hero-line hero-line-3">
                  <span className="accent accent-you">you</span>
                </span>
              </h1>
            </div>

            {/* PHOTO */}
            <div className="hero-photo">
              <div className="hero-photo-inner">
                <img src={hero?.heroImage ? urlFor(hero.heroImage).width(1200).height(1200).url() : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200"}
                     alt="Hero portrait" /> 
              </div>
            </div>

            {/* RIGHT: STATS + COPY + CTA */}
            <div className="hero-right">
              <div className="d-flex align-items-center mb-3">
                <div className="avatar-stack d-flex me-2">
                  {hero?.avatars && hero.avatars.length > 0 ? (
                    hero.avatars.slice(0, 3).map((avatar, index) => (
                      <img key={index} src={urlFor(avatar).width(200).height(200).url()} alt={`Client ${index + 1}`} />
                    ))
                  ) : (
                    // Fallback avatars
                    <>
                      <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Client 1" />
                      <img src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Client 2" />
                      <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200" alt="Client 3" />
                    </>
                  )}
                </div>
                <div className="small text-muted">
                  {hero?.statText || "$350M+ in Dubai real estate closed • Multiple-time Emaar & DAMAC award winner"}
                </div>
              </div>

              <p className="hero-subtext">
                {hero?.heroText || "The record-breaking advisor behind a $350,000,000 single property purchase. He helps investors and families secure Dubai's highest-potential villas, penthouses, and off-plan launches with data-driven strategy, quiet negotiation, and white-glove support from first viewing to Golden Visa"}
              </p>

              <button className="btn btn-hero-cta">{hero?.ctaLabel || "Book Free Discovery Call"}</button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2 — Top (dark panel) */}
      <section className="section-2" id="about">
        <div className="container px-3 px-sm-4 px-lg-5">
          <div className="section-2-top">
            <div className="section-2-left">
              <h2 className="section-2-title">{about?.mainTitle || "Elite, Award Winning Agent"}</h2>
              <p className="section-2-sub">
                {about?.subtitle || "Record-breaking luxury property specialist with unmatched access, strategic guidance, and white-glove service from search to Golden Visa."}
              </p>
            </div>

            <div className="section-2-right">
              {about?.facts && about.facts.length > 0 ? (
                about.facts
                  .sort((a, b) => (a.order || 0) - (b.order || 0))
                  .map((fact, index) => (
                    <div key={index} className="fact-item">
                      <div className="fact-number">{fact.number}</div>
                      <div className="fact-text">
                        <strong>{fact.title}</strong><br />
                        {fact.description}
                      </div>
                    </div>
                  ))
              ) : (
                // Fallback fact items
                <>
                  <div className="fact-item">
                    <div className="fact-number">01</div>
                    <div className="fact-text">
                      <strong>Unmatched Access to Dubai's Finest Developers</strong><br />
                      With multiple Emaar and DAMAC awards, Mohamad opens doors few ever reach — securing launch-day units, premium floors, and rare villas that never make it to the public market.
                    </div>
                  </div>

                  <div className="fact-item">
                    <div className="fact-number">02</div>
                    <div className="fact-text">
                      <strong>Record-Breaking Results, Powered by Insight</strong><br />
                      From a $350M single-property purchase to over 150 prestige transactions, his strategy blends deep analytics, trend intelligence, and calm negotiation to deliver exceptional ROI and long-term value.
                    </div>
                  </div>

                  <div className="fact-item">
                    <div className="fact-number">03</div>
                    <div className="fact-text">
                      <strong>White-Glove Guidance, Every Step of the Way</strong><br />
                      From your first viewing to handover — including contracts, financing, and <b>Golden Visa</b> processing — every detail is handled with quiet precision, ensuring a seamless journey for UHNWIs, families, and discerning investors.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Bottom (light wrapper) */}
      <section className="section-2-bottom-wrapper">
        <div className="container px-3 px-sm-4 px-lg-5">
          <div className="section-2-bottom">

            {/* BIO CARD (left) */}
            <div className="bio-card">
              <h3 className="bio-title">{about?.bioTitle || "Hi, I'm Ahmad"}</h3>
              <div className="bio-text">
                {about?.bioText ? (
                  about.bioText.split('\n').filter(p => p.trim()).map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))
                ) : (
                  <>
                    <p>
                      After years advising global investors and families in Dubai's luxury real estate market, I've learned that exceptional results come from access, precision, and quiet execution — not noise.
                    </p>
                    <br />
                    <p>
                      Today, I help clients secure Dubai's most sought-after villas, penthouses, and off-plan launches with strategic guidance, data-backed decisions, and a white-glove experience from first viewing to Golden Visa.
                    </p>
                  </>
                )}
              </div>
              <a className="btn section2-cta" href="#">{about?.ctaLabel || "Book Free Discovery Call"}</a>
            </div>

            {/* FLOATING IMAGE */}
            <div className="bio-image-wrapper">
              <div className="bio-image">
                <img src={about?.bioImage ? urlFor(about.bioImage).width(1200).height(1200).url() : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200"} 
                     alt="Bio portrait" /> 
              </div>

              <div className="bio-signature" aria-hidden="true">{about?.signature || "M Ahmad"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 */}
      {/* SECTION 3 — Decision Section */}
      <section className="section-3 py-5">
        <div className="container px-4 px-lg-5">
          
          {/* Desktop layout using CSS Grid, Mobile stacked */}
          <div className="section3-wrapper">
            
            {/* Main headline - spans wide on desktop */}
            <div className="section3-headline">
              <h2 className="section3-title section3-title--above">
                {decision?.headline ? (
                  <>
                    {decision.headline.split(' ').map((word, index) => {
                      const isAccent = decision.accentWord && word.toLowerCase().includes(decision.accentWord.toLowerCase().replace('…', ''))
                      return isAccent ? (
                        <span key={index} className="section3-accent">{word}</span>
                      ) : (
                        <span key={index}>{word} </span>
                      )
                    })}
                  </>
                ) : (
                  <>
                    Building your future with<br />
                    every <span className="section3-accent">decision…</span>
                  </>
                )}
              </h2>
            </div>
            
            {/* Image block with number */}
            <div className="section3-image-block">
              <span className="section3-number">{decision?.imageNumber || "04"}</span>
              <figure className="section3-media">
                <div className="section3-image-container">
                  <img src={decision?.image ? urlFor(decision.image).width(1200).height(800).url() : "https://images.pexels.com/photos/4842493/pexels-photo-4842493.jpeg?auto=compress&cs=tinysrgb&w=1200"} 
                       alt="Building decisions" className="section3-image" />
                </div>
              </figure>
            </div>

            {/* Right content block */}
            <div className="section3-right-block">
              <h3 className="section3-subtitle">
                {decision?.subtitle ? (
                  <>
                    {decision.subtitle.split(' ').map((word, index) => {
                      const isAccent = decision.accentWord && word.toLowerCase().includes(decision.accentWord.toLowerCase().replace('…', ''))
                      return isAccent ? (
                        <span key={index} className="section3-accent">{word}</span>
                      ) : (
                        <span key={index}>{word} </span>
                      )
                    })}
                  </>
                ) : (
                  <>
                    yet something<br />
                    still <span className="section3-accent">missing?</span>
                  </>
                )}
              </h3>
              
              <p className="section3-note">
                {decision?.note || "You're not lost — you're just one great Dubai property decision away from a stronger future"}
              </p>
              
              {/* Desktop CTA */}
              <div className="section3-cta-desktop">
                <a href="#" className="section3-btn">{decision?.desktopCtaLabel || "Book a Session"}</a>
              </div>
            </div>

            {/* Mobile CTA: full width, shown only on small screens */}
            <div className="section3-cta-mobile">
              <a href="#" className="section3-btn-mobile">{decision?.mobileCtaLabel || "Book Free Discovery Call"}</a>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 4 — Real Estate Concerns */}
      <section className="section-4 py-5">
        <div className="container px-4 px-lg-5">
          <div className="row align-items-center g-4">

            {/* IMAGE (mobile-first shows first) */}
            <div className="col-12 col-lg-5 order-1 order-lg-2 d-flex justify-content-center">
              <figure className="section4-image mb-0">
                <img src={concerns?.image ? urlFor(concerns.image).width(1200).height(800).url() : "https://images.pexels.com/photos/5588183/pexels-photo-5588183.jpeg?auto=compress&cs=tinysrgb&w=1200"} 
                     alt="Dubai property concerns" className="img-fluid" />
              </figure>
            </div>

            {/* TEXT / ACCORDION */}
            <div className="col-12 col-lg-7 order-2 order-lg-1">
              
              {/* Dynamic Accordion (Bootstrap 5) */}
              <div className="accordion section4-accordion" id="section4Accordion">
                {concerns?.items && concerns.items.length > 0 ? (
                  concerns.items
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((item, index) => (
                      <div key={index} className="accordion-item">
                        <h2 className={`accordion-header`} id={`concern${index}`}>
                          <button className={`accordion-button section4-acc-btn ${index === 0 || item.isDefaultOpen ? 'section4-main-btn' : 'collapsed'}`} 
                                  type="button"
                                  data-bs-toggle="collapse" 
                                  data-bs-target={`#collapseConcern${index}`}
                                  aria-expanded={index === 0 || item.isDefaultOpen ? 'true' : 'false'} 
                                  aria-controls={`collapseConcern${index}`}>
                            <span className="acc-title">{item.title} {index === 0 && <span className="section4-caret"></span>}</span>
                            {index > 0 && (
                              <svg className="acc-icon ms-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </button>
                        </h2>
                        <div id={`collapseConcern${index}`} 
                             className={`accordion-collapse collapse ${index === 0 || item.isDefaultOpen ? 'show' : ''}`} 
                             aria-labelledby={`concern${index}`} 
                             data-bs-parent="#section4Accordion">
                          <div className="accordion-body section4-header-body">
                            <p className="section4-lead-dynamic text-muted mb-4">
                              {item.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  // Fallback content
                  <>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="h1">
                        <button className="accordion-button section4-acc-btn section4-main-btn" type="button"
                                data-bs-toggle="collapse" data-bs-target="#collapseH1"
                                aria-expanded="true" aria-controls="collapseH1">
                          <span className="acc-title">Not sure which Dubai property is right for you <span className="section4-caret"></span></span>
                        </button>
                      </h2>
                      <div id="collapseH1" className="accordion-collapse collapse show" aria-labelledby="h1" data-bs-parent="#section4Accordion">
                        <div className="accordion-body section4-header-body">
                          <p className="section4-lead-dynamic text-muted mb-4">
                            With so many communities, developers, and payment plans, it's easy to doubt every decision.
                            You want to invest wisely — but choosing between dozens of options often leads to hesitation,
                            even when you know Dubai real estate is the right move.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h3 className="accordion-header" id="a1">
                        <button className="accordion-button collapsed section4-acc-btn" type="button"
                                data-bs-toggle="collapse" data-bs-target="#collapseA1"
                                aria-expanded="false" aria-controls="collapseA1">
                          <span className="acc-title">Feeling overwhelmed by choices and market noise</span>
                          <svg className="acc-icon ms-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </h3>
                      <div id="collapseA1" className="accordion-collapse collapse" aria-labelledby="a1" data-bs-parent="#section4Accordion">
                        <div className="accordion-body section4-header-body">
                          <p className="section4-lead-dynamic text-muted mb-4">
                            Every developer claims to have "the best" project. Every area promises high returns.  
                            Without clear guidance, the market feels crowded and confusing — making progress slow and decisions stressful.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h3 className="accordion-header" id="a2">
                        <button className="accordion-button collapsed section4-acc-btn" type="button"
                                data-bs-toggle="collapse" data-bs-target="#collapseA2"
                                aria-expanded="false" aria-controls="collapseA2">
                          <span className="acc-title">Worried about choosing the wrong project</span>
                          <svg className="acc-icon ms-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </h3>
                      <div id="collapseA2" className="accordion-collapse collapse" aria-labelledby="a2" data-bs-parent="#section4Accordion">
                        <div className="accordion-body section4-header-body">
                          <p className="section4-lead-dynamic text-muted mb-4">
                            With billions flowing into Dubai's property market, making the wrong move can feel costly.  
                            You want clarity — a strategy that cuts through hype and protects your long-term goals.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="accordion-item">
                      <h3 className="accordion-header" id="a3">
                        <button className="accordion-button collapsed section4-acc-btn" type="button"
                                data-bs-toggle="collapse" data-bs-target="#collapseA3"
                                aria-expanded="false" aria-controls="collapseA3">
                          <span className="acc-title">Afraid of missing the best Dubai opportunities</span>
                          <svg className="acc-icon ms-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </h3>
                      <div id="collapseA3" className="accordion-collapse collapse" aria-labelledby="a3" data-bs-parent="#section4Accordion">
                        <div className="accordion-body section4-header-body">
                          <p className="section4-lead-dynamic text-muted mb-4">
                            Dubai's best units — prime villas, premium floors, and high-yield layouts — often sell in hours.
                            Without insider access, it's easy to feel left behind, even when you're ready to invest.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div> {/* /.accordion */}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Luxury Lifestyle & ROI */}
      <section className="section-5 py-5">
        <div className="container-fluid px-0">
          <div className="section-5-card position-relative"
               role="img"
               aria-label={lifestyle?.mainHeading || "Imagine waking up in a home that elevates your lifestyle and grows your wealth"}>

            {/* background image */}
            <img src={lifestyle?.backgroundImage ? urlFor(lifestyle.backgroundImage).width(1600).height(800).url() : "https://images.pexels.com/photos/2736879/pexels-photo-2736879.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                 alt={lifestyle?.mainHeading || "Imagine waking up in a home that elevates your lifestyle and grows your wealth"}
                 className="section-5-bg img-fluid" />
            
            {/* overlay */}
            <div className="section-5-overlay" aria-hidden="true"></div>

            {/* content block (left half only) */}
            <div className="section-5-content-left">
              <p className="section-5-eyebrow">{lifestyle?.eyebrow || "THIS IS WHAT A SMART DUBAI PROPERTY INVESTMENT CAN GIVE YOU"}</p>
              
              {/* premium lifestyle-focused headline - 3 lines, right aligned */}
              <h2 className="section-5-title-lines">
                <span className="section-5-line-1">Imagine waking up to a</span>
                <span className="section-5-line-2">
                  <span className="section-5-accent">luxury lifestyle</span> that delivers
                </span>
                <span className="section-5-line-3">
                  <span className="section-5-accent">huge ROI</span>
                </span>
              </h2>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — How it all works */}
      <section className="section-6 py-5" id="process">
        <div className="container px-4 px-lg-5">

          {/* Heading (spans full width) */}
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="section-6-title">{journey?.title || "How the journey works"}</h2>
              <p className="section-6-subtle text-muted mb-0">
                {journey?.subtitle || "A seamless, luxury-first process designed to help you invest with confidence and secure high-ROI Dubai properties."}
              </p>
            </div>
          </div>

          {/* Content row: left image / right numbered steps */}
          <div className="row align-items-start gx-5 gy-4">

            {/* Left: portrait card */}
            <div className="col-12 col-lg-6">
              <figure className="section-6-portrait mb-0">
                <img src={journey?.portraitImage ? urlFor(journey.portraitImage).width(800).height(800).url() : "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"}
                     alt="Mohamad Ahmad guiding clients through luxury property investments"
                     className="img-fluid section-6-portrait-img" />
              </figure>
            </div>

            {/* Right: numbered steps */}
            <div className="col-12 col-lg-6">
              <div className="section-6-steps">
                {journey?.steps && journey.steps.length > 0 ? (
                  journey.steps
                    .sort((a, b) => (a.order || 0) - (b.order || 0))
                    .map((step, index) => (
                      <div key={index} className="section-6-step d-flex align-items-start">
                        <div className="section-6-step-num">{step.number || `0${index + 1}`}</div>
                        <div className="section-6-step-body">
                          <h4 className="section-6-step-title mb-1">{step.title}</h4>
                          <p className="section-6-step-text mb-0">
                            {step.body}
                          </p>
                        </div>
                      </div>
                    ))
                ) : (
                  // Fallback steps
                  <>
                    <div className="section-6-step d-flex align-items-start">
                      <div className="section-6-step-num">01</div>
                      <div className="section-6-step-body">
                        <h4 className="section-6-step-title mb-1">Initial Consultation</h4>
                        <p className="section-6-step-text mb-0">
                          A focused discussion to understand your goals — lifestyle upgrade, long-term ROI, or portfolio growth. 
                          I analyze your requirements and recommend the best communities and developers in today's market.
                        </p>
                      </div>
                    </div>

                    <div className="section-6-step d-flex align-items-start">
                      <div className="section-6-step-num">02</div>
                      <div className="section-6-step-body">
                        <h4 className="section-6-step-title mb-1">Property Selection & Viewings</h4>
                        <p className="section-6-step-text mb-0">
                          I shortlist high-potential projects using market data, upcoming developments, and off-market access. 
                          You receive premium options that match your goals, with guided viewings and clear ROI insights.
                        </p>
                      </div>
                    </div>

                    <div className="section-6-step d-flex align-items-start">
                      <div className="section-6-step-num">03</div>
                      <div className="section-6-step-body">
                        <h4 className="section-6-step-title mb-1">Negotiation & Closing Support</h4>
                        <p className="section-6-step-text mb-0">
                          I negotiate the best price, payment plan, and unit allocation on your behalf. 
                          All documentation, RERA compliance, DLD processes, and paperwork are handled end-to-end — ensuring a smooth, luxury experience from offer to handover.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7 — Services */}
      <section className="section-7 py-5" id="services">
        <div className="container px-4 px-lg-5">
          <div className="section-7-card mx-auto">
            {/* Header */}
            <header className="text-center mb-5">
              <h2 className="section-7-title mb-0">{services?.title || "Services"}</h2>
            </header>

            {/* Services list */}
            <div className="section-7-list">
              {services?.items && services.items.length > 0 ? (
                services.items.map((service, index) => (
                  <div key={index} className="section-7-row">
                    <div className="section-7-row-main">
                      <div className="section-7-left">
                        <h3 className="section-7-service-title">{service.title}</h3>
                        <div className="section-7-service-sub">
                          {service.subtitle}
                        </div>
                      </div>
                      <div className="section-7-right">
                        <span className={`section-7-price${service.isFree ? ' section-7-price--free' : ''}`}>
                          {service.price}
                        </span>
                      </div>
                    </div>
                    <div className="section-7-divider"></div>
                  </div>
                ))
              ) : (
                // Fallback services
                <>
                  <div className="section-7-row">
                    <div className="section-7-row-main">
                      <div className="section-7-left">
                        <h3 className="section-7-service-title">Portfolio Strategy Consultation</h3>
                        <div className="section-7-service-sub">
                          60 minutes to clarify your goals, risk profile, and ideal Dubai property strategy.
                        </div>
                      </div>
                      <div className="section-7-right">
                        <span className="section-7-price section-7-price--free">free</span>
                      </div>
                    </div>
                    <div className="section-7-divider"></div>
                  </div>

                  <div className="section-7-row">
                    <div className="section-7-row-main">
                      <div className="section-7-left">
                        <h3 className="section-7-service-title">Off-Plan Investment Advisory</h3>
                        <div className="section-7-service-sub">
                          Access to high-ROI launches, premium allocations, and data-backed project selection.
                        </div>
                      </div>
                      <div className="section-7-right">
                        <span className="section-7-price">1500</span>
                      </div>
                    </div>
                    <div className="section-7-divider"></div>
                  </div>

                  <div className="section-7-row">
                    <div className="section-7-row-main">
                      <div className="section-7-left">
                        <h3 className="section-7-service-title">Luxury Villa & Ready Property Acquisition</h3>
                        <div className="section-7-service-sub">
                          End-to-end guidance for prime villas and ready units — from shortlisting to handover and ROI planning.
                        </div>
                      </div>
                      <div className="section-7-right">
                        <span className="section-7-price">2500</span>
                      </div>
                    </div>
                    <div className="section-7-divider"></div>
                  </div>
                </>
              )}
            </div>

            {/* CTA */}
            <div className="section-7-cta-wrapper">
              <a href="#" className="section-7-cta-button">{services?.ctaLabel || "Book Free Discovery Call"}</a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Testimonial slider */}
      <section className="section-8 py-5" id="testimonials">
        <div className="container px-4 px-lg-5">
          <div className="section-8-inner mx-auto position-relative">

            {/* Bootstrap carousel */}
            <div id="testimonialCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="6000">
              <div className="carousel-inner text-center">
                {testimonials?.items && testimonials.items.length > 0 ? (
                  testimonials.items.map((testimonial, index) => (
                    <div key={index} className={`carousel-item${index === 0 ? ' active' : ''}`}>
                      <div className="testimonial-slide py-5">
                        <img src={testimonial.avatar ? urlFor(testimonial.avatar).width(800).height(800).url() : "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800"}
                             alt={`Client ${index + 1}`} className="testimonial-avatar mb-4" />
                        <blockquote className="testimonial-quote mb-4">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="testimonial-signature">{testimonial.signature}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Fallback testimonials
                  <>
                    <div className="carousel-item active">
                      <div className="testimonial-slide py-5">
                        <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800"
                             alt="Client 1" className="testimonial-avatar mb-4" />
                        <blockquote className="testimonial-quote mb-4">
                          "Mohamad secured the perfect villa for our family and negotiated a deal we didn't think was possible.
                          His access and professionalism are unmatched."
                        </blockquote>
                        <div className="testimonial-signature">— Ahmed & Rasha</div>
                      </div>
                    </div>

                    <div className="carousel-item">
                      <div className="testimonial-slide py-5">
                        <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
                             alt="Client 2" className="testimonial-avatar mb-4" />
                        <blockquote className="testimonial-quote mb-4">
                          "The ROI guidance was spot-on. Within months my off-plan investment appreciated far more than expected.
                          Mohamad truly knows the market."
                        </blockquote>
                        <div className="testimonial-signature">— Daniel M.</div>
                      </div>
                    </div>

                    <div className="carousel-item">
                      <div className="testimonial-slide py-5">
                        <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800"
                             alt="Client 3" className="testimonial-avatar mb-4" />
                        <blockquote className="testimonial-quote mb-4">
                          "The level of care, clarity, and access Mohamad provides is rare. From viewings to closing,
                          the process felt effortless and completely transparent."
                        </blockquote>
                        <div className="testimonial-signature">— Sofia L.</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Controls */}
              <button className="carousel-control-prev section8-control" type="button"
                      data-bs-target="#testimonialCarousel" data-bs-slide="prev"
                      aria-label="Previous testimonial">
                <span className="section8-control-icon" aria-hidden="true">&larr;</span>
              </button>
              <button className="carousel-control-next section8-control" type="button"
                      data-bs-target="#testimonialCarousel" data-bs-slide="next"
                      aria-label="Next testimonial">
                <span className="section8-control-icon" aria-hidden="true">&rarr;</span>
              </button>
            </div>

            {/* thin divider under section like the reference */}
            <div className="section-8-divider mt-5" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Golden Visa & Fly-In Viewing Offer */}
      <section className="section-8 py-5" id="golden-visa">
        <div className="container px-4 px-lg-5">
          <div className="row align-items-start gx-4">

            {/* LEFT: big title + strapline + download */}
            <div className="col-12 col-lg-6 mb-4 mb-lg-0">
              <h2 className="section8-title">Exclusive Benefits:</h2>

              <p className="section8-sub mt-3">
                Complimentary Golden Visa guidance and the option to fly to Dubai for a fully arranged property viewing —
                free when you purchase, refundable if you decide not to proceed.
              </p>

              <div className="section8-download mt-4">Learn More</div>
            </div>

            {/* RIGHT: number + heading + copy */}
            <div className="col-12 col-lg-6">
              <div className="d-flex align-items-start">
                <div className="section8-number me-4">05</div>
                <div className="section8-right">
                  <h3 className="section8-heading">Golden Visa Support & Fly-In Viewing Experience</h3>

                  <div className="section8-copy mt-3">
                    <p>
                      Receive end-to-end assistance with your UAE Golden Visa application when you invest in qualifying Dubai properties.
                      I guide you through every requirement, document, and procedure for a seamless approval.
                    </p>

                    <p className="mt-2">
                      International clients can also enjoy a curated fly-in experience: I arrange your visit, property tours,
                      and community walkthroughs. The trip is fully complimentary upon purchase — or simply settled at cost
                      if you choose not to buy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 9 — Contact + Footer */}
      <section className="section-9" id="contact" aria-labelledby="contact-heading">
        <div className="container">

          {/* top row: left content + right form */}
          <div className="top-row">

            {/* left: heading + subheading + image */}
            <div className="left-content">
              <div className="contact-header">
                <h2 id="contact-heading" className="contact-title">{contact?.title || "Contact Me"}</h2>
                <div className="contact-sub">
                  {contact?.subtitle || "You don't need to navigate Dubai's luxury property market alone — let's find the home or investment that fits your future, your lifestyle, and your ROI goals."}
                </div>
              </div>
              
              <div className="portrait-card" aria-hidden="false">
                <img src={contact?.portrait ? urlFor(contact.portrait).width(1200).height(1200).url() : "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1200"}
                     alt="Portrait of Mohamad Ahmad, Dubai luxury real estate advisor" />
              </div>
            </div>

            {/* right: form */}
            <div className="contact-form">
              <form className="row g-3" id="contactForm">
                <div className="col-12 col-md-6">
                  <input type="text" name="firstName" className="form-control" placeholder="First name" aria-label="First name" required />
                </div>
                <div className="col-12 col-md-6">
                  <input type="text" name="lastName" className="form-control" placeholder="Last name" aria-label="Last name" required />
                </div>

                <div className="col-12 col-md-6">
                  <input type="email" name="email" className="form-control" placeholder="Email" aria-label="Email" required />
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="phone-input" className="form-label visually-hidden">Phone Number</label>
                  <div className="input-group">
                    <div className="dropdown" style={{ position: 'relative' }}>
                      <button
                        className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                        type="button"
                        id="countryDropdown"
                        data-country-dropdown
                        style={{
                          backgroundColor: 'var(--muted-input, rgba(255,255,255,0.06))',
                          borderColor: 'transparent',
                          color: 'var(--text-on-dark, #fff)',
                          minWidth: '120px',
                          height: '44px',
                          fontSize: '1rem'
                        }}
                      >
                        <span id="selectedFlag">🇦🇪</span>
                        <span id="selectedDialCode" style={{ marginLeft: '8px' }}>+971</span>
                      </button>
                      <div className="dropdown-menu" id="countryDropdownMenu" style={{ 
                        maxHeight: '200px', 
                        overflowY: 'auto',
                        backgroundColor: '#fff',
                        border: '1px solid #dee2e6',
                        display: 'none',
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        zIndex: 1000
                      }}>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="AE" data-dial="+971" data-flag="🇦🇪">
                          <span className="me-2">🇦🇪</span>
                          <span className="me-2">United Arab Emirates</span>
                          <span className="text-muted small">+971</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="US" data-dial="+1" data-flag="🇺🇸">
                          <span className="me-2">🇺🇸</span>
                          <span className="me-2">United States</span>
                          <span className="text-muted small">+1</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="GB" data-dial="+44" data-flag="🇬🇧">
                          <span className="me-2">🇬🇧</span>
                          <span className="me-2">United Kingdom</span>
                          <span className="text-muted small">+44</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="CA" data-dial="+1" data-flag="🇨🇦">
                          <span className="me-2">🇨🇦</span>
                          <span className="me-2">Canada</span>
                          <span className="text-muted small">+1</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="AU" data-dial="+61" data-flag="🇦🇺">
                          <span className="me-2">🇦🇺</span>
                          <span className="me-2">Australia</span>
                          <span className="text-muted small">+61</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="DE" data-dial="+49" data-flag="🇩🇪">
                          <span className="me-2">🇩🇪</span>
                          <span className="me-2">Germany</span>
                          <span className="text-muted small">+49</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="FR" data-dial="+33" data-flag="🇫🇷">
                          <span className="me-2">🇫🇷</span>
                          <span className="me-2">France</span>
                          <span className="text-muted small">+33</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="IT" data-dial="+39" data-flag="🇮🇹">
                          <span className="me-2">🇮🇹</span>
                          <span className="me-2">Italy</span>
                          <span className="text-muted small">+39</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="ES" data-dial="+34" data-flag="🇪🇸">
                          <span className="me-2">🇪🇸</span>
                          <span className="me-2">Spain</span>
                          <span className="text-muted small">+34</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="NL" data-dial="+31" data-flag="🇳🇱">
                          <span className="me-2">🇳🇱</span>
                          <span className="me-2">Netherlands</span>
                          <span className="text-muted small">+31</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="CH" data-dial="+41" data-flag="🇨🇭">
                          <span className="me-2">🇨🇭</span>
                          <span className="me-2">Switzerland</span>
                          <span className="text-muted small">+41</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="SE" data-dial="+46" data-flag="🇸🇪">
                          <span className="me-2">🇸🇪</span>
                          <span className="me-2">Sweden</span>
                          <span className="text-muted small">+46</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="NO" data-dial="+47" data-flag="🇳🇴">
                          <span className="me-2">🇳🇴</span>
                          <span className="me-2">Norway</span>
                          <span className="text-muted small">+47</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="DK" data-dial="+45" data-flag="🇩🇰">
                          <span className="me-2">🇩🇰</span>
                          <span className="me-2">Denmark</span>
                          <span className="text-muted small">+45</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="SG" data-dial="+65" data-flag="🇸🇬">
                          <span className="me-2">🇸🇬</span>
                          <span className="me-2">Singapore</span>
                          <span className="text-muted small">+65</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="HK" data-dial="+852" data-flag="🇭🇰">
                          <span className="me-2">🇭🇰</span>
                          <span className="me-2">Hong Kong</span>
                          <span className="text-muted small">+852</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="JP" data-dial="+81" data-flag="🇯🇵">
                          <span className="me-2">🇯🇵</span>
                          <span className="me-2">Japan</span>
                          <span className="text-muted small">+81</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="KR" data-dial="+82" data-flag="🇰🇷">
                          <span className="me-2">🇰🇷</span>
                          <span className="me-2">South Korea</span>
                          <span className="text-muted small">+82</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="IN" data-dial="+91" data-flag="🇮🇳">
                          <span className="me-2">🇮🇳</span>
                          <span className="me-2">India</span>
                          <span className="text-muted small">+91</span>
                        </button>
                        <button type="button" className="dropdown-item d-flex align-items-center" data-country="BR" data-dial="+55" data-flag="🇧🇷">
                          <span className="me-2">🇧🇷</span>
                          <span className="me-2">Brazil</span>
                          <span className="text-muted small">+55</span>
                        </button>
                      </div>
                    </div>
                    <input type="tel" name="phone" id="phone-input" className="form-control" placeholder="Enter phone number" aria-label="Phone number" />
                    <input type="hidden" name="countryCode" id="countryCodeHidden" value="+971" />
                  </div>
                </div>

                <div className="col-12">
                  <textarea name="message" className="form-control form-textarea" placeholder="Tell me about your Dubai property goals (home, investment, budget, timeline)…" aria-label="Message" required></textarea>
                </div>

                <div className="col-12" id="form-message" style={{display: 'none'}}>
                  <div className="alert" role="alert" id="form-alert"></div>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-contact" id="submit-btn">Request a Private Consultation</button>
                </div>
              </form>
            </div>
          </div>

          {/* subtle separator */}
          <hr className="sep" />

          {/* footer grid */}
          <div className="footer-grid">

            <div>
              <div className="signature">{contact?.footerSignature || "With respect, Mohamad Ahmad"}</div>
              <div className="signature-sub">{contact?.footerSubtitle || "Dubai luxury real estate advisor"}</div>
            </div>

            <div className="contact-info">
              <strong style={{display:'block', marginBottom:'8px', color:'var(--text-on-dark)'}}>Contact Info:</strong>
              <a href={`mailto:${contact?.contactEmail || 'mohamad@mroneproperties.com'}`}>{contact?.contactEmail || "mohamad@mroneproperties.com"}</a>
              <a href={contact?.instagramUrl || "#"} target="_blank" rel="noopener">Instagram</a>
              <a href={contact?.linkedinUrl || "#"} target="_blank" rel="noopener">LinkedIn</a>
            </div>

            <div className="footer-links">
              <strong style={{display:'block', marginBottom:'8px', color:'var(--text-on-dark)'}}>Quick Links:</strong>
              {contact?.quickLinks && contact.quickLinks.length > 0 ? (
                contact.quickLinks.map((link, index) => (
                  <a key={index} href={link.href}>{link.label}</a>
                ))
              ) : (
                // Fallback quick links
                <>
                  <a href="#">Home</a>
                  <a href="#">About</a>
                  <a href="#">Services</a>
                  <a href="#">Client Results</a>
                  <a href="#">Golden Visa & Fly-In</a>
                  <a href="#">Contact</a>
                </>
              )}
            </div>

          </div>

          <div style={{marginTop:'28px', color:'rgba(255,255,255,0.54)', fontSize:'.88rem'}}>
            © 2025 Mohamad Ahmad | Dubai Luxury Real Estate Advisor | 
            <a href="#" style={{color:'rgba(255,255,255,0.65)', textDecoration:'none'}}>Privacy Policy</a>
          </div>

        </div>
      </section>

      {/* Bootstrap accordion functionality */}
      <Script id="accordion-script" strategy="afterInteractive">
        {`
          (function () {
            var accordionEl = document.getElementById('section4Accordion');
            if (!accordionEl) return;

            // Remove extra SVG accordion icons
            var extraIcons = accordionEl.querySelectorAll('svg.acc-icon.ms-auto');
            extraIcons.forEach(function(icon) {
              icon.remove();
            });

            // When any collapse is shown, put focus on its controlling button (visual cue),
            // and remove any residual inline classes from other buttons.
            accordionEl.addEventListener('shown.bs.collapse', function (evt) {
              // evt.target is the collapse element; find the button that toggled it
              var collapseId = evt.target.id;
              var btn = accordionEl.querySelector('[data-bs-target="#' + collapseId + '"]');
              if (btn) {
                // move keyboard focus so the user sees the big header style
                btn.focus({ preventScroll: true });
              }
            });

            // ===== HOVER FUNCTIONALITY FOR SECTION 4 ACCORDION =====
            // Add hover behavior to open accordion items on mouseover
            var accordionButtons = accordionEl.querySelectorAll('.section4-accordion .accordion-button');
            var collapseInstances = new Map(); // Store Bootstrap Collapse instances
            
            // Initialize Bootstrap Collapse instances for each accordion item
            accordionButtons.forEach(function(button) {
              var targetId = button.getAttribute('data-bs-target');
              if (targetId) {
                var targetElement = document.querySelector(targetId);
                if (targetElement && window.bootstrap && window.bootstrap.Collapse) {
                  // Create Collapse instance with parent for proper accordion behavior
                  var collapseInstance = new window.bootstrap.Collapse(targetElement, {
                    toggle: false, // Don't auto-toggle on init
                    parent: '#section4Accordion'
                  });
                  collapseInstances.set(targetId, collapseInstance);
                }
              }
            });
            
            // Add hover listeners to each accordion button
            accordionButtons.forEach(function(button) {
              button.addEventListener('mouseenter', function() {
                var targetId = this.getAttribute('data-bs-target');
                var collapseInstance = collapseInstances.get(targetId);
                
                if (collapseInstance) {
                  // Show this panel (Bootstrap will handle closing others due to parent setting)
                  collapseInstance.show();
                }
              });
            });
            
            // Optional: Close all panels when mouse leaves the entire accordion
            // Commented out for better UX - keeps last hovered item open
            /*
            accordionEl.addEventListener('mouseleave', function() {
              collapseInstances.forEach(function(instance) {
                instance.hide();
              });
            });
            */

            // When a collapse is hidden we don't need to do anything — CSS handles styling
            // because we use .accordion-button:not(.collapsed) selectors.
          })();
        `}
      </Script>

      {/* Contact form functionality */}
      <Script id="contact-form-script" strategy="afterInteractive">
        {`
          (function () {
            var form = document.getElementById('contactForm');
            var submitBtn = document.getElementById('submit-btn');
            var messageDiv = document.getElementById('form-message');
            var alertDiv = document.getElementById('form-alert');
            
            if (!form) return;

            // Country dropdown functionality
            var countryDropdown = document.querySelector('[data-country-dropdown]');
            var countryMenu = document.getElementById('countryDropdownMenu');
            var selectedFlag = document.getElementById('selectedFlag');
            var selectedDialCode = document.getElementById('selectedDialCode');
            var countryCodeHidden = document.getElementById('countryCodeHidden');
            var countryItems = countryMenu?.querySelectorAll('.dropdown-item');

            // Initialize country based on IP
            async function initializeCountryFromIP() {
              try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                const countryCode = data.country_code || 'AE';
                
                // Find matching country in dropdown
                const countryItem = Array.from(countryItems || []).find(item => 
                  item.getAttribute('data-country') === countryCode
                );
                
                if (countryItem) {
                  const flag = countryItem.getAttribute('data-flag');
                  const dialCode = countryItem.getAttribute('data-dial');
                  
                  selectedFlag.textContent = flag;
                  selectedDialCode.textContent = dialCode;
                  countryCodeHidden.value = dialCode;
                }
              } catch (error) {
                console.log('Could not detect country from IP, using default UAE');
              }
            }

            // Initialize on page load
            initializeCountryFromIP();

            // Toggle dropdown
            if (countryDropdown && countryMenu) {
              countryDropdown.addEventListener('click', function(e) {
                e.preventDefault();
                const isVisible = countryMenu.style.display === 'block';
                countryMenu.style.display = isVisible ? 'none' : 'block';
              });

              // Close dropdown when clicking outside
              document.addEventListener('click', function(e) {
                if (!countryDropdown.contains(e.target) && !countryMenu.contains(e.target)) {
                  countryMenu.style.display = 'none';
                }
              });

              // Handle country selection
              countryItems?.forEach(function(item) {
                item.addEventListener('click', function(e) {
                  e.preventDefault();
                  
                  const country = this.getAttribute('data-country');
                  const flag = this.getAttribute('data-flag');
                  const dialCode = this.getAttribute('data-dial');
                  
                  // Update display
                  selectedFlag.textContent = flag;
                  selectedDialCode.textContent = dialCode;
                  countryCodeHidden.value = dialCode;
                  
                  // Close dropdown
                  countryMenu.style.display = 'none';
                });
              });
            }

            form.addEventListener('submit', async function(e) {
              e.preventDefault();
              
              // Disable submit button
              submitBtn.disabled = true;
              submitBtn.textContent = 'Sending...';
              
              // Hide previous message
              messageDiv.style.display = 'none';
              
              // Collect form data
              var formData = new FormData(form);
              var phoneNumber = formData.get('phone');
              var countryCode = countryCodeHidden.value;
              
              var data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: phoneNumber ? countryCode + phoneNumber.replace(/^[\\+\\s\\-\\(\\)]*/, '') : '',
                message: formData.get('message'),
                countryCode: countryCode
              };
              
              try {
                var response = await fetch('/api/contact', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data)
                });
                
                var result = await response.json();
                
                if (response.ok && result.success) {
                  // Success
                  alertDiv.className = 'alert alert-success';
                  alertDiv.textContent = result.message || 'Thank you! Your message has been sent successfully.';
                  form.reset();
                  // Reset country to default
                  selectedFlag.textContent = '🇦🇪';
                  selectedDialCode.textContent = '+971';
                  countryCodeHidden.value = '+971';
                } else {
                  // Error
                  alertDiv.className = 'alert alert-danger';
                  alertDiv.textContent = result.error || 'Something went wrong. Please try again.';
                }
              } catch (error) {
                // Network error
                alertDiv.className = 'alert alert-danger';
                alertDiv.textContent = 'Network error. Please check your connection and try again.';
              }
              
              // Show message and reset button
              messageDiv.style.display = 'block';
              submitBtn.disabled = false;
              submitBtn.textContent = 'Request a Private Consultation';
            });
          })();
        `}
      </Script>
    </ClientWrapper>
  );
}