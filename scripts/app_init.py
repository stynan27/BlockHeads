import os
import time
from datetime import datetime
from pathlib import Path
import subprocess
from concurrent.futures import ThreadPoolExecutor

### GLOBAL SCOPED VARS
MAX_TERMINAL_LAUNCH_SECONDS = 5
MAX_CONSECUTIVE_FWRITES_SECONDS = 10
BLOCKHEADS_JAR_NAME = 'BlockHeads-0.0.1-SNAPSHOT.jar'
TMP_BACKEND_OUTPUT_FILE_NAME = 'app_init_backend_output.txt'
TMP_REACT_OUTPUT_FILE_NAME = 'app_init_react_output.txt'
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
    "RECORD_BACKEND_OUTPUT": [
        '|',
        'tee',
        '/tmp/' + TMP_BACKEND_OUTPUT_FILE_NAME + ';',
        "bash" # keep terminal open
    ],
    "RECORD_REACT_OUTPUT": [
        '|',
        'tee',
        '/tmp/' + TMP_REACT_OUTPUT_FILE_NAME + ';',
        "bash" # keep terminal open
    ],
    "DOCKER_PS": ['docker', 'ps'],
    "DOCKER_RUN_MYSQL": [
        'docker', 
        'run',
        '--detach',
        '--restart=always',
        '--env',
        'MYSQL_ROOT_PASSWORD=dummypassword',
        '--env',
        'MYSQL_USER=blockheads-developer',
        '--env',
        'MYSQL_PASSWORD=dummypassword',
        '--env',
        'MYSQL_DATABASE=blockheads-database',
        '--name',
        'blockheads-mysql',
        '--publish',
        '3306:3306',
        'mysql:8-oracle'
    ],
    "CLEAN_BACKEND_OUTPUT": ['rm','-f', TMP_BACKEND_OUTPUT_FILE_NAME],
    "CLEAN_REACT_OUTPUT": ['rm','-f', TMP_REACT_OUTPUT_FILE_NAME],
    "CLEAN_COMPILE": ['rm','-rf','target/'],
    "MAVEN_COMPILE": ['mvn','install','package'],
    "RUN_BACKEND_API": ["java", "-jar", "target/"+BLOCKHEADS_JAR_NAME],
    "NPM_INSTALL": ['npm', 'install'],
    "NPM_RUN_START": ['npm', 'run', 'start']
}

def setup():
    print('Running app setup\n')
    
    if not run_command_no_terminal(COMMANDS['CLEAN_BACKEND_OUTPUT'], '/tmp/'):
        return False
    
    if not run_command_no_terminal(COMMANDS['CLEAN_REACT_OUTPUT'], '/tmp/'):
        return False
    
    return True
    

# generic method to handle method returns on error vs output
def handle_result(cmd, cwd, cmd_success_msg=None, res=None):
    stdout = ''
    stderr = ''
    if res is not None:
        stdout = res.stdout
        stderr = res.stderr
    
    if len(stderr) > 0:
        if 'canberra-gtk-module' in stderr: # ignore, should still work properly
            print("Command: " + str(cmd) +  
                '\nDirectory: ' + cwd +
                '\nCommand started.\n'
            )
            return True
        print("Command: " + str(cmd) +  
            '\nDirectory: ' + cwd +
            '\nError: ' + stderr + '\n'
        )
        
        # https://github.com/ros2/ros2/issues/1406
        print('\nNOTE - If received the following error:')
        print(GLIBC_PRIVATE_ERROR)
        print('Run: "unset GTK_PATH" command first\n\n')
        return False
    else:
        if cmd_success_msg is not None and \
            cmd_success_msg not in stdout:
            print("Command: " + str(cmd) +  
                '\nDirectory: ' + cwd +
                '\nCOMMAND FAILED\n'
            )
            return False
        print("Command: " + str(cmd) +  
            '\nDirectory: ' + cwd +
            '\nCommand completed successfully!\n'
        )
        return True

    
