import {
  claimScannerScan,
  closeScannerSession,
  createScannerSession,
  getScannerSession,
  submitScannerScan
} from "../../../lib/api";

export async function openScannerSession() {
  return createScannerSession();
}

export async function loadScannerSession(sessionId: string) {
  return getScannerSession(sessionId);
}

export async function sendScannerBarcode(sessionId: string, barcode: string) {
  return submitScannerScan(sessionId, barcode);
}

export async function pollScannerBarcode(sessionId: string) {
  return claimScannerScan(sessionId);
}

export async function endScannerSession(sessionId: string) {
  return closeScannerSession(sessionId);
}
