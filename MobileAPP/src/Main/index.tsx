import {useEffect, useState} from "react";
import { Text } from "../components/Text";
import { Empty } from "../components/Icons/Empty";
import { Container, CategoriesContainer, Footer, MenuContainer, FooterContainer, CenteredContainer } from "./styles";
import Header from "../components/Header";
import Categories  from "../components/Categories";
import Menu from "../components/Menu";
import Button from "../components/Button";
import TableModal from "../components/TableModal";
import Cart from "../components/Cart";
import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { ActivityIndicator } from "react-native";
import { products as mockProducts } from "../mocks/products";
import { categories as mockCategories } from "../mocks/categories";
import { CategoryIT } from "../types/Category";
import api  from "../api/api";


export default function Main(){

	const [isLoading, setIsLoading] = useState(true);
	const [isTableModalVisible, setIsTableModalVisible] = useState(false);
	const [selectedTable, setSelectedTable] = useState("");
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [products, setProducts] = useState<Product[]>([]);
	const [categories, setCategories] = useState<CategoryIT[]>([]);
	const [isLoadingProducts, setIsLoadingProducts] = useState(false);

	useEffect(() => {
		Promise.all([
			api.get("/categories"),
			api.get("/products"),
		]).then(([categoriesResponse, productsResponse]) => {
			setCategories(categoriesResponse.data);
			setProducts(productsResponse.data);
			setIsLoading(false);
		}).catch((err) =>{
			console.log(err);
		});
	},[]);

	async function handleSelectCategory(categoryId: string){
		const route = !categoryId ? "/products" : `/categories/${categoryId}/products`;

		setIsLoadingProducts(true);

		//await new Promise<void>(resolve => setTimeout(resolve, 1000));
		const response = await api.get(route);
		setProducts(response.data);

		setIsLoadingProducts(false);
	}

	function handleSaveTable(table: string){

		setSelectedTable(table);
	}

	function handleResetOrder(){
		setCartItems([]);
		setSelectedTable("");
	}

	function handleAddToCart(product: Product){

		if(!selectedTable){
			setIsTableModalVisible(true);
		}
		setCartItems((prevState) => {

			const itemIndex = prevState.findIndex(cartItems => cartItems.product._id === product._id);
			if(itemIndex < 0){
				return prevState.concat({
					quantity: 1,
					product,
				});
			}

			const newCartItems =[...prevState];
			const item = newCartItems[itemIndex];

			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity + 1,
			};

			return newCartItems;
		});
	}

	function handleDecrementCartItem(product: Product){

		setCartItems((prevState) => {
			const itemIndex = prevState.findIndex(cartItems => cartItems.product._id === product._id);

			const item = prevState[itemIndex];
			const newCartItems =[...prevState];

			if(item.quantity === 1){
				const newCartItems = [...prevState];
				newCartItems.splice(itemIndex, 1);

				return newCartItems;
			}

			newCartItems[itemIndex] = {
				...item,
				quantity: item.quantity - 1,
			};

			return newCartItems;
		});
	}

	return(
		<>
			<TableModal visible={isTableModalVisible} onClose={() => setIsTableModalVisible(false)} onSave={handleSaveTable}/>
			<Container>
				<Header selectedTable={selectedTable} onCancelOrder={handleResetOrder}/>
				{isLoading ? (
					<CenteredContainer>
						<ActivityIndicator color={"#D73035"} size="large"/>
					</CenteredContainer>
				)	:
					<>
						<CategoriesContainer>
							<Categories categories={categories} onSelectCategory={handleSelectCategory}/>
						</CategoriesContainer>

						{isLoadingProducts

							?

							(<CenteredContainer>
								<ActivityIndicator color={"#D73035"} size="large"/>
							</CenteredContainer>
							)

							: (
								<>
									{products.length > 0 ? (
										<MenuContainer>
											<Menu onAddToCart={handleAddToCart} products={products}/>
										</MenuContainer>

									)
										:
										<CenteredContainer>
											<Empty/>
											<Text color="#666" style={{marginTop: 24}}>Nenhum produto foi encontrado!</Text>
										</CenteredContainer>
									}
								</>

							)}
					</>
				}
			</Container>
			<Footer>
				<FooterContainer>
					{!selectedTable &&
					(<Button onPress={() => setIsTableModalVisible(true)} disabled={isLoading}>
						Novo Pedido
					</Button>)}
					{selectedTable && (
						<Cart cartItems={cartItems} onAdd={handleAddToCart} onDecrement={handleDecrementCartItem} onConfirmOrder={handleResetOrder} selectedTable={selectedTable}/>
					)}
				</FooterContainer>
			</Footer>
		</>
	);
}
