import { observer } from "mobx-react-lite"
import React from "react"
import {
  Image,
  FlatList,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
} from "react-native"
import { Text } from "../components"
import { colors } from "../theme"
import AccountHistory from "../components/AccountHistory"
import AccountCard from "../components/AccountCard"
import TransactionCard from "../components/TransactionCard"
import BottomTab from "../components/BottomTab"

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
}

export const WelcomeScreen = observer(function WelcomeScreen() {
  const colorScheme = useColorScheme()

  const $containerAppColor: ViewStyle = {
    backgroundColor: colorScheme === "light" ? colors.palette.blue : colors.paletteBlack.gray_500,
  }

  const $containerFlexColor: ViewStyle = {
    backgroundColor: colorScheme === "light" ? colors.palette.white : colors.paletteBlack.gray_400,
  }

  const $recentTextColor: TextStyle = {
    color: colorScheme === "light" ? colors.palette.gray_300 : colors.paletteBlack.white,
  }

  return (
    <ScrollView style={[$containerApp, $containerAppColor]}>
      <AccountHistory />
      <FlatList
        data={API.accounts}
        keyExtractor={(item) => item.number}
        renderItem={({ item }) => <AccountCard account={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />

      <View style={$containerTransactionsSection}>
        <View style={[$containerFlex, $containerFlexColor]}>
          <View style={$containerRecentTransactions}>
            <Text style={[$recentText, $recentTextColor]}>Recent transactions</Text>
            <TouchableOpacity>
              <Image resizeMode="cover" source={require("../../assets/filter-button.png")} />
            </TouchableOpacity>
          </View>

          <View>
            {API.transactions.slice(-5).map((transaction) => (
              <TransactionCard
                key={transaction.idTransaction}
                transaction={{
                  idTransaction: transaction.idTransaction,
                  type: transaction.type,
                  description: transaction.description,
                  datetime: transaction.datetime,
                  amount: transaction.amount,
                  currency: transaction.currency,
                }}
              />
            ))}
          </View>
        </View>
      </View>
      <BottomTab />
    </ScrollView>
  )
})

const $containerTransactionsSection: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 10,
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
  padding: 20,
  width: 351,
  // height: 369,
  borderRadius: 25,
}

const $recentText: TextStyle = {
  fontFamily: "MonSemiBold",
  fontSize: 17,
  fontWeight: "600",
  lineHeight: 20,
  marginLeft: 15,
}
