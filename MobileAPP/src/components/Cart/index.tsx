import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";
import formatCurrency from "../../utils/formatCurrency";
import Button from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import OrderConfirmedModal from "../OrderConfirmedModal";
import { Text } from "../Text";
import { Item, Actions, ProductContainer, Image, QuantityContainer, ProductDetails, Sumary, TotalContainer } from "./styles";

interface CartProps{
	cartItems: CartItem[];
	onAdd: (product: Product) => void;
	onDecrement: (product: Product) => void;
	onConfirmOrder: () => void;
}

export default function Cart({cartItems, onAdd, onDecrement, onConfirmOrder}: CartProps){

	const [isLoading, setIsLoading] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const total = cartItems.reduce((acc, cartItem) =>{
		return acc + cartItem.quantity * cartItem.product.price;
	}, 0);

	function handleConfirmOrder(){
		setIsModalVisible(true);
	}

	function handleOk(){
		onConfirmOrder();
		setIsModalVisible(false);
	}

	return(
		<>
			<OrderConfirmedModal visible={isModalVisible} onOk={handleOk}/>
			{cartItems.length> 0 && (
				<FlatList
					data={cartItems}
					keyExtractor={item => item.product._id}
					style={{marginBottom: 20, maxHeight: 140}}
					showsVerticalScrollIndicator={false}
					renderItem={({item}) =>(
						<Item>
							<ProductContainer>
								<Image source={{uri: `http://192.168.18.4:3001/uploads/${item.product.imagePath}`}}/>
								<QuantityContainer>
									<Text size={14} color="#666">{item.quantity}x</Text>
								</QuantityContainer>
								<ProductDetails>
									<Text size={14} weight="Semibold">{item.product.name}</Text>
									<Text size={14} color="#666" style={{marginTop: 4}}>{formatCurrency(item.product.price)}</Text>
								</ProductDetails>
							</ProductContainer>
							<Actions>
								<TouchableOpacity style={{marginRight: 24}} onPress={() => onAdd(item.product)}>
									<PlusCircle/>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => onDecrement(item.product)}>
									<MinusCircle/>
								</TouchableOpacity>
							</Actions>
						</Item>
					)}
				/>)}
			<Sumary>
				<TotalContainer>
					{cartItems.length > 0 ? (
						<>
							<Text color="#666">Total</Text>
							<Text size={20} weight="Semibold">{formatCurrency(total)}</Text>
						</>) : (
						<Text color="#666">Seu carrinho está vazio</Text>
					)}
				</TotalContainer>
				<Button onPress={handleConfirmOrder}  disabled={cartItems.length === 0} isLoading={isLoading}>Confirmar pedido</Button>
			</Sumary>
		</>
	);
}
