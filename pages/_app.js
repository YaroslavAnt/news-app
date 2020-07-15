// import { Provider } from "mobx-react";
import { useStore, initializeStore } from "../store";

// function App({ Component, pageProps }) {
//   const store = useStore(pageProps.initialState);

//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// export default App;

import React from "react";
import App, { Container } from "next/app";
import { Provider } from "mobx-react";

class CustomApp extends App {
  static async getInitialProps(appContext) {
    const mobxStore = initializeStore();
    appContext.ctx.mobxStore = mobxStore;
    const appProps = await App.getInitialProps(appContext);
    return {
      ...appProps,
      initialMobxState: mobxStore,
    };
  }

  constructor(props) {
    super(props);
    const isServer = typeof window === "undefined";
    this.mobxStore = isServer
      ? props.initialMobxState
      : initializeStore(props.initialMobxState);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={this.mobxStore}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default CustomApp;
