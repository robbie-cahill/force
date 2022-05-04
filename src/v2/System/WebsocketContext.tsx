import { Cable, Channel, Subscriptions } from "actioncable"
import { createContext, useContext, useMemo } from "react"
import { getENV } from "v2/Utils/getENV"
import { useDidMount } from "v2/Utils/Hooks/useDidMount"

interface WebsocketProps {
  cable: Cable | null
  createSubscription: (props: {
    channel: string
    saleID: string
    onReceived: (data: any) => void
  }) => ReturnType<Subscriptions["create"]>
  getSubscription: (subscriptionKey: string) => Channel | null
}

const initialValues = {
  cable: null,
  createSubscription: x => x,
  getSubscription: x => x,
}

const WebsocketContext = createContext<WebsocketProps>(initialValues)

export const WebsocketContextProvider: React.FC = ({ children }) => {
  const isMounted = useDidMount()

  const cable = useMemo(() => {
    if (!isMounted) {
      return null
    }
    const actionCable = require("actioncable")

    const cable: Cable = actionCable.createConsumer(
      getENV("GRAVITY_WEBSOCKET_URL")
    )

    return cable
  }, [isMounted])

  // Due to SSR issues, we need to return a stub of the context during the
  // initial pass. Once mounted we can return the proper websocket
  if (!isMounted) {
    return (
      <WebsocketContext.Provider value={initialValues}>
        {children}
      </WebsocketContext.Provider>
    )
  }

  const contextValues = {
    cable,
    createSubscription: ({ channel, saleID, onReceived }) => {
      if (!cable) {
        return null
      }

      const subscriptionKey = `${channel}|${saleID}`
      const existingSubscription = cable.subscriptions[subscriptionKey]

      if (existingSubscription) {
        return existingSubscription
      }

      const subscription = cable.subscriptions.create(
        {
          channel,
          sale_id: saleID,
        },
        {
          received: data => {
            onReceived(data)
          },
        }
      )

      return subscription
    },
    getSubscription: subscriptionKey => {
      if (!cable) {
        return null
      }
      return cable.subscriptions[subscriptionKey]
    },
  }

  return (
    <WebsocketContext.Provider value={contextValues}>
      {children}
    </WebsocketContext.Provider>
  )
}

export const useWebsocketContext = () => {
  const websocketContext = useContext(WebsocketContext) ?? {}
  return websocketContext
}
