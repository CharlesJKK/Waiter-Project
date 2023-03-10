import { ActivityIndicator } from "react-native";
import { Text } from "../Text";
import { Container } from "./styles";

interface ButtonProps {
	children: string;
	onPress: () => void;
	disabled?: boolean;
	isLoading?: boolean;
}

export default function Button({ children, onPress, disabled, isLoading }: ButtonProps){
	return(
		<Container onPress={onPress} disabled={disabled || isLoading}>
			{isLoading ? <ActivityIndicator color={"#fff"}/> : <Text weight="Semibold" color="#fff">{children}</Text>}
		</Container>
	);
}
