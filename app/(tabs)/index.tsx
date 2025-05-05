import MovieCard from "@/components/MovieCard";
import TrandingCard from "@/components/TrandingCard";
import SearchBar from "@/components/searchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useFetch } from "@/hooks/useFetch";
import { fetchMovies } from "@/services/api";
import { getPopularMovies } from "@/services/appwriter";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: popularMovies,
    loading: popularMoviesLoading,
    error: popularMoviesError,
  } = useFetch(() => getPopularMovies());

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full h-full z-0 absolute" />

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading || popularMoviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#ffff"
            className="mt-[50%] self-center"
          />
        ) : moviesError || popularMoviesError ? (
          <Text>
            Error {moviesError?.message || popularMoviesError?.message}{" "}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search through 300+ movies online"
            />
            {popularMovies && (
              <>
                <View>
                  <Text className="text-lg font-bold mt-10 mb-3 text-white">
                    Popular Movies:
                  </Text>
                </View>
                <FlatList
                  data={popularMovies}
                  renderItem={({ item, index }) => (
                    <TrandingCard key={index} index={index} {...item} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  className="mt-2 pb-3 overflow-visible"
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-8" />}
                />
              </>
            )}
            <>
              <Text className="text-lg font-bold mt-10 mb-3 text-white">
                Latest Movies:
              </Text>
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
                className="mt-2 pb-32"
                scrollEnabled={false}
                horizontal={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
