import { openDB } from "idb";

// Membuat indexeddb
const dbPromised = async () => {
  const db = await openDB("football-app-DB", 1, {
    upgrade(db){
      const dbStore = db.createObjectStore("matches", {keyPath: "id"});
      dbStore.createIndex("created", "created");
    }
  })
};
dbPromised();

//  fungsi menyimpan data ke indexdb
const saveToDB = async data => {
  const db = await openDB("football-app-DB");
  await db.put("matches", data);
};

// fungsi untuk mengambil data dari indexed DB
const getDataDB = async () => {
  const db = await openDB("football-app-DB");
  return await db.getAllFromIndex("matches", "created");
};

// fungsi untuk mengambil id key data dari indexed Db
const getDataIdKeysFromDB = async () => {
  const db = await openDB("football-app-DB");
  return await db.getAllKeys("matches");
};

// fungsi untuk menghapus data di indexed DB
const deleteDataDB = async key => {
  const db = await openDB("football-app-DB");
  await db.delete("matches", key);
};

export {saveToDB, getDataDB, deleteDataDB, getDataIdKeysFromDB};