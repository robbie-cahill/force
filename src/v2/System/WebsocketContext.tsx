import { createContext, useContext, useMemo, useState } from "react"
import { getENV } from "v2/Utils/getENV"
import { useDidMount } from "v2/Utils/Hooks/useDidMount"

interface WebsocketProps {
  websockets: any
  createSubscription: any
}

const WebsocketContext = createContext<WebsocketProps>({
  websockets: null,
  createSubscription: null,
})

export const WebsocketContextProvider: React.FC<{}> = ({ children }) => {
  const isMounted = useDidMount()
  const websocketURL = getENV("GRAVITY_WEBSOCKET_URL")

  const [subscriptions, setSubscriptions] = useState({})

  const websockets = useMemo(() => {
    if (!isMounted) {
      return null
    }
    const actionCable = require("actioncable")
    return actionCable.createConsumer(websocketURL)
  }, [websocketURL, isMounted])

  console.log("in context", websockets)
  console.log("subscriptions", subscriptions)
  const contextValues = {
    websockets,
    createSubscription: ({ channel, saleID, onReceived }) => {
      const subscriptionKey = `${channel}|${saleID}`
      const existingSubscription = subscriptions[subscriptionKey]
      if (existingSubscription) return existingSubscription

      const subscription = websockets.subscriptions.create(
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

      // setSubscriptions({
      //   ...subscriptions,
      //   subscriptionKey: subscription,
      // })

      return subscription
    },
    // getSubscription: channelName => {
    //   return websockets.subscriptions[channelName]
    // },
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

// export const useWebsocketSubscription = channelName => {
//   const { getSubscription } = useWebsocketContext()
//   const subscription = getSubscription(channelName)
//   return subscription
// }

// export const useCreateWebsocketSubscription = ({
//   channelName,
//   data,
//   onChange,
// }) => {
//   const { createSubscription } = useWebsocketContext()
//   const subscription = createSubscription({ channelName, data, onChange })
//   return subscription
// }
