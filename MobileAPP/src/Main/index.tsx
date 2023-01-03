import { Text } from "../components/Text";
import { Container, CategoriesContainer, Footer, MenuContainer, FooterContainer } from "./styles";
import Header from "../components/Header";
import { Categories } from "../components/Categories";
import { Menu } from "../components/Menu";


export default function Main(){
	return(
		<>
			<Container>
				<Header/>
				<CategoriesContainer>
					<Categories/>
				</CategoriesContainer>
				<MenuContainer>
					<Menu/>
				</MenuContainer>
			</Container>
			<Footer>
				<FooterContainer>

				</FooterContainer>
			</Footer>
		</>
	);
}