# runs specified command (cmd) in the current working directory (cwd) on a new terminal
def run_command_in_terminal(cmd, cwd, cmd_success_msg):
    
    if SPRING_API_PATH in cwd:
        record_cmd = COMMANDS['RECORD_BACKEND_OUTPUT']
        filename = TMP_BACKEND_OUTPUT_FILE_NAME
    else:
        record_cmd = COMMANDS['RECORD_REACT_OUTPUT']
        filename = TMP_REACT_OUTPUT_FILE_NAME
    
    # Run the specified cmd in a new terminal 
    # and record the output in a /tmp/ file to check
    sub_cmd = " ".join(
        cmd + record_cmd
    )             
    cmd = COMMANDS['NEW_TERMINAL'] + [sub_cmd]    
    
    res = subprocess.run(cmd, \
        cwd=cwd, \
        capture_output=True, \
        text=True
    )
    if not handle_result(cmd, cwd, None, res):
        return False 
    
    # wait for terminal to open and begin stdout write
    time.sleep(MAX_TERMINAL_LAUNCH_SECONDS) 
    
    file = "/tmp/" + filename
    
    seconds_since_last_write = 0
    # continuously check file mod time until we are sure cmd output has been fully written
    while seconds_since_last_write <= MAX_CONSECUTIVE_FWRITES_SECONDS:
        try:
            mod_time = datetime.fromtimestamp(os.path.getmtime(file))
            current_time = datetime.now()
            seconds_since_last_write = int((current_time - mod_time).total_seconds())
        except FileNotFoundError:
            # File doesn't exist yet; wait and try again
            time.sleep(1) 
            
    # Now that file is fully written, read output to find cmd_success_msg
    with open(file, "r") as file:
        contents = file.read()
        if cmd_success_msg in contents:
            print("Command: " + str(cmd) +  
                  '\nDirectory: ' + cwd +
                  '\nCommand completed successfully!\n'
            )
            return True
        else:
            print("Command: " + str(cmd) +  
                '\nDirectory: ' + cwd +
                '\nFILE READ ERR!\n'
            )
            #print(contents)
            return False

# runs specified command (cmd) in the current working directory (cwd) - takes little time to complete
def run_command_no_terminal(cmd, cwd, cmd_success_msg=None):
    # runs command without creating a pipe for monitoring process
    res = subprocess.run(cmd, \
        cwd=cwd, \
        capture_output=True, \
        text=True
    )
    return handle_result(cmd, cwd, cmd_success_msg, res=res)

def run_and_populate_mysql():
    print('Running and populating MySQL database\n')
    
    run_mysql = True
    if run_command_no_terminal(COMMANDS['DOCKER_PS'], '.', 'mysql:8-oracle'):
        run_mysql = False
    
    if run_mysql:
        if not run_command_no_terminal(COMMANDS['DOCKER_RUN_MYSQL'], '.'):
            return False
    
        # Ensure MySQL is up after running
        if not run_command_no_terminal(COMMANDS['DOCKER_PS'], '.', 'mysql:8-oracle'):
            return False
     
    # TODO: Populate initial SQL
    
    
    return True

def build_and_run_backend():
    print('Building & running Java backend\n')
    
    if not run_command_no_terminal(COMMANDS['CLEAN_COMPILE'], SPRING_API_PATH):
        return False
    
    if not run_command_in_terminal(COMMANDS['MAVEN_COMPILE'], SPRING_API_PATH, 'BUILD SUCCESS'):
        return False

    if not run_command_in_terminal(COMMANDS['RUN_BACKEND_API'], SPRING_API_PATH, 'Tomcat started on port(s):'):
        return False
    
    return True

def run_react_client_with_install():
    print('Launching React client\n')

    if not run_command_in_terminal(COMMANDS['NPM_INSTALL'], REACT_CLIENT_PATH, 'up to date,'):
        return False

    if not run_command_in_terminal(COMMANDS['NPM_RUN_START'], REACT_CLIENT_PATH, 'Compiled successfully!'):
        return False
    
    return True


if __name__ == '__main__':
    
    if not setup():
        print('Setup failed.')
        raise SystemExit(1)
    
    
    # Threads are efficient for concurrent I/O based tasks (writing files)
    with ThreadPoolExecutor() as executor:
        run_mysql_future = executor.submit(run_and_populate_mysql)
        run_backend_future = executor.submit(build_and_run_backend)
        run_react_future = executor.submit(run_react_client_with_install)
    
    # blocking call - halts execution until result returns here
    mysql_valid_result = run_mysql_future.result() 
    if not mysql_valid_result:
        print('MySQL launch & populate task failed.\n')
        raise SystemExit(1)

    backend_valid_result = run_backend_future.result() 
    if not backend_valid_result:
        print('Java backend build & launch task failed.\n')
        raise SystemExit(1)
    
    react_valid_result = run_react_future.result() 
    if not react_valid_result:
        print('React client install & launch task failed.n')
        raise SystemExit(1)
    
    print('Blockheads is up and running!')