import Todo from './Todo';

const Todos = ({title, todos, deleteTodo, checkTodo }) => {
    return <>
        <h2>{title?title:''}</h2>
        {todos.map(todo => <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} checkTodo={checkTodo}/>)}
    </>;
};

export default Todos;
