import { Container } from "./styles";
import OrdersBoard from "../OrdersBoard";
import { Order } from "../../types/Order";
import { useEffect, useState } from "react";
import api from "../../api/api";
import socketIo from "socket.io-client";

export default function Orders(){

	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const socket = socketIo("http://localhost:3001", {
			transports: ["websocket"],
		});

		socket.on("orders@new", (order) => {
			setOrders(prevState => prevState.concat(order));
		});
	},[]);

	useEffect(() => {
		api.get("/orders")
			.then((res) =>{
				setOrders(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	},[]);

	const waiting = orders.filter((order) => order.status === "WAITING");
	const inProduction = orders.filter((order) => order.status === "IN_PRODUCTION");
	const done = orders.filter((order) => order.status === "DONE");

	function handleCancelOrder(orderId: string){
		setOrders((prevState) => prevState.filter(order => order._id !== orderId));
	}

	function handleOrderStatusChange(orderId: string, status: Order["status"]){
		setOrders((prevState) => prevState.map((order) => (
			order._id === orderId ? {...order, status} : order
		)));
	}

	return(
		<Container>
			<OrdersBoard
				icon="⏱"
				tittle="Fila de espera"
				orders={waiting}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleOrderStatusChange}
			/>
			<OrdersBoard
				icon="👨‍🍳"
				tittle="Em preparo"
				orders={inProduction}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleOrderStatusChange}
			/>
			<OrdersBoard
				icon="✅"
				tittle="Pronto!"
				orders={done}
				onCancelOrder={handleCancelOrder}
				onChangeOrderStatus={handleOrderStatusChange}
			/>
		</Container>
	);
}
