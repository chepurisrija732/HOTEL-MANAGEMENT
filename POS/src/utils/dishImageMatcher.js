// Local, verified dish images matching item names exactly
export const DISH_IMAGE_MAP = {
  // Shawarma & Wraps
  'shawarma': '/images/dishes/shawarma.jpg',
  'chicken shawarma': '/images/dishes/shawarma.jpg',
  'wrap': '/images/dishes/shawarma.jpg',

  // Ice Cream & Sundaes
  'ice cream': '/images/dishes/ice_cream.jpg',
  'icecream': '/images/dishes/ice_cream.jpg',
  'kulfi': '/images/dishes/matka_kulfi.jpg',
  'falooda': '/images/dishes/matka_kulfi.jpg',
  'gulab jamun': '/images/dishes/gulab_jamun.jpg',
  'shahi tukda': '/images/dishes/shahi_tukda.jpg',

  // Biryanis & Rice
  'hyderabadi chicken dum biryani': '/images/dishes/hyderabadi_chicken_biryani.jpg',
  'royal mutton dum biryani': '/images/dishes/mutton_biryani.jpg',
  'special boneless chicken biryani': '/images/dishes/hyderabadi_chicken_biryani.jpg',
  'chicken 65 biryani': '/images/dishes/hyderabadi_chicken_biryani.jpg',
  'hyderabadi veg dum biryani': '/images/dishes/hyderabadi_chicken_biryani.jpg',
  'paneer tikka dum biryani': '/images/dishes/paneer_tikka_biryani.jpg',
  'spicy prawns biryani': '/images/dishes/hyderabadi_chicken_biryani.jpg',
  'prawn biryani': '/images/dishes/hyderabadi_chicken_biryani.jpg',
  'egg dum biryani': '/images/dishes/egg_biryani.jpg',
  'egg biryani': '/images/dishes/egg_biryani.jpg',

  // Starters
  'crispy chicken 65': '/images/dishes/crispy_chicken_65.jpg',
  'chicken 65': '/images/dishes/crispy_chicken_65.jpg',
  'paneer 65': '/images/dishes/paneer_65.jpg',
  'paneer 65 crispy': '/images/dishes/paneer_65.jpg',
  'chilli chicken': '/images/dishes/chilli_chicken.jpg',
  'chilli chicken dry': '/images/dishes/chilli_chicken.jpg',
  'crispy corn': '/images/dishes/crispy_chicken_65.jpg', // No specific image for corn, fallback to starter
  'crispy corn salt & pepper': '/images/dishes/crispy_chicken_65.jpg',
  'corn': '/images/dishes/crispy_chicken_65.jpg',
  'apollo fish fry': '/images/dishes/apollo_fish_fry.jpg',
  'fish fry': '/images/dishes/apollo_fish_fry.jpg',

  // Tandoor & Kebabs
  'tandoori chicken': '/images/dishes/tandoori_chicken.jpg',
  'tandoori chicken (half / full)': '/images/dishes/tandoori_chicken.jpg',
  'murgh malai kebab': '/images/dishes/murgh_malai_kebab.jpg',
  'malai kebab': '/images/dishes/murgh_malai_kebab.jpg',
  'tandoori paneer tikka': '/images/dishes/tandoori_chicken.jpg', // Fallback
  'paneer tikka': '/images/dishes/tandoori_chicken.jpg', // Fallback
  'mutton seekh kebab': '/images/dishes/mutton_seekh_kebab.jpg',
  'seekh kebab': '/images/dishes/mutton_seekh_kebab.jpg',
  'kebab': '/images/dishes/mutton_seekh_kebab.jpg',

  // Curries & Main Course
  'classic butter chicken': '/images/dishes/butter_chicken.jpg',
  'butter chicken': '/images/dishes/butter_chicken.jpg',
  'kadai chicken': '/images/dishes/kadai_chicken.jpg',
  'kadai chicken masala': '/images/dishes/kadai_chicken.jpg',
  'shahi paneer': '/images/dishes/shahi_paneer.jpg',
  'shahi paneer butter masala': '/images/dishes/shahi_paneer.jpg',
  'paneer butter masala': '/images/dishes/shahi_paneer.jpg',
  'dal makhani': '/images/dishes/dal_makhani.jpg',
  'dal makhani bukhara': '/images/dishes/dal_makhani.jpg',
  'mutton rogan josh': '/images/dishes/butter_chicken.jpg', // Fallback
  'rogan josh': '/images/dishes/butter_chicken.jpg',

  // Breads / Naan / Roti
  'butter garlic naan': '/images/dishes/butter_garlic_naan.jpg',
  'garlic naan': '/images/dishes/butter_garlic_naan.jpg',
  'cheese garlic naan': '/images/dishes/butter_garlic_naan.jpg',
  'cheese naan': '/images/dishes/butter_garlic_naan.jpg',
  'naan': '/images/dishes/butter_garlic_naan.jpg',
  'tandoori roti': '/images/dishes/tandoori_roti.jpg',
  'tandoori roti (butter)': '/images/dishes/tandoori_roti.jpg',
  'roti': '/images/dishes/tandoori_roti.jpg',

  // Beverages & Lassi
  'royal mango lassi': '/images/dishes/royal_mango_lassi.jpg',
  'mango lassi': '/images/dishes/royal_mango_lassi.jpg',
  'sweet punjabi lassi': '/images/dishes/sweet_lassi.jpg',
  'lassi': '/images/dishes/sweet_lassi.jpg',
  'fresh masala lemonade': '/images/dishes/lemonade.jpg',
  'lemonade': '/images/dishes/lemonade.jpg',
  'spiced buttermilk (chaas)': '/images/dishes/spiced_buttermilk.jpg',
  'chaas': '/images/dishes/spiced_buttermilk.jpg',
  'buttermilk': '/images/dishes/spiced_buttermilk.jpg'
};

