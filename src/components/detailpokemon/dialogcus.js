import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogCus(props) {
    const showDetails = useSelector(state => state.showDetails);
    const objPokemon = useSelector(state => state.objPokemon);
    const dispatch = useDispatch();
    const classes = useStyles();
	//==============================================================

  return (
    <div>
      <Dialog fullScreen open={showDetails} onClose={() => dispatch({ type: "showHideDetails"})} TransitionComponent={Transition} style={{ backgroundColor: '#F2F2F2'	}}>
          <AppBar className={classes.appBar} style={{backgroundColor: props.colorBase}}>
            <Toolbar>
              <IconButton edge="start" color="inheritcls" onClick={() => dispatch({ type: "showHideDetails"})} aria-label="close">
              <CloseIcon></CloseIcon>
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                <label className="pokemonNames">{ objPokemon.name }</label>
              </Typography>
            </Toolbar>
          </AppBar>
            {props.children}
      </Dialog>
    </div>
  );
}