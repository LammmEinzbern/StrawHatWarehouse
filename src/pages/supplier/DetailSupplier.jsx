import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Link, useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { supabase } from "../../utils/SupaSupplier";

const DetailSupplier = () => {
  const [getSupplierById, setSupplierById] = useState({});
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const getIdSupplier = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("supplier")
        .select("*")
        .eq("id_supplier", id)
        .single();

      setSupplierById(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIdSupplier();
    document.getElementById("title").innerHTML = "Detail Supplier";
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner className="m-auto" label="Tapi tunggu dulu" />
        </div>
      ) : (
        <section className="py-8 px-4 md:py-16 md:px-20 lg:px-40 max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-16">
            <img
              src={getSupplierById.logo_supplier}
              alt="supplier logo"
              className="object-cover w-full h-64 md:w-96 md:h-auto"
            />
            <div className="flex flex-col">
              <h2 className="font-bold text-3xl md:text-4xl lg:text-6xl">
                {getSupplierById.nama_supplier}
              </h2>
              <h4 className="text-lg md:text-xl lg:text-2xl mt-2">
                {getSupplierById.no_hp}
              </h4>
              <p className="my-4 text-sm md:text-base lg:text-lg break-words">
                {getSupplierById.alamat}
              </p>
              <p className="mb-4 text-sm md:text-base lg:text-lg break-words">
                {getSupplierById.email}
              </p>
              <Link
                to="/data-supplier"
                className="flex items-center gap-2 bg-cyan-800 text-white p-2 justify-center rounded-lg transition-all duration-300 hover:bg-black mt-4 w-full md:w-40"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m4 10l-.707.707L2.586 10l.707-.707zm17 8a1 1 0 1 1-2 0zM8.293 15.707l-5-5l1.414-1.414l5 5zm-5-6.414l5-5l1.414 1.414l-5 5zM4 9h10v2H4zm17 7v2h-2v-2zm-7-7a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5z"
                  />
                </svg>
                <p>Kembali</p>
              </Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default DetailSupplier;
