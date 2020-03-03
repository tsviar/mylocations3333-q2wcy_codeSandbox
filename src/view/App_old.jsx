import React, { useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";

//customize
// import styled from "styled-components";
//import "./styles.css";
import GlobalStyles from "../style.lib/globalStyles";
// customize with material-ui
// import settings from '../style.lib/settings';
// import colors from '../style.lib/colors';
// import PalletsStyles from '../style.lib/PalleteStyles';
import main_palete_theme from "../style.lib/PalleteStyles";

// Material-UI
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { makeStyles, styled } from "@material-ui/core/styles";
// import marker from '@ajar/marker';

import { WrapperDataManager } from "../stateProvider/DataManager";
import HomePage from "./HomePage";
// import ProfilesBrowser from "./ProfilesBrowser";

import CategoriesBrowser from "./Categories/CategoriesBrowser";

import LocationsBrowser from "./Locations/LocationsBrowser";
// import AddLocation from "./Locations/AddLocation";
// import EditLocation from "./Locations/EditLocation";
// import RemoveLocation from "./Locations/RemoveLocation";
// import ViewLocation from "./Locations/ViewLocation";

// since Links is exported as default,
// we can name it as we wish' hence, Menu
import Menu from "./MainMenu";
import TopBar from "./TopBar";
import MainBottomBar from "./MainBottomBar";

// let theme = createMuiTheme({
//   palette: {
//     primary: settings.theme.primaryColor.import,
//     secondary: settings.theme.secondaryColor.import,
//     type: settings.theme.type
//   }
// });

const history = createBrowserHistory();

//import ls from "local-storage";

// exact path = "/"
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

  return (
    <Router history={history}>
      {/* <MuiThemeProvider theme={theme}> */}
      <MuiThemeProvider theme={MainTheme}>
        <AppBox>
          {/* <TopBar>
            <Menu />
          </TopBar> */}

          <Route exact path="/" component={HomePage} />

          <WrapperDataManager>
            <Switch>
              {/* <Route path="/locations" component={ProfilesBrowser} /> */}

              {/* <Route exact path="/categories" children={< AddLocation />} /> */}
              <Route
                exact
                path="/categories"
                children={<CategoriesBrowser />}
              />

              <Route exact path="/locations" children={<LocationsBrowser />} />
              {/* component={LocationsBrowser} /> */}

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
              {/* <Route path="/locations" children={<AddLocation />} /> */}
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
