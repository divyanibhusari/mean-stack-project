import React, { useState } from "react"

import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"

import './App.css'
import axios from "axios"

function App() {
 

  let [formData, setformData] = useState({
    name: "", phone: ""
  })

  let callserver = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: import.meta.env.VITE_API_ADDRESS

      })
      console.log(result)
    } catch (err) {
      console.log("unable to connect the backend ", err)
    }
  }
  let handleChange = (e) => {

    let { name, value } = e.target

    setformData(prev => {
      return { ...prev, [name]: value }
    })
  }
  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let result = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_API_ADDRESS}/post`,
        data: formData
      })
      console.log(result)
      if (result.status === 202) {
        alert(result.data.message)
      }


    } catch (err) {
      console.log("unable to submit the data to backend")
      console.log(err)
    }
  }




  return (
    <>
      <div className="text-center p-4">
        <h1>This is a home page</h1>
        <button className="btn btn-danger" onClick={callserver}>Api Call</button>
      </div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} type="text" placeholder="Enter Name" name="name" value={formData.name} />
          <input onChange={handleChange} type="number" placeholder="Enter phone number" name="phone" value={formData.phone} />
          <button type="submit" >submit</button>
        </form>
      </div>
    </>
  )
}

export default App
