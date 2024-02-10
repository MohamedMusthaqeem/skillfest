import React from "react";
import {useLogout} from '../../hooks/useLogout'
const Header1 = () => {
  const{logout}=useLogout();
  const handleLogout=()=>{
     logout();
  }
  return (
    <div>
      <div className="py-4 bg-Primary text-white">
        <div className="flex justify-end space-x-3 items-center">
          <div>Welcome AdminCSE</div>
          <div className="px-2">
            <button className="p-1 bg-red-600 rounded-lg hover:bg-red-800 duration-150 " onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header1;
