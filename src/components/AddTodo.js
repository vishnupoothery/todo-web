import { useState } from "react";

const AddTodo = ({addTodo}) => {
    const [value, setValue] = useState('');
    const handleOnClick = () => {
        const todo = {
            "value": value,
            "created_date": new Date(),
            "checked": false
        }
        addTodo(todo);
        setValue('')
    }

    return <div>
        <input value={value} placeholder="Enter task" onChange={(event) => setValue(event.target.value)}></input>
        <button onClick={handleOnClick}> Add task </button>
    </div>;
};

export default AddTodo;
