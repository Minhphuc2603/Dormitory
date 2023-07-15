import { useEffect, useState } from "react";

import { Col, Row, Table,} from 'react-bootstrap';
import { Pagination } from "antd"
import TemplateUser from "../template/TemplateUser";

const ResidentHistory = () => {

    const id = sessionStorage.getItem("id")
    console.log(id)
    
    const [resident, setResident] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [user,setUser] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9999/user/${id}`)
            .then(resp => resp.json())
            .then(data => {
                setUser([data.StudentID]);
                
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [id]);
 console.log(user)

    // Tính toán số trang
    const totalPages = Math.ceil(resident.length / usersPerPage);

    // Lấy index bắt đầu và kết thúc của list user hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentResident = resident.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {
        
        fetch(`http://localhost:9999/residentHistory?StudentID=${user[0]}`)
          .then(resp => resp.json())
          .then(data => {
            setResident(data);
            console.log(data);
          })
          .catch(err => {
            console.log(err.message);
          });
      }, [user]);
      

    return (
        <TemplateUser>
            <Row >
                <Col xs={12}>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <h2>Resident History</h2>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Table className="box-shadow 2px ">
                                <thead>
                                    <tr>

                                        <th>StudentID</th>
                                        <th>Information</th>
                                        <th>Checkin</th>
                                        <th>Checkout</th>
                                        <th>Price</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentResident.map(r => (
                                            <tr key={r.id}>

                                                <td>{r.StudentID}</td>
                                                <td>{r.Information}</td>
                                                <td>{r.CheckIn}</td>
                                                <td>{r.CheckOut}</td>
                                                <td>{r.Price}</td>
                                            </tr>
                                        ))
                                    }
                                    
                                </tbody>
                            </Table>
                            <Pagination
                                current={currentPage}
                                total={resident.length}
                                pageSize={usersPerPage}
                                onChange={paginate}

                                style={{ marginTop: "16px", textAlign: "center" }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>

        </TemplateUser>
    );
}

export default ResidentHistory;