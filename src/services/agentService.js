// Agent Directory & Broker Services for Rupandehi Property Hub

export const VERIFIED_AGENTS = [
  {
    id: 'agent_anil_01',
    name: 'Anil Chaudhary',
    agency: 'Rupandehi Real Estate Advisory Desk',
    role: 'Principal Broker & Lead Advisor',
    phone: '9817486280',
    whatsapp: '9779817486280',
    email: 'anil@rupandehipropertyhub.com',
    licenseNo: 'DOI-LUMB-2079-041',
    officeAddress: 'Traffic Chowk, Butwal-6, Rupandehi',
    serviceAreas: ['Butwal', 'Tilottama', 'Bhairahawa', 'Devdaha'],
    experienceYears: 12,
    activeListingsCount: 18,
    closedDealsCount: 145,
    rating: 4.9,
    reviewsCount: 38,
    specialization: 'Commercial Showrooms, Highway Plots & Residential Estates',
    isVerified: true,
    avatar: 'AC',
    avatarBg: '#0f766e',
  },
  {
    id: 'agent_sunita_02',
    name: 'Sunita Gurung',
    agency: 'Tilottama Homes & Land Advisory',
    role: 'Senior Residential Consultant',
    phone: '9847012345',
    whatsapp: '9779847012345',
    email: 'sunita.gurung@rupandehipropertyhub.com',
    licenseNo: 'DOI-LUMB-2080-019',
    officeAddress: 'Drivertole, Tilottama-3, Rupandehi',
    serviceAreas: ['Tilottama', 'Bhalwari', 'Kotihawa'],
    experienceYears: 8,
    activeListingsCount: 12,
    closedDealsCount: 86,
    rating: 4.8,
    reviewsCount: 29,
    specialization: 'Independent Bungalows & Gated Residential Plots',
    isVerified: true,
    avatar: 'SG',
    avatarBg: '#0284c7',
  },
  {
    id: 'agent_rajesh_03',
    name: 'Rajesh Tharu',
    agency: 'Lumbini Industrial & Logistics Realty',
    role: 'Industrial & Agricultural Specialist',
    phone: '9801987654',
    whatsapp: '9779801987654',
    email: 'rajesh.tharu@rupandehipropertyhub.com',
    licenseNo: 'DOI-LUMB-2080-088',
    officeAddress: 'Bank Road, Siddharthanagar-4 (Bhairahawa)',
    serviceAreas: ['Bhairahawa', 'SEZ Logistics Corridor', 'Lumbini'],
    experienceYears: 10,
    activeListingsCount: 9,
    closedDealsCount: 72,
    rating: 4.9,
    reviewsCount: 24,
    specialization: 'Warehouses, Factory Sheds & Large Kattha/Bigha Parcels',
    isVerified: true,
    avatar: 'RT',
    avatarBg: '#7c3aed',
  },
  {
    id: 'agent_bikram_04',
    name: 'Bikram Pandey',
    agency: 'Sainamaina Land & Housing Network',
    role: 'Area Planning & Plotting Advisor',
    phone: '9857056789',
    whatsapp: '9779857056789',
    email: 'bikram.pandey@rupandehipropertyhub.com',
    licenseNo: 'DOI-LUMB-2081-012',
    officeAddress: 'Murgiya Chowk, Sainamaina-2, Rupandehi',
    serviceAreas: ['Sainamaina', 'Devdaha', 'Saljhandi'],
    experienceYears: 6,
    activeListingsCount: 7,
    closedDealsCount: 44,
    rating: 4.7,
    reviewsCount: 19,
    specialization: 'Plotted Townships, Canal-Facing Parcels & Farmsteads',
    isVerified: true,
    avatar: 'BP',
    avatarBg: '#d97706',
  },
];

export async function getVerifiedAgents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(VERIFIED_AGENTS);
    }, 150);
  });
}

export async function getAgentById(agentId) {
  return VERIFIED_AGENTS.find((a) => a.id === agentId) || null;
}
