// ===== Car Data =====
const carsData = [
    {
        id: 'sedan',
        name: 'Premium Sedan',
        category: 'sedan',
        image: '../images/sedan.png',
        seats: 5,
        transmission: 'Auto',
        fuel: 'Petrol',
        ac: true,
        price: 2500,
        rating: 4.8,
        reviews: 124,
        badge: 'Popular',
        description: 'Experience luxury and comfort with our Premium Sedan. Perfect for business trips and family outings, this car combines style with performance.',
        features: ['GPS Navigation', 'Bluetooth', 'Leather Seats', 'Sunroof', 'Cruise Control', 'Backup Camera']
    },
    {
        id: 'suv',
        name: 'Luxury SUV',
        category: 'suv',
        image: '../images/suv.png',
        seats: 7,
        transmission: 'Auto',
        fuel: 'Diesel',
        ac: true,
        price: 4500,
        rating: 4.9,
        reviews: 98,
        badge: 'Hot Deal',
        badgeType: 'hot',
        description: 'The ultimate family vehicle with spacious interiors and powerful performance. Ideal for long road trips and adventures.',
        features: ['GPS Navigation', 'Bluetooth', 'Third Row Seating', '4WD', 'Climate Control', 'Entertainment System']
    },
    {
        id: 'coupe',
        name: 'Sports Coupe',
        category: 'coupe',
        image: '../images/coupe.png',
        seats: 2,
        transmission: 'Manual',
        fuel: 'Petrol',
        ac: true,
        price: 5500,
        rating: 4.7,
        reviews: 67,
        description: 'Feel the thrill of driving with our Sports Coupe. Designed for performance enthusiasts who want an unforgettable driving experience.',
        features: ['Sport Mode', 'Racing Seats', 'Premium Audio', 'Performance Brakes', 'Carbon Fiber Interior']
    },
    {
        id: 'hatchback',
        name: 'Compact Hatchback',
        category: 'hatchback',
        image: '../images/hatchback.png',
        seats: 5,
        transmission: 'Manual',
        fuel: 'Petrol',
        ac: true,
        price: 1500,
        rating: 4.5,
        reviews: 156,
        badge: 'Budget',
        badgeType: 'budget',
        description: 'Perfect for city driving and daily commutes. Fuel-efficient and easy to park, this hatchback offers great value.',
        features: ['Fuel Efficient', 'Bluetooth', 'USB Ports', 'Power Windows', 'Central Locking']
    },
    {
        id: 'convertible',
        name: 'Luxury Convertible',
        category: 'convertible',
        image: '../images/convertable.png',
        seats: 4,
        transmission: 'Auto',
        fuel: 'Petrol',
        ac: true,
        price: 6500,
        rating: 4.9,
        reviews: 45,
        badge: 'Premium',
        description: 'Feel the wind in your hair with our Luxury Convertible. Perfect for coastal drives and special occasions.',
        features: ['Retractable Roof', 'Premium Leather', 'Wind Deflector', 'Premium Audio', 'Heated Seats']
    },
    {
        id: 'wagon',
        name: 'Family Wagon',
        category: 'wagon',
        image: '../images/wagon.png',
        seats: 5,
        transmission: 'Manual',
        fuel: 'Petrol',
        ac: true,
        price: 1800,
        rating: 4.6,
        reviews: 89,
        badge: 'Family',
        badgeType: 'budget',
        description: 'Spacious and practical, the Family Wagon is perfect for families who need extra cargo space without compromising on comfort.',
        features: ['Large Boot', 'Roof Rails', 'Rear AC Vents', 'Child Seat Anchors', 'Parking Sensors']
    }
];

