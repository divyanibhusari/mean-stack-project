import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import './App.css'
import axios from "axios"
function App() {
  let callserver = async () => {
    try {
      let result = await axios({
        method: "GET",
        url: import.meta.VITE_API_ADDRESS,
        data: null,
        headers: null
      })
      console.log(result)
    } catch (err) {
      console.log("unable to connect the backend ", err)
    }
  }

  return (
    <>
      <div className="text-center p-4">
        <h1>This is a home page</h1>
        <button className="btn btn-danger" onClick={callserver}>Api Call</button>
      </div>
    </>
  )
}

export default App
