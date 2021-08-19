import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    table: {
      minWidth: 650,
       border: "1px solid #dadada",
       borderRadius: "7px"
    },
    container:{
       width: "80vw",
       marginTop: "30px",
       borderRadius: "7px"
    },
    tableContainer:{
       boxShadow: "5px 2px 10px 1px #adadad",
       borderRadius: "7px"
    },
    toolbar:{
        display: "flex",
        width: "100%"
    },
    searchBar:{
        display:"flex",
        justifyContent: "flex-end"
    }
});

export const useStylesModal = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #dadada',
      borderRadius: "5px",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
