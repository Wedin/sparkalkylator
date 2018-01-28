import React from 'react';

export default class extends React.Component {
  displayName = 'Footer';

  constructor(props) {
    super(props);

    this.state = {
      toggleState: '',
    };
    this.onClick = this.onClick.bind(this);
    this.reAnimate = this.reAnimate.bind(this);
    this.timeout = undefined;
  }

  onClick(evt) {
    evt.preventDefault();
    this.setState({ toggleState: 'toggling' });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.reAnimate, 500);
  }

  reAnimate() {
    this.setState({ toggleState: 'toggled' });
    setTimeout(() => {
      this.setState({ toggleState: '' });
    }, 2000);
  }
  render() {
    return (
      <footer className="footer">
        <button onClick={this.onClick} className={`${this.state.toggleState} cash`}>
          <span aria-label="Money with wings" role="img">
            💸
          </span>
        </button>
        <style jsx>
          {`
            .footer {
              position: absolute;
              right: 0;
              bottom: 0;
              left: 0;
              width: 100%;
              padding: 10px;
              background: #333;
            }
            .cash {
              opacity: 1;
              transition: all 0.5s ease;
              display: block;
              margin: 0 auto;
              background: none;
              border: 0;
              outline: 0;
              font-size: 20px;
            }
            .toggling {
              opacity: 0;
              transform: translateY(-50px);
            }
            .toggled {
              opacity: 0;
            }
          `}
        </style>
      </footer>
    );
  }
}
