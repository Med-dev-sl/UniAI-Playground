export type ProgramLevel = 'degree' | 'diploma' | 'certificate' | 'postgraduate';

export interface University {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
}

export interface Course {
  id: string;
  name: string;
  shortName: string;
  level: ProgramLevel;
  duration: string;
  faculty: string;
  description: string;
}

export interface Faculty {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  universityId: string;
  courses: Course[];
}

export const universities: University[] = [
  {
    id: 'etusl',
    name: 'Eastern Technical University of Sierra Leone',
    shortName: 'ETUSL',
    icon: '🏛️',
    description: 'Excellence in technology and innovation'
  },
  {
    id: 'njala',
    name: 'Njala University',
    shortName: 'Njala',
    icon: '🏫',
    description: 'Leading in agriculture and technology'
  }
];

export const faculties: Faculty[] = [
  {
    id: 'engineering',
    name: 'Faculty of Engineering and Innovation',
    shortName: 'Engineering',
    icon: '⚙️',
    description: 'Building the future through innovation and technology',
    universityId: 'etusl',
    courses: [
      // Degree Programs
      { id: 'eng-elec-deg', name: 'Bachelor of Engineering Honours in Electrical & Electronics Engineering', shortName: 'B.Eng. Electrical', level: 'degree', duration: '4-5 Years', faculty: 'engineering', description: 'Master electrical systems, power electronics, and control systems' },
      { id: 'eng-civil-deg', name: 'Bachelor of Engineering Honours in Civil & Environmental Engineering', shortName: 'B.Eng. Civil', level: 'degree', duration: '4-5 Years', faculty: 'engineering', description: 'Design infrastructure and sustainable solutions' },
      { id: 'eng-mining-deg', name: 'Bachelor of Engineering Honours in Mining Engineering', shortName: 'B.Eng. Mining', level: 'degree', duration: '4-5 Years', faculty: 'engineering', description: 'Extract resources responsibly and efficiently' },
      { id: 'eng-mech-deg', name: 'Bachelor of Engineering Honours in Mechanical & Manufacturing Engineering', shortName: 'B.Eng. Mechanical', level: 'degree', duration: '4-5 Years', faculty: 'engineering', description: 'Design and build mechanical systems and machines' },
      { id: 'eng-agri-deg', name: 'Bachelor of Engineering Honours in Agricultural Engineering', shortName: 'B.Eng. Agricultural', level: 'degree', duration: '4-5 Years', faculty: 'engineering', description: 'Apply engineering to agriculture and food production' },
      { id: 'eng-build-deg', name: 'Bachelor of Technology in Building Construction', shortName: 'B.Tech. Building', level: 'degree', duration: '4 Years', faculty: 'engineering', description: 'Master construction management and building technology' },
      { id: 'eng-renew-deg', name: 'Bachelor of Technology in Renewable Energy', shortName: 'B.Tech. Renewable Energy', level: 'degree', duration: '4 Years', faculty: 'engineering', description: 'Develop sustainable energy solutions' },
      { id: 'eng-ism-deg', name: 'Bachelor of Technology in Information Systems Management', shortName: 'B.Tech. ISM', level: 'degree', duration: '4 Years', faculty: 'engineering', description: 'Manage information systems and technology' },
      // Diploma Programs
      { id: 'eng-elec-hd', name: 'Higher Diploma in Electrical & Electronics Engineering', shortName: 'HD Electrical', level: 'diploma', duration: '3 Years', faculty: 'engineering', description: 'Practical electrical engineering skills' },
      { id: 'eng-civil-hd', name: 'Higher Diploma in Building and Civil Engineering', shortName: 'HD Civil', level: 'diploma', duration: '3 Years', faculty: 'engineering', description: 'Hands-on civil engineering training' },
      { id: 'eng-mech-hd', name: 'Higher Diploma in Mechanical Engineering', shortName: 'HD Mechanical', level: 'diploma', duration: '3 Years', faculty: 'engineering', description: 'Applied mechanical engineering skills' },
      { id: 'eng-auto-hd', name: 'Higher Diploma in Automobile Engineering', shortName: 'HD Automobile', level: 'diploma', duration: '3 Years', faculty: 'engineering', description: 'Automotive systems and maintenance' },
      { id: 'eng-ict-hd', name: 'Higher Diploma in Information & Communication Technology', shortName: 'HD ICT', level: 'diploma', duration: '3 Years', faculty: 'engineering', description: 'ICT infrastructure and systems' },
      { id: 'eng-renew-hd', name: 'Higher Diploma in Renewable Energy', shortName: 'HD Renewable', level: 'diploma', duration: '3 Years', faculty: 'engineering', description: 'Renewable energy systems' },
      { id: 'eng-ict-od', name: 'Ordinary Diploma in Information and Communication Technology', shortName: 'OD ICT', level: 'diploma', duration: '2 Years', faculty: 'engineering', description: 'Foundation ICT skills' },
      { id: 'eng-civil-od', name: 'Ordinary Diploma in Building and Civil Engineering', shortName: 'OD Civil', level: 'diploma', duration: '2 Years', faculty: 'engineering', description: 'Foundation civil engineering' },
      { id: 'eng-mech-od', name: 'Ordinary Diploma in Mechanical Engineering', shortName: 'OD Mechanical', level: 'diploma', duration: '2 Years', faculty: 'engineering', description: 'Foundation mechanical skills' },
      { id: 'eng-auto-od', name: 'Ordinary Diploma in Automobile Engineering', shortName: 'OD Automobile', level: 'diploma', duration: '2 Years', faculty: 'engineering', description: 'Foundation automotive skills' },
      { id: 'eng-elec-od', name: 'Ordinary Diploma in Electrical & Electronics Engineering', shortName: 'OD Electrical', level: 'diploma', duration: '2 Years', faculty: 'engineering', description: 'Foundation electrical skills' },
      { id: 'eng-waste-od', name: 'Ordinary Diploma in Municipal and Urban Waste Management', shortName: 'OD Waste Mgmt', level: 'diploma', duration: '2 Years', faculty: 'engineering', description: 'Waste management systems' },
      { id: 'eng-renew-od', name: 'Ordinary Diploma in Renewable Energy', shortName: 'OD Renewable', level: 'diploma', duration: '2 Years', faculty: 'engineering', description: 'Foundation renewable energy' },
      // Certificate Programs
      { id: 'eng-solar-tc', name: 'Technical Certificate in Renewable Energy (Solar PV)', shortName: 'TC Solar PV', level: 'certificate', duration: '1 Year', faculty: 'engineering', description: 'Solar PV installation and maintenance' },
      { id: 'eng-ict-tc', name: 'Technical Certificate in Information and Communication Technology', shortName: 'TC ICT', level: 'certificate', duration: '1 Year', faculty: 'engineering', description: 'Essential ICT skills' },
      { id: 'eng-waste-tc', name: 'Technical Certificate in Municipal and Urban Waste Management', shortName: 'TC Waste Mgmt', level: 'certificate', duration: '1 Year', faculty: 'engineering', description: 'Waste management basics' },
      { id: 'eng-solar-vc', name: 'Vocational Certificate in Renewable Energy (Solar PV)', shortName: 'VC Solar PV', level: 'certificate', duration: '2 Years', faculty: 'engineering', description: 'Practical solar PV skills' },
    ]
  },
  {
    id: 'vocational',
    name: 'Faculty of Vocational and Skills Development Studies',
    shortName: 'Vocational',
    icon: '🔧',
    description: 'Practical skills for real-world success',
    universityId: 'etusl',
    courses: [
      // Degree Programs
      { id: 'voc-plumb-deg', name: 'Bachelor of Technology in Plumbing', shortName: 'B.Tech. Plumbing', level: 'degree', duration: '4 Years', faculty: 'vocational', description: 'Advanced plumbing systems and management' },
      { id: 'voc-wood-deg', name: 'Bachelor of Technology in Wood Product Processing', shortName: 'B.Tech. Woodwork', level: 'degree', duration: '4 Years', faculty: 'vocational', description: 'Wood processing and manufacturing' },
      { id: 'voc-fashion-deg', name: 'Bachelor of Science in Fashion & Design', shortName: 'B.Sc. Fashion', level: 'degree', duration: '4 Years', faculty: 'vocational', description: 'Fashion design and industry management' },
      // Diploma Programs
      { id: 'voc-dress-od', name: 'Ordinary Diploma in Dress Making & Designing', shortName: 'OD Dressmaking', level: 'diploma', duration: '2 Years', faculty: 'vocational', description: 'Garment creation and design' },
      { id: 'voc-hotel-od', name: 'Ordinary Diploma in Hotel and Tourism', shortName: 'OD Hotel & Tourism', level: 'diploma', duration: '2 Years', faculty: 'vocational', description: 'Hospitality and tourism management' },
      { id: 'voc-home-od', name: 'Ordinary Diploma in Home Sciences', shortName: 'OD Home Sciences', level: 'diploma', duration: '2 Years', faculty: 'vocational', description: 'Home management and sciences' },
      { id: 'voc-fashion-od', name: 'Ordinary Diploma in Fashion and Design', shortName: 'OD Fashion', level: 'diploma', duration: '2 Years', faculty: 'vocational', description: 'Fashion fundamentals' },
      // Certificate Programs
      { id: 'voc-masonry-tc', name: 'Technical Certificate in Masonry', shortName: 'TC Masonry', level: 'certificate', duration: '1 Year', faculty: 'vocational', description: 'Masonry and construction skills' },
      { id: 'voc-plumb-tc', name: 'Technical Certificate in Plumbing and Pipe Fitting', shortName: 'TC Plumbing', level: 'certificate', duration: '1 Year', faculty: 'vocational', description: 'Plumbing and pipe fitting skills' },
      { id: 'voc-survey-tc', name: 'Technical Certificate in Land Surveying and Geomantic', shortName: 'TC Surveying', level: 'certificate', duration: '1 Year', faculty: 'vocational', description: 'Land surveying techniques' },
      { id: 'voc-auto-tc', name: 'Technical Certificate in Automobile Technology', shortName: 'TC Auto Tech', level: 'certificate', duration: '1 Year', faculty: 'vocational', description: 'Automotive technology skills' },
      { id: 'voc-elec-tc', name: 'Technical Certificate in Electrical Technology', shortName: 'TC Electrical', level: 'certificate', duration: '1 Year', faculty: 'vocational', description: 'Electrical installation and maintenance' },
      { id: 'voc-mech-tc', name: 'Technical Certificate in Mechanical Technology', shortName: 'TC Mechanical', level: 'certificate', duration: '1 Year', faculty: 'vocational', description: 'Mechanical systems and repair' },
      { id: 'voc-catering-tc', name: 'Technical Certificate in Catering', shortName: 'TC Catering', level: 'certificate', duration: '1 Year', faculty: 'vocational', description: 'Culinary arts and food service' },
      { id: 'voc-dress-tc', name: 'Technical Certificate in Dress Making & Designing', shortName: 'TC Dressmaking', level: 'certificate', duration: '1 Year', faculty: 'vocational', description: 'Basic garment construction' },
      { id: 'voc-carp-vc', name: 'Vocational Certificate in Carpentry and Joinery', shortName: 'VC Carpentry', level: 'certificate', duration: '2 Years', faculty: 'vocational', description: 'Woodworking and joinery' },
      { id: 'voc-masonry-vc', name: 'Vocational Certificate in Masonry & Tiling', shortName: 'VC Masonry', level: 'certificate', duration: '2 Years', faculty: 'vocational', description: 'Masonry and tiling skills' },
      { id: 'voc-plumb-vc', name: 'Vocational Certificate in Plumbing and Pipefitting', shortName: 'VC Plumbing', level: 'certificate', duration: '2 Years', faculty: 'vocational', description: 'Plumbing fundamentals' },
      { id: 'voc-mech-vc', name: 'Vocational Certificate in Mechanical Technology', shortName: 'VC Mechanical', level: 'certificate', duration: '2 Years', faculty: 'vocational', description: 'Basic mechanical skills' },
      { id: 'voc-weld-vc', name: 'Vocational Certificate in Fabrication and Welding', shortName: 'VC Welding', level: 'certificate', duration: '2 Years', faculty: 'vocational', description: 'Metal fabrication and welding' },
      { id: 'voc-auto-vc', name: 'Vocational Certificate in Automobile Technology', shortName: 'VC Auto Tech', level: 'certificate', duration: '2 Years', faculty: 'vocational', description: 'Automotive maintenance basics' },
      { id: 'voc-elec-vc', name: 'Vocational Certificate in Electrical Technology', shortName: 'VC Electrical', level: 'certificate', duration: '2 Years', faculty: 'vocational', description: 'Basic electrical skills' },
      { id: 'voc-catering-vc', name: 'Vocational Certificate in Catering', shortName: 'VC Catering', level: 'certificate', duration: '2 Years', faculty: 'vocational', description: 'Food preparation and service' },
    ]
  },
  {
    id: 'sciences',
    name: 'Faculty of Pure and Applied Sciences',
    shortName: 'Sciences',
    icon: '🔬',
    description: 'Exploring the natural world through scientific inquiry',
    universityId: 'etusl',
    courses: [
      // Degree Programs
      { id: 'sci-chem-phys', name: 'B.Sc.(Hon) in Chemistry (Major) and Physics (Minor)', shortName: 'B.Sc. Chemistry/Physics', level: 'degree', duration: '4 Years', faculty: 'sciences', description: 'Chemistry with physics foundations' },
      { id: 'sci-chem-math', name: 'B.Sc. (Hon) Chemistry (Major) and Mathematics (Minor)', shortName: 'B.Sc. Chemistry/Math', level: 'degree', duration: '4 Years', faculty: 'sciences', description: 'Chemistry with mathematical analysis' },
      { id: 'sci-geo-phys', name: 'B.Sc. (Hon) in Geography (Major) and Physics (Minor)', shortName: 'B.Sc. Geography/Physics', level: 'degree', duration: '4 Years', faculty: 'sciences', description: 'Geography with physics applications' },
      { id: 'sci-env', name: 'B.Sc.(Hon) in Environmental Sciences', shortName: 'B.Sc. Environmental', level: 'degree', duration: '4 Years', faculty: 'sciences', description: 'Environmental science with various options' },
      { id: 'sci-bio', name: 'B.Sc. (Hon) Biological Sciences', shortName: 'B.Sc. Biology', level: 'degree', duration: '4 Years', faculty: 'sciences', description: 'Comprehensive biological sciences' },
      { id: 'sci-env-bio', name: 'B.Sc(Hon) in Environmental Sciences (Biology, Ecology, Wildlife)', shortName: 'B.Sc. Env/Biology', level: 'degree', duration: '4 Years', faculty: 'sciences', description: 'Environmental biology and conservation' },
      { id: 'sci-phys', name: 'B.Sc(Hon) in Physics (Major) with various Minors', shortName: 'B.Sc. Physics', level: 'degree', duration: '4 Years', faculty: 'sciences', description: 'Physics with various minor options' },
      { id: 'sci-phys-cs', name: 'B.Sc(Hon) in Physics with Computer Science option', shortName: 'B.Sc. Physics/CS', level: 'degree', duration: '4 Years', faculty: 'sciences', description: 'Physics with computational focus' },
      { id: 'sci-math', name: 'B.Sc. (Hon) in Mathematics (Major) with various Minors', shortName: 'B.Sc. Mathematics', level: 'degree', duration: '4 Years', faculty: 'sciences', description: 'Mathematics with various applications' },
      // Diploma Programs
      { id: 'sci-lab-hd', name: 'Higher Diploma in Science Laboratory Technology', shortName: 'HD Lab Tech', level: 'diploma', duration: '3 Years', faculty: 'sciences', description: 'Laboratory techniques and management' },
      { id: 'sci-math-hd', name: 'Higher Diploma in Mathematics', shortName: 'HD Mathematics', level: 'diploma', duration: '3 Years', faculty: 'sciences', description: 'Applied mathematics' },
      { id: 'sci-stat-hd', name: 'Higher Diploma in Statistics and Demography', shortName: 'HD Statistics', level: 'diploma', duration: '3 Years', faculty: 'sciences', description: 'Statistical analysis and demographics' },
      { id: 'sci-bio-hd', name: 'Higher Diploma in Biological Sciences', shortName: 'HD Biology', level: 'diploma', duration: '3 Years', faculty: 'sciences', description: 'Biological sciences training' },
      { id: 'sci-lab-od', name: 'Ordinary Diploma in School Laboratory Science', shortName: 'OD Lab Science', level: 'diploma', duration: '2 Years', faculty: 'sciences', description: 'School laboratory management' },
      { id: 'sci-bio-od', name: 'Ordinary Diploma in Biological Sciences', shortName: 'OD Biology', level: 'diploma', duration: '2 Years', faculty: 'sciences', description: 'Foundation biology' },
      { id: 'sci-stat-od', name: 'Ordinary Diploma in Statistics and Demography', shortName: 'OD Statistics', level: 'diploma', duration: '2 Years', faculty: 'sciences', description: 'Basic statistics and demographics' },
      { id: 'sci-math-od', name: 'Ordinary Diploma in Mathematics', shortName: 'OD Mathematics', level: 'diploma', duration: '2 Years', faculty: 'sciences', description: 'Foundation mathematics' },
    ]
  },
  {
    id: 'health',
    name: 'Faculty of Health Sciences and Disaster Management',
    shortName: 'Health Sciences',
    icon: '🏥',
    description: 'Caring for communities through health and safety',
    universityId: 'etusl',
    courses: [
      // Degree Programs
      { id: 'health-nurse-clin', name: 'B.Sc. (Hon) in Nursing (Clinical)', shortName: 'B.Sc. Nursing Clinical', level: 'degree', duration: '4 Years', faculty: 'health', description: 'Clinical nursing with specializations' },
      { id: 'health-nurse-edu', name: 'B.Sc. (Hon) in Nursing (Education)', shortName: 'B.Sc. Nursing Education', level: 'degree', duration: '4 Years', faculty: 'health', description: 'Nursing education and training' },
      { id: 'health-pub', name: 'B.Sc. (Hon) in Public Health', shortName: 'B.Sc. Public Health', level: 'degree', duration: '4 Years', faculty: 'health', description: 'Community and public health' },
      { id: 'health-hims', name: 'B.Sc. (Hon) in Health Information Management Systems', shortName: 'B.Sc. HIMS', level: 'degree', duration: '4 Years', faculty: 'health', description: 'Health information systems management' },
      { id: 'health-bhe', name: 'B.Sc. (Hon) in Behavioural and Health Education', shortName: 'B.Sc. Health Education', level: 'degree', duration: '4 Years', faculty: 'health', description: 'Health behavior and education' },
      // Diploma Programs
      { id: 'health-srn', name: 'Higher Diploma in Nursing/State Registered Nurse', shortName: 'HD SRN', level: 'diploma', duration: '3 Years', faculty: 'health', description: 'Registered nursing certification' },
      { id: 'health-cho', name: 'Higher Diploma in Community Health Officer', shortName: 'HD CHO', level: 'diploma', duration: '3 Years', faculty: 'health', description: 'Community health management' },
      { id: 'health-pub-hd', name: 'Higher Diploma in Public Health', shortName: 'HD Public Health', level: 'diploma', duration: '3 Years', faculty: 'health', description: 'Public health practice' },
      { id: 'health-lab-hd', name: 'Higher Diploma in Medical Laboratory Sciences', shortName: 'HD Med Lab', level: 'diploma', duration: '3 Years', faculty: 'health', description: 'Medical laboratory techniques' },
      { id: 'health-lab-od', name: 'Ordinary Diploma in Medical Laboratory Sciences', shortName: 'OD Med Lab', level: 'diploma', duration: '2 Years', faculty: 'health', description: 'Basic medical laboratory skills' },
    ]
  },
  {
    id: 'agriculture',
    name: 'Faculty of Development Agriculture and Natural Resources Management',
    shortName: 'Agriculture',
    icon: '🌾',
    description: 'Sustainable agriculture and resource management',
    universityId: 'etusl',
    courses: [
      // Degree Programs
      { id: 'agri-bus', name: 'B.Sc in Agribusiness', shortName: 'B.Sc. Agribusiness', level: 'degree', duration: '4 Years', faculty: 'agriculture', description: 'Agricultural business management' },
      { id: 'agri-econ', name: 'B.Sc in Agricultural Economics', shortName: 'B.Sc. Agri Economics', level: 'degree', duration: '4 Years', faculty: 'agriculture', description: 'Economics of agriculture' },
      { id: 'agri-gen', name: 'B.Sc in Agriculture General', shortName: 'B.Sc. Agriculture', level: 'degree', duration: '4 Years', faculty: 'agriculture', description: 'General agricultural sciences' },
      { id: 'agri-ext', name: 'B.Sc in Agricultural Extension and Rural Sociology', shortName: 'B.Sc. Agri Extension', level: 'degree', duration: '4 Years', faculty: 'agriculture', description: 'Agricultural outreach and rural development' },
      { id: 'agri-animal', name: 'B.Sc in Animal Science', shortName: 'B.Sc. Animal Science', level: 'degree', duration: '4 Years', faculty: 'agriculture', description: 'Animal husbandry and production' },
      { id: 'agri-agro', name: 'B.Sc in Agronomy', shortName: 'B.Sc. Agronomy', level: 'degree', duration: '4 Years', faculty: 'agriculture', description: 'Crop and soil science' },
      { id: 'agri-nutri', name: 'B.Sc in Nutrition and Dietetics', shortName: 'B.Sc. Nutrition', level: 'degree', duration: '4 Years', faculty: 'agriculture', description: 'Nutrition science and dietetics' },
      { id: 'agri-fish', name: 'B.Sc in Fisheries Management', shortName: 'B.Sc. Fisheries', level: 'degree', duration: '4 Years', faculty: 'agriculture', description: 'Fisheries and aquaculture' },
      { id: 'agri-home', name: 'B.Sc in Home Economics General', shortName: 'B.Sc. Home Economics', level: 'degree', duration: '4 Years', faculty: 'agriculture', description: 'Home economics and management' },
      // Diploma Programs
      { id: 'agri-hd', name: 'Higher Diploma in Agriculture', shortName: 'HD Agriculture', level: 'diploma', duration: '3 Years', faculty: 'agriculture', description: 'Applied agricultural training' },
      { id: 'agri-od', name: 'Ordinary Diploma in Agriculture', shortName: 'OD Agriculture', level: 'diploma', duration: '2 Years', faculty: 'agriculture', description: 'Foundation agricultural skills' },
      // Certificate Programs
      { id: 'agri-tc', name: 'Technical Certificate in Agriculture', shortName: 'TC Agriculture', level: 'certificate', duration: '1 Year', faculty: 'agriculture', description: 'Basic agricultural techniques' },
      { id: 'agri-vc', name: 'Vocational Certificate in Agriculture', shortName: 'VC Agriculture', level: 'certificate', duration: '2 Years', faculty: 'agriculture', description: 'Practical farming skills' },
    ]
  },
  {
    id: 'education',
    name: 'Faculty of Education',
    shortName: 'Education',
    icon: '📚',
    description: 'Shaping the educators of tomorrow',
    universityId: 'etusl',
    courses: [
      // Degree Programs - Technical and Vocational Education
      { id: 'edu-plumb', name: 'Bachelor of Technical and Vocational Education (Plumbing Technology)', shortName: 'B.Tech.Voc.Ed. Plumbing', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Technical education in plumbing' },
      { id: 'edu-elec', name: 'Bachelor of Technical and Vocational Education (Electrical and Electronics)', shortName: 'B.Tech.Voc.Ed. Electrical', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Technical education in electrical systems' },
      { id: 'edu-build', name: 'Bachelor of Technical and Vocational Education (Building Construction)', shortName: 'B.Tech.Voc.Ed. Building', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Technical education in construction' },
      { id: 'edu-wood', name: 'Bachelor of Technical and Vocational Education (Woodwork Technology)', shortName: 'B.Tech.Voc.Ed. Woodwork', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Technical education in woodworking' },
      { id: 'edu-agri', name: 'B.Sc in Agricultural Education', shortName: 'B.Sc. Agri Education', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Agricultural education methods' },
      // Science Education
      { id: 'edu-math', name: 'Bachelor of Science Education in Mathematics', shortName: 'B.Sc.Ed. Mathematics', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Mathematics education' },
      { id: 'edu-chem', name: 'Bachelor of Science Education in Chemistry', shortName: 'B.Sc.Ed. Chemistry', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Chemistry education' },
      { id: 'edu-phys', name: 'Bachelor of Science Education in Physics', shortName: 'B.Sc.Ed. Physics', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Physics education' },
      { id: 'edu-bio', name: 'Bachelor of Science Education in Biology', shortName: 'B.Sc.Ed. Biology', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Biology education' },
      { id: 'edu-hk', name: 'Bachelor of Science Education in Human Kinetics and Health Education', shortName: 'B.Sc.Ed. HKHE', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Physical and health education' },
      { id: 'edu-home', name: 'Bachelor of Science Education in Home Economics', shortName: 'B.Sc.Ed. Home Econ', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Home economics education' },
      // Bachelor of Education
      { id: 'edu-comm-dev', name: 'Bachelor of Education in Community Development Studies', shortName: 'B.Ed. Community Dev', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Community development education' },
      { id: 'edu-agri-sci', name: 'Bachelor of Education in Agricultural Science', shortName: 'B.Ed. Agri Science', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Agricultural science teaching' },
      { id: 'edu-comm-std', name: 'Bachelor of Education in Commercial Studies', shortName: 'B.Ed. Commercial', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Commercial studies education' },
      { id: 'edu-math-comp', name: 'Bachelor of Education in Mathematics with Computing', shortName: 'B.Ed. Math/Computing', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Mathematics and computing education' },
      { id: 'edu-admin', name: 'Bachelor of Education in Educational Administration & Management', shortName: 'B.Ed. Admin', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Educational leadership and management' },
      { id: 'edu-measure', name: 'Bachelor of Education in Measurement and Evaluation', shortName: 'B.Ed. Assessment', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Educational assessment methods' },
      { id: 'edu-counsel', name: 'Bachelor of Education in Guidance & Counselling', shortName: 'B.Ed. Counselling', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Educational counselling' },
      { id: 'edu-int-sci', name: 'Bachelor of Education in Integrated Science', shortName: 'B.Ed. Integrated Sci', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Integrated science teaching' },
      { id: 'edu-social', name: 'Bachelor of Education in Social Studies', shortName: 'B.Ed. Social Studies', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Social studies education' },
      { id: 'edu-early', name: 'Bachelor of Education in Early Childhood Education', shortName: 'B.Ed. Early Childhood', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Early childhood education' },
      { id: 'edu-rme', name: 'Bachelor of Education in Religious and Moral Education', shortName: 'B.Ed. RME', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Religious and moral education' },
      { id: 'edu-lang', name: 'Bachelor of Arts Education in Language Studies', shortName: 'B.A.Ed. Languages', level: 'degree', duration: '4 Years', faculty: 'education', description: 'Language arts education' },
      { id: 'edu-eng', name: 'Bachelor of Education in English Language', shortName: 'B.Ed. English', level: 'degree', duration: '4 Years', faculty: 'education', description: 'English language teaching' },
      // Diploma Programs
      { id: 'edu-ode', name: 'Ordinary Diploma in Education', shortName: 'OD Education', level: 'diploma', duration: '2 Years', faculty: 'education', description: 'Foundation education training' },
      { id: 'edu-comm-od', name: 'Ordinary Diploma in Community Development Studies', shortName: 'OD Community Dev', level: 'diploma', duration: '2 Years', faculty: 'education', description: 'Community development basics' },
      // Certificate Programs
      { id: 'edu-htcs-agri', name: 'Higher Teachers Certificate Secondary - Agriculture', shortName: 'HTC(S) Agriculture', level: 'certificate', duration: '3 Years', faculty: 'education', description: 'Secondary agriculture teaching' },
      { id: 'edu-htcs-home', name: 'Higher Teachers Certificate Secondary - Home Economics', shortName: 'HTC(S) Home Econ', level: 'certificate', duration: '3 Years', faculty: 'education', description: 'Secondary home economics teaching' },
      { id: 'edu-htcs-eng', name: 'Higher Teachers Certificate Secondary - English Language', shortName: 'HTC(S) English', level: 'certificate', duration: '3 Years', faculty: 'education', description: 'Secondary English teaching' },
      { id: 'edu-htcs-social', name: 'Higher Teachers Certificate Secondary - Social Studies', shortName: 'HTC(S) Social Studies', level: 'certificate', duration: '3 Years', faculty: 'education', description: 'Secondary social studies teaching' },
      { id: 'edu-htcs-comm', name: 'Higher Teachers Certificate Secondary - Commercial Studies', shortName: 'HTC(S) Commercial', level: 'certificate', duration: '3 Years', faculty: 'education', description: 'Secondary commercial studies teaching' },
      { id: 'edu-htcs-arts', name: 'Higher Teachers Certificate Secondary - Creative Practical Arts', shortName: 'HTC(S) Arts', level: 'certificate', duration: '3 Years', faculty: 'education', description: 'Secondary arts teaching' },
      { id: 'edu-htcs-phe', name: 'Higher Teachers Certificate Secondary - Physical and Health Education', shortName: 'HTC(S) PHE', level: 'certificate', duration: '3 Years', faculty: 'education', description: 'Secondary PHE teaching' },
      { id: 'edu-htcs-math', name: 'Higher Teachers Certificate Secondary - Mathematics', shortName: 'HTC(S) Mathematics', level: 'certificate', duration: '3 Years', faculty: 'education', description: 'Secondary mathematics teaching' },
      { id: 'edu-htcs-sci', name: 'Higher Teachers Certificate Secondary - Integrated Science', shortName: 'HTC(S) Science', level: 'certificate', duration: '3 Years', faculty: 'education', description: 'Secondary science teaching' },
      { id: 'edu-htcp-prevoc', name: 'Higher Teachers Certificate Primary - Pre-Vocational Studies', shortName: 'HTC(P) Pre-Voc', level: 'certificate', duration: '3 Years', faculty: 'education', description: 'Primary pre-vocational teaching' },
      { id: 'edu-tc', name: 'Teachers Certificate', shortName: 'TC', level: 'certificate', duration: '3 Years', faculty: 'education', description: 'Basic teaching certification' },
      { id: 'edu-comm-tc', name: 'Technical Certificate in Community Development Studies', shortName: 'TC Community Dev', level: 'certificate', duration: '1 Year', faculty: 'education', description: 'Community development basics' },
      { id: 'edu-lib-tc', name: 'Technical Certificate in Library Science', shortName: 'TC Library Science', level: 'certificate', duration: '1 Year', faculty: 'education', description: 'Library management basics' },
    ]
  },
  {
    id: 'business',
    name: 'Faculty of Business and Entrepreneurship Studies',
    shortName: 'Business',
    icon: '💼',
    description: 'Building leaders and innovators in business',
    universityId: 'etusl',
    courses: [
      // Degree Programs
      { id: 'bus-acc', name: 'Bachelor of Science in Accounting', shortName: 'B.Sc. Accounting', level: 'degree', duration: '4 Years', faculty: 'business', description: 'Professional accounting' },
      { id: 'bus-audit', name: 'Bachelor of Science in Auditing', shortName: 'B.Sc. Auditing', level: 'degree', duration: '4 Years', faculty: 'business', description: 'Auditing and compliance' },
      { id: 'bus-admin', name: 'Bachelor of Science in Business Administration', shortName: 'B.Sc. Business Admin', level: 'degree', duration: '4 Years', faculty: 'business', description: 'Business management and operations' },
      { id: 'bus-bank', name: 'Bachelor of Science in Banking and Finance', shortName: 'B.Sc. Banking/Finance', level: 'degree', duration: '4 Years', faculty: 'business', description: 'Banking and financial services' },
      { id: 'bus-econ', name: 'Bachelor of Science in Economics', shortName: 'B.Sc. Economics', level: 'degree', duration: '4 Years', faculty: 'business', description: 'Economic analysis and policy' },
      { id: 'bus-social', name: 'Bachelor of Science in Social Work', shortName: 'B.Sc. Social Work', level: 'degree', duration: '4 Years', faculty: 'business', description: 'Social work and community service' },
      { id: 'bus-entrep', name: 'Bachelor of Science in Entrepreneurship Studies', shortName: 'B.Sc. Entrepreneurship', level: 'degree', duration: '4 Years', faculty: 'business', description: 'Business creation and innovation' },
      { id: 'bus-proc', name: 'Bachelor of Science in Procurement, Logistics and Supply Chain Management', shortName: 'B.Sc. Procurement/SCM', level: 'degree', duration: '4 Years', faculty: 'business', description: 'Supply chain and logistics' },
      { id: 'bus-peace', name: 'Bachelor of Arts in Peace, Security and Development', shortName: 'B.A. Peace/Security', level: 'degree', duration: '4 Years', faculty: 'business', description: 'Peace studies and development' },
      // Diploma Programs
      { id: 'bus-acc-hd', name: 'Higher Diploma in Accounting and Finance', shortName: 'HD Accounting', level: 'diploma', duration: '3 Years', faculty: 'business', description: 'Applied accounting and finance' },
      { id: 'bus-social-hd', name: 'Higher Diploma in Social Work', shortName: 'HD Social Work', level: 'diploma', duration: '3 Years', faculty: 'business', description: 'Social work practice' },
      { id: 'bus-bank-hd', name: 'Higher Diploma in Banking and Finance', shortName: 'HD Banking', level: 'diploma', duration: '3 Years', faculty: 'business', description: 'Banking operations' },
      { id: 'bus-admin-hd', name: 'Higher Diploma in Business Administration', shortName: 'HD Business Admin', level: 'diploma', duration: '3 Years', faculty: 'business', description: 'Business administration skills' },
      { id: 'bus-hr-hd', name: 'Higher Diploma in Human Resource Management', shortName: 'HD HRM', level: 'diploma', duration: '3 Years', faculty: 'business', description: 'Human resources management' },
      { id: 'bus-proc-hd', name: 'Higher Diploma in Procurement', shortName: 'HD Procurement', level: 'diploma', duration: '3 Years', faculty: 'business', description: 'Procurement practices' },
      { id: 'bus-mass-hd', name: 'Higher Diploma in Mass Communication', shortName: 'HD Mass Comm', level: 'diploma', duration: '3 Years', faculty: 'business', description: 'Media and communication' },
      { id: 'bus-admin-od', name: 'Ordinary Diploma in Business Administration', shortName: 'OD Business Admin', level: 'diploma', duration: '2 Years', faculty: 'business', description: 'Foundation business skills' },
      { id: 'bus-bank-od', name: 'Ordinary Diploma in Banking & Finance', shortName: 'OD Banking', level: 'diploma', duration: '2 Years', faculty: 'business', description: 'Basic banking skills' },
      { id: 'bus-proc-od', name: 'Ordinary Diploma in Procurement', shortName: 'OD Procurement', level: 'diploma', duration: '2 Years', faculty: 'business', description: 'Basic procurement' },
      { id: 'bus-sec-od', name: 'Ordinary Diploma in Secretarial Studies', shortName: 'OD Secretarial', level: 'diploma', duration: '2 Years', faculty: 'business', description: 'Secretarial and admin skills' },
      { id: 'bus-acc-od', name: 'Ordinary Diploma in Accounting and Finance', shortName: 'OD Accounting', level: 'diploma', duration: '2 Years', faculty: 'business', description: 'Basic accounting' },
      { id: 'bus-mass-od', name: 'Ordinary Diploma in Mass Communication', shortName: 'OD Mass Comm', level: 'diploma', duration: '2 Years', faculty: 'business', description: 'Foundation media skills' },
    ]
  },
  {
    id: 'distance',
    name: 'Institute of Distance Education and Continuous Professional Development',
    shortName: 'Distance Education',
    icon: '🌐',
    description: 'Flexible learning for working professionals',
    universityId: 'etusl',
    courses: [
      // Certificate Programs
      { id: 'dist-htcs-agri', name: 'Higher Teachers Certificate Secondary - Agriculture (Distance)', shortName: 'HTC(S) Agriculture', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Agriculture teaching' },
      { id: 'dist-htcs-home', name: 'Higher Teachers Certificate Secondary - Home Economics (Distance)', shortName: 'HTC(S) Home Econ', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Home economics teaching' },
      { id: 'dist-htcs-eng', name: 'Higher Teachers Certificate Secondary - English Language (Distance)', shortName: 'HTC(S) English', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - English teaching' },
      { id: 'dist-htcs-social', name: 'Higher Teachers Certificate Secondary - Social Studies (Distance)', shortName: 'HTC(S) Social Studies', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Social studies teaching' },
      { id: 'dist-htcs-comm', name: 'Higher Teachers Certificate Secondary - Commercial Studies (Distance)', shortName: 'HTC(S) Commercial', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Commercial studies teaching' },
      { id: 'dist-htcs-arts', name: 'Higher Teachers Certificate Secondary - Creative Practical Arts (Distance)', shortName: 'HTC(S) Arts', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Arts teaching' },
      { id: 'dist-htcs-phe', name: 'Higher Teachers Certificate Secondary - Physical and Health Education (Distance)', shortName: 'HTC(S) PHE', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - PHE teaching' },
      { id: 'dist-htcs-math', name: 'Higher Teachers Certificate Secondary - Mathematics (Distance)', shortName: 'HTC(S) Mathematics', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Mathematics teaching' },
      { id: 'dist-htcs-sci', name: 'Higher Teachers Certificate Secondary - Integrated Science (Distance)', shortName: 'HTC(S) Science', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Science teaching' },
      { id: 'dist-htcp-prevoc', name: 'Higher Teachers Certificate Primary - Pre-Vocational Studies (Distance)', shortName: 'HTC(P) Pre-Voc', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Pre-vocational teaching' },
      { id: 'dist-htcp-eng', name: 'Higher Teachers Certificate Primary - English Language (Distance)', shortName: 'HTC(P) English', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Primary English teaching' },
      { id: 'dist-htcp-social', name: 'Higher Teachers Certificate Primary - Social Studies (Distance)', shortName: 'HTC(P) Social Studies', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Primary social studies teaching' },
      { id: 'dist-htcp-arts', name: 'Higher Teachers Certificate Primary - Creative Practical Arts (Distance)', shortName: 'HTC(P) Arts', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Primary arts teaching' },
      { id: 'dist-htcp-phe', name: 'Higher Teachers Certificate Primary - Physical and Health Education (Distance)', shortName: 'HTC(P) PHE', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Primary PHE teaching' },
      { id: 'dist-htcp-math', name: 'Higher Teachers Certificate Primary - Mathematics (Distance)', shortName: 'HTC(P) Mathematics', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Primary mathematics teaching' },
      { id: 'dist-tc', name: 'Teachers Certificate (Distance)', shortName: 'TC Distance', level: 'certificate', duration: '3 Years', faculty: 'distance', description: 'Distance learning - Basic teaching certification' },
    ]
  },
  {
    id: 'njala-agri',
    name: 'School of Agriculture and Food Sciences',
    shortName: 'Agriculture',
    icon: '🌾',
    description: 'Leading innovations in agriculture and food security',
    universityId: 'njala',
    courses: [
      // Certificate Level
      { id: 'njala-agri-cert', name: 'Certificate in Agriculture', shortName: 'Cert. Agriculture', level: 'certificate', duration: '1 Year', faculty: 'njala-agri', description: 'Foundational agricultural practices' },
      { id: 'njala-agri-dip', name: 'Diploma in Agriculture', shortName: 'Dip. Agriculture', level: 'diploma', duration: '2 Years', faculty: 'njala-agri', description: 'Intermediate agricultural studies' },
      { id: 'njala-agri-hd-agro', name: 'Higher Diploma in Agronomy', shortName: 'HD Agronomy', level: 'diploma', duration: '3 Years', faculty: 'njala-agri', description: 'Advanced crop science and soil management' },
      { id: 'njala-agri-hd-animal', name: 'Higher Diploma in Animal Health', shortName: 'HD Animal Health', level: 'diploma', duration: '3 Years', faculty: 'njala-agri', description: 'Animal care and health management' },
      { id: 'njala-agri-hd-nutri', name: 'Higher Diploma in Nutrition and Food Technology', shortName: 'HD Nutrition', level: 'diploma', duration: '3 Years', faculty: 'njala-agri', description: 'Food science and nutritional technology' },

      // Bachelor Level - Direct Entry
      { id: 'njala-agri-bsc-gen', name: 'Bachelor of Science in Agriculture General', shortName: 'BSc. Agriculture', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Comprehensive agricultural education' },
      { id: 'njala-agri-bsc-animal', name: 'Bachelor of Science in Animal Health and Production', shortName: 'BSc. Animal Health', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Specialized animal science and production' },
      { id: 'njala-agri-bsc-nutri', name: 'Bachelor of Science in Nutrition and Dietetics', shortName: 'BSc. Nutrition', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Professional nutrition and dietetics' },
      { id: 'njala-agri-bsc-bus', name: 'Bachelor of Studies in Agribusiness Management', shortName: 'B.S. Agribusiness', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Management of agricultural businesses' },
      { id: 'njala-agri-bsc-media', name: 'Bachelor of Science in Agricultural Communication and Media', shortName: 'BSc. Agri Media', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Communication strategies for agriculture' },

      // Bachelor Level - Honours (Post-2nd Year)
      { id: 'njala-agri-hons-crop', name: 'BSc. Honours in Crop Science', shortName: 'BSc. Hons Crop Science', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Advanced crop science research' },
      { id: 'njala-agri-hons-soil', name: 'BSc. Honours in Soil Science', shortName: 'BSc. Hons Soil Science', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Advanced soil science and analysis' },
      { id: 'njala-agri-hons-prot', name: 'BSc. Honours in Crop Protection', shortName: 'BSc. Hons Crop Protection', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Specialized plant health and protection' },
      { id: 'njala-agri-hons-ext', name: 'BSc. Honours in Extension and Rural Sociology', shortName: 'BSc. Hons Agri Extension', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Rural development and outreach' },
      { id: 'njala-agri-hons-bus', name: 'BSc. Honours in Agribusiness', shortName: 'BSc. Hons Agribusiness', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Advanced agribusiness management' },
      { id: 'njala-agri-hons-nutri', name: 'BSc. Honours in Nutrition and Dietetics', shortName: 'BSc. Hons Nutrition', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Advanced nutrition and clinical dietetics' },
      { id: 'njala-agri-hons-food', name: 'BSc. Honours in Nutrition and Food Technology', shortName: 'BSc. Hons Food Tech', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Advanced food technology and safety' },
      { id: 'njala-agri-bsc-animal-sci', name: 'Bachelor of Science in Animal Science', shortName: 'BSc. Animal Science', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Scientific study of animal breeding and biology' },
      { id: 'njala-agri-bsc-textile', name: 'Bachelor of Science in Clothing & Textile (Hon)', shortName: 'BSc. Clothing & Textile', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Textile science and apparel design' },
      { id: 'njala-agri-bsc-crop-prot', name: 'Bachelor of Science in Crop Protection', shortName: 'BSc. Crop Protection', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Plant health and pest management' },
      { id: 'njala-agri-bsc-crop-sci', name: 'Bachelor of Science in Crop Science', shortName: 'BSc. Crop Science', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Scientific study of crop production' },
      { id: 'njala-agri-bsc-edu-home', name: 'Bachelor of Science in Education with major Home Economics', shortName: 'BSc. Ed. Home Econ', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Teaching of home economics and nutrition' },
      { id: 'njala-agri-bsc-soil-sci', name: 'Bachelor of Science in Soil Science', shortName: 'BSc. Soil Science', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Study of soil properties and management' },

      // Postgraduate Level
      { id: 'njala-agri-msc-animal', name: 'MSc. in Animal Science', shortName: 'MSc. Animal Science', level: 'postgraduate', duration: '15 Months', faculty: 'njala-agri', description: 'Postgraduate studies in animal science' },
      { id: 'njala-agri-msc-crop', name: 'MSc. in Crop Science', shortName: 'MSc. Crop Science', level: 'postgraduate', duration: '15 Months', faculty: 'njala-agri', description: 'Postgraduate studies in crop science' },
      { id: 'njala-agri-msc-agro', name: 'MSc. in Agronomy', shortName: 'MSc. Agronomy', level: 'postgraduate', duration: '15 Months', faculty: 'njala-agri', description: 'Postgraduate studies in agronomy' },
      { id: 'njala-agri-msc-soil', name: 'MSc. in Soil Science', shortName: 'MSc. Soil Science', level: 'postgraduate', duration: '15 Months', faculty: 'njala-agri', description: 'Postgraduate studies in soil science' },
      { id: 'njala-agri-msc-prot', name: 'MSc. in Crop Protection', shortName: 'MSc. Crop Protection', level: 'postgraduate', duration: '15 Months', faculty: 'njala-agri', description: 'Postgraduate studies in crop protection' },
      { id: 'njala-agri-msc-ext', name: 'MSc. in Agricultural Extension and Rural Sociology', shortName: 'MSc. Agri Extension', level: 'postgraduate', duration: '15 Months', faculty: 'njala-agri', description: 'Postgraduate studies in agricultural extension' },
      { id: 'njala-agri-msc-nutri', name: 'MSc. in Nutrition and Dietetics', shortName: 'MSc. Nutrition', level: 'postgraduate', duration: '15 Months', faculty: 'njala-agri', description: 'Advanced postgraduate nutrition research' },
      // Updated and Added Programmes
      { id: 'njala-agri-hons-fns', name: 'Bachelor of Science with Honours in Food Nutrition Security', shortName: 'BSc. Hons FNS', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Advanced study in food security and nutrition' },
      { id: 'njala-agri-hons-home-comm', name: 'Bachelor of Science with Honours in Home Economics and Community Development', shortName: 'BSc. Hons Home Econ', level: 'degree', duration: '4 Years', faculty: 'njala-agri', description: 'Advanced home economics and community growth' },
      { id: 'njala-agri-hd-gen-agro', name: 'Higher Diploma in Agriculture General (Agronomy Option)', shortName: 'HD Agri Agronomy', level: 'diploma', duration: '3 Years', faculty: 'njala-agri', description: 'Advanced vocational training in agronomy' },
      { id: 'njala-agri-hd-gen-for', name: 'Higher Diploma in Agriculture General (Forestry Option)', shortName: 'HD Agri Forestry', level: 'diploma', duration: '3 Years', faculty: 'njala-agri', description: 'Advanced vocational training in agricultural forestry' },
      { id: 'njala-agri-hd-gen-live', name: 'Higher Diploma in Agriculture General (Livestock Option)', shortName: 'HD Agri Livestock', level: 'diploma', duration: '3 Years', faculty: 'njala-agri', description: 'Advanced vocational training in livestock' },
      { id: 'njala-agri-hd-food-tech', name: 'Higher Diploma in Food Technology & Nutrition', shortName: 'HD Food Tech', level: 'diploma', duration: '3 Years', faculty: 'njala-agri', description: 'Technical training in food processing and nutrition' },
      { id: 'njala-agri-msc-clothing', name: 'Master of Science in Clothing and Textiles', shortName: 'M.Sc. Clothing', level: 'postgraduate', duration: '15 Months', faculty: 'njala-agri', description: 'Advanced studies in textile science and apparel' },
      { id: 'njala-agri-postgrad-info', name: 'M.Phil. & PhD Programmes (Various Options)', shortName: 'M.Phil/PhD Agri', level: 'postgraduate', duration: '2-4 Years', faculty: 'njala-agri', description: 'Research degrees in agricultural sciences' },
      { id: 'njala-agri-hd-food-tech', name: 'Higher Diploma in Food Technology & Nutrition', shortName: 'HD Food Tech', level: 'diploma', duration: '3 Years', faculty: 'njala-agri', description: 'Technical training in food processing and nutrition' },
      { id: 'njala-agri-od-gen', name: 'Ordinary Diploma in Agriculture General', shortName: 'OD Agri General', level: 'diploma', duration: '2 Years', faculty: 'njala-agri', description: 'Foundational agricultural vocational training' },
      { id: 'njala-agri-mphil-ext', name: 'MPhil in Agricultural Extension and Rural Sociology', shortName: 'MPhil Agri Extension', level: 'postgraduate', duration: '2 Years', faculty: 'njala-agri', description: 'Postgraduate research in rural sociology' },
      { id: 'njala-agri-phd-ext', name: 'PhD in Agricultural Extension and Rural Sociology', shortName: 'PhD Agri Extension', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-agri', description: 'Doctoral research in extension services' },
      { id: 'njala-agri-phd-animal', name: 'PhD in Animal Science', shortName: 'PhD Animal Science', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-agri', description: 'Doctoral research in animal sciences' },
      { id: 'njala-agri-phd-crop', name: 'PhD in Crop Science', shortName: 'PhD Crop Science', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-agri', description: 'Doctoral research in crop production systems' },
      { id: 'njala-agri-phd-breeding', name: 'PhD in Plant Breeding and Genetic Resources Management', shortName: 'PhD Plant Breeding', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-agri', description: 'Advanced research in genetics and breeding' },
      { id: 'njala-agri-phd-soil', name: 'PHD in Soil Fertility', shortName: 'PhD Soil Fertility', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-agri', description: 'Doctoral research in soil nutrient management' },
      { id: 'njala-agri-postgrad-info', name: 'M.Phil. & PhD Programmes (Various Options)', shortName: 'M.Phil/PhD Agri', level: 'postgraduate', duration: '2-4 Years', faculty: 'njala-agri', description: 'Research degrees in agricultural sciences' },
    ]
  },
  {
    id: 'njala-edu',
    name: 'School of Education',
    shortName: 'Education',
    icon: '📚',
    description: 'Training world-class educators and language specialists',
    universityId: 'njala',
    courses: [
      // Postgraduate Programmes
      { id: 'njala-edu-phd', name: 'PhD in Education', shortName: 'PhD Education', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-edu', description: 'Advanced research in educational theory and practice' },
      { id: 'njala-edu-mphil', name: 'M.Phil. in Education', shortName: 'M.Phil. Education', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Master of Philosophy in Education' },
      { id: 'njala-edu-med-gc', name: 'M.Ed. in Guidance and Counselling', shortName: 'M.Ed. Counselling', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Specialized training in educational counselling' },
      { id: 'njala-edu-med-cs', name: 'M.Ed. in Curriculum Studies', shortName: 'M.Ed. Curriculum', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Advanced studies in curriculum development' },
      { id: 'njala-edu-med-eam', name: 'M.Ed. in Educational Administration and Management', shortName: 'M.Ed. Management', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Educational leadership and administration' },
      { id: 'njala-edu-med-me', name: 'M.Ed. in Measurement and Evaluation', shortName: 'M.Ed. Evaluation', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Specialization in educational assessment' },
      { id: 'njala-edu-pgde', name: 'Postgraduate Diploma in Education (PGDE)', shortName: 'PGDE', level: 'postgraduate', duration: '1 Year', faculty: 'njala-edu', description: 'Professional diploma for graduates entering teaching' },
      { id: 'njala-edu-ma-lit', name: 'M.A. Ed. (Literature)', shortName: 'M.A. Literature', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Literature education at postgraduate level' },
      { id: 'njala-edu-ma-ling', name: 'M.A. Descriptive and Applied Linguistics', shortName: 'M.A. Linguistics', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Advanced linguistics research' },
      { id: 'njala-edu-ma-eng', name: 'M.A. English', shortName: 'M.A. English', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Postgraduate studies in English language' },
      { id: 'njala-edu-phd-lit-ling', name: 'PhD in Literature or Linguistics', shortName: 'PhD Lit/Ling', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-edu', description: 'Doctoral research in languages and literature' },
      { id: 'njala-edu-phd-exercise', name: 'PhD (Edu.) in Exercise Physiology', shortName: 'PhD Exercise Phys', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-edu', description: 'Doctoral studies in physical education and physiology' },
      { id: 'njala-edu-phd-sports', name: 'PhD (Edu.) in Sports Administration & Management', shortName: 'PhD Sports Mgmt', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-edu', description: 'Doctoral studies in sports leadership' },
      { id: 'njala-edu-mphil-sports', name: 'M.Phil. (Edu.) in Sports Administration & Management', shortName: 'M.Phil. Sports Mgmt', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Postgraduate research in sports management' },
      { id: 'njala-edu-mphil-exercise', name: 'M.Phil. (Edu.) in Exercise Physiology', shortName: 'M.Phil. Exercise Phys', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Postgraduate research in exercise physiology' },
      { id: 'njala-edu-msc-exercise', name: 'M.Sc. (Edu.) in Exercise Physiology', shortName: 'M.Sc. Exercise Phys', level: 'postgraduate', duration: '15 Months', faculty: 'njala-edu', description: 'Advanced exercise physiology studies' },
      { id: 'njala-edu-ma-sports', name: 'M.A. (Edu.) in Sports Administration & Management', shortName: 'M.A. Sports Mgmt', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Advanced sports administration' },
      { id: 'njala-edu-msc-agri-ed', name: 'M.Sc. in Agricultural Education', shortName: 'M.Sc. Agri Ed', level: 'postgraduate', duration: '15 Months', faculty: 'njala-edu', description: 'Postgraduate studies in agricultural teaching' },
      { id: 'njala-edu-msc-home-ed', name: 'M.Sc. Home Economics Education', shortName: 'M.Sc. Home Econ Ed', level: 'postgraduate', duration: '15 Months', faculty: 'njala-edu', description: 'Postgraduate studies in home economics teaching' },
      { id: 'njala-edu-phd-sci', name: 'PhD in Science Education', shortName: 'PhD Science Ed', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-edu', description: 'Doctoral research in science teaching' },
      { id: 'njala-edu-mphil-sci', name: 'M.Phil. in Science Education', shortName: 'M.Phil. Science Ed', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Postgraduate research in science education' },
      { id: 'njala-edu-msc-sci-ed', name: 'M.Sc. Education (Science)', shortName: 'M.Sc. Science Ed', level: 'postgraduate', duration: '15 Months', faculty: 'njala-edu', description: 'Advanced science education studies' },
      { id: 'njala-edu-pgd-sci-ed', name: 'Postgraduate Diploma in Science Education', shortName: 'PGD Science Ed', level: 'postgraduate', duration: '1 Year', faculty: 'njala-edu', description: 'Professional diploma in science teaching' },

      // Undergraduate Degrees
      { id: 'njala-edu-ba-pol', name: 'B.A. Education, Political Science', shortName: 'B.A. Ed. Pol Sci', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Teaching of political science and education' },
      { id: 'njala-edu-bed-early', name: 'B.Ed. Early Childhood Care and Education', shortName: 'B.Ed. Early Childhood', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Professional training in early childhood teaching' },
      { id: 'njala-edu-bed-gen', name: 'B.Ed. (General, School Subjects)', shortName: 'B.Ed. General', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'General education with specific school subjects' },
      { id: 'njala-edu-bed-adult', name: 'B.Ed. Adult Education', shortName: 'B.Ed. Adult Ed', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Specialized training in adult learning' },
      { id: 'njala-edu-ba-lit-ling', name: 'B.A. (Education: Linguistics or Literature major)', shortName: 'B.A. Ed. Lit/Ling', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Language and literature teaching' },
      { id: 'njala-edu-ba-french', name: 'B.A. Education (French/Linguistics)', shortName: 'B.A. Ed. French', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Teaching of French and linguistics' },
      { id: 'njala-edu-ba-dev-comm', name: 'B.A. in Development Communication and Journalism', shortName: 'B.A. Dev Comm & Journalism', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Communication and media studies' },
      { id: 'njala-edu-bed-kines', name: 'B.Ed. – Human Kinetics & Kinesiology', shortName: 'B.Ed. Kinesiology', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Education in human movement and kinetics' },
      { id: 'njala-edu-bsc-kines', name: 'B.Sc. (Edu.) – Human Kinetics & Kinesiology', shortName: 'B.Sc. Ed. Kinesiology', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Science-focused physical education' },
      { id: 'njala-edu-bsc-health', name: 'B.Sc. (Edu.) – Health Education & Nutrition', shortName: 'B.Sc. Ed. Health/Nutri', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Teaching of health and nutrition' },
      { id: 'njala-edu-bsc-agri-ed', name: 'B.Sc. Agricultural Education', shortName: 'B.Sc. Agri Ed', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Teaching of agricultural sciences' },
      { id: 'njala-edu-bsc-home-ed', name: 'B.Sc. Home Economics Education', shortName: 'B.Sc. Home Econ Ed', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Teaching of home economics' },
      { id: 'njala-edu-ba-crk', name: 'Bachelor of Arts in Education with Majors CRK', shortName: 'B.A. Ed. CRK', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Religious studies education' },
      { id: 'njala-edu-ba-eng-major', name: 'Bachelor of Arts in Education with Majors English', shortName: 'B.A. Ed. English', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'English language and literature teaching' },
      { id: 'njala-edu-ba-hist', name: 'Bachelor of Arts in Education with Majors History', shortName: 'B.A. Ed. History', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'History and social studies teaching' },
      { id: 'njala-edu-bed-dist', name: 'Bachelor of Education Distance Learning', shortName: 'B.Ed. Distance', level: 'degree', duration: '4-5 Years', faculty: 'njala-edu', description: 'Flexible distance learning education degree' },
      { id: 'njala-edu-bsc-edu-bio', name: 'Bachelor of Science in Education with major in Biology', shortName: 'BSc. Ed. Biology', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Secondary school biology teacher training' },
      { id: 'njala-edu-bsc-edu-health', name: 'Bachelor of Science in Education with Major in Health Education', shortName: 'BSc. Ed. Health', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Health and hygiene education training' },
      { id: 'njala-edu-bsc-edu-kinetics', name: 'Bachelor of Science in Education with Major in Human Kinetics', shortName: 'BSc. Ed. Kinetics', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Physical education and movement science' },
      { id: 'njala-edu-bsc-edu-math', name: 'Bachelor of Science in Education with Major in Mathematics', shortName: 'BSc. Ed. Mathematics', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Secondary mathematics teacher training' },
      { id: 'njala-edu-bsc-edu-chem', name: 'Bachelor of Science in Education with Majors in Chemistry', shortName: 'BSc. Ed. Chemistry', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Secondary chemistry teacher training' },
      { id: 'njala-edu-bsc-edu-econ', name: 'Bachelor of Science in Education with Majors in Economics', shortName: 'BSc. Ed. Economics', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Secondary economics teacher training' },
      { id: 'njala-edu-bsc-edu-geo', name: 'Bachelor of Science in Education with Majors in Geography', shortName: 'BSc. Ed. Geography', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Secondary geography teacher training' },
      { id: 'njala-edu-bsc-edu-phys', name: 'Bachelor of Science in Education with Majors in Physics', shortName: 'BSc. Ed. Physics', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Secondary physics teacher training' },
      { id: 'njala-edu-bsc-home-econ-ed', name: 'Bachelor of Science in Home Economics Education', shortName: 'BSc. Home Econ Ed', level: 'degree', duration: '4 Years', faculty: 'njala-edu', description: 'Advanced home economics teaching' },

      // Diploma Programmes
      { id: 'njala-edu-dip-dev-comm', name: 'Diploma in Development Communication and Journalism', shortName: 'Dip. Dev Comm', level: 'diploma', duration: '2 Years', faculty: 'njala-edu', description: 'Fundamental journalism and communication' },

      // Certificate Programmes
      { id: 'njala-edu-htcp', name: 'Higher Teachers Certificate (Primary)', shortName: 'HTC(P)', level: 'certificate', duration: '3 Years', faculty: 'njala-edu', description: 'Advanced primary teaching certification' },
      { id: 'njala-edu-htcs', name: 'Higher Teachers Certificate (Secondary)', shortName: 'HTC(S)', level: 'certificate', duration: '3 Years', faculty: 'njala-edu', description: 'Advanced secondary teaching certification' },
      { id: 'njala-edu-tc', name: 'Teachers Certificate (TC)', shortName: 'TC', level: 'certificate', duration: '3 Years', faculty: 'njala-edu', description: 'Initial teaching certification' },
      { id: 'njala-edu-cert-dev-comm', name: 'Certificate in Development Communication', shortName: 'Cert. Dev Comm', level: 'certificate', duration: '1 Year', faculty: 'njala-edu', description: 'Professional communication skills' },
      { id: 'njala-edu-cert-dev-comm-journ', name: 'Certificate in Development Communications & Journalism', shortName: 'Cert. Journalism', level: 'certificate', duration: '1 Year', faculty: 'njala-edu', description: 'Basic journalism and communication skills' },
      { id: 'njala-edu-dip-dev-comm-journ', name: 'Diploma in Development Communications & Journalism', shortName: 'Dip. Journalism', level: 'diploma', duration: '2 Years', faculty: 'njala-edu', description: 'Vocational journalism and media training' },
      { id: 'njala-edu-htcs-kh', name: 'Higher Teachers Certificate (Secondary) in Physical Health Education', shortName: 'HTC(S) PHE', level: 'certificate', duration: '3 Years', faculty: 'njala-edu', description: 'Secondary physical education teaching' },
      { id: 'njala-edu-htcp-kh', name: 'Higher Teachers Certificate (Primary) Physical Health Education', shortName: 'HTC(P) PHE', level: 'certificate', duration: '3 Years', faculty: 'njala-edu', description: 'Primary physical education teaching' },
      { id: 'njala-edu-med-chem', name: 'Master of Education - Chemistry', shortName: 'M.Ed. Chemistry', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Advanced training for chemistry educators' },
      { id: 'njala-edu-med-sci-ed', name: 'Master of Education in Science Education', shortName: 'M.Ed. Science Ed', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Advanced science pedagogy and research' },
      { id: 'njala-edu-htcp-dist', name: 'Higher Teachers Certificate (Primary) Distance Learning', shortName: 'HTC(P) Distance', level: 'certificate', duration: '3 Years', faculty: 'njala-edu', description: 'Flexible primary teacher certification' },
      { id: 'njala-edu-htcs-dist', name: 'Higher Teachers Certificate (Secondary) Distance Learning', shortName: 'HTC(S) Distance', level: 'certificate', duration: '3 Years', faculty: 'njala-edu', description: 'Flexible secondary teacher certification' },
      { id: 'njala-edu-msc-bio-meas', name: 'Master of Science in Education - Biological and Measurement', shortName: 'M.Sc. Bio & Meas', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Advanced biology and educational measurement' },
      { id: 'njala-edu-msc-geo-ed', name: 'Master of Science in Education - Geography', shortName: 'M.Sc. Geography Ed', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Advanced geography pedagogy' },
      { id: 'njala-edu-msc-phys-ed', name: 'Master of Science in Education - Physics', shortName: 'M.Sc. Physics Ed', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Advanced physics teaching and research' },
      { id: 'njala-edu-mphil-gen', name: 'Mphil in Education', shortName: 'Mphil Education', level: 'postgraduate', duration: '2 Years', faculty: 'njala-edu', description: 'Master of Philosophy in General Education' },
      { id: 'njala-edu-phd-gc-major', name: 'PhD in Guidance and Counseling', shortName: 'PhD Counseling', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-edu', description: 'Doctoral research in guidance and counseling' },
      { id: 'njala-edu-phd-ling', name: 'PhD in Linguistics', shortName: 'PhD Linguistics', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-edu', description: 'Doctoral research in descriptive and applied linguistics' },
    ]
  },
  {
    id: 'njala-nrm',
    name: 'School of Natural Resources Management',
    shortName: 'Natural Resources',
    icon: '🌳',
    description: 'Conserving biodiversity and managing natural ecosystems',
    universityId: 'njala',
    courses: [
      // Postgraduate Programs
      { id: 'njala-nrm-phd-aqua', name: 'PhD in Aquaculture and Fisheries', shortName: 'PhD Aquaculture', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-nrm', description: 'Advanced research in aquatic systems and fisheries' },
      { id: 'njala-nrm-phd-for', name: 'PhD in Forestry', shortName: 'PhD Forestry', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-nrm', description: 'Doctoral studies in forest management and conservation' },
      { id: 'njala-nrm-phd-hort', name: 'PhD in Horticulture', shortName: 'PhD Horticulture', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-nrm', description: 'Advanced research in plant cultivation and science' },
      { id: 'njala-nrm-mphil-aqua', name: 'M.Phil. in Aquaculture and Fisheries', shortName: 'M.Phil. Aquaculture', level: 'postgraduate', duration: '2 Years', faculty: 'njala-nrm', description: 'Postgraduate research in fisheries science' },
      { id: 'njala-nrm-mphil-for', name: 'M.Phil. Forestry', shortName: 'M.Phil. Forestry', level: 'postgraduate', duration: '2 Years', faculty: 'njala-nrm', description: 'Postgraduate research in forestry' },
      { id: 'njala-nrm-mphil-hort', name: 'M.Phil. Horticulture', shortName: 'M.Phil. Horticulture', level: 'postgraduate', duration: '2 Years', faculty: 'njala-nrm', description: 'Postgraduate research in horticulture' },
      { id: 'njala-nrm-msc-aqua', name: 'M.Sc. in Aquaculture and Fisheries', shortName: 'M.Sc. Aquaculture', level: 'postgraduate', duration: '15 Months', faculty: 'njala-nrm', description: 'Master\'s studies in aquatic resource management' },
      { id: 'njala-nrm-msc-for', name: 'M.Sc. in Forestry', shortName: 'M.Sc. Forestry', level: 'postgraduate', duration: '15 Months', faculty: 'njala-nrm', description: 'Master\'s studies in forest sciences' },
      { id: 'njala-nrm-msc-hort', name: 'M.Sc. in Horticulture', shortName: 'M.Sc. Horticulture', level: 'postgraduate', duration: '15 Months', faculty: 'njala-nrm', description: 'Master\'s studies in advanced horticulture' },
      { id: 'njala-nrm-msc-wild', name: 'M.Sc. in Wildlife Management and Conservation', shortName: 'M.Sc. Wildlife', level: 'postgraduate', duration: '15 Months', faculty: 'njala-nrm', description: 'Master\'s studies in wildlife and biodiversity' },
      { id: 'njala-nrm-msc-wood', name: 'M.Sc. in Wood Science', shortName: 'M.Sc. Wood Science', level: 'postgraduate', duration: '15 Months', faculty: 'njala-nrm', description: 'Master\'s studies in timber and wood technology' },

      // Undergraduate Programs
      { id: 'njala-nrm-bsc-gen', name: 'B.Sc. in Natural Resources Management General', shortName: 'B.Sc. NRM General', level: 'degree', duration: '4 Years', faculty: 'njala-nrm', description: 'Broad education in natural resource management' },
      { id: 'njala-nrm-bsc-aqua-hons', name: 'B.Sc. with Honours in Aquaculture and Fisheries', shortName: 'B.Sc. Hons Aquaculture', level: 'degree', duration: '4 Years', faculty: 'njala-nrm', description: 'Advanced studies in fisheries and aquaculture' },
      { id: 'njala-nrm-bsc-for-hons', name: 'B.Sc. with Honours in Forestry', shortName: 'B.Sc. Hons Forestry', level: 'degree', duration: '4 Years', faculty: 'njala-nrm', description: 'Advanced forest management studies' },
      { id: 'njala-nrm-bsc-hort-hons', name: 'B.Sc. with Honours in Horticulture', shortName: 'B.Sc. Hons Horticulture', level: 'degree', duration: '4 Years', faculty: 'njala-nrm', description: 'Advanced plant science and horticulture' },
      { id: 'njala-nrm-bsc-wild-hons', name: 'B.Sc. with Honours in Wildlife Management, Biodiversity Conservation & Ecotourism', shortName: 'B.Sc. Hons Wildlife', level: 'degree', duration: '4 Years', faculty: 'njala-nrm', description: 'Studies in wildlife, conservation and tourism' },
      { id: 'njala-nrm-bsc-wood-hons', name: 'B.Sc. with Honours in Wood Science', shortName: 'B.Sc. Hons Wood Science', level: 'degree', duration: '4 Years', faculty: 'njala-nrm', description: 'Advanced wood technology and science' },

      // Non-degree Programs (Diploma)
      { id: 'njala-nrm-hd-aqua', name: 'Higher Diploma in Aquaculture and Fisheries', shortName: 'HD Aquaculture', level: 'diploma', duration: '3 Years', faculty: 'njala-nrm', description: 'Vocational training in fisheries' },
      { id: 'njala-nrm-od-aqua', name: 'Ordinary Diploma in Aquaculture and Fisheries', shortName: 'OD Aquaculture', level: 'diploma', duration: '2 Years', faculty: 'njala-nrm', description: 'Basic training in fisheries' },
      { id: 'njala-nrm-hd-for', name: 'Higher Diploma in Forestry', shortName: 'HD Forestry', level: 'diploma', duration: '3 Years', faculty: 'njala-nrm', description: 'Vocational training in forestry management' },
      { id: 'njala-nrm-od-for', name: 'Ordinary Diploma in Forestry', shortName: 'OD Forestry', level: 'diploma', duration: '2 Years', faculty: 'njala-nrm', description: 'Basic training in forestry' },
      { id: 'njala-nrm-hd-hort', name: 'Higher Diploma in Horticulture', shortName: 'HD Horticulture', level: 'diploma', duration: '3 Years', faculty: 'njala-nrm', description: 'Vocational training in horticulture' },
      { id: 'njala-nrm-od-hort', name: 'Ordinary Diploma in Horticulture', shortName: 'OD Horticulture', level: 'diploma', duration: '2 Years', faculty: 'njala-nrm', description: 'Basic training in horticulture' },
      { id: 'njala-nrm-hd-wild', name: 'Higher Diploma in Wildlife Management', shortName: 'HD Wildlife', level: 'diploma', duration: '3 Years', faculty: 'njala-nrm', description: 'Vocational training in wildlife conservation' },
      { id: 'njala-nrm-od-wild', name: 'Ordinary Diploma in Wildlife Management', shortName: 'OD Wildlife', level: 'diploma', duration: '2 Years', faculty: 'njala-nrm', description: 'Basic training in wildlife management' },
      { id: 'njala-nrm-hd-wood', name: 'Higher Diploma in Wood Science', shortName: 'HD Wood Science', level: 'diploma', duration: '3 Years', faculty: 'njala-nrm', description: 'Vocational training in wood technology' },
      { id: 'njala-nrm-od-wood', name: 'Ordinary Diploma in Wood Science', shortName: 'OD Wood Science', level: 'diploma', duration: '2 Years', faculty: 'njala-nrm', description: 'Basic training in wood science' },
      { id: 'njala-nrm-msc-wood-sci', name: 'Master of Science in Wood Science', shortName: 'M.Sc. Wood Sci', level: 'postgraduate', duration: '15 Months', faculty: 'njala-nrm', description: 'Advanced studies in timber technology' },
      { id: 'njala-nrm-mphil-eng', name: 'Mphil in Forest Engineering', shortName: 'Mphil Forest Eng', level: 'postgraduate', duration: '2 Years', faculty: 'njala-nrm', description: 'Postgraduate research in forest engineering' },
      { id: 'njala-nrm-phd-aqua-major', name: 'PhD in Aquaculture and Fisheries Management', shortName: 'PhD Aquaculture', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-nrm', description: 'Advanced research in aquatic management' },
      { id: 'njala-nrm-phd-bio', name: 'PhD in Biodiversity and Conservation', shortName: 'PhD Biodiversity', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-nrm', description: 'Doctoral research in ecosystem conservation' },

      // Certificate Programs
      { id: 'njala-nrm-cert-aqua', name: 'Certificate in Aquaculture and Fisheries', shortName: 'Cert. Aquaculture', level: 'certificate', duration: '1 Year', faculty: 'njala-nrm', description: 'Basic skills in aquaculture' },
      { id: 'njala-nrm-cert-for', name: 'Certificate in Forestry', shortName: 'Cert. Forestry', level: 'certificate', duration: '1 Year', faculty: 'njala-nrm', description: 'Basic skills in forestry' },
      { id: 'njala-nrm-cert-hort', name: 'Certificate in Horticulture', shortName: 'Cert. Horticulture', level: 'certificate', duration: '1 Year', faculty: 'njala-nrm', description: 'Basic skills in horticulture' },
      { id: 'njala-nrm-cert-wild', name: 'Certificate in Wildlife Management', shortName: 'Cert. Wildlife', level: 'certificate', duration: '1 Year', faculty: 'njala-nrm', description: 'Basic skills in wildlife mgmt' },
      { id: 'njala-nrm-cert-wood', name: 'Certificate in Wood Science', shortName: 'Cert. Wood Science', level: 'certificate', duration: '1 Year', faculty: 'njala-nrm', description: 'Basic skills in wood technology' },
      { id: 'njala-nrm-msc-nrm', name: 'Master of Science in Natural resources Management', shortName: 'M.Sc. NRM', level: 'postgraduate', duration: '15 Months', faculty: 'njala-nrm', description: 'Advanced natural resource management and policy' },
    ]
  },
  {
    id: 'njala-basic-edu',
    name: 'School of Basic Education',
    shortName: 'Basic Education',
    icon: '🎓',
    description: 'Foundation for primary, early childhood, and adult education',
    universityId: 'njala',
    courses: [
      // Graduate Programs
      { id: 'njala-basic-ma-adult', name: 'M.A.Ed. in Adult Education', shortName: 'M.A.Ed. Adult Ed', level: 'postgraduate', duration: '2 Years', faculty: 'njala-basic-edu', description: 'Advanced studies in adult learning and education' },
      { id: 'njala-basic-msc-comm', name: 'M.Sc. in Community Development Studies', shortName: 'M.Sc. Comm Development', level: 'postgraduate', duration: '15 Months', faculty: 'njala-basic-edu', description: 'Advanced community development research' },
      { id: 'njala-basic-phd-adult', name: 'MPhil/PhD in Adult Education', shortName: 'PhD Adult Ed', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-basic-edu', description: 'Doctoral research in adult education' },
      { id: 'njala-basic-phd-comm', name: 'MPhil/PhD in Community Development Studies', shortName: 'PhD Comm Development', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-basic-edu', description: 'Doctoral research in community development' },

      // Undergraduate Programs
      { id: 'njala-basic-bed-pri', name: 'B.Ed. Primary Education', shortName: 'B.Ed. Primary', level: 'degree', duration: '4 Years', faculty: 'njala-basic-edu', description: 'Specialized training for primary school teaching' },
      { id: 'njala-basic-bed-sec-jss', name: 'B.Ed. Secondary (All JSS Curriculum Subjects)', shortName: 'B.Ed. Secondary JSS', level: 'degree', duration: '4 Years', faculty: 'njala-basic-edu', description: 'Teaching junior secondary school subjects' },
      { id: 'njala-basic-baed-early', name: 'B.A.Ed. Early Childhood Care and Development', shortName: 'B.A.Ed. Early Childhood', level: 'degree', duration: '4 Years', faculty: 'njala-basic-edu', description: 'Professional training in early childhood education' },
      { id: 'njala-basic-bed-math', name: 'B.Ed. Mathematics', shortName: 'B.Ed. Mathematics', level: 'degree', duration: '4 Years', faculty: 'njala-basic-edu', description: 'Teaching of mathematics in basic education' },
      { id: 'njala-basic-bed-sci', name: 'B.Ed. Integrated Sciences', shortName: 'B.Ed. Integrated Sciences', level: 'degree', duration: '4 Years', faculty: 'njala-basic-edu', description: 'Teaching of integrated sciences' },
      { id: 'njala-basic-baed-adult', name: 'B.A.Ed. Adult Education', shortName: 'B.A.Ed. Adult Ed', level: 'degree', duration: '4 Years', faculty: 'njala-basic-edu', description: 'Fundamental adult education studies' },
      { id: 'njala-basic-bsc-comm-hons', name: 'B.Sc. (Hons.) Community Development Studies', shortName: 'B.Sc. Hons Comm Dev', level: 'degree', duration: '4 Years', faculty: 'njala-basic-edu', description: 'Studies in community empowerment and development' },
      { id: 'njala-basic-bed-nursery', name: 'Bachelor of Education (Nursery and Pre-school Education)', shortName: 'B.Ed. Nursery', level: 'degree', duration: '4 Years', faculty: 'njala-basic-edu', description: 'Specialized training for nursery and pre-school teaching' },

      // Certificate/Diploma Programs (HTC/TC)
      { id: 'njala-basic-htcp', name: 'Higher Teachers Certificate (Primary)', shortName: 'HTC(P)', level: 'certificate', duration: '3 Years', faculty: 'njala-basic-edu', description: 'Advanced primary teaching qualification' },
      { id: 'njala-basic-htcs', name: 'Higher Teachers Certificate (Secondary)', shortName: 'HTC(S)', level: 'certificate', duration: '3 Years', faculty: 'njala-basic-edu', description: 'Advanced secondary teaching qualification' },
      { id: 'njala-basic-htcs-early', name: 'H.T.C. (Secondary) Early Childhood Care and Development', shortName: 'HTC(S) Early Childhood', level: 'certificate', duration: '3 Years', faculty: 'njala-basic-edu', description: 'Secondary level training for early childhood' },
      { id: 'njala-basic-tc', name: 'Teachers Certificate (TC)', shortName: 'TC', level: 'certificate', duration: '3 Years', faculty: 'njala-basic-edu', description: 'Initial teaching certification' },
    ]
  },
  {
    id: 'njala-soc',
    name: 'School of Social Sciences & Law',
    shortName: 'Social Sciences',
    icon: '⚖️',
    description: 'Preparing the next generation of legal and financial leaders',
    universityId: 'njala',
    courses: [
      { id: 'njala-soc-llb', name: 'Bachelor of Law (LLB)', shortName: 'LLB Law', level: 'degree', duration: '4 Years', faculty: 'njala-soc', description: 'Professional legal education' },
      { id: 'njala-soc-acc', name: 'Bachelor of Science in Accounting', shortName: 'BSc. Accounting', level: 'degree', duration: '4 Years', faculty: 'njala-soc', description: 'Professional accounting and audit' },
      { id: 'njala-soc-agri-econ', name: 'Bachelor of Science in Agricultural Economics', shortName: 'BSc. Agri Economics', level: 'degree', duration: '4 Years', faculty: 'njala-soc', description: 'Economic analysis of agricultural systems' },
      { id: 'njala-soc-bank', name: 'Bachelor of Science in Banking and Finance', shortName: 'BSc. Banking/Finance', level: 'degree', duration: '4 Years', faculty: 'njala-soc', description: 'Financial systems and banking operations' },
      { id: 'njala-soc-bam-hons', name: 'Bachelors of Science (Hons) Business Administration and Management', shortName: 'BSc. Hons BAM', level: 'degree', duration: '4 Years', faculty: 'njala-soc', description: 'Advanced business leadership training' },
      { id: 'njala-soc-cert-ba', name: 'Certificate in Business Administration', shortName: 'Cert. BA', level: 'certificate', duration: '1 Year', faculty: 'njala-soc', description: 'Foundation in business principles' },
      { id: 'njala-soc-dip-bank', name: 'Diploma in Banking and Finance', shortName: 'Dip. Banking', level: 'diploma', duration: '2 Years', faculty: 'njala-soc', description: 'Vocational financial training' },
      { id: 'njala-soc-dip-bam', name: 'Diploma in Business Administration and Management', shortName: 'Dip. BAM', level: 'diploma', duration: '2 Years', faculty: 'njala-soc', description: 'Vocational business management skills' },
      { id: 'njala-soc-econ', name: 'Bachelor of Science in Economics', shortName: 'BSc. Economics', level: 'degree', duration: '4 Years', faculty: 'njala-soc', description: 'Micro and macro economic analysis' },
      { id: 'njala-soc-ent', name: 'Bachelor of Science in Entrepreneurship and Industrial Development', shortName: 'BSc. Entrepreneurship', level: 'degree', duration: '4 Years', faculty: 'njala-soc', description: 'Business creation and industrial growth' },
      { id: 'njala-soc-peace', name: 'Bachelor of Science in Peace and Development Studies', shortName: 'BSc. Peace & Dev', level: 'degree', duration: '4 Years', faculty: 'njala-soc', description: 'Conflict resolution and development' },
      { id: 'njala-soc-social-work', name: 'Bachelor of Science in Social Work', shortName: 'BSc. Social Work', level: 'degree', duration: '4 Years', faculty: 'njala-soc', description: 'Social welfare and community support' },
      { id: 'njala-soc-socio', name: 'Bachelor of Science in Sociology', shortName: 'BSc. Sociology', level: 'degree', duration: '4 Years', faculty: 'njala-soc', description: 'Study of society and social behavior' },
      { id: 'njala-soc-hd-social-work', name: 'Higher Diploma in Social Work', shortName: 'HD Social Work', level: 'diploma', duration: '3 Years', faculty: 'njala-soc', description: 'Advanced vocational social work training' },
      { id: 'njala-soc-mphil-finance', name: 'M.Phil in Finance', shortName: 'M.Phil Finance', level: 'postgraduate', duration: '2 Years', faculty: 'njala-soc', description: 'Postgraduate research in financial theory' },
      { id: 'njala-soc-ma-peace', name: 'Master of Arts in Peace and Development Studies', shortName: 'M.A. Peace & Dev', level: 'postgraduate', duration: '2 Years', faculty: 'njala-soc', description: 'Advanced research in conflict and development' },
      { id: 'njala-soc-mba-exec', name: 'Master of Business Administration (MBA) - Executive', shortName: 'MBA Executive', level: 'postgraduate', duration: '2 Years', faculty: 'njala-soc', description: 'Leadership training for senior professionals' },
      { id: 'njala-soc-mba-fin', name: 'Master of Business Administration (MBA) - Finance', shortName: 'MBA Finance', level: 'postgraduate', duration: '2 Years', faculty: 'njala-soc', description: 'Advanced business management with financial focus' },
      { id: 'njala-soc-mba-hr', name: 'Master of Business Administration (MBA) - Human Resources', shortName: 'MBA HR', level: 'postgraduate', duration: '2 Years', faculty: 'njala-soc', description: 'Advanced human resource management' },
      { id: 'njala-soc-mba-mark', name: 'Master of Business Administration (MBA) - Marketing', shortName: 'MBA Marketing', level: 'postgraduate', duration: '2 Years', faculty: 'njala-soc', description: 'Advanced marketing strategy and management' },
      { id: 'njala-soc-mba-proj', name: 'Master of Business Administration (MBA) - Project Management', shortName: 'MBA Project Mgmt', level: 'postgraduate', duration: '2 Years', faculty: 'njala-soc', description: 'Professional project management and leadership' },
      { id: 'njala-soc-mpa', name: 'Master of Public Administration', shortName: 'MPA', level: 'postgraduate', duration: '2 Years', faculty: 'njala-soc', description: 'Advanced public sector leadership and policy' },
      { id: 'njala-soc-msc-agri-econ', name: 'Master of Science in Agricultural Economics', shortName: 'M.Sc. Agri Econ', level: 'postgraduate', duration: '2 Years', faculty: 'njala-soc', description: 'Advanced economic analysis of agriculture' },
      { id: 'njala-soc-msc-econ', name: 'Master of Science in Economics', shortName: 'M.Sc. Economics', level: 'postgraduate', duration: '2 Years', faculty: 'njala-soc', description: 'Advanced theoretical and applied economics' },
      { id: 'njala-soc-msc-socio', name: 'Master of Science in Sociology', shortName: 'M.Sc. Sociology', level: 'postgraduate', duration: '2 Years', faculty: 'njala-soc', description: 'Advanced sociological research and theory' },
      { id: 'njala-soc-phd-admin', name: 'PhD in Administration and Management', shortName: 'PhD Admin/Mgmt', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-soc', description: 'Doctoral research in leadership and administration' },
      { id: 'njala-soc-phd-fin', name: 'PhD in Finance', shortName: 'PhD Finance', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-soc', description: 'Doctoral research in financial systems' },
      { id: 'njala-soc-phd-proj', name: 'PhD in Project Management', shortName: 'PhD Project Mgmt', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-soc', description: 'Doctoral research in project leadership' },
    ]
  },
  {
    id: 'njala-tech',
    name: 'School of Technology',
    shortName: 'Technology',
    icon: '💻',
    description: 'Innovating through engineering and computing',
    universityId: 'njala',
    courses: [
      { id: 'njala-tech-agri-eng', name: 'Bachelor of Science in Agricultural Engineering', shortName: 'BSc. Agri Eng', level: 'degree', duration: '4 Years', faculty: 'njala-tech', description: 'Engineering solutions for agriculture' },
      { id: 'njala-tech-phys', name: 'Bachelor of Science in Applied Physics (Biophysics Option)', shortName: 'BSc. Applied Physics', level: 'degree', duration: '4 Years', faculty: 'njala-tech', description: 'Physics applications in biological systems' },
      { id: 'njala-tech-bit', name: 'Bachelor of Science in Business and Information Technology', shortName: 'BSc. BIT', level: 'degree', duration: '4 Years', faculty: 'njala-tech', description: 'Integration of IT and business management' },
      { id: 'njala-tech-comp-sci', name: 'Bachelor of Science in Computer Science', shortName: 'BSc. Computer Science', level: 'degree', duration: '4 Years', faculty: 'njala-tech', description: 'Software engineering and computational systems' },
      { id: 'njala-tech-elec', name: 'Bachelor of Science in Electronics and Telecommunication', shortName: 'BSc. Electronics', level: 'degree', duration: '4 Years', faculty: 'njala-tech', description: 'Communication systems and electronic design' },
      { id: 'njala-tech-energy', name: 'Bachelor of Science in Energy Studies', shortName: 'BSc. Energy Studies', level: 'degree', duration: '4 Years', faculty: 'njala-tech', description: 'Sustainable energy and power systems' },
      { id: 'njala-tech-ind', name: 'Bachelor of Science in Industrial Technology', shortName: 'BSc. Industrial Tech', level: 'degree', duration: '4 Years', faculty: 'njala-tech', description: 'Industrial processes and manufacturing technology' },
      { id: 'njala-tech-math', name: 'Bachelor of Science in Mathematics', shortName: 'BSc. Mathematics', level: 'degree', duration: '4 Years', faculty: 'njala-tech', description: 'Pure and applied mathematical sciences' },
      { id: 'njala-tech-phys-comp', name: 'Bachelor of Science in Physics with Computer Science', shortName: 'BSc. Physics/CS', level: 'degree', duration: '4 Years', faculty: 'njala-tech', description: 'Integration of physics and computing' },
      { id: 'njala-tech-phys-tele', name: 'Bachelor of Science in Physics with Telecommunication option', shortName: 'BSc. Physics/Tele', level: 'degree', duration: '4 Years', faculty: 'njala-tech', description: 'Physics of communication and telecommunications' },
      { id: 'njala-tech-bsc-stat', name: 'Bachelor of Science in Statistics', shortName: 'BSc. Statistics', level: 'degree', duration: '4 Years', faculty: 'njala-tech', description: 'Advanced statistical analysis and theory' },
      { id: 'njala-tech-dip-csit', name: 'Diploma in Computer Science and Information Technology', shortName: 'Dip. CSIT', level: 'diploma', duration: '2 Years', faculty: 'njala-tech', description: 'Vocational IT and computing training' },
      { id: 'njala-tech-dip-elec', name: 'Diploma in Electronics and Computer Technology', shortName: 'Dip. Electronics', level: 'diploma', duration: '2 Years', faculty: 'njala-tech', description: 'Vocational electronic systems training' },
      { id: 'njala-tech-dip-ind', name: 'Diploma in Industrial Technology', shortName: 'Dip. Industrial Tech', level: 'diploma', duration: '2 Years', faculty: 'njala-tech', description: 'Practical industrial engineering skills' },
      { id: 'njala-tech-dip-stat', name: 'Diploma in Statistics', shortName: 'Dip. Statistics', level: 'diploma', duration: '2 Years', faculty: 'njala-tech', description: 'Applied statistical methods training' },
      { id: 'njala-tech-hd-csit', name: 'Higher Diploma in Computer Science and Information Technology', shortName: 'HD CSIT', level: 'diploma', duration: '3 Years', faculty: 'njala-tech', description: 'Professional IT and computing qualification' },
      { id: 'njala-tech-hd-sys-web', name: 'Higher Diploma in Computer Systems Technology with Combined (Web and Mobile)', shortName: 'HD Web & Mobile', level: 'diploma', duration: '3 Years', faculty: 'njala-tech', description: 'Advanced web and mobile systems development' },
      { id: 'njala-tech-hd-sys-net', name: 'Higher Diploma in Computer Systems Technology with Data Communications and networking', shortName: 'HD Networking', level: 'diploma', duration: '3 Years', faculty: 'njala-tech', description: 'Advanced network systems and communications' },
      { id: 'njala-tech-hd-sys-db', name: 'Higher Diploma in Computer Systems Technology with Database Design and Management', shortName: 'HD Database', level: 'diploma', duration: '3 Years', faculty: 'njala-tech', description: 'Advanced database architecture and management' },
      { id: 'njala-tech-hd-sys-prog', name: 'Higher Diploma in Computer Systems Technology with Technical Programming', shortName: 'HD Programming', level: 'diploma', duration: '3 Years', faculty: 'njala-tech', description: 'Professional software engineering and programming' },
      { id: 'njala-tech-hd-elec', name: 'Higher Diploma in Electronics and Computer Technology', shortName: 'HD Electronics', level: 'diploma', duration: '3 Years', faculty: 'njala-tech', description: 'Professional electronics systems qualification' },
      { id: 'njala-tech-hd-farm', name: 'Higher Diploma in Farm Mechanization', shortName: 'HD Farm Mech', level: 'diploma', duration: '3 Years', faculty: 'njala-tech', description: 'Technical training in agricultural machinery' },
      { id: 'njala-tech-hd-ind', name: 'Higher Diploma in Industrial Technology', shortName: 'HD Industrial Tech', level: 'diploma', duration: '3 Years', faculty: 'njala-tech', description: 'Professional industrial technology qualification' },
      { id: 'njala-tech-hd-stat', name: 'Higher Diploma in Statistics', shortName: 'HD Statistics', level: 'diploma', duration: '3 Years', faculty: 'njala-tech', description: 'Professional statistical analysis qualification' },
      { id: 'njala-tech-mphil-cs', name: 'M.Phil in Computer Science', shortName: 'M.Phil CS', level: 'postgraduate', duration: '2 Years', faculty: 'njala-tech', description: 'Postgraduate research in computing systems' },
      { id: 'njala-tech-msc-cs', name: 'Master of Science in Computer Science', shortName: 'M.Sc. CS', level: 'postgraduate', duration: '2 Years', faculty: 'njala-tech', description: 'Advanced studies in computer science and software' },
      { id: 'njala-tech-msc-geo-exp', name: 'Master of Science in Exploration Geophysics', shortName: 'M.Sc. Geophysics', level: 'postgraduate', duration: '2 Years', faculty: 'njala-tech', description: 'Advanced geophysical exploration techniques' },
      { id: 'njala-tech-msc-geo-min', name: 'Master of science in Exploration Geophysics (Mineral and Groundwater Exploration)', shortName: 'M.Sc. Geo Mineral', level: 'postgraduate', duration: '2 Years', faculty: 'njala-tech', description: 'Specialized mineral and water exploration' },
      { id: 'njala-tech-msc-is', name: 'Master of Science in Information Systems', shortName: 'M.Sc. IS', level: 'postgraduate', duration: '2 Years', faculty: 'njala-tech', description: 'Advanced information systems management' },
      { id: 'njala-tech-msc-post-harvest', name: 'Master of Science in Post Harvest Technology', shortName: 'M.Sc. Post Harvest', level: 'postgraduate', duration: '2 Years', faculty: 'njala-tech', description: 'Technology for agricultural products after harvest' },
      { id: 'njala-tech-msc-energy-env', name: 'Master of Science in Renewable Energy and the Environment', shortName: 'M.Sc. Energy Env', level: 'postgraduate', duration: '2 Years', faculty: 'njala-tech', description: 'Sustainable energy systems and environmental impact' },
      { id: 'njala-tech-msc-soil-water', name: 'Master of Science in Soil & Water Engineering', shortName: 'M.Sc. Soil & Water Eng', level: 'postgraduate', duration: '2 Years', faculty: 'njala-tech', description: 'Advanced agricultural engineering in soil and water' },
      { id: 'njala-tech-msc-stat-major', name: 'Master of Science in Statistics', shortName: 'M.Sc. Statistics', level: 'postgraduate', duration: '2 Years', faculty: 'njala-tech', description: 'Advanced research in statistical theory' },
      { id: 'njala-tech-msc-tele', name: 'Master of Science in Telecommunications and Networking', shortName: 'M.Sc. Telecommunications', level: 'postgraduate', duration: '2 Years', faculty: 'njala-tech', description: 'Advanced research in network systems' },
      { id: 'njala-tech-phd-agri-eng', name: 'PhD in Agric Engineering', shortName: 'PhD Agri Engineering', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-tech', description: 'Doctoral research in agricultural technology' },
      { id: 'njala-tech-phd-info', name: 'M.Phil and PhD programmes (Tech Options)', shortName: 'M.Phil/PhD Tech', level: 'postgraduate', duration: '2-4 Years', faculty: 'njala-tech', description: 'Research degrees in technology and engineering' },
    ]
  },
  {
    id: 'njala-env',
    name: 'School of Environmental Sciences',
    shortName: 'Environmental',
    icon: '🌍',
    description: 'Studying and protecting our natural environment',
    universityId: 'njala',
    courses: [
      { id: 'njala-env-ecology', name: 'Bachelor of Science in Applied Ecology and Conservation', shortName: 'BSc. Applied Ecology', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Eco-system management and biodiversity' },
      { id: 'njala-env-bio', name: 'Bachelor of Science in Biological Sciences', shortName: 'BSc. Bio Sciences', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Comprehensive biological research' },
      { id: 'njala-env-chem', name: 'Bachelor of Science in Chemistry', shortName: 'BSc. Chemistry', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Chemical sciences and research' },
      { id: 'njala-env-dev', name: 'Bachelor of Science in Development Studies', shortName: 'BSc. Dev Studies', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Sustainable development and community growth' },
      { id: 'njala-env-env-dev', name: 'Bachelor of Science in Environment and Development', shortName: 'BSc. Env & Dev', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Impact of development on local environments' },
      { id: 'njala-env-env-chem', name: 'Bachelor of Science in Environmental Chemistry', shortName: 'BSc. Env Chemistry', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Chemical processes in the environment' },
      { id: 'njala-env-qual', name: 'Bachelor of Science in Environmental Management and Quality Control', shortName: 'BSc. Env Management', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Environmental monitoring and quality standards' },
      { id: 'njala-env-phys', name: 'Bachelor of Science in Environmental Physics', shortName: 'BSc. Env Physics', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Physical principles of environmental science' },
      { id: 'njala-env-geo', name: 'Bachelor of Science in Geography', shortName: 'BSc. Geography', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Human and physical geography studies' },
      { id: 'njala-env-phys-pure', name: 'Bachelor of Science in Physics', shortName: 'BSc. Physics', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Pure physics and experimental research' },
      { id: 'njala-env-rural', name: 'Bachelor of Science in Rural Development', shortName: 'BSc. Rural Dev', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Transforming rural communities' },
      { id: 'njala-env-rural-studies', name: 'Bachelor of Science in Rural Development Studies', shortName: 'BSc. Rural Studies', level: 'degree', duration: '4 Years', faculty: 'njala-env', description: 'Academic research on rural development' },
      { id: 'njala-env-msc-bio', name: 'Master of Science in Biodiversity and Conservation', shortName: 'M.Sc. Biodiversity', level: 'postgraduate', duration: '15 Months', faculty: 'njala-env', description: 'Advanced study of biodiversity management' },
      { id: 'njala-env-msc-dev', name: 'Master of Science in Development Studies', shortName: 'M.Sc. Dev Studies', level: 'postgraduate', duration: '15 Months', faculty: 'njala-env', description: 'Advanced research in global development' },
      { id: 'njala-env-msc-env-chem', name: 'Master of Science in Environmental Chemistry', shortName: 'M.Sc. Env Chem', level: 'postgraduate', duration: '15 Months', faculty: 'njala-env', description: 'Chemical processes in environmental protection' },
      { id: 'njala-env-msc-qual', name: 'Master of Science in Environmental Management and Quality Control', shortName: 'M.Sc. Env Management', level: 'postgraduate', duration: '15 Months', faculty: 'njala-env', description: 'Systems approach to environmental quality' },
      { id: 'njala-env-msc-rural', name: 'Master of Science in Rural Development', shortName: 'M.Sc. Rural Dev', level: 'postgraduate', duration: '15 Months', faculty: 'njala-env', description: 'Advanced community and rural development' },
      { id: 'njala-env-mphil-dev', name: 'Mphil in Development Studies', shortName: 'Mphil Dev Studies', level: 'postgraduate', duration: '2 Years', faculty: 'njala-env', description: 'Master of Philosophy in development' },
      { id: 'njala-env-mphil-chem', name: 'MPhil in Environmental Chemistry', shortName: 'MPhil Env Chemistry', level: 'postgraduate', duration: '2 Years', faculty: 'njala-env', description: 'Postgraduate research in environmental chemistry' },
      { id: 'njala-env-mphil-geo', name: 'MPhil in Geography', shortName: 'MPhil Geography', level: 'postgraduate', duration: '2 Years', faculty: 'njala-env', description: 'Postgraduate research in geographical sciences' },
      { id: 'njala-env-phd-bio', name: 'PhD in Biological Sciences', shortName: 'PhD Bio Sciences', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-env', description: 'Doctoral research in biological systems' },
      { id: 'njala-env-phd-dev', name: 'PhD in Development Studies', shortName: 'PhD Dev Studies', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-env', description: 'Doctoral research in development models' },
      { id: 'njala-env-pgd-dev', name: 'Postgraduate Diploma in Development Studies', shortName: 'PGD Dev Studies', level: 'postgraduate', duration: '1 Year', faculty: 'njala-env', description: 'Professional diploma in development' },
    ]
  },
  {
    id: 'njala-health',
    name: 'School of Community Health Sciences',
    shortName: 'Community Health',
    icon: '🏥',
    description: 'Promoting public health and clinical excellence',
    universityId: 'njala',
    courses: [
      { id: 'njala-health-clin', name: 'Bachelor of Science in Community Health and Clinical Sciences', shortName: 'BSc. Comm Health', level: 'degree', duration: '4 Years', faculty: 'njala-health', description: 'Clinical practice and public health management' },
      { id: 'njala-health-nursing-hons', name: 'Bachelor of Science with Honours in Nursing', shortName: 'BSc. Hons Nursing', level: 'degree', duration: '4 Years', faculty: 'njala-health', description: 'Advanced professional nursing care' },
      { id: 'njala-health-ph-hons', name: 'Bachelor of Science with Honours in Public Health', shortName: 'BSc. Hons Public Health', level: 'degree', duration: '4 Years', faculty: 'njala-health', description: 'Advanced public health strategy and research' },
      { id: 'njala-health-dip-cha', name: 'Diploma in Community Health Assistant(CHA)', shortName: 'Dip. CHA', level: 'diploma', duration: '2 Years', faculty: 'njala-health', description: 'Vocational community health support training' },
      { id: 'njala-health-hd-clin', name: 'Higher Diploma in Community Health & Clinical Studies', shortName: 'HD Clinical Studies', level: 'diploma', duration: '3 Years', faculty: 'njala-health', description: 'Advanced clinical vocational training' },
      { id: 'njala-health-hd-ph', name: 'Higher Diploma in Environmental Health Sciences (Public Health)', shortName: 'HD Environmental Health', level: 'diploma', duration: '3 Years', faculty: 'njala-health', description: 'Professional environmental health training' },
      { id: 'njala-health-hd-ocho', name: 'Higher Diploma in Ophthalmic for Community Health Officers (OCHO)', shortName: 'HD OCHO', level: 'diploma', duration: '3 Years', faculty: 'njala-health', description: 'Specialized ophthalmic training for CHOs' },
      { id: 'njala-health-hd-dpdt', name: 'Higher Diploma in Pharmacies Dispensing Technology (DPDT)', shortName: 'HD Pharmacies', level: 'diploma', duration: '3 Years', faculty: 'njala-health', description: 'Technical training in pharmacy dispensing' },
      { id: 'njala-health-hd-srn', name: 'Higher Diploma in State Registered Nurse (SRN)', shortName: 'HD SRN', level: 'diploma', duration: '3 Years', faculty: 'njala-health', description: 'Advanced nursing certification' },
      { id: 'njala-health-mphil-biostats', name: 'MPhil in Biostasistics and health Informatics', shortName: 'MPhil Biostats', level: 'postgraduate', duration: '2 Years', faculty: 'njala-health', description: 'Research in biostatistics and informatics' },
      { id: 'njala-health-phd-ph', name: 'PhD in Public Health', shortName: 'PhD Public Health', level: 'postgraduate', duration: '3-4 Years', faculty: 'njala-health', description: 'Doctoral research in health systems' },
      { id: 'njala-health-pgd-health', name: 'Postgraduate Diploma in Health', shortName: 'PGD Health', level: 'postgraduate', duration: '1 Year', faculty: 'njala-health', description: 'Advanced diploma in health administration' },
      { id: 'njala-health-msc-ph', name: 'Master of Science in Public Health', shortName: 'M.Sc. Public Health', level: 'postgraduate', duration: '2 Years', faculty: 'njala-health', description: 'Advanced global public health research' },
    ]
  }
];

export function getCoursesByLevel(level: ProgramLevel, universityId?: string): Course[] {
  let filteredFaculties = faculties;
  if (universityId) {
    filteredFaculties = faculties.filter(f => f.universityId === universityId);
  }
  return filteredFaculties.flatMap(f => f.courses.filter(c => c.level === level));
}

export function getFacultiesByLevel(level: ProgramLevel, universityId?: string): Faculty[] {
  let filteredFaculties = faculties;
  if (universityId) {
    filteredFaculties = faculties.filter(f => f.universityId === universityId);
  }
  return filteredFaculties.filter(f => f.courses.some(c => c.level === level));
}

export function getCoursesByFacultyAndLevel(facultyId: string, level: ProgramLevel): Course[] {
  const faculty = faculties.find(f => f.id === facultyId);
  if (!faculty) return [];
  return faculty.courses.filter(c => c.level === level);
}

export function getCourseById(courseId: string): Course | undefined {
  for (const faculty of faculties) {
    const course = faculty.courses.find(c => c.id === courseId);
    if (course) return course;
  }
  return undefined;
}

export function getFacultyById(facultyId: string): Faculty | undefined {
  return faculties.find(f => f.id === facultyId);
}

export function getUniversityById(universityId: string): University | undefined {
  return universities.find(u => u.id === universityId);
}
