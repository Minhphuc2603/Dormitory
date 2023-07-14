import { useEffect, useState } from "react";

import { Col, Row, Table,} from 'react-bootstrap';
import { Pagination } from "antd"
import TemplateUser from "../template/TemplateUser";

const ResidentHistory = () => {

    const id = sessionStorage.getItem("id")
    
    const [resident, setResident] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [user,setUser] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9999/user/${id}`)
            .then(resp => resp.json())
            .then(data => {
                setUser(data);
                console.log(data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [id]);


    // Tính toán số trang
    const totalPages = Math.ceil(resident.length / usersPerPage);

    // Lấy index bắt đầu và kết thúc của list user hiện tại
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentBed = resident.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {
        fetch(`http://localhost:9999/residentHistory`)
            .then(resp => resp.json())
            .then(data => {
                setResident(data);
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

                                                <td>{
                                                
                                                    user.StudentID === b.StudentID ? user.name : ""
                                               
                                                }</td>
                                                <td>{b.domID}&ensp;-&ensp;{b.slot}</td>
                                                <td>{b.totalBed}</td>
                                                <td>{b.usedBed}</td>
                                                <td>{b.freeBed}</td>
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