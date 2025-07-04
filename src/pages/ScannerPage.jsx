import BarcodeScanner from '../components/BarcodeScanner';

const ScannerPage = () => {
  // This function will be called when a scan is successful
  const handleScanSuccess = () => {
    console.log('Scan completed successfully!');
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Barcode Scanner</h2>
      <BarcodeScanner onScanSuccess={handleScanSuccess} />
    </div>
  );
};

export default ScannerPage;
