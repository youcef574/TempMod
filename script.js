// DOM Elements
const buyNowBtn = document.getElementById('buyNowBtn');
const whatsappBtn = document.getElementById('whatsappBtn');
const orderForm = document.getElementById('orderForm');
const orderPopup = document.getElementById('orderPopup');
const confirmOrderBtn = document.getElementById('confirmOrderBtn');
const successMessage = document.getElementById('successMessage');
const backToTopBtn = document.getElementById('backToTop');

// Product price
const PRODUCT_PRICE = 29999;

// Image gallery functionality
function changeImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    mainImage.src = imageSrc;
    
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src.includes(imageSrc)) {
            thumb.classList.add('active');
        }
    });
}

// FAQ functionality
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Form validation
function validateForm() {
    const requiredFields = [
        'variation',
        'quantity',
        'fullName',
        'phone',
        'wilaya',
        'commune'
    ];
    
    for (let field of requiredFields) {
        const element = document.getElementById(field);
        if (!element.value.trim()) {
            element.focus();
            alert(`Veuillez remplir le champ: ${element.previousElementSibling.textContent}`);
            return false;
        }
    }
    
    // Phone validation
    const phone = document.getElementById('phone').value;
    const phoneRegex = /^[0-9+\-\s()]{8,}$/;
    if (!phoneRegex.test(phone)) {
        alert('Veuillez entrer un numéro de téléphone valide');
        document.getElementById('phone').focus();
        return false;
    }
    
    return true;
}

// Update order summary
function updateOrderSummary() {
    const variation = document.getElementById('variation').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const wilaya = document.getElementById('wilaya').value;
    const commune = document.getElementById('commune').value;
    const shippingCost = parseFloat(document.getElementById('shippingCost').value);
    
    // Update summary elements
    document.getElementById('summaryVariation').textContent = 
        document.querySelector(`#variation option[value="${variation}"]`).textContent;
    document.getElementById('summaryQuantity').textContent = quantity;
    document.getElementById('summaryName').textContent = fullName;
    document.getElementById('summaryPhone').textContent = phone;
    document.getElementById('summaryWilaya').textContent = 
        document.querySelector(`#wilaya option[value="${wilaya}"]`).textContent;
    document.getElementById('summaryCommune').textContent = commune;
    
    const productTotal = PRODUCT_PRICE * quantity;
    const total = productTotal + shippingCost;
    
    document.getElementById('summaryProductPrice').textContent = `${productTotal.toLocaleString('fr-FR')} DZD`;
    document.getElementById('summaryShipping').textContent = `${shippingCost.toLocaleString('fr-FR')} DZD`;
    document.getElementById('summaryTotal').textContent = `${total.toLocaleString('fr-FR')} DZD`;
}

// Show order popup
function showOrderPopup() {
    if (!validateForm()) {
        return;
    }
    
    updateOrderSummary();
    orderPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close popup
function closePopup() {
    orderPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Show success message
function showSuccessMessage() {
    closePopup();
    successMessage.classList.add('active');
}

// Close success message
function closeSuccess() {
    successMessage.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    orderForm.reset();
    document.getElementById('shippingCost').value = '5.99';
}

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button
function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
}

// Update shipping cost based on wilaya (example logic)
function updateShippingCost() {
    const wilaya = document.getElementById('wilaya').value;
    const shippingCostField = document.getElementById('shippingCost');
    
    // Example shipping costs by wilaya
    const shippingCosts = {
        'alger': 1200,
        'oran': 1600,
        'constantine': 1800,
        'annaba': 2000,
        'blida': 1400,
        'batna': 2200,
        'djelfa': 2400,
        'setif': 2000,
        'sidi-bel-abbes': 1800,
        'biskra': 2600
    };
    
    if (wilaya && shippingCosts[wilaya]) {
        shippingCostField.value = shippingCosts[wilaya];
    }
}

// WhatsApp order function
function orderViaWhatsApp() {
    const variation = document.getElementById('variation').value || 'Non spécifiée';
    const quantity = document.getElementById('quantity').value || '1';
    const fullName = document.getElementById('fullName').value || '';
    const phone = document.getElementById('phone').value || '';
    const wilaya = document.getElementById('wilaya').value || '';
    const commune = document.getElementById('commune').value || '';
    
    const message = `Bonjour, je souhaite commander :\n\n` +
                   `🛍️ Produit : Montre Élégante\n` +
                   `🎨 Couleur : ${variation}\n` +
                   `📦 Quantité : ${quantity}\n` +
                   `👤 Nom : ${fullName}\n` +
                   `📞 Téléphone : ${phone}\n` +
                   `📍 Wilaya : ${wilaya}\n` +
                   `🏘️ Commune : ${commune}\n\n` +
                   `Merci de me confirmer les détails et le prix total.`;
    
    const whatsappUrl = `https://wa.me/213661206507?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Event Listeners
buyNowBtn.addEventListener('click', function() {
    // Scroll to order form section
    const orderFormSection = document.querySelector('.order-form-section');
    if (orderFormSection) {
        orderFormSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
});

// WhatsApp button event listener
whatsappBtn.addEventListener('click', orderViaWhatsApp);

// Additional buy button event listener
const additionalBuyBtn = document.getElementById('additionalBuyBtn');
if (additionalBuyBtn) {
    additionalBuyBtn.addEventListener('click', function() {
        showOrderPopup();
    });
}
confirmOrderBtn.addEventListener('click', showSuccessMessage);
backToTopBtn.addEventListener('click', scrollToTop);

// Wilaya change event
document.getElementById('wilaya').addEventListener('change', updateShippingCost);

// Scroll event for back to top button
window.addEventListener('scroll', toggleBackToTopButton);

// Close popup when clicking outside
orderPopup.addEventListener('click', function(e) {
    if (e.target === orderPopup) {
        closePopup();
    }
});

successMessage.addEventListener('click', function(e) {
    if (e.target === successMessage) {
        closeSuccess();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (orderPopup.classList.contains('active')) {
            closePopup();
        }
        if (successMessage.classList.contains('active')) {
            closeSuccess();
        }
    }
});

// Form submission prevention (since we're using popup)
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();
    showOrderPopup();
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set initial shipping cost
    document.getElementById('shippingCost').value = '1200';
    
    // Initialize back to top button state
    toggleBackToTopButton();
    
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation to buy button
function addLoadingToBuyButton() {
    const originalText = buyNowBtn.innerHTML;
    buyNowBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
    buyNowBtn.disabled = true;
    
    setTimeout(() => {
        buyNowBtn.innerHTML = originalText;
        buyNowBtn.disabled = false;
    }, 1000);
}

// Enhanced form validation with real-time feedback
function addRealTimeValidation() {
    const inputs = orderForm.querySelectorAll('input, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    // Remove previous error styling
    field.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        field.classList.add('error');
        return false;
    }
    
    // Specific validations
    if (fieldName === 'phone') {
        const phoneRegex = /^[0-9+\-\s()]{8,}$/;
        if (value && !phoneRegex.test(value)) {
            field.classList.add('error');
            return false;
        }
    }
    
    if (fieldName === 'fullName') {
        if (value && value.length < 2) {
            field.classList.add('error');
            return false;
        }
    }
    
    return true;
}

// Add error styling to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
`;
document.head.appendChild(style);

// Initialize real-time validation
document.addEventListener('DOMContentLoaded', function() {
    addRealTimeValidation();
});

// Add animation to service cards on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
});