// Initialize AOS (AOS is loaded via CDN; no ES module import in browser)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Attach dynamic DOM event listeners (safe after DOM is ready)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navAuth = document.getElementById('navAuth');
    const navProfile = document.getElementById('navProfile');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('active');
            if (navAuth && navAuth.style.display !== 'none') navAuth.classList.toggle('active');
            if (navProfile && navProfile.style.display !== 'none') navProfile.classList.toggle('active');
        });
    }

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Search Form
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const location = document.getElementById('pickupLocation').value;
            const pickupDate = document.getElementById('pickupDate').value;
            const pickupTime = document.getElementById('pickupTime').value;
            const returnDate = document.getElementById('returnDate').value;
            const returnTime = document.getElementById('returnTime').value;
            
            if (!location || !pickupDate || !pickupTime || !returnDate || !returnTime) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            const searchParams = {
                location,
                pickupDate,
                pickupTime,
                returnDate,
                returnTime
            };
            localStorage.setItem('searchParams', JSON.stringify(searchParams));
            
            window.location.href = 'pages/cars.html';
        });
    }

    // Check login status
    checkLoginStatus();
    
    // Set minimum dates for date inputs
    setMinDates();
    
    // Initialize page-specific functionality
    initPage();
});

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
});

// Mobile menu, back-to-top and search handlers are attached inside DOMContentLoaded (see above).

// ===== Set Minimum Dates =====
function setMinDates() {
    const today = new Date().toISOString().split('T')[0];
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    
    if (pickupDate) {
        pickupDate.min = today;
        pickupDate.addEventListener('change', function() {
            if (returnDate) {
                returnDate.min = this.value;
            }
        });
    }
}

// ===== Authentication Functions =====
function checkLoginStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const navAuth = document.getElementById('navAuth');
    const navProfile = document.getElementById('navProfile');
    const profileName = document.getElementById('profileName');
    const navAvatar = document.getElementById('navAvatar');
    
    if (user) {
        if (navAuth) navAuth.style.display = 'none';
        if (navProfile) {
            navProfile.style.display = 'block';
            if (profileName) profileName.textContent = user.name.split(' ')[0];
            if (navAvatar) navAvatar.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=ff5500&color=fff';
        }
    } else {
        if (navAuth) navAuth.style.display = 'flex';
        if (navProfile) navProfile.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    showToast('Logged out successfully');
    setTimeout(function() {
        window.location.href = window.location.pathname.includes('pages/') ? '../index.html' : 'index.html';
    }, 1000);
}

// ===== Toast Notification =====
function showToast(message, type) {
    type = type || 'success';
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.className = 'toast show';
        if (type === 'error') {
            toast.classList.add('error');
        }
        
        setTimeout(function() {
            toast.classList.remove('show');
        }, 3000);
    }
}

// ===== Initialize Page =====
function initPage() {
    const path = window.location.pathname;
    
    if (path.includes('cars.html')) {
        initCarsPage();
    } else if (path.includes('car-details.html')) {
        initCarDetailsPage();
    } else if (path.includes('login.html')) {
        initLoginPage();
    } else if (path.includes('signup.html')) {
        initSignupPage();
    } else if (path.includes('profile.html')) {
        initProfilePage();
    } else if (path.includes('my-bookings.html')) {
        initBookingsPage();
    } else if (path.includes('contact.html')) {
        initContactPage();
    }
}

// ===== Cars Page Functions =====
function initCarsPage() {
    // Load search params if available
    const searchParams = JSON.parse(localStorage.getItem('searchParams'));
    if (searchParams) {
        const locationSelect = document.getElementById('filterLocation');
        if (locationSelect) locationSelect.value = searchParams.location;
    }
    
    // Render cars
    renderCars(carsData);
    
    // Category filter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
        const checkbox = document.querySelector('input[value="' + category + '"]');
        if (checkbox) {
            checkbox.checked = true;
            filterCars();
        }
    }
}

