import Head from "next/head";
import PropTypes from "prop-types";
import Header from "./header";
import Footer from "../components/footer";

const layout = ({ children, title }) => (
  <div className="page-wrapper">
    <Head>
      <title>{title}</title>
    </Head>
    <Header />

    <div className="content">{children}</div>

    <Footer />
    {/* Some style is important to override ant design  */}
    <style global jsx>
      {`
        body {
          background: white;
          margin: 0px;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          font-size: 16px !important;
          color: #363636 !important;
        }
        a {
          color: #0469ef !important;
        }
        .page-wrapper {
          position: relative;
          min-height: 100vh;
          padding-bottom: 100px;
          overflow: hidden;
        }
        .content {
          padding-top: 48px;
        }
        .anim-1 {
          animation-delay: 0.25s;
        }
        .anim-2 {
          animation-delay: 0.5s;
        }
        .anim-3 {
          animation-delay: 0.75s;
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
          animation-duration: 0.25s;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.1, 0.93, 0.3, 1.11);
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
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  title: PropTypes.string,
};

layout.defaultProps = {
  title: "Sparkalkylatorn",
};
