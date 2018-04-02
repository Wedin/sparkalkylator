import React from "react";
import Link from "next/link";
import { withRouter } from "next/router";
import { Menu, Icon, Popover } from "antd";
import { screenSizeIs } from "../utils/screenSize";

class Header extends React.Component {
  displayName = "Header";

  constructor(props) {
    super(props);
    const { router } = props; // eslint-disable-line

    this.state = {
      menuMode: "horizontal",
      mobileMenuOpen: false,
      currentPath: router.route,
    };

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentDidMount() {
    // MOVE TO UTIL
    const isMobile = screenSizeIs(["xs", "sm"]);
    /* eslint-disable */
    this.setState({ menuMode: isMobile ? "inline" : "horizontal" });
    /* eslint-enable */
  }

  handleMenuClick(e) {
    e.preventDefault();
    this.setState({ mobileMenuOpen: !this.mobileMenuOpen });
  }

  render() {
    const dropdownMenuContent = (
      <Menu mode={this.state.menuMode} selectedKeys={[this.state.currentPath]}>
        {this.state.menuMode === "inline" ? (
          <Menu.Item key="/">
            <Link prefetch href="/">
              <a href="/">Sparkalkylatorn</a>
            </Link>
          </Menu.Item>
        ) : null}

        <Menu.Item key="/rakna">
          <Link href="/">
            <a href="/rakna">Räkna på ränta på ränta</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/om">
          <Link href="/om">
            <a href="/om">Om</a>
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <header className="header">
        <nav className="header__inner header-menu">
          <Link href="/">
            <a href="/" className="home-link">
              Sparkalkylatorn
            </a>
          </Link>

          {this.state.menuMode === "inline" ? (
            <Popover
              placement="bottomRight"
              content={dropdownMenuContent}
              trigger="click"
              visible={this.state.mobileMenuOpen}
              arrowPointAtCenter
              onVisibleChange={visible => {
                this.setState({ mobileMenuOpen: visible });
              }}
            >
              <button type="button" className="menu-btn-wrapper">
                Menu
                <Icon type="bars" style={{ fontSize: 16, marginLeft: 6, marginTop: 2 }} onClick={this.handleMenuClick} />
              </button>
            </Popover>
          ) : null}

          {this.state.menuMode === "horizontal" ? dropdownMenuContent : null}
        </nav>
        <style jsx global>
          {`
            .ant-popover .ant-popover-inner-content {
              padding: 0;
            }
          `}
        </style>
        <style jsx>
          {`
            .header {
              width: 100%;
              border-bottom: 1px solid #e5e5e5;
              position: absolute;
              top: 0;
              background-color: transparent;
              height: 48px;
            }

            .home-link {
              font-weight: 400;
              font-size: 18px;
            }

            .menu-btn-wrapper {
              border: 0;
              background: 0;
              cursor: pointer;
              outline: 0;
              display: flex;
              justify-content: center;
              align-items: center;
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
                max-width: 820px;
              }
            }

            .nav-right {
              justify-content: flex-end;
              display: flex;
            }
          `}
        </style>
      </header>
    );
  }
}

export default withRouter(Header);
