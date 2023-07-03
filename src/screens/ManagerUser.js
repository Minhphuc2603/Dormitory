// import { useState } from "react";
// import TemplateUser from "../template/TemplateUser";
// import { Col, Row, Table } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const ManagerUser = () => {
//     const [users, setUsers] = useState([])
//     useEffect(() => {
//     fetch('http://localhost:9999/user')
//         .then(resp => resp.json())
//         .then(data => {
//             setUsers(data);
//         })
//         .catch(err => {
//             console.log(err.message);
//         })
// }, []);
// return (
//     <TemplateUser>
//         <Row >
//             <Col xs={12}>
//                 <Row>
//                     <Col style={{ textAlign: 'center' }}>
//                         <h2>List of product</h2>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col style={{ textAlign: 'right' }}>
//                         <Link to={'/product/add'}>Create new Product</Link>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                         <Table>
//                             <thead>
//                                 <tr>
//                                     <th>Id</th>
//                                     <th>Name</th>
//                                     <th>Email</th>
//                                     <th>Phone</th>
//                                     <th>Address</th>
//                                     <th>Gender</th>

//                                     <th colSpan={2}>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {
//                                     product.map(p => (
//                                         <tr key={p.id}>
//                                             <td>{p.id}</td>
//                                             <td>
//                                                 {
//                                                     <Link to={`/product/details/` + p.id}>{p.name}</Link>
//                                                 }
//                                             </td>
//                                             <td>{p.price}</td>
//                                             <td>{p.quantity}</td>
//                                             <td>
//                                                 {
//                                                     suppliers.map(s => s.id === p.supplier ? s.name : '')
//                                                 }
//                                             </td>
//                                             <td>
//                                                 {
//                                                     categories.map(c => c.id === p.category ? c.name : '')
//                                                 }
//                                             </td>
//                                             <td>
//                                                 {
//                                                     p.discontined ? 'Yes' : 'No'
//                                                 }
//                                             </td>
//                                             <td>
//                                                 {
//                                                     <Link to={'/product/edit/' + p.id}>Edit</Link>
//                                                 }
//                                             </td>
//                                             <td>
//                                                 {
//                                                     <Link to={'/'} >Delete</Link>
//                                                 }
//                                             </td>

//                                         </tr>

//                                     ))
//                                 }
//                             </tbody>
//                         </Table>
//                     </Col>
//                 </Row>
//             </Col>
//         </Row>

//     </TemplateUser>
// );
// }

// export default ManagerUser;