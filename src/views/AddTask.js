import React, { Component } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Text,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment/locale/pt-br";

import CommonStyles from "../CommonStyles";

const initialState = {
  desc: "",
  date: new Date(),
  showDatePicker: false,
};

export default class AddTask extends Component {
  state = {
    ...initialState,
  };

  getDatePicker = () => {
    const dateString = moment(this.state.date).format(
      "dddd, D [de] MMMM [de] YYYY"
    );

    let datePicker = (
      <DateTimePicker
        value={this.state.date}
        onChange={(_, date) => {
          this.setState({ date });
        }}
        mode="date"
      />
    );

    if (Platform.OS === "android") {
      datePicker = (
        <View>
          <TouchableOpacity
            onPress={() =>
              this.setState({ showDatePicker: !this.state.showDatePicker })
            }
          >
            <Text style={styles.date}>{dateString}</Text>
          </TouchableOpacity>
          {this.state.showDatePicker && datePicker}
        </View>
      );
    }

    return datePicker;
  };

  save = () => {
    const newTask = {
      desc: this.state.desc,
      date: this.state.date,
    };

    this.props.onSave && this.props.onSave(newTask);
    this.setState({ ...initialState });
  };

  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.isVisible}
        onRequestClose={this.props.onCancel}
        animationType="slide"
      >
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <Text style={styles.header}>Nova Tarefa</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={this.state.desc}
            onChangeText={(desc) => {
              this.setState({ desc, showDatePicker: false });
            }}
          />
          {this.getDatePicker()}
          <View style={styles.buttons}>
            <TouchableOpacity onPress={this.props.onCancel}>
              <Text style={styles.button}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.save}>
              <Text style={styles.button}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={this.props.onCancel}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  container: {
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: CommonStyles.colors.today,
    color: CommonStyles.colors.secondary,
    textAlign: "center",
    padding: 15,
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    margin: 20,
    marginRight: 30,
    color: CommonStyles.colors.today,
  },
  input: {
    height: 40,
    margin: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 6,
    padding: 3,
  },
  date: {
    fontSize: 20,
    marginLeft: 15,
  },
});
