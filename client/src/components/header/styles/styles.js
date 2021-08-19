import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme =>
    createStyles({
      header:{
        background: theme.palette.primary.main,
        height: "15vh"
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        color: "#fff",
        flexGrow: 1,
        fontFamily:"Tahoma",
        fontWeight: "bold"
      },
      user:{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end"
      },
      navigation:{
        display: "flex",
        alignItems:"center",
        justifyContent:"space-evenly",
      },
      toolContainer:{
        display: "flex",
        width: "100%",
        justifyContent: "space-between"
      },
      titleContainer:{
        display: "flex",
        alignItems: "center"
      },
      link:{
        textDecoration: "none",
        color: "#fff",
        fontSize:"1.5rem"
      },
      avatar:{
        color: theme.palette.primary.main,
        background: "#fff",
        marginRight: "10px"
      }
    }),
  );
