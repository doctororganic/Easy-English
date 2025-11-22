#!/usr/bin/env python3
"""
Kuwait English Learning Platform - MySQL MCP Server (Enhanced)
Simple direct execution version for testing
"""

import os
import sys

# Add current directory to Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from server import mcp
    
    if __name__ == "__main__":
        mcp.run()
        
except ImportError as e:
    print(f"Error importing server: {e}")
    print("Required dependencies:")
    print("- fastmcp")
    print("- mysql-connector-python")
    print("- pymysql")
    sys.exit(1)
except Exception as e:
    print(f"Error running server: {e}")
    sys.exit(1)
