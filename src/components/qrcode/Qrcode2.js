import React from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Adjusted import statement
import url from "./Acrylic Data Sheet.pdf"

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
    <div className=' w-full flex flex-col items-center justify-center text-center'>
      <h2 className=' mt-4 font-normal text-xl'>Acrylic</h2>
      <QRCodeCanvas value={fileUrl} className=" w-28 my-2" /> {/* Using QRCodeCanvas */}
      <button className='b font-normal text-xs sm:text-xl rounded-border p-2 mt-2'  onClick={handleDownload}>Download</button>
    </div>
  );
};

const App = () => {
  const fileUrl = 'https://caf-sports.com/static/media/Acrylic.0f6a3899a3b8254875c1.pdf';
  const fileName = 'Acrylic.pdf';

  return (
    <div>
      <DownloadButtonWithQR fileUrl={url} fileName={fileName} />
    </div>
  );
};

export default App;
