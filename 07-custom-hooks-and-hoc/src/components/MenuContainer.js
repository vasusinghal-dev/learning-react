import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import ShimmerUI from "./ShimmerUI.js";
import MenuUI from "./MenuUI.js";
import useFetch from "../utility/useFetch.js";

const MenuContainer = () => {
  const { resId } = useParams();
  const navigate = useNavigate();

  const [menu, loading] = useFetch(
    `http://localhost:5000/api/restaurant/menu/${resId}`,
  );

  // Handle redirect on error or empty data
  useEffect(() => {
    if (!loading && !menu) {
      navigate("/error");
    }
  }, [menu, loading, navigate]);

  return (
    <>
      {loading ? (
        <div className="mx-[400px]">
          <ShimmerUI />
        </div>
      ) : (
        menu && <MenuUI menu={menu} />
      )}
    </>
  );
};

export default MenuContainer;