function renderCars(cars) {
    const carsList = document.getElementById('carsList');
    const carsCount = document.getElementById('carsCount');
    
    if (!carsList) return;
    
    if (carsCount) carsCount.textContent = cars.length;
    
    if (cars.length === 0) {
        carsList.innerHTML = '<div class="empty-state" style="grid-column: 1 / -1;"><i class="fas fa-car"></i><h3>No cars found</h3><p>Try adjusting your filters</p></div>';
        return;
    }
    
    var html = '';
    cars.forEach(function(car) {
        html += '<div class="car-card" data-aos="fade-up">';
        if (car.badge) {
            html += '<div class="car-badge ' + (car.badgeType || '') + '">' + car.badge + '</div>';
        }
        html += '<div class="car-image"><img src="' + car.image + '" alt="' + car.name + '"></div>';
        html += '<div class="car-info">';
        html += '<h3>' + car.name + '</h3>';
        html += '<div class="car-features">';
        html += '<span><i class="fas fa-user"></i> ' + car.seats + ' Seats</span>';
        html += '<span><i class="fas fa-cog"></i> ' + car.transmission + '</span>';
        html += '<span><i class="fas fa-snowflake"></i> AC</span>';
        html += '</div>';
        html += '<div class="car-price">';
        html += '<span class="price">₹' + car.price.toLocaleString() + '</span>';
        html += '<span class="per-day">/day</span>';
        html += '</div>';
        html += '<a href="car-details.html?car=' + car.id + '" class="btn btn-primary">Rent Now</a>';
        html += '</div></div>';
    });
    
    carsList.innerHTML = html;
    
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

function filterCars() {
    // Get selected categories
    var categoryCheckboxes = document.querySelectorAll('input[name="category"]:checked');
    var selectedCategories = [];
    categoryCheckboxes.forEach(function(cb) {
        selectedCategories.push(cb.value);
    });
    
    // Get selected transmissions
    var transmissionCheckboxes = document.querySelectorAll('input[name="transmission"]:checked');
    var selectedTransmissions = [];
    transmissionCheckboxes.forEach(function(cb) {
        selectedTransmissions.push(cb.value);
    });
    
    // Get price range
    var minPriceEl = document.getElementById('minPrice');
    var maxPriceEl = document.getElementById('maxPrice');
    var minPrice = minPriceEl ? parseInt(minPriceEl.value) || 0 : 0;
    var maxPrice = maxPriceEl ? parseInt(maxPriceEl.value) || Infinity : Infinity;
    
    // Filter cars
    var filteredCars = carsData.filter(function(car) {
        var categoryMatch = selectedCategories.length === 0 || selectedCategories.indexOf(car.category) !== -1;
        var transmissionMatch = selectedTransmissions.length === 0 || selectedTransmissions.indexOf(car.transmission.toLowerCase()) !== -1;
        var priceMatch = car.price >= minPrice && car.price <= maxPrice;
        
        return categoryMatch && transmissionMatch && priceMatch;
    });
    
    // Sort cars
    var sortSelect = document.getElementById('sortCars');
    if (sortSelect) {
        var sortValue = sortSelect.value;
        if (sortValue === 'price-low') {
            filteredCars.sort(function(a, b) { return a.price - b.price; });
        } else if (sortValue === 'price-high') {
            filteredCars.sort(function(a, b) { return b.price - a.price; });
        } else if (sortValue === 'rating') {
            filteredCars.sort(function(a, b) { return b.rating - a.rating; });
        }
    }
    
    renderCars(filteredCars);
}

function clearFilters() {
    // Uncheck all checkboxes
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(cb) { cb.checked = false; });
    
    // Reset price range
    var minPrice = document.getElementById('minPrice');
    var maxPrice = document.getElementById('maxPrice');
    if (minPrice) minPrice.value = '';
    if (maxPrice) maxPrice.value = '';
    
    // Reset sort
    var sortSelect = document.getElementById('sortCars');
    if (sortSelect) sortSelect.value = 'featured';
    
    // Render all cars
    renderCars(carsData);
}

