import MockAdapter from "axios-mock-adapter"
import { add, formatISO } from "date-fns"
import { api } from "./api"
import { AccountDTO, TransactionDTO } from "./api.types"

const mock = new MockAdapter(api.apisauce.axiosInstance, { delayResponse: 300 })


mock.onGet("/accounts").reply<AccountDTO[]>(200, [
    {
        idAccount: 1,
        type: "Current Account",
        number: "1234-5678-9012-3456",
        balance: "86.451,00",
      },
      {
        idAccount: 2,
        type: "Savings Account",
        number: "2345-6789-0123-4567",
        balance: "76.451,00",
      },
    
])

const transactionTemplates = [
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
]
mock.onGet(/\/accounts\/\d+\/transactions/).reply<TransactionDTO[]>((config) => {
  const { size = 50, offset = 0 } = config.params ?? {}
  const now = new Date()
  try {
    const transactions = [...new Array(size)].map((_, index) => ({
      ...transactionTemplates[index % transactionTemplates.length],
      id: offset + index,
      dateTime: formatISO(add(now, { days: -(offset - index) })),
    }))
    return [200, transactions]
  } catch (e) {
    console.log(e)
  }
  return [200, []]
})
