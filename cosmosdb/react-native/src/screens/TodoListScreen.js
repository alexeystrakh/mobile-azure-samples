import React, { Component } from "react";
import { StyleSheet, FlatList, Alert } from "react-native";
import { Icon, Container, Content, Text, View, Toast } from "native-base";
import TodoListItem from "../components/TodoListItem";
import Loader from "../components/Loader";
import axios from "axios";
import { getItem, setItem } from "../util/storage";

axios.defaults.baseURL = "http://5.9.144.226:4002";

export default class TodoListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      loading: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTintColor: "white",
      headerTitle: "To-Dos",
      headerTitleStyle: { color: "#fff" },
      headerRight: (
        <Icon
          name="plus"
          type="AntDesign"
          style={{ color: "#fff", marginRight: 10 }}
          onPress={() =>
            navigation.navigate("AddTodo", {
              handleAddTodo: params.handleAddTodo
            })
          }
        />
      )
    };
  };

  async componentDidMount() {
    this.props.navigation.setParams({
      handleAddTodo: this.handleAddTodo
    });
    this.setState({ loading: true });
    try {
      const response = await axios.get("/todo/getAllTodo");
      this.setState({ todo: response.data.data }, () =>
        this.setState({ loading: false })
      );
    } catch (e) {
      this.setState({ loading: false });
      Toast.show({
        text: "Error occured",
        buttonText: "Okay"
      });
    }
  }
  _keyExtractor = (item, index) => item.id;

  toggleCheckbox = async id => {
    let index = this.state.todo.findIndex(x => x.id === id);
    if (index === -1) {
      return;
    } else {
      this.setState(
        {
          todo: [
            ...this.state.todo.slice(0, index),
            {
              ...this.state.todo[index],
              completed: !this.state.todo[index].completed
            },
            ...this.state.todo.slice(index + 1)
          ]
        },
        () =>
          Toast.show({
            text: "Todo Updated",
            buttonText: "Okay"
          })
      );
      try {
        const res = await axios.put("/todo/updateTodo", {
          id,
          title: this.state.todo[index].title,
          completed: !this.state.todo[index].completed
        });
      } catch (e) {
        Toast.show({
          text: "Error occured",
          buttonText: "Okay"
        });
      }
    }
  };

  handleAddTodo = title => {
    if (!title.trim()) {
      Alert.alert(
        "Alert",
        "Todo Field is Required",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    } else {
      Toast.show({
        text: "Please Wait, Todo is being added",
        buttonText: "Okay"
      });
      axios
        .post("/todo/createTodo", { title })
        .then(res => {
          const { title, completed, id } = res.data.data;
          this.setState(
            {
              todo: [...this.state.todo, { title, completed, id }]
            },
            () => {
              Alert.alert(
                "Alert",
                "Todo is added",
                [
                  {
                    text: "OK",
                    onPress: () => this.props.navigation.navigate("TodoList")
                  }
                ],
                { cancelable: false }
              );
            }
          );
        })
        .catch(e => {
          Toast.show({
            text: "Error occured",
            buttonText: "Okay"
          });
        });
    }
  };

  render() {
    const { todo, loading } = this.state;
    return (
      <Container>
        {loading ? (
          <Loader showText />
        ) : (
          <Content>
            {todo.length ? (
              <FlatList
                data={todo}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => (
                  <TodoListItem
                    id={item.id}
                    todoTitle={item.title}
                    checked={item.completed}
                    toggleCheckbox={this.toggleCheckbox}
                  />
                )}
              />
            ) : (
              <View style={styles.headlineView}>
                <Text style={styles.headlineText}>
                  Add Todo by clicking on 'plus' sign
                </Text>
              </View>
            )}
          </Content>
        )}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headlineView: { flex: 1, alignItems: "center" },
  headlineText: {
    fontSize: 18,
    color: "#ccc"
  }
});
