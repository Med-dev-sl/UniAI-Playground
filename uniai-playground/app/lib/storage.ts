import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StoredCourseData {
  level: string;
  faculty: string;
  facultyId: string;
  course: string;
  courseId: string;
  courseName: string;
}

export interface StoredUserData {
  email: string;
  userId: string;
}

const COURSE_STORAGE_KEY = "@uniai/course";
const USER_STORAGE_KEY = "@uniai/user";

export async function saveCourseData(data: StoredCourseData): Promise<void> {
  try {
    await AsyncStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save course data:", err);
  }
}

export async function getCourseData(): Promise<StoredCourseData | null> {
  try {
    const data = await AsyncStorage.getItem(COURSE_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Failed to get course data:", err);
    return null;
  }
}

export async function saveUserData(data: StoredUserData): Promise<void> {
  try {
    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save user data:", err);
  }
}

export async function getUserData(): Promise<StoredUserData | null> {
  try {
    const data = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Failed to get user data:", err);
    return null;
  }
}

export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(COURSE_STORAGE_KEY);
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear storage:", err);
  }
}
