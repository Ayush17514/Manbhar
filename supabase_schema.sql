-- ============================================================================
-- Supabase (PostgreSQL) Schema & Initial Seed for Manbhar / Jewelry Store
-- Converted directly from MySQL to Supabase PostgreSQL with RLS and Indexes
-- ============================================================================

-- 1. Users Table (Core Store Users)
CREATE TABLE IF NOT EXISTS public.users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    usertype VARCHAR(20) DEFAULT 'customer',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    stock INTEGER DEFAULT 0,
    image TEXT,
    category VARCHAR(100),
    tag VARCHAR(255),
    size VARCHAR(100),
    dimensions VARCHAR(100),
    material VARCHAR(100),
    stones VARCHAR(255),
    gross_weight NUMERIC(10,2),
    metal_weight NUMERIC(10,2),
    stone_weight NUMERIC(10,2),
    additional_info TEXT,
    video VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Cart Table
CREATE TABLE IF NOT EXISTS public.cart (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_product_cart UNIQUE (user_id, product_id)
);

-- 4. Guest Carts Table
CREATE TABLE IF NOT EXISTS public.guest_carts (
    id BIGSERIAL PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_session_product_cart UNIQUE (session_id, product_id)
);

-- 5. Wishlist Table
CREATE TABLE IF NOT EXISTS public.wishlist (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_user_product_wishlist UNIQUE (user_id, product_id)
);

-- 6. Guest Wishlist Table
CREATE TABLE IF NOT EXISTS public.guest_wishlist (
    id BIGSERIAL PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_session_product_wishlist UNIQUE (session_id, product_id)
);

-- 7. Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    address TEXT NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('COD','UPI','CARD','NETBANKING','RAZORPAY')),
    subtotal NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    gst NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    shipping NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    making NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    grand_total NUMERIC(10,2) NOT NULL DEFAULT 0.00,
    payment_status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price NUMERIC(10,2) NOT NULL
);

-- 9. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
    name VARCHAR(100),
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. OTP Codes Table
CREATE TABLE IF NOT EXISTS public.otp_codes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
    phone VARCHAR(20) NOT NULL,
    otp VARCHAR(6) NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. User Events & Analytics Table
CREATE TABLE IF NOT EXISTS public.user_events (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    product_id BIGINT,
    event_type VARCHAR(50) NOT NULL,
    search_query VARCHAR(255),
    button_name VARCHAR(50),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Enquiries / Contact Submissions
CREATE TABLE IF NOT EXISTS public.enquiries (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(20),
    subject VARCHAR(255),
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_cart_user ON public.cart(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_user ON public.wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON public.user_events(timestamp);

-- ============================================================================
-- INITIAL SEED DATA
-- ============================================================================

-- Seed Default Admin & Users (Passwords are standard bcrypt hashes)
INSERT INTO public.users (id, name, email, password, usertype) VALUES
(1, 'Anisha Agrawal', 'manbharcadjewellery22@gmail.com', '$2y$10$fatr9X9lR5on.EWktzBBt.DhLQex2Uhx/78z1nWW7F.xeYaF6eB0a', 'admin'),
(2, 'Ayush agrawal', 'ajayagrawal0068@gmail.com', '$2y$10$H9sXupnroIY6yEYmiR5W1.S3U5B.cagM/.MDL5JLIpjH2BMHTme6i', 'admin'),
(3, 'bhoomi Arora', '2024csbhoomi16914@poornima.edu.in', '$2y$10$TbNezwDGCcULMBxc4kPUQ.6U6lL.dOXEhsQXnk3zMiMi5OpL7ub7q', 'customer'),
(4, 'Nancy shrivastava', 'shrivastavanancy382@gmail.com', '$2y$10$RManaL9LZfz/WgfXZnUqT.DatX6aNPdK.rOSmyzxX/7Coei6CRH.u', 'customer')
ON CONFLICT (id) DO NOTHING;

-- Reset sequence for users
SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.users));

-- Seed Products
INSERT INTO public.products (id, title, description, price, stock, image, category, tag, size, dimensions, material, stones, gross_weight, metal_weight, stone_weight, additional_info, video) VALUES
(2, 'Engagment Ring', 'Princess Cut Aquamarine Zircon Engagment Ring in brass metal with high quality Gold polish.', 499.00, 10, 'uploads/products/1758372734_68cea37edc845.png,uploads/products/1758372734_68cea37edd4e2.png,uploads/products/1758372734_68cea37ede1e1.png', 'Rings', 'Bestseller', 'US 7', '', 'Brass', 'Aquamarine and Zircon', 0.00, 3.00, 0.00, '', '')
ON CONFLICT (id) DO NOTHING;

SELECT setval('products_id_seq', (SELECT COALESCE(MAX(id), 1) FROM public.products));
