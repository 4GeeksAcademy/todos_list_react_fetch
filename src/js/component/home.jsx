import React, {useState} from "react";
import { IoMdConstruct } from "react-icons/io";
import { PiFileCThin } from "react-icons/pi";
import { TiDeleteOutline } from "react-icons/ti";


const Home = () => {
const [item, setItem] = useState("")
const [toDos, setTodos] = useState([])
 


	const handleEnter =  (e) =>{
		if(e.key === "Enter"){
		fetch("https://playground.4geeks.com/todo/todos/miguel_alves", {
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
			if(res.ok) alert("Tarea agregada correctamente")
		 })
		setItem("")

		}
	}

	const hansdleDelete = (i) => {
		setTodos(toDos.filter((_, index) => index !== i))
	}

	const handlerGetTodos = () => {
		fetch("https://playground.4geeks.com/todo/users/miguel_alves")
		.then((res)=>{
			if(res.ok) console.log(res.json())
		})
	}


	return (
	 <div className="container">
		<h1>Todos List</h1>
			<div className="lista-contenedor">
			<ul>
				<li><input type="text" placeholder="Agregar nueva tarea" onChange={(e)=>setItem(e.target.value)} value={item} onKeyDown={(e)=>handleEnter(e)}/></li>
				{toDos && toDos.map((item, index) =>(
					<li key={index}>{item}<TiDeleteOutline onClick={() => hansdleDelete(index)} /></li>
				))}
				<li>{toDos.length} items faltantes</li>
		        
			</ul>
			</div>
		
	 </div>
	)

	
};

export default Home;

