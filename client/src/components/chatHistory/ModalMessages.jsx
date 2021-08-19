import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ListIcon from '@material-ui/icons/List';
import { Button, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { useStylesModal } from './styles/styles';



export default function TransitionsModal( { messages } ) {
  const classes = useStylesModal();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    console.log(messages)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton size="small" onClick={handleOpen}>
         <ListIcon/>
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <Container main>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>
                                <Typography>
                                    Lista de mensajes
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>mensaje</TableCell>
                            <TableCell>fecha</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messages && messages.map((message, i) => {
                            return (
                            <TableRow key={i}>
                                <TableCell>{message.message}</TableCell>
                                <TableCell>{message.createdAt.slice(0,10)} {message.createdAt.slice(11,16)}</TableCell>
                            </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
