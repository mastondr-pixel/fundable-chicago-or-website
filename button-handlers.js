// ============================================================================
// BUTTON EVENT HANDLERS - MASTER CODER FIX
// ============================================================================

function attachButtonHandlers() {
  console.log('🔧 Attaching button handlers...');
  
  // Registration popup element
  const registrationPopup = document.getElementById('registration-popup');
  console.log('Registration popup found:', !!registrationPopup);
  
  // All register buttons
  const registerButtons = [
    'nav-register-btn',
    'hero-register-btn',
    'cta-register-btn',
    'coaching-register-btn'
  ];
  
  // Add click handlers to all register buttons
  registerButtons.forEach(btnId => {
    const btn = document.getElementById(btnId);
    if (btn) {
      console.log('✅ Attached handler to:', btnId);
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('📋 Register button clicked:', btnId);
        if (registrationPopup) {
          registrationPopup.classList.add('active');
          console.log('✅ Popup opened');
        }
      });
    } else {
      console.log('❌ Button not found:', btnId);
    }
  });
  
  // Popup close button
  const popupClose = document.getElementById('popup-close');
  if (popupClose) {
    console.log('✅ Attached handler to popup close');
    popupClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (registrationPopup) {
        registrationPopup.classList.remove('active');
        console.log('✅ Popup closed');
      }
    });
  }
  
  // Popup register button - scroll to form
  const popupRegisterBtn = document.getElementById('popup-register-btn');
  if (popupRegisterBtn) {
    console.log('✅ Attached handler to popup register button');
    popupRegisterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (registrationPopup) {
        registrationPopup.classList.remove('active');
      }
      const registrationForm = document.getElementById('registration-form');
      if (registrationForm) {
        registrationForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const firstInput = registrationForm.querySelector('input');
        if (firstInput) {
          setTimeout(() => firstInput.focus(), 500);
        }
      }
    });
  }
  
  // Chat widget handlers
  const chatToggle = document.getElementById('chat-toggle');
  const chatWidget = document.getElementById('chat-widget');
  const chatClose = document.getElementById('chat-close');
  
  if (chatToggle && chatWidget) {
    console.log('✅ Attached handlers to chat widget');
    chatToggle.addEventListener('click', () => {
      chatWidget.classList.add('active');
      chatToggle.classList.add('hidden');
      const chatInput = document.getElementById('chat-input');
      if (chatInput) {
        setTimeout(() => chatInput.focus(), 300);
      }
    });
  }
  
  if (chatClose && chatWidget) {
    chatClose.addEventListener('click', () => {
      chatWidget.classList.remove('active');
      if (chatToggle) {
        chatToggle.classList.remove('hidden');
      }
    });
  }
  
  // Funding tools popup close
  const fundingToolsPopup = document.getElementById('funding-tools-popup');
  const fundingCloseButtons = document.querySelectorAll('#funding-tools-popup .popup-close');
  if (fundingCloseButtons.length > 0) {
    console.log('✅ Attached handlers to funding popup close buttons');
    fundingCloseButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (fundingToolsPopup) {
          fundingToolsPopup.classList.remove('active');
        }
      });
    });
  }
  
  // Fix all buttons with inline onclick handlers
  const inlineButtons = document.querySelectorAll('[onclick]');
  console.log('Found inline onclick buttons:', inlineButtons.length);
  inlineButtons.forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick');
    if (onclickAttr && onclickAttr.includes('registration-popup')) {
      btn.removeAttribute('onclick');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (registrationPopup) {
          registrationPopup.classList.add('active');
        }
      });
    }
  });
  
  console.log('✅ All button handlers attached successfully!');
}

// Attach on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachButtonHandlers);
} else {
  // If DOM is already loaded, attach immediately
  attachButtonHandlers();
}

// Also attach on window load for safety
window.addEventListener('load', attachButtonHandlers);
