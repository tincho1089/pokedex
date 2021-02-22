import React from 'react';
import { CircularProgress } from '@material-ui/core';


function CircularProgressLoad(props) {
	return (
		<div style={{width: '100%'}}>
			<CircularProgress size={80} style={{display: props.loadingView, margin: '0 auto'}} />
		</div>
	);
}

export default CircularProgressLoad;
