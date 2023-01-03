import { Container } from "./styles";
import OrdersBoard from "../OrdersBoard";
import { Order } from "../../types/Order";

const orders: Order[] = [
	{
		_id: "6372e48cbcd195b0d3d0f7f3",
		table: "23",
		status: "WAITING",
		products: [
			{
				product: {
					name: "Pizza quatro queijos",
					imagePath: "1671627226947-quatro-queijos.png",
					price: 40,
				},
				quantity: 3,
				_id: "6372e48cbcd195b0d3d0f7f4"
			},
			{
				product: {
					name: "Coca cola",
					imagePath: "1671628058338-coca-cola.png",
					price: 7,
				},
				quantity: 2,
				_id: "6372e48cbcd195b0d3d0f7f5"
			}
		],
	}
];

export default function Orders(){
	return(
		<Container>
			<OrdersBoard
				icon="⏱"
				tittle="Fila de espera"
				orders={orders}
			/>
			<OrdersBoard
				icon="👨‍🍳"
				tittle="Em preparo"
				orders={[]}/>
			<OrdersBoard
				icon="✅"
				tittle="Pronto!"
				orders={[]}/>
		</Container>
	);
}
