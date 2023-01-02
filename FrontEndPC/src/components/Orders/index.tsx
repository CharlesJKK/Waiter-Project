import { Container } from "./styles";
import OrdersBoard from "../OrdersBoard";

export default function Orders(){
	return(
		<Container>
			<OrdersBoard
				icon="⏱"
				tittle="Fila de espera"
			/>
			<OrdersBoard
				icon="👨‍🍳"
				tittle="Em preparo"/>
			<OrdersBoard
				icon="✅"
				tittle="Pronto!"/>
		</Container>
	);
}
