import React, {useState} from 'react'
import Axios from 'axios';

const TodoLimitForm = (props) => {
    const [limit, setLimit] = useState(3);
    // function onchange(event) {
    //     setLimit({limit : event.target.value});
    // }
    function onSubmit(event) {
        event.preventDefault();
        let limitData = {
            'limit' : limit 
        }
        Axios.post('/limit', limitData)
        .then(res => props.getTodo(res.data));
    }
    // function getNumberOfTodos() {
    //     Axios.post('limit')
    // }
    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
                <label htmlFor="limit">limit Todo</label>
                <input type="text" 
                name="limit"
                value={limit}
                onChange={event => setLimit(event.target.value)}
                />
                <button type="submit" className="btn-success">
                    set limit
                </button>
            </form>
        </div>
    )
}

export default TodoLimitForm;