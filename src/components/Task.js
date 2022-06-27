import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Swipeable,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import ComonStyles from "../CommonStyles";

import moment from "moment";
import "moment/locale/pt-br";

function getCheckView(doneAt) {
  return doneAt != null ? (
    <View style={styles.done}>
      <Icon name="check" size={20} color={ComonStyles.colors.secondary} />
    </View>
  ) : (
    <View style={styles.pending} />
  );
}

export default (props) => {
  const doneOrNotStyle = props.doneAt
    ? {
        textDecorationLine: "line-through",
      }
    : {};

  const date = props.doneAt ? props.doneAt : props.estimateAt;
  const fromattedDate = moment(date)
    .locale("pt-br")
    .format("dddd, D [de] MMMM");

  getRightContent = () => {
    return (
      <TouchableOpacity 
        style={styles.right}
        onPress={() => props.onDelete && props.onDelete(props.id)}
        >
        <Icon name="trash" size={30} color="#fff" />
      </TouchableOpacity>
    );
  };

  getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={20} color="#fff" style={styles.excludeIcon}/>
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable 
      renderRightActions={getRightContent}
      renderLeftActions={getLeftContent}
      onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
            <View style={styles.checkContainer}>
              {getCheckView(props.doneAt)}
            </View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
            <Text style={styles.date}>{fromattedDate}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "#AAA",
    borderBottomWidth: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: '#fff'
  },
  checkContainer: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#555",
  },
  done: {
    height: 25,
    width: 25,
    borderRadius: 13,
    backgroundColor: "#4D7031",
    alignItems: "center",
    justifyContent: "center",
  },
  desc: {
    color: ComonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    color: ComonStyles.colors.subText,
    fontSize: 12,
  },
  right: {
    backgroundColor: "red",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  left: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },  
  excludeText: {
    color: '#fff',
    fontSize: 20,
    margin: 10,
  },
  excludeIcon: {
    marginLeft: 10
  }
});
