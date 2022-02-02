import Todo from './Todo';

const Todos = ({ todos, deleteTodo }) => {
    return <>
        {todos.map(todo => <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo}/>)}
    </>;
};

export default Todos;
