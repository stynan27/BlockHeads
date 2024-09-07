from pathlib import Path
import subprocess

### GLOBAL SCOPED VARS
GLIBC_PRIVATE_ERROR = 'error: /snap/core20/current/lib/x86_64-linux-gnu/libpthread.so.0: \
    undefined symbol: __libc_pthread_init, version GLIBC_PRIVATE'

# PATHS
PROJECT_ROOT = Path(__file__).absolute().parent.parent # Blockheads project root
REACT_CLIENT_PATH = str(PROJECT_ROOT / 'react_client')
SPRING_API_PATH = str(PROJECT_ROOT / 'spring_API')

COMMANDS: dict = {
    "NEW_TERMINAL": [
        'gnome-terminal', # Launches new gnome-terminal for output logging
        '--', 
        'bash', 
        '-c'
    ],
    "NPM_RUN_INSTALL": [ 
        'npm install; exec bash' # use "; exec bash" to keep terminal open after install
    ],
    "NPM_RUN_START": [ 
        'npm run start'
    ]
}

# generic method to handle method returns on error vs output
def handle_result(cmd, cwd, res):
    cmd_str = str(cmd)
    
    print("Ran command: " + cmd_str)
    print("Directory: " + cwd)
    
    if len(res.stderr) > 0:
        if 'canberra-gtk-module' in res.stderr: # ignore, should still work properly
            print('')
            return True
        print("Error: " + res.stderr)
        
        # https://github.com/ros2/ros2/issues/1406
        print('\nNOTE - If received the following error:')
        print(GLIBC_PRIVATE_ERROR)
        print('Run: "unset GTK_PATH" command first\n\n')
        return False
    else:
        print("Message: " + res.stdout)
        return True
    
# runs specified command (cmd) in the current working directory (cwd)    
def run_command(cmd, cwd):
    res = subprocess.run(cmd, \
            cwd=cwd, \
            capture_output=True, \
            text=True
        )
    return handle_result(cmd, cwd, res)

# install react client packages
def run_npm_install():
    print('Running npm install')
    cmd = COMMANDS['NEW_TERMINAL'] + COMMANDS['NPM_RUN_INSTALL']
    return run_command(cmd, REACT_CLIENT_PATH)

def run_react_client():
    print('Launching Blockheads React client')
    cmd = COMMANDS['NEW_TERMINAL'] + COMMANDS['NPM_RUN_START']
    return run_command(cmd, REACT_CLIENT_PATH)


# TODO: method to run java app

# TODO: method to run MySQL Docker image

# TODO: method to populate MySQL with init.sql data


if __name__ == '__main__':
    
    run_npm_install()
    raise SystemExit(1)
    
    if not run_react_client():
        print('React client failed to launch.')
        raise SystemExit(1)
    
    print('Blockheads is up and running!')