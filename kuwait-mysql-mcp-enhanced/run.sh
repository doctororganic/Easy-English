#!/bin/sh
# Kuwait English Learning Platform - MySQL MCP Server (Enhanced) - STDIO mode startup script
set -e

# Change to script directory
cd "$(dirname "$0")"

# Create independent virtual environment (if it doesn't exist)
if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..." >&2
    uv venv
    echo "Installing dependencies..." >&2
    echo "Note: Dependency installation may take several minutes. Please wait..." >&2
    uv sync
fi

# Check necessary environment variables
if [[ -z "$MYSQL_USER" ]] || [[ -z "$MYSQL_PASSWORD" ]] || [[ -z "$MYSQL_DATABASE" ]]; then
    echo "Warning: MySQL environment variables not fully set" >&2
    echo "Required variables: MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE" >&2
    echo "You can also pass these as parameters to the tools" >&2
fi

# Start STDIO mode MCP server
echo "Starting Kuwait MySQL Enhanced MCP Server..." >&2
uv run python server.py
