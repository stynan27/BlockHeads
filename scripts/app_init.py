from pathlib import Path
import subprocess

### GLOBAL SCOPED VARS
SECONDS_BETWEEN_COMMANDS = 10
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
    "AND_IF": [
        '&&'
    ],
    "SLEEP": [
        'sleep',
        str(SECONDS_BETWEEN_COMMANDS)
    ],
    "NPM_INSTALL": [ 
        'npm',
        'install' 
    ],
    "NPM_RUN_START": [ 
        'npm',
        'run',
        'start'
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
    
    # use "; exec bash" to keep terminal open after install
    sub_cmd = " ".join(COMMANDS['NPM_INSTALL'] + ['; bash'] 
    cmd = COMMANDS['NEW_TERMINAL'] + [sub_cmd]
    
    return run_command(cmd, REACT_CLIENT_PATH)

def run_react_client():
    print('Launching Blockheads React client')
    
    sub_cmd = " ".join(COMMANDS['NPM_RUN_START']
    cmd = COMMANDS['NEW_TERMINAL'] + [sub_cmd]
    
    return run_command(cmd, REACT_CLIENT_PATH)

def run_react_client_with_install():
    print('Launching Blockheads React client')

    sub_cmd = " ".join(COMMANDS['NPM_INSTALL'] + \
        COMMANDS['AND_IF'] + \
            COMMANDS['SLEEP'] + \
                COMMANDS['AND_IF'] + \
                    COMMANDS['NPM_RUN_START'])
    cmd = COMMANDS['NEW_TERMINAL'] + [sub_cmd]
    
    return run_command(cmd, REACT_CLIENT_PATH)


# TODO: method to run java app

# TODO: method to run MySQL Docker image

# TODO: method to populate MySQL with init.sql data


if __name__ == '__main__':
    
    # TODO: CLI input for which commands to run?
    
    if not run_react_client_with_install():
        print('React client failed to launch.')
        raise SystemExit(1)
    
    print('Blockheads is up and running!')