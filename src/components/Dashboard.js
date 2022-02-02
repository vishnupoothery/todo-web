import { useAuth } from '../context/UserContext';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import Todos from './Todos';
import AddTodo from './AddTodo';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const todoCollectionRef = collection(db, "todos");

  const getTodos = async () => {
    const q = query(todoCollectionRef, where("user", "==", user.uid),orderBy("created_date", "desc"));
    const data = await getDocs(q);
    let todos = [];
    data.forEach((doc) => {
      todos.push({ ...doc.data(), id: doc.id });
    });
    setTodos(todos);
    console.log(todos)
  }

  const addTodo = async (todo) => {
    const newTodo = { ...todo, user: user.uid };
    const doc = await addDoc(todoCollectionRef, newTodo);
    const newTodos = [...todos, { ...newTodo, id: doc.id }];
    setTodos(newTodos);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return <div>
    <h1>Welcome {user.displayName}</h1>
    <button onClick={logout}>logout</button>
    {/* <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container> */}

    <AddTodo addTodo={addTodo} />
    <Todos todos={todos} />
  </div>;
};

export default Dashboard;
