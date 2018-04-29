import React from "react";

function isLocalEnv() {
  return window.location.hostname === "localhost";
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return false;
  }
  return navigator.serviceWorker.register("/service-worker.js");
}

export default function logProps(WrappedComponent) {
  return class extends React.Component {
    displayName = "with-serviceworker";
    componentDidMount() {
      if (!isLocalEnv()) {
        registerServiceWorker();
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
