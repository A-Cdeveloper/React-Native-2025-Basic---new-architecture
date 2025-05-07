import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text } from "react-native";
import "react-native-url-polyfill/auto";
const TabIcon = ({
  focused,
  title,
  icon,
}: {
  focused: boolean;
  title: string;
  icon: any;
}) => {
  return (
    <ImageBackground
      source={focused ? images.highlight : null}
      className="min-w-[125px] w-full flex flex-row items-center justify-center 
      mt-5 min-h-14 rounded-[52px] overflow-hidden"
    >
      <Image
        source={icon}
        className="size-5"
        tintColor={focused ? "#0F0D23" : "#fff"}
      />
      {focused && (
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      )}
    </ImageBackground>
  );
};

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          borderRadius: 50,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          overflow: "hidden",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 30,
          height: 48,
          position: "absolute",
          borderWidth: 0,
          borderColor: "#0F0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Search" icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          headerShown: false,
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Saved" icon={icons.save} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Profile" icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _Layout;
