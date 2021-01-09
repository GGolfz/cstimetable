import {plan} from '../../config/plan';
const TableHead = () => {
    return (
        <div className="table-container-head">
            <div className="table-head-title">CS @SIT <span className="white">: TIMETABLE</span></div>
            <div className="table-head-select">
                <select>
                    {
                        plan.map((el,index) =>{
                            return <option value={el} key={index}>{el}</option>
                        })
                    }
                </select>
            </div>
        </div>
    )
}
export default TableHead;