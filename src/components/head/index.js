import { plan } from "../../config/plan";
const TableHead = ({ currentPlan, onChangePlan, openGenerate }) => {
  const handleChange = (e) => {
    onChangePlan(e.target.value);
  };
  return (
    <div className="table-container-head">
      <div className="table-head-title">
        CS @SIT <span className="white">: TIMETABLE</span>
      </div>
      <div className="table-head-select">
        <button className="generate-button" onClick={openGenerate}>
          Generate
        </button>
        <select onChange={handleChange} value={currentPlan}>
          {currentPlan === "custom" ? (
            <option value="custom" key="custom">
              Custom
            </option>
          ) : null}
          {plan.map((el, index) => {
            return (
              <option value={el.value} key={index}>
                {el.text}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
export default TableHead;
