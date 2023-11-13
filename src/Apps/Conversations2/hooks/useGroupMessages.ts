import { fromToday } from "Apps/Conversations2/components/Message/ConversationTimeSince"
import { extractNodes } from "Utils/extractNodes"
import { sortBy } from "lodash"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"

export const useGroupedMessages = (messages, events) => {
  const [messagesAndEvents, setMessagesAndEvents] = useState([])

  useEffect(() => {
    const allMessages = extractNodes(messages)

    const allOrderEvents = extractNodes(events).reduce(
      (prev, order) => prev.concat(order.orderHistory as any),
      []
    )

    const orderEventsWithoutFailedPayment = allOrderEvents.filter(
      (event, index) => {
        if (!event) return false

        if (
          !(
            event.state === "APPROVED" &&
            allOrderEvents[index + 1] &&
            allOrderEvents[index + 1].state === "SUBMITTED"
          )
        ) {
          return event
        }
      }
    )

    const sortedMessages = sortBy(
      [...orderEventsWithoutFailedPayment, ...allMessages],
      message => DateTime.fromISO(message.createdAt as string)
    )

    const groupAllMessages = groupMessages(sortedMessages)

    setMessagesAndEvents(groupAllMessages.reverse())
  }, [messages, events])

  return messagesAndEvents
}

/**
 * Combines messages into groups of messages sent by the same party and
 * separated out into different groups if sent across multiple days
 * @param messages Messages in the conversation
 */
export const groupMessages = messages => {
  if (messages.length === 0) {
    return []
  }
  // Make a copy of messages
  const remainingMessages = [...messages]
  const groups = [[remainingMessages.pop()]]

  while (remainingMessages.length > 0) {
    const lastGroup = groups[groups.length - 1]
    const lastMessage = lastGroup[lastGroup.length - 1]
    const currentMessage = remainingMessages.pop()

    const lastMessageCreatedAt = DateTime.fromISO(lastMessage.createdAt)
    const currentMessageCreatedAt = DateTime.fromISO(currentMessage.createdAt)
    const sameDay = lastMessageCreatedAt.hasSame(currentMessageCreatedAt, "day")

    const today = fromToday(currentMessageCreatedAt)

    if (sameDay && !today) {
      lastGroup.push(currentMessage)
    } else if (!today) {
      groups.push([currentMessage])
    } else if (lastMessage.isFromUser !== currentMessage.isFromUser) {
      groups.push([currentMessage])
    } else if (!sameDay && today) {
      groups.push([currentMessage])
    } else {
      lastGroup.push(currentMessage)
    }
  }
  return groups
}
