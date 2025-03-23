import {
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColors } from "@/context/ColorsContext";

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

  const headerRight = React.useCallback(
    () => (
      <HeaderRight
        isFilterVisible={isFilterVisible}
        onPress={() => setIsFilterVisible((prev) => !prev)}
      />
    ),
    [isFilterVisible]
  );

  const colors = useColors();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight,
        }}
      />
      {isFilterVisible && (
        <View
          style={{
            ...styles.container,
            backgroundColor: colors.primary,
            borderColor: colors.secondary,
          }}
        >
          <TextInput
            placeholder="Search..."
            placeholderTextColor={colors.secondary}
            style={{
              ...styles.searchBox,
              backgroundColor: colors.primary,
              color: colors.neutral,
              borderColor: colors.secondary,
            }}
            defaultValue={filters.searchText}
            onChangeText={(text) =>
              setFilters((prev) => ({ ...prev, searchText: text }))
            }
          />
          <View style={styles.toggleSection}>
            <TouchableOpacity
              style={{
                ...{ ...styles.toggleButton, borderColor: colors.secondary },
                ...(filters.sortOrder === "desc"
                  ? { backgroundColor: colors.secondary }
                  : {}),
              }}
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
                color={colors.neutral}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...{ ...styles.toggleButton, borderColor: colors.secondary },
                ...(filters.onlyFavorites
                  ? { backgroundColor: colors.secondary }
                  : {}),
              }}
              onPress={() =>
                setFilters((prev) => ({
                  ...prev,
                  onlyFavorites: !prev.onlyFavorites,
                }))
              }
            >
              <MaterialCommunityIcons
                name="star"
                size={24}
                color={colors.neutral}
              />
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
  }) => {
    const colors = useColors();
    return (
      <Pressable onPress={onPress}>
        <MaterialCommunityIcons
          name={isFilterVisible ? "filter" : "filter-outline"}
          size={32}
          color={colors.neutral}
        />
      </Pressable>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    gap: 10,
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  searchBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  toggleSection: {
    flexDirection: "row",
    gap: 10,
  },
  toggleButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 3,
  },
});

export default WordListFilter;
