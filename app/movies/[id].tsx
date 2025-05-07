import { icons } from "@/constants/icons";
import { useFetch } from "@/hooks/useFetch";
import { fetchMovieDetails } from "@/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";

import React, { JSX } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MovieInfo = ({
  label,
  value,
}: {
  label: string;
  value?: string | string[] | number | JSX.Element[] | null;
}) => {
  return (
    <View className="flex mt-5">
      <Text className="text-light-200 text-normal mb-2">{label}</Text>
      <Text className="text-light-300 leading-6">{value}</Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useFetch(() => fetchMovieDetails({ movie_id: id as string }));

  const router = useRouter();
  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px] rounded-lg"
            resizeMode="stretch"
          />
        </View>
        <View className="mt-5 px-5 flex justify-center items-start">
          <Text className="text-white text-2xl font-bold">{movie?.title}</Text>
          {/*  */}
          <View className="flex-row items-center justify-start gap-x-1 my-3">
            <Text className="text-light-200 text-sm w-10">
              {movie?.release_date.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">|</Text>
            <Text className="text-light-200 text-sm w-10">
              {movie?.runtime}m
            </Text>
          </View>
          {/* ///////////////////////// */}
          <View className="flex-row items-center bg-dark-100 px-2 py-1.5 rounded-md gap-x-3">
            <Image
              source={icons.star}
              className="size-4"
              resizeMode="contain"
            />
            <Text className="text-white text-sm w-10">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-100 text-sm w-24">
              ({movie?.vote_count} votes)
            </Text>
          </View>
          {/* ///////////////////////// */}
        </View>
        <View className="mt-5 px-5">
          <MovieInfo label="Overview" value={movie?.overview ?? ""} />

          <MovieInfo
            label="Genres"
            value={movie?.genres.map((g) => {
              return (
                <View key={g.id} className="bg-dark-100 px-2 py-1.5 rounded-md">
                  <Text className="text-white text-sm">{g.name}</Text>
                </View>
              );
            })}
          />
          <View className="flex-row items-center justify-between w-1/2 gap-x-6">
            <MovieInfo
              label="Budget"
              value={`$${
                movie?.budget ? (movie?.budget / 1000000).toFixed(2) : 0
              } milion`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${
                movie?.revenue ? (movie?.revenue / 1000000).toFixed(2) : 0
              } milion`}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={movie?.production_companies.map((c) => c.name).join(" - ")}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="bg-light-200 absolute bottom-8 left-5 right-5 py-3 
      flex-row items-center justify-center rounded-lg"
        onPress={() => router.back()}
        activeOpacity={0.8}
      >
        <Image
          source={icons.arrow}
          className="size-5 rotate-180"
          tintColor="#0F0D23"
        />
        <Text className="text-primary text-[16px] font-semibold ml-2">
          Go back
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
