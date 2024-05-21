import React, { Fragment, Suspense, lazy } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import { Provider } from 'react-redux'
// import FirebaseProvider from './firebase/firebase'

import { createStore } from 'redux';
import userApp from "./store/footprints";

const store = createStore(userApp);


const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Pace color={theme.palette.primary.light} />
        <Suspense fallback={<Fragment />}>
              <Switch>
                <Route path="/c">
                <Provider store={store}>
                  {/* <FirebaseProvider> */}
                    <LoggedInComponent />
                  {/* </FirebaseProvider> */}
                </Provider>
                </Route>
                <Route path="/calculate">
                  <Provider store={store}>
                    {/* <FirebaseProvider> */}
                      <LoggedInComponent />
                    {/* </FirebaseProvider> */}
                  </Provider>
                </Route>
                <Route>
                  <LoggedOutComponent />
                </Route>
              </Switch>
        </Suspense>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
