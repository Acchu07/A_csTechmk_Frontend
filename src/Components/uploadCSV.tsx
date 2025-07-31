import Papa from "papaparse";
import { useState } from "react";
import getData from "../fetchApi";
import { uploadCSVURL } from "../urls";

// type array of objects
export default function CSV({
  setDisplayDistributedList,
}: {
  setDisplayDistributedList: (agentsWithTasks: any) => void;
}) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.[0]) return;
    const isCSV = await checkIfCSV(event.target.files[0]);
    if (isCSV) {
      setIsDisabled(!isDisabled);
      setErrorMessage("");
      setFile(event.target.files[0]);
    } else {
      setErrorMessage("File is not a CSV Please upload a CSV");
    }
  }

  async function handleSubmitFile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsDisabled(!isDisabled);
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
      setDisplayDistributedList(jsonReceived.data.agentsWithTasks);
    } else {
      setErrorMessage(jsonReceived.data.message);
    }
    jsonReceived ??
      alert("Invalid Credentials || Not In DB || Or Server Not Reachable"); // ToDo: Show Error Message using state and setTimeout
  }

  return (
    <>
      <h1>CSV</h1>
      <form onSubmit={handleSubmitFile}>
        <label htmlFor="csv">Upload CSV</label>
        <input
          name="csvfile"
          type="file"
          accept="text/csv"
          id="csv"
          onChange={handleFileChange}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button disabled={isDisabled} type="submit">
          Upload
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
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
