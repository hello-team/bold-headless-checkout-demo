import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import {
    Dialog,
    Card,
    CardContent,
    AppBar,
    Toolbar,
    Button,
    Slide,
    CardMedia,
} from '@material-ui/core';
import { formatMoney } from 'accounting';

import SideCart from './SideCart';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: '2rem',
        flex: 1,
    },
    cartDrawer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        border: '1px solid #ebebeb',
        borderRadius: '4px',
        bottom: -15,
        boxShadow: '0 1px 4px rgb(95 95 95 / 14%)',
        display: 'flex',
        left: 0,
        margin: '1.5rem',
        padding: '0.75rem',
        position: 'fixed',
        right: 0,
        zIndex: 20,
    },
    cover: {
        maxWidth: '50px'
    },
    content: {
        flex: '1 0 auto',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function MobileCart(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.cartDrawer}>
                <div className={classes.details}>
                    <div className={classes.content}>
                        <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{ float: 'left' }}>
                            <strong>View details</strong>
                        </Button>
           
                    </div>
     
                </div>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <SideCart handleRefresh={props.handleRefresh} orderId={props.orderId} csrfToken={props.csrfToken} items={props.items} application={props.application} />
            </Dialog>
        </div>
    );
}