CREATE TABLE IF NOT EXISTS scanner_sessions (
  id TEXT PRIMARY KEY,
  pairing_code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TEXT NOT NULL,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS scanner_scans (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  barcode TEXT NOT NULL,
  created_at TEXT NOT NULL,
  consumed_at TEXT,
  FOREIGN KEY (session_id) REFERENCES scanner_sessions(id)
);
