import type { Language } from "@/types";

export type TranslationKey =
  | "siteName"
  | "tagline"
  | "navHome"
  | "navLibrary"
  | "navAuthors"
  | "navAbout"
  | "navContact"
  | "heroTitle"
  | "heroSubtitle"
  | "heroSearchPlaceholder"
  | "ctaBrowse"
  | "ctaContribute"
  | "statBooks"
  | "statAuthors"
  | "statReads"
  | "featuredBooks"
  | "newArrivals"
  | "popularAuthors"
  | "browseCategories"
  | "aboutAdab"
  | "aboutAdabText"
  | "quoteOfDay"
  | "viewAll"
  | "libraryTitle"
  | "librarySearchPlaceholder"
  | "sortNewest"
  | "sortPopular"
  | "sortAZ"
  | "sortLabel"
  | "filters"
  | "filterCategory"
  | "filterAuthor"
  | "filterYear"
  | "filterLanguage"
  | "clearAll"
  | "noResults"
  | "noResultsHint"
  | "resultsCount"
  | "readOnline"
  | "downloadPdf"
  | "reportBook"
  | "metaPages"
  | "metaDownloads"
  | "metaReads"
  | "metaYear"
  | "metaPublisher"
  | "metaLanguage"
  | "metaCategory"
  | "metaFileSize"
  | "description"
  | "relatedBooks"
  | "authorBio"
  | "sampleNotice"
  | "backToLibrary"
  | "byAuthor"
  | "readerLoading"
  | "readerError"
  | "pageOf"
  | "zoomIn"
  | "zoomOut"
  | "fitWidth"
  | "fitPage"
  | "fullscreen"
  | "nightMode"
  | "resumeReading"
  | "authorsTitle"
  | "authorsSubtitle"
  | "booksCount"
  | "viewProfile"
  | "notableWorks"
  | "biography"
  | "aboutTitle"
  | "aboutMission"
  | "aboutMissionText"
  | "aboutHistory"
  | "aboutHistoryText"
  | "aboutPreserve"
  | "aboutPreserveText"
  | "contactTitle"
  | "contactSubtitle"
  | "formName"
  | "formEmail"
  | "formMessage"
  | "formSend"
  | "suggestBook"
  | "suggestBookText"
  | "formSuccess"
  | "copyrightTitle"
  | "copyrightPolicy"
  | "copyrightPolicyText"
  | "copyrightTakedown"
  | "copyrightTakedownText"
  | "adminLogin"
  | "adminPassword"
  | "adminLoginButton"
  | "adminWrongPassword"
  | "dashboard"
  | "totalBooks"
  | "totalAuthors"
  | "totalCategories"
  | "totalDownloads"
  | "manageBooks"
  | "manageAuthors"
  | "manageCategories"
  | "addBook"
  | "addAuthor"
  | "addCategory"
  | "editBook"
  | "deleteBook"
  | "fieldTitle"
  | "fieldAuthor"
  | "fieldCategory"
  | "fieldDescription"
  | "fieldYear"
  | "fieldPublisher"
  | "authorNameHint"
  | "pdfFile"
  | "choosePdf"
  | "coverPhoto"
  | "optional"
  | "chooseCover"
  | "removeCover"
  | "errPdfRequired"
  | "errUploadFailed"
  | "uploading"
  | "uploadedBadge"
  | "fieldBio"
  | "fieldEra"
  | "fieldName"
  | "save"
  | "cancel"
  | "logout"
  | "confirmDelete"
  | "yes"
  | "no"
  | "search"
  | "close"
  | "menu"
  | "toggleDark"
  | "toggleLight"
  | "footerTagline"
  | "footerHeartfelt"
  | "statsEmpty"
  | "quickLinks"
  | "rightsReserved"
  | "craftedBy"
  | "whatsappSuggest"
  | "madeWith";

