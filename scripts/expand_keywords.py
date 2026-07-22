import csv
import os

# Target Locations
locations = {
    'مصر': {
        'country_slug': 'eg',
        'adjective': 'المصرية',
        'cities': [
            ('القاهرة', 'cairo', 'High'),
            ('الجيزة', 'giza', 'High'),
            ('الإسكندرية', 'alexandria', 'High'),
            ('القليوبية', 'qalyubia', 'Standard'),
            ('الشرقية', 'sharqia', 'Standard'),
            ('الدقهلية', 'dakahlia', 'Standard'),
            ('الغربية', 'gharbia', 'Standard'),
            ('المنوفية', 'monufia', 'Standard'),
            ('بورسعيد', 'port-said', 'Medium'),
            ('الإسماعيلية', 'ismailia', 'Medium'),
            ('السويس', 'suez', 'Medium'),
            ('أسيوط', 'assiut', 'Standard'),
            ('الأقصر', 'luxor', 'Standard'),
            ('أسوان', 'aswan', 'Standard'),
            ('بني سويف', 'beni-suef', 'Standard'),
            ('الفيوم', 'fayoum', 'Standard'),
            ('المنيا', 'minya', 'Standard'),
            ('سوهاج', 'sohag', 'Standard'),
            ('البحر الأحمر', 'red-sea', 'Standard'),
            ('الغربية الجديدة (الشيخ زايد/العلمين)', 'new-cairo', 'Standard'),
        ]
    },
    'الإمارات': {
        'country_slug': 'ae',
        'adjective': 'الإماراتية',
        'cities': [
            ('دبي', 'dubai', 'High'),
            ('أبوظبي', 'abu-dhabi', 'High'),
            ('الشارقة', 'sharjah', 'Medium'),
            ('عجمان', 'ajman', 'Medium'),
            ('رأس الخيمة', 'ras-al-khaimah', 'Standard'),
            ('الفجيرة', 'fujairah', 'Standard'),
            ('أم القيوين', 'umm-al-quwain', 'Standard'),
        ]
    },
    'الكويت': {
        'country_slug': 'kw',
        'adjective': 'الكويتية',
        'cities': [
            ('العاصمة', 'al-asimah', 'High'),
            ('حولي', 'hawalli', 'High'),
            ('الفروانية', 'farwaniya', 'High'),
            ('مبارك الكبير', 'mubarak-al-kabeer', 'Standard'),
            ('الأحمدي', 'ahmadi', 'Standard'),
            ('الجهراء', 'jahra', 'Standard'),
        ]
    }
}

industries = [
    ('الرعاية الصحية', 'healthcare'),
    ('العقارات', 'real-estate'),
    ('التمويل والبنوك', 'finance'),
    ('التجزئة', 'retail'),
    ('الخدمات اللوجستية', 'logistics'),
    ('البناء والتشييد', 'construction')
]

services = [
    ('Custom Software Development', 'تطوير برمجيات مخصصة', 'custom-software-development'),
    ('AI Automation', 'أتمتة الذكاء الاصطناعي', 'ai-automation'),
    ('Custom CRM Development', 'تطوير أنظمة CRM', 'custom-crm-development'),
    ('ERP Development', 'تطوير أنظمة ERP', 'erp-development'),
    ('Digital Transformation', 'التحول الرقمي', 'digital-transformation'),
    ('Enterprise Web Applications', 'تطوير تطبيقات الويب', 'enterprise-web-applications')
]

original_csv = r'd:\Trimax-ProjectV1\trimaxv1\vdiv_100_arabic_keywords.csv'
out_path = r'd:\Trimax-ProjectV1\trimaxv1\vdiv_arabic_keywords_expanded.csv'

# Read existing file to get the last ID and all existing rows
existing_rows = []
last_id = 0
header = []

if os.path.exists(original_csv):
    with open(original_csv, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            existing_rows.append(row)
            try:
                row_id = int(row[0])
                if row_id > last_id:
                    last_id = row_id
            except ValueError:
                pass
else:
    print(f"File not found: {original_csv}")
    exit(1)

# Open a new file to append everything
current_id = last_id + 1
new_rows = []

for country, c_data in locations.items():
    country_slug = c_data['country_slug']
    adjective = c_data['adjective']
    for city_ar, city_slug, priority in c_data['cities']:
        for ind_ar, ind_slug in industries:
            for srv_en, srv_ar, srv_slug in services:
                
                primaryKeyword = f"شركة {srv_ar} لقطاع {ind_ar} في {city_ar}"
                secondaryKeywords = f"أفضل شركة {srv_ar} {city_ar}, حلول {srv_ar} للشركات {adjective}, تطوير أنظمة {ind_ar} {city_ar}"
                keywordTarget = f"{srv_slug}-{ind_slug}-{city_slug}"
                searchIntent = "Transactional"
                buyerStage = "Decision"
                expectedDifficulty = "High" if priority == "High" else "Medium"
                landingPageType = "Industry Page"
                schemaType = "ProfessionalService"
                metaTitle = f"{primaryKeyword} | vDiv"
                metaDescription = f"تعاقد مع أفضل شركة تقدم خدمات {srv_ar} لقطاع {ind_ar} في {city_ar}. حلول تقنية مخصصة للشركات الكبرى لزيادة الكفاءة التشغيلية."
                suggestedH1 = f"حلول {srv_ar} المتقدمة لقطاع {ind_ar} في {city_ar}"
                suggestedURLSlug = f"{country_slug}/{city_slug}/{ind_slug}/{srv_slug}"
                canonicalURL = f"https://vdiv.com/{suggestedURLSlug}"
                breadcrumb = f"الرئيسية > {country} > {city_ar} > {ind_ar} > {srv_en}"
                internalLinkCategory = srv_slug
                pageCluster = f"{country_slug}-{city_slug}-{ind_slug}"
                relatedKeywords = f"برمجيات {ind_ar} للشركات, أتمتة وتقنية {ind_ar} {city_ar}"

                row = [
                    str(current_id),          # id
                    country,                  # country
                    city_ar,                  # city
                    ind_ar,                   # industry
                    "ar",                     # language
                    srv_en,                   # serviceCategory
                    primaryKeyword,           # primaryKeyword
                    secondaryKeywords,        # secondaryKeywords
                    keywordTarget,            # keywordTarget
                    searchIntent,             # searchIntent
                    buyerStage,               # buyerStage
                    priority,                 # priority
                    expectedDifficulty,       # expectedDifficulty
                    landingPageType,          # landingPageType
                    schemaType,               # schemaType
                    metaTitle,                # metaTitle
                    metaDescription,          # metaDescription
                    suggestedH1,              # suggestedH1
                    suggestedURLSlug,         # suggestedURLSlug
                    canonicalURL,             # canonicalURL
                    breadcrumb,               # breadcrumb
                    internalLinkCategory,     # internalLinkCategory
                    pageCluster,              # pageCluster
                    relatedKeywords           # relatedKeywords
                ]
                new_rows.append(row)
                current_id += 1

with open(out_path, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    for row in existing_rows:
        writer.writerow(row)
    for row in new_rows:
        writer.writerow(row)

print(f"Generated {len(new_rows)} new rows.")
print(f"Total rows now: {len(existing_rows) + len(new_rows)}")
print(f"Saved expanded file to: {out_path}")
