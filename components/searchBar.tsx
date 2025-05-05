import { icons } from "@/constants/icons";
import React, { useEffect } from "react";
import { Image, TextInput, View } from "react-native";

const SearchBar = ({
  onPress,
  onChangeText,
  value,
  placeholder,
}: {
  onPress?: () => void;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  value?: string;
}) => {
  useEffect(() => {
    console.log("Component re-rendered");
  });

  return (
    <View className="flex-row items-center justify-between bg-dark-200 px-5 py-2 rounded-full">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#AB8BFF"}
      />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#AB8BFF"}
        className="text-white text-base flex-1 ml-3"
        value={value}
        onPressIn={onPress}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;
