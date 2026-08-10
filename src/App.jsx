import { useEffect, useRef, useState } from "react";
import "./App.css";

const ADMISSIONS_EMAIL =
  "gscadmissions@greenwichskatingclub.org";

/*
Replace this value after you create the
Smart PDF Form in Jotform.

Example:
const JOTFORM_FORM_ID = "262221234567890";
*/
const JOTFORM_FORM_ID =
  "262216853183054";


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


function App() {
  const logoSource =
    `${import.meta.env.BASE_URL}gsc-logo.png`;


  return (
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

          <div className="application-hero__copy">

            <p className="application-hero__label">
              Membership
            </p>

            <h1>
              Admissions Procedures for
              Application to the
              Greenwich Skating Club
            </h1>

            <p className="application-hero__intro">
              Information for candidates and
              sponsoring Full Members regarding
              the Greenwich Skating Club
              membership application process.
            </p>

          </div>

        </div>

      </section>


      <section className="application-content">

        <div className="application-shell application-shell--content">

          <article className="application-copy">

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
  );
}


export default App;