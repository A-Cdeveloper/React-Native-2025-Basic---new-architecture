import { icons } from "@/constants/icons";
import React, { PureComponent } from "react";
import { Image, Text, View } from "react-native";

export class Profile extends PureComponent {
  render() {
    return (
      <View className="bg-dark-200 flex-1 px-10">
        <View className="flex justify-center items-center w-full h-full gap-y-6">
          <Image
            source={icons.person}
            className="size-10"
            tintColor={"#AB8BFF"}
            resizeMode="contain"
          />
          <Text className="text-white text-2xl font-bold">Profile</Text>
        </View>
      </View>
    );
  }
}

export default Profile;
