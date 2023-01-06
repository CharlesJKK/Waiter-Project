import { useState } from "react";
import { FlatList, View } from "react-native";
import { Product } from "../../types/Product";
import formatCurrency from "../../utils/formatCurrency";
import { Empty } from "../Icons/Empty";
import { PlusCircle } from "../Icons/PlusCircle";
import ProductModal from "../ProductModal";
import { Text } from "../Text";
import {ProductContainer, ProductImage, ProductDetails, Separator, AddToCartButton} from "./styles";

interface MenuProps{
	onAddToCart: (product: Product) => void;
	products: Product[],
}

export default function Menu({onAddToCart, products}: MenuProps){

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);


	function handleOpenModal(product: Product){
		setIsModalVisible(true);
		setSelectedProduct(product);
	}

	return (
		<>
			<ProductModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} product={selectedProduct} onAddToCart={onAddToCart}/>
			<FlatList
				data={products}
				style={{marginTop: 32}}
				contentContainerStyle={{paddingHorizontal: 24}}
				keyExtractor={item => item._id}
				ListEmptyComponent={
					<View style={{alignItems: "center", justifyContent: "center", flex: 1, marginTop: "50%"}}>
						<Empty/>
						<Text color="#666" style={{marginTop: 24}}>Nenhum produto foi encontrado!</Text>
					</View>}
				ItemSeparatorComponent={Separator}
				renderItem={({item}) =>
					(<ProductContainer onPress={() => handleOpenModal(item)}>
						<ProductImage source={{uri: `http://192.168.18.4:3001/uploads/${item.imagePath}`}}/>
						<ProductDetails>
							<Text weight="Semibold">{item.name}</Text>
							<Text size={14} color="#666" style={{marginVertical: 8}}>{item.description}</Text>
							<Text size={14} weight="Semibold">{formatCurrency(item.price)}</Text>
						</ProductDetails>
						<AddToCartButton onPress={() => onAddToCart(item)}>
							<PlusCircle />
						</AddToCartButton>
					</ProductContainer>
					)
				}
			/>
		</>
	);
}
