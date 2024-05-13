import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";
import { fetchData } from "./redux/ReduxTable";
import TableCard from "./component/TableCard.jsx";
import Loader from "./component/Loader.jsx";
import DetailsModal from "./component/DetailsModal.jsx";
import { Button } from "react-bootstrap";

function App() {
  const { isLoading, isError, data } = useSelector((state) => state.table);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <TableCard data={data} />
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New Item
      </Button>
      <DetailsModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}

export default App;
