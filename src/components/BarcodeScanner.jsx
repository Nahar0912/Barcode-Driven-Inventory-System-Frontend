import { useState } from 'react';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { scanBarcode } from '../services/productService';
import { toast } from 'react-toastify';

const BarcodeScanner = ({ onScanSuccess }) => {
  const [scanning, setScanning] = useState(false);
  const [manualMode, setManualMode] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleScan = async (err, result) => {
    if (result) {
      const barcode = result.text;
      await submitBarcode(barcode);
      setScanning(false);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (manualBarcode.trim() === '')
      return toast.error('Please enter a barcode');
    await submitBarcode(manualBarcode);
    setManualBarcode('');
  };

  const submitBarcode = async (barcode) => {
    try {
      setLoading(true);
      const res = await scanBarcode(barcode);

      if (
        res.data.message === 'Product saved successfully' || res.data.message === 'Product already exists'
      ) {
        onScanSuccess();
        toast.success(res.data.message);
      } else {
        toast.error('Product not found!');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error('Error saving product!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 text-center max-w-xl mx-auto p-4">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => {
            setScanning(true);
            setManualMode(false);
          }}
          className={`btn ${scanning ? 'btn-primary' : 'btn-outline btn-primary'}`}
        >
          Camera Scan
        </button>
        <button
          onClick={() => {
            setManualMode(true);
            setScanning(false);
          }}
          className={`btn ${manualMode ? 'btn-secondary' : 'btn-outline btn-secondary'}`}
        >
          Manual Input
        </button>
      </div>

      {scanning && (
        <div className="flex flex-col items-center space-y-4">
          <BarcodeScannerComponent width={400} height={300} onUpdate={handleScan} />
          <button onClick={() => setScanning(false)} className="btn btn-error text-white">
            Stop Scanning
          </button>
        </div>
      )}

      {manualMode && (
        <form onSubmit={handleManualSubmit} className="flex flex-col items-center space-y-4">
          <input
            type="text"
            placeholder="Enter Barcode"
            value={manualBarcode}
            onChange={(e) => setManualBarcode(e.target.value)}
            className="input input-bordered w-64"
          />
          <button type="submit" className={`btn btn-success text-white ${loading ? 'loading' : ''}`}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}

      {!scanning && !manualMode && (
        <div className="text-gray-500 mt-6">
          <p>Select a mode to start scanning or enter a barcode manually.</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
