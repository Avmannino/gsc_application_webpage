import { useEffect, useRef, useState } from "react";
import "./App.css";

const ADMISSIONS_EMAIL =
  "gscadmissions@greenwichskatingclub.org";

const ADMISSIONS_PHONE = "(203) 622-9583";

/*
Replace this value after you create the
Smart PDF Form in Jotform.

Example:
const JOTFORM_FORM_ID = "262221234567890";
*/
const JOTFORM_FORM_ID =
  "262216853183054";

/*
Replace this value once the final public GSC
Wix domain is connected. Every footer link
below is built from this base URL.
*/
const SITE_URL =
  "https://www.greenwichskatingclub.com";

const MEMBER_LOGIN_URL =
  "https://www.greenwichskatingclub.org/login";

const exploreGroups = [
  {
    title: "About",
    links: [
      {
        label: "About GSC",
        href: `${SITE_URL}/about`,
      },
      {
        label: "Club History",
        href: `${SITE_URL}/history`,
      },
      {
        label: "Board of Governors",
        href: `${SITE_URL}/board`,
      },
      {
        label: "GSC Alumni",
        href: `${SITE_URL}/alumni`,
      },
    ],
  },
  {
    title: "Membership",
    links: [
      {
        label: "Admissions Process",
        href: `${SITE_URL}/admissions`,
      },
    ],
  },
  {
    title: "Programs",
    links: [
      {
        label: "Learn to Skate",
        href: `${SITE_URL}/learn-to-skate`,
      },
      {
        label: "Mini Mites",
        href: `${SITE_URL}/mini-mites`,
      },
      {
        label: "Youth Travel Hockey",
        href: `${SITE_URL}/youth-travel-hockey`,
      },
      {
        label: "Stateline Girls Hockey",
        href: `${SITE_URL}/stateline-girls-hockey`,
      },
      {
        label: "Figure Skating",
        href: `${SITE_URL}/figure-skating`,
      },
      {
        label: "Adult Hockey",
        href: `${SITE_URL}/adult-hockey`,
      },
    ],
  },
  {
    title: "Contact",
    links: [
      {
        label: "Map & Directions",
        href: `${SITE_URL}/directions`,
      },
      {
        label: "Contact Form",
        href: `${SITE_URL}/contact`,
      },
    ],
  },
];


function ApplicationEmbed() {
  const iframeRef = useRef(null);

  const [iframeHeight, setIframeHeight] =
    useState(1050);

  const isConfigured =
    JOTFORM_FORM_ID !==
    "YOUR_JOTFORM_FORM_ID";


  useEffect(() => {
    if (!isConfigured) {
      return undefined;
    }


    const handleMessage =
      (event) => {

        const allowedOrigins = [
          "https://form.jotform.com",
          "https://www.jotform.com",
        ];


        if (
          !allowedOrigins.includes(
            event.origin
          )
        ) {

          return;
        }


        if (
          typeof event.data !==
          "string"
        ) {

          return;
        }


        const messageParts =
          event.data.split(":");

        const action =
          messageParts[0];


        if (
          action === "setHeight"
        ) {

          const nextHeight =
            Number(
              messageParts[1]
            );


          if (
            Number.isFinite(
              nextHeight
            ) &&
            nextHeight > 200
          ) {

            setIframeHeight(
              nextHeight + 20
            );
          }
        }


        if (
          action ===
          "scrollIntoView" &&
          iframeRef.current
        ) {

          iframeRef.current
            .scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
        }
      };


    window.addEventListener(
      "message",
      handleMessage
    );


    return () => {
      window.removeEventListener(
        "message",
        handleMessage
      );
    };
  }, [isConfigured]);


  if (!isConfigured) {
    return (
      <div className="application-placeholder">

        <div className="application-placeholder__mark">
          GSC
        </div>

        <div className="application-placeholder__content">

          <h3>
            Electronic Application
          </h3>

          <p>
            The electronic membership application
            will appear here once the application
            has been connected.
          </p>

          <p className="application-placeholder__setup">
            Replace{" "}
            <code>
              YOUR_JOTFORM_FORM_ID
            </code>{" "}
            in App.jsx with the Form ID from
            Jotform.
          </p>

        </div>

      </div>
    );
  }


  return (
    <iframe
      ref={iframeRef}
      className="application-frame"
      title="Greenwich Skating Club Membership Application"
      src={`https://form.jotform.com/${JOTFORM_FORM_ID}?isIframeEmbed=1`}
      style={{
        height: `${iframeHeight}px`,
      }}
      allow="geolocation; microphone; camera"
      scrolling="no"
    />
  );
}


