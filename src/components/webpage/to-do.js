import { useSelector, useDispatch } from "react-redux";
export function ToDo(props) {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(store.task);
  const addTask = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_TASK', data: event.target.addTask.value });
    event.target.addTask.value = "";
  }
 const TodoList=store.task;
  return (
    <>
      <div className="container my-5">
        <form onSubmit={addTask} className="w-50 m-auto">
          <div className="form-group d-flex gap-2">
            <input
              type="text"
              class="form-control"
              name="addTask"
              id=""
              aria-describedby="helpId"
              placeholder=""
            />
            <button className="btn btn-primary">Add</button>
          </div>
        </form>
      </div>
      <div className="todo-container container ">
        <ul ClassName="list-group w-50 m-auto">
          {TodoList.map((task, index) => {
            return (
              <li
                key={index}
                className="todo-item list-group-item d-flex justify-content-between"
              >
                {task}
                <svg onClick={() => dispatch({ type: 'DELETE_TASK', data: index })}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
  }