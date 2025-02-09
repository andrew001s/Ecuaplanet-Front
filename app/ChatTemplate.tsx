import { View, Text } from 'react-native'
import React from 'react'
import Chat from '../src/screens/Chat'
import ChatLayout from '../src/components/layout/ChatLayout'
import { useRouter } from 'expo-router'
import { useSearchParams } from 'expo-router/build/hooks'

const ChatTemplate = () => {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  console.log(category)
  return (
    <ChatLayout>
      <Chat />
    </ChatLayout>
  )
}

export default ChatTemplate