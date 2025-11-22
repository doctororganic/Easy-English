// JavaScript to remove MiniMax notifications and branding

(function() {
    'use strict';
    
    // Function to remove MiniMax elements
    function removeMiniMaxElements() {
        // Remove elements containing MiniMax text
        const textSelectors = [
            '*[class*="minimax"]',
            '*[class*="notification"]',
            '*[class*="watermark"]',
            '*[class*="branding"]',
            '*[class*="attribution"]',
            'div[class*="absolute"]',
            'div[class*="fixed"]'
        ];
        
        // Remove by text content
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent && (
                node.textContent.includes('MiniMax') ||
                node.textContent.includes('Created by') ||
                node.textContent.includes('Made by')
            )) {
                textNodes.push(node.parentElement);
            }
        }
        
        // Remove found elements
        textNodes.forEach(element => {
            element.remove();
            element.style.display = 'none';
        });
        
        // Remove overlay elements
        textSelectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    if (el.textContent && (
                        el.textContent.includes('MiniMax') ||
                        el.textContent.includes('Created by') ||
                        el.textContent.includes('Made by')
                    )) {
                        el.remove();
                    }
                });
            } catch (e) {
                // Ignore selector errors
            }
        });
    }
    
    // Remove immediately
    removeMiniMaxElements();
    
    // Monitor for new elements (if notifications are dynamically added)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    if (node.textContent && (
                        node.textContent.includes('MiniMax') ||
                        node.textContent.includes('Created by') ||
                        node.textContent.includes('Made by')
                    )) {
                        node.remove();
                    }
                }
            });
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Run periodically to catch any missed elements
    setInterval(removeMiniMaxElements, 1000);
    
})();