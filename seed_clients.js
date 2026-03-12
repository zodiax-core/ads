import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY; // I should use the service role key if possible, but let's try with publishable key

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const initialClients = [
  { name: "Jeeto Pakistan", logo_url: "https://upload.wikimedia.org/wikipedia/en/e/e0/Jeeto_Pakistan_Logo.png" },
  { name: "ARY News", logo_url: "https://cdn.brandfetch.io/arynews.tv/w/400/h/400" },
  { name: "ARY Digital", logo_url: "https://cdn.brandfetch.io/arydigital.tv/w/400/h/400" },
  { name: "ARY QTV", logo_url: "https://upload.wikimedia.org/wikipedia/commons/e/ec/ARY_Qtv_logo.png" },
  { name: "ARY Zindagi", logo_url: "https://cdn.brandfetch.io/aryzindagi.tv/w/400/h/400" },
  { name: "Samsung", logo_url: "https://cdn.brandfetch.io/samsung.com/w/400/h/400" },
  { name: "Coca-Cola", logo_url: "https://cdn.brandfetch.io/coca-cola.com/w/400/h/400" },
  { name: "PSO", logo_url: "https://crystalpng.com/wp-content/uploads/2021/04/pso-logo-768x552.png" },
  { name: "Nishat Group", logo_url: "https://seeklogo.com/images/N/nishat-group-logo-DEEC1CA8DF-seeklogo.com.png" },
  { name: "Packages Mall", logo_url: "https://cdn.brandfetch.io/packagesmall.com/w/400/h/400" },
  { name: "Jolta Electrics", logo_url: "https://joltaelectric.com/wp-content/uploads/2021/04/Jolta-Electric-Logo.png" },
  { name: "UOL", logo_url: "https://upload.wikimedia.org/wikipedia/en/7/77/The_University_of_Lahore_Logo.png" },
  { name: "Stylo", logo_url: "https://crystalpng.com/wp-content/uploads/2022/02/stylo-logo-768x336.png" },
  { name: "Park Avenue", logo_url: "https://parkavenue.pk/wp-content/uploads/2022/02/Logo-Park-Avenue-1.png" }, 
  { name: "Beech Tree", logo_url: "https://cdn.brandfetch.io/beechtree.pk/w/400/h/400" },
  { name: "Keep Truckin", logo_url: "https://cdn.brandfetch.io/motive.com/w/400/h/400" },
  { name: "Motive", logo_url: "https://cdn.brandfetch.io/motive.com/w/400/h/400" },
  { name: "ISPR", logo_url: "https://upload.wikimedia.org/wikipedia/en/c/cb/Inter-Services_Public_Relations_logo.png" },
  { name: "Hush Puppies", logo_url: "https://cdn.brandfetch.io/hushpuppies.com.pk/w/400/h/400" },
  { name: "Dubai Islamic Bank", logo_url: "https://cdn.brandfetch.io/dib.ae/w/400/h/400" },
  { name: "Sufi", logo_url: "https://sufigroup.biz/wp-content/uploads/2020/07/Sufi-Logo.png" },
  { name: "Omore", logo_url: "https://cdn.brandfetch.io/engro.com/w/400/h/400" },
  { name: "Soul City", logo_url: "https://soulcitylahore.com.pk/wp-content/uploads/2023/04/soul-city-logo.png" },
  { name: "Al-Hussain Developer", logo_url: "https://cdn.brandfetch.io/alhussain.com/w/400/h/400" }, 
  { name: "Ibne-Hashim", logo_url: "https://cdn.brandfetch.io/ibnehashim.com/w/400/h/400" },
  { name: "Oz Technology", logo_url: "https://oz-technologies.com/wp-content/uploads/2021/08/OZ-Tech-Logo-1.png" },
  { name: "ConsoliAds", logo_url: "https://consoliads.com/wp-content/uploads/2020/12/ConsoliAds-Logo-.png" },
];

async function seed() {
  const { data, error } = await supabase.from('clients').insert(initialClients);
  if (error) {
    console.error("Error inserting clients:", error);
  } else {
    console.log("Successfully seeded clients.");
  }
}

seed();
