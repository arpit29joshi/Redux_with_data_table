import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, updateItem } from "../redux/ReduxTable";
import DetailsModal from "./DetailsModal";

function TableCard({ data }) {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selectedData, setSelectedData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "zipcode" || name === "city") {
      setSelectedData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name]: value,
        },
      }));
    }
    setSelectedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateItem(selectedData));
    // update item
    setShowEdit(false);
    setSelectedData({});
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>City</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address.city}</td>
                <td>{item.address.zipcode}</td>
                <Button
                  className="bl-10"
                  variant="primary"
                  style={{ backgroundColor: "#0d6efd", color: "white" }}
                  onClick={() => {
                    setShowEdit(true);
                    setSelectedData(item);
                  }}
                >
                  Edit
                </Button>
                <Button
                  className="bl-10"
                  variant="danger"
                  style={{ backgroundColor: "#dc3545", color: "white" }}
                  onClick={() => {
                    handleShow();
                    setSelectedData(item);
                  }}
                >
                  Delete
                </Button>
              </tr>
            ))}
        </tbody>
      </Table>
      {/* Delete Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this record?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              setSelectedData("");
            }}
          >
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              dispatch(deleteItem(selectedData.id));
              handleClose();
              setSelectedData({});
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Modal */}

      {/* Edit Modal */}
      <Modal
        show={showEdit}
        onHide={() => {
          setShowEdit(false);
          selectedData({});
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={selectedData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                name="phone"
                value={selectedData.phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={selectedData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                name="city"
                value={selectedData?.address?.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formZipcode">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter zipcode"
                name="zipcode"
                value={selectedData?.address?.zipcode}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowEdit(false);
                  setSelectedData({});
                }}
              >
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default TableCard;
