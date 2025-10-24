"use client";
import { useEffect, useState } from "react";
import Loading from "../component/Loading";
import ArtikelWp from "../component/ArtikelWp";
import Button from "../component/Button";

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh]= useState(true)

  // function untuk get data dari api

  const getData = async () => {
    try {
      setLoading(true)
      const res = await fetch(
        "https://smkmadinatulquran.sch.id/wp-json/wp/v2/posts"
      );
      const artikel = await res.json();
      setData(artikel)

      console.log("artikel", artikel);
    } catch {
      setError("Ada Kesalahan")
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getData()
  }, [refresh]);

 

  if(loading) return <Loading/>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Posts dari WordPress
        </h1>

        <Button title="Refresh" onClick={()=> {
          setRefresh(!refresh)
        }} colorSchema="blue" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.map((post, index)=> (
            <section key={index}>
              <ArtikelWp post={post}/>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
