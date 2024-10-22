import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { Button, Spinner } from "@nextui-org/react";
import Swal from "sweetalert2";
import { supabase } from "../../utils/SupaSupplier";

const UbahDetailSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [formEdit, setFormEdit] = useState({
    nama_supplier: "",
    no_hp: 0,
    alamat: "",
    email: "",
    logo_supplier: "",
  });

  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const getSupplierById = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("supplier")
        .select("*")
        .eq("id_supplier", id)
        .single();

      setFormEdit(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSupplierById = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);
    try {
      const { data } = await supabase
        .from("supplier")
        .update({
          nama_supplier: formEdit.nama_supplier,
          no_hp: formEdit.no_hp,
          alamat: formEdit.alamat,
          email: formEdit.email,
          logo_supplier: formEdit.logo_supplier,
        })
        .eq("id_supplier", id)
        .select();

      if (data) {
        Swal.fire({
          title: "Data Berhasil Diubah",
          text: "Data supplier telah diubah.",
          icon: "success",
        }).then(() => navigate("/data-supplier"));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    getSupplierById();
    document.getElementById("title").innerHTML = "Edit Supplier";
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner label="Tapi tunggu dulu" />
        </div>
      ) : (
        <section
          id="halaman-edit"
          className="px-4 md:px-20 py-5 max-w-4xl mx-auto"
        >
          <form onSubmit={updateSupplierById} className="space-y-5">
            <label className="block">
              Nama Supplier
              <input
                name="nama_supplier"
                type="text"
                className="form-input rounded-lg w-full"
                value={formEdit.nama_supplier}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              No HP
              <input
                name="no_hp"
                type="number"
                className="form-input rounded-lg w-full"
                value={formEdit.no_hp}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Alamat
              <input
                name="alamat"
                type="text"
                className="form-input rounded-lg w-full"
                value={formEdit.alamat}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Email
              <textarea
                name="email"
                className="form-input rounded-lg w-full"
                value={formEdit.email}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Logo Supplier
              <input
                name="logo_supplier"
                type="text"
                className="form-input rounded-lg w-full"
                value={formEdit.logo_supplier}
                onChange={handleChange}
              />
            </label>

            <div className="flex gap-4 mt-3">
              <Button onClick={() => navigate("/data-supplier")} color="danger">
                Kembali
              </Button>
              {loadingBtn ? (
                <Button type="submit" color="primary" disabled>
                  Loading...
                </Button>
              ) : (
                <Button type="submit" color="primary">
                  Ubah Data
                </Button>
              )}
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
};

export default UbahDetailSupplier;
