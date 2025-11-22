/**
 * Debug Utilities for Kuwait English Hub
 * Comprehensive debugging for navigation and event tracking
 */

// Global event tracking
let globalEventLog = [];
let debugMode = true;

// Initialize global click event listeners
export function initializeGlobalEventTracking() {
  if (!debugMode) return;
  
  // Global click event listener with event path tracing
  document.addEventListener('click', (e) => {
    const eventInfo = {
      timestamp: new Date().toISOString(),
      target: {
        tagName: e.target.tagName,
        textContent: e.target.textContent?.slice(0, 50) || '',
        className: e.target.className || '',
        id: e.target.id || '',
        onClick: !!e.target.onclick,
        dataAttributes: getDataAttributes(e.target)
      },
      path: e.composedPath().slice(0, 10).map(el => ({
        tagName: el.tagName || 'UNKNOWN',
        id: el.id || '',
        className: el.className || ''
      })),
      isTrusted: e.isTrusted,
      type: e.type
    };
    
    globalEventLog.push(eventInfo);
    if (globalEventLog.length > 100) globalEventLog.shift();
    
    console.log('🔍 CLICK EVENT:', {
      target: `${eventInfo.target.tagName}${eventInfo.target.id ? `#${eventInfo.target.id}` : ''}`,
      text: eventInfo.target.textContent,
      classes: eventInfo.target.className,
      hasOnClick: eventInfo.target.onClick,
      dataAttrs: eventInfo.target.dataAttributes,
      pathLength: eventInfo.path.length,
      path: eventInfo.path.slice(0, 5).map(el => `${el.tagName}${el.id ? `#${el.id}` : ''}`).join(' → ')
    });
  }, true); // Use capture phase

  // Global error tracking
  window.addEventListener('error', (e) => {
    console.error('🚨 GLOBAL ERROR:', {
      message: e.message,
      filename: e.filename,
      line: e.lineno,
      column: e.colno,
      error: e.error
    });
  });

  // Global unhandled promise rejection tracking
  window.addEventListener('unhandledrejection', (e) => {
    console.error('🚨 UNHANDLED PROMISE REJECTION:', {
      reason: e.reason,
      promise: e.promise
    });
  });
}

// Helper function to extract data attributes
function getDataAttributes(element) {
  const attrs = {};
  Array.from(element.attributes).forEach(attr => {
    if (attr.name.startsWith('data-')) {
      attrs[attr.name] = attr.value;
    }
  });
  return attrs;
}

// Navigation audit function
export function auditNavigation() {
  const elements = document.querySelectorAll('button, a[href], [role="button"], [data-testid], [data-practice-start]');
  
  const auditResults = Array.from(elements).map(el => {
    const computedStyle = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    
    return {
      tagName: el.tagName,
      text: el.textContent?.trim().slice(0, 30) || '',
      id: el.id || '',
      className: el.className || '',
      hasClick: !!el.onclick || el.hasAttribute('data-practice-start') || el.hasAttribute('data-testid'),
      isVisible: rect.width > 0 && rect.height > 0,
      pointerEvents: computedStyle.pointerEvents,
      position: computedStyle.position,
      zIndex: computedStyle.zIndex,
      display: computedStyle.display,
      opacity: computedStyle.opacity,
      hasEventListener: getEventListeners(el).length > 0,
      dataAttributes: getDataAttributes(el),
      boundingRect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      }
    };
  });
  
  console.table(auditResults);
  return auditResults;
}

// Get event listeners for an element
function getEventListeners(element) {
  const listeners = [];
  const events = ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend'];
  
  events.forEach(event => {
    const handler = element[`on${event}`];
    if (typeof handler === 'function') {
      listeners.push({ event, type: 'inline', handler: handler.toString().slice(0, 100) });
    }
  });
  
  // Check for React synthetic event handlers
  const reactEvents = ['_reactInternalEvent', '_reactProps'];
  reactEvents.forEach(prop => {
    if (element[prop]) {
      listeners.push({ event: 'react', type: 'react', value: 'React synthetic event' });
    }
  });
  
  return listeners;
}

// State logger for React hooks
export function createStateLogger(componentName) {
  const logger = {
    componentName,
    logs: [],
    
    logState(name, value, source = 'unknown') {
      const logEntry = {
        timestamp: new Date().toISOString(),
        component: componentName,
        stateName: name,
        value: typeof value === 'object' ? JSON.stringify(value) : value,
        source,
        type: typeof value
      };
      
      this.logs.push(logEntry);
      if (this.logs.length > 50) this.logs.shift();
      
      console.log(`📊 [${componentName}] State: ${name} =`, value, `(${source})`);
      return logEntry;
    },
    
    logRender(reason = 'unknown') {
      console.log(`🎨 [${componentName}] Render: ${reason}`);
    },
    
    logEvent(eventName, data = {}) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        component: componentName,
        eventName,
        data
      };
      
      this.logs.push(logEntry);
      if (this.logs.length > 50) this.logs.shift();
      
      console.log(`⚡ [${componentName}] Event: ${eventName}`, data);
      return logEntry;
    },
    
    getLogs(filter = {}) {
      let filteredLogs = this.logs;
      
      if (filter.type) {
        filteredLogs = filteredLogs.filter(log => log.stateName === filter.type);
      }
      
      if (filter.component) {
        filteredLogs = filteredLogs.filter(log => log.component === filter.component);
      }
      
      return filteredLogs;
    },
    
    clearLogs() {
      this.logs = [];
    }
  };
  
  return logger;
}

