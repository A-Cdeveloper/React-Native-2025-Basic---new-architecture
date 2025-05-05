/* eslint-disable react-hooks/exhaustive-deps */
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFetch } from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwriter";
import { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  /////////////
  const {
    data: movies,
    loading,
    error,
    refetch,
    reset,
  } = useFetch(() => fetchMovies({ query: searchTerm }), false);

  useEffect(() => {
    const timerId = setTimeout(async () => {
      if (searchTerm.trim()) {
        await refetch();
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0]) {
      updateSearchCount(searchTerm, movies?.[0]);
    }
  }, [movies]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const func = async () => {
      if (searchTerm.trim() !== "") {
        await refetch();
      }
    };

    func();
    setRefreshing(false);
  }, []);

  ///////////////////
  return (
    <View className="flex-1 bg-primary pb-32">
      <Image source={images.bg} className="w-full h-full z-0 absolute" />
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-10 mx-auto" />
      <SearchBar
        placeholder="Search through 300+ movies online"
        value={searchTerm}
        onChangeText={(text: string) => setSearchTerm(text)}
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard key={item.id} {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="mt-0 pb-32 px-5"
        scrollEnabled={true}
        horizontal={false}
        ListHeaderComponent={() => (
          <View className="flex justify-between flex-1 mb-7">
            {loading && (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#ffff" />
              </View>
            )}
            {error && (
              <View className="flex-1 items-center justify-center text-red-500">
                <Text>Error {error.message} </Text>
              </View>
            )}

            {movies?.length > 0 && searchTerm.trim().length > 0 && (
              <Text className="text-lg font-bold mt-10 mb-0 text-white">
                Search results for:{" "}
                <Text className="font-bold text-light-200">
                  {searchTerm.trim()}
                </Text>
              </Text>
            )}
          </View>
        )}
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center">
            <Text className="text-white text-lg font-bold">
              {searchTerm.trim().length > 0
                ? "No results found"
                : "Search for movies"}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
