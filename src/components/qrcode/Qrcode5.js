import React from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Adjusted import statement
import url from "./Protection layer Data Sheet.pdf"

const DownloadButtonWithQR = ({ fileUrl, fileName }) => {
  const handleDownload = () => {
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading the file:', error));
  };

  return (
    <div className='w-full flex flex-col items-center justify-center text-center'>
      <h2 className=' mt-4 font-normal text-xl'>Protection layer</h2>
      <QRCodeCanvas value={fileUrl} className=" w-28 my-2" /> {/* Using QRCodeCanvas */}
      <button className='b font-normal text-xs sm:text-xl rounded-border p-2 mt-2'  onClick={handleDownload}>Download</button>
    </div>
  );
};

const App = () => {
  const fileUrl = 'https://caf-sports.com/static/media/ProtectionLayer.5a736bf62a424e151d04.pdf';
  const fileName = 'Protection layer.pdf';

  return (
    <div>
      <DownloadButtonWithQR fileUrl={url} fileName={fileName} />
    </div>
  );
};

export default App;
