import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const itemsString = "Apple,Banana,Orange,Mango,Pineapple,Papaya,Watermelon,Muskmelon,Grapes,Guava,Pomegranate,Kiwi,Strawberry,Blueberry,Raspberry,Blackberry,Cherry,Pear,Peach,Plum,Apricot,Lychee,Dragon Fruit,Passion Fruit,Coconut,Lemon,Lime,Avocado,Fig,Dates,Jackfruit,Custard Apple,Sapota,Star Fruit,Mulberry,Cranberry,Tangerine,Clementine,Nectarine,Persimmon,Pomelo,Gooseberry,Potato,Onion,Tomato,Carrot,Beetroot,Radish,Cabbage,Cauliflower,Broccoli,Spinach,Lettuce,Cucumber,Capsicum,Brinjal,Okra,Bitter Gourd,Bottle Gourd,Ridge Gourd,Pumpkin,Zucchini,Sweet Potato,Green Peas,Corn,Mushroom,Garlic,Ginger,Spring Onion,Celery,Kale,Mint,Coriander,Curry Leaves,Green Chilli,Red Chilli,Drumstick,Turnip,Leek,Parsley,Asparagus,Artichoke,Raw Banana,Snake Gourd,French Beans,Broad Beans,Ivy Gourd,Ash Gourd,Yam,Red Cabbage,Baby Corn,Bok Choy,Mustard Greens,Fenugreek Leaves,Amaranth Leaves,Shallots,Cherry Tomato,Iceberg Lettuce,Basmati Rice,Brown Rice,Sona Masoori Rice,Jasmine Rice,Red Rice,Black Rice,Poha,Wheat Flour,Maida,Semolina,Besan,Ragi Flour,Bajra Flour,Jowar Flour,Corn Flour,Rice Flour,Oats,Quinoa,Barley,Millet,Vermicelli,Pasta,Macaroni,Noodles,Couscous,Bulgur Wheat,Chia Seeds,Flax Seeds,Pumpkin Seeds,Sunflower Seeds,Sesame Seeds,Dalia,Pearl Millet,Sorghum,Buckwheat,Cornmeal,Toor Dal,Moong Dal,Masoor Dal,Urad Dal,Chana Dal,Rajma,Kabuli Chana,Black Chana,Green Gram,Horse Gram,Moth Beans,Cowpeas,Black Eyed Peas,Soybeans,Yellow Peas,Red Lentils,Brown Lentils,White Peas,Lima Beans,Pinto Beans,Kidney Beans,Navy Beans,Adzuki Beans,Chickpeas,Mixed Dal,Sprouted Moong,Sprouted Chana,Milk,Curd,Greek Yogurt,Butter,Cheddar Cheese,Mozzarella Cheese,Paneer,Cream Cheese,Fresh Cream,Ghee,Condensed Milk,Eggs,Brown Eggs,Organic Eggs,Buttermilk,Lassi,Chocolate Milk,Cottage Cheese,Parmesan Cheese,Sour Cream,Kefir,Sunflower Oil,Mustard Oil,Groundnut Oil,Olive Oil,Coconut Oil,Rice Bran Oil,Sesame Oil,Vinegar,Apple Cider Vinegar,Soy Sauce,Tomato Ketchup,Mayonnaise,Mustard Sauce,Chilli Sauce,Pasta Sauce,Pizza Sauce,Salt,Rock Salt,Black Salt,Sugar,Brown Sugar,Jaggery,Honey,Baking Powder,Baking Soda,Corn Starch,Vanilla Essence,Cocoa Powder,Tea Powder,Green Tea,Coffee Powder,Instant Coffee,Black Pepper,Cumin Seeds,Coriander Powder,Turmeric Powder,Red Chilli Powder,Garam Masala,Curry Powder,Oregano,Thyme,Rosemary,Cinnamon,Cloves,Cardamom,Nutmeg,Bay Leaf,Star Anise,Fennel Seeds,Fenugreek Seeds,Tamarind,Saffron,Potato Chips,Nachos,Popcorn,Salted Peanuts,Roasted Almonds,Cashews,Pistachios,Mixed Nuts,Trail Mix,Chocolate Cookies,Digestive Biscuits,Crackers,Wafer Biscuits,Energy Bar,Granola Bar,Orange Juice,Apple Juice,Mango Juice,Mixed Fruit Juice,Coconut Water,Lemon Soda,Cola Drink,Energy Drink,Sports Drink,Sparkling Water,Mineral Water,Iced Tea,Chocolate Drink,Malt Drink,Cheese Balls,Pretzels,Rice Crackers,Peanut Butter,Almond Butter,Hazelnut Spread,Fruit Gummies,Jelly Cups,Cup Noodles,Instant Soup,Dry Fruit Mix,Raisins,Dried Apricots,Dried Figs,Banana Chips,Murukku,Mixture Namkeen,Bhujia,Sev,Masala Peanuts,Roasted Chana,Soya Chips,Cheese Crackers,Oat Cookies,Butter Cookies,Cream Biscuits,Chocolate Bar,Dark Chocolate,Milk Chocolate,Protein Bar,Vegetable Chips,Sweet Corn Snack,Puffed Rice Snack,Bath Soap,Hand Wash,Shampoo,Conditioner,Toothpaste,Toothbrush,Mouthwash,Face Wash,Body Wash,Hand Sanitizer,Laundry Detergent,Fabric Softener,Dishwashing Liquid,Floor Cleaner,Glass Cleaner,Toilet Cleaner,Air Freshener,Garbage Bags,Aluminum Foil,Cling Wrap,Paper Towels,Tissue Paper,Wet Wipes,Cotton Balls,Cotton Buds,Shaving Cream,Razor Blades,Deodorant,Perfume,Hair Oil,Hair Gel,Hair Serum,Face Cream,Moisturizer,Sunscreen,Lip Balm,Talcum Powder,Baby Wipes,Baby Shampoo,Baby Soap,Diapers,Sanitary Pads,Adult Diapers,Mosquito Repellent,Insect Spray,Room Freshener,Detergent Powder,Bleach,Drain Cleaner,Furniture Polish,Scrub Pads,Toilet Paper,Kitchen Towels,Disposable Cups,Disposable Plates,Plastic Spoons,Plastic Forks,Plastic Knives,Matchbox,Candles,Batteries AA,Batteries AAA,LED Bulb,Extension Cord,Shoe Polish,Car Shampoo,Microfiber Cloth,Bucket,Mop,Broom,Dustpan,Scrubbing Brush,Steel Wool,Gloves,Face Mask,First Aid Kit,Bandages,Antiseptic Liquid,Thermometer,Garbage Bin,Laundry Basket,Storage Container,Zip Lock Bags,Measuring Cup,Measuring Spoon,Oven Mitts,Kitchen Sponge"

