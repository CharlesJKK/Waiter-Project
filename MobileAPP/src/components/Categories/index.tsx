import { useState } from "react";
import { categories } from "../../mocks/categories";
import { FlatList } from "react-native";
import { Category, Icon } from "./styles";
import { Text } from "../Text";

export default function Categories(){

	const [selectedCategory, setSelectedCategory] = useState("");

	function handleSelectCategory(categoryId: string){

		const category = selectedCategory === categoryId ? "" : categoryId;
		setSelectedCategory(category);
	}

	return (
		<FlatList
			data={categories}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{paddingRight: 24}}
			horizontal
			keyExtractor={item => item._id}
			renderItem={({item}) => {

				const isSelected =selectedCategory === item._id;

				return(
					<Category onPress={() => handleSelectCategory(item._id)}>
						<Icon>
							<Text opacity={isSelected ? 1 : 0.5}>{item.icon}</Text>
						</Icon>
						<Text size={14} weight="Semibold" opacity={isSelected ? 1 : 0.5}>{item.name}</Text>
					</Category>
				);
			}}
		/>
	);
}
