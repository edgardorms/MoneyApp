import { View, Text, TouchableOpacity, Image, ViewStyle, TextStyle } from "react-native"
import React from "react"
import { colors } from "../theme/colors"
import { useNavigation } from "@react-navigation/native"

const AccountHistory = () => {
  const navigation = useNavigation()

  return (
    <View>
      <View style={$containerPrimary}>
        <View>
          <Text style={$text1}>Account History</Text>
        </View>
        <TouchableOpacity style={$configIMG} onPress={() => navigation.navigate("Settings")}>
          <Image resizeMode="cover" source={require("../../assets/settings-2.png")} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const $containerPrimary: ViewStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  marginTop: 54,
}

const $text1: TextStyle = {
  color: colors.palette.white,
  fontFamily: "MonSemiBold",
  fontSize: 17,
  fontWeight: "600",
}

const $configIMG: ViewStyle = {
  marginLeft: 90,
  marginRight: 15,
}

export default AccountHistory
