import { useEffect, useState } from "react";

import { Col, Row, Table,} from 'react-bootstrap';
import { Pagination } from "antd"
import TemplateUser from "../template/TemplateUser";
import { useNavigate } from "react-router-dom";

const ListRoom = () => {

    const [bed, setBed] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);


    // Tính toán số trang
    const totalPages = Math.ceil(bed.length / usersPerPage);
    const navigate = useNavigate()
    useEffect(() => {
      const role = sessionStorage.getItem('userrole');
      const id = sessionStorage.getItem('id');
      if (role == "admin" || id === null) {
        navigate("/error");
      }
    }, []);

    // Lấy index bắt đầu và kết thúc của list user hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentBed = bed.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {
        fetch('http://localhost:9999/doms')
            .then(resp => resp.json())
            .then(data => {
                setBed(data);
                console.log(data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, []);

    return (
        <TemplateUser>
            <Row >
                <Col xs={12}>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <h2>List Room</h2>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Table className="box-shadow 2px ">
                                <thead>
                                    <tr>

                                        <th>Dom Name</th>
                                        <th>Dom ID</th>
                                        <th>Total Bed</th>
                                        <th>Used Bed</th>
                                        <th>Free Bed</th>



                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentBed.map(b => (
                                            <tr key={b.id}>

                                                <td>{b.domName}</td>
                                                <td>{b.domID}&ensp;-&ensp;{b.slot}</td>
                                                <td>{b.totalBed}</td>
                                                <td>{b.usedBed}</td>
                                                <td>{b.freeBed}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td colSpan="2">Total</td>
                                        <td>
                                            {
                                                currentBed.reduce((total, b) => total + b.totalBed, 0)
                                            }
                                        </td>
                                        <td>
                                            {
                                                currentBed.reduce((total, b) => total + b.usedBed, 0)
                                            }
                                        </td>
                                        <td>
                                            {
                                                currentBed.reduce((total, b) => total + b.freeBed, 0)
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Pagination
                                current={currentPage}
                                total={bed.length}
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

export default ListRoom;