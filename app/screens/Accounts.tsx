import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import {
  Image,
  FlatList,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
  useWindowDimensions,
} from "react-native"
import { Text } from "../components"
import { colors } from "../theme"
import AccountHistory from "../components/AccountHistory"
import AccountCard from "../components/AccountCard"
import TransactionCard from "../components/TransactionCard"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"

const MockAdapter = require("axios-mock-adapter")

const mock = new MockAdapter(axios)

mock.onGet("/api").reply(200, {
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
    {
      idTransaction: 6,
      type: "Business",
      description: "Robert Smith",
      datetime: "14th May, 16:00",
      amount: 11215,
      currency: "USD",
    },
    {
      idTransaction: 7,
      type: "Business",
      description: "Robert Smith",
      datetime: "14th May, 16:00",
      amount: 11215,
      currency: "USD",
    },
    {
      idTransaction: 8,
      type: "Business",
      description: "Robert Smith",
      datetime: "14th May, 16:00",
      amount: 11215,
      currency: "USD",
    },
    {
      idTransaction: 9,
      type: "Business",
      description: "Robert Smith",
      datetime: "14th May, 16:00",
      amount: 11215,
      currency: "USD",
    },
  ],
})

interface Account {
  idAccount: number
  type: string
  number: string
  balance: string
}

interface Transaction {
  idTransaction: number
  type: string
  description: string
  datetime: string
  amount: number
  currency: string
}

export const Accounts = observer(function Accounts() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])

  const bottomTabBarHeight = useBottomTabBarHeight()

  const { width: windowWidth } = useWindowDimensions()

  const CARD_MARGIN_HORIZONTAL = 10
  const CARD_OFFSET_HORIZONTAL = 8

  const CARD_WIDTH = windowWidth - CARD_MARGIN_HORIZONTAL * 3 - CARD_OFFSET_HORIZONTAL 

  const $containerFlexWidth: ViewStyle = {
    width: CARD_WIDTH

  }


  useEffect(() => {
    axios.get("/api").then(function (response) {
      console.log(response.data)

      setTransactions(response.data.transactions)
      setAccounts(response.data.accounts)
    })
  }, [])

  console.log(transactions)
  console.log(accounts)

  const $containerAppColor: ViewStyle = {
    backgroundColor: colorScheme === "light" ? colors.palette.blue : colors.paletteBlack.gray_500,
  }

  const $containerFlexColor: ViewStyle = {
    backgroundColor: colorScheme === "light" ? colors.palette.white : colors.paletteBlack.gray_400,
  }

  const $recentTextColor: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.white,
  }

  const $viewAllTransactionsTextColor: TextStyle = {
    color: colorScheme === "light" ? colors.palette.blue : colors.paletteBlack.white,
  }

  return (
    <ScrollView
      style={[$containerApp, $containerAppColor]}
      contentContainerStyle={{ paddingBottom: bottomTabBarHeight + 10 }}
    >
      <AccountHistory />
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.number}
        renderItem={({ item }) => <AccountCard account={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />

      <View style={$containerTransactionsSection}>
        <View style={[$containerFlex, $containerFlexColor, $containerFlexWidth]}>
          <View style={$containerRecentTransactions}>
            <Text style={[$recentText, $recentTextColor]}>Recent transactions</Text>
            <TouchableOpacity>
              <Image resizeMode="cover" source={require("../../assets/filter-button.png")} />
            </TouchableOpacity>
          </View>

          <View>
            {transactions.slice(-5).map((transaction) => (
              <TouchableOpacity
                key={transaction.idTransaction}
                onPress={() => navigation.navigate("Transaction")}
              >
                <TransactionCard
                  transaction={{
                    idTransaction: transaction.idTransaction,
                    type: transaction.type,
                    description: transaction.description,
                    datetime: transaction.datetime,
                    amount: transaction.amount,
                    currency: transaction.currency,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={$viewAllTransactions}
            onPress={() => navigation.navigate("AllTransactions")}
          >
            <Text style={[$viewAllTransactionsText, $viewAllTransactionsTextColor]}>
              View all transactions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
})
const SCREEN_PADDING_HORIZONTAL = 12

const $containerTransactionsSection: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 11,
  marginHorizontal: SCREEN_PADDING_HORIZONTAL,
}

const $containerRecentTransactions: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
}

const $containerApp: ViewStyle = {
  //  width: "100%",
  // height: 812,
}

const $containerFlex: ViewStyle = {
  flexDirection: "column",
  alignItems: "stretch",
  paddingHorizontal: 22,
  paddingTop: 20,
  paddingBottom: 30,
  borderRadius: 25,
}

const $recentText: TextStyle = {
  fontFamily: "MonSemiBold",
  fontSize: 17,
  fontWeight: "600",
  lineHeight: 20,
  marginLeft: 15,
}

const $viewAllTransactions: ViewStyle = {
  alignItems: "center",
  marginTop: 10,
}

const $viewAllTransactionsText: TextStyle = {
  fontFamily: "MonSemiBold",
  fontSize: 15,
  fontWeight: "600",
  lineHeight: 20,
}
