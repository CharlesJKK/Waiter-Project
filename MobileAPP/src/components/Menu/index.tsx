import { useState } from "react";
import { FlatList } from "react-native";
import { products } from "../../mocks/products";
import { Product } from "../../types/Product";
import formatCurrency from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import ProductModal from "../ProductModal";
import { Text } from "../Text";
import {ProductContainer, ProductImage, ProductDetails, Separator, AddToCartButton} from "./styles";

export default function Menu(){

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);


	function handleOpenModal(product: Product){
		setIsModalVisible(true);
		setSelectedProduct(product);
	}

	return (
		<>
			<ProductModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} product={selectedProduct}/>
			<FlatList
				data={products}
				style={{marginTop: 32}}
				contentContainerStyle={{paddingHorizontal: 24}}
				keyExtractor={item => item._id}
				ItemSeparatorComponent={Separator}
				renderItem={({item}) => (
					<ProductContainer onPress={() => handleOpenModal(item)}>
						<ProductImage source={{uri: `http://192.168.18.4:3001/uploads/${item.imagePath}`}}/>
						<ProductDetails>
							<Text weight="Semibold">{item.name}</Text>
							<Text size={14} color="#666" style={{marginVertical: 8}}>{item.description}</Text>
							<Text size={14} weight="Semibold">{formatCurrency(item.price)}</Text>
						</ProductDetails>
						<AddToCartButton>
							<PlusCircle />
						</AddToCartButton>
					</ProductContainer>
				)}
			/>
		</>
	);
}
