export type ActiveExam = { country: string; examType: 'icfes'; grade: number; updatedAt: number };

export function getActiveExam(): ActiveExam | null {
  try {
    const data = localStorage.getItem('worldexams_active_exam');
    if (!data) return null;
    const parsed = JSON.parse(data);
    if (parsed.examType !== 'icfes' || typeof parsed.grade !== 'number') {
      return null;
    }
    return parsed as ActiveExam;
  } catch (e) {
    return null;
  }
}

export function setActiveExam(exam: Omit<ActiveExam, 'updatedAt'>) {
  try {
    const payload: ActiveExam = { ...exam, updatedAt: Date.now() };
    localStorage.setItem('worldexams_active_exam', JSON.stringify(payload));
  } catch (e) {
    // Ignore quota errors
  }
}

export function clearActiveExam() {
  try {
    localStorage.removeItem('worldexams_active_exam');
  } catch (e) {
    // Ignore
  }
}
