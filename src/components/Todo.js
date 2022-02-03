import Button from 'react-bootstrap/Button';
import { RiDeleteBinLine } from 'react-icons/ri';

const Todo = ({ todo, deleteTodo, checkTodo }) => {
    const handleDelete = (id) => {
        let message = "Are you sure you want to delete this task?";
        if (window.confirm(message)) {
            deleteTodo(id);
        }
    }
    return <>
        <div style={{padding:"2px"}}>
            <input type={todo.checked ? "checkbox" : "checkbox"} checked={todo.checked} onChange={() => {checkTodo(todo.id)}}></input>
            <span> {todo.value} </span>
            <RiDeleteBinLine style={{color:"red"}} onClick={() => handleDelete(todo.id)} />
        </div>
    </>
};

export default Todo;
