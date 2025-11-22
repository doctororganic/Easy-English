import subprocess
import os

os.chdir('/workspace/english-learning-platform')

print("Installing dependencies...")
result = subprocess.run(['pnpm', 'install', '--prefer-offline'], capture_output=True, text=True)
print(f"Install exit code: {result.returncode}")
if result.stdout:
    print(f"Install stdout: {result.stdout[:500]}")
if result.stderr:
    print(f"Install stderr: {result.stderr[:500]}")

print("\nBuilding project...")
result = subprocess.run(['pnpm', 'run', 'build'], capture_output=True, text=True, timeout=300)
print(f"Build exit code: {result.returncode}")
if result.stdout:
    print(f"Build stdout (last 1000 chars):\n{result.stdout[-1000:]}")
if result.stderr:
    print(f"Build stderr (last 1000 chars):\n{result.stderr[-1000:]}")

# Check if dist exists
print("\nChecking dist folder...")
if os.path.exists('dist'):
    files = subprocess.run(['find', 'dist', '-type', 'f'], capture_output=True, text=True)
    print(f"Files in dist: {len(files.stdout.splitlines())}")
    print(files.stdout.splitlines()[:10])
else:
    print("No dist folder found!")
