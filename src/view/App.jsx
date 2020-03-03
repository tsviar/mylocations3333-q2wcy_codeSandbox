import React, { useMemo } from "react";
import {
  //BrowserRouter as Router,
  Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { createBrowserHistory } from "history";

import main_palete_theme from "../style.lib/PalleteStyles";
import GlobalStyles from "../style.lib/globalStyles";

// Material-UI
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles, styled } from "@material-ui/core/styles";
// import marker from '@ajar/marker';

import { WrapperDataManager } from "../stateProvider/DataManager";

import HomePage from "./HomePage";
import CategoriesBrowser from "./Categories/CategoriesBrowser";
import LocationsBrowser from "./Locations/LocationsBrowser";

// since Links is exported as default,
// we can name it as we wish' hence, Menu

import MainBottomBar from "./MainBottomBar";

const history = createBrowserHistory();

//import ls from "local-storage";

const App = () => {
  // According to:
  // https://material-ui.com/customization/palette/#example

  const MainTheme = useMemo(() => createMuiTheme(main_palete_theme), []);

  // According to:
  // https://material-ui.com/customization/palette/#example
  // const MainTheme = useMemo(
  //   () => createMuiTheme({
  //     palette:  main_palete_theme.palette,
  //     overrides: main_palete_theme.overrides,

  //     }) ,
  //     [],
  //   );

  // const MainTheme = useMemo(
  // this creates a new empty object, great interview Q
  //   () => createMuiTheme({main_palete_theme}) ,
  //     [],
  //   );
  /*
    const [color, setColor] = React.useState('default');

    const blue_theme = React.useMemo(() => {
    if (color === 'blue') {
      return createMuiTheme({
        palette: {
          secondary: {
            main: blue[500],
            contrastText: '#fff',
          },
        },
      });
    }
    return createMuiTheme();
  }, [color]);
*/

  // const table_theme = createMuiTheme({

  //  direction: direction,
  //   palette: {
  //    type: 'light',
  //   },
  //   overrides: {
  //     MuiTooltip: {
  //       tooltip: {
  //         fontSize: 30,
  //         color: '#18ffff',
  //         backgroundColor: '#2962ff',
  //         margin: "150px",
  //       },
  //      },
  //   }
  // });

  //   console.log (`COLORRRRRRRRRRRR
  // ============================================================================`,main_palete_theme);

  console.log("ENV", process.env.NODE_ENV);

  return (
    <Router history={history}>
      <MuiThemeProvider theme={MainTheme}>
        <AppBox>
          {/* <HomePage /> */}
          <Route exact path="/" component={HomePage} />

          <WrapperDataManager>
            <Switch>
              <Route
                exact
                path="/categories"
                children={<CategoriesBrowser />}
              />

              <Route exact path="/locations" children={<LocationsBrowser />} />

              <Route
                exact
                path="/locations/view"
                children={() => <LocationsBrowser />}
              />
              <Route
                exact
                path="/locations/add"
                children={() => <LocationsBrowser />}
              />
              <Route
                exact
                path="/locations/edit"
                children={() => <LocationsBrowser />}
              />
              <Route
                path="/locations/remove"
                children={() => <LocationsBrowser />}
              />
            </Switch>
          </WrapperDataManager>

          <MainBottomBar />
        </AppBox>
        <GlobalStyles />
      </MuiThemeProvider>
    </Router>
  );
};

export default App;

const AppBox = styled("div")({
  maxWidth: "100vw",
  // background: 'lvwightskyblue',
  // padding: '3rem 7.5rem',

  padding: "2rem 10rem 5rem 10rem",
  borderRadius: "0.8rem",
  display: "flex",
  flexDirection: "column"
});

// Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app.
//     in GlobalStyleComponent (at App_333.jsx:48)
//     in App (at src/​index.js:32)
