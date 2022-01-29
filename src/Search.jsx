const root = document.getElementById('root');
const modalRoot = document.getElementById('modal-root');

// nope, I don't use JSX
const e = React.createElement;

// update 1: as a lot of people are using JSX I decided to rewrite the modal using jsx

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null};
  }

  static getDerivedStateFromError(error) {
    return {error};
  }


  render() {
    return this.state.error
      ? <h1 className='display-3' style={{color: 'red'}}>Something went WRONG</h1>
      : this.props.children;
  }
}
// end ErrorBoundary


// the modal component
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {className: 'my-modal'};

    this.modalElm = document.createElement('div');

    // event binding
    this.handleClose = this.handleClose.bind(this);

  }

  componentDidMount() {

    // select all focusable elements in modalElm for the key trap
    const focusableElementsString = 'a[href], area[href], input:not([disable]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    let focusableElements = this.modalElm.querySelectorAll(focusableElementsString);
    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];

    this.modalElm.onclick = evt => {
      if (evt.target === this.modalElm) {
        this.handleClose();
      }
    }

    // this will not work unless you focus the modal or any of its children
    this.modalElm.onkeydown = evt => {
      if (evt.keyCode === 27) {
        this.handleClose();
      }

      // tabKey trap inside the modal
      if (evt.keyCode === 9) {
        // shift tab
        if (evt.shiftKey) {
          if (document.activeElement === firstTabStop) {
            evt.preventDefault();
            lastTabStop.focus(); 
          }
        } else {
          if (document.activeElement === lastTabStop) {
            evt.preventDefault();
            firstTabStop.focus();
          }
        }
      }
    }

    modalRoot.appendChild(this.modalElm);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.modalElm);
  }

  handleShow(evt) {
    // select the active dom element before showing the modal
    this.activeElement = document.activeElement;

    this.modalElm.style.display = 'flex';
    // to make the transition effect take place
    setTimeout(() => {
      this.setState({
        className: 'my-modal my-modal--show'
      });
    }, 15) // 15 is the minimum timeout value for a wide variety of browsers for the transitions to occur

    // to make the body unscrollable!
    document.body.style.overflow = 'hidden';

  }

  handleClose(evt) {
    this.setState({
      className: 'my-modal'
    });

    // display none the modal after making the animation and restore the default body style
    window.setTimeout(() => {
      this.modalElm.style.display = 'none';
      document.body.style.overflow = 'auto';
      // focus the last element that was active before showing the modal
      this.activeElement.focus();
    }, 450)

  }

  render() {
    this.modalElm.className = this.state.className;
    return ReactDOM.createPortal(
      <div className='my-modal__content'>
        {this.props.children} 
      </div>,
      this.modalElm
    )
  }
}
// end modal

const Form = props => {
  return (
    <form onSubmit={props.handleSubmit} className='modal-form'>
      <fieldset className='form-group' tabIndex='-1' ref={props.elmRef}>
        <legend className='sr-only'>Contact me modal</legend>
        <div className='form-group'>
          <label>
						Your name here
						<input type='text' className='form-control' />
					</label> 
        </div>
        <div className='form-group'>
          <label>
						Your email here
						<input type='email' className='form-control' />
					</label> 
        </div>
        <div className='form-group'>
          <label>
						Your message here
						<textarea rown='3' className='form-control'></textarea>
					</label> 
        </div>
        <button type='submit' className='btn btn-primary'>Send</button>
        <button type='button' className='btn btn-danger ml-3' onClick={props.handleClose}>Close</button>
      </fieldset>
    </form>
  )
}
// end form

const Welcome = props => {
  return (
    <div className='welcome-message'>
      <h3>Welcome to my Pen</h3> 
      <p>React modal that I think are suitable for nearly every use case. I considered every use case when creating it with putting web a11y and performance in mind.</p>
      <button className='btn btn-primary' onClick={props.handleClose} ref={props.elmRef}>Close Welcome</button>
    </div>
  )
}
// end welcome

class App extends React.Component {
  constructor(props) {
    super(props);
    this.modalForm = React.createRef();
    this.modalWelcome = React.createRef();
    this.formElmRef = React.createRef();
    this.welcomeElmRef = React.createRef();

    // events binding
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.handleWelcome = this.handleWelcome.bind(this);
		this.handleCloseWelcome = this.handleCloseWelcome.bind(this);
  }

	componentDidMount() {
		this.handleWelcome();		
	}
	
  handleClick(evt) {
    this.modalForm.current.handleShow();
    this.formElmRef.current.focus();
  }

  handleClose(evt) {
    this.modalForm.current.handleClose();
  }

  handleSubmit(evt) {
    evt.preventDefault();
    alert('Nothing would happen at the moment');
    this.modalForm.current.handleClose();
  }

	handleWelcome(evt) {
    this.modalWelcome.current.handleShow();
    this.welcomeElmRef.current.focus();
	}
	
	handleCloseWelcome(evt) {
    this.modalWelcome.current.handleClose();
	}
	
  render() {
    return (
      <div className='container'>
        <h1>Hello World</h1>
        <button className='btn btn-primary' onClick={this.handleClick}>Show Form</button>
        <button className='btn btn-secondary ml-3' onClick={this.handleWelcome}>Show Welcome</button>
        <ErrorBoundary>
          <Modal ref={this.modalForm}>
            <Form handleClose={this.handleClose} handleSubmit={this.handleSubmit} elmRef={this.formElmRef} />
          </Modal>
          <Modal ref={this.modalWelcome}>
            <Welcome elmRef={this.welcomeElmRef} handleClose={this.handleCloseWelcome} />
          </Modal>
        </ErrorBoundary>
      </div>
    )
  }
}

ReactDOM.render(e(App, null, null), document.getElementById('root'))