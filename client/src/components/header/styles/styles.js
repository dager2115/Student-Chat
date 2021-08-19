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
    }),
  );
