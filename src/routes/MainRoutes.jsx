import { Routes, Route } from "react-router-dom";


import HomePage from "../pages/HomePage";
import AboutUsPage from "../pages/AboutUsPage";
import CoursesPage from "../pages/CoursesPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import FeeStructurePage from "../pages/FeeStructurePage";
import AcademicCalendarPage from "../pages/AcademicCalendarPage";

import ContactPage from "../pages/ContactPage";
import EnrollFormPage from "../pages/EnrollFormPage";
import AdminLayout from "../components/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoutes";


import ResourcesPage from "../pages/ResoursePage";
import AdminDashboard from "../pages/AdminDashboard";
import AdminCoursesPage from "../pages/AdminCoursesPage";
import AdminAddCoursePage from "../pages/AdminAddCoursePage";
import AdminEditCoursePage from "../pages/AdminEditCoursePage";
import AdminEnrollmentsPage from "../pages/AdminEnrollmentsPage";
import AdminResourcesPage from "../pages/AdminResoursePage";
import AdminCalendarPage from "../pages/AdminCalendarPage";
import AdminTestimonialsPage from "../pages/AdminTestimonialPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import AdminContactPage from "../pages/AdminContactPage";


const MainRoutes = () => {
  return (
    <Routes>
     
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:slug" element={<CourseDetailPage />} />
      <Route path="/enroll/:slug" element={<EnrollFormPage />} />
      <Route path="/fee-structure" element={<FeeStructurePage />} />
      <Route path="/academic-calendar" element={<AcademicCalendarPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/contact" element={<ContactPage />} />

     
      <Route path="/admin/login" element={<AdminLoginPage />} />

   
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="courses" element={<ProtectedRoute><AdminCoursesPage /></ProtectedRoute>} />
        <Route path="courses/add" element={<ProtectedRoute><AdminAddCoursePage /></ProtectedRoute>} />
        <Route path="courses/edit/:slug" element={<ProtectedRoute><AdminEditCoursePage/></ProtectedRoute>} />
        <Route path="enrollments" element={<ProtectedRoute><AdminEnrollmentsPage /></ProtectedRoute>} />
        <Route path="resources" element={<ProtectedRoute><AdminResourcesPage /></ProtectedRoute>} />
        <Route path="calendar" element={<ProtectedRoute><AdminCalendarPage /></ProtectedRoute>} />
        <Route path="testimonials" element={<ProtectedRoute><AdminTestimonialsPage /></ProtectedRoute>} />
        <Route path="messages" element={<ProtectedRoute><AdminContactPage /></ProtectedRoute>} />
        

        
      </Route>
    </Routes>
  );
};

export default MainRoutes;



