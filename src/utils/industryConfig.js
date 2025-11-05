// Industry-specific data configuration for N8n workflows

export const industries = [
  {
    id: 'education',
    name: 'Education',
    icon: 'school',
    description: 'K-12, Higher Education, Online Learning',
  },
  {
    id: 'technology',
    name: 'Computer & Web Development',
    icon: 'computer',
    description: 'Software, Web Apps, Tech Solutions',
  },
  {
    id: 'law',
    name: 'Law & Legal Services',
    icon: 'gavel',
    description: 'Legal Documents, Case Analysis',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    icon: 'local_hospital',
    description: 'Medical Research, Clinical Documentation',
  },
  {
    id: 'competition',
    name: 'Competitions & Hackathons',
    icon: 'emoji_events',
    description: 'Coding Contests, Innovation Challenges',
  },
  {
    id: 'events',
    name: 'Events & Conferences',
    icon: 'event',
    description: 'Conference Talks, Presentations',
  },
  {
    id: 'business',
    name: 'Business & Finance',
    icon: 'business',
    description: 'Business Plans, Financial Reports',
  },
  {
    id: 'creative',
    name: 'Creative & Design',
    icon: 'palette',
    description: 'Design Projects, Creative Work',
  },
]

// Industry-specific rubric templates
export const industryRubrics = {
  education: {
    defaultCriteria: [
      { name: 'Content Knowledge', weight: 30, description: 'Understanding of subject matter' },
      { name: 'Critical Thinking', weight: 25, description: 'Analysis and reasoning skills' },
      { name: 'Presentation Quality', weight: 20, description: 'Clarity and organization' },
      { name: 'Originality', weight: 15, description: 'Creative and unique approach' },
      { name: 'Technical Execution', weight: 10, description: 'Proper format and citations' },
    ],
    gradingScale: [
      { name: 'Excellent', range: '90-100', description: 'Exceptional work exceeding expectations' },
      { name: 'Good', range: '80-89', description: 'Strong work meeting all requirements' },
      { name: 'Satisfactory', range: '70-79', description: 'Acceptable work with minor issues' },
      { name: 'Needs Improvement', range: '60-69', description: 'Below expectations, significant gaps' },
      { name: 'Unsatisfactory', range: '0-59', description: 'Does not meet minimum standards' },
    ],
    additionalFields: ['gradeLevel', 'subject', 'assignmentType', 'learningObjectives'],
  },

  technology: {
    defaultCriteria: [
      { name: 'Code Quality', weight: 30, description: 'Clean, maintainable, well-structured code' },
      { name: 'Functionality', weight: 25, description: 'Features work as intended' },
      { name: 'Innovation', weight: 20, description: 'Creative solutions and approaches' },
      { name: 'Documentation', weight: 15, description: 'Clear README and code comments' },
      { name: 'Best Practices', weight: 10, description: 'Following industry standards' },
    ],
    gradingScale: [
      { name: 'Production Ready', range: '90-100', description: 'Enterprise-grade quality' },
      { name: 'Well Implemented', range: '80-89', description: 'Minor improvements needed' },
      { name: 'Functional', range: '70-79', description: 'Works but needs refinement' },
      { name: 'Needs Work', range: '60-69', description: 'Significant issues present' },
      { name: 'Incomplete', range: '0-59', description: 'Major functionality missing' },
    ],
    additionalFields: ['techStack', 'programmingLanguages', 'framework', 'deploymentStatus'],
  },

  law: {
    defaultCriteria: [
      { name: 'Legal Accuracy', weight: 35, description: 'Correct application of law' },
      { name: 'Research Quality', weight: 25, description: 'Thorough case law and statutes' },
      { name: 'Argumentation', weight: 20, description: 'Logical and persuasive reasoning' },
      { name: 'Writing Quality', weight: 15, description: 'Professional legal writing' },
      { name: 'Citations', weight: 5, description: 'Proper legal citation format' },
    ],
    gradingScale: [
      { name: 'Excellent', range: '90-100', description: 'Publishable quality' },
      { name: 'Good', range: '80-89', description: 'Strong legal analysis' },
      { name: 'Satisfactory', range: '70-79', description: 'Adequate legal work' },
      { name: 'Below Standard', range: '60-69', description: 'Needs substantial revision' },
      { name: 'Unsatisfactory', range: '0-59', description: 'Insufficient legal analysis' },
    ],
    additionalFields: ['caseType', 'jurisdiction', 'practiceArea', 'documentType'],
  },

  healthcare: {
    defaultCriteria: [
      { name: 'Medical Accuracy', weight: 35, description: 'Correct medical information' },
      { name: 'Evidence-Based', weight: 25, description: 'Supported by research' },
      { name: 'Patient Safety', weight: 20, description: 'Safety considerations addressed' },
      { name: 'Compliance', weight: 15, description: 'Regulatory and ethical standards' },
      { name: 'Documentation', weight: 5, description: 'Proper medical documentation' },
    ],
    gradingScale: [
      { name: 'Excellent', range: '90-100', description: 'Exceeds medical standards' },
      { name: 'Good', range: '80-89', description: 'Meets professional standards' },
      { name: 'Satisfactory', range: '70-79', description: 'Acceptable with minor issues' },
      { name: 'Below Standard', range: '60-69', description: 'Safety or accuracy concerns' },
      { name: 'Unacceptable', range: '0-59', description: 'Critical deficiencies' },
    ],
    additionalFields: ['medicalSpecialty', 'documentType', 'patientPopulation', 'regulatoryStandards'],
  },

  competition: {
    defaultCriteria: [
      { name: 'Innovation', weight: 30, description: 'Originality and creativity' },
      { name: 'Technical Execution', weight: 25, description: 'Quality of implementation' },
      { name: 'Problem Solving', weight: 20, description: 'Effectiveness of solution' },
      { name: 'Presentation', weight: 15, description: 'Demo and pitch quality' },
      { name: 'Impact Potential', weight: 10, description: 'Real-world applicability' },
    ],
    gradingScale: [
      { name: 'Outstanding', range: '90-100', description: 'Award-winning quality' },
      { name: 'Excellent', range: '80-89', description: 'Strong competitive entry' },
      { name: 'Good', range: '70-79', description: 'Solid submission' },
      { name: 'Average', range: '60-69', description: 'Met basic requirements' },
      { name: 'Below Average', range: '0-59', description: 'Needs significant improvement' },
    ],
    additionalFields: ['competitionType', 'teamSize', 'theme', 'duration'],
  },

  events: {
    defaultCriteria: [
      { name: 'Content Quality', weight: 30, description: 'Value and relevance of content' },
      { name: 'Delivery', weight: 25, description: 'Presentation and engagement' },
      { name: 'Audience Engagement', weight: 20, description: 'Interaction and participation' },
      { name: 'Organization', weight: 15, description: 'Structure and flow' },
      { name: 'Time Management', weight: 10, description: 'Adherence to schedule' },
    ],
    gradingScale: [
      { name: 'Outstanding', range: '90-100', description: 'Memorable presentation' },
      { name: 'Excellent', range: '80-89', description: 'Highly effective' },
      { name: 'Good', range: '70-79', description: 'Achieved objectives' },
      { name: 'Fair', range: '60-69', description: 'Room for improvement' },
      { name: 'Poor', range: '0-59', description: 'Did not meet expectations' },
    ],
    additionalFields: ['eventType', 'audienceSize', 'duration', 'format'],
  },

  business: {
    defaultCriteria: [
      { name: 'Market Analysis', weight: 25, description: 'Understanding of market and competition' },
      { name: 'Financial Viability', weight: 25, description: 'Sound financial projections' },
      { name: 'Strategy', weight: 20, description: 'Clear business strategy' },
      { name: 'Execution Plan', weight: 20, description: 'Realistic implementation roadmap' },
      { name: 'Presentation', weight: 10, description: 'Professional documentation' },
    ],
    gradingScale: [
      { name: 'Investment Ready', range: '90-100', description: 'Ready for funding' },
      { name: 'Strong Plan', range: '80-89', description: 'Minor refinements needed' },
      { name: 'Viable', range: '70-79', description: 'Needs some development' },
      { name: 'Needs Work', range: '60-69', description: 'Significant gaps present' },
      { name: 'Not Viable', range: '0-59', description: 'Major issues to address' },
    ],
    additionalFields: ['businessType', 'industry', 'stage', 'fundingNeeds'],
  },

  creative: {
    defaultCriteria: [
      { name: 'Creativity', weight: 30, description: 'Originality and artistic vision' },
      { name: 'Technical Skill', weight: 25, description: 'Execution and craftsmanship' },
      { name: 'Concept', weight: 20, description: 'Strength of underlying idea' },
      { name: 'Aesthetics', weight: 15, description: 'Visual/sensory appeal' },
      { name: 'Impact', weight: 10, description: 'Emotional or intellectual resonance' },
    ],
    gradingScale: [
      { name: 'Exceptional', range: '90-100', description: 'Portfolio/exhibition quality' },
      { name: 'Excellent', range: '80-89', description: 'Professional level work' },
      { name: 'Good', range: '70-79', description: 'Solid creative execution' },
      { name: 'Developing', range: '60-69', description: 'Shows potential' },
      { name: 'Needs Improvement', range: '0-59', description: 'Requires more development' },
    ],
    additionalFields: ['medium', 'style', 'projectType', 'targetAudience'],
  },
}

