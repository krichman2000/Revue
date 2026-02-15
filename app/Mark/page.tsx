'use client';

import { useState } from 'react';

export default function MarkPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", backgroundColor: '#FAFAFA' }}>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContainer}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>+</span>
            <span style={styles.logoText}>Dr. Mark Richman MD</span>
          </div>
          <div style={styles.navLinks}>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="#services" style={styles.navLink}>Services</a>
            <a href="#approach" style={styles.navLink}>My Approach</a>
            <a href="#contact" style={styles.navLinkCta}>Schedule Consultation</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>Now Accepting New Members</div>
          <h1 style={styles.heroTitle}>
            Medicine the Way It Should Be
          </h1>
          <p style={styles.heroSubtitle}>
            Personalized, unhurried care from a physician who knows you—not just your chart.
            Experience concierge medicine with Dr. Mark Richman.
          </p>
          <div style={styles.heroButtons}>
            <a href="#contact" style={styles.heroPrimaryBtn}>Schedule a Meet & Greet</a>
            <a href="#about" style={styles.heroSecondaryBtn}>Learn More</a>
          </div>
          <div style={styles.heroCredentials}>
            <span style={styles.credential}>MD, MPH</span>
            <span style={styles.credentialDivider}>•</span>
            <span style={styles.credential}>FACEP</span>
            <span style={styles.credentialDivider}>•</span>
            <span style={styles.credential}>FACP</span>
            <span style={styles.credentialDivider}>•</span>
            <span style={styles.credential}>25+ Years Experience</span>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section style={styles.problemSection}>
        <div style={styles.container}>
          <div style={styles.problemGrid}>
            <div style={styles.problemCard}>
              <h3 style={styles.problemTitle}>Traditional Healthcare</h3>
              <ul style={styles.problemList}>
                <li style={styles.problemItem}>
                  <span style={styles.problemIcon}>✕</span>
                  15-minute rushed appointments
                </li>
                <li style={styles.problemItem}>
                  <span style={styles.problemIcon}>✕</span>
                  Weeks to get an appointment
                </li>
                <li style={styles.problemItem}>
                  <span style={styles.problemIcon}>✕</span>
                  Feeling like a number, not a person
                </li>
                <li style={styles.problemItem}>
                  <span style={styles.problemIcon}>✕</span>
                  Can&apos;t reach your doctor when you need them
                </li>
                <li style={styles.problemItem}>
                  <span style={styles.problemIcon}>✕</span>
                  Reactive care—treating problems after they arise
                </li>
              </ul>
            </div>
            <div style={{ ...styles.problemCard, ...styles.solutionCard }}>
              <h3 style={{ ...styles.problemTitle, color: '#1B4D3E' }}>Concierge Medicine with Dr. Richman</h3>
              <ul style={styles.problemList}>
                <li style={styles.solutionItem}>
                  <span style={styles.solutionIcon}>✓</span>
                  Unhurried appointments—take the time you need
                </li>
                <li style={styles.solutionItem}>
                  <span style={styles.solutionIcon}>✓</span>
                  Same-day or next-day appointments
                </li>
                <li style={styles.solutionItem}>
                  <span style={styles.solutionIcon}>✓</span>
                  A physician who truly knows you
                </li>
                <li style={styles.solutionItem}>
                  <span style={styles.solutionIcon}>✓</span>
                  Direct access via phone, text, and email
                </li>
                <li style={styles.solutionItem}>
                  <span style={styles.solutionIcon}>✓</span>
                  Proactive, preventive care focused on longevity
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.container}>
          <div style={styles.aboutGrid}>
            <div style={styles.aboutImage}>
              <div style={styles.aboutImagePlaceholder}>
                <span style={{ fontSize: '64px' }}>👨‍⚕️</span>
                <span style={{ marginTop: '16px', fontSize: '14px' }}>Dr. Mark Richman</span>
              </div>
            </div>
            <div style={styles.aboutContent}>
              <h2 style={styles.sectionTitle}>Meet Dr. Mark Richman</h2>
              <p style={styles.aboutText}>
                With over <strong>25 years of experience</strong> in medicine, Dr. Mark Richman brings
                an unparalleled depth of expertise to his concierge practice. His unique background
                spans both Emergency Medicine and Internal Medicine—giving him the rare ability to
                handle urgent situations with calm precision while providing thoughtful, comprehensive
                primary care.
              </p>
              <p style={styles.aboutText}>
                Dr. Richman&apos;s journey began at <strong>Stanford University</strong>, followed by medical
                school at <strong>UC San Francisco</strong>. He completed residencies at <strong>Emory University</strong> and
                <strong> UCLA</strong>, and earned his Masters in Public Health from <strong>Johns Hopkins</strong>.
                He has served as Associate Professor at both UCLA and the Zucker School of Medicine at Hofstra/Northwell.
              </p>

              <div style={styles.credentialsGrid}>
                <div style={styles.credentialCard}>
                  <div style={styles.credentialCardIcon}>🎓</div>
                  <div style={styles.credentialCardTitle}>Stanford</div>
                  <div style={styles.credentialCardSubtitle}>Undergraduate</div>
                </div>
                <div style={styles.credentialCard}>
                  <div style={styles.credentialCardIcon}>⚕️</div>
                  <div style={styles.credentialCardTitle}>UCSF</div>
                  <div style={styles.credentialCardSubtitle}>Medical School</div>
                </div>
                <div style={styles.credentialCard}>
                  <div style={styles.credentialCardIcon}>📚</div>
                  <div style={styles.credentialCardTitle}>Johns Hopkins</div>
                  <div style={styles.credentialCardSubtitle}>MPH</div>
                </div>
                <div style={styles.credentialCard}>
                  <div style={styles.credentialCardIcon}>🏥</div>
                  <div style={styles.credentialCardTitle}>Emory & UCLA</div>
                  <div style={styles.credentialCardSubtitle}>Residencies</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={styles.servicesSection}>
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitle, textAlign: 'center', marginBottom: '16px' }}>
            Comprehensive Care, Personalized for You
          </h2>
          <p style={styles.sectionSubtitle}>
            As a member, you receive access to the full spectrum of primary care services—delivered
            with the attention and time you deserve.
          </p>

          <div style={styles.servicesGrid}>
            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>🩺</div>
              <h3 style={styles.serviceTitle}>Comprehensive Wellness Exams</h3>
              <p style={styles.serviceDesc}>
                Thorough annual physicals with advanced screenings, personalized health assessments,
                and detailed prevention planning.
              </p>
            </div>

            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>📱</div>
              <h3 style={styles.serviceTitle}>24/7 Direct Access</h3>
              <p style={styles.serviceDesc}>
                Reach Dr. Richman directly via phone, text, or email. No phone trees, no waiting
                for callbacks. Your doctor, when you need him.
              </p>
            </div>

            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>🏃</div>
              <h3 style={styles.serviceTitle}>Preventive & Longevity Medicine</h3>
              <p style={styles.serviceDesc}>
                Proactive care focused on optimizing your health for the long term—not just treating
                illness, but preventing it.
              </p>
            </div>

            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>🚨</div>
              <h3 style={styles.serviceTitle}>Urgent Care Expertise</h3>
              <p style={styles.serviceDesc}>
                With Dr. Richman&apos;s emergency medicine background, urgent issues are handled
                swiftly and competently—often avoiding unnecessary ER visits.
              </p>
            </div>

            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>🧭</div>
              <h3 style={styles.serviceTitle}>Care Coordination</h3>
              <p style={styles.serviceDesc}>
                Seamless coordination with specialists, expedited referrals, and advocacy to ensure
                you receive the best care across the healthcare system.
              </p>
            </div>

            <div style={styles.serviceCard}>
              <div style={styles.serviceIcon}>💊</div>
              <h3 style={styles.serviceTitle}>Chronic Disease Management</h3>
              <p style={styles.serviceDesc}>
                Comprehensive management of diabetes, hypertension, heart disease, and other chronic
                conditions with close monitoring and personalized treatment plans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="approach" style={styles.approachSection}>
        <div style={styles.container}>
          <div style={styles.approachContent}>
            <h2 style={{ ...styles.sectionTitle, color: 'white' }}>My Philosophy</h2>
            <div style={styles.quoteBlock}>
              <p style={styles.quoteText}>
                &ldquo;Medicine should be a partnership. I believe in taking the time to truly understand
                my patients—their goals, their concerns, their lives. Only then can I provide care
                that makes a real difference. Concierge medicine allows me to practice the way I
                always envisioned: thoughtfully, thoroughly, and with my patients&apos; best interests
                always at heart.&rdquo;
              </p>
              <p style={styles.quoteAuthor}>— Dr. Mark Richman</p>
            </div>

            <div style={styles.approachPoints}>
              <div style={styles.approachPoint}>
                <div style={styles.approachPointNumber}>01</div>
                <div>
                  <h4 style={styles.approachPointTitle}>Limited Practice Size</h4>
                  <p style={styles.approachPointText}>
                    By limiting my practice to a small number of members, I can provide the attention
                    and availability that simply isn&apos;t possible in traditional medicine.
                  </p>
                </div>
              </div>
              <div style={styles.approachPoint}>
                <div style={styles.approachPointNumber}>02</div>
                <div>
                  <h4 style={styles.approachPointTitle}>Prevention First</h4>
                  <p style={styles.approachPointText}>
                    The best treatment is preventing disease before it starts. I focus on proactive
                    care, advanced screenings, and lifestyle optimization.
                  </p>
                </div>
              </div>
              <div style={styles.approachPoint}>
                <div style={styles.approachPointNumber}>03</div>
                <div>
                  <h4 style={styles.approachPointTitle}>Your Advocate</h4>
                  <p style={styles.approachPointText}>
                    Navigating the healthcare system can be overwhelming. I serve as your advocate,
                    ensuring you receive the right care at the right time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section style={styles.membershipSection}>
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitle, textAlign: 'center', marginBottom: '16px' }}>
            Membership
          </h2>
          <p style={styles.sectionSubtitle}>
            Concierge medicine is an investment in your most valuable asset—your health.
          </p>

          <div style={styles.membershipCard}>
            <div style={styles.membershipHeader}>
              <h3 style={styles.membershipTitle}>Annual Membership</h3>
              <p style={styles.membershipSubtitle}>Everything you need for exceptional care</p>
            </div>
            <div style={styles.membershipBody}>
              <div style={styles.membershipFeatures}>
                <div style={styles.membershipFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Unlimited office visits with no copays
                </div>
                <div style={styles.membershipFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Same-day or next-day appointments
                </div>
                <div style={styles.membershipFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Direct phone, text, and email access to Dr. Richman
                </div>
                <div style={styles.membershipFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Comprehensive annual wellness exam
                </div>
                <div style={styles.membershipFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Extended appointments (30-60 minutes)
                </div>
                <div style={styles.membershipFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Care coordination and specialist referrals
                </div>
                <div style={styles.membershipFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Personalized preventive care plan
                </div>
                <div style={styles.membershipFeature}>
                  <span style={styles.checkIcon}>✓</span>
                  Telemedicine visits available
                </div>
              </div>
              <div style={styles.membershipCta}>
                <p style={styles.membershipNote}>
                  Membership works alongside your existing insurance for labs, imaging,
                  specialist visits, and hospitalizations.
                </p>
                <a href="#contact" style={styles.membershipButton}>
                  Schedule a Complimentary Consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={styles.contactSection}>
        <div style={styles.container}>
          <div style={styles.contactGrid}>
            <div style={styles.contactInfo}>
              <h2 style={styles.sectionTitle}>Let&apos;s Talk</h2>
              <p style={styles.contactText}>
                Interested in learning more? Schedule a complimentary meet-and-greet to see if
                concierge medicine with Dr. Richman is right for you. No obligation, no pressure—just
                a conversation about your health and how I can help.
              </p>
              <div style={styles.contactDetails}>
                <div style={styles.contactDetail}>
                  <span style={styles.contactIcon}>📍</span>
                  <span>New York Metropolitan Area</span>
                </div>
                <div style={styles.contactDetail}>
                  <span style={styles.contactIcon}>📧</span>
                  <span>info@drmarkrichman.com</span>
                </div>
                <div style={styles.contactDetail}>
                  <span style={styles.contactIcon}>📞</span>
                  <span>(555) 123-4567</span>
                </div>
              </div>
            </div>

            <div style={styles.contactForm}>
              {submitted ? (
                <div style={styles.thankYou}>
                  <div style={styles.thankYouIcon}>✓</div>
                  <h3 style={styles.thankYouTitle}>Thank You!</h3>
                  <p style={styles.thankYouText}>
                    We&apos;ve received your inquiry. Dr. Richman&apos;s office will be in touch within
                    24 hours to schedule your complimentary consultation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={styles.formTitle}>Request a Consultation</h3>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Full Name</label>
                    <input
                      type="text"
                      style={styles.formInput}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email</label>
                    <input
                      type="email"
                      style={styles.formInput}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Phone</label>
                    <input
                      type="tel"
                      style={styles.formInput}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Tell us about your healthcare needs</label>
                    <textarea
                      style={{ ...styles.formInput, minHeight: '100px', resize: 'vertical' }}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" style={styles.formButton}>
                    Request Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerContent}>
            <div style={styles.footerLogo}>
              <span style={styles.logoIcon}>+</span>
              <span style={styles.logoText}>Dr. Mark Richman MD</span>
            </div>
            <p style={styles.footerText}>
              Concierge Internal Medicine | New York Metropolitan Area
            </p>
            <p style={styles.footerCopyright}>
              © {new Date().getFullYear()} Dr. Mark Richman. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  // Navigation
  nav: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    zIndex: 1000,
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  logoIcon: {
    width: '32px',
    height: '32px',
    backgroundColor: '#1B4D3E',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '20px',
  },
  logoText: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1B4D3E',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  navLink: {
    color: '#4A5568',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: '500',
  },
  navLinkCta: {
    backgroundColor: '#1B4D3E',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '600',
  },

  // Hero
  hero: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1B4D3E 0%, #2D6A4F 50%, #40916C 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '120px 24px 80px',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    opacity: 0.5,
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '800px',
    position: 'relative',
    zIndex: 1,
  },
  heroBadge: {
    display: 'inline-block',
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    padding: '8px 20px',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '24px',
    backdropFilter: 'blur(10px)',
  },
  heroTitle: {
    fontSize: '56px',
    fontWeight: '700',
    color: 'white',
    lineHeight: '1.1',
    marginBottom: '24px',
    fontFamily: "'Georgia', serif",
  },
  heroSubtitle: {
    fontSize: '20px',
    color: 'rgba(255,255,255,0.9)',
    lineHeight: '1.6',
    marginBottom: '32px',
    fontFamily: "system-ui, sans-serif",
  },
  heroButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  heroPrimaryBtn: {
    backgroundColor: 'white',
    color: '#1B4D3E',
    padding: '16px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'transform 0.2s',
  },
  heroSecondaryBtn: {
    backgroundColor: 'transparent',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    border: '2px solid rgba(255,255,255,0.5)',
  },
  heroCredentials: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
  },
  credential: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '14px',
    fontWeight: '500',
  },
  credentialDivider: {
    color: 'rgba(255,255,255,0.4)',
  },

  // Container
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },

  // Problem/Solution
  problemSection: {
    padding: '80px 0',
    backgroundColor: '#F7FAFC',
  },
  problemGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '32px',
  },
  problemCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  solutionCard: {
    backgroundColor: '#F0FFF4',
    border: '2px solid #1B4D3E',
  },
  problemTitle: {
    fontSize: '22px',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#C53030',
  },
  problemList: {
    listStyle: 'none',
  },
  problemItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '16px',
    fontSize: '15px',
    color: '#4A5568',
  },
  problemIcon: {
    color: '#C53030',
    fontWeight: '700',
    fontSize: '16px',
  },
  solutionItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    marginBottom: '16px',
    fontSize: '15px',
    color: '#2D3748',
  },
  solutionIcon: {
    color: '#1B4D3E',
    fontWeight: '700',
    fontSize: '16px',
  },

  // About
  aboutSection: {
    padding: '100px 0',
    backgroundColor: 'white',
  },
  aboutGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '60px',
    alignItems: 'center',
  },
  aboutImage: {
    width: '100%',
  },
  aboutImagePlaceholder: {
    aspectRatio: '3/4',
    backgroundColor: '#E2E8F0',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#718096',
  },
  aboutContent: {},
  sectionTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: '24px',
    fontFamily: "'Georgia', serif",
  },
  sectionSubtitle: {
    fontSize: '18px',
    color: '#718096',
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto 48px',
  },
  aboutText: {
    fontSize: '16px',
    color: '#4A5568',
    lineHeight: '1.8',
    marginBottom: '20px',
  },
  credentialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginTop: '32px',
  },
  credentialCard: {
    textAlign: 'center',
    padding: '20px 12px',
    backgroundColor: '#F7FAFC',
    borderRadius: '12px',
  },
  credentialCardIcon: {
    fontSize: '28px',
    marginBottom: '8px',
  },
  credentialCardTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#1B4D3E',
  },
  credentialCardSubtitle: {
    fontSize: '12px',
    color: '#718096',
  },

  // Services
  servicesSection: {
    padding: '100px 0',
    backgroundColor: '#F7FAFC',
  },
  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
  },
  serviceCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  serviceIcon: {
    fontSize: '40px',
    marginBottom: '16px',
  },
  serviceTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: '12px',
  },
  serviceDesc: {
    fontSize: '14px',
    color: '#718096',
    lineHeight: '1.6',
  },

  // Approach
  approachSection: {
    padding: '100px 0',
    backgroundColor: '#1B4D3E',
  },
  approachContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  quoteBlock: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  quoteText: {
    fontSize: '24px',
    color: 'rgba(255,255,255,0.95)',
    lineHeight: '1.6',
    fontStyle: 'italic',
    fontFamily: "'Georgia', serif",
    marginBottom: '20px',
  },
  quoteAuthor: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '16px',
  },
  approachPoints: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  approachPoint: {
    display: 'flex',
    gap: '24px',
    alignItems: 'flex-start',
  },
  approachPointNumber: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'rgba(255,255,255,0.3)',
    fontFamily: "'Georgia', serif",
    lineHeight: '1',
  },
  approachPointTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '8px',
  },
  approachPointText: {
    fontSize: '15px',
    color: 'rgba(255,255,255,0.8)',
    lineHeight: '1.6',
  },

  // Membership
  membershipSection: {
    padding: '100px 0',
    backgroundColor: 'white',
  },
  membershipCard: {
    maxWidth: '700px',
    margin: '0 auto',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
  },
  membershipHeader: {
    backgroundColor: '#1B4D3E',
    padding: '32px',
    textAlign: 'center',
  },
  membershipTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: 'white',
    margin: '0 0 8px 0',
    fontFamily: "'Georgia', serif",
  },
  membershipSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '16px',
    margin: 0,
  },
  membershipBody: {
    padding: '40px',
  },
  membershipFeatures: {
    marginBottom: '32px',
  },
  membershipFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 0',
    borderBottom: '1px solid #E2E8F0',
    fontSize: '15px',
    color: '#2D3748',
  },
  checkIcon: {
    color: '#1B4D3E',
    fontWeight: '700',
    fontSize: '18px',
  },
  membershipCta: {
    textAlign: 'center',
  },
  membershipNote: {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '24px',
    lineHeight: '1.6',
  },
  membershipButton: {
    display: 'inline-block',
    backgroundColor: '#1B4D3E',
    color: 'white',
    padding: '16px 40px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
  },

  // Contact
  contactSection: {
    padding: '100px 0',
    backgroundColor: '#F7FAFC',
  },
  contactGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '60px',
    alignItems: 'start',
  },
  contactInfo: {},
  contactText: {
    fontSize: '16px',
    color: '#4A5568',
    lineHeight: '1.8',
    marginBottom: '32px',
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  contactDetail: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '16px',
    color: '#2D3748',
  },
  contactIcon: {
    fontSize: '20px',
  },
  contactForm: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '40px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: '24px',
    margin: '0 0 24px 0',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4A5568',
    marginBottom: '8px',
  },
  formInput: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '16px',
    border: '2px solid #E2E8F0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  formButton: {
    width: '100%',
    padding: '16px',
    backgroundColor: '#1B4D3E',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  thankYou: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  thankYouIcon: {
    width: '60px',
    height: '60px',
    backgroundColor: '#C6F6D5',
    color: '#1B4D3E',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 auto 20px',
  },
  thankYouTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1A202C',
    marginBottom: '12px',
  },
  thankYouText: {
    fontSize: '16px',
    color: '#4A5568',
    lineHeight: '1.6',
  },

  // Footer
  footer: {
    backgroundColor: '#1A202C',
    padding: '60px 0',
  },
  footerContent: {
    textAlign: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    marginTop: '16px',
    marginBottom: '8px',
  },
  footerCopyright: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '13px',
  },
};
