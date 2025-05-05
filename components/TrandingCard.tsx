import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TrandingCard = ({
  title,
  poster_url,
  count,
  movie_id,
  index,
}: TrendingMovie & { index: number }) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-32 relative">
        {/* <Text className="absolute bottom-4 -left-3.5 text-white text-7xl font-medium tracking-xl z-20">
          {count}
        </Text> */}
        <Image
          source={{
            uri: poster_url
              ? poster_url
              : "https://placehold.co/400x600/9CA4AB/9CA4AB.png",
          }}
          className="w-32 h-44 rounded-lg"
          resizeMode="cover"
        />
        <View className="rounded-full absolute bottom-[24px] -left-3 px-1 py-2">
          <MaskedView
            maskElement={
              <Text className="text-white text-6xl font-bold">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View>

        <Text
          className="text-light-300 text-sm mt-3 font-medium"
          numberOfLines={1}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrandingCard;
