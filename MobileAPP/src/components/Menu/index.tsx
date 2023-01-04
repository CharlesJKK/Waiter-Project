import { FlatList } from "react-native";
import { products } from "../../mocks/products";
import formatCurrency from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import {Product, ProductImage, ProductDetails, Separator, AddToCartButton} from "./styles";

export default function Menu(){
	return (
		<FlatList
			data={products}
			style={{marginTop: 32}}
			contentContainerStyle={{paddingHorizontal: 24}}
			keyExtractor={item => item._id}
			ItemSeparatorComponent={Separator}
			renderItem={({item}) => (
				<Product>
					<ProductImage source={{uri: `http://192.168.18.4:3001/uploads/${item.imagePath}`}}/>
					<ProductDetails>
						<Text weight="Semibold">{item.name}</Text>
						<Text size={14} color="#666" style={{marginVertical: 8}}>{item.description}</Text>
						<Text size={14} weight="Semibold">{formatCurrency(item.price)}</Text>
					</ProductDetails>
					<AddToCartButton>
						<PlusCircle />
					</AddToCartButton>
				</Product>
			)}
		/>
	);
}