// Test click events on specific elements
export function testClickEvents() {
  console.log('🧪 Testing click events on all interactive elements...');
  
  const elements = document.querySelectorAll('button, a[href], [role="button"], [data-practice-start], [data-testid]');
  const results = [];
  
  elements.forEach((el, index) => {
    try {
      // Check if element is clickable
      const rect = el.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(el);
      const isVisible = rect.width > 0 && rect.height > 0;
      const isClickable = computedStyle.pointerEvents !== 'none';
      
      // Create a test click event
      const testEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      
      // Attempt to click the element
      let clickSuccess = false;
      let error = null;
      
      try {
        const result = el.dispatchEvent(testEvent);
        clickSuccess = result !== false;
      } catch (e) {
        error = e.message;
      }
      
      results.push({
        index,
        tagName: el.tagName,
        text: el.textContent?.trim().slice(0, 30) || '',
        id: el.id || '',
        isVisible,
        isClickable,
        hasEventListeners: getEventListeners(el).length > 0,
        clickSuccess,
        error,
        computedPointerEvents: computedStyle.pointerEvents
      });
      
    } catch (e) {
      results.push({
        index,
        tagName: el.tagName,
        error: e.message,
        failed: true
      });
    }
  });
  
  console.table(results);
  return results;
}

// Check for overlays that might block clicks
export function checkForOverlays() {
  console.log('🔍 Checking for click-blocking overlays...');
  
  const overlays = [];
  
  // Find elements that might block clicks
  const potentialOverlays = document.querySelectorAll('*');
  
  potentialOverlays.forEach(el => {
    const rect = el.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(el);
    
    // Check for blocking characteristics
    const isBlocking = (
      rect.width > 100 && rect.height > 100 && // Large element
      rect.top < window.innerHeight && rect.left < window.innerWidth && // Visible
      (computedStyle.position === 'fixed' || computedStyle.position === 'absolute') && // Overlay positioning
      computedStyle.pointerEvents === 'auto' && // Blocks clicks
      computedStyle.backgroundColor !== 'rgba(0, 0, 0, 0)' && // Has background
      !el.matches('html, body, #root, main, nav, header, footer') // Not core layout
    );
    
    if (isBlocking) {
      overlays.push({
        tagName: el.tagName,
        id: el.id || '',
        className: el.className || '',
        position: computedStyle.position,
        zIndex: computedStyle.zIndex,
        pointerEvents: computedStyle.pointerEvents,
        backgroundColor: computedStyle.backgroundColor,
        opacity: computedStyle.opacity,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        left: rect.left
      });
    }
  });
  
  console.log('🚧 Found potential click-blocking overlays:', overlays);
  return overlays;
}

// Comprehensive DOM state check
export function checkDOMState() {
  console.log('🏗️ Checking DOM state...');
  
  const state = {
    url: window.location.href,
    pathname: window.location.pathname,
    hash: window.location.hash,
    userAgent: navigator.userAgent,
    documentReadyState: document.readyState,
    bodyChildren: document.body.children.length,
    rootElement: document.getElementById('root') ? 'Found' : 'Missing',
    bodyComputedStyle: {
      pointerEvents: window.getComputedStyle(document.body).pointerEvents,
      overflow: window.getComputedStyle(document.body).overflow,
      position: window.getComputedStyle(document.body).position
    }
  };
  
  console.log('📋 DOM State:', state);
  return state;
}

// Generate debugging report
export function generateDebuggingReport() {
  const report = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    pathname: window.location.pathname,
    navigationAudit: auditNavigation(),
    eventLog: globalEventLog.slice(-20), // Last 20 events
    clickTestResults: testClickEvents(),
    overlayCheck: checkForOverlays(),
    domState: checkDOMState(),
    recentLogs: globalEventLog.slice(-10) // Last 10 click events
  };
  
  console.log('📄 DEBUGGING REPORT GENERATED:', report);
  return report;
}

// Initialize debugging when script loads
if (typeof window !== 'undefined') {
  initializeGlobalEventTracking();
  
  // Make functions available globally for manual testing
  window.debugUtils = {
    auditNavigation,
    generateDebuggingReport,
    testClickEvents,
    checkForOverlays,
    checkDOMState,
    createStateLogger,
    globalEventLog: () => globalEventLog
  };
  
  console.log('🔧 Debug utilities initialized. Available functions:', Object.keys(window.debugUtils));
}