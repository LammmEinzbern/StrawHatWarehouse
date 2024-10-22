import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { Button, Spinner } from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";
const UbahBarang = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [formEdit, setFormEdit] = useState({
    nama_barang: "",
    jenis_barang: "",
    harga: 0,
    stok: 0,
    deskripsi: "",
    foto_barang: "",
  });

  const [imagePreview, setImagePreview] = useState({
    preview: "",
    nextImage: {},
  });
  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };
  const getBarangById = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("barang")
        .select("*")
        .eq("id", id)
        .single();

      setFormEdit(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateBarangById = async (e) => {
    e.preventDefault();

    setLoadingBtn(true);
    try {
      if (imagePreview.length === 0) {
        const { data: updateData } = await supabase
          .from("barang")
          .update(formEdit)
          .eq("id", id)
          .select();

        if (updateData) {
          alert("Berhasil menjadi sigma");
          navigate("/tabel");
        } else {
          alert("Gagal menjadi sigma");
        }
      } else {
        const removeUrlImage = formEdit.foto_barang.replace(
          "https://qehdylpssbqwhaiwvzcp.supabase.co/storage/v1/object/public/imageCatalog/foto_product/",
          ""
        );
        const { data: deleteImage } = await supabase.storage
          .from("imageCatalog")
          .remove(`foto_product/${removeUrlImage}`);

        if (deleteImage) {
          const { data: uploadImage } = await supabase.storage
            .from("imageCatalog")
            .upload(
              `foto_product/${imagePreview.nextImage.name}`,
              imagePreview.nextImage,
              {
                cacheControl: 3600,
                upsert: true,
              }
            );

          if (uploadImage) {
            const { data } = await supabase
              .from("barang")
              .update({
                ...formEdit,
                foto_barang: `https://qehdylpssbqwhaiwvzcp.supabase.co/storage/v1/object/public/imageCatalog/foto_product/${imagePreview.nextImage.name}`,
              })
              .eq("id", id)
              .select();

            if (data) {
              alert("Kamu berhasil menjadi sigma");
              navigate("/tabel");
            } else {
              alert("Kamu gagal menjadi sigma");
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
    // try {
    //   const { data } = await supabase
    //     .from("barang")
    //     .update({
    //       nama_barang: formEdit.nama_barang,
    //       harga: formEdit.harga,
    //       jenis_barang: formEdit.jenis_barang,
    //       stok: formEdit.stok,
    //       deskripsi: formEdit.deskripsi,
    //       foto_barang: formEdit.foto_barang,
    //     })
    //     .eq("id", id)
    //     .select();

    //   if (data) {
    //     const swal = Swal.fire({
    //       title: "Data Berhasil Diubah",
    //       text: "Data barang telah diubah.",
    //       icon: "success",
    //     }).then(() => navigate("/tabel"));
    //   }
    // } catch (error) {
    //   console.log(error.message);
    // } finally {
    //   setLoadingBtn(false);
    // }
  };

  const handleImage = (e) => {
    const previewImage = URL.createObjectURL(e.target.files[0]);
    setImagePreview({ preview: previewImage, nextImage: e.target.files[0] });
  };

  useEffect(() => {
    getBarangById();
    document.getElementById("title").innerHTML = "Edit Barang";
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner label="Tapi tunggu dulu..." />
        </div>
      ) : (
        <section
          id="halaman-edit"
          className="px-4 md:px-20 py-5 max-w-4xl mx-auto"
        >
          <form onSubmit={updateBarangById} className="space-y-5">
            <label className="block">
              Nama Barang
              <input
                name="nama_barang"
                type="text"
                className="form-input rounded-lg w-full"
                value={formEdit.nama_barang}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Harga
              <input
                name="harga"
                type="number"
                className="form-input rounded-lg w-full"
                value={formEdit.harga}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Jenis Barang
              <select
                name="jenis_barang"
                className="form-input rounded-lg w-full"
                value={formEdit.jenis_barang}
                onChange={handleChange}
              >
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
              </select>
            </label>
            <label className="block">
              Stok
              <input
                name="stok"
                type="number"
                className="form-input rounded-lg w-full"
                value={formEdit.stok}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Deskripsi
              <textarea
                name="deskripsi"
                className="form-input rounded-lg w-full"
                value={formEdit.deskripsi}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Image URL
              <input
                name="foto_barang"
                type="file"
                className="form-input rounded-lg w-full"
                onChange={handleImage}
              />
            </label>

            <img
              src={
                imagePreview.preview.length > 0
                  ? imagePreview.preview
                  : formEdit.foto_barang
              }
              alt={formEdit.nama_barang}
              className="size-44"
            />

            <div className="flex gap-4 mt-3">
              <Button onClick={() => navigate("/tabel")} color="danger">
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

export default UbahBarang;
