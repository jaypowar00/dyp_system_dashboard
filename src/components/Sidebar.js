import React, { PureComponent } from 'react'
import { slide as Menu } from 'react-burger-menu'
import '../assets/css/sidebar.css'
import Collapsible from 'react-collapsible'

class Sidebar extends PureComponent {

    constructor(props) {
        super(props)
        this.onCollapseClick = this.onCollapseClick.bind(this);
        this.updateStudentList = props.updateStudentList;
        this.getStudentsWithFilter = this.getStudentsWithFilter.bind(this);
    }

    onCollapseClick(d_id) {
        let divElement = document.getElementById(d_id);
        divElement.classList.toggle("active");
        var content = divElement.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        }else{
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
    getStudentsWithFilter(s_class, s_div) {
        this.updateStudentList(s_class, s_div);
    }
    render() {
        return (
        <Menu>
            <Collapsible openedClassName='bm-item unselectable' className='unselectable' open={true} trigger={'Class'}>
                <Collapsible openedClassName='Collapsible bm-item' className='bm-item unselectable' trigger={'FY'}>
                    <ul>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('FY', 'A')}}>Div A</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('FY', 'B')}}>Div B</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('FY', 'C')}}>Div C</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('FY', 'D')}}>Div D</a></li>
                    </ul>
                </Collapsible>
                <Collapsible openedClassName='Collapsible bm-item' className='bm-item unselectable' trigger={'SY'}>
                    <ul>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('SY', 'A')}}>Div A</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('SY', 'B')}}>Div B</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('SY', 'C')}}>Div C</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('SY', 'D')}}>Div D</a></li>
                    </ul>
                </Collapsible>
                <Collapsible openedClassName='Collapsible bm-item' className='bm-item unselectable' trigger={'TY'}>
                    <ul>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('TY', 'A')}}>Div A</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('TY', 'B')}}>Div B</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('TY', 'C')}}>Div C</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('TY', 'D')}}>Div D</a></li>
                    </ul>
                </Collapsible>
                <Collapsible openedClassName='Collapsible bm-item' className='bm-item unselectable' trigger={'BE'}>
                    <ul>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('BE', 'A')}}>Div A</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('BE', 'B')}}>Div B</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('BE', 'C')}}>Div C</a></li>
                        <li><a className='menu-item2' href='/#' onClick={()=>{this.getStudentsWithFilter('BE', 'D')}}>Div D</a></li>
                    </ul>
                </Collapsible>
            </Collapsible>
        </Menu>
        )
    }
}

export default Sidebar