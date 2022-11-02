import { UserFetchReults } from '../../features/userSlice';

export async function setLocalStorageItem(key: string, value: string) {
  try {
    await localStorage.setItem(key, value);
  } catch (e) {
    console.log('로컬스토리지가 작동하지 않았습니다. [저장]');
  }
}

export async function getLocalStorageItem(key: string) {
  try {
    const item = await localStorage.getItem(key);
    if (item) {
      const result = JSON.parse(item);
      return result as UserFetchReults;
    }
    return;
  } catch (e) {
    console.log('로컬스토리지가 작동하지 않았습니다. [가져오기]');
  }
}

export async function removeLocalStorageItem(key: string) {
  try {
    await localStorage.removeItem(key);
    console.log('삭제 완료');
  } catch (e) {
    console.log('로컬스토리지 삭제 실패');
  }
}
