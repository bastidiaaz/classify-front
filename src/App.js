import { React, useState } from 'react';
import './App.css';
import { getData } from './services/api.js';
import { Line } from 'react-chartjs-2';

function App() {
  const [file, setFile] = useState();
  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  });

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('sentFile', file, file.name);
    getData(formData)
      .then((response) => {
        const json = JSON.parse(response.data);
        const newData = json.data;
        // const formattedData = {
        //   datasets: [{
        //     data: newData[0],
        //     labels: [],
        //   }],
        // };
        const newDataset = { ...data.datasets[0] };
        newDataset.data = newData[0];
        newDataset.pointRadius = 0;

        setData((data) => ({ labels: Array.from(newData[0].keys()), datasets: [newDataset] }));
      })
      .catch((e) => console.log('oh no por dios'));
  };

  console.log(data);

  return (
    <div className="App">
      <div>
        <input type="file" onChange={(event) => setFile(event.target.files[0])} />
        <button onClick={handleFileUpload} disabled={!file}>
          Upload!
        </button>
      </div>
      <div style={{height: '800px'}}>
        <Line data={data} height="80" options={{ animation: false }} />
      </div>
    </div>
  );
}

export default App;
