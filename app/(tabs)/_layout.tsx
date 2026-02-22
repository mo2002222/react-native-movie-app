import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const TabIcon = ({icon, focused, title} : any)=> {
  if (focused) {
    return(
      <ImageBackground source={images.highlight} className='flex flex-1 flex-row min-h-14 min-w-[112px] mt-[10px] items-center justify-center rounded-full overflow-hidden'>
          <Image source={icon} tintColor="#151312" className='size-5'/>
           <Text className='text-secondary text-base font-semibold ml-1'>{title}</Text>
      </ImageBackground>
  )
  }

  return(
    <View className='flex items-center justify-center mt-[10px] rounded-full'>
      <Image source={icon} tintColor="#A8B5D8" className='size-5'/>
    </View>
  )
}
const _layout = () => {
  return (
    <Tabs
    screenOptions={{
      tabBarShowLabel: false, 
      tabBarItemStyle : {
        width: "100%",
        height: "100%",
        justifyContent : "center",
        alignItems : "center",
      },
      tabBarStyle : {
        backgroundColor : '#0f0D23',
        borderRadius : 50,
        marginHorizontal : 20,
        marginBottom: 36,
        height: 52, 
        position: 'absolute',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor:'#0f0d23'

      }
    }}
    >
        <Tabs.Screen name='index' options={{headerShown: false, title: '', tabBarIcon : ({focused}) => (
            <TabIcon icon={icons.home} title={'Home'} focused={focused}/>
        )}} />
        <Tabs.Screen name='Search' options={{headerShown: false, title: '', tabBarIcon : ({focused}) => (
            <TabIcon icon={icons.search} title={'Search'} focused={focused}/>
        )}}/>
        <Tabs.Screen name='saved' options={{headerShown: false, title: '' , tabBarIcon : ({focused}) => (
            <TabIcon icon={icons.save} title={'Saved'} focused ={focused}/>
        )}}/>
        <Tabs.Screen name='profile' options={{headerShown: false, title: '' , tabBarIcon : ({focused}) => (
            <TabIcon icon={icons.person} title={'Profile'} focused ={focused}/>
        )}}/>
    </Tabs>
  )
}

export default _layout