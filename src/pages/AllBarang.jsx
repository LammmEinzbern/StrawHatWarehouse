import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import { Card, CardBody, Spinner, Button } from "@nextui-org/react";
import Layout from "../components/Layout";
import useFormatRupiah from "../hook/useFormatRupiah";
const AllBarang = () => {
  const { formatRupiah } = useFormatRupiah();
  const [loading, setLoading] = useState(true);
  const [allBarang, setAllBarang] = useState([]);
  const [filteredBarang, setFilteredBarang] = useState([]);
  const [filter, setFilter] = useState();

  const getAllBarang = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("barang")
        .select("*")
        .order("id", { ascending: false });

      setAllBarang(data);
      setFilteredBarang(data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (jenis) => {
    setFilter(jenis);
    if (jenis === "makanan") {
      setFilteredBarang(
        allBarang.filter((barang) => barang.jenis_barang === "makanan")
      );
    } else if (jenis === "minuman") {
      setFilteredBarang(
        allBarang.filter((barang) => barang.jenis_barang === "minuman")
      );
    } else {
      setFilteredBarang(allBarang);
    }
  };

  useEffect(() => {
    getAllBarang();
    document.getElementById("title").innerHTML = "Semua Barang";
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h2 className="text-4xl font-bold mb-6">Semua Barang</h2>
        <div className="mb-4">
          <Button onClick={() => handleFilterChange("semua")} className="mr-2">
            Semua
          </Button>
          <Button
            onClick={() => handleFilterChange("makanan")}
            className="mr-2"
          >
            Makanan
          </Button>
          <Button onClick={() => handleFilterChange("minuman")}>Minuman</Button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spinner label="Tapi tunggu dulu" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBarang.map((barang) => (
              <Card key={barang.id} className="shadow-md">
                <img
                  src={barang.foto_barang || "/fallback-image.jpg"}
                  alt={barang.nama_barang}
                  className="object-cover h-48 w-full"
                  onError={(e) => {
                    e.target.src = "/fallback-image.jpg";
                  }}
                />
                <CardBody>
                  <h4 className="font-bold">{barang.nama_barang}</h4>
                  <p>Harga: {formatRupiah(barang.harga)}</p>
                  <p>Jenis: {barang.jenis_barang}</p>
                  <p>Stok: {barang.stok}</p>
                  <p>{barang.deskripsi}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllBarang;
