

const fieldsMap = {
  "tehfeez-ul-quran-course": [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "age", label: "Age", type: "number" },
    { name: "education", label: "Education", type: "text" },
    { name: "phone", label: "Contact number (WhatsApp)", type: "tel", required: true },
    { name: "city", label: "City/Country", type: "text" },
    { name: "attendance90", label: "Can you commit to maintaining a minimum of 90% attendance throughout the course?", type: "radio", options: ["Yes","No"], required: true },
    { name: "manageHours", label: "Tehfeez may require 5–6 hours daily. Can you manage that much time?", type: "radio", options: ["Yes","No"], required: true },
    { name: "learntTajweed", label: "Learnt tajweed before?", type: "radio", options: ["Yes","No"] },
    { name: "previousCourses", label: "Have you taken any previous courses with Al-Huda or Al-Maahir? If yes, specify", type: "text" },
    { name: "heardAbout", label: "How did you hear about us?", type: "text" },
    { name: "recitation", label: "Attach your recitation (audio file)", type: "file", accept: "audio/*" },
    { name: "selectAyat", label: "Select ayat you've not memorized/practiced a lot (short note)", type: "textarea" }
  ],

  "short-hifz-course": [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "age", label: "Age", type: "number" },
    { name: "education", label: "Education", type: "text" },
    { name: "phone", label: "Contact number (WhatsApp)", type: "tel", required: true },
    { name: "city", label: "City/Country", type: "text" },
    { name: "attendance90", label: "Can you commit to maintaining a minimum of 90% attendance throughout the course?", type: "radio", options: ["Yes","No"], required: true },
    { name: "learntTajweed", label: "Learnt tajweed before?", type: "radio", options: ["Yes","No"] },
    { name: "previousCourses", label: "Have you taken previous courses with Al-Huda or Al-Maahir? If yes, specify", type: "text" },
    { name: "heardAbout", label: "How did you hear about us?", type: "text" },
    { name: "recitation", label: "Attach your recitation (audio file)", type: "file", accept: "audio/*" },
    { name: "selectAyat", label: "Select ayat you've not memorized/practiced a lot", type: "textarea" }
  ],

  "personalised-classes": [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "age", label: "Age", type: "number" },
    { name: "education", label: "Education", type: "text" },
    { name: "phone", label: "Contact number (WhatsApp)", type: "tel", required: true },
    { name: "city", label: "City/Country", type: "text" },
    { name: "learntTajweed", label: "Learnt tajweed before?", type: "radio", options: ["Yes","No"] },
    { name: "availableTimes", label: "Select your available time (PKT), mention slots", type: "text", required: true },
    { name: "makeupAgree", label: "We offer make-up classes only in case the teacher misses a session. Do you agree?", type: "radio", options: ["Yes","No"], required: true },
    { name: "previousCourses", label: "Have you taken previous courses with Al-Huda or Al-Maahir? If yes, specify", type: "text" },
    { name: "heardAbout", label: "How did you hear about us?", type: "text" },
    { name: "recitation", label: "Attach your recitation (audio file)", type: "file", accept: "audio/*" },
    { name: "selectAyat", label: "Select ayat you've not memorized/practiced a lot", type: "textarea" }
  ],

  "qawaid-al-tajweed-courses": [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "age", label: "Age", type: "number" },
    { name: "education", label: "Education", type: "text" },
    { name: "phone", label: "Contact number (WhatsApp)", type: "tel", required: true },
    { name: "city", label: "City/Country", type: "text" },
    { name: "learntQawaid", label: "Learnt Tajweed Qawaid before?", type: "radio", options: ["Yes","No"] },
    { name: "attendance90", label: "Can you commit to maintaining a minimum of 90% attendance throughout the course?", type: "radio", options: ["Yes","No"], required: true },
    { name: "previousCourses", label: "Have you taken previous courses with Al-Huda or Al-Maahir? If yes, specify", type: "text" },
    { name: "heardAbout", label: "How did you hear about us?", type: "text" },
    { name: "feeReceipt", label: "Attach your fee receipt", type: "file", accept: "image/*,application/pdf" }
  ],

  "tajweed-al-quran-courses": [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "age", label: "Age", type: "number" },
    { name: "education", label: "Education", type: "text" },
    { name: "phone", label: "Contact number (WhatsApp)", type: "tel", required: true },
    { name: "city", label: "City/Country", type: "text" },
    { name: "learntTajweed", label: "Learnt tajweed before?", type: "radio", options: ["Yes","No"] },
    { name: "attendance90", label: "Can you commit to maintaining a minimum of 90% attendance throughout the course?", type: "radio", options: ["Yes","No"], required: true },
    { name: "previousCourses", label: "Have you taken previous courses with Al-Huda or Al-Maahir? If yes, specify", type: "text" },
    { name: "heardAbout", label: "How did you hear about us?", type: "text" },
    { name: "recitation", label: "Attach your recitation (audio file)", type: "file", accept: "audio/*" },
    { name: "selectAyat", label: "Select ayat you've not memorized/practiced a lot", type: "textarea" }
  ],

  "tarjuma-tul-quran-courses": [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "age", label: "Age", type: "number" },
    { name: "education", label: "Education", type: "text" },
    { name: "phone", label: "Contact number (WhatsApp)", type: "tel", required: true },
    { name: "city", label: "City/Country", type: "text" },
    { name: "learntTarjuma", label: "Learnt tarjuma before?", type: "radio", options: ["Yes","No"] },
    { name: "attendance90", label: "Can you commit to maintaining a minimum of 90% attendance throughout the course?", type: "radio", options: ["Yes","No"], required: true },
    { name: "previousCourses", label: "Have you taken previous courses with Al-Huda or Al-Maahir? If yes, specify", type: "text" },
    { name: "heardAbout", label: "How did you hear about us?", type: "text" },
    { name: "feeReceipt", label: "Attach your fee receipt", type: "file", accept: "image/*,application/pdf" }
  ],

  "sahih-bukhari-course": [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "age", label: "Age", type: "number" },
    { name: "education", label: "Education", type: "text" },
    { name: "phone", label: "Contact number (WhatsApp)", type: "tel", required: true },
    { name: "city", label: "City/Country", type: "text" },
    { name: "attendance90", label: "Can you commit to maintaining a minimum of 90% attendance throughout the course?", type: "radio", options: ["Yes","No"], required: true },
    { name: "previousCourses", label: "Have you taken previous courses with Al-Huda or Al-Maahir? If yes, specify", type: "text" },
    { name: "heardAbout", label: "How did you hear about us?", type: "text" },
    { name: "feeReceipt", label: "Attach your fee receipt", type: "file", accept: "image/*,application/pdf" }
  ],

  "qiraat-ashra-sughra-course": [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "age", label: "Age", type: "number" },
    { name: "education", label: "Education", type: "text" },
    { name: "phone", label: "Contact number (WhatsApp)", type: "tel", required: true },
    { name: "city", label: "City/Country", type: "text" },
    { name: "attendance90", label: "Can you commit to maintaining a minimum of 90% attendance throughout the course?", type: "radio", options: ["Yes","No"], required: true },
    { name: "manageHours", label: "Qiraat course may require 3–4 hours daily. Can you manage that much time?", type: "radio", options: ["Yes","No"] },
    { name: "previousCourses", label: "Have you taken previous courses with Al-Huda or Al-Maahir? If yes, specify", type: "text" },
    { name: "heardAbout", label: "How did you hear about us?", type: "text" },
    { name: "appearedInterview", label: "Did you appear in an interview?", type: "radio", options: ["Yes","No"] },
    { name: "feeReceipt", label: "Attach your fee receipt", type: "file", accept: "image/*,application/pdf" }
  ],
  
  "swat-al-quran": [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "age", label: "Age", type: "number" },
    { name: "education", label: "Education", type: "text" },
    { name: "phone", label: "Contact number (WhatsApp)", type: "tel", required: true },
    { name: "city", label: "City/Country", type: "text" },
    { name: "attendance90", label: "Can you commit to maintaining a minimum of 90% attendance throughout the course?", type: "radio", options: ["Yes","No"], required: true },
    { name: "manageHours", label: "Qiraat course may require 3–4 hours daily. Can you manage that much time?", type: "radio", options: ["Yes","No"] },
    { name: "previousCourses", label: "Have you taken previous courses with Al-Huda or Al-Maahir? If yes, specify", type: "text" },
    { name: "heardAbout", label: "How did you hear about us?", type: "text" },
    { name: "appearedInterview", label: "Did you appear in an interview?", type: "radio", options: ["Yes","No"] },
    { name: "feeReceipt", label: "Attach your fee receipt", type: "file", accept: "image/*,application/pdf" }
  ]
};

export default fieldsMap;
