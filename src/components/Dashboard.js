import { useAuth } from '../context/UserContext';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import Todos from './Todos';
import AddTodo from './AddTodo';
import '../styles/Dashboard.css';
import SideNav from './SideNav';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [todos, setTodos] = useState([]);
  const [checkedTodos, setCheckedTodos] = useState([]);
  const todoCollectionRef = collection(db, "todos");

  const getTodos = async () => {
    const q = query(todoCollectionRef, where("user", "==", user.uid), orderBy("created_date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _todos = [];
      const _checkedTodos = [];
      querySnapshot.forEach((doc) => {
        if(!doc.data().checked){
          _todos.push({ ...doc.data(), id: doc.id });
        }else{
          _checkedTodos.push({ ...doc.data(), id: doc.id });
        }
        
      });
      setTodos(_todos);
      setCheckedTodos(_checkedTodos);
    });
    // const data = await getDocs(q);
    // let todos = [];
    // data.forEach((doc) => {
    //   todos.push({ ...doc.data(), id: doc.id });
    // });
    // setTodos(todos);
    // unsubscribe();
  }

  const deleteTodo = async (id) => {
    const todo = doc(todoCollectionRef, id);
    await deleteDoc(todo);
    // setTodos(todos.filter(todo => todo.id !== id));
  }

  const addTodo = async (todo) => {
    const newTodo = { ...todo, user: user.uid };
    const doc = await addDoc(todoCollectionRef, newTodo);
    const newTodos = [{ ...newTodo, id: doc.id }, ...todos,];
    // setTodos(newTodos);
  }

  const checkTodo = async (_todo) => {
    const todo = doc(todoCollectionRef, _todo.id);
    const checked = _todo.checked;
    const newFields = { "checked": !checked };
    await updateDoc(todo, newFields);
    // setTodos(todos.map(todo => todo.id === id ? { ...todo, ...newFields } : todo));
  }

  useEffect(() => {
    getTodos();
  }, []);

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  }

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  }

  return <div>
    <SideNav closeNav={closeNav} />
    <h1>Welcome {user.displayName}</h1>
    <span onClick={openNav}>open</span>
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

    <div id="main">
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} deleteTodo={deleteTodo} checkTodo={checkTodo} />
      <Todos todos={checkedTodos} deleteTodo={deleteTodo} checkTodo={checkTodo} />
    </div>
  </div>;
};

export default Dashboard;
