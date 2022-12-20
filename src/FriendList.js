import { ScrollView, View } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import Margin from "./Margin";
import Profile from "./Profile";

const bottomSpace = getBottomSpace(); // bottomSpace같은 경우 안드로이드는 0

export default (props) => {
  // 여러개 반복되는 컴포넌트를 그리는 방법에는 map() 사용하거나 flatList를 사용할 수 있다.
  // 각각의 아이템들은 key를 가지고 있어야한다.
  /**
   * Case1. 삼항 연산자
   */
  //   return props.isOpened ? (
  //     <ScrollView
  //       showsVerticalScrollIndicator={false}
  //       contentContainerStyle={{ paddingBottom: 50 }}
  //     >
  //       {props.data.map((item, index) => (
  //         // Key는 map 최상단에 있어야함
  //         <View key={index}>
  //           <Profile
  //             uri={item.uri}
  //             name={item.name}
  //             introduction={item.introduction}
  //           />
  //           <Margin height={13} />
  //         </View>
  //       ))}
  //     </ScrollView>
  //   ) : null;

  /**
   * Case2. if문으로 먼저 예외처리 (가독성이 좋다)
   * */
  //   if (!props.isOpened) return null;
  //   return (
  //     <ScrollView
  //       showsVerticalScrollIndicator={false}
  //       contentContainerStyle={{ paddingBottom: 50 }}
  //     >
  //       {props.data.map((item, index) => (
  //         // Key는 map 최상단에 있어야함
  //         <View key={index}>
  //           <Profile
  //             uri={item.uri}
  //             name={item.name}
  //             introduction={item.introduction}
  //           />
  //           <Margin height={13} />
  //         </View>
  //       ))}
  //     </ScrollView>
  //   );

  /**
   * Case3. && 이용
   * 만약 앞의 값이 false가 되면 return false가 되고 다음값을 체크하지 않는다.
   * 만약 앞의 값이 true가 되면 다음값을 체크한다.
   * ex) false && 1 => false  앞의값이 false이기 때문에 뒷값은 확인하지 않는다.
   * ex) true && 2 => 2  앞의값이 true이기 때문에 뒷값도 확인하여, 결과는 2가 된다.
   */
  return (
    props.isOpened && (
      <ScrollView showsVerticalScrollIndicator={false}>
        {props.data.map((item, index) => (
          // Key는 map 최상단에 있어야함
          <View key={index}>
            <Profile
              uri={item.uri}
              name={item.name}
              introduction={item.introduction}
            />
            <Margin height={13} />
          </View>
        ))}
      </ScrollView>
    )
  );
};
