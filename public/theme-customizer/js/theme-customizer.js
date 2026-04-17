/* ═══════════════════════════════════════════════════════════════════
   THEME CUSTOMIZER — jQuery Live DOM Manipulation Engine
   Tech: HTML + CSS + Bootstrap + jQuery + JavaScript
   ═══════════════════════════════════════════════════════════════════ */

$(document).ready(function () {

    // ─── DEFAULT THEME ─────────────────────────────────────────
    var defaultTheme = {
        storeName: 'MAISON',
        storeTagline: 'Curated essentials for modern living',
        primaryColor: '#1a1a2e',
        secondaryColor: '#16213e',
        accentColor: '#e94560',
        backgroundColor: '#ffffff',
        textColor: '#333333',
        cardBackgroundColor: '#ffffff',
        headerColor: '#1a1a2e',
        heroGradientFrom: '#1a1a2e',
        heroGradientTo: '#16213e',
        headingFont: 'Inter',
        bodyFont: 'Inter',
        baseFontSize: 16,
        headingWeight: 700,
        gridColumns: 3,
        cardStyle: 'elevated',
        borderRadius: 8,
        sectionSpacing: 48,
        buttonStyle: 'rounded',
        buttonVariant: 'filled',
        headerStyle: 'split'
    };

    // Current theme state
    var theme = $.extend({}, defaultTheme);

    // ─── PRESET THEMES ─────────────────────────────────────────
    var presets = {
        'modern-minimal': {
            storeName: 'MINIMAL', storeTagline: 'Less is more',
            primaryColor: '#111827', secondaryColor: '#f3f4f6', accentColor: '#6366f1',
            backgroundColor: '#ffffff', textColor: '#1f2937', cardBackgroundColor: '#ffffff',
            headerColor: '#111827', heroGradientFrom: '#111827', heroGradientTo: '#1f2937',
            headingFont: 'Inter', bodyFont: 'Inter', baseFontSize: 16, headingWeight: 700,
            gridColumns: 3, cardStyle: 'flat', borderRadius: 12, sectionSpacing: 48,
            buttonStyle: 'pill', buttonVariant: 'filled', headerStyle: 'centered'
        },
        'elegant-boutique': {
            storeName: 'MAISON BELLE', storeTagline: 'Timeless luxury, effortlessly refined',
            primaryColor: '#2c1810', secondaryColor: '#f5f0eb', accentColor: '#b8860b',
            backgroundColor: '#faf8f5', textColor: '#2c1810', cardBackgroundColor: '#ffffff',
            headerColor: '#2c1810', heroGradientFrom: '#2c1810', heroGradientTo: '#4a2c1a',
            headingFont: 'Playfair Display', bodyFont: 'Lora', baseFontSize: 16, headingWeight: 700,
            gridColumns: 3, cardStyle: 'bordered', borderRadius: 4, sectionSpacing: 48,
            buttonStyle: 'squared', buttonVariant: 'outlined', headerStyle: 'centered'
        },
        'playful-pop': {
            storeName: 'POP SHOP', storeTagline: 'Color your world, one product at a time',
            primaryColor: '#7c3aed', secondaryColor: '#fce7f3', accentColor: '#f472b6',
            backgroundColor: '#fefce8', textColor: '#1e1b4b', cardBackgroundColor: '#ffffff',
            headerColor: '#7c3aed', heroGradientFrom: '#7c3aed', heroGradientTo: '#ec4899',
            headingFont: 'Poppins', bodyFont: 'DM Sans', baseFontSize: 16, headingWeight: 700,
            gridColumns: 3, cardStyle: 'elevated', borderRadius: 20, sectionSpacing: 48,
            buttonStyle: 'pill', buttonVariant: 'filled', headerStyle: 'split'
        },
        'dark-luxury': {
            storeName: 'NOIR', storeTagline: 'Where darkness meets distinction',
            primaryColor: '#d4af37', secondaryColor: '#1a1a1a', accentColor: '#d4af37',
            backgroundColor: '#0d0d0d', textColor: '#e5e5e5', cardBackgroundColor: '#1a1a1a',
            headerColor: '#0d0d0d', heroGradientFrom: '#0d0d0d', heroGradientTo: '#1a1a1a',
            headingFont: 'Montserrat', bodyFont: 'Montserrat', baseFontSize: 16, headingWeight: 700,
            gridColumns: 3, cardStyle: 'elevated', borderRadius: 8, sectionSpacing: 48,
            buttonStyle: 'squared', buttonVariant: 'outlined', headerStyle: 'minimal'
        },
        'nature-fresh': {
            storeName: 'VERDANT', storeTagline: 'Sustainably sourced, beautifully crafted',
            primaryColor: '#166534', secondaryColor: '#f0fdf4', accentColor: '#ea580c',
            backgroundColor: '#fefefa', textColor: '#1a2e05', cardBackgroundColor: '#ffffff',
            headerColor: '#166534', heroGradientFrom: '#166534', heroGradientTo: '#15803d',
            headingFont: 'Merriweather', bodyFont: 'Source Sans 3', baseFontSize: 16, headingWeight: 700,
            gridColumns: 3, cardStyle: 'bordered', borderRadius: 12, sectionSpacing: 48,
            buttonStyle: 'rounded', buttonVariant: 'filled', headerStyle: 'split'
        }
    };

    // ─── MOCK PRODUCT DATA ──────────────────────────────────────
    var products = [
        { name: 'Artisan Leather Tote', price: 189.99, rating: 4.8, reviews: 124, category: 'Bags', gradient: 'linear-gradient(135deg, #fde68a, #fdba74)', icon: 'bi-bag' },
        { name: 'Ceramic Plant Pot Set', price: 44.99, rating: 4.6, reviews: 87, category: 'Home', gradient: 'linear-gradient(135deg, #bbf7d0, #6ee7b7)', icon: 'bi-flower2' },
        { name: 'Hand-Poured Candle', price: 28.99, rating: 4.9, reviews: 203, category: 'Home', gradient: 'linear-gradient(135deg, #fef08a, #fcd34d)', icon: 'bi-fire' },
        { name: 'Minimalist Desk Watch', price: 149.99, rating: 4.7, reviews: 156, category: 'Accessories', gradient: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)', icon: 'bi-smartwatch' },
        { name: 'Organic Cotton Tee', price: 39.99, rating: 4.3, reviews: 312, category: 'Clothing', gradient: 'linear-gradient(135deg, #bae6fd, #93c5fd)', icon: 'bi-handbag' },
        { name: 'Bamboo Sunglasses', price: 64.99, rating: 4.5, reviews: 98, category: 'Accessories', gradient: 'linear-gradient(135deg, #fecdd3, #fda4af)', icon: 'bi-sunglasses' },
        { name: 'Linen Throw Pillow', price: 34.99, rating: 4.4, reviews: 67, category: 'Home', gradient: 'linear-gradient(135deg, #ddd6fe, #c4b5fd)', icon: 'bi-lamp' },
        { name: 'Merino Wool Scarf', price: 59.99, rating: 4.6, reviews: 145, category: 'Clothing', gradient: 'linear-gradient(135deg, #fecaca, #fca5a5)', icon: 'bi-snow' }
    ];

    // ─── HELPER: Button Border Radius ───────────────────────────
    function btnRadius() {
        if (theme.buttonStyle === 'pill') return '9999px';
        if (theme.buttonStyle === 'squared') return '0';
        return theme.borderRadius + 'px';
    }

    // ─── HELPER: Button Styles ──────────────────────────────────
    function btnPrimaryStyles() {
        var styles = 'font-size:13px;font-weight:600;padding:8px 16px;border:2px solid transparent;cursor:pointer;transition:all 0.2s;border-radius:' + btnRadius() + ';';
        if (theme.buttonVariant === 'filled') return styles + 'background:' + theme.primaryColor + ';color:#fff;';
        if (theme.buttonVariant === 'outlined') return styles + 'background:transparent;border-color:' + theme.primaryColor + ';color:' + theme.primaryColor + ';';
        return styles + 'background:' + theme.primaryColor + '15;color:' + theme.primaryColor + ';';
    }

    function btnAccentStyles() {
        return 'font-size:13px;font-weight:600;padding:8px 16px;background:' + theme.accentColor + ';color:#fff;border:2px solid transparent;cursor:pointer;transition:all 0.2s;border-radius:' + btnRadius() + ';';
    }

    // ─── HELPER: Star Rating HTML ───────────────────────────────
    function starHTML(rating) {
        var html = '<div class="d-flex align-items-center gap-1">';
        for (var i = 1; i <= 5; i++) {
            if (i <= Math.round(rating)) {
                html += '<i class="bi bi-star-fill" style="color:' + theme.accentColor + ';font-size:12px;"></i>';
            } else {
                html += '<i class="bi bi-star" style="color:#d1d5db;font-size:12px;"></i>';
            }
        }
        html += '</div>';
        return html;
    }

    // ─── HELPER: Card Shadow/Border ─────────────────────────────
    function cardExtra() {
        if (theme.cardStyle === 'elevated') return 'box-shadow:0 10px 25px -5px rgba(0,0,0,0.1),0 8px 10px -6px rgba(0,0,0,0.05);';
        if (theme.cardStyle === 'bordered') return 'border:2px solid ' + theme.textColor + '15;';
        return 'box-shadow:none;border:1px solid ' + theme.textColor + '12;';
    }

    // ═══════════════════════════════════════════════════════════
    // RENDER STOREFRONT — jQuery DOM Manipulation
    // ═══════════════════════════════════════════════════════════
    function renderStorefront() {
        var t = theme;
        var isCentered = t.headerStyle === 'centered';
        var isMinimal = t.headerStyle === 'minimal';
        var navBg = isMinimal ? t.backgroundColor : t.headerColor;
        var navColor = isMinimal ? t.textColor : '#ffffff';
        var navBgAlpha = isMinimal ? '1' : '0.93';

        var html = '';

        // ── NAVBAR ──
        html += '<nav style="background:' + navBg + ';position:sticky;top:0;z-index:10;backdrop-filter:blur(12px);border-bottom:' + (isMinimal ? '1px solid ' + t.textColor + '15' : 'none') + ';">';
        html += '<div style="max-width:1024px;margin:0 auto;padding:16px 24px;">';

        if (isCentered) {
            html += '<div class="text-center">';
            html += '<h1 style="font-family:\'' + t.headingFont + '\';font-weight:' + t.headingWeight + ';color:' + navColor + ';font-size:20px;letter-spacing:0.2em;margin-bottom:8px;">' + t.storeName + '</h1>';
            html += '<div class="d-flex justify-content-center gap-4">';
            ['Shop', 'Collections', 'About', 'Contact'].forEach(function(item) {
                html += '<a href="#" onclick="return false" style="color:' + navColor + 'aa;font-size:14px;font-family:\'' + t.bodyFont + '\';text-decoration:none;">' + item + '</a>';
            });
            html += '</div></div>';
        } else if (isMinimal) {
            html += '<div class="d-flex justify-content-between align-items-center">';
            html += '<h1 style="font-family:\'' + t.headingFont + '\';font-weight:' + t.headingWeight + ';color:' + navColor + ';font-size:18px;letter-spacing:0.15em;">' + t.storeName + '</h1>';
            html += '<div class="d-flex gap-3 align-items-center">';
            html += '<i class="bi bi-search" style="color:' + navColor + ';font-size:16px;"></i>';
            html += '<i class="bi bi-person" style="color:' + navColor + ';font-size:16px;"></i>';
            html += '<span class="position-relative"><i class="bi bi-bag" style="color:' + navColor + ';font-size:16px;"></i>';
            html += '<span style="position:absolute;top:-6px;right:-8px;width:14px;height:14px;background:' + t.accentColor + ';color:#fff;font-size:8px;font-weight:700;border-radius:50%;display:flex;align-items:center;justify-content:center;">2</span></span>';
            html += '</div></div>';
        } else {
            html += '<div class="d-flex justify-content-between align-items-center">';
            html += '<div class="d-flex align-items-center gap-4">';
            html += '<h1 style="font-family:\'' + t.headingFont + '\';font-weight:' + t.headingWeight + ';color:#fff;font-size:18px;letter-spacing:0.15em;">' + t.storeName + '</h1>';
            html += '<div class="d-none d-md-flex gap-3">';
            ['New Arrivals', 'Best Sellers', 'Sale'].forEach(function(item) {
                html += '<a href="#" onclick="return false" style="color:rgba(255,255,255,0.7);font-size:14px;font-family:\'' + t.bodyFont + '\';text-decoration:none;">' + item + '</a>';
            });
            html += '</div></div>';
            html += '<div class="d-flex gap-3 align-items-center" style="color:rgba(255,255,255,0.8);">';
            html += '<i class="bi bi-search" style="font-size:16px;"></i><i class="bi bi-person" style="font-size:16px;"></i>';
            html += '<span class="position-relative"><i class="bi bi-bag" style="font-size:16px;"></i>';
            html += '<span style="position:absolute;top:-6px;right:-8px;width:14px;height:14px;background:' + t.accentColor + ';color:#fff;font-size:8px;font-weight:700;border-radius:50%;display:flex;align-items:center;justify-content:center;">2</span></span>';
            html += '</div></div>';
        }
        html += '</div></nav>';

        // ── HERO ──
        html += '<section style="background:linear-gradient(135deg,' + t.heroGradientFrom + ',' + t.heroGradientTo + ');color:#fff;padding:' + t.sectionSpacing + 'px 24px;position:relative;overflow:hidden;">';
        html += '<div style="position:relative;z-index:1;max-width:480px;">';
        html += '<p style="font-size:12px;text-transform:uppercase;letter-spacing:0.3em;color:' + t.accentColor + ';font-weight:600;">New Collection 2025</p>';
        html += '<h2 style="font-family:\'' + t.headingFont + '\';font-weight:' + t.headingWeight + ';font-size:32px;line-height:1.2;margin:12px 0;">' + t.storeTagline + '</h2>';
        html += '<p style="font-size:14px;color:rgba(255,255,255,0.7);font-family:\'' + t.bodyFont + '\';">Discover handcrafted pieces designed for the modern lifestyle. Quality materials, timeless design.</p>';
        html += '<div class="d-flex gap-3 mt-3">';
        html += '<button style="' + btnAccentStyles() + '">Shop Now</button>';
        html += '<button style="font-size:13px;font-weight:600;padding:8px 16px;background:transparent;color:#fff;border:1.5px solid rgba(255,255,255,0.4);cursor:pointer;border-radius:' + btnRadius() + ';">Explore</button>';
        html += '</div></div>';
        html += '<div style="position:absolute;top:50%;right:40px;transform:translateY(-50%);width:200px;height:200px;background:' + t.accentColor + ';border-radius:50%;opacity:0.1;"></div>';
        html += '<div style="position:absolute;top:20px;right:130px;width:100px;height:100px;background:#fff;border-radius:50%;opacity:0.1;"></div>';
        html += '</section>';

        // ── PRODUCT GRID ──
        html += '<section style="padding:' + t.sectionSpacing + 'px 24px;">';
        html += '<div class="d-flex justify-content-between align-items-end mb-4">';
        html += '<div><h2 style="font-family:\'' + t.headingFont + '\';font-weight:' + t.headingWeight + ';color:' + t.textColor + ';font-size:24px;">Featured Products</h2>';
        html += '<p style="font-size:14px;color:' + t.textColor + '88;margin-top:4px;">Our most loved pieces, curated for you</p></div>';
        html += '<a href="#" onclick="return false" style="color:' + t.accentColor + ';font-size:14px;font-weight:500;text-decoration:none;">View All <i class="bi bi-chevron-right" style="font-size:12px;"></i></a>';
        html += '</div>';
        html += '<div class="row g-4">';

        products.forEach(function(p) {
            html += '<div class="col-' + (12 / t.gridColumns) + '">';
            html += '<div style="background:' + t.cardBackgroundColor + ';border-radius:' + t.borderRadius + 'px;overflow:hidden;' + cardExtra() + '" class="h-100">';
            html += '<div style="background:' + p.gradient + ';aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:' + t.borderRadius + 'px ' + t.borderRadius + 'px 0 0;position:relative;" class="product-img-wrap">';
            html += '<i class="bi ' + p.icon + '" style="font-size:48px;color:rgba(0,0,0,0.15);"></i>';
            html += '<div style="position:absolute;inset:0;background:rgba(0,0,0,0);display:flex;align-items:center;justify-content:center;border-radius:' + t.borderRadius + 'px ' + t.borderRadius + 'px 0 0;" class="product-overlay">';
            html += '<button style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.9);border:none;box-shadow:0 2px 8px rgba(0,0,0,0.15);opacity:0;cursor:pointer;transition:opacity 0.3s;display:flex;align-items:center;justify-content:center;" class="heart-btn"><i class="bi bi-heart" style="color:' + t.accentColor + ';font-size:14px;"></i></button>';
            html += '</div></div>';
            html += '<div style="padding:12px;">';
            html += '<p style="font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:' + t.accentColor + ';font-weight:600;">' + p.category + '</p>';
            html += '<h3 style="font-size:14px;font-weight:600;color:' + t.textColor + ';line-height:1.3;margin:4px 0;">' + p.name + '</h3>';
            html += '<div class="d-flex align-items-center gap-2">' + starHTML(p.rating);
            html += '<span style="font-size:10px;color:' + t.textColor + '88;">(' + p.reviews + ')</span></div>';
            html += '<div class="d-flex justify-content-between align-items-center mt-2">';
            html += '<span style="font-size:16px;font-weight:700;color:' + t.textColor + ';">$' + p.price.toFixed(2) + '</span>';
            html += '<button style="' + btnPrimaryStyles() + '">Add to Cart</button>';
            html += '</div></div></div></div>';
        });

        html += '</div></section>';

        // ── PROMO BANNER ──
        html += '<section style="padding:0 24px ' + t.sectionSpacing + 'px;">';
        html += '<div style="background:linear-gradient(135deg,' + t.secondaryColor + ',' + t.primaryColor + '20);border-radius:' + (t.borderRadius * 2) + 'px;padding:32px 40px;" class="d-flex justify-content-between align-items-center flex-wrap gap-3">';
        html += '<div style="max-width:400px;"><h3 style="font-family:\'' + t.headingFont + '\';font-weight:' + t.headingWeight + ';color:' + t.textColor + ';font-size:20px;">Summer Sale — Up to 40% Off</h3>';
        html += '<p style="font-size:14px;color:' + t.textColor + '88;">Limited time offer on selected items.</p></div>';
        html += '<button style="' + btnAccentStyles() + '">Shop Sale</button>';
        html += '</div></section>';

        // ── TRUST BADGES ──
        html += '<section style="padding:0 24px ' + t.sectionSpacing + 'px;">';
        html += '<div class="row g-3">';
        var badges = [
            { icon: 'bi-truck', label: 'Free Shipping', desc: 'On orders over $50' },
            { icon: 'bi-shield-check', label: 'Secure Payment', desc: '256-bit encryption' },
            { icon: 'bi-box-seam', label: 'Easy Returns', desc: '30-day return policy' },
            { icon: 'bi-credit-card', label: 'Flexible Pay', desc: 'Buy now, pay later' }
        ];
        badges.forEach(function(b) {
            html += '<div class="col-6 col-md-3 text-center">';
            html += '<div style="width:40px;height:40px;border-radius:50%;background:' + t.primaryColor + '12;display:flex;align-items:center;justify-content:center;margin:0 auto 8px;">';
            html += '<i class="bi ' + b.icon + '" style="color:' + t.primaryColor + ';font-size:18px;"></i></div>';
            html += '<p style="font-size:12px;font-weight:600;color:' + t.textColor + ';margin:0;">' + b.label + '</p>';
            html += '<p style="font-size:10px;color:' + t.textColor + '66;margin:2px 0 0;">' + b.desc + '</p>';
            html += '</div>';
        });
        html += '</div></section>';

        // ── NEWSLETTER ──
        html += '<section style="padding:0 24px ' + t.sectionSpacing + 'px;">';
        html += '<div style="background:' + t.primaryColor + '08;border-radius:' + (t.borderRadius * 2) + 'px;padding:32px;text-align:center;">';
        html += '<i class="bi bi-envelope" style="font-size:24px;color:' + t.accentColor + ';"></i>';
        html += '<h3 style="font-family:\'' + t.headingFont + '\';font-weight:' + t.headingWeight + ';color:' + t.textColor + ';font-size:18px;margin:8px 0 4px;">Stay in the Loop</h3>';
        html += '<p style="font-size:14px;color:' + t.textColor + '77;">Subscribe for exclusive offers</p>';
        html += '<div class="d-flex gap-2 justify-content-center mt-3" style="max-width:400px;margin-left:auto;margin-right:auto;">';
        html += '<input type="email" placeholder="Your email" style="flex:1;padding:8px 12px;font-size:13px;border:1.5px solid ' + t.textColor + '20;border-radius:' + btnRadius() + ';outline:none;font-family:\'' + t.bodyFont + '\';color:' + t.textColor + ';background:' + t.cardBackgroundColor + ';">';
        html += '<button style="' + btnPrimaryStyles().replace('border-radius:' + btnRadius(), 'border-radius:' + btnRadius()) + '">Subscribe</button>';
        html += '</div></div></section>';

        // ── FOOTER ──
        html += '<footer style="background:' + t.primaryColor + ';color:rgba(255,255,255,0.8);font-family:\'' + t.bodyFont + '\';">';
        html += '<div class="row g-4" style="padding:' + t.sectionSpacing + 'px 24px;">';
        // Brand column
        html += '<div class="col-md-4"><h4 style="color:#fff;font-family:\'' + t.headingFont + '\';font-weight:' + t.headingWeight + ';letter-spacing:0.15em;font-size:16px;">' + t.storeName + '</h4>';
        html += '<p style="font-size:13px;line-height:1.6;color:rgba(255,255,255,0.6);">' + t.storeTagline + '. Quality craftsmanship meets contemporary design.</p>';
        html += '<div class="d-flex gap-3 mt-2">';
        ['bi-instagram', 'bi-twitter-x', 'bi-facebook'].forEach(function(ic) {
            html += '<a href="#" onclick="return false" style="width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);display:flex;align-items:center;justify-content:center;text-decoration:none;"><i class="bi ' + ic + '" style="font-size:14px;"></i></a>';
        });
        html += '</div></div>';
        // Shop column
        html += '<div class="col-6 col-md-2"><h5 style="color:#fff;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Shop</h5>';
        ['New Arrivals', 'Best Sellers', 'Sale', 'Gift Cards'].forEach(function(item) {
            html += '<a href="#" onclick="return false" style="display:block;font-size:12px;color:rgba(255,255,255,0.5);text-decoration:none;margin:4px 0;">' + item + '</a>';
        });
        html += '</div>';
        // Company column
        html += '<div class="col-6 col-md-2"><h5 style="color:#fff;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Company</h5>';
        ['About Us', 'Sustainability', 'Careers', 'Press'].forEach(function(item) {
            html += '<a href="#" onclick="return false" style="display:block;font-size:12px;color:rgba(255,255,255,0.5);text-decoration:none;margin:4px 0;">' + item + '</a>';
        });
        html += '</div>';
        // Contact column
        html += '<div class="col-md-4"><h5 style="color:#fff;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Contact</h5>';
        html += '<p style="font-size:12px;color:rgba(255,255,255,0.5);margin:4px 0;"><i class="bi bi-geo-alt me-1"></i> 123 Design Street, NYC</p>';
        html += '<p style="font-size:12px;color:rgba(255,255,255,0.5);margin:4px 0;"><i class="bi bi-telephone me-1"></i> +1 (555) 123-4567</p>';
        html += '<p style="font-size:12px;color:rgba(255,255,255,0.5);margin:4px 0;"><i class="bi bi-envelope me-1"></i> hello@maison.com</p>';
        html += '</div></div>';
        html += '<div style="border-top:1px solid rgba(255,255,255,0.1);text-align:center;padding:16px;font-size:10px;color:rgba(255,255,255,0.4);">&copy; 2025 ' + t.storeName + '. All rights reserved.</div>';
        html += '</footer>';

        // Inject into DOM via jQuery
        $('#storefront').html(html);

        // ── PRODUCT HOVER EFFECTS ──
        $('.product-img-wrap').hover(
            function () { $(this).find('.product-overlay').css('background', 'rgba(0,0,0,0.08)'); $(this).find('.heart-btn').css('opacity', '1'); },
            function () { $(this).find('.product-overlay').css('background', 'rgba(0,0,0,0)'); $(this).find('.heart-btn').css('opacity', '0'); }
        );
    }

    // ─── INITIALIZE COLOR PICKERS ──────────────────────────────
    var colorFields = [
        { id: 'colorPrimary', key: 'primaryColor', label: 'Primary' },
        { id: 'colorSecondary', key: 'secondaryColor', label: 'Secondary' },
        { id: 'colorAccent', key: 'accentColor', label: 'Accent' },
        { id: 'colorBackground', key: 'backgroundColor', label: 'Background' },
        { id: 'colorText', key: 'textColor', label: 'Text' },
        { id: 'colorCardBg', key: 'cardBackgroundColor', label: 'Card BG' },
        { id: 'colorHeroFrom', key: 'heroGradientFrom', label: 'Hero From' },
        { id: 'colorHeroTo', key: 'heroGradientTo', label: 'Hero To' }
    ];

    colorFields.forEach(function (cf) {
        var html = '<div class="color-label">' + cf.label + '</div>';
        html += '<div class="color-picker-wrap">';
        html += '<div class="color-swatch" id="swatch-' + cf.key + '" style="background:' + theme[cf.key] + ';">';
        html += '<input type="color" value="' + theme[cf.key] + '" data-key="' + cf.key + '" class="color-input">';
        html += '</div>';
        html += '<input type="text" class="form-control form-control-sm color-hex-input" id="hex-' + cf.key + '" value="' + theme[cf.key] + '" data-key="' + cf.key + '">';
        html += '</div>';
        $('#' + cf.id).html(html);
    });

    // ─── LIVE EVENT BINDING — jQuery Style ─────────────────────

    // Color picker changes
    $(document).on('input', '.color-input', function () {
        var key = $(this).data('key');
        var val = $(this).val();
        theme[key] = val;
        $('#swatch-' + key).css('background', val);
        $('#hex-' + key).val(val);
        renderStorefront();
        syncControls();
    });

    // Hex input changes
    $(document).on('change', '.color-hex-input', function () {
        var key = $(this).data('key');
        var val = $(this).val();
        if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
            theme[key] = val;
            $('#swatch-' + key).css('background', val);
            $('.color-input[data-key="' + key + '"]').val(val);
            renderStorefront();
        }
    });

    // Text inputs
    $('#storeName').on('input', function () { theme.storeName = $(this).val(); renderStorefront(); syncControls(); });
    $('#storeTagline').on('input', function () { theme.storeTagline = $(this).val(); renderStorefront(); });

    // Font selects
    $('#headingFont').on('change', function () { theme.headingFont = $(this).val(); renderStorefront(); });
    $('#bodyFont').on('change', function () { theme.bodyFont = $(this).val(); renderStorefront(); });

    // Range sliders
    $('#baseFontSize').on('input', function () {
        theme.baseFontSize = parseInt($(this).val());
        $('#fontSizeVal').text(theme.baseFontSize + 'px');
        renderStorefront();
    });
    $('#headingWeight').on('input', function () {
        theme.headingWeight = parseInt($(this).val());
        $('#weightVal').text(theme.headingWeight);
        renderStorefront();
    });
    $('#borderRadius').on('input', function () {
        theme.borderRadius = parseInt($(this).val());
        $('#radiusVal').text(theme.borderRadius + 'px');
        renderStorefront();
        updateBtnPreview();
    });
    $('#sectionSpacing').on('input', function () {
        theme.sectionSpacing = parseInt($(this).val());
        $('#spacingVal').text(theme.sectionSpacing + 'px');
        renderStorefront();
    });

    // Toggle button groups
    $(document).on('click', '.grid-col-btn', function () {
        $('.grid-col-btn').removeClass('active');
        $(this).addClass('active');
        theme.gridColumns = parseInt($(this).data('cols'));
        renderStorefront();
    });
    $(document).on('click', '.card-style-btn', function () {
        $('.card-style-btn').removeClass('active');
        $(this).addClass('active');
        theme.cardStyle = $(this).data('style');
        renderStorefront();
    });
    $(document).on('click', '.header-style-btn', function () {
        $('.header-style-btn').removeClass('active');
        $(this).addClass('active');
        theme.headerStyle = $(this).data('style');
        renderStorefront();
    });
    $(document).on('click', '.btn-shape-btn', function () {
        $('.btn-shape-btn').removeClass('active');
        $(this).addClass('active');
        theme.buttonStyle = $(this).data('shape');
        renderStorefront();
        updateBtnPreview();
    });
    $(document).on('click', '.btn-variant-btn', function () {
        $('.btn-variant-btn').removeClass('active');
        $(this).addClass('active');
        theme.buttonVariant = $(this).data('variant');
        renderStorefront();
        updateBtnPreview();
    });

    // Preset buttons
    $(document).on('click', '.preset-btn', function () {
        var key = $(this).data('preset');
        if (presets[key]) {
            theme = $.extend({}, presets[key]);
            syncControls();
            renderStorefront();
            showToast('Preset applied: ' + $(this).text());
        }
    });

    // Panel toggle
    $('#togglePanelBtn').on('click', function () {
        $('#controlPanel').toggleClass('collapsed');
    });

    // Device view
    $(document).on('click', '.device-btn', function () {
        $('.device-btn').removeClass('active');
        $(this).addClass('active');
        var device = $(this).data('device');
        $('#previewFrame').removeClass('tablet mobile');
        if (device !== 'desktop') {
            $('#previewFrame').addClass(device);
        }
    });

    // Reset
    $('#resetBtn').on('click', function () {
        theme = $.extend({}, defaultTheme);
        syncControls();
        renderStorefront();
        showToast('Theme reset to defaults');
    });

    // Export CSS
    $('#exportCssBtn').on('click', function () {
        var css = generateCSS();
        var blob = new Blob([css], { type: 'text/css' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'theme.css';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('CSS exported successfully!');
    });

    // Save preset
    $('#savePresetConfirm').on('click', function () {
        var name = $('#presetNameInput').val().trim();
        if (!name) return;
        var saved = JSON.parse(localStorage.getItem('themePresets') || '[]');
        saved.push({ name: name, config: $.extend({}, theme), id: Date.now() });
        localStorage.setItem('themePresets', JSON.stringify(saved));
        $('#presetNameInput').val('');
        bootstrap.Modal.getInstance(document.getElementById('savePresetModal')).hide();
        loadSavedPresets();
        showToast('Preset "' + name + '" saved!');
    });

    // ─── SYNC CONTROLS FROM THEME ───────────────────────────────
    function syncControls() {
        $('#storeName').val(theme.storeName);
        $('#storeTagline').val(theme.storeTagline);
        $('#headingFont').val(theme.headingFont);
        $('#bodyFont').val(theme.bodyFont);
        $('#baseFontSize').val(theme.baseFontSize);
        $('#fontSizeVal').text(theme.baseFontSize + 'px');
        $('#headingWeight').val(theme.headingWeight);
        $('#weightVal').text(theme.headingWeight);
        $('#borderRadius').val(theme.borderRadius);
        $('#radiusVal').text(theme.borderRadius + 'px');
        $('#sectionSpacing').val(theme.sectionSpacing);
        $('#spacingVal').text(theme.sectionSpacing + 'px');

        // Sync color pickers
        colorFields.forEach(function (cf) {
            $('#swatch-' + cf.key).css('background', theme[cf.key]);
            $('#hex-' + cf.key).val(theme[cf.key]);
            $('.color-input[data-key="' + cf.key + '"]').val(theme[cf.key]);
        });

        // Sync button groups
        $('.grid-col-btn').removeClass('active').filter('[data-cols="' + theme.gridColumns + '"]').addClass('active');
        $('.card-style-btn').removeClass('active').filter('[data-style="' + theme.cardStyle + '"]').addClass('active');
        $('.header-style-btn').removeClass('active').filter('[data-style="' + theme.headerStyle + '"]').addClass('active');
        $('.btn-shape-btn').removeClass('active').filter('[data-shape="' + theme.buttonStyle + '"]').addClass('active');
        $('.btn-variant-btn').removeClass('active').filter('[data-variant="' + theme.buttonVariant + '"]').addClass('active');

        // Sync badge
        $('#storeNameBadge').text(theme.storeName);

        updateBtnPreview();
    }

    // ─── UPDATE BUTTON PREVIEW ──────────────────────────────────
    function updateBtnPreview() {
        $('#previewBtnPrimary').attr('style', btnPrimaryStyles());
        $('#previewBtnAccent').attr('style', btnAccentStyles());
    }

    // ─── LOAD SAVED PRESETS ─────────────────────────────────────
    function loadSavedPresets() {
        var saved = JSON.parse(localStorage.getItem('themePresets') || '[]');
        var html = '';
        if (saved.length > 0) {
            html = '<label class="form-label small text-muted">Saved Presets (' + saved.length + ')</label>';
            saved.forEach(function (p) {
                html += '<div class="saved-preset-item">';
                html += '<span class="name" data-preset-id="' + p.id + '">' + p.name + '</span>';
                html += '<button class="delete-btn" data-preset-id="' + p.id + '"><i class="bi bi-trash3"></i></button>';
                html += '</div>';
            });
        }
        $('#savedPresetsList').html(html);
    }

    // Load preset on click
    $(document).on('click', '.saved-preset-item .name', function () {
        var id = parseInt($(this).data('preset-id'));
        var saved = JSON.parse(localStorage.getItem('themePresets') || '[]');
        var found = saved.find(function (p) { return p.id === id; });
        if (found) {
            theme = $.extend({}, found.config);
            syncControls();
            renderStorefront();
            showToast('Preset "' + found.name + '" applied');
        }
    });

    // Delete preset
    $(document).on('click', '.saved-preset-item .delete-btn', function () {
        var id = parseInt($(this).data('preset-id'));
        var saved = JSON.parse(localStorage.getItem('themePresets') || '[]');
        saved = saved.filter(function (p) { return p.id !== id; });
        localStorage.setItem('themePresets', JSON.stringify(saved));
        loadSavedPresets();
        showToast('Preset deleted');
    });

    // ─── GENERATE CSS ───────────────────────────────────────────
    function generateCSS() {
        return '/* Theme: ' + theme.storeName + ' */\n/* Generated by Theme Customizer */\n\n' +
            ':root {\n' +
            '  --store-primary: ' + theme.primaryColor + ';\n' +
            '  --store-secondary: ' + theme.secondaryColor + ';\n' +
            '  --store-accent: ' + theme.accentColor + ';\n' +
            '  --store-background: ' + theme.backgroundColor + ';\n' +
            '  --store-text: ' + theme.textColor + ';\n' +
            '  --store-card-bg: ' + theme.cardBackgroundColor + ';\n' +
            '  --store-radius: ' + theme.borderRadius + 'px;\n' +
            '  --store-heading-font: "' + theme.headingFont + '", sans-serif;\n' +
            '  --store-body-font: "' + theme.bodyFont + '", sans-serif;\n' +
            '  --store-base-font-size: ' + theme.baseFontSize + 'px;\n' +
            '  --store-heading-weight: ' + theme.headingWeight + ';\n' +
            '}\n\n' +
            'body {\n  font-family: var(--store-body-font);\n  font-size: var(--store-base-font-size);\n  color: var(--store-text);\n  background-color: var(--store-background);\n}\n\n' +
            'h1, h2, h3, h4, h5, h6 {\n  font-family: var(--store-heading-font);\n  font-weight: var(--store-heading-weight);\n}\n\n' +
            '.btn-primary {\n  background-color: var(--store-primary);\n  color: #ffffff;\n  border-radius: ' + (theme.buttonStyle === 'pill' ? '9999px' : theme.buttonStyle === 'squared' ? '0' : 'var(--store-radius)') + ';\n}\n\n' +
            '.btn-accent {\n  background-color: var(--store-accent);\n  color: #ffffff;\n  border-radius: ' + (theme.buttonStyle === 'pill' ? '9999px' : theme.buttonStyle === 'squared' ? '0' : 'var(--store-radius)') + ';\n}\n';
    }

    // ─── TOAST NOTIFICATION ─────────────────────────────────────
    function showToast(message) {
        var id = 'toast-' + Date.now();
        var html = '<div id="' + id + '" class="custom-toast"><i class="bi bi-check-circle-fill"></i> ' + message + '</div>';
        $('#toastContainer').append(html);
        setTimeout(function () { $('#' + id).fadeOut(300, function () { $(this).remove(); }); }, 2500);
    }

    // ─── INITIAL RENDER ─────────────────────────────────────────
    renderStorefront();
    updateBtnPreview();
    loadSavedPresets();
});
