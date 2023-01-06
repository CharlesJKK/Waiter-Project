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
	onAddToCart: (product: Product) => void;
}

export default function ProductModal({visible, onClose, product, onAddToCart}: ProductModalProps){

	if(!product){
		return null;
	}

	function handleAddToCart(){
		onAddToCart(product!);
		onClose();
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
							renderItem={({item}) =>
							{

								function correctEmoji(){
									if(item.icon === ":poultry_leg:"){
										return "🍗";
									}else if(item.icon === ":cheese:"){
										return "🧀";
									}else if(item.icon === ":tomato:"){
										return "🍅";
									}else{
										return item.icon;
									}
								}

								return(
									<Ingredient>
										<Text size={14} color="#666">{correctEmoji()}</Text>
										<Text size={14} color="#666" style={{marginLeft: 20}}>{item.name}</Text>
									</Ingredient>);
							}
							}
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
					<Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
				</FooterContainer>
			</Footer>
		</Modal>
	);
}
