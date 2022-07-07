import React from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Table,
} from "react-bootstrap";
import {
  GraphUpArrow,
  ListUl,
  PersonPlusFill,
  Trash,
} from "react-bootstrap-icons";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetAllAdminQuery,
  useDeleteAdminUserMutation,
} from "../services/appApi";
import { useSelector } from "react-redux";
import PageNotFound from "./PageNotFound";
function AdminDashboard() {
  const { user } = useSelector((state) => state.user);
  const { data, isLoading, isError } = useGetAllAdminQuery();
  const [deleteAdmin, { }] = useDeleteAdminUserMutation();
  if (!user) {
    return <PageNotFound />;
  }
  if (user && user.role !== "admin") {
    return <PageNotFound />;
  }
  if (isLoading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading....</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" variant="primary" />
        <h5 className="mt-2">Loading...</h5>
      </div>
    );
  }
  async function deleteAdminUser(email) {
    if (user.email === email) {
      toast.info("Cann't be deleted");
      return;
    }
    try {
      const res = await deleteAdmin(email);
      console.log(res);
      if (res.data.acknowledged === true) {
        setTimeout(() => window.location.reload(), 2000);
        toast.success("Successfully Deleted");
      }
    } catch (e) {
      console.log(e);
    }
  }
  const DisplayData = data.map((info) => {
    return (
      <tr key={info.email}>
        <td>{info.firstname}</td>
        <td>{info.lastname}</td>
        <td>{info.email}</td>
        <td>
          <Button
            id={info.email}
            variant="outline-danger"
            onClick={() => deleteAdminUser(info.email)}
          >
            <Trash />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <ToastContainer />
      <Container>
        <div>
          <Card
            bg="light"
            key="Light"
            text="dark"
            style={{ width: "25rem" }}
            className="mt-2 mb-4"
            border="primary"
          >
            <Card.Header style={{ fontSize: "25px" }}>
              <span>{user.firstname}</span> <span>{user.lastname}</span>
            </Card.Header>
            <Card.Body>
              <i className="bi bi-person-plus-fill"></i>
              <Card.Title>{user.email}</Card.Title>
              <Card.Text>{user.mobile}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Container>
            <Row>
              <Col className="pl-0">
                <Card border="light" style={{ width: "18rem" }}>
                  <Card.Header>Add New Admin</Card.Header>
                  <Card.Body>
                    <Card.Text>Create new admin.</Card.Text>
                    <LinkContainer to="/register">
                      <Button>
                        <PersonPlusFill className="mb-1" /> Click here
                      </Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="pl-0">
                <Card border="light" style={{ width: "18rem" }}>
                  <Card.Header>Application Form</Card.Header>
                  <Card.Body>
                    <Card.Text>Enter deceased person details here.</Card.Text>
                    <LinkContainer to="/form">
                      <Button>
                        <ListUl className="mb-1" /> Click here
                      </Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              </Col>
              <Col className="pl-0">
                <Card border="light" style={{ width: "18rem" }}>
                  <Card.Header>Data Analysis</Card.Header>
                  <Card.Body>
                    <Card.Text>Goto Data analysis page.</Card.Text>
                    <LinkContainer to="/dataanalytics">
                      <Button>
                        <GraphUpArrow className="mb-1" /> Click here
                      </Button>
                    </LinkContainer>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <Container>
            <Table striped bordered hover className="mt-2 mb-4 text-center">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Id</th>
                  <th>Remove as Admin</th>
                </tr>
              </thead>
              <tbody>{DisplayData}</tbody>
            </Table>
          </Container>
        </div>
      </Container>
    </div>
  );
}
export default AdminDashboard;
