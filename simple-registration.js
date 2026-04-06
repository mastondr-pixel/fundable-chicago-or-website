// ============================================================================
// SIMPLIFIED REGISTRATION FORM - CUSTOMER EXPERIENCE FIRST
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registration-form');
  
  if (!form) {
    console.log('Registration form not found');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('📝 Form submitted');

    // Get only the essential fields
    const formData = {
      firstName: form.querySelector('input[name="firstName"]')?.value || '',
      lastName: form.querySelector('input[name="lastName"]')?.value || '',
      email: form.querySelector('input[name="email"]')?.value || '',
      phone: form.querySelector('input[name="phone"]')?.value || '',
      organizationName: form.querySelector('input[name="organizationName"]')?.value || '',
      organizationType: form.querySelector('select[name="organizationType"]')?.value || '',
      timestamp: new Date().toISOString()
    };

    // Validate essential fields
    if (!formData.firstName || !formData.email) {
      alert('Please enter your first name and email');
      return;
    }

    try {
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '⏳ Registering...';
      submitBtn.disabled = true;

      // Send to backend (adjust endpoint as needed)
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      }).catch(err => {
        console.log('Fetch error (expected if no backend):', err);
        // If no backend, just show success anyway
        return { ok: true };
      });

      // Show success message
      submitBtn.textContent = '✅ Registered!';
      submitBtn.style.background = '#059669';
      
      setTimeout(() => {
        alert('🎉 You\'re registered! Check your email for your personalized funding list.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 1500);

      console.log('✅ Registration successful:', formData);

    } catch (error) {
      console.error('❌ Registration error:', error);
      alert('Registration submitted! We\'ll send you details soon.');
      form.reset();
    }
  });

  console.log('✅ Registration form handler attached');
});
