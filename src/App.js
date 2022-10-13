import React, { useEffect, useState } from 'react';
import { BrowserRouter} from "react-router-dom";

import Header from "./components/Header";
import Routers from "./components/Routers";
import saveRole from "./scripts/saveRole";
import UserService from "./API/UserService";

const getCookie = require("./scripts/getCookie.js");

function App() {

  const [isUpdate, setIsUpdate] = useState(false);
  const [isAuth, setIsAuth] = useState(false)


  function updatePage() {
    if(isUpdate) {
      setIsUpdate(false)
    }
    else {
      setIsUpdate(true);
    }
  }
  

  async function updateCookies() {

    let id = getCookie("id");

    if(id) {
      const response = await UserService.getUserById(id)

      if(response) {
        if(String(response.role) === "admin") {
          saveRole("admin")
        }
        else if(String(response.role) === "user") {
          saveRole("user")
        }
      }
      setIsAuth(true);

    }
    else {
      setIsAuth(false);
    }
  }


  useEffect(() => {
    updateCookies();
  }, [isAuth, isUpdate])


  return (
    
    <BrowserRouter>
      <Header/>
      <Routers updatePage={updatePage}/>
    </BrowserRouter>

  );
}

export default App;
