import React, { useEffect, useState } from 'react'
import {
    Container, Grid, IconButton, NativeSelect, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search';
import { getAllUsers, getOneUser } from '../../redux/userReducer/userActions'
import { useStyles } from './styles/styles'
import TransitionsModal from './ModalMessages';

export default function ChatHistory() {

    const classes = useStyles()
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("")
    const [param, setParam] = useState("userName")
    const rows = useSelector(state => state.userReducer.users)

    const handleChange = (e) => {
        setKeyword(e.target.value)
    }

    const handleChangeParam = (e) => {
        setParam(e.target.value)
    }

    const handleSubmit = () => {
        dispatch(getOneUser({ keyword, param }))
    }

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <Container component="main" className={classes.container}>
            <TableContainer container={Paper} className={classes.tableContainer}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={5}>
                                <Toolbar>
                                    <Container className={classes.toolbar}>
                                        <Grid item sm={4} lg={4}>
                                            <Typography component="h1" variant="h5">
                                                usuarios
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={8} lg={8} className={classes.searchBar}>
                                            <NativeSelect
                                                value={param}
                                                onChange={handleChangeParam}
                                                inputProps={{
                                                    name: 'age',
                                                    id: 'age-native-helper',
                                                }}
                                            >
                                                <option aria-label="None" value="" />
                                                <option value={"name"}>Nombre completo</option>
                                                <option value={"userName"}>Usuario</option>
                                                <option value={"userRole"}>Rol</option>
                                            </NativeSelect>
                                            <TextField
                                                variant="standard"
                                                placeholder="Buscar usuario"
                                                onChange={handleChange}
                                            />
                                            <IconButton size="small" onClick={handleSubmit}>
                                                <SearchIcon />
                                            </IconButton>
                                        </Grid>
                                    </Container>
                                </Toolbar>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Nombre completo</TableCell>
                            <TableCell align="left">Usuario</TableCell>
                            <TableCell align="left">Rol</TableCell>
                            <TableCell align="left" colSpan={2}>Mensajes</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.userName}</TableCell>
                                <TableCell>{row.userRole}</TableCell>
                                <TableCell>
                                    {row.messages.length}
                                </TableCell>
                                <TableCell>
                                    <TransitionsModal messages={row.messages} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