const skr: Record<TranslationKey, string> = {
  siteName: "سرائیکی ادب لائبریری",
  tagline: "وسیب دا علمی ورثہ",
  navHome: "گھر",
  navLibrary: "لائبریری",
  navAuthors: "لکھاری",
  navAbout: "ساݙے بارے",
  navContact: "رابطہ",
  heroTitle: "سرائیکی ادب دا خزانہ",
  heroSubtitle: "ہزاراں سال پرانی تہذیب دیاں کتاباں — پڑھو، ڈاؤن لوڈ کرو، تے وسیب دا ادب زندہ رکھو۔",
  heroSearchPlaceholder: "کتاب، لکھاری یا موضوع لبھو...",
  ctaBrowse: "کتاباں ݙیکھو",
  ctaContribute: "حصہ پاؤ",
  statBooks: "کتاباں",
  statAuthors: "لکھاری",
  statReads: "مطالعے",
  featuredBooks: "چݨویاں کتاباں",
  newArrivals: "نویاں کتاباں",
  popularAuthors: "مشہور لکھاری",
  browseCategories: "زمرے",
  aboutAdab: "سرائیکی ادب بارے",
  aboutAdabText:
    "سرائیکی زبان سندھ وادی دی پنج ہزار سال پرانی تہذیب دی امین ہے۔ خواجہ غلام فرید دیاں کافیاں توں گھن کے اج دے ناول تئیں — ایہ لائبریری وسیب دے ادبی ورثے کوں محفوظ کرݨ دی ہک کوشش ہے۔",
  quoteOfDay: "اج دا شعر",
  viewAll: "ساریاں ݙیکھو",
  libraryTitle: "لائبریری",
  librarySearchPlaceholder: "کتاب لبھو...",
  sortNewest: "نویاں پہلے",
  sortPopular: "زیادہ پڑھیاں ڳئیاں",
  sortAZ: "الف توں ے",
  sortLabel: "ترتیب",
  filters: "فلٹر",
  filterCategory: "زمرہ",
  filterAuthor: "لکھاری",
  filterYear: "سال",
  filterLanguage: "زبان",
  clearAll: "سارے صاف کرو",
  noResults: "کوئی کتاب نہیں ملی",
  noResultsHint: "کجھ ٻیا لبھ کے ݙیکھو یا فلٹر صاف کرو۔",
  resultsCount: "کتاباں ملیاں",
  readOnline: "آن لائن پڑھو",
  downloadPdf: "پی ڈی ایف ڈاؤن لوڈ کرو",
  reportBook: "کتاب دی شکایت",
  metaPages: "صفحے",
  metaDownloads: "ڈاؤن لوڈ",
  metaReads: "مطالعے",
  metaYear: "اشاعت دا سال",
  metaPublisher: "پبلشر",
  metaLanguage: "زبان",
  metaCategory: "زمرہ",
  metaFileSize: "فائل سائز",
  description: "تفصیل",
  relatedBooks: "متعلقہ کتاباں",
  authorBio: "لکھاری بارے",
  sampleNotice: "ایہ نمونہ کتاب ہے — صرف ڈیزائن ݙیکھاݨ کیتے شامل کیتی ڳئی ہے۔",
  backToLibrary: "لائبریری واپس",
  byAuthor: "از",
  readerLoading: "صفحہ لوڈ ہو رہیا ہے...",
  readerError: "فائل لوڈ نہیں ہو سکی",
  pageOf: "صفحہ",
  zoomIn: "وݙا کرو",
  zoomOut: "نکا کرو",
  fitWidth: "چوڑائی مطابق",
  fitPage: "صفحہ مطابق",
  fullscreen: "پوری سکرین",
  nightMode: "رات دا موڈ",
  resumeReading: "جتھاں چھوڑیا ہا اتھاؤں پڑھو",
  authorsTitle: "لکھاری",
  authorsSubtitle: "سرائیکی ادب دے معمار",
  booksCount: "کتاباں",
  viewProfile: "پروفائل ݙیکھو",
  notableWorks: "مشہور کتاباں",
  biography: "سوانح",
  aboutTitle: "ساݙے بارے",
  aboutMission: "ساݙا مشن",
  aboutMissionText:
    "سرائیکی ادب کوں ڈیجیٹل دور وچ محفوظ تے عام کرݨا۔ ہر کتاب مفت پڑھݨ تے ڈاؤن لوڈ کرݨ کیتے دستیاب ہووے — ایہو ساݙا خواب ہے۔",
  aboutHistory: "سرائیکی ادب دی تاریخ",
  aboutHistoryText:
    "سرائیکی زبان دی ادبی روایت صدیاں پرانی ہے۔ خواجہ غلام فرید (1845–1901) سرائیکی دے سب توں وݙے صوفی شاعر ہن۔ انہاں توں بعد احمد خان طارق، شاکر شجاع آبادی تے ٻئے لکھاریاں ایں روایت کوں اڳوں ودھایا۔ کافی، ݙوہڑا، غزل، نظم تے ناول — ہر صنف وچ سرائیکی ادب مالا مال ہے۔",
  aboutPreserve: "محفوظ کرݨ دی اہمیت",
  aboutPreserveText:
    "زباناں مٹدیاں ہن جݙاں انہاں دا ادب مٹ ویندے۔ ڈیجیٹل لائبریری نویں نسل کوں اپݨی ماں بولی نال جوڑݨ دا ذریعہ ہے۔",
  contactTitle: "رابطہ کرو",
  contactSubtitle: "سوال، تجویز یا کتاب دی سفارش — اساں سݨݨ چاہندے ہاں۔",
  formName: "ناں",
  formEmail: "ای میل",
  formMessage: "پیغام",
  formSend: "بھیجو",
  suggestBook: "کتاب تجویز کرو",
  suggestBookText: "کوئی کتاب جیہڑی لائبریری وچ ہووݨی چاہیدی ہے؟ ساکوں ݙسّو۔",
  formSuccess: "تہاݙا پیغام مل ڳیا! جلد جواب ݙیسوں۔",
  copyrightTitle: "کاپی رائٹ پالیسی",
  copyrightPolicy: "پالیسی",
  copyrightPolicyText:
    "ایہ لائبریری صرف پبلک ڈومین یا اجازت نال شائع شدہ مواد رکھدی ہے۔ خواجہ غلام فرید دا دیوان پبلک ڈومین وچ ہے۔ جے کوئی مواد تہاݙے حقوق دی خلاف ورزی کریندا ہے تاں ساکوں ݙسّو — اساں فوری ہٹا ݙیسوں۔",
  copyrightTakedown: "مواد ہٹاوݨ دی درخواست",
  copyrightTakedownText:
    "اپݨا ناں، کتاب دا ناں، تے حقوق دا ثبوت بھیجو۔ اساں 7 ݙینہہ وچ جائزہ گھن کے کارروائی کریسوں۔",
  adminLogin: "ایڈمن لاگ ان",
  adminPassword: "پاس ورڈ",
  adminLoginButton: "داخل تھیو",
  adminWrongPassword: "غلط پاس ورڈ",
  dashboard: "ڈیش بورڈ",
  totalBooks: "کل کتاباں",
  totalAuthors: "کل لکھاری",
  totalCategories: "کل زمرے",
  totalDownloads: "کل ڈاؤن لوڈ",
  manageBooks: "کتاباں سنبھالو",
  manageAuthors: "لکھاری سنبھالو",
  manageCategories: "زمرے سنبھالو",
  addBook: "نویں کتاب",
  addAuthor: "نواں لکھاری",
  addCategory: "نواں زمرہ",
  editBook: "کتاب بدلو",
  deleteBook: "کتاب مٹاؤ",
  fieldTitle: "عنوان",
  fieldAuthor: "لکھاری",
  fieldCategory: "زمرہ",
  fieldDescription: "تفصیل",
  fieldYear: "سال",
  fieldPublisher: "پبلشر",
  authorNameHint: "ناں خود لکھو — جے نواں ہووے تاں آپ بݨ ویسی",
  pdfFile: "PDF فائل",
  choosePdf: "PDF چݨو",
  coverPhoto: "کور فوٹو",
  optional: "اختیاری",
  chooseCover: "فوٹو چݨو",
  removeCover: "ہٹاؤ",
  errPdfRequired: "PDF فائل ضروری ہے",
  errUploadFailed: "اپ لوڈ ناکام تھیا — دوبارہ کوشش کرو",
  uploading: "اپ لوڈ تھیندی پئی ہے…",
  uploadedBadge: "اپ لوڈ تھئی",
  fieldBio: "سوانح",
  fieldEra: "دور",
  fieldName: "نمایاں کتاباں (کوما نال)",
  save: "محفوظ کرو",
  cancel: "منسوخ",
  logout: "باہر نکلو",
  confirmDelete: "کیا تسی واقعی مٹاوݨا چاہندے ہو؟",
  yes: "ہا",
  no: "ناں",
  search: "لبھو",
  close: "بند کرو",
  menu: "مینیو",
  toggleDark: "رات دا موڈ لاؤ",
  toggleLight: "ݙینہہ دا موڈ لاؤ",
  footerTagline: "سرائیکی ادب کیتے ❤️ نال بݨایا ڳیا",
  footerHeartfelt: "اپݨی ماں بولی دا ادب محفوظ رکھو — ایہ ورثہ نویں نسل تئیں پہنچاؤ",
  statsEmpty: "کتاباں جلد آ رہیاں ہن — لائبریری نویں اضافے کیتے تیار ہے۔",
  quickLinks: "فوری لنک",
  rightsReserved: "جملہ حقوق محفوظ ہن",
  craftedBy: "ڈیزائن تے تیاری: اسفند علی",
  whatsappSuggest: "تجویز بھیجو",
  madeWith: "اج رک ڈیزائن نال",
};

