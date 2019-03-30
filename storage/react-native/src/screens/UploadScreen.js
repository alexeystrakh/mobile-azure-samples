import React from "react";
import { Image, Alert, Platform, ActivityIndicator } from "react-native";
import { Container, Content, Button, Text, Separator } from "native-base";
import PhotoUpload from "react-native-photo-upload";

export default class UploadScreen extends React.Component {
  BASE_API = "http://localhost:3000/api/blob";

  static navigationOptions = () => ({
    headerTitle: <Text style={{ color: "#fff", fontSize: 18 }}>Add Photo</Text>
  });

  constructor(props) {
    super(props);

    this.state = {
      selectedPhoto: null,
      uploadingPhoto: false
    };
  }

  takePhoto = () => {
    alert("Click on avatar below to take or upload an image");
  };

  uploadPhoto = () => {
    if (this.state.selectedPhoto == null) {
      Alert.alert(
        "Error",
        "Please select a photo",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: true }
      );
    } else {
      this.setState({
        uploadingPhoto: true
      });
      console.log("upload " + this.state.selectedPhoto);

      const data = new FormData();
      const selectedPhoto = this.state.selectedPhoto;
      data.append("blobFile", {
        name: selectedPhoto.fileName,
        uri:
          Platform.OS === "android"
            ? selectedPhoto.uri
            : selectedPhoto.uri.replace("file://", ""),
        type: selectedPhoto.type
      });
      fetch(this.BASE_API, {
        method: "post",
        body: data
      })
        .then(res => {
          if (res.status === 200) {
            alert("Image upload successful!");
            this.props.navigation.push("Home");
          } else {
            alert("Error uploading photo! Please try again!");
          }
          this.setState({
            uploadingPhoto: false
          });
        })
        .catch(function(e) {
          console.log(e);
          alert("Error uploading photo! Please try again!");
          this.setState({
            uploadingPhoto: false
          });
        });
    }
  };

  _renderUploadButton = () => {
    if (this.state.uploadingPhoto) {
      return (
        <Button full success>
          <ActivityIndicator />
        </Button>
      );
    } else {
      return (
        <Button full success onPress={() => this.uploadPhoto()}>
          <Text>Upload Photo</Text>
        </Button>
      );
    }
  };

  render() {
    return (
      <Container>
        <Content>
          <Separator />
          <Button full onPress={() => this.takePhoto()}>
            <Text>Take Photo</Text>
          </Button>
          <Separator />
          {
            <PhotoUpload
              onResponse={image => {
                if (image) {
                  this.setState({
                    selectedPhoto: image
                  });
                }
              }}
              onError={err => {
                console.log("On Error Upload Screen");
                console.log(err);
              }}
            >
              <Image
                style={{
                  paddingVertical: 30,
                  width: 150,
                  height: 150,
                  borderRadius: 75
                }}
                resizeMode="cover"
                source={{
                  uri:
                    "https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg"
                }}
              />
            </PhotoUpload>
          }
          <Separator />
          {this._renderUploadButton()}
        </Content>
      </Container>
    );
  }
}
