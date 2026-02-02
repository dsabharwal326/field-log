import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('fieldlog.db');

/**
 * Initialize all tables.
 * This is non-destructive and safe to call on app start.
 */
export function initDatabase() {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS fountain_pens (
      id TEXT PRIMARY KEY NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,

      nib_material TEXT,
      nib_size TEXT,
      nib_unit TEXT CHECK (
        nib_unit IN ('jowo', 'bock', 'schmidt', 'proprietary', 'other')
      ),

      filling_mechanism TEXT CHECK (
        filling_mechanism IN (
          'c_c',
          'cartridge_only',
          'eyedropper',
          'piston',
          'vac',
          'other'
        )
      ),

      body_material TEXT,
      color_finish TEXT,

      currently_inked INTEGER DEFAULT 0,
      current_ink TEXT,
      last_used TEXT
    );

    CREATE TABLE IF NOT EXISTS machined_pens (
      id TEXT PRIMARY KEY NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,

      material TEXT,
      finish TEXT,

      mechanism TEXT CHECK (
        mechanism IN (
          'bolt',
          'click',
          'twist',
          'capped',
          'double_lock',
          'cam',
          'continuous_twist'
        )
      ),

      refill_standard TEXT CHECK (
        refill_standard IN (
          'parker',
          'asian',
          'fisher',
          'd1',
          'energel',
          'g2_mini',
          'lamy_m22',
          'montblanc'
        )
      ),

      refill_brand TEXT,
      refill_model TEXT,
      refill_color TEXT,
      refill_size_mm REAL,

      customization TEXT
    );
  `);
}

/* ============================================================
   FOUNTAIN PEN FUNCTIONS
   ============================================================ */

export async function insertFountainPen(data: {
  id: string;
  brand: string;
  model: string;
  nib_material?: string;
  nib_size?: string;
  nib_unit?: string;
  filling_mechanism?: string;
  body_material?: string;
  color_finish?: string;
  currently_inked?: boolean;
  current_ink?: string;
  last_used?: string;
}) {
  await db.runAsync(
    `
    INSERT INTO fountain_pens (
      id,
      brand,
      model,
      nib_material,
      nib_size,
      nib_unit,
      filling_mechanism,
      body_material,
      color_finish,
      currently_inked,
      current_ink,
      last_used
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      data.id,
      data.brand,
      data.model,
      data.nib_material ?? null,
      data.nib_size ?? null,
      data.nib_unit ?? null,
      data.filling_mechanism ?? null,
      data.body_material ?? null,
      data.color_finish ?? null,
      data.currently_inked ? 1 : 0,
      data.current_ink ?? null,
      data.last_used ?? null,
    ]
  );
}

export async function fetchFountainPens() {
  return await db.getAllAsync(
    `SELECT * FROM fountain_pens ORDER BY brand, model;`
  );
}

export async function fetchFountainPenById(id: string) {
  const result = await db.getAllAsync(
    `SELECT * FROM fountain_pens WHERE id = ? LIMIT 1;`,
    [id]
  );
  return result[0];
}

/* ============================================================
   MACHINED PEN FUNCTIONS
   ============================================================ */

export async function insertMachinedPen(data: {
  id: string;
  brand: string;
  model: string;
  material?: string;
  finish?: string;
  mechanism?: string;
  refill_standard?: string;
  refill_brand?: string;
  refill_model?: string;
  refill_color?: string;
  refill_size_mm?: number;
  customization?: string;
}) {
  await db.runAsync(
    `
    INSERT INTO machined_pens (
      id,
      brand,
      model,
      material,
      finish,
      mechanism,
      refill_standard,
      refill_brand,
      refill_model,
      refill_color,
      refill_size_mm,
      customization
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `,
    [
      data.id,
      data.brand,
      data.model,
      data.material ?? null,
      data.finish ?? null,
      data.mechanism ?? null,
      data.refill_standard ?? null,
      data.refill_brand ?? null,
      data.refill_model ?? null,
      data.refill_color ?? null,
      data.refill_size_mm ?? null,
      data.customization ?? null,
    ]
  );
}

export async function fetchMachinedPens() {
  return await db.getAllAsync(
    `SELECT * FROM machined_pens ORDER BY brand, model;`
  );
}

export async function fetchMachinedPenById(id: string) {
  const result = await db.getAllAsync(
    `SELECT * FROM machined_pens WHERE id = ? LIMIT 1;`,
    [id]
  );
  return result[0];
}

export default db;
