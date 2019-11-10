import React, { useState, useEffect } from "react";

const App = () => {
  const [inputs, setInputs] = useState({
    stnServerTotal: 0,
    stnServerSumTotal: 0,
    hpServerTotal: 0,
    hpServerSumTotal: 0,
    recoveryType: "simple",
    recoveryDiskspaceTotal: 0,
    recoveryDiskspaceSumTotal: 0,
    archiveServerTotal: 0,
    archiveServerSumTotal: 0,
    backupGbTotal: 0,
    sumtotal: 0
  });
  useEffect(() => {}, []);
  const handleChange = e => {
    e.persist();
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]:
        e.target.name === "recoveryType"
          ? e.target.value
          : parseInt(e.target.value),
      sumtotal: [
        inputs.stnServerSumTotal,
        inputs.hpServerSumTotal,
        inputs.recoveryDiskspaceSumTotal,
        inputs.archiveServerSumTotal
      ].reduce((a, sumtotal) => a + sumtotal)
    }));
    if (e.target.name === "stnServerTotal") {
      setInputs(inputs => ({
        ...inputs,
        stnServerSumTotal: inputs.stnServerTotal * 3000
      }));
    }
    if (e.target.name === "hpServerTotal") {
      setInputs(inputs => ({
        ...inputs,
        hpServerSumTotal: inputs.hpServerTotal * 3000
      }));
    }
    if (
      e.target.name === "recoveryDiskspaceTotal" ||
      e.target.name === "archiveServerTotal"
    ) {
      setInputs(inputs => ({
        ...inputs,
        backupGbTotal: (inputs.backupGbTotal =
          inputs.recoveryDiskspaceTotal + inputs.archiveServerTotal),
        recoveryDiskspaceSumTotal:
          inputs.recoveryType === "simple"
            ? inputs.recoveryDiskspaceTotal * 3
            : inputs.recoveryDiskspaceTotal * 5,
        archiveServerSumTotal: inputs.archiveServerTotal * 16
      }));
    }
  };
  return (
    <div className="container">
      <section className="panel">
        <h1>gts cost calc</h1>
        <div className="row">
          <div>Number of standard servers</div>
          <div></div>
          <div>
            <input
              type="number"
              name="stnServerTotal"
              onChange={handleChange}
              value={inputs.stnServerTotal}
            />
          </div>
          <div>
            <input
              type="number"
              name="stnServerSumTotal"
              readOnly
              value={inputs.stnServerSumTotal}
            />
          </div>
        </div>
        <div className="row">
          <div>Number of High performance servers</div>
          <div></div>
          <div>
            <input type="number" name="hpServerTotal" onChange={handleChange} />
          </div>
          <div>
            <div>
              <input
                type="number"
                name="hpServerSumTotal"
                readOnly
                value={inputs.hpServerSumTotal}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div>Database disk space</div>
          <div>
            <select
              name="recoveryType"
              selected="selected"
              onChange={handleChange}
            >
              <option value="simple">Simple</option>
              <option value="full">Full</option>
            </select>
          </div>
          <div>
            <input
              type="number"
              name="recoveryDiskspaceTotal"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              name="recoveryDiskspaceSumTotal"
              readOnly
              value={inputs.recoveryDiskspaceSumTotal}
            />
          </div>
        </div>
        <div className="row">
          <div>Archive disk space</div>
          <div></div>
          <div>
            <input
              type="number"
              name="archiveServerTotal"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="number"
              name="archiveServerSumTotal"
              readOnly
              value={inputs.archiveServerSumTotal}
            />
          </div>
        </div>
        <div className="row">
          <div>Backup Disk space</div>
          <div></div>
          <div>
            {inputs.recoveryType === "simple"
              ? parseInt(inputs.backupGbTotal)
              : parseInt(inputs.backupGbTotal) * 1.5}
            GB
          </div>
          <div> </div>
        </div>
        <div className="row">
          <div>Total</div>
          <div></div>
          <div></div>
          <div>
            <input
              type="number"
              name="sumtotal"
              readOnly
              value={inputs.sumtotal}
            />
          </div>
        </div>
        <pre>{JSON.stringify(inputs, null, 2)}</pre>
      </section>
    </div>
  );
};

export default App;
