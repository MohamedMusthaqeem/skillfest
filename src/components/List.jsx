import React from 'react'
import {useUserContext} from '../hooks/useUserContext'
import axios from 'axios';
const List = ({user}) => {
  const {dispatchs}=useUserContext();
  const handleDelete = async () => {
    const res = await axios.delete(
      "http://localhost:5000/api/user_main/"+ user._id
    );
    console.log(res);
    if (res.status) {
      dispatchs({ type: "DELETE_USER", payload: res.data });
    }
  };
  return (
    <div className="overflow-y-auto">
       <div className='flex justify-between mx-4 border-2 border-blue-700 p-4 items-center rounded-lg my-2'>
        <div>
        <p>{user.user_name}</p>
        <p className='text-blue-600'>{user.email}</p>
        </div>
        <button onClick={handleDelete} className='p-2 bg-red-600 text-white rounded-md '>Delete User</button>
       </div>
    </div>
  )
}

export default List