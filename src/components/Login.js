import axios from 'axios';
import React, { PureComponent } from 'react'

class Login extends PureComponent {
  constructor(props) {
    super(props)
  
    this.state = {
      email: '',
      password: ''
    }

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }
  onPasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:3001/login', this.state)
    .then( (response)=> {
      console.log(response)
      if(response.data.status) {
        document.cookie = "token="+response.data.sessionid;
        window.document.location = '/'
      }else if(response.data.status === false){
        alert(response.data.message)
      }else{
        alert('something went wrong...!')
      }
    }).catch((err)=>{
      console.log(err)
      alert(err.message)
    })
  }

  render() {
    return (
      <>
      <div className="bg-gray-200">
          <main className="main-content mt-0 ps">
              <div className="page-header align-items-start min-vh-100"
              style={{backgroundImage: 'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80&#39)'}}>
                  <span className="mask bg-gradient-dark opacity-6"></span>
                  <div className="container my-auto">
                      <div className="row">
                          <div className="col-lg-4 col-md-8 col-12 mx-auto">
                              <div className="card z-index-0 fadeIn3 fadeInBottom">
                                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                      <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                          <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                                      </div>
                                  </div>
                                  <div className="card-body">
                                      <form onSubmit={this.onSubmit} method="POST" className="text-start">
                                          <div className="input-group input-group-outline my-3">
                                              <label className="form-label">Email</label>
                                              <input value={this.state.email} onChange={this.onEmailChange} type="email" name="email" className="form-control" required/>
                                          </div>
                                          <div className="input-group input-group-outline mb-3">
                                              <label className="form-label">Password</label>
                                              <input value={this.state.password} onChange={this.onPasswordChange} type="password" name="password" className="form-control" required/>
                                          </div>
                                          <div className="text-center">
                                              <button type="submit" className="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button>
                                          </div>
                                      </form>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="ps__rail-x" style={{left: '0px', bottom: '0px'}}>
                  <div className="ps__thumb-x" tabIndex={0} style={{left: '0px', width: '0px'}}></div>
              </div>
              <div className="ps__rail-y" style={{top: '0px', right: '0px'}}>
                  <div className="ps__thumb-y" tabIndex={0} style={{top: '0px', height: '0px'}}></div>
              </div>
          </main>
          <script async="" defer="" src="https://buttons.github.io/buttons.js"></script>
          </div>

      </>
    )
  }
}

export default Login