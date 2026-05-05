-- 5. Addresses Table
CREATE TABLE public.addresses (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    address_line1 TEXT NOT NULL,
    address_line2 TEXT,
    city TEXT NOT NULL,
    state_province TEXT NOT NULL,
    postal_code TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'Philippines',
    is_default BOOLEAN DEFAULT FALSE,
    label TEXT, -- e.g., 'HOME', 'WORK'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Grooming Services Table
CREATE TABLE public.grooming_services (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    duration TEXT,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url TEXT
);

-- 7. Grooming Addons Table
CREATE TABLE public.grooming_addons (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- 8. Appointments Table
CREATE TABLE public.appointments (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    service_id BIGINT REFERENCES public.grooming_services(id) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    pet_name TEXT NOT NULL,
    pet_type TEXT NOT NULL,
    breed TEXT,
    pet_age TEXT,
    special_instructions TEXT,
    status TEXT DEFAULT 'Confirmed',
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Appointment Addons (Junction Table)
CREATE TABLE public.appointment_addons (
    appointment_id BIGINT REFERENCES public.appointments(id) ON DELETE CASCADE,
    addon_id BIGINT REFERENCES public.grooming_addons(id) ON DELETE CASCADE,
    PRIMARY KEY (appointment_id, addon_id)
);

-- 10. Orders Table
CREATE TABLE public.orders (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    status TEXT DEFAULT 'Pending',
    subtotal DECIMAL(10,2) NOT NULL,
    shipping DECIMAL(10,2) DEFAULT 0,
    discount DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    promo_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Order Items Table
CREATE TABLE public.order_items (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    order_id BIGINT REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id BIGINT REFERENCES public.products(id) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL
);

-- Enable RLS
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grooming_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grooming_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointment_addons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policies for Addresses
CREATE POLICY "Users can manage own addresses." ON public.addresses
    FOR ALL USING (auth.uid() = user_id);

-- Policies for Grooming (Publicly viewable)
CREATE POLICY "Everyone can view grooming services." ON public.grooming_services FOR SELECT USING (true);
CREATE POLICY "Everyone can view grooming addons." ON public.grooming_addons FOR SELECT USING (true);

-- Policies for Appointments
CREATE POLICY "Users can manage own appointments." ON public.appointments
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own appointment addons." ON public.appointment_addons
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.appointments 
            WHERE appointments.id = appointment_addons.appointment_id 
            AND appointments.user_id = auth.uid()
        )
    );

-- Policies for Orders
CREATE POLICY "Users can view own orders." ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own order items." ON public.order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()
        )
    );
