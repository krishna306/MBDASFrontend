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
  const [deleteAdmin] = useDeleteAdminUserMutation();
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
        <h5 className="mt-2">Some Error Occured</h5>
      </div>
    );
  }
  async function deleteAdminUser(email) {
    if (user.email === email) {
      toast.info("Can't be deleted");
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
        {info.email !== user.email && (
          <>
            <td>{info.firstname}</td>
            <td>{info.lastname}</td>
            <td>{info.email}</td>
            <td>
              <Button
                id={info.email}
                variant="danger"
                onClick={() => deleteAdminUser(info.email)}
              >
                <Trash /> Delete Admin
              </Button>
            </td>
          </>
        )}
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
                  <LinkContainer to="/register">
                    <Button>
                      <PersonPlusFill className="mb-1" /> Add New Admin
                    </Button>
                  </LinkContainer>
                </Card>
              </Col>
              <Col className="pl-0">
                <Card border="light" style={{ width: "18rem" }}>
                  <LinkContainer to="/form">
                    <Button>
                      <ListUl className="mb-1" /> Enter Deceased Details
                    </Button>
                  </LinkContainer>
                </Card>
              </Col>
              <Col className="pl-0">
                <Card border="light" style={{ width: "18rem" }}>
                  <LinkContainer to="/dataanalytics">
                    <Button>
                      <GraphUpArrow className="mb-1" /> Go To Data Analysis
                    </Button>
                  </LinkContainer>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <h4 className="text-center text-decoration-underline" style={{marginTop:"40px"}}>List of All Admin</h4>
          <Row  className="my-4">
            <Table style={{borderWidth:"4px"}} bordered hover className="text-center">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Id</th>
                </tr>
              </thead>
              <tbody>{DisplayData}</tbody>
            </Table>
          </Row>
        </div>
      </Container>
    </div>
  );
}
export default AdminDashboard;
