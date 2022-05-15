import axios from 'axios'
import React, { PureComponent } from 'react'
import '../assets/css/styles.css'
import Sidebar from './Sidebar'
import { getCookie, getFromStorage, setInStorage } from '../utils/storage'
import StudentItem from './StudentItem'
import SortIcon from './SortIcon'
// var logo_ct_png = require('../assets/img/logo-ct.png')
// import Sidebar from './Sidebar'
class Home extends PureComponent {

    constructor(props) {
        super(props)

        this.order = getFromStorage('order');
        this.attr = getFromStorage('attr');
        this.sclass = getFromStorage('class');
        this.sdiv = getFromStorage('div');
        this.orderList = ['asc', 'desc', ]
        this.attrList = ['rollno', 'name', 'email', ]
        this.classList = ['FY', 'SY', 'TY', 'BE', ]
    
        this.state = {
            students: [],
            b_students: [],
            searched: false,
            s_class: (this.classList.includes(this.sclass))? this.sclass: 'BE',
            s_div: (this.sdiv && this.sdiv !== "")? this.sdiv: 'B',
            sortOrder: (this.orderList.includes(this.order))? this.order: 'asc',
            sortAttribute: (this.attrList.includes(this.attr))? this.attr: 'rollno',
            searchText: '',
            searchRegex: new RegExp("(.*)(.*)", 'i'),
        }
        this.updateStudentList = this.updateStudentList.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.onChangeSortOrderAttribute = this.onChangeSortOrderAttribute.bind(this);
        this.onClickRollNoSort = this.onClickRollNoSort.bind(this);
        this.onClickNameSort = this.onClickNameSort.bind(this);
        this.onClickEmailSort = this.onClickEmailSort.bind(this);
        this.sortStudentData = this.sortStudentData.bind(this);
        this.onChangeSearchText = this.onChangeSearchText.bind(this);
    }

    onChangeSearchText(e) {
        const regex = /[^a-z0-9@.]/gi;
        this.setState((prevState) => ({
            students: (prevState.searchText.length > e.target.value.length)? prevState.b_students: prevState.students,
            searchText: e.target.value.replace(regex, ""),
        }), () => {
            let rr = new RegExp("(.*)"+this.state.searchText+"(.*)", 'i')
            const { students } = this.state
            let studentsData = students.filter(({rollno, name, email}) => {return (!rollno.toString().search(rr)) || (!name.search(rr)) || (!email.search(rr)) })
            this.setState((prevState) => ({
                b_students: (!prevState.search)?prevState.students: prevState.b_students,
                search: true,
                students: studentsData
            }))
        })
    }

    async componentDidMount() {
        let token = getCookie('token');
        if (token) {
            axios.get('http://localhost:3001/verify?token='+token)
            .then(async (res)=>{
                // console.log(res)
                if(res.data.status === false) {
                    window.open('/login');
                }else if(res.data.status === undefined) {
                    alert('something went wrong!!')
                    window.open('/login');
                }else{
                    this.updateStudentList(this.state.s_class, this.state.s_div);
                    // console.log(this.state)
                }
            })
        }else{
            window.location = '/login';
        }
    }

    updateStudentList(s_class, s_div) {
        setInStorage('class', s_class)
        setInStorage('div', s_div)
        let token = getCookie('token')
        if (!token) {
            alert('login session not found\nplease login and try again!');
        }else{
            axios.get('http://localhost:3001/?token='+token+'&s_class='+s_class+'&s_div='+s_div)
            .then((res)=>{
                // console.log(res);
                if(res.data.status) {
                    this.setState({
                        students: res.data.users,
                        s_class: s_class,
                        s_div: s_div
                    }, () => {
                        this.sortStudentData()
                    })
                }else if(res.data.status === false) {
                    alert(res.data.message);
                }
            })
            .catch(err=>{
                console.log(err)
                alert('something went wrong!')
            })
        }
    }

    onSignout() {
        let token = getCookie('token');
        axios.post('http://localhost:3001/logout', {token: token})
        .then(res => {
            // console.log(res);
            if(res.data.status) {
                document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";'
                window.open('/login')
            }else {
                if(res.data.status === false){
                    alert(res.data.message);
                }else{
                    alert('something went wrong !')
                }
            }
        }).catch(err=>{
            console.log(err);
            alert('Something went wrong !\n'+err.message);
        })
    }

    onChangeSortOrderAttribute(attr) {
        // console.log(this.state);
        if(this.state.sortAttribute === attr) {
            switch (this.state.sortOrder) {
                case 'asc':
                    setInStorage('order', 'desc')
                    setInStorage('attr', attr)
                    this.setState({
                        sortOrder: 'desc'
                    }, ()=>{
                this.sortStudentData();
                // console.log(this.state);
            })
                    break;
                case 'desc':
                    setInStorage('order', 'asc')
                    setInStorage('attr', attr)
                    this.setState({
                        sortOrder: 'asc'
                    }, ()=>{
                this.sortStudentData();
                // console.log(this.state);
            })
                    break;
                default:
                    setInStorage('order', 'asc')
                    setInStorage('attr', attr)
                    this.setState({
                        sortOrder: 'asc'
                    }, ()=>{
                this.sortStudentData();
                // console.log(this.state);
            })
                    break;
            }
        }else {
            setInStorage('order', 'asc')
            setInStorage('attr', attr)
            this.setState({
                sortOrder: 'asc',
                sortAttribute: attr
            }, ()=>{
                this.sortStudentData();
                // console.log(this.state);
            })
        }
    }