// ===== Car Details Page Functions =====
function initCarDetailsPage() {
    var urlParams = new URLSearchParams(window.location.search);
    var carId = urlParams.get('car');
    
    var car = null;
    for (var i = 0; i < carsData.length; i++) {
        if (carsData[i].id === carId) {
            car = carsData[i];
            break;
        }
    }
    
    if (!car) {
        window.location.href = 'cars.html';
        return;
    }
    
    // Populate car details
    var carName = document.getElementById('carName');
    var carNameHeader = document.getElementById('carNameHeader');
    var carImage = document.getElementById('carImage');
    var carRating = document.getElementById('carRating');
    var carSeats = document.getElementById('carSeats');
    var carTransmission = document.getElementById('carTransmission');
    var carFuel = document.getElementById('carFuel');
    var carDescription = document.getElementById('carDescription');
    var carPrice = document.getElementById('carPrice');
    
    if (carName) carName.textContent = car.name;
    if (carNameHeader) carNameHeader.textContent = car.name;
    if (carImage) {
        carImage.src = car.image;
        carImage.alt = car.name;
    }
    if (carRating) carRating.innerHTML = '<i class="fas fa-star"></i> ' + car.rating + ' (' + car.reviews + ' reviews)';
    if (carSeats) carSeats.textContent = car.seats + ' Seats';
    if (carTransmission) carTransmission.textContent = car.transmission;
    if (carFuel) carFuel.textContent = car.fuel;
    if (carDescription) carDescription.textContent = car.description;
    if (carPrice) carPrice.innerHTML = '₹' + car.price.toLocaleString() + ' <span>/day</span>';
    
    // Render features
    var featuresContainer = document.getElementById('carFeatures');
    if (featuresContainer) {
        var featuresHtml = '';
        car.features.forEach(function(f) {
            featuresHtml += '<span><i class="fas fa-check"></i> ' + f + '</span>';
        });
        featuresContainer.innerHTML = featuresHtml;
    }
    
    // Load search params
    var searchParams = JSON.parse(localStorage.getItem('searchParams'));
    if (searchParams) {
        var bookingLocation = document.getElementById('bookingLocation');
        var bookingPickupDate = document.getElementById('bookingPickupDate');
        var bookingReturnDate = document.getElementById('bookingReturnDate');
        
        if (bookingLocation) bookingLocation.value = searchParams.location;
        if (bookingPickupDate) bookingPickupDate.value = searchParams.pickupDate;
        if (bookingReturnDate) bookingReturnDate.value = searchParams.returnDate;
        calculateTotal();
    }
    
    // Store current car for booking
    localStorage.setItem('currentCar', JSON.stringify(car));
}

function calculateTotal() {
    var car = JSON.parse(localStorage.getItem('currentCar'));
    if (!car) return;
    
    var pickupDateEl = document.getElementById('bookingPickupDate');
    var returnDateEl = document.getElementById('bookingReturnDate');
    
    var pickupDate = pickupDateEl ? pickupDateEl.value : null;
    var returnDate = returnDateEl ? returnDateEl.value : null;
    
    if (pickupDate && returnDate) {
        var start = new Date(pickupDate);
        var end = new Date(returnDate);
        var days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        
        if (days > 0) {
            var subtotal = car.price * days;
            var tax = Math.round(subtotal * 0.18);
            var total = subtotal + tax;
            
            var rentalDays = document.getElementById('rentalDays');
            var subtotalEl = document.getElementById('subtotal');
            var taxAmount = document.getElementById('taxAmount');
            var totalAmount = document.getElementById('totalAmount');
            
            if (rentalDays) rentalDays.textContent = days + ' day' + (days > 1 ? 's' : '');
            if (subtotalEl) subtotalEl.textContent = '₹' + subtotal.toLocaleString();
            if (taxAmount) taxAmount.textContent = '₹' + tax.toLocaleString();
            if (totalAmount) totalAmount.textContent = '₹' + total.toLocaleString();
            
            // Store booking details
            var bookingLocation = document.getElementById('bookingLocation');
            localStorage.setItem('bookingDetails', JSON.stringify({
                car: car,
                days: days,
                subtotal: subtotal,
                tax: tax,
                total: total,
                pickupDate: pickupDate,
                returnDate: returnDate,
                location: bookingLocation ? bookingLocation.value : ''
            }));
        }
    }
}

function openPaymentModal() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        showToast('Please login to book a car', 'error');
        setTimeout(function() {
            window.location.href = 'login.html';
        }, 1500);
        return;
    }
    
    var bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    if (!bookingDetails || !bookingDetails.total) {
        showToast('Please select dates first', 'error');
        return;
    }
    
    var paymentAmount = document.getElementById('paymentAmount');
    if (paymentAmount) paymentAmount.textContent = '₹' + bookingDetails.total.toLocaleString();
    
    var paymentModal = document.getElementById('paymentModal');
    if (paymentModal) paymentModal.classList.add('active');
}

