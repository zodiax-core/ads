CREATE TABLE IF NOT EXISTS public.clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view clients"
  ON public.clients FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert clients"
  ON public.clients FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update clients"
  ON public.clients FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete clients"
  ON public.clients FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Insert initial current clients
INSERT INTO public.clients (name, logo_url) VALUES
('Jeeto Pakistan', 'https://upload.wikimedia.org/wikipedia/en/e/e0/Jeeto_Pakistan_Logo.png'),
('ARY News', 'https://cdn.brandfetch.io/arynews.tv/w/400/h/400'),
('ARY Digital', 'https://cdn.brandfetch.io/arydigital.tv/w/400/h/400'),
('ARY QTV', 'https://upload.wikimedia.org/wikipedia/commons/e/ec/ARY_Qtv_logo.png'),
('ARY Zindagi', 'https://cdn.brandfetch.io/aryzindagi.tv/w/400/h/400'),
('Samsung', 'https://cdn.brandfetch.io/samsung.com/w/400/h/400'),
('Coca-Cola', 'https://cdn.brandfetch.io/coca-cola.com/w/400/h/400'),
('PSO', 'https://crystalpng.com/wp-content/uploads/2021/04/pso-logo-768x552.png'),
('Nishat Group', 'https://seeklogo.com/images/N/nishat-group-logo-DEEC1CA8DF-seeklogo.com.png'),
('Packages Mall', 'https://cdn.brandfetch.io/packagesmall.com/w/400/h/400'),
('Jolta Electrics', 'https://joltaelectric.com/wp-content/uploads/2021/04/Jolta-Electric-Logo.png'),
('UOL', 'https://upload.wikimedia.org/wikipedia/en/7/77/The_University_of_Lahore_Logo.png'),
('Stylo', 'https://crystalpng.com/wp-content/uploads/2022/02/stylo-logo-768x336.png'),
('Park Avenue', 'https://parkavenue.pk/wp-content/uploads/2022/02/Logo-Park-Avenue-1.png'),
('Beech Tree', 'https://cdn.brandfetch.io/beechtree.pk/w/400/h/400'),
('Keep Truckin', 'https://cdn.brandfetch.io/motive.com/w/400/h/400'),
('Motive', 'https://cdn.brandfetch.io/motive.com/w/400/h/400'),
('ISPR', 'https://upload.wikimedia.org/wikipedia/en/c/cb/Inter-Services_Public_Relations_logo.png'),
('Hush Puppies', 'https://cdn.brandfetch.io/hushpuppies.com.pk/w/400/h/400'),
('Dubai Islamic Bank', 'https://cdn.brandfetch.io/dib.ae/w/400/h/400'),
('Sufi', 'https://sufigroup.biz/wp-content/uploads/2020/07/Sufi-Logo.png'),
('Omore', 'https://cdn.brandfetch.io/engro.com/w/400/h/400'),
('Soul City', 'https://soulcitylahore.com.pk/wp-content/uploads/2023/04/soul-city-logo.png'),
('Al-Hussain Developer', 'https://cdn.brandfetch.io/alhussain.com/w/400/h/400'),
('Ibne-Hashim', 'https://cdn.brandfetch.io/ibnehashim.com/w/400/h/400'),
('Oz Technology', 'https://oz-technologies.com/wp-content/uploads/2021/08/OZ-Tech-Logo-1.png'),
('ConsoliAds', 'https://consoliads.com/wp-content/uploads/2020/12/ConsoliAds-Logo-.png');
