const DB_NAME = 'ccdi-hub-indexeddb-cart-files';
const DB_STORE_NAME = 'CartStore';

const getCartItem = () => (new Promise((resolve, reject) => {
  const open = indexedDB.open(DB_NAME, 1);
  open.onsuccess = () => {
    const db = open.result;
    const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(DB_STORE_NAME);
    const request = store.getAll();
    request.onsuccess = function (event) {
      resolve(event.target.result);
    };

    request.onerror = (event) => { reject(event); };

    // Close the db when the transaction is done
    transaction.oncomplete = () => {
      db.close();
    };
    transaction.onerror = function (event) { reject(event); };
  };
  open.onerror = (event) => { reject(event); };
  open.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore(DB_STORE_NAME, { keyPath: 'fileId', autoIncrement: false });
  };
}));

const addCartItem = (files) => (new Promise((resolve, reject) => {
  const open = indexedDB.open(DB_NAME, 1);
  open.onsuccess = () => {
    const db = open.result;
    const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    const itemStore = transaction.objectStore(DB_STORE_NAME);

    files.forEach((file) => {
      itemStore.put({ fileId: file });
    });

    // Close the db when the transaction is done
    transaction.oncomplete = () => {
      db.close();
    };
    transaction.onerror = (event) => { reject(event); };
  };
  open.onerror = function (event) { reject(event); };
  open.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore(DB_STORE_NAME, { keyPath: 'fileId', autoIncrement: false });
  };
}));

const deleteCartItem = (fileId) => (new Promise((resolve, reject) => {
  const open = indexedDB.open(DB_NAME, 1);
  open.onsuccess = function () {
    const db = open.result;
    const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(DB_STORE_NAME);
    const request = store.delete(fileId);
    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => { reject(event); };

    // Close the db when the transaction is done
    transaction.oncomplete = () => {
      db.close();
    };
    transaction.onerror = function (event) { reject(event); };
  };
  open.onerror = function (event) { reject(event); };
  open.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore(DB_STORE_NAME, { keyPath: 'fileId', autoIncrement: false });
  };
}));

const deleteAllCartItem = () => (new Promise((resolve, reject) => {
  const open = indexedDB.open(DB_NAME, 1);
  open.onsuccess = function () {
    const db = open.result;
    const transaction = db.transaction(DB_STORE_NAME, 'readwrite');
    const store = transaction.objectStore(DB_STORE_NAME);
    const req = store.clear();
    req.onsuccess = () => {
      resolve();
    };
    req.onerror = (evt) => {
      reject(evt);
    };
    // Close the db when the transaction is done
    transaction.oncomplete = function () {
      db.close();
    };
    transaction.onerror = function (event) { reject(event); };
  };
  open.onerror = function (event) { reject(event); };
  open.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore(DB_STORE_NAME, { keyPath: 'fileId', autoIncrement: false });
  };
}));

export const actionTypes = {
  INIT_CART: 'INIT_CART',
  ADD_CART_FILES: 'ADD_CART_FILES',
  DELETE_CART_FILE: 'DELETE_CART_FILE',
  DELETE_ALL_CART_FILES: 'DELETE_ALL_CART_FILES',
};

// export const initCart = () => ({
//   type: actionTypes.INIT_CART,
// });

export const onInitCartRedux = (data) => ({
  type: actionTypes.INIT_CART,
  payload: data,
});

// Async action with redux-thunk
export const initCart = () => ((dispatch) => {
  getCartItem()
    .then((data) => {
      dispatch(onInitCartRedux(data));
    });
});

export const onAddCartFilesRedux = (files) => ({
  type: actionTypes.ADD_CART_FILES,
  payload: files,
});

// Async action with redux-thunk
export const onAddCartFiles = (files) => ((dispatch) => {
  dispatch(onAddCartFilesRedux(files));
  addCartItem(files)
    .then(() => {
      // dispatch(onAddCartFilesRedux(files));
    });
});

export const onDeleteCartFileRedux = (fileId) => ({
  type: actionTypes.DELETE_CART_FILE,
  payload: fileId,
});

// Async action with redux-thunk
export const onDeleteCartFile = (fileId) => ((dispatch) => {
  deleteCartItem(fileId)
    .then(() => {
      dispatch(onDeleteCartFileRedux(fileId));
    });
});

export const onDeleteAllCartFileRudex = () => ({
  type: actionTypes.DELETE_ALL_CART_FILES,
});

// Async action with redux-thunk
export const onDeleteAllCartFile = () => ((dispatch) => {
  deleteAllCartItem()
    .then(() => {
      dispatch(onDeleteAllCartFileRudex());
    });
});
