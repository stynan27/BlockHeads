from pathlib import Path
import subprocess

# PATHS
PROJECT_ROOT = Path(__file__).absolute().parent.parent # Blockheads project root
REACT_CLIENT_PATH = str(PROJECT_ROOT / 'react_client')
SPRING_API_PATH = str(PROJECT_ROOT / 'spring_API')

# COMMANDS
NPM_RUN_START = [ # Not working in VSCode Terminal - https://github.com/ros2/ros2/issues/1406
    'gnome-terminal', 
    '--', 
    'bash', 
    '-c', 
    'npm run start'
    ] 

def handle_result(cmd, cwd, res):
    cmd_str = str(cmd)
    
    print("Ran command: " + cmd_str)
    print("Directory: " + cwd)
    
    if len(res.stderr) > 0:
        print("Error: " + res.stderr)
        return False
    else:

        print("Message: " + res.stdout)
        return True


# TODO: Separate process for each?

# TODO: method to run react app
def run_react_client():
    res = subprocess.run(NPM_RUN_START, \
            cwd=REACT_CLIENT_PATH, \
            capture_output=True, \
            text=True
        )
    return handle_result(NPM_RUN_START, REACT_CLIENT_PATH, res)


# TODO: method to run java app

# TODO: method to run MySQL Docker image

# TODO: method to populate MySQL with init.sql data

run_react_client()