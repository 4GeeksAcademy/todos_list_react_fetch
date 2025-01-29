import React, {useState, useEffect} from "react";
import { IoMdConstruct } from "react-icons/io";
import { PiFileCThin } from "react-icons/pi";
import { TiDeleteOutline } from "react-icons/ti";


const Home = () => {
const [item, setItem] = useState("")
const [toDos, setTodos] = useState([])
 


	const handleEnter =  async (e) =>{
		if(e.key === "Enter"){
		fetch("https://playground.4geeks.com/todo/todos/usermiguelparra", {
			method: "POST",
			body: JSON.stringify({
				"label": item,
				"is_done": false
			  }),
				headers: {
					"Content-Type": "application/json"
				  }
			  })
			
		
		  .then((res)=> {
			if(res.ok) console.log("Tarea agregada correctamente")
		 })
		setItem("")
		 await handlerGetTodos()
		}
	};

	const hansdleDelete = (id) => {
		fetch("https://playground.4geeks.com/todo/todos/"+id,{
			method: "DELETE"
		})
	    .then((res) => {
			if(res.ok) console.log("tarea eliminada correctamente")
		})
	}

	const handlerGetTodos = async () => {
		try{
		const res = await fetch("https://playground.4geeks.com/todo/users/usermiguelparra")
		const data = await res.json()
		if(res.ok) setTodos(data.todos)
		} catch (error){
			console.log(error)
		}
		
		
	}
     useEffect(() =>{
		handlerGetTodos()
	 },[hansdleDelete])

	return (
	 <div className="container">
		<h1>Todos List</h1>
			<div className="lista-contenedor">
			<ul>
				<li><input type="text" placeholder="Agregar nueva tarea" onChange={(e)=>setItem(e.target.value)} value={item} onKeyDown={(e)=>handleEnter(e)}/></li>
				{toDos && toDos.map((item, index) =>(
					<li key={index}>{item.label}<TiDeleteOutline onClick={() => hansdleDelete(item.id)} /></li>
				))}
				<li>{toDos.length} items faltantes</li>
		        
			</ul>
			</div>
		
	 </div>
	)

	
};

export default Home;

