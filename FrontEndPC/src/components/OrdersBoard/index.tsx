import { Order } from "../../types/Order";
import {Board, OrdersContainer} from "./styles";

interface OrdersBoardProps{
	icon: string;
	tittle: string;
	orders: Order[];
}

export default function OrdersBoard(props: OrdersBoardProps){
	return(
		<Board>
			<header>
				<span>{props.icon}</span>
				<strong>{props.tittle}</strong>
				<span>({props.orders.length})</span>
			</header>
			{props.orders.length > 0 && (
				<OrdersContainer>
					{props.orders.map((order) => (
						<button type="button" key={order._id}>
							<strong>Mesa {order.table}</strong>
							<span>{order.products.length} itens</span>
						</button>
					))}
				</OrdersContainer>
			)}
		</Board>
	);
}