// Field configurations for additional industry-specific data
export const additionalFieldConfigs = {
  // Education
  gradeLevel: {
    label: 'Grade Level',
    type: 'select',
    options: ['K-5', '6-8', '9-12', 'Undergraduate', 'Graduate', 'Professional Development'],
    required: true,
  },
  subject: {
    label: 'Subject Area',
    type: 'text',
    placeholder: 'e.g., Mathematics, English, Science',
    required: true,
  },
  assignmentType: {
    label: 'Assignment Type',
    type: 'select',
    options: ['Essay', 'Project', 'Presentation', 'Lab Report', 'Research Paper', 'Other'],
    required: true,
  },
  learningObjectives: {
    label: 'Learning Objectives',
    type: 'textarea',
    placeholder: 'List the key learning objectives this assignment addresses',
    required: false,
  },

  // Technology
  techStack: {
    label: 'Tech Stack',
    type: 'text',
    placeholder: 'e.g., React, Node.js, MongoDB',
    required: true,
  },
  programmingLanguages: {
    label: 'Programming Languages',
    type: 'text',
    placeholder: 'e.g., JavaScript, Python, Java',
    required: true,
  },
  framework: {
    label: 'Framework/Library',
    type: 'text',
    placeholder: 'e.g., React, Vue, Angular, Django',
    required: false,
  },
  deploymentStatus: {
    label: 'Deployment Status',
    type: 'select',
    options: ['Not Deployed', 'Deployed - Demo', 'Deployed - Production', 'In Progress'],
    required: true,
  },

  // Law
  caseType: {
    label: 'Case Type',
    type: 'select',
    options: ['Civil', 'Criminal', 'Administrative', 'Constitutional', 'Other'],
    required: true,
  },
  jurisdiction: {
    label: 'Jurisdiction',
    type: 'text',
    placeholder: 'e.g., Federal, State, County',
    required: true,
  },
  practiceArea: {
    label: 'Practice Area',
    type: 'text',
    placeholder: 'e.g., Contract Law, Family Law, Corporate Law',
    required: true,
  },
  documentType: {
    label: 'Document Type',
    type: 'select',
    options: ['Brief', 'Memo', 'Motion', 'Contract', 'Opinion', 'Other'],
    required: true,
  },

  // Healthcare
  medicalSpecialty: {
    label: 'Medical Specialty',
    type: 'text',
    placeholder: 'e.g., Cardiology, Pediatrics, Surgery',
    required: true,
  },
  patientPopulation: {
    label: 'Patient Population',
    type: 'text',
    placeholder: 'e.g., Adults, Pediatric, Geriatric',
    required: false,
  },
  regulatoryStandards: {
    label: 'Regulatory Standards',
    type: 'text',
    placeholder: 'e.g., HIPAA, FDA, Joint Commission',
    required: false,
  },

  // Competition
  competitionType: {
    label: 'Competition Type',
    type: 'select',
    options: ['Hackathon', 'Coding Challenge', 'Innovation Contest', 'Pitch Competition', 'Design Challenge', 'Other'],
    required: true,
  },
  teamSize: {
    label: 'Team Size',
    type: 'number',
    placeholder: 'Number of team members',
    required: true,
  },
  theme: {
    label: 'Competition Theme',
    type: 'text',
    placeholder: 'e.g., Healthcare Innovation, FinTech Solutions',
    required: false,
  },
  duration: {
    label: 'Duration',
    type: 'text',
    placeholder: 'e.g., 24 hours, 48 hours, 1 week',
    required: false,
  },

  // Events
  eventType: {
    label: 'Event Type',
    type: 'select',
    options: ['Conference', 'Workshop', 'Webinar', 'Panel Discussion', 'Keynote', 'Other'],
    required: true,
  },
  audienceSize: {
    label: 'Expected Audience Size',
    type: 'select',
    options: ['< 50', '50-100', '100-300', '300-500', '500+'],
    required: false,
  },
  format: {
    label: 'Format',
    type: 'select',
    options: ['In-Person', 'Virtual', 'Hybrid'],
    required: true,
  },

  // Business
  businessType: {
    label: 'Business Type',
    type: 'select',
    options: ['Startup', 'Small Business', 'Enterprise', 'Non-Profit', 'Other'],
    required: true,
  },
  stage: {
    label: 'Business Stage',
    type: 'select',
    options: ['Idea Stage', 'MVP', 'Early Revenue', 'Growth Stage', 'Established'],
    required: true,
  },
  fundingNeeds: {
    label: 'Funding Needs',
    type: 'text',
    placeholder: 'e.g., $50K seed funding',
    required: false,
  },

  // Creative
  medium: {
    label: 'Medium',
    type: 'text',
    placeholder: 'e.g., Digital Art, Photography, Video, Music',
    required: true,
  },
  style: {
    label: 'Style/Genre',
    type: 'text',
    placeholder: 'e.g., Abstract, Realism, Documentary',
    required: false,
  },
  projectType: {
    label: 'Project Type',
    type: 'select',
    options: ['Portfolio Piece', 'Commercial Project', 'Personal Work', 'Client Work', 'Other'],
    required: true,
  },
  targetAudience: {
    label: 'Target Audience',
    type: 'text',
    placeholder: 'e.g., Young Adults, Professionals, General Public',
    required: false,
  },
}
