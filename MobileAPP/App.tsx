import { StatusBar } from "react-native";
import Main from "./src/Main";
import  "intl";
import "intl/locale-data/jsonp/pt-BR";

const App = () => {

	return (
		<>
			<StatusBar barStyle={"default"}/>
			<Main/>
		</>
	);
};

export default App;
