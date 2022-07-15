import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {AppContext, Store} from "./store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<AppContext.Provider value={new Store() as any}>
			<App/>
		</AppContext.Provider>
	</React.StrictMode>
);
