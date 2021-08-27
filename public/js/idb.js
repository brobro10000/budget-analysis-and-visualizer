let db;

const request = indexedDB.open('budget', 1);

request.onupgradeneeded = function(event) {
    const db = event.target.result;

    db.createObjectStore('transaction', { autoIncrement: true });
  };

request.onsuccess = function(event) {
    db = event.target.result;
  
    if (navigator.onLine) {
      // we haven't created this yet, but we will soon, so let's comment it out for now
      // uploadPizza();
    }
  };
  
  request.onerror = function(event) {
    console.log(event.target.errorCode);
  };

  // This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
    // open a new transaction with the database with read and write permissions 
    const transaction = db.transaction(['transaction'], 'readwrite');
  
    // access the object store for `new_pizza`
    const transactionObjectStore = transaction.objectStore('transaction');
  
    // add record to your store with add method
    transactionObjectStore.add(record);
  }