const fs = require('fs');
const path = require('path');

const locations = {
    'السعودية': {
        country_slug: 'sa',
        adjective: 'السعودية',
        cities: [
            ['الرياض', 'riyadh', 'High'],
            ['جدة', 'jeddah', 'High'],
            ['الدمام', 'dammam', 'High'],
        ]
    },
    'مصر': {
        country_slug: 'eg',
        adjective: 'المصرية',
        cities: [
            ['القاهرة', 'cairo', 'High'],
            ['الجيزة', 'giza', 'High'],
            ['الإسكندرية', 'alexandria', 'High'],
            ['القليوبية', 'qalyubia', 'Standard'],
            ['الشرقية', 'sharqia', 'Standard'],
            ['الدقهلية', 'dakahlia', 'Standard'],
            ['الغربية', 'gharbia', 'Standard'],
            ['المنوفية', 'monufia', 'Standard'],
            ['بورسعيد', 'port-said', 'Medium'],
            ['الإسماعيلية', 'ismailia', 'Medium'],
            ['السويس', 'suez', 'Medium'],
            ['أسيوط', 'assiut', 'Standard'],
            ['الأقصر', 'luxor', 'Standard'],
            ['أسوان', 'aswan', 'Standard'],
            ['بني سويف', 'beni-suef', 'Standard'],
            ['الفيوم', 'fayoum', 'Standard'],
            ['المنيا', 'minya', 'Standard'],
            ['سوهاج', 'sohag', 'Standard'],
            ['البحر الأحمر', 'red-sea', 'Standard'],
            ['الغربية الجديدة (الشيخ زايد/العلمين)', 'new-cairo', 'Standard'],
        ]
    },
    'الإمارات': {
        country_slug: 'ae',
        adjective: 'الإماراتية',
        cities: [
            ['دبي', 'dubai', 'High'],
            ['أبوظبي', 'abu-dhabi', 'High'],
            ['الشارقة', 'sharjah', 'Medium'],
            ['عجمان', 'ajman', 'Medium'],
            ['رأس الخيمة', 'ras-al-khaimah', 'Standard'],
            ['الفجيرة', 'fujairah', 'Standard'],
            ['أم القيوين', 'umm-al-quwain', 'Standard'],
        ]
    },
    'الكويت': {
        country_slug: 'kw',
        adjective: 'الكويتية',
        cities: [
            ['العاصمة', 'al-asimah', 'High'],
            ['حولي', 'hawalli', 'High'],
            ['الفروانية', 'farwaniya', 'High'],
            ['مبارك الكبير', 'mubarak-al-kabeer', 'Standard'],
            ['الأحمدي', 'ahmadi', 'Standard'],
            ['الجهراء', 'jahra', 'Standard'],
        ]
    }
};

const industries = [
    ['الرعاية الصحية', 'healthcare'],
    ['العقارات', 'real-estate'],
    ['التمويل والبنوك', 'finance'],
    ['التجزئة', 'retail'],
    ['الخدمات اللوجستية', 'logistics'],
    ['البناء والتشييد', 'construction']
];

const services = [
    ['Custom Software Development', 'تطوير برمجيات مخصصة', 'custom-software-development'],
    ['AI Automation', 'أتمتة الذكاء الاصطناعي', 'ai-automation'],
    ['Custom CRM Development', 'تطوير أنظمة CRM', 'custom-crm-development'],
    ['ERP Development', 'تطوير أنظمة ERP', 'erp-development'],
    ['Digital Transformation', 'التحول الرقمي', 'digital-transformation'],
    ['Enterprise Web Applications', 'تطوير تطبيقات الويب', 'enterprise-web-applications']
];

const outDir = path.join(__dirname, '..', 'data');
const outPath = path.join(outDir, 'seoPages.json');

if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

let currentId = 1;
const data = {};

for (const [country, c_data] of Object.entries(locations)) {
    const country_slug = c_data.country_slug;
    const adjective = c_data.adjective;
    for (const [city_ar, city_slug, priority] of c_data.cities) {
        for (const [ind_ar, ind_slug] of industries) {
            for (const [srv_en, srv_ar, srv_slug] of services) {
                
                const primaryKeyword = `شركة ${srv_ar} لقطاع ${ind_ar} في ${city_ar}`;
                const secondaryKeywords = `أفضل شركة ${srv_ar} ${city_ar}, حلول ${srv_ar} للشركات ${adjective}, تطوير أنظمة ${ind_ar} ${city_ar}`;
                const keywordTarget = `${srv_slug}-${ind_slug}-${city_slug}`;
                const searchIntent = "Transactional";
                const buyerStage = "Decision";
                const expectedDifficulty = priority === "High" ? "High" : "Medium";
                const landingPageType = "Industry Page";
                const schemaType = "ProfessionalService";
                const metaTitle = `${primaryKeyword} | vDiv`;
                const metaDescription = `تعاقد مع أفضل شركة تقدم خدمات ${srv_ar} لقطاع ${ind_ar} في ${city_ar}. حلول تقنية مخصصة للشركات الكبرى لزيادة الكفاءة التشغيلية.`;
                const suggestedH1 = `حلول ${srv_ar} المتقدمة لقطاع ${ind_ar} في ${city_ar}`;
                const suggestedURLSlug = `${country_slug}/${city_slug}/${ind_slug}/${srv_slug}`;
                const canonicalURL = `https://vdiv.com/${suggestedURLSlug}`;
                const breadcrumb = `الرئيسية > ${country} > ${city_ar} > ${ind_ar} > ${srv_en}`;
                const internalLinkCategory = srv_slug;
                const pageCluster = `${country_slug}-${city_slug}-${ind_slug}`;
                const relatedKeywords = `برمجيات ${ind_ar} للشركات, أتمتة وتقنية ${ind_ar} ${city_ar}`;

                const record = {
                    id: currentId.toString(),
                    country,
                    city: city_ar,
                    industry: ind_ar,
                    language: "ar",
                    serviceCategory: srv_en,
                    primaryKeyword,
                    secondaryKeywords,
                    keywordTarget,
                    searchIntent,
                    buyerStage,
                    priority,
                    expectedDifficulty,
                    landingPageType,
                    schemaType,
                    metaTitle,
                    metaDescription,
                    suggestedH1,
                    suggestedURLSlug,
                    canonicalURL,
                    breadcrumb,
                    internalLinkCategory,
                    pageCluster,
                    relatedKeywords
                };
                
                data[suggestedURLSlug] = record;
                currentId++;
            }
        }
    }
}

fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Generated JSON entirely from JS with ${Object.keys(data).length} entries at ${outPath}`);
