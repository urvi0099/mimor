export const REPORT_TYPES = {
  1: 'Who is living in the building',
  2: 'Who is moving in',
  3: 'Who is moving out',
  4: 'Who has moved out',
  5: 'Who\'s registration is incomplete',
  6: 'Email/SMS Notifications history',
  7: 'ALL Registrations (Residing and Non Residing)',
  8: 'Resident information - all buildings',
  9: 'Which Apartments Have No Residing Residents',
  10: 'Owners (Residing and Non-Residing)',
  11: 'Full Resident List (Tenants, Owners Residing and Owners Non Residing)',
  12: 'Lift Bookings List',
  13: 'All Parcels that have been delivered',
  14: 'All Parcels that have been collected',
  15: 'Parcels awaiting collection',
};

export const SORTING_ORDER = {
  'asc': 'Smallest to largest (A-Z)',
  'desc': 'Largest to smallest (Z-A)',
};

export const TIME_PERIODS1 = {
  1: 'Today',
  2: 'Last week',
  3: 'Last month',
  4: 'Last 6 months',
  5: 'Last year',
  6: 'All Time',
};

export const TIME_PERIODS2 = {
  1: 'Today',
  2: 'Next week',
  3: 'Next month',
  4: 'Next 6 months',
  5: 'Next year',
};

export const MASKS = [
  { // name: 'mask#1 - mob 1: 61 04xx xxx xxx',
    reg: /^6104[\d]{8}$/,
    mask: '99 9999 999 999',
  },
  { // name: 'mask#2 - house 1: 61 0[^4] xxxx xxxx',
    reg: /^610[^4]{1}[\d]{8}$/,
    mask: '99 99 9999 9999',
  },
  {  // name: 'mask#3 - house 2: 61 [^0]xxx xxxx',
    reg: /^61[^0]{1}[\d]{7}$/,
    mask: '99 9999 9999',
  },
  {  // name: 'mask#4 - mob 2: 04xx xxx xxx',
    reg: /^04[\d]{8}$/,
    mask: '9999 999 999',
  },
  {  // name: 'mask#5 - house 3: 0[^4] xxxx xxxx',
    reg: /^0[^4]{1}[\d]{8}$/,
    mask: '99 9999 9999',
  },
  {  // name: 'mask#6 - house 4: [^06]{1}xxx xxxx',
    reg: /^[^06]{1}[\d]{7}$/,
    mask: '9999 9999',
  },
];