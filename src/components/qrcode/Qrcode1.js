import React from 'react';
import QRCode from 'qrcode.react';

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
    <div>
      <h2>Scan the QR Code to Download the File</h2>
      <QRCode value={fileUrl} size={256} />
      <p>Or click the button below:</p>
      <button onClick={handleDownload}>Download {fileName}</button>
    </div>
  );
};

const App = () => {
  const fileUrl = 'https://example.com/path/to/your/file.pdf';
  const fileName = 'file.pdf';

  return (
    <div>
      <DownloadButtonWithQR fileUrl={fileUrl} fileName={fileName} />
    </div>
  );
};

export default App;
