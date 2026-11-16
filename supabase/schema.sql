-- ==============================================================================
-- Rupandehi Property Hub - Production Database Initialization Script (PostgreSQL)
-- Target: Supabase / PostgreSQL 15+ with PostGIS support
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Enumerations
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('BUYER', 'RENTER', 'OWNER', 'AGENT', 'ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE property_purpose AS ENUM ('SALE', 'RENT');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE property_category AS ENUM (
        'RESIDENTIAL_PLOT',
        'RESIDENTIAL_HOME',
        'COMMERCIAL_SHOWROOM',
        'HEAVY_INDUSTRIAL',
        'AGRICULTURAL_LAND'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status AS ENUM (
        'UNVERIFIED',
        'PENDING_REVIEW',
        'TITLE_VERIFIED',
        'REJECTED'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE document_type AS ENUM (
        'LALPURJA_LAND_CERTIFICATE',
        'NAKSA_CADASTRAL_TRACE',
        'CITIZENSHIP_CARD',
        'MUNICIPAL_TAX_CLEARANCE',
        'POWER_OF_ATTORNEY'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    password_hash VARCHAR(255),
    role user_role DEFAULT 'BUYER' NOT NULL,
    avatar_url TEXT,
    is_phone_verified BOOLEAN DEFAULT false,
    is_kyc_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Agent Profiles Table
CREATE TABLE IF NOT EXISTS agent_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    agency_name VARCHAR(150) NOT NULL,
    license_number VARCHAR(100) UNIQUE,
    office_address TEXT NOT NULL,
    service_areas TEXT[] DEFAULT '{"Butwal", "Tilottama", "Siddharthanagar"}'::TEXT[],
    years_experience INT DEFAULT 1,
    is_verified_agent BOOLEAN DEFAULT false,
    bio TEXT,
    rating NUMERIC(2,1) DEFAULT 5.0,
    reviews_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Properties Table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_code VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    purpose property_purpose DEFAULT 'SALE' NOT NULL,
    category property_category NOT NULL,
    price_npr NUMERIC(14,2) NOT NULL,
    is_negotiable BOOLEAN DEFAULT true,
    rental_period VARCHAR(50),
    locality VARCHAR(100) NOT NULL,
    ward_number INT,
    street_address TEXT,
    latitude NUMERIC(9,6),
    longitude NUMERIC(9,6),
    bigha INT DEFAULT 0,
    kattha INT DEFAULT 0,
    dhur NUMERIC(5,2) DEFAULT 0,
    area_sq_ft NUMERIC(10,2) NOT NULL,
    road_access_feet NUMERIC(5,1),
    road_paved BOOLEAN DEFAULT true,
    facing_direction VARCHAR(50),
    bedrooms INT,
    bathrooms INT,
    built_year INT,
    total_floors NUMERIC(3,1),
    parking_spaces INT DEFAULT 0,
    amenities TEXT[] DEFAULT '{}',
    verification_status verification_status DEFAULT 'UNVERIFIED',
    is_featured BOOLEAN DEFAULT false,
    is_archived BOOLEAN DEFAULT false,
    views_count INT DEFAULT 0,
    inquiries_count INT DEFAULT 0,
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    agent_id UUID REFERENCES agent_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Property Media Table
CREATE TABLE IF NOT EXISTS property_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    caption VARCHAR(255),
    media_type VARCHAR(50) DEFAULT 'image',
    sort_order INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Verification Documents (Lalpurja & Land Records)
CREATE TABLE IF NOT EXISTS verification_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    uploader_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    document_url TEXT NOT NULL,
    file_size_bytes INT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    reviewed_by_admin VARCHAR(150),
    review_notes TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Customer Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    client_name VARCHAR(150) NOT NULL,
    client_phone VARCHAR(20) NOT NULL,
    client_email VARCHAR(255),
    message TEXT NOT NULL,
    requested_visit TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'NEW',
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Site Visits Table
CREATE TABLE IF NOT EXISTS site_visits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES agent_profiles(id) ON DELETE SET NULL,
    scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
    status VARCHAR(50) DEFAULT 'CONFIRMED',
    meeting_address TEXT NOT NULL,
    feedback_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Saved Properties (Favorites)
CREATE TABLE IF NOT EXISTS saved_properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, property_id)
);

-- Indexes for High Performance Search
CREATE INDEX IF NOT EXISTS idx_properties_locality ON properties(locality);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price_npr);
CREATE INDEX IF NOT EXISTS idx_properties_purpose_cat ON properties(purpose, category);
CREATE INDEX IF NOT EXISTS idx_properties_verification ON properties(verification_status);
CREATE INDEX IF NOT EXISTS idx_inquiries_property ON inquiries(property_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_phone ON inquiries(client_phone);

-- Seed Initial Super Admin / Owner Account
INSERT INTO users (id, email, phone, full_name, role, is_phone_verified, is_kyc_verified)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'anil@rupandehipropertyhub.com',
    '9817486280',
    'Anil Chaudhary',
    'ADMIN',
    true,
    true
) ON CONFLICT (phone) DO NOTHING;

-- Seed Initial Verified Agent Profile
INSERT INTO agent_profiles (user_id, agency_name, license_number, office_address, service_areas, is_verified_agent, rating, reviews_count)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Rupandehi Real Estate Advisory Desk',
    'DOI-LUMB-2079-041',
    'Traffic Chowk, Butwal-6, Rupandehi, Nepal',
    '{"Butwal", "Tilottama", "Siddharthanagar", "Devdaha", "Sainamaina"}',
    true,
    4.9,
    42
) ON CONFLICT DO NOTHING;
