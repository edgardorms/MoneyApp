import { View, Text, TouchableOpacity, ScrollView, ViewStyle } from "react-native"
import React, { useEffect, useState } from "react"
import TransactionCard from "../components/TransactionCard"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"

interface Transaction {
  idTransaction: number
  type: string
  description: string
  datetime: string
  amount: number
  currency: string
}
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

export const AllTransactions = () => {
  const navigation = useNavigation()
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    axios.get("/api").then(function (response) {
      console.log(response.data)

      setTransactions(response.data.transactions)
    })
  }, [])

  return (
    <View style={$containerTransactionsSection}>
      <ScrollView style={$containerFlex}>
        {transactions.map((transaction) => (
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
      </ScrollView>
    </View>
  )
}

const $containerFlex: ViewStyle = {
  flexDirection: "column",
  borderRadius: 25,
}

const $containerTransactionsSection: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  margin: 25,
  marginTop: 45,
  padding: 6,
}