function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />

      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="
          M20 10
          c0 5-8 11-8 11
          S4 15 4 10
          a8 8 0 1 1 16 0Z
        "
      />

      <circle
        cx="12"
        cy="10"
        r="2.5"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
      />

      <circle
        cx="12"
        cy="12"
        r="4"
      />

      <circle
        className="icon-fill"
        cx="17.5"
        cy="6.5"
        r="1"
      />
    </svg>
  );
}

function FooterLogo() {
  return (
    <a
      className="footer-logo"
      href={`${SITE_URL}/`}
      target="_top"
      aria-label="Greenwich Skating Club home"
    >
      <img
        src={`${
          import.meta.env.BASE_URL
        }gsc-alt-logo.png`}
        alt="Greenwich Skating Club"
      />
    </a>
  );
}

function ExploreMenu() {
  return (
    <nav
      className="footer-menu"
      aria-label="Footer navigation"
    >
      <h2>Explore</h2>

      <div className="footer-menu__groups">
        {exploreGroups.map((group) => (
          <div
            className="footer-menu__group"
            key={group.title}
          >
            <h3 className="footer-menu__group-title">
              {group.title}
            </h3>

            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_top"
                  >
                    <span>{link.label}</span>

                    <ArrowIcon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}

function ConnectPanel() {
  return (
    <section
      className="footer-connect"
      aria-labelledby="connect-title"
    >
      <div className="footer-connect__info">
        <h2 id="connect-title">
          Connect
        </h2>

        <p>
          Questions about joining Greenwich Skating
          Club or visiting the rink?
        </p>

        <div className="footer-connect__details">
          <a
            href={`${SITE_URL}/directions`}
            target="_top"
          >
            <PinIcon />

            <span>
              Cardinal Road · Greenwich, Connecticut
            </span>
          </a>

          <a href={`mailto:${ADMISSIONS_EMAIL}`}>
            <EmailIcon />

            <span>
              {ADMISSIONS_EMAIL}
            </span>
          </a>

          <a
            href={`tel:+1${ADMISSIONS_PHONE.replace(/\D/g, "")}`}
          >
            <PhoneIcon />

            <span>
              Phone: {ADMISSIONS_PHONE}
            </span>
          </a>
        </div>

        <a
          className="member-button"
          href={MEMBER_LOGIN_URL}
          target="_blank"
          rel="noreferrer"
        >
          <span>Member Login</span>

          <ArrowIcon />
        </a>

        <a
          className="instagram-link"
          href="https://www.instagram.com/thegreenwichskatingclub/"
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon />

          <span>
            Follow GSC on Instagram
          </span>
        </a>
      </div>

      <div className="footer-map">
        <iframe
          title="Greenwich Skating Club location"
          src="https://www.google.com/maps?q=Greenwich+Skating+Club,+Cardinal+Road,+Greenwich,+CT&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}

function Footer() {
  const currentYear =
    new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div
        className="site-footer__accent"
        aria-hidden="true"
      >
        <span />
        <span />
      </div>

      <div
        className="site-footer__rings"
        aria-hidden="true"
      />

      <div className="footer-container site-footer__main">
        <section
          className="footer-brand"
          aria-label="Greenwich Skating Club"
        >
          <FooterLogo />
        </section>

        <ExploreMenu />

        <ConnectPanel />
      </div>

      <div className="site-footer__bottom">
        <div className="footer-container site-footer__bottom-inner">
          <p>
            © {currentYear} Greenwich Skating Club
          </p>
        </div>
      </div>
    </footer>
  );
}


function App() {
  const logoSource =
    `${import.meta.env.BASE_URL}gsc-logo.png`;


  return (
    <>

    <main className="application-page">

      <section className="application-hero">

        <div className="application-shell">

          <div className="application-hero__logo-wrap">
            <img
              className="application-hero__logo"
              src={logoSource}
              alt="Greenwich Skating Club"
            />
          </div>

          <h1>
            <span className="hero-title__outline">
              Membership
            </span>{" "}
            <span className="hero-title__solid">
              At GSC
            </span>
          </h1>

        </div>

      </section>


      <section className="application-content">

        <div className="application-shell application-shell--content">

          <article className="application-copy">

            <div className="section-heading">

              <span className="section-heading__line" />

              <h2>
                Admissions Procedures for
                Application to the
                Greenwich Skating Club
              </h2>

            </div>

            <p>
              The Greenwich Skating Club has a
              limited number of openings each year
              for new members. Admission decisions
              are made at the discretion of the
              Admissions Committee and with the
              approval of the Board of Governors.
            </p>

            <p>
              To seek membership, a candidate must
              be proposed and sponsored by a Full
              Member. Members may propose and
              sponsor up to two Candidates for
              membership at the same time. A
              Member may not propose an additional
              Candidate until one or both of their
              initial Candidates have been admitted
              to the Club.
            </p>

            <p>
              The Sponsor is responsible for
              submitting a Letter of Proposal and
              the completed application form on
              behalf of the Candidate. It is the
              Sponsor’s responsibility to arrange
              and coordinate any meetings of
              introduction necessary for membership
              on behalf of their candidate.
              Candidates are required to be
              personally known by at least two
              members of the Admissions Committee
              and two members of the Board of
              Governors at the time their
              application is acted upon for a vote
              for approval of membership by the
              Board.
            </p>

            <p>
              The Board strongly encourages members
              to propose candidates who will
              actively participate in the club’s
              figure skating and hockey programs,
              volunteer in the various club
              activities and follow the decorum of
              good standing members.
            </p>

            <p>
              Candidates must have a residence in
              Greenwich or their children must
              attend school in Greenwich.
            </p>


            <section className="process-section">

              <div className="section-heading">

                <span className="section-heading__line" />

                <h2>
                  Admission Process
                </h2>

              </div>

              <p className="process-section__intro">
                Following is a description of the
                process for admission:
              </p>

              <p className="process-section__lead">
                The Full Member proposing a
                Candidate should:
              </p>


              <div className="process-list">

                <div className="process-step">

                  <div className="process-step__number">
                    1
                  </div>

                  <div className="process-step__body">

                    <h3>
                      Complete the Application
                    </h3>

                    <p>
                      Have the Candidate complete
                      and sign the Application Form.
                    </p>

                  </div>

                </div>


                <div className="process-step">

                  <div className="process-step__number">
                    2
                  </div>

                  <div className="process-step__body">

                    <h3>
                      Submit the Application Package
                    </h3>

                    <p>
                      Write a Letter of Proposal
                      addressed to the Admissions
                      Committee. The Proposer should
                      email the completed application
                      package (completed application
                      and proposal letter) to:
                    </p>

                    <a
                      className="email-link"
                      href={`mailto:${ADMISSIONS_EMAIL}`}
                    >
                      Sarah Orum —{" "}
                      {ADMISSIONS_EMAIL}
                    </a>

                    <p className="process-step__note">
                      Incomplete applications will be
                      returned to the Proposers.
                    </p>

                  </div>

                </div>


                <div className="process-step">

                  <div className="process-step__number">
                    3
                  </div>

                  <div className="process-step__body">

                    <h3>
                      Admissions Wait List
                    </h3>

                    <p>
                      Candidates will be placed on
                      the admissions wait list based
                      on the date the completed
                      application and the proposing
                      letter are received. Candidates
                      are encouraged to meet two
                      members of the Admissions
                      Committee within 60 days of
                      their application being
                      received in order to remain on
                      the Wait List. Upon receipt of
                      the completed application
                      package, and at the discretion
                      of the Admissions Committee,
                      the Candidate’s name and the
                      name of their Sponsor may be
                      made available to the General
                      Membership for comment and
                      review.
                    </p>

                  </div>

                </div>


                <div className="process-step">

                  <div className="process-step__number">
                    4
                  </div>

                  <div className="process-step__body">

                    <h3>
                      Final Approval
                    </h3>

                    <p>
                      The Sponsor will be notified by
                      the Admissions Committee when
                      an opening for membership has
                      become available and their
                      Candidate’s application is
                      ready to be acted upon for
                      final approval of the Board.
                      The Candidate may be asked to
                      submit a follow-up
                      questionnaire. At this time
                      the Sponsor will be responsible
                      for coordinating any necessary
                      meetings of introduction with
                      at least two members of the
                      Board of Governors.
                    </p>

                  </div>

                </div>

              </div>

            </section>


            <aside className="application-note">

              <p className="application-note__label">
                Please Note
              </p>

              <p>
                It is the responsibility of the
                Sponsor to ensure that at least two
                Admissions Committee members and
                two members of the Board of
                Governors personally know the
                candidate at the time his or her
                application is acted upon for final
                vote of approval by the Board. In
                addition, Candidates are strongly
                encouraged to meet as many Board
                members as possible before the Board
                votes on their admission. As
                outlined above, an application
                should be submitted even if the
                Candidate is not yet known by the
                requisite number of Board of
                Governors/Admissions Committee
                members.
              </p>

            </aside>


            <section className="contact-section">

              <div className="section-heading">

                <span className="section-heading__line" />

                <h2>
                  Admissions Contact
                </h2>

              </div>

              <p>
                Please contact the Admissions
                Chairperson, Sarah Orum at{" "}
                <a
                  href={`mailto:${ADMISSIONS_EMAIL}`}
                >
                  {ADMISSIONS_EMAIL}
                </a>{" "}
                if you have any questions.
              </p>

            </section>


            <section className="committee-section">

              <div className="section-heading">

                <span className="section-heading__line" />

                <h2>
                  Admissions Committee
                </h2>

              </div>

              <div className="committee-list">

                <div className="committee-chair">
                  <span>
                    Chairperson
                  </span>

                  <strong>
                    Sarah Orum
                  </strong>
                </div>


                <div className="committee-grid">

                  <p>
                    Melissa Denis
                  </p>

                  <p>
                    Jamie Denis
                  </p>

                  <p>
                    Sacha Janke
                  </p>

                  <p>
                    Drew McCormack
                  </p>

                  <p>
                    Taylor Boswell
                  </p>

                  <p>
                    Lizzie Boswell
                  </p>

                  <p>
                    Nicole Kwasnieski
                  </p>

                  <p>
                    Stan Kwasniewski
                  </p>

                  <p>
                    Bill Orum
                  </p>

                </div>

              </div>

            </section>

          </article>

        </div>

      </section>


      <section
        className="electronic-application"
        id="application"
      >

        <div className="application-shell">

          <div className="electronic-application__heading">

            <p className="electronic-application__label">
              Apply
            </p>

            <h2>
              Membership Application
            </h2>

            <p>
              Complete the application below.
              When finished, select Submit to
              deliver the completed application
              electronically to the Greenwich
              Skating Club Admissions Committee.
            </p>

          </div>


          <div className="application-form-wrap">

            <ApplicationEmbed />

          </div>


          <p className="application-privacy">
            Application information is submitted
            directly through the electronic
            application system to the Greenwich
            Skating Club Admissions Committee.
          </p>

        </div>

      </section>

    </main>

    <Footer />

    </>
  );
}


export default App;