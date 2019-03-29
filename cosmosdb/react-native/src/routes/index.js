import { createStackNavigator, createAppContainer } from "react-navigation";
import TodoListScreen from "../screens/TodoListScreen";
import AddTodoScreen from "../screens/AddTodoScreen";

const AppNavigator = createStackNavigator(
  { TodoList: TodoListScreen, AddTodo: AddTodoScreen },
  {
    initialRouteName: "TodoList",
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:'tomato'
        }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
