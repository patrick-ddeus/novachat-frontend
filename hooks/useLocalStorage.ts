import { useState } from 'react';

function useLocalStorage<ValueType>(key: string, initialValue = {}) {
  const [localValue, setLocalValue] = useState<ValueType | {}>(() => {
    try {
      const valueFromLocal = localStorage.getItem(key);
      return valueFromLocal ? JSON.parse(valueFromLocal) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  function saveValue<T extends ValueType>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
    setLocalValue(value);
  }

  function deleteValue(key: string) {
    localStorage.removeItem(key);
    setLocalValue({});
  }

  return { localValue, saveValue, deleteValue };
}

export default useLocalStorage;
