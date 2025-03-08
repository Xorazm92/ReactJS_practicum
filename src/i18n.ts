import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Barcha tarjimalarni birlashtirish uchun yagona resources obyektini yaratamiz
const resources = {
  uz: {
    translation: {
      // Login
      "login.title": "Tizimga Kirish",
      "login.logoAlt": "Login Logo",
      "login.loginLabel": "Login", // Email o‘rniga Login
      "login.loginPlaceholder": "Login kiriting", // Email o‘rniga Login
      "login.loginRequired": "Loginni kiriting!", // Email o‘rniga Login
      "login.passwordLabel": "Parol",
      "login.passwordPlaceholder": "Parol kiriting",
      "login.passwordRequired": "Parolni kiriting!",
      "login.submit": "Kirish",
      "login.success": "Tizimga muvaffaqiyatli kirdingiz!",
      "login.error": "Login yoki parol noto‘g‘ri!", // Email o‘rniga Login
      "login.forgot": "Parolingizni unutdingizmi?",
      "login.forgotLink": "Parolni tiklash",

      // Forgot Password
      "forgot.title": "Parolni Tiklash",
      "forgot.loginLabel": "Login", // Email o‘rniga Login
      "forgot.loginPlaceholder": "Login kiriting", // Email o‘rniga Login
      "forgot.loginRequired": "Loginni kiriting!", // Email o‘rniga Login
      "forgot.submit": "Yuborish",
      "forgot.success": "Parolni tiklash uchun kod loginga yuborildi!", // Email o‘rniga Login
      "forgot.error": "Login topilmadi yoki xatolik yuz berdi!", // Email o‘rniga Login
      "forgot.back": "Tizimga qaytish",

      // Dashboard
      "dashboard.title": "Bosh Sahifa",
      "dashboard.totalDebt": "Jami Qarzlar",
      "dashboard.debtorsCount": "Mijozlar Soni",
      "dashboard.latePayments": "Kechiktirilgan To‘lovlar",
      "dashboard.wallet": "Hamyon",
      "dashboard.latePaymentsTitle": "Kechiktirilgan To‘lovlar",
      "dashboard.debtor": "Mijoz",
      "dashboard.debt": "Qarz",
      "dashboard.dueDate": "Muddat",
      "dashboard.noLatePayments": "Kechiktirilgan to‘lovlar yo‘q.",
      "dashboard.error": "Statistikani yuklashda xatolik yuz berdi!",

      // Create Customer
      "createCustomer.title": "Mijoz Yaratish",
      "createCustomer.nameLabel": "Ism",
      "createCustomer.namePlaceholder": "Ismni kiriting",
      "createCustomer.nameRequired": "Ismni kiriting!",
      "createCustomer.phoneLabel": "Telefon raqami",
      "createCustomer.phonePlaceholder": "+998 90 123 45 67",
      "createCustomer.phoneRequired": "Telefon raqamini kiriting!",
      "createCustomer.addressLabel": "Yashash manzili",
      "createCustomer.addressPlaceholder": "Manzilni kiriting",
      "createCustomer.passportLabel": "Pasport rasmi",
      "createCustomer.passportRequired": "Pasport rasmini yuklang!",
      "createCustomer.uploadButton": "Rasmni tanlash",
      "createCustomer.fileUploaded": "fayli yuklandi",
      "createCustomer.fileError": "faylini yuklashda xatolik yuz berdi",
      "createCustomer.submit": "Saqlash",
      "createCustomer.success": "Mijoz muvaffaqiyatli saqlandi!",
      "createCustomer.error": "Mijozni saqlashda xatolik yuz berdi!",

      // Create Debt
      "createDebt.title": "Yangi Nasiya Yaratish",
      "createDebt.debtorLabel": "Mijoz",
      "createDebt.debtorPlaceholder": "Mijozni tanlang",
      "createDebt.debtorRequired": "Mijozni tanlang!",
      "createDebt.amountLabel": "Miqdor",
      "createDebt.amountPlaceholder": "Miqdorni kiriting",
      "createDebt.amountRequired": "Miqdorni kiriting!",
      "createDebt.descriptionLabel": "Tavsif",
      "createDebt.descriptionPlaceholder": "Tavsif kiriting (masalan, mahsulot nomi)",
      "createDebt.descriptionRequired": "Tavsifni kiriting!",
      "createDebt.dueDateLabel": "Muddat",
      "createDebt.dueDateRequired": "Muddatni kiriting!",
      "createDebt.submit": "Saqlash",
      "createDebt.success": "Nasiya muvaffaqiyatli yaratildi!",
      "createDebt.error": "Nasiyani yaratishda xatolik yuz berdi!",

      // Add Payment
      "addPayment.title": "To‘lov Qabul Qilish",
      "addPayment.debtLabel": "Nasiya",
      "addPayment.debtPlaceholder": "Nasiyani tanlang",
      "addPayment.debtRequired": "Nasiyani tanlang!",
      "addPayment.amountLabel": "To‘lov Miqdori",
      "addPayment.amountPlaceholder": "Miqdorni kiriting",
      "addPayment.amountRequired": "Miqdorni kiriting!",
      "addPayment.submit": "Saqlash",
      "addPayment.success": "To‘lov muvaffaqiyatli qabul qilindi!",
      "addPayment.error": "To‘lovni qabul qilishda xatolik yuz berdi!",

      // Payment History
      "paymentHistory.title": "To‘lov Tarixi",
      "paymentHistory.id": "ID",
      "paymentHistory.debtor": "Mijoz",
      "paymentHistory.amount": "Miqdor",
      "paymentHistory.date": "Sana",
      "paymentHistory.noData": "To‘lovlar mavjud emas",
      "paymentHistory.error": "To‘lov tarixini yuklashda xatolik yuz berdi!",

      // Late Payments
      "latePayments.title": "Kechiktirilgan To‘lovlar Ro‘yxati",
      "latePayments.id": "ID",
      "latePayments.debtor": "Mijoz",
      "latePayments.debt": "Qarz",
      "latePayments.dueDate": "Muddat",
      "latePayments.noData": "Kechiktirilgan to‘lovlar yo‘q",
      "latePayments.error": "Kechiktirilgan to‘lovlarni yuklashda xatolik yuz berdi!",

      // Top Debtors
      "topDebtors.title": "Eng Faol Mijozlar va Eng Katta Nasiya Olganlar",
      "topDebtors.id": "ID",
      "topDebtors.name": "Ism",
      "topDebtors.totalDebt": "Jami Qarz",
      "topDebtors.paymentCount": "To‘lovlar Soni",
      "topDebtors.noData": "Ma’lumotlar mavjud emas",
      "topDebtors.error": "Ma’lumotlarni yuklashda xatolik yuz berdi!",

      // Company Settings
      "companySettings.title": "Kompaniya Ma’lumotlari",
      "companySettings.nameLabel": "Kompaniya Nomi",
      "companySettings.namePlaceholder": "Kompaniya nomini kiriting",
      "companySettings.nameRequired": "Kompaniya nomini kiriting!",
      "companySettings.detailsLabel": "Rekvizitlar",
      "companySettings.detailsPlaceholder": "Rekvizitlarni kiriting",
      "companySettings.detailsRequired": "Rekvizitlarni kiriting!",
      "companySettings.logoLabel": "Logotip",
      "companySettings.uploadButton": "Rasmni tanlash",
      "companySettings.fileUploaded": "fayli yuklandi",
      "companySettings.fileError": "faylini yuklashda xatolik yuz berdi",
      "companySettings.submit": "Saqlash",
      "companySettings.success": "Ma’lumotlar muvaffaqiyatli yangilandi!",
      "companySettings.error": "Ma’lumotlarni yangilashda xatolik yuz berdi!",

      // User Management
      "userManagement.title": "Foydalanuvchilarni Boshqarish",
      "userManagement.id": "ID",
      "userManagement.name": "Ism",
      "userManagement.email": "Email",
      "userManagement.role": "Rol",
      "userManagement.actions": "Amallar",
      "userManagement.edit": "Tahrirlash",
      "userManagement.delete": "O‘chirish",
      "userManagement.editNotImplemented": "Tahrirlash funksiyasi hali amalga oshirilmadi!",
      "userManagement.noData": "Foydalanuvchilar mavjud emas",
      "userManagement.error": "Foydalanuvchilarni yuklashda xatolik yuz berdi!",
      "userManagement.deleteSuccess": "Foydalanuvchi muvaffaqiyatli o‘chirildi!",
      "userManagement.deleteError": "Foydalanuvchini o‘chirishda xatolik yuz berdi!",

      // QR Payment
      "qrPayment.title": "QR Kod orqali To‘lov",
      "qrPayment.description": "QR kodni generatsiya qiling va mijozga to‘lov uchun yuboring.",
      "qrPayment.generate": "QR Kod Generatsiya Qilish",
      "qrPayment.scan": "Mijoz bu QR kodni skaner qilib to‘lovni amalga oshirishi mumkin.",
      "qrPayment.success": "QR kod muvaffaqiyatli generatsiya qilindi!",
      "qrPayment.error": "QR kodni generatsiya qilishda xatolik yuz berdi!",

      // Notification Settings
      "notificationSettings.title": "Bildirishnoma Sozlamalari",
      "notificationSettings.smsLabel": "SMS Bildirishnomalar",
      "notificationSettings.emailLabel": "Email Bildirishnomalar",
      "notificationSettings.submit": "Saqlash",
      "notificationSettings.success": "Sozlamalar muvaffaqiyatli yangilandi!",
      "notificationSettings.error": "Sozlamalarni yangilashda xatolik yuz berdi!",

      // Main Layout
      "layout.logoAlt": "Logotip",
      "layout.home": "Bosh Sahifa",
      "layout.createCustomer": "Mijoz Yaratish",
      "layout.createDebt": "Nasiya Berish",
      "layout.addPayment": "To‘lov Qabul Qilish",
      "layout.paymentHistory": "To‘lov Tarixi",
      "layout.qrPayment": "QR Kod orqali To‘lov",
      "layout.reports": "Hisobotlar",
      "layout.calendar": "Kalendar",
      "layout.latePayments": "Kechiktirilgan To‘lovlar",
      "layout.topDebtors": "Eng Faol Mijozlar",
      "layout.exportImport": "Excel Eksport/Import",
      "layout.settings": "Sozlamalar",
      "layout.companySettings": "Kompaniya Sozlamalari",
      "layout.userManagement": "Foydalanuvchilar",
      "layout.notificationSettings": "Bildirishnoma Sozlamalari",
      "layout.expandMenu": "Menuni ochish",
      "layout.collapseMenu": "Menuni yopish",
      "layout.notifications": "Bildirishnomalar",
      "layout.profile": "Profil",
      "layout.logout": "Chiqish",
      "layout.logoutError": "Chiqishda xatolik yuz berdi!",
    },
  },
  en: {
    translation: {
      // Login
      "login.title": "Login",
      "login.logoAlt": "Login Logo",
      "login.loginLabel": "Login", // Email o‘rniga Login
      "login.loginPlaceholder": "Enter Login", // Email o‘rniga Login
      "login.loginRequired": "Please enter your login!", // Email o‘rniga Login
      "login.passwordLabel": "Password",
      "login.passwordPlaceholder": "Enter Password",
      "login.passwordRequired": "Please enter your password!",
      "login.submit": "Login",
      "login.success": "Successfully logged in!",
      "login.error": "Invalid login or password!", // Email o‘rniga Login
      "login.forgot": "Forgot your password?",
      "login.forgotLink": "Reset Password",

      // Forgot Password
      "forgot.title": "Forgot Password",
      "forgot.loginLabel": "Login", // Email o‘rniga Login
      "forgot.loginPlaceholder": "Enter Login", // Email o‘rniga Login
      "forgot.loginRequired": "Please enter your login!", // Email o‘rniga Login
      "forgot.submit": "Send",
      "forgot.success": "Password reset code sent to your login!", // Email o‘rniga Login
      "forgot.error": "Login not found or an error occurred!", // Email o‘rniga Login
      "forgot.back": "Back to Login",

      // Dashboard
      "dashboard.title": "Dashboard",
      "dashboard.totalDebt": "Total Debts",
      "dashboard.debtorsCount": "Number of Debtors",
      "dashboard.latePayments": "Late Payments",
      "dashboard.wallet": "Wallet",
      "dashboard.latePaymentsTitle": "Late Payments",
      "dashboard.debtor": "Debtor",
      "dashboard.debt": "Debt",
      "dashboard.dueDate": "Due Date",
      "dashboard.noLatePayments": "No late payments.",
      "dashboard.error": "Error loading statistics!",

      // Create Customer
      "createCustomer.title": "Create Customer",
      "createCustomer.nameLabel": "Name",
      "createCustomer.namePlaceholder": "Enter Name",
      "createCustomer.nameRequired": "Please enter name!",
      "createCustomer.phoneLabel": "Phone Number",
      "createCustomer.phonePlaceholder": "+998 90 123 45 67",
      "createCustomer.phoneRequired": "Please enter phone number!",
      "createCustomer.addressLabel": "Address",
      "createCustomer.addressPlaceholder": "Enter Address",
      "createCustomer.passportLabel": "Passport Image",
      "createCustomer.passportRequired": "Please upload passport image!",
      "createCustomer.uploadButton": "Select Image",
      "createCustomer.fileUploaded": "file uploaded",
      "createCustomer.fileError": "file upload failed",
      "createCustomer.submit": "Save",
      "createCustomer.success": "Customer saved successfully!",
      "createCustomer.error": "Error saving customer!",

      // Create Debt
      "createDebt.title": "Create New Debt",
      "createDebt.debtorLabel": "Debtor",
      "createDebt.debtorPlaceholder": "Select Debtor",
      "createDebt.debtorRequired": "Please select a debtor!",
      "createDebt.amountLabel": "Amount",
      "createDebt.amountPlaceholder": "Enter Amount",
      "createDebt.amountRequired": "Please enter amount!",
      "createDebt.descriptionLabel": "Description",
      "createDebt.descriptionPlaceholder": "Enter Description (e.g., product name)",
      "createDebt.descriptionRequired": "Please enter description!",
      "createDebt.dueDateLabel": "Due Date",
      "createDebt.dueDateRequired": "Please enter due date!",
      "createDebt.submit": "Save",
      "createDebt.success": "Debt created successfully!",
      "createDebt.error": "Error creating debt!",

      // Add Payment
      "addPayment.title": "Add Payment",
      "addPayment.debtLabel": "Debt",
      "addPayment.debtPlaceholder": "Select Debt",
      "addPayment.debtRequired": "Please select a debt!",
      "addPayment.amountLabel": "Payment Amount",
      "addPayment.amountPlaceholder": "Enter Amount",
      "addPayment.amountRequired": "Please enter amount!",
      "addPayment.submit": "Save",
      "addPayment.success": "Payment successfully added!",
      "addPayment.error": "Error adding payment!",

      // Payment History
      "paymentHistory.title": "Payment History",
      "paymentHistory.id": "ID",
      "paymentHistory.debtor": "Debtor",
      "paymentHistory.amount": "Amount",
      "paymentHistory.date": "Date",
      "paymentHistory.noData": "No payments available",
      "paymentHistory.error": "Error loading payment history!",

      // Late Payments
      "latePayments.title": "Late Payments List",
      "latePayments.id": "ID",
      "latePayments.debtor": "Debtor",
      "latePayments.debt": "Debt",
      "latePayments.dueDate": "Due Date",
      "latePayments.noData": "No late payments available",
      "latePayments.error": "Error loading late payments!",

      // Top Debtors
      "topDebtors.title": "Top Active Debtors and Highest Debt Holders",
      "topDebtors.id": "ID",
      "topDebtors.name": "Name",
      "topDebtors.totalDebt": "Total Debt",
      "topDebtors.paymentCount": "Payment Count",
      "topDebtors.noData": "No data available",
      "topDebtors.error": "Error loading data!",

      // Company Settings
      "companySettings.title": "Company Settings",
      "companySettings.nameLabel": "Company Name",
      "companySettings.namePlaceholder": "Enter Company Name",
      "companySettings.nameRequired": "Please enter company name!",
      "companySettings.detailsLabel": "Details",
      "companySettings.detailsPlaceholder": "Enter Details",
      "companySettings.detailsRequired": "Please enter details!",
      "companySettings.logoLabel": "Logo",
      "companySettings.uploadButton": "Select Image",
      "companySettings.fileUploaded": "file uploaded",
      "companySettings.fileError": "file upload failed",
      "companySettings.submit": "Save",
      "companySettings.success": "Details updated successfully!",
      "companySettings.error": "Error updating details!",

      // User Management
      "userManagement.title": "User Management",
      "userManagement.id": "ID",
      "userManagement.name": "Name",
      "userManagement.email": "Email",
      "userManagement.role": "Role",
      "userManagement.actions": "Actions",
      "userManagement.edit": "Edit",
      "userManagement.delete": "Delete",
      "userManagement.editNotImplemented": "Edit functionality is not yet implemented!",
      "userManagement.noData": "No users available",
      "userManagement.error": "Error loading users!",
      "userManagement.deleteSuccess": "User deleted successfully!",
      "userManagement.deleteError": "Error deleting user!",

      // QR Payment
      "qrPayment.title": "Payment via QR Code",
      "qrPayment.description": "Generate a QR code and send it to the customer for payment.",
      "qrPayment.generate": "Generate QR Code",
      "qrPayment.scan": "The customer can scan this QR code to make the payment.",
      "qrPayment.success": "QR code generated successfully!",
      "qrPayment.error": "Error generating QR code!",

      // Notification Settings
      "notificationSettings.title": "Notification Settings",
      "notificationSettings.smsLabel": "SMS Notifications",
      "notificationSettings.emailLabel": "Email Notifications",
      "notificationSettings.submit": "Save",
      "notificationSettings.success": "Settings updated successfully!",
      "notificationSettings.error": "Error updating settings!",

      // Main Layout
      "layout.logoAlt": "Logo",
      "layout.home": "Home",
      "layout.createCustomer": "Create Customer",
      "layout.createDebt": "Create Debt",
      "layout.addPayment": "Add Payment",
      "layout.paymentHistory": "Payment History",
      "layout.qrPayment": "Payment via QR Code",
      "layout.reports": "Reports",
      "layout.calendar": "Calendar",
      "layout.latePayments": "Late Payments",
      "layout.topDebtors": "Top Debtors",
      "layout.exportImport": "Excel Export/Import",
      "layout.settings": "Settings",
      "layout.companySettings": "Company Settings",
      "layout.userManagement": "User Management",
      "layout.notificationSettings": "Notification Settings",
      "layout.expandMenu": "Expand Menu",
      "layout.collapseMenu": "Collapse Menu",
      "layout.notifications": "Notifications",
      "layout.profile": "Profile",
      "layout.logout": "Logout",
      "layout.logoutError": "Error logging out!",
    },
  },
};

// i18n ni sozlash
i18n.use(initReactI18next).init({
  resources,
  lng: "uz", // Default til
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;