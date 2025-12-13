import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { navItems } from "@/constants/constants.js";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { LogOut } from "lucide-react";
function NavItem({
  item,
  isActive,
  level = 0,
  openPath,
  setOpenPath,
  close,
  ancestors,
}) {
  const [submenuPosition, setSubmenuPosition] = useState("right");
  const [topPosition, setTopPosition] = useState("left-0");
  const containerRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const hasChildren = item.children && item.children.length > 0;
  const currentPath = [...ancestors, item.pathname];
  const isOpen = openPath.join(",").startsWith(currentPath.join(","));

  const fullPath = item.pathname.startsWith("/")
    ? item.pathname
    : [...ancestors, item.pathname].join("/").replace(/\/\/+/g, "/");

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (hasChildren) setOpenPath(currentPath);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (level === 0) {
        setTopPosition(rect.left + 200 > viewportWidth ? "right-0" : "left-0");
      } else {
        setSubmenuPosition(rect.right + 200 > viewportWidth ? "left" : "right");
      }
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const dropdownClasses =
    level === 0
      ? `absolute top-full ${topPosition} mt-1 min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-40`
      : `absolute top-0 ${submenuPosition === "right"
        ? "left-full ml-1 mt-9"
        : "right-full mr-1 mt-5"
      } min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-40`;

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
    >
      <Link
        to={fullPath}
        className={`relative z-20 flex items-center gap-1 px-4 rounded text-sm whitespace-nowrap h-10
          ${isActive(item.pathname)
            ? level === 0
              ? "bg-red-700 text-white font-bold"
              : "bg-red-100 text-red-700 font-bold"
            : ""
          }
          ${isOpen && level === 0
            ? "bg-red-700 text-white font-bold"
            : isOpen && level > 0
              ? "bg-red-100 text-red-700 font-bold"
              : level === 0
                ? "text-white hover:bg-red-700 hover:font-bold"
                : "text-gray-900 hover:bg-red-100 hover:text-red-700 hover:font-bold"
          }
        `}
      >
        {item.label}
        {hasChildren && <ChevronDown className="h-4 w-4" />}
      </Link>

      {hasChildren && isOpen && (
        <div className={dropdownClasses}>
          {item.children.map((child) => (
            <NavItem
              key={child.pathname}
              item={child}
              isActive={isActive}
              level={level + 1}
              openPath={openPath}
              setOpenPath={setOpenPath}
              close={close}
              ancestors={currentPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function NavBar() {
  const location = useLocation();
  const isActive = (pathname) => location.pathname.startsWith(pathname);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const [openPath, setOpenPath] = useState([]);
  const navRef = useRef(null);

  const handleOpen = (levelPath) => {
    setOpenPath(levelPath);
  };

  const handleClose = () => {
    setOpenPath([]);
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      ref={navRef}
      className="bg-linear-to-b from-red-500 to-red-600 border-b-2 border-red-700 shadow-md px-2 py-1"
    >
      <div className="flex gap-1 flex-wrap">
        {navItems.map((item) => (
          <NavItem
            key={item.pathname}
            item={item}
            isActive={isActive}
            level={0}
            openPath={openPath}
            setOpenPath={handleOpen}
            close={handleClose}
            ancestors={[]}
          />
        ))}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 h-10 text-sm font-semibold
             text-white bg-red-600 rounded hover:bg-red-700 transition cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
