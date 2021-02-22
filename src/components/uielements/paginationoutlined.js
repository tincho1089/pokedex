import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    }
  },
}));

export default function PaginationOutlined() {
  const offsetPage = useSelector(state => state.offsetPage);
	const dispatch = useDispatch();

  const classes = useStyles();

  const handleChangePage = (event, newPage) => {
    dispatch({ type: "changeOffsetPage", offsetPage: newPage});
  };

  return (
    <div className={classes.root}>
      <Pagination style={{margin: '0 auto'}} count={1120 / 5} variant="outlined" shape="rounded" page={offsetPage} onChange={(event, value) => handleChangePage(event, value)} />
    </div>
  );
}