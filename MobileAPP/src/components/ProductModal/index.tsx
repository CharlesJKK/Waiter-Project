import { Alert, FlatList, Modal } from "react-native";
import { Product } from "../../types/Product";
import formatCurrency from "../../utils/formatCurrency";
import Button from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { Image, CloseButton, Header, ModalBody, IngredientsContainer, Ingredient, Footer, FooterContainer, PriceContainer } from "./styles";

interface ProductModalProps{
	visible: boolean;
	onClose: () => void;
	product: null | Product;
}

export default function ProductModal({visible, onClose, product}: ProductModalProps){

	if(!product){
		return null;
	}

	return(
		<Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
			<Image source={{uri: `http://192.168.18.4:3001/uploads/${product.imagePath}`}}>
				<CloseButton onPress={onClose}>
					<Close/>
				</CloseButton>
			</Image>
			<ModalBody>
				<Header>
					<Text weight="Semibold" size={24}>{product.name}</Text>
					<Text color="#666" style={{marginTop: 8}}>{product.description}</Text>
				</Header>
				{product.ingredients.length > 0 &&(
					<IngredientsContainer>
						<Text weight="Semibold" color="#666">Ingredientes</Text>
						<FlatList
							data={product.ingredients}
							keyExtractor={item => item._id}
							style={{marginTop: 16}}
							showsVerticalScrollIndicator={false}
							renderItem={({item}) =>(
								<Ingredient>
									<Text size={14} color="#666">{item.icon}</Text>
									<Text size={14} color="#666" style={{marginLeft: 20}}>{item.name}</Text>
								</Ingredient>
							)}
						/>
					</IngredientsContainer>
				)}
			</ModalBody>
			<Footer>
				<FooterContainer>
					<PriceContainer>
						<Text color="#666">Preço</Text>
						<Text size={20} weight="Semibold">{formatCurrency(product.price)}</Text>
					</PriceContainer>
					<Button onPress={() => Alert.alert("Adicionar ao pedido")}>Adicionar ao pedido</Button>
				</FooterContainer>
			</Footer>
		</Modal>
	);
}
