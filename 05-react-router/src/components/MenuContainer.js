import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ShimmerUI from "./ShimmerUI.js";
import MenuUI from "./MenuUI.js";

function RestaurantContainer() {
  const { resId } = useParams();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/restaurant/menu/${resId}`
        );
        if (!res.ok) throw new Error("Redirecting to error");
        const data = await res.json();
        setMenu(data);
      } catch (err) {
        navigate("/error");
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [resId, navigate]);

  return (
    <>
      {loading ? (
        <div style={{ margin: "0px 400px" }}>
          <ShimmerUI />
        </div>
      ) : menu ? (
        <MenuUI menu={menu} />
      ) : null}
    </>
  );
}

export default RestaurantContainer;