const ur: Record<TranslationKey, string> = {
  siteName: "سرائیکی ادب لائبریری",
  tagline: "وسیب کا علمی ورثہ",
  navHome: "ہوم",
  navLibrary: "لائبریری",
  navAuthors: "مصنفین",
  navAbout: "ہمارے بارے میں",
  navContact: "رابطہ",
  heroTitle: "سرائیکی ادب کا خزانہ",
  heroSubtitle: "ہزاروں سال پرانی تہذیب کی کتابیں — پڑھیں، ڈاؤن لوڈ کریں، اور وسیب کے ادب کو زندہ رکھیں۔",
  heroSearchPlaceholder: "کتاب، مصنف یا موضوع تلاش کریں...",
  ctaBrowse: "کتابیں دیکھیں",
  ctaContribute: "حصہ ڈالیں",
  statBooks: "کتابیں",
  statAuthors: "مصنفین",
  statReads: "مطالعے",
  featuredBooks: "منتخب کتابیں",
  newArrivals: "نئی کتابیں",
  popularAuthors: "مشہور مصنفین",
  browseCategories: "زمرے",
  aboutAdab: "سرائیکی ادب کے بارے میں",
  aboutAdabText:
    "سرائیکی زبان وادیِ سندھ کی پانچ ہزار سالہ تہذیب کی امین ہے۔ خواجہ غلام فرید کی کافیوں سے لے کر آج کے ناول تک — یہ لائبریری وسیب کے ادبی ورثے کو محفوظ کرنے کی ایک کوشش ہے۔",
  quoteOfDay: "آج کا شعر",
  viewAll: "سب دیکھیں",
  libraryTitle: "لائبریری",
  librarySearchPlaceholder: "کتاب تلاش کریں...",
  sortNewest: "نئی پہلے",
  sortPopular: "زیادہ پڑھی گئیں",
  sortAZ: "الف سے ے",
  sortLabel: "ترتیب",
  filters: "فلٹر",
  filterCategory: "زمرہ",
  filterAuthor: "مصنف",
  filterYear: "سال",
  filterLanguage: "زبان",
  clearAll: "سب صاف کریں",
  noResults: "کوئی کتاب نہیں ملی",
  noResultsHint: "کچھ اور تلاش کر کے دیکھیں یا فلٹر صاف کریں۔",
  resultsCount: "کتابیں ملیں",
  readOnline: "آن لائن پڑھیں",
  downloadPdf: "پی ڈی ایف ڈاؤن لوڈ کریں",
  reportBook: "کتاب کی شکایت",
  metaPages: "صفحات",
  metaDownloads: "ڈاؤن لوڈ",
  metaReads: "مطالعے",
  metaYear: "اشاعت کا سال",
  metaPublisher: "پبلشر",
  metaLanguage: "زبان",
  metaCategory: "زمرہ",
  metaFileSize: "فائل سائز",
  description: "تفصیل",
  relatedBooks: "متعلقہ کتابیں",
  authorBio: "مصنف کے بارے میں",
  sampleNotice: "یہ نمونہ کتاب ہے — صرف ڈیزائن دکھانے کے لیے شامل کی گئی ہے۔",
  backToLibrary: "لائبریری واپس",
  byAuthor: "از",
  readerLoading: "صفحہ لوڈ ہو رہا ہے...",
  readerError: "فائل لوڈ نہیں ہو سکی",
  pageOf: "صفحہ",
  zoomIn: "بڑا کریں",
  zoomOut: "چھوٹا کریں",
  fitWidth: "چوڑائی کے مطابق",
  fitPage: "صفحے کے مطابق",
  fullscreen: "مکمل اسکرین",
  nightMode: "نائٹ موڈ",
  resumeReading: "جہاں چھوڑا تھا وہاں سے پڑھیں",
  authorsTitle: "مصنفین",
  authorsSubtitle: "سرائیکی ادب کے معمار",
  booksCount: "کتابیں",
  viewProfile: "پروفائل دیکھیں",
  notableWorks: "مشہور تصانیف",
  biography: "سوانح",
  aboutTitle: "ہمارے بارے میں",
  aboutMission: "ہمارا مشن",
  aboutMissionText:
    "سرائیکی ادب کو ڈیجیٹل دور میں محفوظ اور عام کرنا۔ ہر کتاب مفت پڑھنے اور ڈاؤن لوڈ کرنے کے لیے دستیاب ہو — یہی ہمارا خواب ہے۔",
  aboutHistory: "سرائیکی ادب کی تاریخ",
  aboutHistoryText:
    "سرائیکی زبان کی ادبی روایت صدیوں پرانی ہے۔ خواجہ غلام فرید (1845–1901) سرائیکی کے سب سے بڑے صوفی شاعر ہیں۔ ان کے بعد احمد خان طارق، شاکر شجاع آبادی اور دیگر ادیبوں نے اس روایت کو آگے بڑھایا۔ کافی، دوہڑا، غزل، نظم اور ناول — ہر صنف میں سرائیکی ادب مالا مال ہے۔",
  aboutPreserve: "محفوظ کرنے کی اہمیت",
  aboutPreserveText:
    "زبانیں مٹ جاتی ہیں جب ان کا ادب مٹ جاتا ہے۔ ڈیجیٹل لائبریری نئی نسل کو اپنی مادری زبان سے جوڑنے کا ذریعہ ہے۔",
  contactTitle: "رابطہ کریں",
  contactSubtitle: "سوال، تجویز یا کتاب کی سفارش — ہم سننا چاہتے ہیں۔",
  formName: "نام",
  formEmail: "ای میل",
  formMessage: "پیغام",
  formSend: "بھیجیں",
  suggestBook: "کتاب تجویز کریں",
  suggestBookText: "کوئی کتاب جو لائبریری میں ہونی چاہیے؟ ہمیں بتائیں۔",
  formSuccess: "آپ کا پیغام مل گیا! جلد جواب دیں گے۔",
  copyrightTitle: "کاپی رائٹ پالیسی",
  copyrightPolicy: "پالیسی",
  copyrightPolicyText:
    "یہ لائبریری صرف پبلک ڈومین یا اجازت سے شائع شدہ مواد رکھتی ہے۔ خواجہ غلام فرید کا دیوان پبلک ڈومین میں ہے۔ اگر کوئی مواد آپ کے حقوق کی خلاف ورزی کرتا ہے تو ہمیں بتائیں — ہم فوری ہٹا دیں گے۔",
  copyrightTakedown: "مواد ہٹانے کی درخواست",
  copyrightTakedownText:
    "اپنا نام، کتاب کا نام، اور حقوق کا ثبوت بھیجیں۔ ہم 7 دن میں جائزہ لے کر کارروائی کریں گے۔",
  adminLogin: "ایڈمن لاگ اِن",
  adminPassword: "پاس ورڈ",
  adminLoginButton: "داخل ہوں",
  adminWrongPassword: "غلط پاس ورڈ",
  dashboard: "ڈیش بورڈ",
  totalBooks: "کل کتابیں",
  totalAuthors: "کل مصنفین",
  totalCategories: "کل زمرے",
  totalDownloads: "کل ڈاؤن لوڈ",
  manageBooks: "کتابیں سنبھالیں",
  manageAuthors: "مصنفین سنبھالیں",
  manageCategories: "زمرے سنبھالیں",
  addBook: "نئی کتاب",
  addAuthor: "نیا مصنف",
  addCategory: "نیا زمرہ",
  editBook: "کتاب بدلیں",
  deleteBook: "کتاب حذف کریں",
  fieldTitle: "عنوان",
  fieldAuthor: "مصنف",
  fieldCategory: "زمرہ",
  fieldDescription: "تفصیل",
  fieldYear: "سال",
  fieldPublisher: "پبلشر",
  authorNameHint: "نام خود لکھیں — نیا ہو تو خود بن جائے گا",
  pdfFile: "PDF فائل",
  choosePdf: "PDF چنیں",
  coverPhoto: "کور فوٹو",
  optional: "اختیاری",
  chooseCover: "فوٹو چنیں",
  removeCover: "ہٹائیں",
  errPdfRequired: "PDF فائل ضروری ہے",
  errUploadFailed: "اپ لوڈ ناکام ہوا — دوبارہ کوشش کریں",
  uploading: "اپ لوڈ ہو رہی ہے…",
  uploadedBadge: "اپ لوڈ شدہ",
  fieldBio: "سوانح",
  fieldEra: "دور",
  fieldName: "نمایاں تصانیف (کاما سے)",
  save: "محفوظ کریں",
  cancel: "منسوخ",
  logout: "لاگ آؤٹ",
  confirmDelete: "کیا آپ واقعی حذف کرنا چاہتے ہیں؟",
  yes: "ہاں",
  no: "نہیں",
  search: "تلاش",
  close: "بند کریں",
  menu: "مینیو",
  toggleDark: "نائٹ موڈ لگائیں",
  toggleLight: "ڈے موڈ لگائیں",
  footerTagline: "سرائیکی ادب کے لیے ❤️ سے بنایا گیا",
  footerHeartfelt: "اپنی مادری زبان کا ادب محفوظ رکھیں — یہ ورثہ نئی نسل تک پہنچائیں",
  statsEmpty: "کتابیں جلد آ رہی ہیں — لائبریری نئے اضافوں کے لیے تیار ہے۔",
  quickLinks: "فوری لنکس",
  rightsReserved: "جملہ حقوق محفوظ ہیں",
  craftedBy: "ڈیزائن و تیاری: اسفند علی",
  whatsappSuggest: "تجویز بھیجیں",
  madeWith: "اجرک ڈیزائن کے ساتھ",
};

