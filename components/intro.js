import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <div className="intro">
        <div className="intro__inner">
          <h1>Räkna på ränta på ränta</h1>
          <p>Här kan du räkna på vad ett månadssparande kommer att ge.</p>

          <p>Ränta på räntaeffekter ger långsiktigt en snöbollseffekt och ser till att dina pengar ökar kraftigt - om du sparar länge.</p>
        </div>
        <style jsx>{`
          .intro {
            padding-top: 120px;
          }

          .intro__inner {
            margin: 0 auto;
          }

          @media (min-width: 600px) {
            .intro__inner {
              max-width: 720px;
            }
          }

          @media (min-width: 1080px) {
            .intro__inner {
              max-width: 800px;
            }
          }
        `}</style>
      </div>
    );
  }
}
