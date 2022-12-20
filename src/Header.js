import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 헤더 쪽 아이콘 소스가 중복 될 것이므로 미리 빼놓기
const IconButtom = (props) => {
  return (
    <View style={{ paddingHorizontal: 6 }}>
      <Ionicons name={props.name} size={24} color="black" />
    </View>
  );
};

export default () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>친구</Text>

      <View style={{ flexDirection: "row" }}>
        <IconButtom name="search-outline" />
        <IconButtom name="person-add-outline" />
        <IconButtom name="md-musical-notes-outline" />
        <IconButtom name="ios-settings-outline" />
      </View>
    </View>
  );
};
