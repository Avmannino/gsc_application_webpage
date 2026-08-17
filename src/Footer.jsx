import { useEffect, useRef, useState } from "react";
import "./Footer.css";

/*
  UPDATE THIS ONE VALUE when the final public GSC
  Wix domain is connected.

  Every internal footer link below is built from
  this base URL.
*/
const SITE_URL =
  "https://www.greenwichskatingclub.com";

const MEMBER_LOGIN_URL =
  "https://www.greenwichskatingclub.org/login";

const ADMISSIONS_EMAIL =
  "gscadmissions@greenwichskatingclub.org";

const ADMISSIONS_PHONE = "(203) 622-9583";

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
        }gsc-logo.png`}
        alt="Greenwich Skating Club"
      />
    </a>
  );
}

function ExploreMenu() {
  const [openGroups, setOpenGroups] = useState(() => new Set());
  const [panelHeights, setPanelHeights] = useState({});
  const panelRefs = useRef(new Map());

  useEffect(() => {
    const heights = {};

    panelRefs.current.forEach((node, title) => {
      heights[title] = node.scrollHeight;
    });

    setPanelHeights(heights);
  }, []);

  const toggleGroup = (title) => {
    setOpenGroups((current) => {
      const next = new Set(current);

      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }

      return next;
    });
  };

  return (
    <nav
      className="footer-menu"
      aria-label="Footer navigation"
    >
      <h2>Explore</h2>

      <div className="footer-menu__groups">
        {exploreGroups.map((group) => {
          const isOpen = openGroups.has(group.title);
          const measuredHeight = panelHeights[group.title];

          return (
            <div
              className="footer-menu__group"
              key={group.title}
            >
              <button
                type="button"
                className="footer-menu__group-title"
                onClick={() => toggleGroup(group.title)}
                aria-expanded={isOpen}
              >
                <span>{group.title}</span>

                <span
                  className={`footer-menu__group-arrow${
                    isOpen ? " footer-menu__group-arrow--open" : ""
                  }`}
                  aria-hidden="true"
                >
                  <ArrowIcon />
                </span>
              </button>

              <div
                className={`footer-menu__group-panel${
                  isOpen ? " footer-menu__group-panel--open" : ""
                }`}
                style={{
                  maxHeight: isOpen ? `${measuredHeight ?? 600}px` : "0px",
                }}
              >
                <ul
                  ref={(node) => {
                    if (node) {
                      panelRefs.current.set(group.title, node);
                    } else {
                      panelRefs.current.delete(group.title);
                    }
                  }}
                >
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
            </div>
          );
        })}
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

export default Footer;
