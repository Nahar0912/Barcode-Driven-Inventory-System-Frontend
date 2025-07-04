import { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import axios from 'axios';

const BarcodeScanner = ({ onScanSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');

  // Handle scanned barcode
  const handleScan = async (err, result) => {
    if (result) {
      const barcode = result.text;
      await submitBarcode(barcode);
      setScanning(false);
    }
  };

  // Handle manual submit
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (manualBarcode.trim() === '') return alert('Please enter a barcode');
    await submitBarcode(manualBarcode);
    setManualBarcode('');
  };

  // Send barcode to backend
const submitBarcode = async (barcode) => {
    try {
      console.log('Submitting barcode:', barcode);
      const res = await axios.post('http://localhost:5000/api/products/scan', { barcode });

      // Check API message
      if (res.data.message === 'Product saved successfully' || res.data.message === 'Product already exists') {
        onScanSuccess();
        alert(res.data.message);
      } else {
        alert('Product not found!');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Error saving product!');
    }
  };


  return (
    <div className="mb-6 text-center">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => { setScanning(true); setManualMode(false); }}
          className="btn btn-primary"
        >
          Camera Scan
        </button>
        <button
          onClick={() => { setManualMode(true); setScanning(false); }}
          className="btn btn-secondary"
        >
          Manual Input
        </button>
      </div>

      {/* Camera Scanner */}
      {scanning && (
        <div className="flex justify-center mt-4">
          <BarcodeScannerComponent
            width={400}
            height={300}
            onUpdate={handleScan}
          />
          <button
            onClick={() => setScanning(false)}
            className="btn btn-error mt-4 ml-4"
          >
            Stop Scanning
          </button>
        </div>
      )}

      {/* Manual Input */}
      {manualMode && (
        <form onSubmit={handleManualSubmit} className="flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter Barcode"
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
            className="input input-bordered mb-4 w-64"
          />
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      )}
    </div>
  );
};

export default BarcodeScanner;
