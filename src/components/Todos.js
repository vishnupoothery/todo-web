import Todo from './Todo';

const Todos = ({ todos, deleteTodo, checkTodo }) => {
    return <>
        {todos.map(todo => <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} checkTodo={checkTodo}/>)}
    </>;
};

export default Todos;
