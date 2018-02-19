import React from 'react';

export default class extends React.Component {
  displayName = 'Intro';
  render() {
    return (
      <div className="intro">
        <div className="intro__inner">
          <h1>Räkna på ränta på ränta</h1>
          <p>Här kan du räkna på vad ett månadssparande kommer att ge.</p>

          <p>Ränta på räntaeffekter ger långsiktigt en snöbollseffekt och ser till att dina pengar ökar kraftigt - om du sparar länge.</p>
        </div>
        <style jsx>
          {`
            .intro {
              padding-top: 40px;
            }

            .intro__inner {
              margin: 0 auto;
            }
            @media (max-width: 840px) {
              .intro__inner {
                padding: 0 16px;
              }
            }

            @media (min-width: 576px) {
              .intro__inner {
                max-width: 820px;
              }
            }
          `}
        </style>
      </div>
    );
  }
}
