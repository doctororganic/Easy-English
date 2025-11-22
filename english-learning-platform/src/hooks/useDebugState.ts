/**
 * Custom hook for state debugging and logging
 */

import { useState, useEffect, useRef } from 'react';

// Logger for state changes
function createStateLogger(componentName) {
  const logs = [];
  
  return {
    logState(name, value, source = 'unknown') {
      const logEntry = {
        timestamp: new Date().toISOString(),
        component: componentName,
        stateName: name,
        value: typeof value === 'object' ? JSON.stringify(value) : String(value),
        source,
        type: typeof value
      };
      
      logs.push(logEntry);
      if (logs.length > 100) logs.shift();
      
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
      
      logs.push(logEntry);
      if (logs.length > 100) logs.shift();
      
      console.log(`⚡ [${componentName}] Event: ${eventName}`, data);
      return logEntry;
    },
    
    getLogs() {
      return [...logs];
    },
    
    clearLogs() {
      logs.length = 0;
    }
  };
}

// Custom hook for logging useState
export function useDebugState<T>(initialValue: T, componentName: string, stateName: string): [T, (value: T | ((prev: T) => T), source?: string) => void] {
  const [state, setState] = useState<T>(initialValue);
  const loggerRef = useRef<any>(null);
  
  if (!loggerRef.current) {
    loggerRef.current = createStateLogger(componentName);
  }
  
  const logger = loggerRef.current;
  
  // Log initial state
  useEffect(() => {
    logger.logState(stateName, state, 'initial');
  }, []);
  
  // Enhanced setState that logs changes
  const setDebugState = (newValue: T | ((prev: T) => T), source = 'setState') => {
    const oldValue = state;
    
    // Allow both function updates and direct values
    const actualNewValue = typeof newValue === 'function' ? (newValue as (prev: T) => T)(state) : newValue;
    
    setState(actualNewValue);
    logger.logState(stateName, { oldValue, newValue: actualNewValue }, source);
  };
  
  return [state, setDebugState];
}

// Hook for debugging component lifecycle
export function useDebugLifecycle(componentName) {
  const loggerRef = useRef(null);
  
  if (!loggerRef.current) {
    loggerRef.current = createStateLogger(componentName);
  }
  
  const logger = loggerRef.current;
  
  useEffect(() => {
    logger.logEvent('mount');
    return () => logger.logEvent('unmount');
  }, []);
  
  useEffect(() => {
    logger.logRender('re-render');
  });
  
  return logger;
}

// Hook for debugging event handlers
export function useDebugEventHandler(handler, componentName, eventName) {
  const loggerRef = useRef(null);
  
  if (!loggerRef.current) {
    loggerRef.current = createStateLogger(componentName);
  }
  
  const logger = loggerRef.current;
  
  const debugHandler = (...args) => {
    logger.logEvent(`click:${eventName}`, { args, timestamp: new Date().toISOString() });
    
    try {
      const result = handler?.(...args);
      logger.logEvent(`success:${eventName}`, { result });
      return result;
    } catch (error) {
      logger.logEvent(`error:${eventName}`, { error: error.message, stack: error.stack });
      throw error;
    }
  };
  
  return debugHandler;
}

// Hook for debugging navigation
export function useDebugNavigation(navigate, componentName) {
  const loggerRef = useRef(null);
  
  if (!loggerRef.current) {
    loggerRef.current = createStateLogger(componentName);
  }
  
  const logger = loggerRef.current;
  
  const debugNavigate = (to, options = {}) => {
    logger.logEvent('navigate', { to, options });
    
    try {
      navigate(to, options);
      logger.logEvent('navigate:success', { to });
    } catch (error) {
      logger.logEvent('navigate:error', { to, error: error.message });
    }
  };
  
  return debugNavigate;
}

export default {
  useDebugState,
  useDebugLifecycle,
  useDebugEventHandler,
  useDebugNavigation,
  createStateLogger
};