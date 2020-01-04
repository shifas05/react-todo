import React, {useState, Fragment, useEffect} from 'react'
import Axios from 'axios';

const TodoForm = ({addTodo, editTodo}) => { 
    const [loading , setLoading]  = useState(false);
    const [todo, setTodo] = useState({title : '', status_id:''});
    const [errors , setErrors] = useState({});
    // when props changed component renders again, values should put in the inputs so useEffect
    //if edding posert changed it wont set it again so therfore useEffect
    useEffect(() => { 
        setTodo(editTodo)
    },[editTodo])

    const onChange = (event) => {
        setTodo({...todo, [event.target.name]: event.target.value }); 
        //whatever passed in here overrides it, if passed title then it overrides ,spread operator
    
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        if(!validateForm()) {
            setLoading(false);
            return;
        }else{
            setErrors({});
        }

        if(todo.id) {
            Axios.post('/edit_todo', todo)
            .then((res) => {
                addTodo(res.data);
                setTodo({title:'', status_id:''});
                setLoading(false);
            });
        }else {
            Axios.post('/add_todo', todo)
            .then((res) => {
                addTodo(res.data);
                setTodo({title:'', status_id:''});
                setLoading(false);
            });
        }
    }

    function validateForm() {
        const tempErrors = {};
        console.log(todo);
        if(todo.title.trim() === '') {
            tempErrors.title = 'title must not be empty';
        }
        if(todo.status_id != 0){
            if(todo.status_id.trim() === '') {
                tempErrors.status_id = 'status must not be empty';
            }
        }
        if(Object.keys(tempErrors).length > 0 ) {
            setErrors(tempErrors);
            return false;
        }
        return true;

    }

    return (
        <Fragment>
            {!loading ? (
               <form className="from" onSubmit={onSubmit}>
                   <label htmlFor="title">Title</label>
                   <input type="text" className="form-group"
                    name ="title"
                    value={todo.title}
                    onChange={onChange} //onchange - react doesnt have double bindeing so we need to erxplicity given onchange method
                    className="validate"
                   />
                    <span>{errors.title}</span>
                   <label htmlFor="title">Status</label>
                   <input type="number" className="form-group"
                    name ="status_id"
                    value={todo.status_id}
                    onChange={onChange} //onchange - react doesnt have double bindeing so we need to erxplicity given onchange method
                    className="validate"
                   />
                    <span>{errors.status_id}</span>

                    <button type="submit" className="btn btn-success">
                        {todo.id ? 'update' : 'add'}
                    </button>
               </form>
            ):(
                <div className="loading">
                    ...
                </div>
            )}
        </Fragment>
    )
}

export default TodoForm;
