import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Container, Content, Item, Input, Button, Text } from "native-base";

export default class AddTodoScreen extends Component {
  static navigationOptions = {
    headerTintColor: "#fff",
    headerTitle: "Add To-Do"
  };
  constructor(props) {
    super(props);
    this.state = {
      todo: ""
    };
  }

  render() {
    const { params } = this.props.navigation.state;
    const { todo } = this.state;
    return (
      <Container style={styles.container}>
        <Content padder>
          <Item rounded style={styles.item}>
            <Input
              style={styles.item}
              placeholder="What needs to done?"
              value={this.state.text}
              name="todo"
              onChangeText={text => this.setState({ todo: text })}
            />
          </Item>
          <Button
            danger
            rounded
            block
            style={styles.button}
            onPress={() => params.handleAddTodo(todo)}
          >
            <Text>Save</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    marginVertical: 20,
    backgroundColor: "tomato"
  }
});
