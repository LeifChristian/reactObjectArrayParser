import { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [field, setField] = useState("");

  function parseInput() {
    const input = document.getElementById("input")
    let title;

    try {
      const jsonData = JSON.parse(input.value.trim());
      setData(jsonData);
      console.log(jsonData);

      if (Array.isArray(jsonData)) {
        title = `Array length: ${jsonData.length - 1}`;
      } else if (typeof jsonData === "object") {
        title = "Object properties:";
      } else {
        alert("Invalid syntax");
        return;
      }

      document.getElementById("output").style.display = "block";
      document.getElementById("data-title").innerHTML = title;
    } catch (err) {
      alert("Invalid JSON input");
    }
  }

  function getField() {
    let result = "";
    if (Array.isArray(data) && /^\d+$/.test(field)) {
      const index = parseInt(field);
      if (index < data.length) {
        result = data[index];
        console.log(result);
      }
    } else if (typeof data === "object" && typeof field === "string") {
      if (field && field.length > 0 && data && Object.keys(data).length) {
        result = data[field];
        console.log(result);
      } else {
        result = data[field];
      }
    }

    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = result === "" ? "Invalid field" : JSON.stringify(result);
    console.log(resultDiv.innerHTML);

    if (Array.isArray(result) || (typeof result === "object" && result !== null)) {
      const confirmResult = prompt("The result is an object or array. Do you want to use it as the new input?");
      if (confirmResult) {
        setData(result);
        const input = document.getElementById("input");
        if (result?.length && result) {
          input.value = JSON.stringify(result, null, 2);
          parseInput();
        } else {
          input.value = JSON.stringify(result, null, 2);
          parseInput();
        }
      }
    }
  }
  return (
    <div style={{ margin: "auto", position: "relative", marginTop: "1%" }}>
      <h2>Object/Array Parser</h2>
      <form>
        <p>Item to parse:</p>
        <br />
        <textarea id="input" name="input" rows="4" cols="50"></textarea>
        <br /><br />
        <button type="button" onClick={parseInput}>Submit</button>
      </form>
      <div id="output" style={{ display: "none" }}>
        <br />
        <div id="data-title"></div>
        <br />
        <div style={{ maxWidth: "80vw", overflowWrap: "break-word", whiteSpace: "pre-wrap", textAlign: "center" }}>
  {data &&
    typeof data === "object" &&
    Object.keys(data).map((property) => (
      <a
        key={property}
        style={{
          maxWidth: "80vw",
          textAlign: "center", padding: '5px',
          color: "gray",
          background: "blue",
          wordWrap: "break-word",
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
        href="#"
        onClick={() => setField(property)}
      >
        {property}
      </a>
    ))}
</div>

        <br />
        <label htmlFor="field">Enter property or index:</label>
        <br />
        <input type="text" id="field" name="field" value={field} onChange={(e) => setField(e.target.value)} />
        <button type="button" onClick={getField}>Get</button>
        <br /><br />
        <div id="result" style={{ wordWrap: "break-word", maxWidth: "80vw", overflowWrap: "break-word", whiteSpace: "pre-wrap" }}></div>
      </div>
    </div>
  )
  
}
export default App