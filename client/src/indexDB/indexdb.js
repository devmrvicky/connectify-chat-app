// src/indexedDB.js

const DB_NAME = "connectify";
const storeNames = ["contacts_list", "chats", "friends"];

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      console.log("creating object store");
      const db = event.target.result;
      storeNames.forEach((storeName) => {
        let keyPath = ["contacts_list", "friends"].includes(storeName)
          ? "username"
          : "_id";
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, {
            keyPath,
            // autoIncrement: false,
          });
        }
      });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

export async function addData({ storeName, data }) {
  const db = await openDB({ DB_NAME, storeName });
  console.log(db);
  // return;
  return await new Promise((resolve, reject) => {
    //db.transaction()
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);

    // const request = store.add(data);
    let request;

    for (const item of data) {
      // if (!item.key) {
      //   throw new Error("Each object must have a unique key property.");
      // }
      // console.log(item);
      request = store.add(item);
    }

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getData(id) {
  const db = await openDB();
  return await new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(id);
    store.get();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getAllData({ storeName }) {
  const db = await openDB({ DB_NAME, storeName });
  // return;
  return await new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function updateData(data) {
  const db = await openDB();
  return await new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    // const request = store.put(data);

    for (const item of data) {
      // if (!item.key) {
      //   throw new Error("Each object must have a unique key property.");
      // }
      // console.log(item);
      request = store.put(item);
    }

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function deleteData(id) {
  const db = await openDB();
  return await new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);
    // console.log(request);

    request.onsuccess = () => {
      console.log(`id: ${id}: deleted`);
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

export async function clearData({ storeName }) {
  const db = await openDB();
  return await new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.clear();
    // console.log(request);

    request.onsuccess = () => {
      console.log(`clear data`);
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

export async function deleteObjectStore({ storeName }) {
  const db = await openDB({ DB_NAME });
  return new Promise((resolve, reject) => {
    const deleteRequest = db.deleteObjectStore(storeName);

    // deleteRequest.onsuccess = () => {
    //   console.log(`Database ${DB_NAME} deleted successfully`);
    //   resolve();
    // };

    // deleteRequest.onerror = (event) => {
    //   console.error(`Error deleting database ${DB_NAME}:`, event.target.error);
    //   reject(event.target.error);
    // };

    // deleteRequest.onblocked = () => {
    //   console.warn(`Deletion of database ${DB_NAME} is blocked`);
    // };
  });
}

export async function deleteDB() {
  const db = await openDB({ DB_NAME });
  return new Promise((resolve, reject) => {
    db.close();
    const deleteRequest = window.indexedDB.deleteDatabase(DB_NAME);

    deleteRequest.onsuccess = () => {
      console.log(`Database ${DB_NAME} deleted successfully`);
      resolve();
    };

    deleteRequest.onerror = (event) => {
      console.error(`Error deleting database ${DB_NAME}:`, event.target.error);
      reject(event.target.error);
    };

    deleteRequest.onblocked = () => {
      console.warn(`Deletion of database ${DB_NAME} is blocked`);
    };
  });
}
