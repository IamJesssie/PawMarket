-- 1. Products Table
CREATE TABLE public.products (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    old_price DECIMAL(10,2),
    discount TEXT,
    image_url TEXT,
    rating DECIMAL(3,2) DEFAULT 0,
    reviews_count INT DEFAULT 0,
    sku TEXT UNIQUE,
    stock_status TEXT DEFAULT 'In Stock',
    description TEXT,
    long_description TEXT,
    brand TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Profiles Table (Linked to Supabase Auth)
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    member_since INT DEFAULT 2024,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Wishlist Table
CREATE TABLE public.wishlist (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    product_id BIGINT REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- 4. Recently Viewed Table
CREATE TABLE public.recently_viewed (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    product_id BIGINT REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    viewed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recently_viewed ENABLE ROW LEVEL SECURITY;

-- Policies for Profiles (Users can only see their own profile)
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policies for Products (Everyone can view)
CREATE POLICY "Everyone can view products." ON public.products
    FOR SELECT USING (true);

-- Policies for Wishlist (Users can only manage their own)
CREATE POLICY "Users can view own wishlist." ON public.wishlist
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into own wishlist." ON public.wishlist
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete from own wishlist." ON public.wishlist
    FOR DELETE USING (auth.uid() = user_id);

-- Policies for Recently Viewed
CREATE POLICY "Users can view own history." ON public.recently_viewed
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can log history." ON public.recently_viewed
    FOR INSERT WITH CHECK (auth.uid() = user_id);
