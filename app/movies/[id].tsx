import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { icons } from '@/constants/icons';
interface movieInfoProps {
    label: string;
    value?: string | number | null;
}
const MovieInfo = ({label, value}: movieInfoProps) => (
    <View className='flex-col  items-start gap-x-1 mt-5 '>
        <Text className='text-light-200 font-normal text-sm mb-1'>{label}</Text>
        {value && (<Text className='text-light-100 font-bold text-sm'>{value}</Text>)}
    </View>
        
)




const MovieDetails = () => {

    const {id} = useLocalSearchParams();
    const {data: movieDetails, loading} = useFetch(()=>
        fetchMovieDetails(id as string));
    

  return (
    <View className='bg-primary flex-1'>
       <ScrollView contentContainerStyle={{paddingBottom: 80}}>
        <View>
            <Image source={{uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}} className='w-full h-[550px]' resizeMode='stretch'/>
        </View>
        <View className='flex-col items-start justify-center px-3 mt-5 '>
            <Text className='text-white font-bold text-xl'>{movieDetails?.original_title}</Text>
            <View className='flex-row items-center gap-x-1 mt-2 '>
                <Text className='text-light-200 text-sm'>{movieDetails?.release_date.split('-')[0]}</Text>
                <Text className='text-light-200 text-sm'>| {movieDetails?.runtime} min</Text>
            </View>
            <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
                <Image source={icons.star} className='size-4'/>
                <Text className='text-white font-bold text-sm'>{Math.round(movieDetails?.vote_average ?? 0)}/10</Text>
                <Text className='text-light-200 text-sm'>{movieDetails?.vote_count} votes</Text>
            </View>

            <MovieInfo label="Overview" value={movieDetails?.overview}/>
            <MovieInfo label="Genres" value={movieDetails?.genres.map((genre: {name: string}) => genre.name).join(', ') || 'No genres available'}/>

            <View className='flex flex-row justify-between w-1/2'>
                <MovieInfo label="Budget" value={`$${movieDetails?.budget ? movieDetails.budget / 1_000_000 : 0}Million`}/>
                <MovieInfo label="Revenue" value={`$${Math.round(movieDetails?.revenue ?? 0)/1_000_000}`}/>
            </View>
            <MovieInfo label='Production Companies' value={movieDetails?.production_companies.map((company: {name: string}) => company.name).join(', ') || 'No production companies available'}/>
        </View>
        
            
       </ScrollView>

       <TouchableOpacity onPress={() => router.back()}  className='absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row justify-center items-center z-50'>
        <Image className="size-5 mr-1 mt-0.5 rotate-180" source={icons.arrow} tintColor={'#fff'}  />
        <Text className='text-white font-semibold text-base '>Go Back</Text>
       </TouchableOpacity>
    </View>
  )
}
//        </ScrollView>
//     </View>
//   )
// }

export default MovieDetails