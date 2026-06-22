export const seedData = {
  students: [
    { id: "2620001", name: "Ayesha Rahman",  email: "ayesha@uni.edu", program: "CSE", year: 2 },
    { id: "2620002", name: "Tanvir Hossain", email: "tanvir@uni.edu", program: "EEE", year: 3 },
    { id: "2620003", name: "Priya Das",      email: "priya@uni.edu",  program: "CSE", year: 1 },
  ],
  courses: [
    { id: "C101", name: "Data Structures",  credits: 3, instructor: "Dr. Karim", seats: 30 },
    { id: "C102", name: "Web Engineering",  credits: 3, instructor: "Dr. Noor",  seats: 25 },
    { id: "C103", name: "Database Systems", credits: 4, instructor: "Dr. Islam", seats: 20 },
  ],
  enrollments: [
    { id: "E001", studentId: "2620001", courseId: "C101", date: "2026-01-15" },
    { id: "E002", studentId: "2620002", courseId: "C102", date: "2026-01-16" },
  ],
  grades: [
    { id: "G001", studentId: "2620001", courseId: "C101", grade: 88, semester: "Spring 2026" },
  ],
};