// Accordion enhancement script for Section 4
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var accordionEl = document.getElementById('section4Accordion');
    if (!accordionEl) return;

    // Remove extra SVG accordion icons
    var extraIcons = accordionEl.querySelectorAll('svg.acc-icon.ms-auto');
    extraIcons.forEach(function(icon) {
      icon.remove();
    });

    // When any collapse is shown, put focus on its controlling button (visual cue),
    // and remove any residual inline classes from other buttons.
    accordionEl.addEventListener('shown.bs.collapse', function (evt) {
      // evt.target is the collapse element; find the button that toggled it
      var collapseId = evt.target.id;
      var btn = accordionEl.querySelector('[data-bs-target="#' + collapseId + '"]');
      if (btn) {
        // move keyboard focus so the user sees the big header style
        btn.focus({ preventScroll: true });
      }
    });

    // When a collapse is hidden we don't need to do anything — CSS handles styling
    // because we use .accordion-button:not(.collapsed) selectors.
  });
}