/**
 * Local storage bilan ishlash uchun yordamchi funksiyalar
 */

/**
 * Ma'lumotni localStorage ga saqlash
 * @param key - Kalit
 * @param value - Qiymat
 */
export const saveState = (key: string, value: any): void => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error('Ma\'lumotni saqlashda xatolik yuz berdi:', err);
  }
};

/**
 * Ma'lumotni localStorage dan olish
 * @param key - Kalit
 * @returns Saqlangan ma'lumot yoki null
 */
export const loadState = (key: string): any => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Ma\'lumotni olishda xatolik yuz berdi:', err);
    return undefined;
  }
};

/**
 * Ma'lumotni localStorage dan o'chirish
 * @param key - Kalit
 */
export const removeState = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error('Ma\'lumotni o\'chirishda xatolik yuz berdi:', err);
  }
};