const items = itemsString.split(',')

// Helper to deduce category
function getCategory(name) {
  const lower = name.toLowerCase()
  if (lower.includes('apple') || lower.includes('banana') || lower.includes('mango') || lower.includes('berry') || lower.includes('fruit') || lower.includes('melon') || lower.includes('grape') || lower.includes('orange') || lower.includes('lemon')) return 'Fruits'
  if (lower.includes('potato') || lower.includes('tomato') || lower.includes('onion') || lower.includes('cabbage') || lower.includes('gourd') || lower.includes('chilli') || lower.includes('leaf') || lower.includes('spinach') || lower.includes('beans') || lower.includes('garlic')) return 'Vegetables'
  if (lower.includes('milk') || lower.includes('cheese') || lower.includes('butter') || lower.includes('curd') || lower.includes('paneer') || lower.includes('cream')) return 'Dairy'
  if (lower.includes('rice') || lower.includes('flour') || lower.includes('dal') || lower.includes('wheat') || lower.includes('oats') || lower.includes('seeds')) return 'Grains & Pulses'
  if (lower.includes('oil') || lower.includes('sauce') || lower.includes('vinegar') || lower.includes('salt') || lower.includes('sugar') || lower.includes('powder') || lower.includes('spice')) return 'Pantry'
  if (lower.includes('chips') || lower.includes('chocolate') || lower.includes('cookie') || lower.includes('biscuit') || lower.includes('snack') || lower.includes('popcorn')) return 'Snacks'
  if (lower.includes('juice') || lower.includes('drink') || lower.includes('water') || lower.includes('tea') || lower.includes('coffee')) return 'Beverages'
  if (lower.includes('soap') || lower.includes('wash') || lower.includes('shampoo') || lower.includes('brush') || lower.includes('cream') || lower.includes('wipes')) return 'Personal Care'
  if (lower.includes('cleaner') || lower.includes('detergent') || lower.includes('paper') || lower.includes('bag') || lower.includes('foil')) return 'Household'
  return 'General Groceries'
}

async function main() {
  console.log(`Starting seed of ${items.length} products...`)
  
  // Clear existing products to prevent duplicates (optional, but good for clean slate)
  await prisma.product.deleteMany()
  
  const productsToCreate = items.map((item, idx) => {
    // Generate a random price between $1 and $20
    const price = Math.floor(Math.random() * 19) + 1 + 0.99
    
    // We use LoremFlickr with the item name as keyword to get real photos
    // Appending a random index prevents caching the exact same image if names overlap
    const imageUrl = `https://loremflickr.com/400/400/${encodeURIComponent(item)}?lock=${idx}`
    
    return {
      name: item.trim(),
      description: `Fresh and high quality ${item.trim()} delivered right to your door.`,
      price: price,
      category: getCategory(item.trim()),
      image: imageUrl
    }
  })

  // Insert all
  const created = await prisma.product.createMany({
    data: productsToCreate
  })

  console.log(`Successfully seeded ${created.count} products!`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
