// track the searches made by the users
import { Client, Databases, ID, Query } from "react-native-appwrite";
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client();
client
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

    const Database = new Databases(client);

export const updateSearchCount = async (query : string, movie : Movie) => {

    try {

        const result =  await Database.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal("searchTerm", [query])
            ]);

            if(result.documents.length > 0){
                const existingMovie = result.documents[0];
                await Database.updateDocument(DATABASE_ID, COLLECTION_ID, existingMovie.$id, {
                    count : existingMovie.count + 1,
                })
            } else {
                await Database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                    searchTerm : query,
                    count : 1,
                    movie_id : movie?.id || null,
                    poster_url : movie ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
                    title : movie?.title || null,
                })
            }
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export const getTrendingMovies = async ():Promise<TrendingMovie[] | undefined> => {
    try {
        const result =  await Database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc("count")
        ]);
        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        return undefined;
    }
}