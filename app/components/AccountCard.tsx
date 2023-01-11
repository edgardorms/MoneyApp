import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from "react-native"
import React from "react"
import { colors } from "../theme/colors"

const AccountCard = (props) => {
  const colorScheme = useColorScheme()

  const $containerPrimary: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginHorizontal: 17,
  }
  const $subContainer: ViewStyle = {
    width: 329,
    height: 185,
    backgroundColor: colorScheme === "light" ? colors.palette.white : colors.paletteBlack.gray_400,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 13,
  }
  const $containerAccountNumber: ViewStyle = {
    flexDirection: "row",
  }
  const $textAcoount: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.white,
    fontFamily: "MonBold",
    fontSize: 22,
    fontWeight: "700",
  }
  const $textAcoountNumber: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.gray_300,
    fontFamily: "MonSemiBold",
    fontSize: 12,
    fontWeight: "600",
  }
  const $buttonMore: ViewStyle = {
    marginLeft: 95,
  }
  const $textCardBlack: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.gray_300,
    fontFamily: "MonSemiBold",
    fontSize: 12,
    fontWeight: "600",
  }
  const $textCardWhite: TextStyle = {
    color: colors.palette.white,
    fontFamily: "MonSemiBold",
    fontSize: 12,
    fontWeight: "600",
  }

  const $containerCoins: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 134,
    marginTop: 14,
    marginBottom: 16,
  }

  const $cardCoins: ViewStyle = {
    width: 45,
    height: 25,
    borderRadius: 8,
    backgroundColor: colors.palette.blue,
    justifyContent: "center",
    alignItems: "center",
  }

  const $textBalanceNumber: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.white,
    fontFamily: "MonBold",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 41,
  }

  const $textBalance: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.white,
    fontFamily: "MonRegular",
    fontSize: 15,
    fontWeight: "400",
  }

  return (
    <View style={$containerPrimary}>
      <View style={$subContainer}>
        <View style={$containerAccountNumber}>
          <View>
            <Text style={$textAcoount}>{props.accounts.type}</Text>
            <Text style={$textAcoountNumber}>{props.accounts.number}</Text>
          </View>
          <TouchableOpacity style={$buttonMore}>
            <Image resizeMode="cover" source={require("../../assets/more-button.png")} />
          </TouchableOpacity>
        </View>

        <View style={$containerCoins}>
          <View style={$cardCoins}>
            <Text style={$textCardWhite}>EUR</Text>
          </View>
          <View>
            <Text style={$textCardBlack}>USD</Text>
          </View>
          <View>
            <Text style={$textCardBlack}>GBP</Text>
          </View>
        </View>
        <View>
          <Text style={$textBalanceNumber}>{props.accounts.balance}</Text>
          <Text style={$textBalance}>Current balance</Text>
        </View>
      </View>
    </View>
  )
}

export default AccountCard
