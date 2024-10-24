// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // Debug function to check if elements exist
    function debugElement(element, name) {
        console.log(`${name}: `, element);
        if (!element) {
            console.warn(`${name} not found!`);
        }
    }

    // Mobile menu elements
    const hamburgerMenu = document.querySelector('.v73_127');
    const mobileMenuContainer = document.querySelector('.v34_1136');
    const closeMenuBtn = document.querySelector('.v34_1264');
    
    debugElement(hamburgerMenu, 'Hamburger Menu');
    debugElement(mobileMenuContainer, 'Mobile Menu Container');
    debugElement(closeMenuBtn, 'Close Menu Button');

    // Navigation elements
    const navItems = {
        portfolio: document.querySelector('.v34_1137'),
        about: document.querySelector('.v34_1139'),
        contact: document.querySelector('.v34_1141')
    };

    Object.entries(navItems).forEach(([key, element]) => {
        debugElement(element, `Nav Item: ${key}`);
    });

    // Form elements
    const form = document.querySelector('.v34_856');
    const nameInput = form?.querySelector('input[type="text"]') || document.querySelector('.v34_864');
    const emailInput = form?.querySelector('input[type="email"]') || document.querySelector('.v34_872');
    const messageInput = form?.querySelector('textarea') || document.querySelector('.v34_876');
    const submitBtn = document.querySelector('.v34_877');

    debugElement(form, 'Contact Form');
    debugElement(nameInput, 'Name Input');
    debugElement(emailInput, 'Email Input');
    debugElement(messageInput, 'Message Input');
    debugElement(submitBtn, 'Submit Button');

    // Mobile menu functionality
    function setupMobileMenu() {
        if (hamburgerMenu && mobileMenuContainer) {
            // Initially hide mobile menu
            mobileMenuContainer.style.display = 'none';
            
            hamburgerMenu.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Hamburger clicked');
                mobileMenuContainer.style.display = 'flex';
                mobileMenuContainer.style.position = 'fixed';
                mobileMenuContainer.style.top = '0';
                mobileMenuContainer.style.left = '0';
                mobileMenuContainer.style.right = '0';
                mobileMenuContainer.style.bottom = '0';
                mobileMenuContainer.style.backgroundColor = 'white';
                mobileMenuContainer.style.zIndex = '1000';
            });
        }

        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Close button clicked');
                mobileMenuContainer.style.display = 'none';
            });
        }
    }

    // Navigation functionality
    function setupNavigation() {
        Object.entries(navItems).forEach(([section, element]) => {
            if (element) {
                element.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log(`${section} clicked`);
                    
                    // Close mobile menu
                    if (mobileMenuContainer) {
                        mobileMenuContainer.style.display = 'none';
                    }

                    // Scroll to section
                    const targetSection = {
                        portfolio: '.v34_920',
                        about: '.v34_881',
                        contact: '.v34_852'
                    }[section];

                    const sectionElement = document.querySelector(targetSection);
                    if (sectionElement) {
                        sectionElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        });
    }

    // Form functionality
    function setupForm() {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Form submitted');

                const formData = {
                    name: nameInput?.value || '',
                    email: emailInput?.value || '',
                    message: messageInput?.value || ''
                };

                // Validate form
                const errors = [];
                if (!formData.name.trim()) errors.push('Name is required');
                if (!formData.email.trim()) errors.push('Email is required');
                if (!formData.message.trim()) errors.push('Message is required');

                if (errors.length > 0) {
                    alert(errors.join('\n'));
                    return;
                }

                console.log('Form data:', formData);
                alert('Form submitted successfully!');
                form.reset();
            });
        }
    }

    // Initialize everything
    try {
        setupMobileMenu();
        setupNavigation();
        setupForm();
        
        // Add basic styles
        const style = document.createElement('style');
        style.textContent = `
            .v34_1136 {
                display: none;
            }
            
            @media (max-width: 768px) {
                .v34_1136.active {
                    display: flex;
                    flex-direction: column;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: white;
                    z-index: 1000;
                    padding: 20px;
                }
            }
        `;
        document.head.appendChild(style);
        
    } catch (error) {
        console.error('Error initializing:', error);
    }
});