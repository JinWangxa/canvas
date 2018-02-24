/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2016. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* eslint no-empty-function: ["error", { "allow": ["arrowFunctions"] }] */

import React from "react";
import PropTypes from "prop-types";
import { MenuItem, SubMenu } from "react-contextmenu";

class CommonContextMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.itemSelected = this.itemSelected.bind(this);
	}

	itemSelected(data, selectedEvent) {
		this.props.contextHandler(data);
		// This stops the canvasClicked function from being fired which would
		// clear any current selections.
		if (selectedEvent) {
			selectedEvent.stopPropagation();
			selectedEvent.nativeEvent.stopImmediatePropagation();
		}
	}

	buildMenu(menuDefinition) {
		const customDivider = {
			className: "contextmenu-divider"
		};

		const menuItems = [];
		for (let i = 0; i < menuDefinition.length; ++i) {
			const divider = menuDefinition[i].divider;
			const submenu = menuDefinition[i].submenu;
			if (divider) {
				menuItems.push(<MenuItem attributes={customDivider} key={i + 1} onClick={() => {}} divider />);
			} else if (submenu) {
				const submenuItems = this.buildMenu(menuDefinition[i].menu);
				menuItems.push(
					<SubMenu title={menuDefinition[i].label} key={i + 1} classNames="contextmenu-submenu">
						{submenuItems}
					</SubMenu>
				);
			} else {
				menuItems.push(
					<MenuItem onClick={this.itemSelected.bind(null, menuDefinition[i].action)} key={i + 1}>
						{menuDefinition[i].label}
					</MenuItem>
				);
			}
		}
		return menuItems;
	}

	render() {
		const menuItems = this.buildMenu(this.props.menuDefinition);

		return (
			<div>
				{menuItems}
			</div>
		);
	}
}

CommonContextMenu.propTypes = {
	contextHandler: PropTypes.func,
	menuDefinition: PropTypes.array
};

export default CommonContextMenu;