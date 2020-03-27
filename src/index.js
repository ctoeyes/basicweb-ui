import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux'
import store from './store/Store'
import {persistor} from './store/Store'
import {PersistGate} from 'redux-persist/lib/integration/react'
//支持IE浏览器
import "react-app-polyfill/ie11"
import "react-app-polyfill/stable"

import Theme from './common/Theme'
import Router from './router/Router'
import MySnackbars from './component/MySnackbar'

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
		    <ThemeProvider theme={Theme}>
			    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
			    <CssBaseline />
			    <Router/>
			    <MySnackbars />
		    </ThemeProvider>,
		</PersistGate>,
	</Provider> ,
	document.querySelector('#root'),
);