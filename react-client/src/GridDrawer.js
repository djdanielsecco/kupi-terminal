import React from "react"
import Divider from '@material-ui/core/Divider'
import CloseIcon from '@material-ui/icons/Close'
import Grid from './Grid'
import PerfectScrollbar from 'react-perfect-scrollbar'

class GridDrawer extends React.Component {
  drawerClose(drawer) {
    DrawersStore.drawerClose(drawer)
  }
  drawerToggle(drawer, component, width, data, e) {
    e.preventDefault()
    if ( DrawersStore.drawers[drawer].component === component && JSON.stringify(DrawersStore.drawers[drawer].data) === JSON.stringify(data) ) {
      // current component
      DrawersStore.drawerToggle(drawer)
    } else {
      // new component
      if (DrawersStore.drawers[drawer].open === false) DrawersStore.drawerToggle(drawer)
      DrawersStore.drawerSet(drawer, component, width, data)
    }
  }
  render() {
    // console.log(this.props.data.dashboardId)
    var dashboardId = this.props.data && this.props.data.dashboardId
    return (
      <div className="drawer">
        <PerfectScrollbar option={{'suppressScrollX': true}}>
          <div className="drawer-title">
            <div className="drawer-title-text">Temporary dashboard</div>
            <CloseIcon onClick={this.drawerClose.bind(this, 'aside-right-first')} className="pointer" />
          </div>
          <Divider />
          <Grid data={{...this.props.data, aside: true}} />
          <Divider />
          <div className="spacer"></div>
          <div className="drawer-footer pointer" onClick={this.drawerToggle.bind(this, "aside-right-second", "core_components/Market/Categories.js", "320px", {dashboardId: dashboardId})}>
            Add widget
          </div>
        </PerfectScrollbar>
      </div>
    )
  }
}

export default GridDrawer
