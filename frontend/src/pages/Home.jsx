import { useEffect } from "react";
import BarChart from "../components/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, selectFilteredData } from "../features/data/dataSlice"; // Adjust the path as necessary
import FiltersPanel from "../components/FiltersPanel";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.data);
  const data = useSelector(selectFilteredData);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className="container-fluid px-lg-5 py-4">
      <FiltersPanel />
      {status === "loading" && <LoadingSpinner />}
      {status === "error" && <p>Error: {error}</p>}
      <BarChart data={data} />
    </div>
  );
};

export default Home;
