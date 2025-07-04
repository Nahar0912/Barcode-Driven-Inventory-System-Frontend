import BarcodeScanner from '../components/BarcodeScanner';

const ScannerPage = () => {
  const handleScanSuccess = () => {
    console.log('Scan completed successfully!');
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Barcode Scanner</h2>
      <BarcodeScanner onScanSuccess={handleScanSuccess} />
    </div>
  );
};

export default ScannerPage;
