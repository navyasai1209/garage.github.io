// Mobile menu functionality
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('nav-active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your server
            console.log('Contact form submitted:', data);
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Appointment form submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(appointmentForm);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to your server
            console.log('Appointment form submitted:', data);
            alert('Your appointment has been scheduled! We will send you a confirmation email shortly.');
            appointmentForm.reset();
        });
    }

    // Time slot selection
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            // Remove selected class from all slots
            timeSlots.forEach(s => s.classList.remove('selected'));
            // Add selected class to clicked slot
            slot.classList.add('selected');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to current navigation item
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-links a');
menuItems.forEach(item => {
    if(item.href === currentLocation) {
        item.classList.add('active');
    }
});

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }

        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.classList.add('error');
            }
        }
    });

    return isValid;
}

// Add error styles
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #e74c3c !important;
    }
    .nav-active {
        display: flex;
        flex-direction: column;
        position: absolute;
        right: 0;
        top: 70px;
        background-color: white;
        width: 100%;
        padding: 2rem;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .toggle .line2 {
        opacity: 0;
    }
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);

// Appointment Modal Functions
function openAppointmentModal() {
    document.getElementById('appointmentModal').style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeAppointmentModal() {
    document.getElementById('appointmentModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('appointmentModal');
    if (event.target == modal) {
        closeAppointmentModal();
    }
}

// Handle appointment form submission
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const appointmentData = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to your server
    console.log('Appointment Data:', appointmentData);
    
    // Show success message
    alert('Appointment booked successfully! We will contact you shortly.');
    
    // Close modal and reset form
    closeAppointmentModal();
    this.reset();
});

// Location Modal Functions
const locationData = {
    north: {
        title: "North India Branches",
        mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.5262086562!2d76.76356604999999!3d28.6436845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1645564750986!5m2!1sen!2s",
        branches: [
            {
                name: "Delhi Branch",
                address: "123 Connaught Place, New Delhi",
                phone: "(555) 111-2222",
                email: "delhi@suramalagarage.com"
            },
            {
                name: "Chandigarh Branch",
                address: "456 Sector 17, Chandigarh",
                phone: "(555) 222-3333",
                email: "chandigarh@suramalagarage.com"
            }
        ],
        services: [
            "General Maintenance",
            "Engine Repairs",
            "Transmission Service",
            "Brake Service",
            "AC Service"
        ],
        hours: {
            weekdays: "9:00 AM - 6:00 PM",
            saturday: "9:00 AM - 4:00 PM",
            sunday: "Closed"
        }
    },
    // Add similar data for other regions
};

function openLocationModal(region) {
    const modal = document.getElementById('locationModal');
    const data = locationData[region];
    
    // Update modal content
    document.getElementById('modalLocationTitle').textContent = data.title;
    document.getElementById('locationMap').src = data.mapUrl;
    
    // Update branch information
    const branchInfo = document.getElementById('branchInfo');
    branchInfo.innerHTML = data.branches.map(branch => `
        <div class="branch-detail">
            <h4>${branch.name}</h4>
            <p><i class="fas fa-map-marker-alt"></i> ${branch.address}</p>
            <p><i class="fas fa-phone"></i> ${branch.phone}</p>
            <p><i class="fas fa-envelope"></i> ${branch.email}</p>
        </div>
    `).join('');
    
    // Update services list
    const servicesList = document.getElementById('servicesList');
    servicesList.innerHTML = data.services.map(service => `
        <li>${service}</li>
    `).join('');
    
    // Update business hours
    const businessHours = document.getElementById('businessHours');
    businessHours.innerHTML = `
        <p><strong>Monday - Friday:</strong> ${data.hours.weekdays}</p>
        <p><strong>Saturday:</strong> ${data.hours.saturday}</p>
        <p><strong>Sunday:</strong> ${data.hours.sunday}</p>
    `;
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLocationModal() {
    const modal = document.getElementById('locationModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close location modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('locationModal');
    if (event.target == modal) {
        closeLocationModal();
    }
}

// Password visibility toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Form validation
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Add your signup logic here
            console.log('Signup form submitted');
        });
    }

    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your signin logic here
            console.log('Signin form submitted');
        });
    }

    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your forgot password logic here
            console.log('Forgot password form submitted');
        });
    }

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }
}); 