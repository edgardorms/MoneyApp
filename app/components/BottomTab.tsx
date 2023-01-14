import { View, Image, ViewStyle, TouchableOpacity, useColorScheme } from "react-native"
import React from "react"
import { colors } from "../theme/colors"

const BottomTab = () => {
  const colorScheme = useColorScheme()

  const $tabBarColor: ViewStyle = {
    backgroundColor: colorScheme === "light" ? colors.palette.white : colors.paletteBlack.gray_400,

  }

  return (
    <View style={[$containerTabBar, $tabBarColor]}>
      <View style={$tabBar}>
        <TouchableOpacity>
          <Image resizeMode="cover" source={require("../../assets/wallet-icon.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image resizeMode="cover" source={require("../../assets/path-40344.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image resizeMode="cover" source={require("../../assets/analytics-icon.png")} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image resizeMode="cover" source={require("../../assets/path-41194.png")} />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const $tabBar: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: 390,
  height: 96,
  borderTopRightRadius: 30,
  borderTopLeftRadius: 30,
}

const $containerTabBar: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginTop: 15,
}


export default BottomTab
