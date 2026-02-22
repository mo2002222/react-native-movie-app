import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const profile = () => {
  return (
    <View className='bg-primary flex-1 px-10'>
      <View className='flex flex-1 items-center mt-20 justify-start flex-col gap-2'>
        <Image source={icons.person} className='size-7'/>
        <Text className='text-white text-lg font-bold'>
          Welcome to your profile!
        </Text>

      </View>
    </View>
  )
}

export default profile