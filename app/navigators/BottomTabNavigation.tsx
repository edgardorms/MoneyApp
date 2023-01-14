import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { FirstScreen, SecondScreen, AllTransactions, WelcomeScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type DemoTabParamList = {
  WelcomeScreen: undefined
  FirstScreen: undefined
  SecondScreen: undefined
  AllTransactions: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function BottomTabNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 80 }],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="wallet" color={focused && colors.palette.blue} />
          ),
        }}
      />

      <Tab.Screen
        name="AllTransactions"
        component={AllTransactions}
        options={{
          tabBarIcon: ({ focused }) => <Icon icon="card" color={focused && colors.palette.blue} />,
        }}
      />

      <Tab.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="analytics" color={focused && colors.palette.blue} />
          ),
        }}
      />

      <Tab.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={{
          tabBarIcon: ({ focused }) => <Icon icon="list" color={focused && colors.palette.blue} />,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  position: "absolute",
  borderTopColor: colors.transparent,
  borderTopLeftRadius: 35,
  borderTopRightRadius: 35,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.large,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
