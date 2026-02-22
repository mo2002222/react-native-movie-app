import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { icons } from '@/constants/icons'

const MovieCard = ({id, poster_path, title, vote_average, release_date} : Movie) => {
  return (

    <Link href={`/movies/${id}`} asChild>
    <TouchableOpacity className='w-[30%]'>
        <Image source={{
            uri :  poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}`: 'https://placehold.co/600x400/1a1a1a/ffffff.png'
        }} className='w-full h-52 rounded-lg' resizeMode='cover'/>
        <Text numberOfLines={1} className='text-white mt-2 font-bold text-sm'>{title}</Text>
        <View  className='flex-row items-start'>
            <Image source={icons.star} className='size-4'/>
            <Text className='text-white ml-1 font-bold uppercase text-xs'>{Math.round(vote_average/2)}</Text>
        </View>
        <View className='flex-row items-center justify-between'>
            <Text className='text-light-300 font-medium mt-1 text-xs'>{release_date?.split('-')[0]}</Text>
        </View>
    </TouchableOpacity>
    </Link>

  )
}

export default MovieCard