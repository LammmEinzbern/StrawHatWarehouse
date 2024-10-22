import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Button, Modal, Spinner, useDisclosure } from "@nextui-org/react";
import { supabase } from "../utils/SupaSupplier";
import TableSupplier from "../components/TableSupplier";
import ModalAddSupplier from "../components/nextui/ModalAddSupplier";

const DataSupplier = () => {
  const [loading, setLoading] = useState(true);
  const [allSupplier, setAllSupplier] = useState([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getallSupplier = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("supplier")
        .select("*")
        .order("id_supplier", { ascending: false });

      setAllSupplier(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallSupplier();
    document.getElementById("title").innerHTML = "Data Supplier";
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner className="m-auto" label="Tapi tunggu dulu" />
        </div>
      ) : (
        <section id="data-supplier" className="p-4">
          <div className="flex flex-col md:flex-row justify-between mb-5">
            <h2 className="text-4xl font-bold">Data Supplier</h2>
            <div className="flex-shrink-0 mt-4 md:mt-0">
              <Button onPress={onOpen} color="primary">
                Tambah Supplier
              </Button>
            </div>
            <ModalAddSupplier
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
            />
          </div>
          <TableSupplier allSupplier={allSupplier} />
        </section>
      )}
    </Layout>
  );
};

export default DataSupplier;
