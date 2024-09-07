from pathlib import Path
import subprocess

### GLOBAL SCOPED VARS
GLIBC_PRIVATE_ERROR = 'error: /snap/core20/current/lib/x86_64-linux-gnu/libpthread.so.0: \
    undefined symbol: __libc_pthread_init, version GLIBC_PRIVATE'

# PATHS
PROJECT_ROOT = Path(__file__).absolute().parent.parent # Blockheads project root
REACT_CLIENT_PATH = str(PROJECT_ROOT / 'react_client')
SPRING_API_PATH = str(PROJECT_ROOT / 'spring_API')

# COMMANDS
NPM_RUN_START = [ 
    'gnome-terminal', # Launches new gnome-terminal for output logging
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
        if 'canberra-gtk-module' in res.stderr: # ignore, should still work properly
            print('')
            return True
        print("Error: " + res.stderr)
        return False
    else:
        print("Message: " + res.stdout)
        return True


# TODO: method to run react app
def run_react_client():
    print('Launching Blockheads React client')
    res = subprocess.run(NPM_RUN_START, \
            cwd=REACT_CLIENT_PATH, \
            capture_output=True, \
            text=True
        )
    return handle_result(NPM_RUN_START, REACT_CLIENT_PATH, res)


# TODO: method to run java app

# TODO: method to run MySQL Docker image

# TODO: method to populate MySQL with init.sql data

if __name__ == '__main__':
    # https://github.com/ros2/ros2/issues/1406
    print('NOTE - If received the following error:')
    print(GLIBC_PRIVATE_ERROR)
    print('Run: "unset GTK_PATH" command first\n\n')
    
    if not run_react_client():
        print('React client failed to launch.')
        exit(-1)
    print('Blockheads is up and running!')