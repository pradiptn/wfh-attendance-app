import { create } from 'zustand';
import { attendanceAPI } from '../services/api';

interface Attendance {
  id: number;
  userId: number;
  date: string;
  time: string;
  photo: string;
  notes?: string;
  user?: { name: string; email: string };
}

interface AttendanceState {
  attendances: Attendance[];
  loading: boolean;
  fetchAttendances: (userId?: number) => Promise<void>;
  createAttendance: (data: FormData) => Promise<void>;
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  attendances: [],
  loading: false,
  fetchAttendances: async (userId) => {
    set({ loading: true });
    try {
      const response = await attendanceAPI.getAll(userId);
      set({ attendances: response.data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  createAttendance: async (data) => {
    try {
      await attendanceAPI.create(data);
      await get().fetchAttendances();
    } catch (error) {
      throw error;
    }
  },
}));
