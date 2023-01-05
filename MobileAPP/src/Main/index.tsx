import {useState} from "react";
import { Container, CategoriesContainer, Footer, MenuContainer, FooterContainer } from "./styles";
import Header from "../components/Header";
import Categories  from "../components/Categories";
import Menu from "../components/Menu";
import Button from "../components/Button";
import TableModal from "../components/TableModal";


export default function Main(){

	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState("");

	function handleSaveTable(table: string){
		setSelectedTable(table);
	}

	function handleCancelOrder(){
		setSelectedTable("");
	}

	return(
		<>
			<TableModal visible={isTableModalVisible} onClose={() => setIsTableModalVisible(false)} onSave={handleSaveTable}/>
			<Container>
				<Header selectedTable={selectedTable} onCancelOrder={handleCancelOrder}/>
				<CategoriesContainer>
					<Categories/>
				</CategoriesContainer>
				<MenuContainer>
					<Menu/>
				</MenuContainer>
			</Container>
			<Footer>
				<FooterContainer>
					{!selectedTable &&
					(<Button onPress={() => setIsTableModalVisible(true)}>
						Novo Pedido
					</Button>)}
				</FooterContainer>
			</Footer>
		</>
	);
}
