import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { navItems } from "../constants/constants";
import Alert from "@mui/material/Alert";

function NavItem({ item, isActive, level = 0, openPath, setOpenPath, close, ancestors }) {
  const [submenuPosition, setSubmenuPosition] = useState("right");
  const [topPosition, setTopPosition] = useState("left-0");
  const containerRef = useRef(null);

  const hasChildren = item.children && item.children.length > 0;
  const currentPath = [...ancestors, item.pathname];
  const isOpen = openPath.join(",").startsWith(currentPath.join(","));

  const fullPath = item.pathname.startsWith("/")
    ? item.pathname
    : [...ancestors, item.pathname].join("/").replace(/\/\/+/g, "/");

  const handleMouseEnter = () => {
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
          ${isActive(item.pathname) ? "bg-white/30 text-gray-900 font-bold" : ""}
          ${isOpen ? "bg-gray-200 font-bold" : "text-gray-900 hover:bg-gray-200 hover:font-bold"}
        `}
      >
        {item.label}
        {hasChildren && <ChevronDown className="h-4 w-4" />}
      </Link>

      {hasChildren && isOpen && (
        <div
          className={dropdownClasses}>
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

  const [openPath, setOpenPath] = useState([]); // track open path
  const navRef = useRef(null); // ADD THIS

  const handleOpen = (levelPath) => {
    setOpenPath(levelPath);
  };

  const handleClose = () => {
    setOpenPath([]);
  };

  // ➤ Close dropdown when clicking outside the navbar
  useEffect(() => {
    function handleClickOutside(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        handleClose(); // close all dropdowns
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      ref={navRef}  // ATTACH REF HERE
      className="bg-linear-to-b from-cyan-400 to-cyan-500 border-b-2 border-cyan-600 shadow-md px-2 py-1"
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
      </div>
    </nav>
  );
}


export default NavBar;
