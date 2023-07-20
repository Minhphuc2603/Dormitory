import { Button, Col, Row, Table, } from 'react-bootstrap';

import { useEffect, useState } from 'react';


import TemplateUser from '../template/TemplateUser';
const PaymentHistory = () => {
    const [payment, setPayment] = useState([])
    const id = parseInt(sessionStorage.getItem('id'))
    

    useEffect(() => {
        fetch('http://localhost:9999/payment/')
            .then(resp => resp.json())
            .then(data => {
                const filteredPayment = data.filter(p => p.userid === id) 
                
                setPayment(filteredPayment)
                
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
                            <h2>List Payment History</h2>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Table className="box-shadow 2px ">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Deposit Amount</th>
                                        <th>status</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payment.map(p => (
                                            <tr key={p.id}>
                                                <td>{p.name}</td>
                                                <td>{p.pdate}</td>
                                                <td>{p.pcost}</td>
                                                <td>{p.status === 0 ?
                                                    <span style={{color:'orange'}}>Pending</span> :
                                                    p.status === 1 ?
                                                        <span style={{color:'green'}}>Done</span> :
                                                        p.status === 2 ?
                                                            <span style={{color:'red'}}>Reject</span> :
                                                            <span></span>}</td>
                                               

                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </Table>

                        </Col>
                    </Row>
                </Col>
            </Row>

        </TemplateUser>
    );
}

export default PaymentHistory;
