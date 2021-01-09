import { useEffect, useState } from "preact/hooks";
import TimeTable from "./table/index";
import TableHead from "./head/index";
const App = () => {
	const [subject,setSubject] = useState([])
	useEffect(()=>{
		
	},[])
  return (
    <div
      id="app"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div id="table-container">
        <TableHead />
        <TimeTable  subject={subject}/>
      </div>
    </div>
  );
};

export default App;
