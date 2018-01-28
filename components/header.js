import React from 'react';
import Link from 'next/link';

export default class extends React.Component {
  displayName = 'Header';
  render() {
    return (
      <div className="header">
        <nav className="header__inner header-menu">
          <Link href="/">
            <a>Sparkalkylatorn</a>
          </Link>

          <ul className="nav-right">
            <li>
              <Link href="/rakna">
                <a>Räkna på ränta på ränta</a>
              </Link>{' '}
            </li>
            <li>
              <Link href="/om">
                <a>Om</a>
              </Link>{' '}
            </li>
          </ul>
        </nav>
        <style jsx>
          {`
          .header {
            width: 100%
            border-bottom: 1px solid #e5e5e5;
            position: absolute;
            min-height: 50px;
            top: 0;
            background-color: transparent;
          }
        }

        .header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          margin: 0 auto;
          padding: 0 20px;
        }

        @media (min-width: 600px) {
          .header__inner {
            max-width: 720px;
          }
        }

        @media (min-width: 1080px) {
          .header__inner {
            max-width: 800px;
          }
        }

        a {
          padding: 25px 10px;
          border-bottom: 1px solid transparent;
          color: #696969;
        }
        a:hover {
          border-bottom: 1px solid #363636;
          color: #363636;
        }

        .nav-right {
          justify-content: flex-end;
          display: flex;
        }
        `}
        </style>
      </div>
    );
  }
}
