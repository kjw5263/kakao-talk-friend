import { FlatList, StyleSheet, View } from "react-native"; // SafeAreaView 를 RN 껄 임포트 하면 edges props 적용 안됨
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

  const ItemSeparatorComponent = () => <Margin height={13} />;
  const renderItem = ({ item }) => {
    return (
      <View>
        <Profile
          uri={item.uri}
          name={item.name}
          introduction={item.introduction}
          isMe={false} // 나냐, 아니냐에 맞게 처리할수있다.
        />
      </View>
    );
  };
  const ListHeaderComponent = () => {
    return (
      <View style={{ backgroundColor: "white" }}>
        <Header />
        <Margin height={10} />
        <Profile
          uri={myProfile.uri}
          name={myProfile.name}
          introduction={myProfile.introduction}
          isMe={true}
        />

        <Margin height={15} />
        <Division />

        <Margin height={12} />

        <FriendSection
          friendProfileLen={friendProfiles.length}
          onPressArrow={onPressArrow}
          isOpened={isOpened}
        />

        <Margin height={5} />
      </View>
    );
  };

  const ListFooterComponent = () => {
    return <Margin height={10} />;
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
        <FlatList
          data={isOpened ? friendProfiles : []}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          keyExtractor={(_, index) => index}
          stickyHeaderIndices={[0]} // 고정할 헤더의 인덱스값
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
        />
        <TabBar
          selectedTabIdx={selectedTabIdx}
          setSelectedTabIdx={setSelectedTabIdx}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );

  // ScrollView
  // return (
  //   <SafeAreaProvider>
  //     {/* // 1. 부모의 최상단 컴포넌트를 안전한 영역부터 그리게 해주는 SafeAreaView,
  //     상단과 하단 모두 적용됨
  //     // 2. 상단, 하단(홈인디케이터)의 status 높이를
  //     직접 알아내서 padding, margin 주는 방법도 있음 ->
  //     react-native-iphone-x-helper 있는데 아카이빙 되어 사용불가, 다른 대체제 */}
  //     {/* edges props 사용할 수 있다. */}
  //     <SafeAreaView style={styles.container} edges={["right", "top", "left"]}>
  //       <View style={{ flex: 1, paddingHorizontal: 15 }}>
  //         <Header />
  //         <Margin height={10} />
  //         <Profile
  //           uri={myProfile.uri}
  //           name={myProfile.name}
  //           introduction={myProfile.introduction}
  //         />

  //         <Margin height={15} />
  //         <Division />

  //         <Margin height={12} />

  //         <FriendSection
  //           friendProfileLen={friendProfiles.length}
  //           onPressArrow={onPressArrow}
  //           isOpened={isOpened}
  //         />

  //         <FriendList data={friendProfiles} isOpened={isOpened} />
  //       </View>
  //       <TabBar
  //         selectedTabIdx={selectedTabIdx}
  //         setSelectedTabIdx={setSelectedTabIdx}
  //       />
  //     </SafeAreaView>
  //     {/* <View style={styles.container}>
  //       <Header />
  //     </View> */}
  //   </SafeAreaProvider>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: statusBarHeight,
    backgroundColor: "#fff",
  },
});

/** 서비스가 커지면, 최적화 측면에서는 인라인 스타일이 좋지 않다.
 * 새로 렌더링이 될 때마다 새로운 오브젝트가 계속해서 할당되기 때문에 성능에 좋지 않다.
 * 컴포넌트와 스타일링을 한꺼번에 선언해서 렌더링 최적화와 가독성에 좋은 Styled-component 이다
 *
 * expo 도큐먼트
 * CSS in JS 솔류션을 사용해 스타일링함 . 웹, 모바일, 데스크탑에서 보편적인 스타일링 가능
 * yarn add styled-component
 *
 *
 * import styled from "styled-components/native";
 * 이렇게 import 해서 쓸 수 있는데, 웹에서는 native 없이 그냥
 * import styled from "styled-components"; 사용
 */
