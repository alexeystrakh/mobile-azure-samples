import React, { Component } from "react";
import { Image, ActivityIndicator, StyleSheet } from "react-native";
import { Button as RnButton } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  Icon,
  Button,
  Left,
  Right,
  View
} from "native-base";
import moment from "moment";
import Swipeout from "react-native-swipeout";

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default class HomeScreen extends Component {
  BASE_API = "http://localhost:3000/api/blob";

  static navigationOptions = ({ navigation }) => ({
    headerTitle: <Text style={{ color: "#fff", fontSize: 18 }}>My Photos</Text>,
    headerBackTitle: "My Photos",
    headerRight: (
      <RnButton
        onPress={() => {
          navigation.navigate("Details");
        }}
        title="Add"
        color="#000"
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    // fetch images from API
    return fetch(this.BASE_API)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // delete button
    const swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "#FF0000",
        color: "#FFF",
        onPress: () => {
          this.setState({ isLoading: true });
          return fetch(this.BASE_API, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.dataSource[this.state.currentIndex])
          }).then(response => {
            if (response.status === 200) {
              this.setState({ isLoading: false });
              this.props.navigation.push("Home");
            } else {
              alert("File could not be deleted!");
            }
          });
        }
      }
    ];

    // show loading indicator when fetching
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    } else {
      if (this.state.dataSource && this.state.dataSource.length > 0) {
        let images = this.state.dataSource.map((image, key) => {
          const fromNow = moment(image.properties.lastModified).fromNow();
          return (
            <Swipeout
              right={swipeoutBtns}
              key={key}
              onOpen={() => {
                this.setState({ currentIndex: key });
              }}
            >
              <Card>
                <CardItem cardBody>
                  <Image
                    source={{ uri: image.blobUrl }}
                    style={{ height: 400, width: null, flex: 1 }}
                  />
                </CardItem>
                <CardItem>
                  <Right>
                    <Text>Uploaded: {fromNow}</Text>
                  </Right>
                </CardItem>
              </Card>
            </Swipeout>
          );
        });
        return (
          <Container>
            <Content>{images}</Content>
          </Container>
        );
      } else {
        return (
          <View style={styles.container}>
            <Text>No image found!</Text>
          </View>
        );
      }
    }
  }
}
