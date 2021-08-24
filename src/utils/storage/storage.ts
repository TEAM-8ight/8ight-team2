export default (storage: any) => ({
  get(key: string) {
    try {
      return JSON.parse(storage.getItem(key));
    } catch (error) {
      return null;
    }
  },
  set(key: string, value: string) {
    storage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    storage.removeItem(key);
  },
  clear() {
    storage.clear();
  },
});
