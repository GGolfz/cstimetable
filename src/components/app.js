import { useEffect, useState } from "preact/hooks";
import TimeTable from "./table/index";
import TableHead from "./head/index";
import {plan} from '../config/plan';
const App = () => {
	const [subject,setSubject] = useState([])
	const [currentPlan,setPlan] = useState(plan[0].value)
	useEffect(()=>{
		fetch(`/assets/data/${currentPlan}.json`).then(res=>{
			return res.json()
		}).then(data=>{
			setSubject(data)
		})
	},[currentPlan])
	const handleChangePlan = (p) => {
		setPlan(p);
	}
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
        <TableHead onChangePlan={handleChangePlan}/>
        <TimeTable subject={subject}/>
      </div>
    </div>
  );
};

export default App;
