import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native"; // SafeAreaView 를 RN 껄 임포트 하면 edges props 적용 안됨
import Header from "./src/Header"; // export 'default' 를 해주면, 구조분해 없이 아무 이름으로 컴포넌트를 불러올 수 있다. default 없이 export만 하면 {Header} 구조분해로 가져와야함
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper"; // 안드로이드도 제공함
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Profile from "./src/Profile";
import { friendProfiles, myProfile } from "./src/data";
import Margin from "./src/Margin";
import Division from "./src/Division";
import FriendSection from "./src/FriendSection";
import FriendList from "./src/FriendList";
import { useState } from "react";
import TabBar from "./src/TabBar";

const statusBarHeight = getStatusBarHeight(true); // safe ? true : 안전한 영역을 포함할 것인가, 또는 제외하고 상단바 높이를 얻을 것인지
const bottomSpace = getBottomSpace(); // bottomSpace같은 경우 안드로이드는 0

export default function App() {
  const [isOpened, setIsOpened] = useState(true);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0); // 탭이 선택된 인덱스

  const onPressArrow = () => {
    setIsOpened(!isOpened);
  };

  return (
    <SafeAreaProvider>
      {/* // 1. 부모의 최상단 컴포넌트를 안전한 영역부터 그리게 해주는 SafeAreaView,
      상단과 하단 모두 적용됨
      // 2. 상단, 하단(홈인디케이터)의 status 높이를
      직접 알아내서 padding, margin 주는 방법도 있음 ->
      react-native-iphone-x-helper 있는데 아카이빙 되어 사용불가, 다른 대체제 */}
      {/* edges props 사용할 수 있다. */}
      <SafeAreaView style={styles.container} edges={["right", "top", "left"]}>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Header />
          <Margin height={10} />
          <Profile
            uri={myProfile.uri}
            name={myProfile.name}
            introduction={myProfile.introduction}
          />

          <Margin height={15} />
          <Division />

          <Margin height={12} />

          <FriendSection
            friendProfileLen={friendProfiles.length}
            onPressArrow={onPressArrow}
            isOpened={isOpened}
          />

          <FriendList data={friendProfiles} isOpened={isOpened} />
        </View>
        <TabBar
          selectedTabIdx={selectedTabIdx}
          setSelectedTabIdx={setSelectedTabIdx}
        />
      </SafeAreaView>
      {/* <View style={styles.container}>
        <Header />
      </View> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: statusBarHeight,
    backgroundColor: "#fff",
  },
});