/**
 * Resolves the most accurate and beautiful high-definition image for any dish
 * by analyzing its name and category.
 */
export function getAccurateDishImage(item) {
  if (!item) return DISH_IMAGE_MAP['hyderabadi chicken dum biryani'];

  const nameKey = (item.name || '').trim().toLowerCase();

  // 1. Exact Name match
  if (DISH_IMAGE_MAP[nameKey]) {
    return DISH_IMAGE_MAP[nameKey];
  }

  // 2. Keyword-based matching
  for (const [key, url] of Object.entries(DISH_IMAGE_MAP)) {
    if (nameKey.includes(key) || key.includes(nameKey)) {
      return url;
    }
  }

  // 3. Category fallbacks
  const cat = (item.category || '').toLowerCase();
  if (cat === 'desserts' || cat.includes('dessert') || cat.includes('sweet') || cat.includes('icecream')) {
    return DISH_IMAGE_MAP['ice cream'];
  }
  if (cat === 'breads' || cat.includes('bread') || cat.includes('roti') || cat.includes('naan')) {
    return DISH_IMAGE_MAP['butter garlic naan'];
  }
  if (cat === 'beverages' || cat.includes('drink') || cat.includes('lassi') || cat.includes('juice')) {
    return DISH_IMAGE_MAP['royal mango lassi'];
  }
  if (cat === 'tandoor-kebabs' || cat.includes('kebab') || cat.includes('tandoor')) {
    return DISH_IMAGE_MAP['tandoori chicken'];
  }
  if (cat === 'starters' || cat.includes('starter') || cat.includes('appetizer')) {
    return DISH_IMAGE_MAP['crispy chicken 65'];
  }
  if (cat === 'mains' || cat.includes('curry') || cat.includes('main')) {
    return DISH_IMAGE_MAP['classic butter chicken'];
  }

  // 4. Return existing image or default biryani
  if (item.image && item.image.startsWith('http')) return item.image;
  return DISH_IMAGE_MAP['hyderabadi chicken dum biryani'];
}
