import { Toaster } from "sonner";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-gray-50 min-h-screen w-full">
      {children}
      <Toaster />
    </div>
  );
};

export default MainLayout;
