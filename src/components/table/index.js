import { useEffect, useState } from "preact/hooks";
import { day } from "../../config/day";
import { time } from "../../config/time";
import Subject from "../subject/index";
const Table = ({subject}) => {
  const [table, setTable] = useState([]);
  const [head, setHead] = useState([]);
  const [left, setLeft] = useState([]);
  useEffect(() => {
    let days = day.map((el) => el.substring(0, 3).toUpperCase());
    let times = [];
    time.map((el, index) => {
      if (index % 2 == 0) {
        times.push(el[0] == "0" ? el.substring(1) : el);
      }
    });
    setHead(["", ...times]);
    setLeft([...days]);
    let tableTemp = [];
    for(let i = 0 ;i<days.length;i++){
        for(let j = 0;j<times.length;j++){
            let data = getSubject(days[i],times[j]);
        }
    }
    setTable(tableTemp);
  }, []);
  const getSubject = async (day,time) => {
    for(let s of subject){
        
    }
  }

  const generateTable = () => {
    return (
      <div className="table">
        <div className="table-row">
          {head.map((v, i) => {
            return (
              <div className="table-head-col" style={{ width: `${200 / 26}%` }}>
                {v}
              </div>
            );
          })}
        </div>
        {table.map((row, index) => {
          return (
            <div className="table-row">
              <div className="table-row-left" style={{ width: `${200 / 26}%` }}>
                {left[index]}
              </div>
              {row.map((col, ind) => {
                return (
                  <div
                    className="table-col"
                    style={{ width: `${(col.width * 100) / 26}%` }}
                  >
                    {col.value == "" ? (
                      col.value
                    ) : (
                      <Subject keyCode={col.value} />
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return <div className="timetable">{generateTable()}</div>;
};
export default Table;
