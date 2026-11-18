import JSZip from 'jszip';

export async function downloadProjectArchive() {
  const zip = new JSZip();

  // Root files to fetch and include
  const filesToInclude = [
    '/GAS_MARKETPLACE_VIDEO_ANALYSIS.md',
    '/README.md',
    '/package.json',
    '/tsconfig.json',
    '/vite.config.ts',
    '/index.html',
    '/metadata.json',
    '/.env.example',
    '/src/App.tsx',
    '/src/main.tsx',
    '/src/index.css',
    '/src/types/index.ts',
    '/src/data/mockData.ts',
    '/src/context/GasDeckContext.tsx',
    '/src/components/layout/Navbar.tsx',
    '/src/components/layout/Footer.tsx',
    '/src/components/landing/LandingPage.tsx',
    '/src/components/dashboard/CustomerDashboard.tsx',
    '/src/components/auth/AuthModal.tsx',
    '/src/components/discovery/VendorDiscovery.tsx',
    '/src/components/discovery/VendorDetailModal.tsx',
    '/src/components/order/GasOrderModal.tsx',
    '/src/components/checkout/CheckoutModal.tsx',
    '/src/components/tracking/OrderTrackingView.tsx',
    '/src/components/history/OrderHistoryView.tsx',
    '/src/components/history/ReceiptModal.tsx',
    '/src/components/location/LocationModal.tsx',
    '/src/components/safety/SafetyModal.tsx',
  ];

  for (const filePath of filesToInclude) {
    try {
      const response = await fetch(filePath);
      if (response.ok) {
        const content = await response.text();
        // Remove leading slash for zip path
        const relativePath = filePath.replace(/^\//, '');
        zip.file(relativePath, content);
      }
    } catch {
      // Ignore missing optional files
    }
  }

  // Generate the zip blob
  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gas-deck-phase-1-archive-${new Date().toISOString().split('T')[0]}.zip`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
