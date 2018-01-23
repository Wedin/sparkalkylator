import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleState: ''
    };
    this.onClick = this.onClick.bind(this);
    this.reAnimate = this.reAnimate.bind(this);
    this.timeout = undefined;
  }

  onClick() {
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
        <span aria-label="Money with wings" role="img" onClick={this.onClick} className={`${this.state.toggleState} cash`}>
          💸
        </span>
        <style jsx>{`
          .footer {
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            text-align: center;
            width: 100%;
            padding: 10px;
            background: #333;
          }
          .cash {
            opacity: 1;
            transition: all 0.5s ease;
            display: block;
          }
          .toggling {
            opacity: 0;
            transform: translateY(-50px);
          }
          .toggled {
            opacity: 0;
          }
        `}</style>
      </footer>
    );
  }
}
