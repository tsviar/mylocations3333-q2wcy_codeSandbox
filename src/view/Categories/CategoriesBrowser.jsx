//import React, { Component } from "react";

import React, 
{ 
  useContext, 
  useState, 
  useEffect,
  useCallback, 
  useMemo,

 // using React.memo to turn a componenet into a memoized component. 
 //This will force React to never re-render it, unless some of its properties change
 // memo ,

  forwardRef,
} from "react";

// import { Route, Switch } from "react-router";
// import {
//   useHistory,
//   useLocation,
//   useParams,
// } from "react-router-dom";

// import { createBrowserHistory } from "history";

import { StateDataManager } from "../../stateProvider/DataManager";
import * as api from "../../services/StorageService";
import marker from '@ajar/marker'; 


//import "../styles.css";
//import styled from "styled-components";
import main_palete_theme from '../../style.lib/PalleteStyles';
// import Image from '../../style.lib/images/table_background_1.jpg';
import Image from '../../style.lib/images/table_background_3.jpg';


// Material-UI
import { makeStyles, styled, withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import AddLocationRoundedIcon from '@material-ui/icons/AddLocationRounded';
// import AddIcon from "@material-ui/icons/Add";
// import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
// import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
// import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
// import DeleteOutline from '@material-ui/icons/DeleteOutline';


import {
  AddBox ,
  ArrowDownward ,
  Check  ,
  ChevronLeft ,
  ChevronRight ,
  Clear ,
  DeleteOutline ,
  Edit ,
  FilterList,
  FirstPage ,
  LastPage ,
  Remove ,
  SaveAlt ,
  Search,
  ViewColumn,
} from '@material-ui/icons/';


import { Tooltip, Fab, } from '@material-ui/core';

import MaterialTable, {MTableToolbar, } from 'material-table';


  // 2 ways to update the table:
  // 1) using useStateful,useSetState and the setting of columns and data is in the table
  // 2) using useState( [.. here is the setting of columns and data])

  //-------------------------------------------------
  //  modify hooks to use a callback like setState
  //  emulate the behavior of the 'classic' setState()
  //-------------------------------------------------
 
  const useStateful = initial => {
    const [value, setValue] = useState(initial);    
   // console.log(`useStateful CALLED BY SURPRIZE value`, value);
    return {
      value,
      setValue
    };
  };
  
  // Creates an statfull object
  // having state and setState 
  // 
  // setState is a callBack with no dependencies, 
  // which calls setValue with oldValue
  // which is actually the new updated value
  // since we pass v as ()=>resolve()
  // resolve is called with the new value
  // and tries to replace it with v (new value)
  // or the result of the v function
  
  const useSetState = initialValue => {
    const { value, setValue } = useStateful(initialValue);

    return {
      setState: useCallback(v => {
        return setValue(oldValue => ({
         // ...oldValue, /// this works badly on delete, 
                        /// and without it, edit updates local_categories_list a bit longer
          ...(typeof v === 'function' ? v(oldValue) : v)
        }));
      }, []),
      state: value
    };
  };



  /*
  const useSetState = initialValue => {
    const { value, setValue } = useStateful(initialValue);
    console.log(`====== CategoriesBrowser useSetState  value ==========\n`,value);
    console.log(`====== CategoriesBrowser useSetState  setValue ==========\n`,setValue);

    return {
      setState: useCallback(v => {
        console.log(`====== CategoriesBrowser useSetState setState useCallback v ==========\n`,v);

        return setValue((oldValue) => {

          console.log(`====== CategoriesBrowser useSetState setValue F oldValue ==========\n`,oldValue);
          console.log(`====== CategoriesBrowser useSetState setValue F  v ==========\n`,v);
         return(
            {
          ...oldValue,
          ...(typeof v === 'function' ? v(oldValue) : v)         
         });
      });
      }, []),
      state: value,
    };
  };
 */

/*
CategoriesBrowser categories_list  index.js:103 
Array(4)0: {name: "Cat1"}1: {name: "Cat2"}2: {name: "Cat3"}3: {name: "Cat4"}length: 4
__proto__: Array(0)

index.js:63 CategoriesBrowser 
local_categories_list                                                                       
Object
  setState: Æ (v)
  state: Array(4)0: {name: "Cat1"}1: {name: "Cat2"}2: {name: "Cat3"}3: {name: "Cat4"}
length: 4
__proto__: Array(0)__proto__: Object

//====== CategoriesBrowser useSetState setState  ==========

                                                                                            
CategoriesBrowser onRowUpdate oldData  
Object
  name: "Mehmet"
  surname: "Baran"
  birthYear: 1987
  birthCity: 63
  tableData:
      id: 0
      editing: undefined
      __proto__: Object
  __proto__: Object

CategoriesBrowser onRowUpdate newData
Object
name: "new3333"
surname: "Baran"
birthYear: 1987
birthCity: 63__proto__: Object


*/

//========================================================================
//          CategoriesBrowser
//          using MaterialTable: 
//          URL: https://material-table.com/#/docs/features/editable
//========================================================================

const CategoriesBrowser = () => {
  const { loading_lists,
    categories_list, set_categories_list,  
    set_error_message,
  } = useContext(StateDataManager);

  // using useState:
  //-----------------------------------------------------------------------
  const [local_categories_list, update_local_categories_list] = useState(
  {
    columns: [
      { 
        title: 'Category',                    
        field: 'name', type: 'string',
        cellStyle: {
          //backgroundColor: '#039be5',
          //color: '#FFF',
          fontSize:`1.1rem`,
          
        }, 
      },

      // { title: 'Surname', field: 'surname' },
      // { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      // {
      //   title: 'Birth Place',
      //   field: 'birthCity',
      //   lookup: { 34: 'Ä°stanbul', 63: 'ÅanlÄ±urfa' },
      // },
    ],

    data: categories_list ,

  });

  // using useStateful,useSetState
  //----------------------------------------------------------
  //const local_categories_list = useSetState(categories_list);


  const [selected_row, set_selected_row] = useState(null);
 

    marker.red(`===== CategoriesBrowser render ${selected_row}======================\n`);
    console.log(`CategoriesBrowser categories_list\n`,categories_list);      
    console.log(`CategoriesBrowser local_categories_list\n`,local_categories_list);
    console.log(`CategoriesBrowser selected_row\n`,selected_row);
    marker.red(`=======================================================\n`);


  // const history = createBrowserHistory();

  // const location = useLocation();
  // marker.obj(location, `CategoriessBrowser location \n`);

 // const history = useHistory();

  //const classes = useStyles();
  

    // console.log (`COLORRRRRRRRRRRR 
    // ============================================================================`,main_palete_theme);

    
  const tableIcons = {
    //Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Add:  forwardRef((props, ref) => (                  

        //  Spread the props to the underlying DOM element.
        //--------------------------------------------------      
        <Fab                 
          style={{                         
              background:  `${main_palete_theme.palette.add_button.main}`,  
              color: `${main_palete_theme.palette.primary.dark}`, 
            }}  
            aria-label="Add Category" >
            
            <AddLocationRoundedIcon ref={ref} {...props}  style={{ fontSize: 35, }}  />
            {/* <AddCircleRoundedIcon ref={ref} {...props} style={{ fontSize: 40 }} /> */}
          
          </Fab>                                                        
      
      )),    

    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


  const storeData = async (list_name, list) => {
      try {
        await api.storeListLS(list_name, list);
      
    } catch (err) {
      set_error_message(err.message);
    }
  }


  // need this when using useState()
  //-----------------------------------
  useEffect(() => {
    update_local_categories_list({columns:local_categories_list.columns, data:categories_list});
  //},  []);  
  },  [categories_list,  categories_list.length]);

  

  return (
    // <MuiThemeProvider theme={MainTheme}> 

    <MainBox >

      {loading_lists === false ? (
        <div>
          {/* <Filter /> */}
          <ContentBox>   

          {/* <MuiThemeProvider theme={table_theme}> */}

            <MaterialTable
                //title ="Categories list"
                title = {
                //  <h4 className={classes.tableTitleStyle}>Categories list</h4>
                <TableTitleStyle> Categories list </TableTitleStyle>
                }

                // when using useState
                //--------------------------------------
                columns={ local_categories_list.columns }

                // when using useStateful,useSetState
                //--------------------------------------
                // columns={[
                //   { 
                //     title: 'Category',                    
                //     field: 'name', type: 'string',
                //     cellStyle: {
                //       //backgroundColor: '#039be5',
                //       //color: '#FFF',
                //       fontSize:`1.1rem`,
                      
                //     }, 
                //   },

                // ]}

                // when using useStateful,useSetState
                //--------------------------------------
                // data={ categories_list }

                // when using useState
                //--------------------------------------
                data={ local_categories_list.data }
             
                  
                   //...material-table/dist/material-table.js:278
                   // _this.setState(
                   //   { isLoading: true },
                   //   function () {
                   //       _this.props.data(query)
                   //       .then(function (result) {
                   //             query.totalCount = result.totalCount;
                   //             query.page = result.page;
                   // ...
    
                //  data={[
                //    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                //    { name: 'Zerya BetÃ¼l', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                //  ]}  
                
 
                components={{

                  Toolbar: props => (
                    <MainTableToolBar>
                      <MTableToolbar  {...props} />
                    </MainTableToolBar>
                    ),      

              }}


                onRowClick={((evt, selectedRow) => set_selected_row({ selectedRow }))}

                options={{

                  sorting: true,  
                  
                  searchFieldStyle:
                  {
                    background: 'white', 
                    borderRadius: '0.5rem',                 
                  },

                  headerStyle: 
                  {  
                    backgroundColor: `${main_palete_theme.palette.top_menu.main}`,
                   // backgroundColor: '#01579b',
                   // backgroundColor: '#039be5',
                    color: `${main_palete_theme.palette.top_menu.text_color}`, //'#FFF',
                    fontSize:`1.2rem`,
                 },                //  {
                //     background: 'lightsalmon',                    
                //     color: "darkred",
                //     "&:hover": {
                //       color: "white"
                //     },
                //     fontSize:`1.2rem`,
                //  },

                  pageSizeOptions: [5, 10], // more then that look awefull...

                  rowStyle: rowData => ({
                    backgroundColor: (selected_row && selected_row.selectedRow && selected_row.selectedRow.tableData.id === rowData.tableData.id) ? //'#EEE' : '#FFF'
                  // 'blue' : //'honeydew':// '#FFF'
                   `${main_palete_theme.palette.table_row_style.selected}`:
                    `${main_palete_theme.palette.table_row_style.regular}`,   //'oldlace', //'#FFF',
                    height: 40,
                    textAlign: 'left',
                    //fontFamily: `Roboto Condensed`, 
                    fontFamily: 'Expletus Sans',
                    fontSize: `3rem`,//'1.4rem',

                  }),   


                }} //options
                
                icons={  tableIcons }

                // icons={{

                //   Add: forwardRef((props, ref) => (                  

                //     //  Spread the props to the underlying DOM element.
                //     //--------------------------------------------------
                    
                //     <Fab                 
                //        style={{                         
                //           background:  `${main_palete_theme.palette.add_button.main}`,  
                //           color: `${main_palete_theme.palette.primary.dark}`, 
                //          }}  
                //         aria-label="Add Category" >
                        
                //         <AddLocationRoundedIcon ref={ref} {...props}  style={{ fontSize: 35, }}  />
                //         {/* <AddCircleRoundedIcon ref={ref} {...props} style={{ fontSize: 40 }} /> */}
                       
                //       </Fab>                                                        
                   
                //   )),                    
 

                // }}


                localization={{

                  body: {
                    editRow: {
                      saveTooltip: "Save",
                      cancelTooltip: "Cancel",
                      deleteText: "Are you sure you want to delete this Category?"
                    },
                    addTooltip:"Add Category",
                    deleteTooltip: "Delete",
                    editTooltip: "Edit",

                    emptyDataSourceMessage: 'No records to display',
                    filterRow: {
                        filterTooltip: 'Filter list'
                    }
                  },

                  pagination: {
                    labelDisplayedRows: '{from}-{to} of {count}'
                  },

                  toolbar: {
                    nRowsSelected: '{0} row(s) selected'
                  },
                  header: {
                    actions: 'Actions'
                  },


                }}
            
                editable={{

                 // when using useState
                 //--------------------------------------
                 onRowAdd: newData =>
                 new Promise(resolve => {
                   setTimeout(() => {
                     resolve();
                     update_local_categories_list(prevState => {
                       const list = [...prevState.data];
                       console.log(`CategoriesBrowser onRowAdd list prevState.data\n`,list);

                       list.push(newData);                        
                       set_categories_list(list);
                       storeData('categories_list', list);

                       marker.blue(`===== CategoriesBrowser onRowUpdate  ======================\n ${newData}\n`);   
                       console.log(`CategoriesBrowser onRowAdd newData\n`,newData);
                       marker.obj(newData, `CategoriesBrowser onRowAdd newData\n`);

                       console.log(`CategoriesBrowser onRowAdd list\n`,list);
                       console.log(`CategoriesBrowser onRowAdd local_categories_list\n`,local_categories_list);
                       console.log(`CategoriesBrowser onRowAdd categories_list\n`,categories_list);
                       marker.blue(`=======================================================\n`);

                       return ({columns:local_categories_list.columns, data:list});
                      // return { ...prevState, list };
                     });
                   }, 600);
                 }),

                  // when using useStateful,useSetState
                  //--------------------------------------
                  // onRowAdd: newData =>
                  //   new Promise((resolve, reject) => {

                  //     setTimeout(() => {
                  //       {
                  //         const list = categories_list; //this.state.data;
                  //         list.push({name: newData.name});



                  //         local_categories_list.setState(list, () => resolve());
                  //         //local_categories_list.setState({list});

                  //         storeData('categories_list', list);
                          
                  //         marker.blue(`===== CategoriesBrowser onRowUpdate  ======================\n ${newData}\n`);   
                  //         console.log(`CategoriesBrowser onRowAdd newData\n`,newData);
                  //         marker.obj(newData, `CategoriesBrowser onRowAdd newData\n`);
                  //         marker.obj(list, `CategoriesBrowser onRowAdd list\n`);
                  //         console.log(`CategoriesBrowser onRowAdd list\n`,list);
                  //         console.log(`CategoriesBrowser onRowAdd local_categories_list\n`,local_categories_list);
                  //         console.log(`CategoriesBrowser onRowAdd categories_list\n`,categories_list);
                  //         marker.blue(`=======================================================\n`);
                  //       }
                  //       resolve();                  
                  //     }, 1000)
                  //   }),

                  // when using usetState
                  //--------------------------------------
                  onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                      update_local_categories_list(prevState => {
                        const list = [...prevState.data];
                        console.log(`CategoriesBrowser onRowUpdate list prevState.data\n`,list); 
                        
                        list[list.indexOf(oldData)] = newData;                     
                        set_categories_list(list);
                        storeData('categories_list', list);
 
                        marker.blue(`===== CategoriesBrowser onRowUpdate  ======================\n ${newData}\n`);   
                        console.log(`CategoriesBrowser onRowUpdate newData\n`,newData);
                        marker.obj(newData, `CategoriesBrowser onRowUpdate newData\n`);
 
                        console.log(`CategoriesBrowser onRowUpdate list\n`,list);
                        console.log(`CategoriesBrowser onRowUpdate local_categories_list\n`,local_categories_list);
                        console.log(`CategoriesBrowser onRowUpdate categories_list\n`,categories_list);
                        marker.blue(`=======================================================\n`);
 
                        return ({columns:local_categories_list.columns, data:list});
                       // return { ...prevState, list };
                      });
                     }
                    }, 600);
                  }),
 

                  // when using useStateful,useSetState
                  //--------------------------------------
                  // onRowUpdate: (newData, oldData) =>
                  //   new Promise((resolve, reject) => {
                  //     setTimeout(() => {
                  //       {
                  //         const list = categories_list; ///this.state.data;
                  //         const index = list.map(e => e.name).indexOf(oldData.name);
                  //         list[index] = {name: newData.name};


                  //         // Only a double callback (setState and an inner function call)
                  //         // displays the current list
                  //         // just like any of the 3 functions below would do
                  //         //this.setState({ list }, () => resolve());
                  //         local_categories_list.setState(list, () => resolve());
                  //         //local_categories_list.setState({list});
                          
                  //         storeData('categories_list', list);
                          
                  //         marker.blue(`===== CategoriesBrowser onRowUpdate  ======================\n ${oldData}\n`);
                  //         console.log(`onRowUpdate found index ${index}`);
                  //         console.log(`CategoriesBrowser onRowUpdate oldData\n`,oldData);
                  //         console.log(`CategoriesBrowser onRowUpdate newData\n`,newData);
                  //         marker.obj(oldData, `CategoriesBrowser onRowUpdate oldData\n`);
                  //         marker.obj(newData, `CategoriesBrowser onRowUpdate newData\n`);
                  //         marker.obj(list, `CategoriesBrowser onRowUpdate list\n`);
                  //         console.log(`CategoriesBrowser onRowUpdate list\n`,list);
                  //         console.log(`CategoriesBrowser onRowUpdate local_categories_list\n`,local_categories_list);
                  //         console.log(`CategoriesBrowser onRowUpdate categories_list\n`,categories_list);
                  //         marker.blue(`=======================================================\n`);


                  //       }
                  //        resolve();
                  //     }, 1000)
                  //   }),

                  
                  // when using usetState
                  //--------------------------------------
                  onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      update_local_categories_list(prevState => {
                        const list = [...prevState.data];
                        console.log(`CategoriesBrowser onRowDelete list prevState.data\n`,list);
 
                        list.splice(list.indexOf(oldData), 1);                       
                        set_categories_list(list);
                        storeData('categories_list', list);
 
                        marker.blue(`===== CategoriesBrowser onRowDelete  ======================\n ${oldData}\n`);   
                        console.log(`CategoriesBrowser onRowAdd newData\n`,oldData);
                         
                        console.log(`CategoriesBrowser onRowDelete list\n`,list);
                        console.log(`CategoriesBrowser onRowDelete local_categories_list\n`,local_categories_list);
                        console.log(`CategoriesBrowser onRowDelete categories_list\n`,categories_list);
                        marker.blue(`=======================================================\n`);
 
                        return ({columns:local_categories_list.columns, data:list});
                       // return { ...prevState, list }; 
                      });                    
                    }, 600);
                  }),

                  // when using useStateful,useSetState
                  //--------------------------------------
                  // onRowDelete: oldData =>
                  //   new Promise((resolve, reject) => {
                  //     setTimeout(() => {
                  //       {
                  //         let list = categories_list; /// this.state.data;
                  //         const index = list.map(e => e.name).indexOf(oldData.name);
                  //         list.splice(index, 1);
                  //         console.log(`onRowDelete list`, list);

                  //         // Only a double callback (setState and an inner function call)
                  //         // displays the current list
                  //         // just like any of the 3 functions below would do
                  //         //this.setState({ list }, () => resolve());
                  //         local_categories_list.setState(list, () => resolve());
                  //       //  local_categories_list.setState({list});
                        
                  //         storeData('categories_list', list);
                           
                  //       }
                  //        resolve();
                  //     }, 1000)
                  //   }),

                }}

            />

           {/* </MuiThemeProvider> */}

          </ContentBox>
        </div>

      ) : (
        <h1>... Loding ...</h1>
      )}
     
    </MainBox>

  //  </MuiThemeProvider> 

  );
};
export default CategoriesBrowser;

