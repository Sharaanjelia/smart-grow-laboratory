import { db } from '../firebase';
import { doc, setDoc, writeBatch } from 'firebase/firestore';
import { newsData, projectsData, teamData } from '../data';
import {
  initialUsers,
  initialTasks,
  initialAttendance,
  initialLmsProjects,
  initialAnnouncements,
  initialApprovalRequests,
  initialNotifications,
  initialApplicants,
  initialSystemLogs
} from '../data/lmsData';

export interface SeedProgress {
  status: 'idle' | 'seeding' | 'success' | 'error';
  message: string;
  logs: string[];
}

export async function seedAllDataToFirebase(onProgress?: (msg: string) => void): Promise<{ success: boolean; message: string }> {
  try {
    const log = (msg: string) => {
      console.log(`[Firebase Seeder] ${msg}`);
      if (onProgress) onProgress(msg);
    };

    log('Starting Firebase Firestore Seeding...');

    // Helper function to seed array to collection
    const seedCollection = async (collectionName: string, items: any[], getId: (item: any, idx: number) => string) => {
      log(`Seeding ${items.length} items into collection '${collectionName}'...`);
      const batch = writeBatch(db);
      
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const itemId = getId(item, i);
        const ref = doc(db, collectionName, itemId);
        batch.set(ref, JSON.parse(JSON.stringify(item)), { merge: true });
      }

      await batch.commit();
      log(`✓ Collection '${collectionName}' successfully seeded!`);
    };

    // 1. News
    await seedCollection('news', newsData, (item) => item.id);

    // 2. Projects
    await seedCollection('projects', projectsData, (item) => item.id);

    // 3. Team
    await seedCollection('team', teamData, (item) => item.id);

    // 4. Users
    await seedCollection('users', initialUsers, (item) => item.id);

    // 5. Tasks
    await seedCollection('tasks', initialTasks, (item) => item.id);

    // 6. Attendance
    await seedCollection('attendance', initialAttendance, (item) => item.id);

    // 7. LMS Projects
    await seedCollection('lms_projects', initialLmsProjects, (item) => item.id);

    // 8. Announcements
    await seedCollection('announcements', initialAnnouncements, (item) => item.id);

    // 9. Approval Requests
    await seedCollection('approval_requests', initialApprovalRequests, (item) => item.id);

    // 10. Notifications
    await seedCollection('notifications', initialNotifications, (item) => item.id);

    // 11. Applicants
    await seedCollection('applicants', initialApplicants, (item) => item.id);

    // 12. System Logs
    await seedCollection('system_logs', initialSystemLogs, (item) => item.id);

    log('🎉 ALL DATA DUMMY SMART GROW SUCCESSFULLY SEEDED TO FIREBASE!');
    return { success: true, message: 'Berhasil mengunggah semua data dummy Smart Grow ke Firebase Firestore!' };
  } catch (error: any) {
    console.error('Firebase seeding error:', error);
    return { success: false, message: error?.message || 'Gagal mengunggah data ke Firebase Firestore.' };
  }
}
