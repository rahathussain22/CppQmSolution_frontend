import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { navItems } from "../constants/constants";

function NavItem({ item, isActive, level = 0, openPath, setOpenPath, close, ancestors }) {
  const [submenuPosition, setSubmenuPosition] = useState("right"); // for submenus
  const [topPosition, setTopPosition] = useState("left-0"); // for top-level
  const containerRef = useRef(null);

  const hasChildren = item.children && item.children.length > 0;
  const currentPath = [...ancestors, item.pathname];
  const isOpen = openPath.join(",").startsWith(currentPath.join(","));

  const handleMouseEnter = () => {
    if (hasChildren) setOpenPath(currentPath);

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (level === 0) {
        // top-level menu: adjust left/right to avoid overflow
        if (rect.left + 200 > viewportWidth) {
          setTopPosition("right-0");
        } else {
          setTopPosition("left-0");
        }
      } else {
        // submenus: adjust left/right
        if (rect.right + 200 > viewportWidth) {
          setSubmenuPosition("left");
        } else {
          setSubmenuPosition("right");
        }
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [close]);

  const dropdownClasses =
    level === 0
      ? `absolute top-full ${topPosition} mt-1 min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50`
      : `absolute top-0 ${submenuPosition === "right" ? "left-full ml-1" : "right-full mr-1"
      } mt-0 min-w-[200px] bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50`;

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
    >
      <Link
        to={item.pathname}
        className={`flex items-center gap-1 px-4 rounded text-sm transition-colors whitespace-nowrap h-10
          ${isActive(item.pathname) ? "bg-white/30 text-gray-900 font-bold" : ""}
          ${isOpen ? "bg-gray-200 font-bold" : "text-gray-900 hover:bg-gray-200 hover:font-bold"}
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

  const [openPath, setOpenPath] = useState([]); // track open path

  const handleOpen = (levelPath) => {
    setOpenPath(levelPath);
  };

  const handleClose = () => {
    setOpenPath([]);
  };

  return (
    <nav className="bg-linear-to-b from-cyan-400 to-cyan-500 border-b-2 border-cyan-600 shadow-md px-2 py-1">
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
            ancestors={[]} // track parent path
          />
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
