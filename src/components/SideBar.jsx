import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

const SideBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const { role } = useAuth();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden p-4 text-white bg-cyan-950 dark:bg-slate-900"
        onClick={handleToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div className="flex">
        <aside
          className={`fixed top-0 left-0 h-full bg-cyan-950 dark:bg-gray-800 text-white  min-h-screen transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:block md:w-1/5 w-full z-20`}
        >
          <div className="h-20 shadow-lg flex justify-center items-center">
            <h2 className="flex items-center text-3xl font-bold gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 48 48"
              >
                <g fill="none" stroke="#fff" strokeWidth="4">
                  <path d="M34 22C34 16.4772 29.5228 12 24 12C18.4772 12 14 16.4772 14 22" />
                  <path d="M14 23C8.02199 24.2044 4 26.4557 4 29.034C4 32.8812 12.9543 36 24 36C35.0457 36 44 32.8812 44 29.034C44 26.4557 39.978 24.2044 34 23" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 22C15 22.8333 18 26 24 26C30 26 33 23 34 22"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 25L21 20"
                  />
                </g>
              </svg>
              <p className="text-xl">Straw Hat Warehouse</p>
            </h2>
          </div>

          <nav className="flex justify-center pt-10">
            <ul className="flex flex-col gap-8">
              <li>
                <LinkSidebar link={"/"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21.185 8.025c1.064.192 1.933.34 2.132.79c.223.51-.936.541-1.52.552c-2.8.054-4.487.11-4.572 1.061c-.11 1.224 1.196 2.458 2.486 4.186c1.178 1.577 2.518 3.135 2.133 4.586c-.482 1.809-2.7 2.192-4.81 2.192c-2.022 0-3.939-.323-4.744-.482c-1.002-.2-.852-.694-.585-.853c.298-.178 2.002-.182 3.187-.252c.975-.058 3.805-.056 4.246-.781c.54-.89-.783-2.408-2-4c-1.519-1.984-3.186-4.034-2.303-5.533c1.14-1.936 4.484-1.803 6.35-1.466m-13.69 2.95c1.772-.104 3.926.206 5.134 1.13a2.172 2.172 0 0 1 .78 2.278c-.698 2.752-3.304 6.083-9.093 8.643c-1.841.813-3.29 1.125-3.593.906c-.326-.234.624-2.052.909-2.654c.925-1.952 2.079-3.853 3.205-5.595c.414-.64 1.055-1.752 1.634-1.662c.519.08-.09 1.26-.488 2.01c-.672 1.26-2.523 4.76-1.912 4.97c1.35.462 7.68-4.354 6.746-7.036c-.432-1.245-3.18-1.363-4.912-1.363c-.787 0-2.508.186-2.603-.417c-.102-.556 2.613-1.116 4.192-1.21M11.867.013c2.068-.098 4.514.342 4.97 1.802c.747 2.39-3.04 5.877-6.338 7.587c-.809.42-1.3.536-1.504.507c-.195-.027-.225-.22-.162-.355c.118-.252.65-.764 1.361-1.322c3.715-2.9 4.923-5.028 4.221-5.89c-.45-.552-2.332-.937-4.287-.937c-.53 0-1.925.123-2.068-.367C7.942.634 9.814.108 11.866.012"
                    />
                  </svg>
                  Dashboard
                </LinkSidebar>
              </li>
              <li>
                <LinkSidebar link={"/tabel"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <rect width="10" height="14" x="3" y="8" rx="2" />
                      <path d="M5 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-2.4M8 18h.01" />
                    </g>
                  </svg>
                  Tabel Barang
                </LinkSidebar>
              </li>

              <li>
                <LinkSidebar link={"/all-barang"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.806 3.845h2.563v5.126H7.806zm-1.531 1.65a2.142 2.142 0 0 0-.397-.239a1.137 1.137 0 0 0-.463-.084c-.167 0-.298.034-.391.102a.325.325 0 0 0-.141.28c0 .092.045.168.135.227c.089.06.202.117.337.17c.135.054.282.11.439.168c.157.057.304.128.439.212c.135.083.248.186.337.307c.09.121.135.274.135.457c0 .255-.091.471-.272.648s-.435.289-.761.337v.878h-.478v-.866a2.113 2.113 0 0 1-.615-.158a2.066 2.066 0 0 1-.526-.314l.311-.471c.171.115.344.209.519.28a1.5 1.5 0 0 0 .574.108c.191 0 .335-.036.433-.108a.338.338 0 0 0 .146-.286a.31.31 0 0 0-.135-.257c-.089-.068-.202-.13-.337-.188s-.281-.116-.436-.173a2.55 2.55 0 0 1-.436-.212a1.243 1.243 0 0 1-.337-.302a.71.71 0 0 1-.134-.445c0-.258.087-.469.262-.633c.176-.163.412-.264.711-.304v-.782h.478v.776c.211.024.391.078.54.161c.149.084.286.187.409.311zM4.11 3.053c-.456.244-.813.601-1.057 1.057s-.373.908-.373 2.154v11.472c0 1.246.129 1.698.373 2.154s.601.813 1.057 1.057s.908.373 2.154.373h11.472c1.246 0 1.698-.129 2.154-.373s.813-.601 1.057-1.057s.373-.908.373-2.154V6.264c0-1.246-.129-1.698-.373-2.154s-.601-.813-1.057-1.057s-.908-.373-2.154-.373H6.264c-1.246 0-1.698.129-2.154.373zM6.309.932h11.382c1.87 0 2.548.195 3.231.56c.684.366 1.22.902 1.586 1.586c.365.683.56 1.361.56 3.231v11.382c0 1.87-.195 2.548-.56 3.231a3.813 3.813 0 0 1-1.586 1.586c-.683.365-1.361.56-3.231.56H6.309c-1.87 0-2.548-.195-3.231-.56a3.813 3.813 0 0 1-1.586-1.586c-.365-.683-.56-1.361-.56-3.231V6.309c0-1.87.195-2.548.56-3.231a3.813 3.813 0 0 1 1.586-1.586c.683-.365 1.361-.56 3.231-.56zM2.742.716A4.862 4.862 0 0 0 .716 2.742C.249 3.615 0 4.481 0 6.87v10.26c0 2.389.249 3.255.716 4.128a4.862 4.862 0 0 0 2.026 2.026c.873.467 1.739.716 4.128.716h10.26c2.389 0 3.255-.249 4.128-.716a4.862 4.862 0 0 0 2.026-2.026c.467-.873.716-1.739.716-4.128V6.87c0-2.389-.249-3.255-.716-4.128A4.862 4.862 0 0 0 21.258.716C20.385.249 19.519 0 17.13 0H6.87C4.481 0 3.615.249 2.742.716z"
                    />
                  </svg>
                  Semua Barang
                </LinkSidebar>
              </li>
              <li>
                <LinkSidebar link={"/data-supplier"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M26 30h-2v-5a5.006 5.006 0 0 0-5-5h-6a5.006 5.006 0 0 0-5 5v5H6v-5a7.008 7.008 0 0 1 7-7h6a7.008 7.008 0 0 1 7 7v5zM22 6v4c0 1.103-.897 2-2 2h-1a1 1 0 0 0 0 2h1c2.206 0 4-1.794 4-4V6h-2zm-6 10c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.988 0 3.89.85 5.217 2.333l-1.49 1.334A5.008 5.008 0 0 0 16 4c-2.757 0-5 2.243-5 5s2.243 5 5 5v2z"
                    />
                  </svg>
                  Supplier
                </LinkSidebar>
              </li>
            </ul>
          </nav>
        </aside>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={handleToggle}
        />
      )}
    </>
  );
};

const LinkSidebar = ({ link, children }) => {
  const location = useLocation();
  return (
    <Link
      to={link}
      className={`${
        location.pathname === `${link}`
          ? `text-cyan-300 dark:text-gray-500`
          : `text-white`
      } flex items-center gap-2 text-lg`}
    >
      {children}
    </Link>
  );
};

export default SideBar;
