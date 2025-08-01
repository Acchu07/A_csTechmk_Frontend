import Papa from "papaparse";
import { useState } from "react";
import getData from "../fetchApi";
import { uploadCSVURL } from "../urls";

enum ComponentClicked {
  LatestCSV,
  AGENTS,
  CSV,
}

// type array of objects
export default function CSV({
  setDisplayDistributedList,
  setComponentClicked,
}: {
  setDisplayDistributedList: (agentsWithTasks: any) => void;
  setComponentClicked: (componentClicked: number) => void;
}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.[0]) return;
    const isCSV = await checkIfCSV(event.target.files[0]);
    if (isCSV) {
      setIsDisabled(false);
      setErrorMessage("");
      setFile(event.target.files[0]);
    } else {
      setIsDisabled(true);
      setErrorMessage("File is not a CSV Please upload a CSV");
    }
  }

  async function handleSubmitFile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisabled(true);
    const form = new FormData();
    if (!file) return;
    form.append("csvfile", file);
    const request = new Request(uploadCSVURL, {
      method: "POST",
      body: form,
      credentials: "include",
    });
    const jsonReceived = await getData(request);

    if (jsonReceived?.status === 200) {
      setComponentClicked(ComponentClicked.LatestCSV);
      setDisplayDistributedList(jsonReceived.data.agentsWithTasks);
    } else {
      setErrorMessage(jsonReceived.data.message);
    }
    setIsDisabled(false);
  }

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmitFile}>
          <label htmlFor="csv">Upload CSV</label>
          <input
            className="btn"
            name="csvfile"
            type="file"
            accept="text/csv"
            id="csv"
            onChange={handleFileChange}
          />
          {errorMessage && <p className="error-text">{errorMessage}</p>}
          <button className="btn" disabled={isDisabled} type="submit">
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

function checkIfCSV(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    Papa.parse(file, {
      complete: (results) => {
        if (results.errors.length > 0) {
          return resolve(false);
        }
        resolve(true);
      },
    });
  });
}