function closePaymentModal() {
    var paymentModal = document.getElementById('paymentModal');
    if (paymentModal) paymentModal.classList.remove('active');
}

function selectPaymentMethod(method) {
    var methods = document.querySelectorAll('.payment-method');
    methods.forEach(function(pm) { pm.classList.remove('active'); });
    
    var selected = document.querySelector('.payment-method[onclick="selectPaymentMethod(\'' + method + '\')"]');
    if (selected) selected.classList.add('active');
}

function confirmPayment() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    var bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    
    // Create booking
    var booking = {
        id: Date.now(),
        car: bookingDetails.car,
        days: bookingDetails.days,
        subtotal: bookingDetails.subtotal,
        tax: bookingDetails.tax,
        total: bookingDetails.total,
        pickupDate: bookingDetails.pickupDate,
        returnDate: bookingDetails.returnDate,
        location: bookingDetails.location,
        userId: user.email,
        status: 'confirmed',
        bookedAt: new Date().toISOString()
    };
    
    // Save to bookings
    var bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    closePaymentModal();
    showToast('Booking confirmed successfully!');
    
    setTimeout(function() {
        window.location.href = 'my-bookings.html';
    }, 1500);
}

// ===== Login Page Functions =====
function initLoginPage() {
    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            
            // Get users from storage
            var users = JSON.parse(localStorage.getItem('users')) || [];
            var user = null;
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === email && users[i].password === password) {
                    user = users[i];
                    break;
                }
            }
            
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                showToast('Login successful!');
                setTimeout(function() {
                    window.location.href = '../index.html';
                }, 1000);
            } else {
                showToast('Invalid email or password', 'error');
            }
        });
    }
}

// ===== Signup Page Functions =====
function initSignupPage() {
    var signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var phone = document.getElementById('phone').value;
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }
            
            if (password.length < 6) {
                showToast('Password must be at least 6 characters', 'error');
                return;
            }
            
            // Check if user exists
            var users = JSON.parse(localStorage.getItem('users')) || [];
            var exists = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === email) {
                    exists = true;
                    break;
                }
            }
            
            if (exists) {
                showToast('Email already registered', 'error');
                return;
            }
            
            // Create user
            var newUser = {
                id: Date.now(),
                name: name,
                email: email,
                phone: phone,
                password: password,
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            showToast('Account created successfully!');
            setTimeout(function() {
                window.location.href = '../index.html';
            }, 1000);
        });
    }
}

// ===== Profile Page Functions =====
function initProfilePage() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Populate profile data
    var profileAvatar = document.getElementById('profileAvatar');
    var profileNameDisplay = document.getElementById('profileNameDisplay');
    var profileEmailDisplay = document.getElementById('profileEmailDisplay');
    var profileNameInput = document.getElementById('profileNameInput');
    var profileEmailInput = document.getElementById('profileEmailInput');
    var profilePhoneInput = document.getElementById('profilePhoneInput');
    
    if (profileAvatar) profileAvatar.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=ff5500&color=fff&size=120';
    if (profileNameDisplay) profileNameDisplay.textContent = user.name;
    if (profileEmailDisplay) profileEmailDisplay.textContent = user.email;
    if (profileNameInput) profileNameInput.value = user.name;
    if (profileEmailInput) profileEmailInput.value = user.email;
    if (profilePhoneInput) profilePhoneInput.value = user.phone || '';
    
    // Profile form
    var profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            user.name = document.getElementById('profileNameInput').value;
            user.phone = document.getElementById('profilePhoneInput').value;
            
            // Update in users array
            var users = JSON.parse(localStorage.getItem('users')) || [];
            for (var i = 0; i < users.length; i++) {
                if (users[i].email === user.email) {
                    users[i] = user;
                    break;
                }
            }
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            showToast('Profile updated successfully!');
            
            // Update display
            if (profileNameDisplay) profileNameDisplay.textContent = user.name;
            if (profileAvatar) profileAvatar.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=ff5500&color=fff&size=120';
        });
    }
}

