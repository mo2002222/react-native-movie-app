import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {

  const router = useRouter();

  const {data : movies, loading: moviesLoading, error: moviesError} = useFetch( ()=> fetchMovies({query:'' }));
  const {data : trendingMovies, loading: trendingLoading, error: trendingError} = useFetch( ()=> getTrendingMovies());

  return (
    <View
      className="flex-1 bg-primary"
    >
      <Image source={images.bg} className="w-full absolute z-50"/>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:"100%",paddingBottom:10}}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>

        {
          moviesLoading || trendingLoading ? (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center"/>
          ) : moviesError || trendingError ? (
            <Text className="text-white text-center my-10">Error {moviesError?.message || trendingError?.message}</Text>
          ) : (
            <View className="flex-1 mt-5">
              <SearchBar onPress = {() => {router.push('/(tabs)/Search')}} placeholder = 'Search for a movie'/>

                {trendingMovies && trendingMovies?.length > 0 && (
                  <View className="mt-10">
                    <Text className="text-white text-lg font-bold mt-5 mb-3">Trending Movies</Text>
                    <FlatList 
                    data={trendingMovies}
                    keyExtractor={(item) => item.$id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className='w-4'/> }
                    renderItem={({ item, index }) => (
                      <TrendingCard  movie={item} index={index}/>
                    )}
                     className="mt-2"
                    />
                  </View>
                )}

                <>
                  <Text className="text-white text-lg font-bold mt-5 mb-3">Latest Movies</Text>

                  <FlatList
                    data={movies}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'flex-start', marginBottom: 10, paddingRight: 5, gap: 20,}}
                    renderItem={({ item }) => (
                      <MovieCard {...item}/>
                    )}
                    className="mt-2 pb-32"
                    scrollEnabled={false}
                  />

                </>
            </View>            
          )
        }

        
      </ScrollView>
    </View>
  );
}
