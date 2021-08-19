import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStylesClassChat = makeStyles(theme =>
    createStyles({
        vimeo:{
            width: "65vh",
            height: "84vh"
        },
        chat:{
            width: "35vh",
            height: "83vh"
        },
        container:{
            width: "100%"
        }, 
    }),
  );

export const useStylesChat = makeStyles(theme =>
    createStyles({
        chat:{
            height: "100%",
            width: "100%",
            borderLeft: "1px solid #adadad"
        },
        messages:{
            display: "block",
            height: "90%",
            width: "100%",
            overflowY: "scroll",
            alignItems:"center",
            justifyContent: "center"
        },
        input:{
            width:"70%"
        },
        message:{
            width:"90%",
            margin: theme.spacing(1,0,1,1),
            minHeight: "50px",
            border: "1px solid orange",
            borderRadius: "5px",
            boxShadow: "5px 2px 10px 1px #FFB74D",
            padding: "5px",
            background:"#ffecb3"
        },
        name:{
            display: "flex",
            justifyContent: "flex-start"
        },
        moderador:{
            color: "purple",
            marginLeft: "5px"
        },
        estudiante:{
            color: "red",
            marginLeft: "5px"
        },
        form:{
            display:"flex",
            alingItems:"center",
            justifyContent: "center"
        },
        username:{
            fontWeight: "bolder"
        },
        hora:{
            float: "right",
            position: "initial",
            right: "0px",
            color:"gray"
        },
        info:{
            display: "flex",
            justifyContent: "space-between",
        }
    }),
);
