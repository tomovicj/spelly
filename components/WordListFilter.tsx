import {
  View,
  Text,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export type WordFilters = {
  searchText: string;
  sortOrder: "asc" | "desc";
  onlyFavorites: boolean;
};

const WordListFilter = ({
  filters,
  setFilters,
}: {
  filters: WordFilters;
  setFilters: React.Dispatch<React.SetStateAction<WordFilters>>;
}) => {
  const [isFilterVisible, setIsFilterVisible] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>(
    filters.searchText
  );

  const headerRight = React.useCallback(
    () => (
      <HeaderRight
        isFilterVisible={isFilterVisible}
        onPress={() => setIsFilterVisible((prev) => !prev)}
      />
    ),
    [isFilterVisible]
  );

  return (
    <>
      <Stack.Screen
        options={{
          headerRight,
        }}
      />
      {isFilterVisible && (
        <View style={styles.heading}>
          <TextInput
            placeholder="Search..."
            style={styles.searchBox}
            defaultValue={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
          <View style={styles.toggleSection}>
            <TouchableOpacity
              style={
                filters.sortOrder === "desc"
                  ? styles.toggleButtonActive
                  : styles.toggleButton
              }
              onPress={() =>
                setFilters((prev) => ({
                  ...prev,
                  sortOrder: prev.sortOrder === "asc" ? "desc" : "asc",
                }))
              }
            >
              <MaterialCommunityIcons
                name="sort-alphabetical-descending"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={
                filters.onlyFavorites
                  ? styles.toggleButtonActive
                  : styles.toggleButton
              }
              onPress={() =>
                setFilters((prev) => ({
                  ...prev,
                  onlyFavorites: !prev.onlyFavorites,
                }))
              }
            >
              <MaterialCommunityIcons name="star" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const HeaderRight = React.memo(
  ({
    isFilterVisible,
    onPress,
  }: {
    isFilterVisible: boolean;
    onPress: () => void;
  }) => (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons
        name={isFilterVisible ? "filter" : "filter-outline"}
        size={32}
        color="black"
      />
    </Pressable>
  )
);

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "white",
  },
  toggleSection: {
    flexDirection: "row",
    gap: 10,
  },
  toggleButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 3,
  },
  toggleButtonActive: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "gray",
    borderRadius: 5,
    padding: 3,
  },
});

export default WordListFilter;