// ===== Bookings Page Functions =====
function initBookingsPage() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update sidebar
    var sidebarAvatar = document.getElementById('sidebarAvatar');
    var sidebarName = document.getElementById('sidebarName');
    var sidebarEmail = document.getElementById('sidebarEmail');
    
    if (sidebarAvatar) sidebarAvatar.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name) + '&background=ff5500&color=fff&size=120';
    if (sidebarName) sidebarName.textContent = user.name;
    if (sidebarEmail) sidebarEmail.textContent = user.email;
    
    // Get user bookings
    var allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    var userBookings = allBookings.filter(function(b) { return b.userId === user.email; });
    
    var bookingsList = document.getElementById('bookingsList');
    
    if (!bookingsList) return;
    
    if (userBookings.length === 0) {
        bookingsList.innerHTML = '<div class="empty-state"><i class="fas fa-calendar-times"></i><h3>No bookings yet</h3><p>Start exploring our cars and book your first ride!</p><a href="cars.html" class="btn btn-primary">Browse Cars</a></div>';
        return;
    }
    
    var html = '';
    userBookings.forEach(function(booking) {
        html += '<div class="booking-item">';
        html += '<div class="booking-item-image"><img src="' + booking.car.image + '" alt="' + booking.car.name + '"></div>';
        html += '<div class="booking-item-info">';
        html += '<h4>' + booking.car.name + '</h4>';
        html += '<p><i class="fas fa-map-marker-alt"></i> ' + booking.location.charAt(0).toUpperCase() + booking.location.slice(1) + '</p>';
        html += '<p><i class="fas fa-calendar"></i> ' + formatDate(booking.pickupDate) + ' - ' + formatDate(booking.returnDate) + '</p>';
        html += '<span class="booking-status ' + booking.status + '">' + booking.status.charAt(0).toUpperCase() + booking.status.slice(1) + '</span>';
        html += '</div>';
        html += '<div class="booking-item-actions">';
        html += '<div class="price">₹' + booking.total.toLocaleString() + '</div>';
        html += '<button class="btn btn-sm btn-outline-dark" onclick="viewBookingDetails(' + booking.id + ')">View Details</button>';
        html += '</div></div>';
    });
    
    bookingsList.innerHTML = html;
}

function formatDate(dateStr) {
    var date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function viewBookingDetails(bookingId) {
    var allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    var booking = null;
    for (var i = 0; i < allBookings.length; i++) {
        if (allBookings[i].id === bookingId) {
            booking = allBookings[i];
            break;
        }
    }
    
    if (booking) {
        alert('Booking Details:\n\nCar: ' + booking.car.name + '\nPickup: ' + formatDate(booking.pickupDate) + '\nReturn: ' + formatDate(booking.returnDate) + '\nLocation: ' + booking.location + '\nTotal: ₹' + booking.total.toLocaleString() + '\nStatus: ' + booking.status);
    }
}

// ===== Contact Page Functions =====
function initContactPage() {
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = document.getElementById('contactName').value;
            var email = document.getElementById('contactEmail').value;
            var subject = document.getElementById('contactSubject').value;
            var message = document.getElementById('contactMessage').value;
            
            // Save message (in real app, this would be sent to server)
            var messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
            messages.push({
                id: Date.now(),
                name: name,
                email: email,
                subject: subject,
                message: message,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('contactMessages', JSON.stringify(messages));
            
            showToast('Message sent successfully!');
            contactForm.reset();
        });
    }
}

// ===== Password Toggle =====
function togglePassword(inputId) {
    var input = document.getElementById(inputId);
    var icon = input.parentElement.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Make functions globally available
window.logout = logout;
window.filterCars = filterCars;
window.clearFilters = clearFilters;
window.calculateTotal = calculateTotal;
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.selectPaymentMethod = selectPaymentMethod;
window.confirmPayment = confirmPayment;
window.togglePassword = togglePassword;
window.viewBookingDetails = viewBookingDetails;
