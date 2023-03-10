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
  RefreshControl,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native"
import { Text, Screen } from "../components"
import { colors } from "../theme"
import AccountHistory from "../components/AccountHistory"
import AccountCard from "../components/AccountCard"
import TransactionCard from "../components/TransactionCard"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs"
import {Dot} from '../components/Dot';
import { AccountDTO, api } from "../services/api"

export const Accounts = observer(function Accounts() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()

  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeAccountId, setActiveAccountId] = useState<AccountDTO["idAccount"]>()


  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.ceil(event.nativeEvent.contentOffset.x / windowWidth)
    setCurrentIndex(index)
  }


  const bottomTabBarHeight = useBottomTabBarHeight()

  const { width: windowWidth } = useWindowDimensions()

  const CARD_MARGIN_HORIZONTAL = 10
  const CARD_OFFSET_HORIZONTAL = 8

  const CARD_WIDTH = windowWidth - CARD_MARGIN_HORIZONTAL * 3 - CARD_OFFSET_HORIZONTAL

  const $containerFlexWidth: ViewStyle = {
    width: CARD_WIDTH,
  }

  useEffect(() => {
    
  fetchAccounts()
    
  }, [])
  

  useEffect(() => {
    if (!activeAccountId && accounts && accounts.length > 0) {
      setActiveAccountId(accounts[0].idAccount)
    }
  }, [accounts])

  useEffect(() => {
    if (activeAccountId) {
     // setTransactions(undefined)
      fetchTransactions(activeAccountId)
    }
  }, [activeAccountId])

  const fetchAccounts = async () => {
    const { data } = await api.getAccounts()
    setAccounts(data)
  }

  const fetchTransactions = async (accountId: AccountDTO["idAccount"]) => {
    const { data } = await api.getTransactions(accountId, { size: 5 })
    setTransactions(data)
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    await Promise.all([fetchAccounts(), activeAccountId && fetchTransactions(activeAccountId)])
    setIsRefreshing(false)
  }



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
    <Screen
      style={[$containerApp, $containerAppColor]}
      preset="scroll"
      contentContainerStyle={{ paddingBottom: bottomTabBarHeight + 10 }}
      ScrollViewProps={{
        overScrollMode: "always",
        refreshControl: (
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshData}
            tintColor="white"
            colors={["#523CF8"]}
          />
        ),
      }}
    >
      <AccountHistory />
      <View style={$pagination}>
      <View style={$indicatorContainer}>
        {accounts.map((account, index) => (
          <Dot key={index} isSelected={index === currentIndex} />
        ))}
      </View>
      </View>
      <FlatList
        data={accounts}
        keyExtractor={(item) => item.number}
        renderItem={({ item }) => <AccountCard account={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
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
    </Screen>
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

const $pagination: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 31,
}

const $indicatorContainer: ViewStyle = {
  height: 15,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}
