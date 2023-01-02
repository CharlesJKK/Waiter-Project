import {Board, OrdersContainer} from "./styles";

interface OrdersBoardProps{
	icon: string;
	tittle: string;
}

export default function OrdersBoard(props: OrdersBoardProps){
	return(
		<Board>
			<header>
				<span>{props.icon}</span>
				<strong>{props.tittle}</strong>
				<span>(1)</span>
			</header>
			<OrdersContainer>
				<button type="button">
					<strong>Mesa 2</strong>
					<span>2 itens</span>
				</button>
				<button type="button">
					<strong>Mesa 2</strong>
					<span>2 itens</span>
				</button>
			</OrdersContainer>
		</Board>
	);
}
