import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import CategoryCard from "@/components/CategoryCard";
import { Link } from "expo-router";

function categories() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { id: 1, name: "Animals", description: "Spell the names of animals" },
          { id: 2, name: "Fruits", description: "Spell the names of fruits" },
          {
            id: 3,
            name: "Countries",
            description: "Spell the names of countries",
          },
        ]}
        renderItem={({ item }) => (
          <Link href={`/spelling/category/${item.name}`} asChild style={styles.item}>
            <TouchableOpacity>
              <CategoryCard name={item.name} description={item.description} />
            </TouchableOpacity>
          </Link>
        )}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    marginBottom: 10,
  },
});

export default categories;
