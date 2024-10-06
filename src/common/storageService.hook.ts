import {News} from "../components/NewsItem.tsx";

export const STORAGE_KEY = 'news';

export const useStorageService = () => {
  const stringData = localStorage.getItem(STORAGE_KEY);
  const storageData: News[] | null = stringData ? JSON.parse(stringData) : null;

  const setStorageData = (data: News[]) => {
    if (data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
  };

  return {storageData: storageData || null, setStorageData};
};
