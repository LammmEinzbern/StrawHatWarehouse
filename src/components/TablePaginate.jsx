import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
  Button,
} from "@nextui-org/react";
import { EyeIcon } from "./Icons/EyeIcon";
import { EditIcon } from "./Icons/EditIcon";
import { DeleteIcon } from "./Icons/DeleteIcon";
import useFormatRupiah from "../hook/useFormatRupiah";
import useTruncateText from "../hook/useTruncateText";
import { Link } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";
import { useAuth } from "../auth/AuthProvider";

const columns = [
  {
    key: "foto_barang",
    label: "Foto Barang",
  },
  {
    key: "nama_barang",
    label: "Nama Barang",
  },
  {
    key: "harga",
    label: "Harga",
  },
  {
    key: "jenis_barang",
    label: "Jenis Barang",
  },
  {
    key: "stok",
    label: "Stok",
  },
  {
    key: "deskripsi",
    label: "Deskripsi",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function TablePaginate({ allBarang, filterJenis, search }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const filteredBarang = useMemo(() => {
    return allBarang.filter((barang) =>
      barang.nama_barang.toLowerCase().includes(search.toLowerCase())
    );
  }, [allBarang, search]);
  // const filteredBarang =
  //   filterJenis === "semua"
  //     ? allBarang
  //     : allBarang.filter((item) => item.jenis_barang === filterJenis);

  const pages = Math.ceil(filteredBarang.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredBarang.slice(start, end);
  }, [page, filteredBarang]);

  const { formatRupiah } = useFormatRupiah();
  const { truncateText } = useTruncateText();
  const { user, role } = useAuth();
  const deleteBarangById = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data: getImageById } = await supabase
            .from("barang")
            .select("foto_barang")
            .eq("id", id)
            .single();

          const removeUrlImage = String(getImageById.foto_barang).replace(
            "https://qehdylpssbqwhaiwvzcp.supabase.co/storage/v1/object/public/imageCatalog/foto_product/",
            ""
          );

          if (getImageById) {
            const { data: deleteImage } = await supabase.storage
              .from("imageCatalog")
              .remove([`foto_product/${removeUrlImage}`]);
            if (deleteImage) {
              const { data } = await supabase
                .from("barang")
                .delete()
                .eq("id", id)
                .select();

              if (data) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                }).then(() => window.location.reload());
              }
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn key={col.key}>{col.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === "action" ? (
                  <div className="relative flex items-center gap-2">
                    {user && role === "admin" ? (
                      <>
                        <Link to={`/detail/${item.id}`}>
                          <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <EyeIcon />
                            </span>
                          </Tooltip>
                        </Link>
                        <Link to={`/edit/${item.id}`}>
                          <Tooltip content="Ubah barang">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                              <EditIcon />
                            </span>
                          </Tooltip>
                        </Link>
                        <Tooltip color="danger" content="Hapus barang">
                          <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => deleteBarangById(item.id)}
                          >
                            <DeleteIcon />
                          </span>
                        </Tooltip>
                      </>
                    ) : (
                      <Link to={`/detail/${item.id}`}>
                        <Button color="primary" onPress={onchange}>
                          Detail barang
                        </Button>
                      </Link>
                    )}
                  </div>
                ) : columnKey === "nama_barang" ? (
                  truncateText(getKeyValue(item, columnKey), 10)
                ) : columnKey === "harga" ? (
                  formatRupiah(getKeyValue(item, columnKey))
                ) : columnKey === "jenis_barang" ? (
                  <span className="capitalize">
                    {getKeyValue(item, columnKey)}
                  </span>
                ) : columnKey === "deskripsi" ? (
                  truncateText(getKeyValue(item, columnKey), 10)
                ) : columnKey === "foto_barang" ? (
                  <img
                    className="w-8"
                    src={getKeyValue(item, columnKey)}
                    alt={getKeyValue(item, "nama_barang")}
                  />
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
