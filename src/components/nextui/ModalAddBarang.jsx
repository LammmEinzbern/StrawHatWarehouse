import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import React, { useState } from "react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

export default function ModalAddBarang({ isOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    nama_barang: "",
    harga: "",
    jenis_barang: "",
    stok: "",
    deskripsi: "",
    foto_barang: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: uploadImage, error: uploadError } = await supabase.storage
        .from("imageCatalog")
        .upload(
          `foto_product/${formData.foto_barang.name}`,
          formData.foto_barang,
          {
            cacheControl: "3600",
            upsert: true,
          }
        );

      if (uploadError) {
        throw uploadError;
      }

      if (uploadImage) {
        const imageUrl = supabase.storage
          .from("imageCatalog")
          .getPublicUrl(`foto_product/${formData.foto_barang.name}`)
          .data.publicUrl;

        const updatedFormData = {
          ...formData,
          foto_barang: imageUrl,
        };

        const { data, error } = await supabase
          .from("barang")
          .insert(updatedFormData)
          .select();

        if (error) {
          throw error;
        }

        if (data) {
          Swal.fire({
            title: "Input Suksesfull",
            text: "Data berhasil dimasukan ke dalam data anak basis",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        } else if (error) {
          Swal.fire({
            title: "Error",
            text: error.message,
            icon: "error",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  const jenisBarang = [
    {
      key: "makanan",
      value: "Makanan",
    },
    {
      key: "minuman",
      value: "Minuman",
    },
  ];

  const handleImage = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Tambah Barang</ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Barang
                  </label>
                  <input
                    type="text"
                    name="nama_barang"
                    value={formData.nama_barang}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Harga
                  </label>
                  <input
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Jenis Barang
                  </label>
                  <select
                    name="jenis_barang"
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled selected>
                      Pilih Jenis Barang
                    </option>
                    {jenisBarang.map((item) => (
                      <option key={item.key} value={item.key}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Stok
                  </label>
                  <input
                    type="number"
                    name="stok"
                    value={formData.stok}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>
                  <input
                    type="text"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Gambar
                  </label>
                  <input
                    type="file"
                    name="foto_barang"
                    onChange={handleImage}
                    required
                    className="mt-1 block w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Tambah Barang
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
