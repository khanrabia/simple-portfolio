// Helper: activate one tab button and content, deactivate siblings within the container
function activateTab(buttonsContainer, tabId) {
  const buttons = buttonsContainer.querySelectorAll('.tab-btn');
  buttons.forEach(btn => {
    const isActive = btn.dataset.tab === tabId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');

    // Find the related content panel scoped within the parent container of buttonsContainer
    const container = buttonsContainer.closest('.tabs, .nested-tabs');
    if (!container) return;

    const content = container.querySelector(`#${tabId}`);
    if (content) {
      // Deactivate all contents first
      container.querySelectorAll('.tab-content').forEach(tc => {
        tc.classList.remove('active');
        tc.setAttribute('hidden', 'true');
      });
      // Activate the selected content
      content.classList.add('active');
      content.removeAttribute('hidden');
    }
  });
}

// Main tabs
document.querySelectorAll('.tabs .tab-buttons').forEach(tabButtonsContainer => {
  tabButtonsContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('tab-btn')) return;

    const tabId = e.target.dataset.tab;
    activateTab(tabButtonsContainer, tabId);

    // When switching main tabs, also reset nested tabs inside the newly active tab
    const container = tabButtonsContainer.closest('.tabs');
    const activeTabContent = container.querySelector(`#${tabId}`);
    if (activeTabContent) {
      activeTabContent.querySelectorAll('.nested-tabs').forEach(nestedTabs => {
        const nestedButtons = nestedTabs.querySelector('.tab-buttons');
        if (nestedButtons) {
          // Activate first nested tab by default
          const firstNestedBtn = nestedButtons.querySelector('.tab-btn');
          if (firstNestedBtn) {
            activateTab(nestedButtons, firstNestedBtn.dataset.tab);
          }
        }
      });
    }
  });
});

// Nested tabs (delegated inside each nested-tabs container)
document.querySelectorAll('.nested-tabs .tab-buttons').forEach(nestedButtonsContainer => {
  nestedButtonsContainer.addEventListener('click', e => {
    if (!e.target.classList.contains('tab-btn')) return;

    const tabId = e.target.dataset.tab;
    activateTab(nestedButtonsContainer, tabId);
  });

  // On load, activate the first nested tab by default
  const firstBtn = nestedButtonsContainer.querySelector('.tab-btn');
  if (firstBtn) {
    activateTab(nestedButtonsContainer, firstBtn.dataset.tab);
  }
});

// On page load, activate the first main tab and its nested tabs
window.addEventListener('DOMContentLoaded', () => {
  const mainTabs = document.querySelector('.tabs .tab-buttons');
  if (mainTabs) {
    const firstMainBtn = mainTabs.querySelector('.tab-btn');
    if (firstMainBtn) {
      activateTab(mainTabs, firstMainBtn.dataset.tab);
    }
  }
});
document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const items = carousel.querySelectorAll('.carousel-item');
  const prevBtn = carousel.querySelector('.carousel-btn.prev');
  const nextBtn = carousel.querySelector('.carousel-btn.next');

  let currentIndex = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? items.length - 1 : currentIndex - 1;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === items.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  });
});
const tabButtons = document.querySelectorAll('#certifications .tab-btn');
const tabContents = document.querySelectorAll('#certifications .tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

