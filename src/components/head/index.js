import {plan} from '../../config/plan';
const TableHead = ({currentPlan,onChangePlan}) => {
    const handleChange = (e) => {
        onChangePlan(e.target.value);
    }
    return (
        <div className="table-container-head">
            <div className="table-head-title">CS @SIT <span className="white">: TIMETABLE</span></div>
            <div className="table-head-select">
                <select onChange={handleChange} value={currentPlan}>
                    {
                        plan.map((el,index) =>{
                            return <option value={el.value} key={index}>{el.text}</option>
                        })
                    }
                </select>
            </div>
        </div>
    )
}
export default TableHead;