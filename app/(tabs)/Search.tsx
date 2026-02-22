import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { updateSearchCount } from "@/services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  
  useEffect(()=>{
    const delayDebounce = setTimeout(() => {
      if(searchQuery.trim()){
        loadMovies();
      }else{
        resetMovies();
      }
    }, 700);
    return () => clearTimeout(delayDebounce);
  },[searchQuery]);

  useEffect(()=>{
    if (movies?.length > 0 && movies?.[0]) {
        updateSearchCount(searchQuery, movies?.[0] || null);
      }
  },[movies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 w-full absolute z-50"
        resizeMode="cover"
      />
      <FlatList

        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        ListHeaderComponent={
          <>
            <View className="w-full justify-center items-center mt-20" >
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="mt-10 mb-5 mx-5">
              <SearchBar
                value={searchQuery}
                onChangeText={(val: string) => setSearchQuery(val)}
                placeholder="Search Movies ..."
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="mt-10 self-center"
              />
            )}

            {error && (
              <Text className="text-red-500 text-center px-5 my-3">
                Error {error?.message}
              </Text>
            )}

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-white text-lg font-bold mb-3 ms-5">
                  Search Results for{" "}
                  <Text className="text-accent">{searchQuery} </Text>
                </Text>
              )}
          </>
        }
        columnWrapperStyle={{
          justifyContent: "flex-start",
          marginBottom: 10,
          paddingHorizontal: 15,
          gap: 20,
        }}
        renderItem={({ item }) => (
          <MovieCard {...item}/>
        )}
        ListEmptyComponent={
          !loading && !error ? (
            <View className="px-5 mt-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim() ? `No movies found for ${searchQuery}` : "Search"}
              </Text>
            </View>
          ) : null
        }
        className="mb-32"
      />
    </View>
  );
};

export default Search;
