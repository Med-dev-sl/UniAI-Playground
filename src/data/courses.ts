export type ProgramLevel = 'degree' | 'diploma' | 'certificate';

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
  courses: Course[];
}

export const faculties: Faculty[] = [
  {
    id: 'engineering',
    name: 'Faculty of Engineering and Innovation',
    shortName: 'Engineering',
    icon: '⚙️',
    description: 'Building the future through innovation and technology',
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
  }
];

export function getCoursesByLevel(level: ProgramLevel): Course[] {
  return faculties.flatMap(f => f.courses.filter(c => c.level === level));
}

export function getFacultiesByLevel(level: ProgramLevel): Faculty[] {
  return faculties.filter(f => f.courses.some(c => c.level === level));
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