import React, { Component } from "react";
import { ListItem, CheckBox, Text, Right, Left } from "native-base";

export default class TodoListItem extends Component {
  render() {
    const { todoTitle, checked, toggleCheckbox, id } = this.props;
    return (
      <React.Fragment>
        <ListItem>
          <Left>
            <Text>{todoTitle}</Text>
          </Left>
          <Right>
            <CheckBox checked={checked} onPress={() => toggleCheckbox(id)} />
          </Right>
        </ListItem>
      </React.Fragment>
    );
  }
}
