import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ViewStyle,
  TextStyle,
  useColorScheme,
  useWindowDimensions,
  Pressable,
} from "react-native"
import React, { useEffect, useState } from "react"
import { colors } from "../theme/colors"
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

interface Account {
  idAccount: number
  type: string
  number: string
  balance: string
}
type Props = {
  account: Account
}
const CURRENCY_VIEW_WIDTH = 45
const CURRENCY_VIEW_HEIGHT = 25
const CURRENCY_VIEW_MARGIN_HORIZONTAL = 10

const AccountCard: React.FC<Props> = (props) => {
  const colorScheme = useColorScheme()
  const [activeBalance, setActiveBalance] = useState(0)

  useEffect(() => {
    const activeBalanceIndex = activeBalance
    currencyPosition.value = withTiming(activeBalanceIndex, {
      duration: 100,
      easing: Easing.ease,
    })
  }, [activeBalance])

  const { width: windowWidth } = useWindowDimensions()
  
const CARD_MARGIN_HORIZONTAL = 10
const CARD_OFFSET_HORIZONTAL = 8

  const CARD_WIDTH = windowWidth - CARD_MARGIN_HORIZONTAL * 4 - CARD_OFFSET_HORIZONTAL * 2
  
  const $subContainerWidth: ViewStyle = {
    width: CARD_WIDTH,   
  }

  const $subContainerColor: ViewStyle = {
    backgroundColor: colorScheme === "light" ? colors.palette.white : colors.paletteBlack.gray_400,
  }

  const $textAccountColor: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.white,
  }

  const $textAccountNumberColor: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.gray_300,
  }

  const $textCardBlackColor: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.gray_300,
  }

  const $textBalanceNumberColor: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.white,
  }

  const $textBalanceColor: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.white,
  }
  const currencyPosition = useSharedValue(0)

  const $currencyPositionAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX:
          currencyPosition.value * (CURRENCY_VIEW_WIDTH + CURRENCY_VIEW_MARGIN_HORIZONTAL),
      },
    ],
  }))


  const $activeCurrency = []

  const $inactiveCurrencyText = [$textCardBlack, $textCardBlackColor]

  return (
    <View style={$containerPrimary}>
      <View style={[$subContainer, $subContainerColor, $subContainerWidth]}>
        <View style={$containerAccountNumber}>
          <View>
            <Text style={[$textAccount, $textAccountColor]}>{props.account.type}</Text>
            <Text style={[$textAccountNumber, $textAccountNumberColor]}>
              {props.account.number}
            </Text>
          </View>
          <TouchableOpacity style={$buttonMore}>
            <Image resizeMode="cover" source={require("../../assets/more-button.png")} />
          </TouchableOpacity>
        </View>

        <View style={$containerCoins}>
        <Animated.View
          style={[
            $cardCoinsOff,
            {backgroundColor: colors.palette.blue},
            { position: "absolute" },
            $currencyPositionAnimatedStyle,
          ]}
        />
          <Pressable style={ activeBalance === 0  ? $cardCoinsOn : $cardCoinsOff }  onPress={() => setActiveBalance(0)}>
            <Text style={ activeBalance === 0  ? $textCardWhite : $inactiveCurrencyText}>EUR</Text>
          </Pressable>
          <Pressable style={ activeBalance === 1  ? $cardCoinsOn : $cardCoinsOff } onPress={() => setActiveBalance(1)}>
            <Text style={ activeBalance === 1  ? $textCardWhite : $inactiveCurrencyText}>USD</Text>
          </Pressable >
          <Pressable style={ activeBalance === 2  ? $cardCoinsOn : $cardCoinsOff } onPress={() => setActiveBalance(2)}>
            <Text style={ activeBalance === 2  ? $textCardWhite : $inactiveCurrencyText}>GBP</Text>
          </Pressable>
        </View>
        <View>
          <Text style={[$textBalanceNumber, $textBalanceNumberColor]}>{props.account.balance}</Text>
          <Text style={[$textBalance, $textBalanceColor]}>Current balance</Text>
        </View>
      </View>
    </View>
  )
}

export default AccountCard



const $subContainer: ViewStyle = {
  borderRadius: 25,
  paddingHorizontal: 15,
  paddingTop: 10,
  paddingBottom: 13,
}

const $containerPrimary: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 10,
  marginHorizontal: 17,
}

const $buttonMore: ViewStyle = {
  marginLeft: 95,
}

const $containerAccountNumber: ViewStyle = {
  flexDirection: "row",
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

const $cardCoinsOn: ViewStyle = {
  marginRight: CURRENCY_VIEW_MARGIN_HORIZONTAL,
  width: CURRENCY_VIEW_WIDTH,
  height: CURRENCY_VIEW_HEIGHT,
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
}

const $cardCoinsOff: ViewStyle = {
  marginRight: CURRENCY_VIEW_MARGIN_HORIZONTAL,
  width: CURRENCY_VIEW_WIDTH,
  height: CURRENCY_VIEW_HEIGHT,
  borderRadius: 8,
  justifyContent: "center",
  alignItems: "center",
}

const $textBalance: TextStyle = {
  fontFamily: "MonRegular",
  fontSize: 15,
  fontWeight: "400",
}

const $textBalanceNumber: TextStyle = {
  fontFamily: "MonBold",
  fontSize: 32,
  fontWeight: "700",
  lineHeight: 41,
}
const $textAccountNumber: TextStyle = {
  fontFamily: "MonSemiBold",
  fontSize: 12,
  fontWeight: "600",
}

const $textAccount: TextStyle = {
  fontFamily: "MonBold",
  fontSize: 22,
  fontWeight: "700",
}

const $textCardBlack: TextStyle = {
  fontFamily: "MonSemiBold",
  fontSize: 12,
  fontWeight: "600",
}
