import React, { PureComponent } from 'react'

class SortIcon extends PureComponent {
    render() {
        return (
            <>
                {
                    (this.props.down === 'asc')?
                        <i className={"fa fa-solid fa-sort-down ml-2"} style={{fontSize: '16px', fontWeight: 'bolder', display: (this.props.display)?'inline-block':'none'}} />
                    :
                        <i className={"fa fa-solid fa-sort-up ml-2"} style={{fontSize: '16px', fontWeight: 'bolder', display: (this.props.display)?'inline-block':'none'}} />
                }
            </>
        )
    }
}

export default SortIcon