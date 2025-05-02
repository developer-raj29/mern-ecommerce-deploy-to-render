import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UnauthPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Access Denied 🚫
        </h1>
        <p className="text-gray-600 mb-6">
          You don&apos;t have permission to view this page. Please login with an
          authorized account.
        </p>
        <Button onClick={() => navigate("/")}>Go to Home</Button>
      </div>
    </div>
  );
};

export default UnauthPage;
