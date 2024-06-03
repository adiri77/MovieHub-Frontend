import axios from "axios";

const BASE_URL="https://api.themoviedb.org/3";
const TMDB_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzExNTVjMDlhNmI0ZWQ2NjZhYmEyOTQ2Yjg5ZmM5MiIsInN1YiI6IjY2NWQyYzczNTQ0YjQ2MjU0ZjQ4MmY0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zGbh6HERM8d-OZBjamAYQLXwhRkHx1vcqUvcDWgf29I"

const headers={
    Authorization:"bearer "+TMDB_TOKEN
}
export const fetchData=async(url,params)=>{
   try{
      const {data}=await axios.get(BASE_URL+url,{headers,params})
      console.log(data,"........>>>>>>>>>>>>>>>>>>>>>>");
      return data;
   }catch(e){
    console.log(e)
    return e;
   }
}