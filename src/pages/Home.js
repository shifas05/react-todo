import React, {useState, useEffect} from 'react'
import axios from 'axios';

import TodoForm from '../components/TodoForm';
import TodoLimitForm from '../components/TodoLimitForm';

    
const Home = () => {
    //initializing a tododata array
    const [todo, setTodo] = useState([]);  
    const [editiingTodo, setEditingTodo] = useState({
        title : '',
        status_id: '',
        id : null
    });
   
    //this is called array destructuring, access this useState hook and create a state variable 
    //that actually managed by react at back
    //first state variable value todo will be empty array and settodo method helps to change value of todo

    //useEffect
    useEffect(() => {
        axios.get('/get_todo')
            .then(res => {
                console.log(res);
                setTodo(res.data);
            })
            .catch(err => console.error(err));
    }, []); //will reach to our backend and getposts, second arg is dependency , empty [] means only execute once
    
   

    function editTodo(todo_item) {
        setEditingTodo(todo_item);
    }
    function deleteTodo(todo_item) {
        let todoData = {id : todo_item};
        axios.post('/delete_todo', todoData)
        .then(() => {
            const todoUpdated = todo.filter(t => t.id !== todo_item);
            setTodo(todoUpdated);
        })
        .catch(err => console.error(err));
    }

    function addTodo(todo_item) {
        if(todo.find(td => td.id === todo_item.id)){
            const index = todo.findIndex(td => td.id === todo_item.id);
            const todoUpdated = [...todo];
            todoUpdated.splice(index, 1, todo_item); // removed the todo with updated one
            setTodo(todoUpdated);
        }else {
            const todoUpdated = [todo_item, ...todo];
            setTodo(todoUpdated);
        }
    }
    function getTodo(data) {
        setTodo(data);
    }

    return (
        <div className="container">
            <h2>Home</h2>
            <div className="row">
                <div className="col-md-6">
                    <TodoForm addTodo={addTodo} editTodo={editiingTodo} />
                </div>
                <div className="col-md-6">
                    <TodoLimitForm getTodo={getTodo}/>
                </div>
            </div>
            <div className="row">
            {todo.map((todo_item) => {
                return <div className="card m-4" key={todo_item.id}>
                    <div className="card-header">
                        {todo_item.id}
                    </div>
                     <div className='card-body'>
                        {todo_item.title}
                    </div>
                    <div className="card-footer">
                        <button type="button" onClick={editTodo.bind(null, todo_item)} className="btn-primary m-2">Edit</button>
                        <button type="button" onClick={deleteTodo.bind(null, todo_item.id)} className="btn-danger m-2">
                            Delete
                        </button>
                    </div>
                </div>
            })}
            </div>
            

           
            
        </div>
    )
}

export default Home;