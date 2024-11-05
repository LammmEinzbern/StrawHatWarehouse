import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import LoadingSkeleton from "../components/nextui/LoadingSkeleton";
import Layout from "../components/Layout";
import { useAuth } from "../auth/AuthProvider";

const Dashboard = () => {
  const [barang, setBarang] = useState(0);
  const [JenisBarang, setJenisBarang] = useState({});
  const [loadingSkeleton, setLoadingSkeleton] = useState();
  const { username } = useAuth();

  const totalBarang = async () => {
    setLoadingSkeleton(true);
    try {
      const countTotalBarang = supabase
        .from("barang")
        .select("*", { count: "exact", head: true });

      const jenisBarang = ["makanan", "minuman"];

      const countTotalJenisBarang = jenisBarang.map((jenis) =>
        supabase
          .from("barang")
          .select("*", { count: "exact", head: true })
          .eq("jenis_barang", jenis)
      );

      const results = await Promise.all([
        countTotalBarang,
        ...countTotalJenisBarang,
      ]);

      const totalCount = results[0].count;
      let counts = {};
      results.slice(1).forEach((result, index) => {
        counts[jenisBarang[index]] = result.count;
      });

      setBarang(totalCount);
      setJenisBarang(counts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSkeleton(false);
    }
  };

  useEffect(() => {
    totalBarang();
    document.getElementById("title").innerHTML = "Dashboard";
  }, []);

  return (
    <Layout>
      <section id="dashboard" className="p-4 md:p-10 ">
        <div className="bg-cyan-950 text-white rounded-lg p-6 md:p-10 h-auto  ">
          <h2 className="text-2xl md:text-4xl font-semibold">
            Selamat Datang {username}
          </h2>
          <p className="text-sm md:text-lg mt-2">
            selamat datang!, Hola humans! ini adalah website Straw Hat
            Warehouse!.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6 w-full">
          {loadingSkeleton ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : (
            <>
              <div className="p-4 bg-green-700 text-white rounded-lg h-auto md:h-44">
                <h2 className="text-xl md:text-2xl font-bold">
                  Total keseluruhan barang
                </h2>
                <p className="text-3xl md:text-5xl font-bold mt-2">
                  {barang} barang
                </p>
              </div>

              <div className="p-4 bg-yellow-500 text-white rounded-lg h-auto md:h-44">
                <h2 className="text-xl md:text-2xl font-bold">Total Makanan</h2>
                <p className="text-3xl md:text-5xl font-bold mt-2">
                  {JenisBarang.makanan} barang
                </p>
              </div>

              <div className="p-4 bg-blue-950 text-white rounded-lg h-auto md:h-44">
                <h2 className="text-xl md:text-2xl font-bold">Total Minuman</h2>
                <p className="text-3xl md:text-5xl font-bold mt-2">
                  {JenisBarang.minuman} barang
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
