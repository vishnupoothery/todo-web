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
  const [list, setList] = useState([]);
  const todoCollectionRef = collection(db, "todos");
  const listRef = collection(db, "stdListRef");

  const getTodos = async () => {
    const q = query(todoCollectionRef, where("user", "==", user.uid), orderBy("created_date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const _todos = [];
      const _checkedTodos = [];
      querySnapshot.forEach((doc) => {
        if (!doc.data().checked) {
          _todos.push({ ...doc.data(), id: doc.id });
        } else {
          _checkedTodos.push({ ...doc.data(), id: doc.id });
        }
      });
      setTodos(_todos);
      setCheckedTodos(_checkedTodos);
    });
  }

  const getList = async () => {
    const q = query(listRef, where("activeFlag", "==", true));
    const data = await getDocs(q);
    let list = [];
    data.forEach(doc => {
      list.push({ ...doc.data(), id: doc.id });
    });
    setList(list);
    console.log(list)
  }

  const deleteTodo = async (id) => {
    const todo = doc(todoCollectionRef, id);
    await deleteDoc(todo);
  }

  const addTodo = async (todo) => {
    const newTodo = { ...todo, user: user.uid };
    const doc = await addDoc(todoCollectionRef, newTodo);
    const newTodos = [{ ...newTodo, id: doc.id }, ...todos,];
  }

  const checkTodo = async (_todo) => {
    const todo = doc(todoCollectionRef, _todo.id);
    const checked = _todo.checked;
    const newFields = { "checked": !checked };
    await updateDoc(todo, newFields);
  }

  useEffect(() => {
    getTodos();
    getList();
  }, []);

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  }

  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  }

  return <Container>
    <SideNav closeNav={closeNav} />
    <h1 style={{ textAlign: "center" }}>Welcome {user.displayName}</h1>
    <span className='mobileShow' onClick={openNav}>open</span>
    <div style={{ textAlign: "right" }}>
      <button onClick={logout}>logout</button>
    </div>

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
    <div className="row">
      <div className="col-3">Hello</div>
      <div className="col-sm-12 col-md-9">
        <div id="main">
          <AddTodo addTodo={addTodo} />
          <Todos todos={todos} deleteTodo={deleteTodo} checkTodo={checkTodo} />
          <Todos todos={checkedTodos} deleteTodo={deleteTodo} checkTodo={checkTodo} />
        </div>
      </div>
    </div>


  </Container>;
};

export default Dashboard;
