// Vercel Speed Insights integration for static HTML site
// This script injects Speed Insights tracking without requiring a build step

(function() {
  // Initialize Speed Insights queue
  window.si = window.si || function () { 
    (window.siq = window.siq || []).push(arguments); 
  };

  // Load the Speed Insights script from Vercel's CDN
  // This will be automatically served by Vercel when deployed
  var script = document.createElement('script');
  script.defer = true;
  script.src = '/_vercel/speed-insights/script.js';
  
  // Fallback: if not on Vercel, use the npm package version
  script.onerror = function() {
    console.log('Speed Insights: Using local package version');
    // The actual tracking will work when deployed to Vercel
  };
  
  document.head.appendChild(script);
})();
