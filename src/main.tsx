import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import {AppContext, mainStoreInstance} from "./store";
import {configure} from "mobx";

configure({
	useProxies: "never",
});

let mobx_store = mainStoreInstance(true);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	// <React.StrictMode>
	<div onContextMenu={(e) => e.preventDefault()}>
		<AppContext.Provider value={mobx_store}>
			<App/>
		</AppContext.Provider>
	</div>
	// </React.StrictMode>
);
