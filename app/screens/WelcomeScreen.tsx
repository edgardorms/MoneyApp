import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import {
  Image,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
} from "react-native"
import { Text } from "../components"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import Constants from "expo-constants"
import AccountHistory from "../components/AccountHistory"
import AccountCard from "../components/AccountCard"
import TransactionCard from "../components/TransactionCard"
import BottomTab from "../components/BottomTab"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen() {
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  const colorScheme = useColorScheme()

  function RenderTransactionCards(transactions) {
    return transactions.map((transaction) => (
      <TransactionCard
        key={transaction.idTransaction}
        transactions={{
          type: transaction.type,
          description: transaction.description,
          datetime: transaction.datetime,
          amount: transaction.amount,
          currency: transaction.currency,
        }}
      />
    ))
  }
  function RenderAccountCards(accounts) {
    return accounts.map((account) => (
      <AccountCard
        key={account.idAccount}
        accounts={{
          type: account.type,
          number: account.number,
          balance: account.balance,
        }}
      />
    ))
  }

  const API = {
    accounts: [
      {
        idAccount: 1,
        type: "Current Account",
        number: "1234-5678-9012-3456",
        balance: "76.451,00",
      },
      {
        idAccount: 2,
        type: "Savings Account",
        number: "2345-6789-0123-4567",
        balance: "76.451,00",
      },
    ],
    transactions: [
      {
        idTransaction: 1,
        type: "Comute",
        description: '"Golub" Taxi Transportation',
        datetime: "20th May, 18:39",
        amount: -345.0,
        currency: "EUR",
      },

      {
        idTransaction: 2,
        type: "Restaurant",
        description: '"Francois" Restaurant Dinner',
        datetime: "15th May, 20:56",
        amount: -1158.0,
        currency: "EUR",
      },
      {
        idTransaction: 3,
        type: "Travel",
        description: '"AirMax" Travel to Paris',
        datetime: "14th May, 16:00",
        amount: -813.0,
        currency: "EUR",
      },
      {
        idTransaction: 4,
        type: "Personal",
        description: "Construction ltd.",
        datetime: "11th May, 09:26",
        amount: 24500.0,
        currency: "USD",
      },
      {
        idTransaction: 5,
        type: "Business",
        description: "Robert Smith",
        datetime: "14th May, 16:00",
        amount: 11215,
        currency: "USD",
      },
    ],
  }

  const $container: ViewStyle = {
    backgroundColor: colorScheme === "light" ? colors.palette.blue : colors.paletteBlack.gray_500,
    width: "100%",
    height: 812,
  }

  const $container2: ViewStyle = {
    flexDirection: "row",
    justifyContent: "space-between",
  }

  const $container5: ViewStyle = {
    flexDirection: "column",
    alignItems: "stretch",
    padding: 20,
    width: 351,
    height: 369,
    backgroundColor: colorScheme === "light" ? colors.palette.white : colors.paletteBlack.gray_400,
    borderRadius: 25,
  }

  const $container6: ViewStyle = {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  }

  const $recentText: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.white,
    fontFamily: "MonSemiBold",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 20,
    marginLeft: 15,
  }

  return (
    <ScrollView style={$container}>
      <AccountHistory />
      <FlatList
        data={API.accounts}
        keyExtractor={(item) => item.number}
        renderItem={({ item }) => <AccountCard accounts={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />

      <View style={$container6}>
        <View style={$container5}>
          <View style={$container2}>
            <Text style={$recentText}>Recent transactions</Text>
            <TouchableOpacity>
              <Image resizeMode="cover" source={require("../../assets/filter-button.png")} />
            </TouchableOpacity>
          </View>

          <ScrollView>{RenderTransactionCards(API.transactions)}</ScrollView>
        </View>
      </View>
      <BottomTab />
    </ScrollView>
  )
})




