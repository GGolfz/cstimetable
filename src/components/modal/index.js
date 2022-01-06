const GenerateModal = ({
  jsonText,
  setJSONText,
  generateCustomTable,
  closeModal,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3 className="modal-title">JSON TO TIMETABLE</h3>
        <textarea
          value={jsonText}
          onChange={(e) => {
            setJSONText(e.target.value);
          }}
        ></textarea>
        <div className="modal-action">
          <button className="generate-button" onClick={closeModal}>
            Cancel
          </button>
          <button className="generate-button" onClick={generateCustomTable}>
            Generate
          </button>
        </div>
      </div>
      <div className="modal-background"></div>
    </div>
  );
};

export default GenerateModal;