    sortStudentData() {
        // console.log(this.state)
        const { students, sortOrder, sortAttribute } = this.state;
        let studentsData = students.slice()
        // console.log(studentsData)
        const sorted = studentsData.sort((a, b) => {
            a.rollno = a.rollno.toString()
            const isReversed = (sortOrder === 'asc')? 1 : -1;
            switch (sortAttribute) {
                case 'rollno':
                    // console.log('rollno')
                    return isReversed * a.rollno.localeCompare(b.rollno, undefined, {'numeric': true});
                case 'name':
                    // console.log('name')
                    return isReversed * a.name.localeCompare(b.name);
                case 'email':
                    // console.log('email')
                    return isReversed * a.email.localeCompare(b.email);
                default:
                    // console.log('default')
                    return isReversed * a.name.localeCompare(b.name);
            }
        })
        this.setState({
            students: sorted,
        }, () => {
            // console.log(this.state.students)
        })
    }

    onClickRollNoSort() {
        this.onChangeSortOrderAttribute('rollno')
    }
    onClickNameSort() {
        this.onChangeSortOrderAttribute('name')
    }
    onClickEmailSort() {
        this.onChangeSortOrderAttribute('email')
    }

    render() {
        const { sortOrder, sortAttribute } = this.state
        return (
        <>
            <div className="g-sidenav-show  bg-gray-200" id='outer-container'>
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NKDMSK6" title='u' height="0" width="0"
                        style={{display:'none', visibility:'hidden'}}></iframe></noscript>
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} updateStudentList={this.updateStudentList} />
                <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ps ps--active-y" id='page-wrap'>
                    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur"
                        navbar-scroll="true">
                        <div className="container-fluid py-1 px-3">
                            <nav aria-label="breadcrumb">
                                {/* <!-- <h6 className="font-weight-bolder mb-0">Students</h6> --> */}
                            </nav>
                            <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                                <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                    <div className="ms-md-auto pe-md-3 d-flex align-items-center">
                                        <div className="input-group input-group-outline">
                                            <label className="form-label">Search...</label>
                                            <input value={this.state.searchText} onChange={this.onChangeSearchText} type="text" class="form-control" onfocus="focused(this)" onfocusout="defocused(this)" />
                                        </div>
                                    </div>
                                </div>
                                <ul className="navbar-nav  justify-content-end">
                                    <li className="nav-item d-flex align-items-center">
                                        <a href="/#" onClick={this.onSignout} className="nav-link text-body font-weight-bold px-0">
                                            <i className="fa fa-user me-sm-1" aria-hidden="true"></i>
                                            <span className="d-sm-inline d-none unselectable">Sign Out</span>
                                        </a>
                                    </li>
                                    <li className="nav-item d-xl-none ps-3 d-flex align-items-center">
                                        <a href="/#" className="nav-link text-body p-0" id="iconNavbarSidenav">
                                            <div className="sidenav-toggler-inner">
                                                <i className="sidenav-toggler-line"></i>
                                                <i className="sidenav-toggler-line"></i>
                                                <i className="sidenav-toggler-line"></i>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="container-fluid py-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="card my-4">
                                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                            <h6 className="text-white text-capitalize ps-3 unselectable">Students &gt; {this.state.s_class} &gt; Div. {this.state.s_div}</h6>
                                        </div>
                                    </div>
                                    <div className="card-body px-0 pb-2">
                                        <div className="table-responsive p-0">
                                            <table className="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th onClick={()=>this.onClickRollNoSort()} style={{cursor: 'pointer', }}
                                                            className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 unselectable">
                                                            Roll No.
                                                            <SortIcon down={this.state.sortOrder} display={(sortAttribute==='rollno')?true:false} />
                                                        </th>
                                                        <th onClick={()=>this.onClickNameSort()} style={{cursor: 'pointer'}}
                                                            className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 unselectable">
                                                            Name
                                                            <SortIcon down={this.state.sortOrder} display={(sortAttribute==='name')?true:false} />
                                                        </th>
                                                        <th onClick={()=>this.onClickEmailSort()} style={{cursor: 'pointer'}}
                                                            className=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 unselectable">
                                                            Email
                                                            <SortIcon down={this.state.sortOrder} display={(sortAttribute==='email')?true:false} />
                                                        </th>
                                                        <th
                                                            className=" text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 unselectable">
                                                            Password
                                                        </th>
                                                        <th className="text-secondary opacity-7"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.students.map((student, index) => {
                                                            return (
                                                            <StudentItem key={student.rollno} rollno={student.rollno} name={student.name} email={student.email}
                                                            pass={student.local_pass} sclass={student.class} division={student.division} joined_date={student.joined_date} />
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ps__rail-x" style={{left: '0px', bottom: '0px'}}>
                        <div className="ps__thumb-x" tabIndex={0} style={{left: '0px', width: '0px'}}></div>
                    </div>
                    <div className="ps__rail-y" style={{top: '0px', height: '973px', right: '0px'}}>
                        <div className="ps__thumb-y" tabIndex={0} style={{top: '0px', height: '774px'}}></div>
                    </div>
                </main>
            </div>
        </>
    )
  }
}

export default Home