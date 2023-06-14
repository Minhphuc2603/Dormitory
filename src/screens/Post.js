import { Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";

import TemplateHome from "../template/TemplateHome";

export default function PostManageMent() {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [userId, setUserId] = useState("all");

    useEffect(() => {
        fetch("http://localhost:9999/users")
            .then((res) => res.json())
            .then((result) => {
                setUser(result);
            });
    }, []);
    useEffect(() => {
        fetch("http://localhost:9999/posts")
            .then((res) => res.json())
            .then((result) => {
                if (userId === "all") setPost(result);
                else setPost(result.filter((p) => p.userId === userId));
            });
    }, [userId]);
    return (
        <TemplateHome>
            <div className="container-fluid">
                <Container>

                    <h1>Post ManageMent</h1>
                    <Row>
                        <Col>
                            <select onChange={(e) => setUserId(e.target.value)}>
                                <option value="all">--Choose the user to filter--</option>
                                {
                                    user.map((u) => (
                                        <option key={u.id} value={u.id}>{u.username}</option>
                                    ))
                                }
                            </select>
                            <Table>
                                <thead>
                                    <tr>
                                        <td>Id</td>
                                        <td>Title</td>
                                        <td>UserName</td>
                                        <td>Body</td>
                                    </tr>
                                </thead>
                                {
                                    post.map((p) => (
                                        <tr>
                                            <td>{p.id}</td>
                                            <td>{p.title}</td>
                                            <td>{p.username}</td>
                                            <td>{p.body}</td>
                                        </tr>
                                    ))
                                }
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>

        </TemplateHome>
    );
}