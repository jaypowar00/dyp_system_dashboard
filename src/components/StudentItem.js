import React, { PureComponent } from 'react'

class StudentItem extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            rollno: props.rollno,
            name: props.name,
            email: props.email,
            pass: props.pass,
            class: props.sclass,
            div: props.division,
            joined_date: props.joined_date,
        }
    }
    render() {
        return (
            <tr>
                <td>
                    <div className="d-flex px-2 py-1">
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{this.state.rollno}</h6>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="d-flex px-2 py-1">
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{this.state.name}</h6>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="d-flex px-2 py-1">
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm"><a href={'mailto:'+this.state.email}>{this.state.email}</a></h6>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="d-flex px-2 py-1">
                        <div className="d-flex flex-column justify-content-center">
                            <h6 className="mb-0 text-sm">{this.state.pass}</h6>
                        </div>
                    </div>
                </td>
                <td className="align-middle">
                    <a href="/#" className="text-secondary font-weight-bold text-xs unselectable"
                        data-toggle="tooltip" data-original-title="See Uploads">
                        See Uploads
                    </a>
                </td>
            </tr>
        )
  }
}

export default StudentItem