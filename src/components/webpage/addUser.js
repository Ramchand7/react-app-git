import { Chance } from "chance";
import { addUser, deleteUser } from "./../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const AddUser = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.users);

  const handleUser = () => {
    const userName = Chance().name();
    dispatch(addUser(userName));
    console.log(userName);
  };

  const handleDeleteUser = (index) => {
    dispatch(deleteUser(index));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User Management</h2>

      {/* Add User Button */}
      <div className="text-center mb-4">
        <button className="btn btn-primary" onClick={handleUser}>
          Add User
        </button>
      </div>

      {/* User List */}
      <ul className="list-group">
        {users.map((user, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{user}</span>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteUser(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
