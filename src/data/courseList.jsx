

const courseList = [
  {
    id: "tehfeez-al-quran",
    title: "Tehfeez-ul-Quran Course",
    description: "Memorise, Reflect, Transform",
    introduction: `Ready to Begin Your Journey of Quran Memorization?

Have you always dreamed of memorizing the Holy Quran but didn't know where to start? Imagine the sense of accomplishment when you complete the memorization of the entire Quran! At AlMaahir Academy, we bring you an exclusive opportunity to embark on this life-changing journey, from the comfort of your home.`,
    contents: [
      "Flexible Timings: Morning & Evening sessions (9 AM or 5 PM PKT)",
      "Personalized Guidance with expert teachers and self-paced curriculum",
      "All Ladies, All Ages Welcome",
      "Study from anywhere via Zoom",
    ],
    objectives: [
      "Memorize the entire Quran with proper Tajweed",
      "Receive one-on-one support for memorization",
      "Make Hifz achievable for women of all ages",
    ],
    whoCanJoin:
      "All ladies (students, homemakers, professionals) who want to memorize Quran.",
    duration: "Flexible (long-term, based on student’s pace)",
    levels: null,
    days: "Mon–Thu",
    time: "Morning 9 AM or Evening 5 PM PKT",
    startingDate: "Open Enrollment",
    feeStructure: [
      "3000 PKR",
      "$30 (US, UK, Australia)",
      "100 AED (UAE, Qatar)",
      "100 Riyal (Saudia)",
    ],
    medium: "Live on Zoom",
    note: "Whatsapp 03335600182 for an interview (Admission procedure)",
    contact: "03335600182 (WhatsApp text message)",
  },

  {
    id: "short-hifz",
    title: "Short Hifz Course",
    description: "A Heart Engraved with Qur’an",
    introduction: `*Begin Your Journey of Hifz with Al-Mahir – The People of Qur’an*
The Messenger of Allah ﷺ said:
*"It will be said to the companion of the Qur'an: Recite and rise, and be elevated in status with every Ayah, for your rank will be at the last Ayah you recite."*
(Sunan Abi Dawood 1464, Hasan Sahih)`,
    duration: "July – October (4 months)",
    levels: null,
    days: "Mon–Thu",
    time: "6:00 – 6:30 PM",
    startingDate: "24th June (Interview Date: 6–7 PM)",
    contents: [
      "Focused memorization of first half of Juzz 30",
      "Proper Tajweed & consistency",
    ],
    objectives: [
      "Develop fluency in reciting and memorizing with Tajweed",
      "Create a strong foundation for further Hifz journey",
    ],
    whoCanJoin: "Students with fluent recitation (eligibility required).",
    feeStructure: [
      "1000 PKR",
      "$15 (US, UK, Australia)",
      "50 AED (UAE, Qatar)",
      "50 Riyal (Saudia)",
    ],
    medium: "Live on Zoom",
    note: "Interview required before admission.",
    contact: "03335600182 (WhatsApp text message)",
  },

  {
    id: "personalised-classes",
    title: "Personalised Quran Classes",
    description: "Transform your relationship with the Quran today!",
    introduction: `From Beginner to Fluent: Personalised Quran Classes That Work `,
    contents: [
      "Qurani Qaida – Foundation for beginners",
      "Complete Quran – Recitation & memorization",
      "Selected Surahs – Focus on your goals",
    ],
    objectives: [
      "1-on-1 learning with teacher focus",
      "Customised pace & curriculum",
      "Flexible scheduling from home",
    ],
    whoCanJoin: "Anyone (all ages) who wants personalised 1-to-1 Quran learning.",
    duration: "Ongoing (based on student’s preference)",
    levels: null,
    days: "Flexible",
    time: "Slots between 6 AM – 9 PM PKT",
    startingDate: "Open Enrollment",
    feeStructure: ["5000 PKR", "$50 (International)"],
    medium: "Live on Zoom (1-to-1)",
    note: "Limited spots available.",
    contact: "03335600182 (WhatsApp text message)",
  },

  {
    id: "qwaid-al-tajweed",
    title: "Qwaid-al-Tajweed Course",
    description: "Master the Melody of Revelation",
    introduction: `وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا (Surah Al-Muzzammil 73:4)  
"And recite the Qur’an with measured recitation."`,
    duration: "July & August",
    levels: null,
    days: "Mon–Thu",
    time: "5:00 PM – 6:00 PM",
    startingDate: "26th June (Interview Date: 5–6 PM)",
    contents: ["Al Qaul us Sadid", "Tarteel of Para 15 & 16"],
    objectives: [
      "Ensure correct pronunciation & protect original meaning",
      "Beautify recitation with Tajweed",
      "Follow Sunnah of Prophet ﷺ in recitation",
    ],
    whoCanJoin: "Students who know basic Tajweed.",
    feeStructure: [
      "1500 PKR",
      "$20 (US, UK, Australia)",
      "70 AED (UAE, Qatar)",
      "70 Riyal (Saudia)",
    ],
    medium: "Live on Zoom",
    note: "When admissions are closed, it will be updated.",
    contact: "03335600182 (WhatsApp text message)",
  },

  {
    id: "tajweed-al-quran",
    title: "Tajweed-al-Quran Course",
    description: "Preserve the sacred tradition of Quranic Recitation",
    introduction: `بسم الله الرحمن الرحيم
Learning Tajweed is not just about improving recitation; it is a means to earn the pleasure of Allah (سبحانه وتعالى). At Al Maahir, we are committed to providing exemplary Islamic education.`,
    duration: "2 years apprx",
    days: "Mon–Thu",
    time: "Evening: 7:00–8:00 PM",
    startingDate: "January",
    contents: [
      "Tajweed of full Quran (2 years program)",
      "Application of basic tajweed rules",
      "Translation of one ayah from daily lesson",
      "Proper recitation of Salah",
    ],
    objectives: [
      "Perfect your Quranic recitation according to the Sunnah.",
      "Ensure correct pronunciation of Arabic letters and words.",
      "Develop a profound connection with Quran.",
    ],
    whoCanJoin:
      "This course is open to everyone, beginner or experienced, who wants to improve recitation.",
    feeStructure: [
      "1500 PKR",
      "$20 (US, UK, Australia)",
      "70 AED (UAE, Qatar)",
      "70 Riyal (Saudia)",
    ],
    medium: "Live on Zoom",
    note: "When admissions are closed, it will be updated.",
  
    contact: "03335600182 (WhatsApp text message)",
  },

  {
    id: "tarjuma-tul-quran",
    title: "Tarjuma-tul-Quran Course",
    description: "Translation & brief explanation",
    introduction: `Understanding the Qur'an is essential for every Muslim. Our Tarjuma course provides deep study of Qur'an's meanings in your native language.`,
    duration: "6 months (3–4 paras approx)",
    levels: null,
    days: "Mon–Thu",
    time: "4:00 PM – 5:00 PM",
    startingDate: "January & July",
    contents: [
      "Translation and brief explanation of full Quran (5 ayahs daily approx.)",
    ],
    objectives: [
      "Comprehend the message and teachings of the Quran.",
      "Develop deeper relationship with Quran.",
      "Strengthen faith and attain guidance.",
    ],
    whoCanJoin:
      "This course is open to everyone, beginner or experienced, aiming to understand Quran.",
    feeStructure: [
      "1500 PKR",
      "$20 (US, UK, Australia)",
      "70 AED (UAE,Qatar)",
      "70 Riyal (Saudia)",
    ],
    medium: "Live on Zoom",
    note: "When admissions are closed, it will be updated.",
    contact: "03335600182 (WhatsApp text message)",
  },

  {
    id: "sahih-bukhari",
    title: "Sahih Al-Bukhari (Through Ustaza Farhat Hashmi Lectures)",
    description: "Step into the Light of Prophetic Guidance",
    introduction: `Immerse yourself in the wisdom of the Prophet ﷺ through our Sahih Bukhari Course.`,
    duration: "6 months (almost 6–7 chapters)",
    levels: null,
    days: null,
    time: null,
    startingDate: null,
    contents: ["Recorded lectures of Sahih Bukhari"],
    objectives: [
      "Bring the teachings of Islam to life.",
      "Integrate eternal truths into daily practice.",
      "Learn Islamic beliefs & practices through prophetic guidance.",
      "Explore lives of Sahabah & Tabaeen.",
    ],
    whoCanJoin: "Sisters seeking knowledge are welcome.",
    feeStructure: [
      "500 PKR (to be paid per semester)",
      "$15 (US, UK, Australia)",
      "50 AED (UAE, Qatar)",
      "50 Riyal (Saudia)",
    ],
    medium: "Live on Zoom",
    note: "When admissions are closed, it will be updated.",
    contact: "03335600182 (WhatsApp text message)",
  },

  {
  title: "Husn-e-Sawt (Beautiful Recitation)",
  slug: "husn-e-sawt",
  description: "Learn to beautify your Qur’an recitation",
  introduction: `
Learn to Recite the Qur’an with Beauty and Grace  
The beloved Prophet (peace be upon him) stated: زینوا القرآن بأصواتكم  

We warmly invite you to join our Husn-e-Sawt (Beautiful Recitation) course, designed to help you recite the Qur’an with melody, and spiritual depth.

In this course, you will learn:
• Techniques to refine and beautify your voice  
• Proper articulation of letters  
• Ways to make recitation more heartfelt and captivating
`,
  contents: [
    "Voice beautification techniques",
    "Proper articulation of letters",
    "Rhythm & flow of Qur'an recitation"
  ],
  objectives: [
    "Develop a melodious Qur’an recitation",
    "Enhance articulation and clarity",
    "Build emotional depth in recitation"
  ],
  whoCanJoin: "Girls who have excellent Tajweed",
  duration: "Same as Tajweed course",
  days: "Mon–Thu",
  time: "7:00 – 8:00 PM",
  startingDate: "January",
  feeStructure: [
    "1500 PKR",
    "$20 (US, UK, Australia)",
    "70 AED (UAE, Qatar)",
    "70 Riyal (Saudia)"
  ],
  medium: "Live on Zoom",
  note: "Excellent Tajweed is mandatory.",
  contact: "03335600182 (WhatsApp text message)"
},

];

export default courseList;
