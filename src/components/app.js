import { useEffect, useState } from "preact/hooks";
import TimeTable from "./table/index";
import TableHead from "./head/index";
import GenerateModal from "./modal";
const App = () => {
  const [subject, setSubject] = useState([]);
  const [currentPlan, setPlan] = useState("");
  const [modal, setModal] = useState(false);
  const [jsonText, setJSONText] = useState("");
  useEffect(() => {
    let attr = window.location.search;
    let year = "";
    let fastTrack = false;
    if (attr.length != 0) {
      attr = attr.split("?")[1].split("&");
      for (let i of attr) {
        let c = i.split("=");
        if (c[0].toLowerCase() == "year") {
          year = c[1];
        } else if (c[0].toLowerCase() == "fasttrack") {
          if (c[1].toLowerCase() == "true") {
            fastTrack = true;
          } else {
            fastTrack = false;
          }
        }
      }
      if (year == "") {
        year = "1";
      }
      let plan = `y${year}`;
      if (fastTrack) {
        plan += "-fast";
      }
      setPlan(plan);
    } else {
      let plan = window.localStorage.getItem("plan");
      if (plan) {
        setPlan(plan);
      } else {
        setPlan("y1");
      }
    }
  }, []);
  useEffect(() => {
    if (currentPlan.length != 0) {
      if (currentPlan === "custom") {
        setSubject(JSON.parse(jsonText));
      } else {
        const data = currentPlan.split("-");
        fetchData(data[0][1], data[1] ? "true" : "false");
        window.localStorage.setItem("plan", currentPlan);
      }
    }
  }, [currentPlan]);
  const fetchData = async (year, fasttrack) => {
    const url = `/api?year=${year}&fastTrack=${fasttrack}`;
    await fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSubject(data);
        let json = `[\n`;
        data.forEach((s) => {
          json += `{
              "subject": "${s.subject}",\n
              "lecturer": "${s.lecturer}",\n
              "startTime": "${s.startTime}",\n
              "endTime": "${s.endTime}",\n
              "room": "${s.room}",\n
              "day": "${s.day}"\n
              }\n`;
        });
        json += "]";
        setJSONText(json)
      });
  };
  const handleChangePlan = (p) => {
    setPlan(p);
  };
  const handleOpenGenerate = () => {
    setModal(true);
  };
  const generateCustomTable = () => {
    setPlan("custom");
    setModal(false);
  };
  return (
    <div id="app">
      {modal ? (
        <GenerateModal
          jsonText={jsonText}
          setJSONText={setJSONText}
          generateCustomTable={generateCustomTable}
          closeModal={() => setModal(false)}
        />
      ) : null}

      <div id="table-container">
        <TableHead
          currentPlan={currentPlan}
          onChangePlan={handleChangePlan}
          openGenerate={handleOpenGenerate}
        />
        <TimeTable subject={subject} />
      </div>
    </div>
  );
};

export default App;
