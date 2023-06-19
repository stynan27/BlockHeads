import './style.css';

export function WelcomeComponent() {
  return (
    <div className="Welcome">
        <header className="Welcome-header">
            {/*}<img src={logo} className="App-logo" alt="logo" />*/}
            <h1 className='lego-regular'>BlockHeads App - LEGO style</h1>
            <p className='lego-regular'>
            LEGO<span className='test-with-@'>@</span>.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
            Learn React
            </a>
        </header>
    </div>
  );
}

export default WelcomeComponent;
