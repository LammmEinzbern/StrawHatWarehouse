import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Button,
} from "@nextui-org/react";
import { useAuth } from "../../auth/AuthProvider";
import { supabase } from "../../utils/SupaClient";
import { Link, useNavigate } from "react-router-dom";

export default function DropdownUser() {
  const { username } = useAuth();
  const { email } = useAuth();
  const { avatar } = useAuth();
  const { fullName } = useAuth();

  const navigate = useNavigate();
  const handleLogout = async () => {
    const { dataeh } = await supabase.auth.signOut();

    if (dataeh) {
      alert("anda gagal logut");
    } else {
      alert("anda berhasil logut");
      window.location.reload();
    }
  };

  const { user, role } = useAuth();
  return (
    <div className="flex items-center gap-4">
      {user && role === "admin" ? (
        <>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: `${avatar}`,
                }}
                className="transition-transform"
                description={email}
                name={username}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Signed in as</p>
                <p className="font-bold">{fullName}</p>
                <p className="font-bold">@ {username}</p>
              </DropdownItem>
              <DropdownItem>
                <Link to={"/profile-user"}>Profile</Link>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
