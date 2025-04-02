import { openDB } from 'idb';

const DB_NAME = 'todo_list';
const STORE_NAME = 'todos';
const VERSION = 1;

const dbPromise = openDB(DB_NAME, VERSION, {
  upgrade(db) {
    const store = db.createObjectStore(STORE_NAME, {
      keyPath: 'id',
    });
    store.createIndex('id', 'id');
  },
});

export async function getTodoByKey(key) {
  return (await dbPromise).get(STORE_NAME, key);
}
export async function updateTodo(key, val) {
  return (await dbPromise).put(STORE_NAME, val, key);
}
export async function deleteTodo(key) {
  return (await dbPromise).delete(STORE_NAME, key);
}
export async function clearTodo() {
  return (await dbPromise).clear(STORE_NAME);
}
export async function getTodos() {
  return (await dbPromise).getAllKeys(STORE_NAME);
}
export async function getTodosViaIndex() {
  return (await dbPromise).getAllFromIndex(STORE_NAME);
}
export async function setTodo(key, value) {
  return (await dbPromise).add(STORE_NAME, value, key);
}