//===============================================================
// local styling
//===============================================================


// const useStyles = makeStyles({
//   colHeader: {
//      background: 'lightsalmon',
//      color: "darkred",
//      "&:hover": {
//        color: "blue"
//      },
//      fontSize:`1.2rem`,
//    },
  

//   tableTitleStyle: {   

//    color: `${main_palete_theme.palette.header.light}`, //'#FFF',
//    // color: 'white', //"blue",
//     "&:hover": {
//       color: `${main_palete_theme.palette.header.dark}`,
//       //color: 'lightblue',//"darkred",
//     }
//   }
// });

const TableTitleStyle = styled('h4')({

  color: `${main_palete_theme.palette.header.text_color}`,//'#FFF',
  // color: 'white', //"blue",
   "&:hover": {
     color: `${main_palete_theme.palette.header.text_hoover_color}`,
     //color: 'lightblue',//"darkred",
   },
});  

const MainTableToolBar = styled('div')({
  backgroundColor: `${main_palete_theme.palette.header.main}`,
  // backgroundColor: '#01579b',
  // backgroundColor: '#039be5',

   color: `${main_palete_theme.palette.header.text_color}`, //'#FFF',   

});  

const MainBox = styled('div')({
  minWidth: '100rem',
  maxWidth: '100vw',
  width: '100%',

 // background: `${main_palete_theme.palette.surface_background.regular_medium}  center / 100% no-repeat url(${Image}) `,

  // background: `${main_palete_theme.palette.surface_background.regular_medium}  center / cover no-repeat url(${Image}) `,

  background: `${main_palete_theme.palette.surface_background.regular_medium} center / cover no-repeat url(${Image}) `,
  
  //background: 'Cornsilk',
 // backgroundImage: `url(${Image})`,
 // backgroundSize: 'cover',
  //backgroundPosition: 'strech', //'center',
  //backgroundRepeat: `no-repeat`,
  //width: `calc(100vw + 48px)`,

  borderRadius: '0.4rem',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 0.4rem 1.5rem DimGrey',
  position: 'relative',
  //padding: '7.0rem 1.5rem 1.5rem',
  padding: '1.5rem 1.5rem 1.5rem',
  // marginTop: '3rem',
  fontSize: '1.5rem',

  // padding: '8.5rem 1.5rem 1.5rem','
  // margin-top: '10rem',' 
  // font-size: '3rem',' 
}); 

const ContentBox = styled('div')({
 
  //border:red solid 2px;
  borderRadius: '5px',
  //backgroundImage: `url(${Image})`,

  display: 'flex',
  alignItems: 'center', 
  // alignItems: 'space-between',   //
  // alignItems: 'flex-start', 
  justifyContent: 'space-around',   //'flex-start',
}); 