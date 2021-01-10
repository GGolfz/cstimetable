import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import { day } from "../../config/day";
import { time } from "../../config/time";
import Subject from "../subject/index";
const Table = ({ subject }) => {
  const [table, setTable] = useState([]);
  const [head, setHead] = useState([]);
  const [left, setLeft] = useState([]);
  useEffect(() => {
    createTable();
  }, [subject]);
  const createTable = async () => {
    let days = day.map((el) => el.substring(0, 3).toUpperCase());
    let times = [];
    time.map((el, index) => {
      if (index % 2 == 0) {
        times.push(el[0] == "0" ? el.substring(1) : el);
      }
    });
    setHead([...times]);
    setLeft([...days]);
    let tableTemp = [];
    for (let i = 0; i < day.length; i++) {
      let tableTempDay = [];
      for (let j = 0; j < time.length; j++) {
        let data = await getSubject(day[i], time[j]);
        tableTempDay.push({ value: data.value, width: data.width });
        j += data.width - 1;
      }
      tableTemp.push(tableTempDay);
    }
    setTable(tableTemp);
    console.log(tableTemp);
  };
  const getSubject = async (d, ti) => {
    for (let s of subject) {
      if (s.day == d) {
        let index = await time.findIndex((t) => t == ti);
        let start = await time.findIndex((t) => t == s.startTime);
        let end = await time.findIndex((t) => t == s.endTime);
        if (index >= start && index < end) {
          let value = {
            time: `${s.startTime} - ${s.endTime}`,
            room: s.room,
            subject: s.subject,
          };
          console.log(s, d, ti, index, start, end);
          return { value, width: end - start };
        }
      }
    }
    return { value: "", width: 1 };
  };

  const generateTable = () => {
    return (
      <div className="table">
        <div className="table-row-head">
          <div
            className="table-head-left"
            style={{ width: `${200 / 24}%`, height: `${200 / 24}%` }}
          ></div>
          {head.map((v, i) => {
            return (
              <div
                className="table-head-col"
                style={{ width: `${200 / 24}%`, height: `${200 / 24}%` }}
              >
                {v}
              </div>
            );
          })}
        </div>
        {table.map((row, index) => {
          return (
            <Fragment>
              <div className="table-row">
                <div
                  className="table-row-left"
                  style={{
                    width: `${200 / 24}%`,
                    height: `${ 200 / 24}%`,
                  }}
                >
                  {left[index]}
                </div>
                {row.map((col, ind) => {
                  return (
                    <div
                      className="table-col"
                      style={{
                        width: `${(col.width * 100) / 24}%`,
                        height: `${(col.width * 100) / 24}%`,
                      }}
                    >
                      {col.value == "" ? (
                        col.value
                      ) : (
                        <Subject value={col.value} />
                      )}
                    </div>
                  );
                })}
                <div className="linerow">
                  <div
                    className="linerowhead"
                    style={{ width: `${200 / 24}%`, height: `${200 / 24}%` }}
                  />
                  {time.map((col, index) => {
                    if (index % 2 == 0) {
                      return (
                        <div
                          className="line"
                          style={{
                            width: `${200 / 24}%`,
                            height: `${200 / 24}%`,
                          }}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    );
  };

  return <div className="timetable">{generateTable()}</div>;
};
export default Table;
