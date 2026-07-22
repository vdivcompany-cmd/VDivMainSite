const fs = require('fs');
const path = require('path');

const arPath = path.join(__dirname, '..', 'messages', 'ar.json');
const enPath = path.join(__dirname, '..', 'messages', 'en.json');

const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

arData.Metadata = {
  Home: {
    title: "الرئيسية",
    description: "vDiv - شركة تطوير برمجيات وحلول رقمية رائدة تقدم أنظمة متطورة لتعزيز كفاءة الشركات وتحولها الرقمي."
  },
  About: {
    title: "من نحن",
    description: "تعرف على vDiv، الشركة الرائدة في تقديم الحلول البرمجية المتكاملة، ورؤيتنا في تشكيل مستقبل التكنولوجيا للشركات."
  },
  Projects: {
    title: "المشاريع",
    description: "اكتشف أحدث مشاريع vDiv والأنظمة البرمجية التي قمنا بتطويرها لعملائنا في مختلف القطاعات."
  },
  Contact: {
    title: "تواصل معنا",
    description: "تواصل مع فريق vDiv لبدء مشروعك البرمجي القادم. نحن هنا لمساعدتك في تحقيق أهدافك الرقمية."
  }
};

enData.Metadata = {
  Home: {
    title: "Home",
    description: "vDiv - A leading software development and digital solutions company providing advanced systems to enhance enterprise efficiency and digital transformation."
  },
  About: {
    title: "About Us",
    description: "Learn about vDiv, the leading provider of integrated software solutions, and our vision in shaping the future of technology for enterprises."
  },
  Projects: {
    title: "Projects",
    description: "Discover the latest vDiv projects and software systems we have developed for our clients across various sectors."
  },
  Contact: {
    title: "Contact Us",
    description: "Get in touch with the vDiv team to start your next software project. We are here to help you achieve your digital goals."
  }
};

fs.writeFileSync(arPath, JSON.stringify(arData, null, 2), 'utf8');
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');

console.log('Metadata namespace successfully injected into translation files.');
