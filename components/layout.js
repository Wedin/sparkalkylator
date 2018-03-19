import Head from 'next/head';
import PropTypes from 'prop-types';
import Header from './header';
import Footer from '../components/footer';

const layout = ({ children, title }) => (
  <div className="page-wrapper">
    <Head>
      <title>{title}</title>
    </Head>
    <Header />

    <div className="content">{children}</div>

    <Footer />
    <style global jsx>
      {`
        body {
          background: white;
          margin: 0px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
          font-size: 16px;
          color: #363636 !important;
        }
        .page-wrapper {
          position: relative;
          min-height: 100vh;
          padding-bottom: 100px;
        }
        .content {
          padding-top: 48px;
        }
        .anim-1 {
          animation-delay: 0.3s;
        }
        .anim-2 {
          animation-delay: 0.5s;
        }
        .anim-3 {
          animation-delay: 0.8s;
        }
        @keyframes fade-in-anim {
          0% {
            transform: scale(0.9);
            opacity: 0.005;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .fade-in {
          animation-name: fade-in-anim;
          animation-duration: 0.3s;
          animation-fill-mode: both;
          animation-timing-function: ease;
        }
        * {
          -moz-box-sizing: border-box;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }

        img {
          max-width: 100%;
        }
      `}
    </style>
  </div>
);

export default layout;

layout.propTypes = {
  children: PropTypes.array.isRequired,
  title: PropTypes.string,
};

layout.defaultProps = {
  title: 'Sparkalkylatorn',
};
