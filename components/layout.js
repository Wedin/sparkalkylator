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

    {children}

    <Footer />
    <style global jsx>{`
      body {
        background: white;
        margin: 0px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 16px;
        color: #363636;
      }
      .page-wrapper {
        position: relative;
        min-height: 100vh;
        padding-bottom: 100px;
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      a {
        color: #4772e5;
        text-decoration: none;
        transition: color 0.25s ease;
      }
      a:hover {
        color: #3a5fc1;
      }
      * {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
      }
    `}</style>
  </div>
);

export default layout;

layout.propTypes = {
  children: PropTypes.array.isRequired,
  title: PropTypes.string
};

layout.defaultProps = {
  title: 'Sparkalkylatorn'
};
