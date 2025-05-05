import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri: poster_path
              ? "https://image.tmdb.org/t/p/w500" + poster_path
              : "https://placehold.co/400x600/9CA4AB/9CA4AB.png",
          }}
          className="w-full h-44 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-white text-sm mt-2 font-bold" numberOfLines={1}>
          {title}
        </Text>
        <View className="flex-row items-center justify-start gap-x-1 my-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-white text-sm font-bold">
            {vote_average.toFixed(2)}
          </Text>
        </View>
        <View className="flex-row items-center justify-between gap-x-1 my-1">
          <Text className="text-light-300 text-xs font-medium">
            {release_date.split("-")[0]}
          </Text>
          <Text className="text-light-300 text-xs font-medium uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
