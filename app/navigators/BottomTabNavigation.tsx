import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, useColorScheme, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { Dashboard, Cards, PaymentsAndExchange, Accounts } from "../screens"
import { colors, spacing } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type DemoTabParamList = {
  Dashboard: undefined
  Cards: undefined
  Accounts: undefined
  PaymentsAndExchange: undefined
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
  const colorScheme = useColorScheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          $tabBar,
          {
            height: bottom + 80,
            backgroundColor:
              colorScheme === "light" ? colors.palette.white : colors.paletteBlack.gray_400,
          },
        ],
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="wallet" color={focused && colors.palette.blue} />
          ),
        }}
      />

      <Tab.Screen
        name="Cards"
        component={Cards}
        options={{
          tabBarIcon: ({ focused }) => <Icon icon="card" color={focused && colors.palette.blue} />,
        }}
      />

      <Tab.Screen
        name="Accounts"
        component={Accounts}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon icon="analytics" color={focused && colors.palette.blue} />
          ),
        }}
      />

      <Tab.Screen
        name="PaymentsAndExchange"
        component={PaymentsAndExchange}
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
  display: "none",
}