const en: Record<TranslationKey, string> = {
  siteName: "Saraiki Adab Library",
  tagline: "The literary heritage of the Waseb",
  navHome: "Home",
  navLibrary: "Library",
  navAuthors: "Authors",
  navAbout: "About",
  navContact: "Contact",
  heroTitle: "The Treasure of Saraiki Literature",
  heroSubtitle:
    "Books from a five-thousand-year-old civilization — read, download, and keep the literature of the Waseb alive.",
  heroSearchPlaceholder: "Search books, authors, topics...",
  ctaBrowse: "Browse Books",
  ctaContribute: "Contribute",
  statBooks: "Books",
  statAuthors: "Authors",
  statReads: "Reads",
  featuredBooks: "Featured Books",
  newArrivals: "New Arrivals",
  popularAuthors: "Popular Authors",
  browseCategories: "Categories",
  aboutAdab: "About Saraiki Adab",
  aboutAdabText:
    "The Saraiki language is the heir of the Indus Valley's 5,000-year-old civilization. From Khawaja Ghulam Farid's kafis to today's novels — this library is an effort to preserve the literary heritage of the Waseb.",
  quoteOfDay: "Verse of the Day",
  viewAll: "View all",
  libraryTitle: "Library",
  librarySearchPlaceholder: "Search books...",
  sortNewest: "Newest first",
  sortPopular: "Most read",
  sortAZ: "A to Z",
  sortLabel: "Sort",
  filters: "Filters",
  filterCategory: "Category",
  filterAuthor: "Author",
  filterYear: "Year",
  filterLanguage: "Language",
  clearAll: "Clear all",
  noResults: "No books found",
  noResultsHint: "Try a different search or clear the filters.",
  resultsCount: "books found",
  readOnline: "Read Online",
  downloadPdf: "Download PDF",
  reportBook: "Report Book",
  metaPages: "Pages",
  metaDownloads: "Downloads",
  metaReads: "Reads",
  metaYear: "Year",
  metaPublisher: "Publisher",
  metaLanguage: "Language",
  metaCategory: "Category",
  metaFileSize: "File size",
  description: "Description",
  relatedBooks: "Related Books",
  authorBio: "About the Author",
  sampleNotice: "This is a sample book — included only to demonstrate the design.",
  backToLibrary: "Back to Library",
  byAuthor: "by",
  readerLoading: "Loading page...",
  readerError: "Could not load the file",
  pageOf: "Page",
  zoomIn: "Zoom in",
  zoomOut: "Zoom out",
  fitWidth: "Fit width",
  fitPage: "Fit page",
  fullscreen: "Fullscreen",
  nightMode: "Night mode",
  resumeReading: "Resume where you left off",
  authorsTitle: "Authors",
  authorsSubtitle: "The architects of Saraiki literature",
  booksCount: "books",
  viewProfile: "View profile",
  notableWorks: "Notable works",
  biography: "Biography",
  aboutTitle: "About Us",
  aboutMission: "Our Mission",
  aboutMissionText:
    "To preserve and popularize Saraiki literature in the digital age. Every book free to read and download — that is our dream.",
  aboutHistory: "History of Saraiki Literature",
  aboutHistoryText:
    "The literary tradition of the Saraiki language is centuries old. Khawaja Ghulam Farid (1845–1901) is the greatest Sufi poet of Saraiki. After him, Ahmed Khan Tariq, Shakir Shuja Abadi and others carried the tradition forward. Kafi, dohra, ghazal, nazm and novel — Saraiki literature is rich in every genre.",
  aboutPreserve: "Why Preservation Matters",
  aboutPreserveText:
    "Languages die when their literature dies. A digital library connects the new generation with their mother tongue.",
  contactTitle: "Contact Us",
  contactSubtitle: "Questions, suggestions or book recommendations — we'd love to hear from you.",
  formName: "Name",
  formEmail: "Email",
  formMessage: "Message",
  formSend: "Send",
  suggestBook: "Suggest a Book",
  suggestBookText: "A book that belongs in this library? Tell us.",
  formSuccess: "Message received! We'll reply soon.",
  copyrightTitle: "Copyright Policy",
  copyrightPolicy: "Policy",
  copyrightPolicyText:
    "This library only hosts public-domain or authorized material. The Diwan of Khawaja Ghulam Farid is in the public domain. If any content violates your rights, tell us — we will remove it promptly.",
  copyrightTakedown: "Takedown Request",
  copyrightTakedownText:
    "Send your name, the book title, and proof of rights. We will review and act within 7 days.",
  adminLogin: "Admin Login",
  adminPassword: "Password",
  adminLoginButton: "Sign in",
  adminWrongPassword: "Wrong password",
  dashboard: "Dashboard",
  totalBooks: "Total Books",
  totalAuthors: "Total Authors",
  totalCategories: "Total Categories",
  totalDownloads: "Total Downloads",
  manageBooks: "Manage Books",
  manageAuthors: "Manage Authors",
  manageCategories: "Manage Categories",
  addBook: "New Book",
  addAuthor: "New Author",
  addCategory: "New Category",
  editBook: "Edit Book",
  deleteBook: "Delete Book",
  fieldTitle: "Title",
  fieldAuthor: "Author",
  fieldCategory: "Category",
  fieldDescription: "Description",
  fieldYear: "Year",
  fieldPublisher: "Publisher",
  authorNameHint: "Type the name yourself — a new author is created automatically",
  pdfFile: "PDF file",
  choosePdf: "Choose PDF",
  coverPhoto: "Cover photo",
  optional: "Optional",
  chooseCover: "Choose photo",
  removeCover: "Remove",
  errPdfRequired: "A PDF file is required",
  errUploadFailed: "Upload failed — please try again",
  uploading: "Uploading…",
  uploadedBadge: "Uploaded",
  fieldBio: "Biography",
  fieldEra: "Era",
  fieldName: "Notable works (comma separated)",
  save: "Save",
  cancel: "Cancel",
  logout: "Log out",
  confirmDelete: "Are you sure you want to delete this?",
  yes: "Yes",
  no: "No",
  search: "Search",
  close: "Close",
  menu: "Menu",
  toggleDark: "Enable dark mode",
  toggleLight: "Enable light mode",
  footerTagline: "Made with ❤️ for Saraiki Adab",
  footerHeartfelt: "Preserve the literature of your mother tongue — carry this heritage to the next generation",
  statsEmpty: "Books are on their way — the library is ready for new additions.",
  quickLinks: "Quick Links",
  rightsReserved: "All rights reserved",
  craftedBy: "Designed & developed by Asfund Ali",
  whatsappSuggest: "Send a suggestion",
  madeWith: "with Ajrak design",
};

export const translations: Record<Language, Record<TranslationKey, string>> = {
  skr,
  ur,
  en,
};
