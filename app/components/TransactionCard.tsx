import { View, Text, Image, ViewStyle, TextStyle, useColorScheme } from "react-native"
import React from "react"
import { colors } from "../theme/colors"

let $amountStyle
let typeImage

const TransactionCard = (props) => {
  const colorScheme = useColorScheme()

// color amount selector
  $amountStyle = props.transaction.amount > 0 ? $textCoinPlus : $textCoinMinus

// transfer icon selector
  switch (props.transaction.type) {
    case "Comute":
      typeImage = require("../../assets/comute-icon.png")
      break
    case "Restaurant":
      typeImage = require("../../assets/restaurant-icon.png")
      break
    case "Travel":
      typeImage = require("../../assets/travel-icon.png")
      break
    case "Personal":
      typeImage = require("../../assets/personal-transaction-icon.png")
      break
    case "Business":
      typeImage = require("../../assets/business-transaction-icon.png")
      break
    default:
      typeImage = require("../../assets/personal-transaction-icon.png")
  }
// dark mode
  const $textTransactionColor: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.white,
  }

  const $textTimeColor: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_200 : colors.paletteBlack.gray_300,
  }

  return (
    <View>
      <View style={$containerPrimary}>
        <View style={$containerSecondary}>
          <View style={$containerIMG}>
            <Image resizeMode="cover" source={typeImage} />
          </View>
          <View>
            <Text style={[$textTransaction, $textTransactionColor]}>
              {props.transaction.description}
            </Text>
            <Text style={[$textTime, $textTimeColor]}>{props.transaction.datetime}</Text>
          </View>
        </View>
        <View style={$containerAmmount}>
          <Text style={$amountStyle}>{props.transaction.amount}</Text>
          <Text style={[$textTime, $textTimeColor]}>{props.transaction.currency}</Text>
        </View>
      </View>
      <View style={$containerLine}>
        <Image resizeMode="cover" source={require("../../assets/line-195.png")} />
      </View>
    </View>
  )
}

export default TransactionCard

const $textCoinMinus: TextStyle = {
  color: colors.palette.brown,
  fontFamily: "MonSemiBold",
  fontSize: 12,
  fontWeight: "600",
  lineHeight: 15,
}
const $textCoinPlus: TextStyle = {
  color: colors.palette.blue,
  fontFamily: "MonSemiBold",
  fontSize: 12,
  fontWeight: "600",
  lineHeight: 15,
}

const $containerPrimary: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 17,
  marginTop: 17,
}

const $containerSecondary: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
const $containerIMG: ViewStyle = {
  width: 30,
  height: 30,
  backgroundColor: colors.palette.brown,
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 10,
}
const $containerAmmount: ViewStyle = {
  alignItems: "flex-end",
}
const $containerLine: ViewStyle = {
  alignItems: "flex-end",
}

const $textTime: TextStyle = {
  fontFamily: "MonSemiBold",
  fontSize: 11,
  fontWeight: "600",
  lineHeight: 13,
}

const $textTransaction: TextStyle = {
  fontFamily: "MonSemiBold",
  fontSize: 12,
  fontWeight: "600",
  lineHeight: 15,
}
