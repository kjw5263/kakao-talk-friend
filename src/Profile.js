import { View, Image, Text } from "react-native";
import Margin from "./Margin";
import styled from "styled-components/native";

const Container = styled.View`
  flex-direction: row;
`;

const ProfileImage = styled.Image`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size * 0.4}px;
`;

const TextContainer = styled.View`
  justify-content: center;
  margin-left: 10px;
`;

const NameText = styled.Text`
  font-weight: ${(props) => (props.isMe ? "bold" : "normal")};
  font-size: ${(props) => (props.isMe ? 16 : 15)}px;
`;

const IntroductionText = styled.Text`
  font-size: ${(props) => (props.isMe ? 12 : 11)}px;
  color: grey;
`;

export default (props) => {
  const { uri, name, introduction, isMe } = props;
  const size = isMe ? 50 : 40;
  return (
    // <View style={{ flexDirection: "row", backgroundColor: "white" }}>
    <Container>
      {/* <Image
        source={{ uri }}
        style={{ height: size, width: size, borderRadius: size * 0.4 }}
      /> */}
      <ProfileImage source={{ uri }} size={size} />
      <TextContainer>
        {/* <View style={{ justifyContent: "center", marginStart: 10 }}> */}
        <NameText isMe={isMe}>{name}</NameText>
        {/* <Text
          style={{
            fontWeight: isMe ? "bold" : undefined,
            fontSize: isMe ? 16 : 15,
          }}
        >
          {name}
        </Text> */}
        {/* 그냥 introduction 으로 비교하게 되면 텍스트로 인식하는데, <Text>컴포넌트로 감싸주지 않았다고 오류를 뿜게된다.
        있는지 없는지 여부를 알고 싶다면 !! 연산자 사용 (boolean) */}
        {!!introduction && (
          <View>
            <Margin height={isMe ? 6 : 2} />
            <IntroductionText>{introduction}</IntroductionText>
            {/* <Text style={{ fontSize: isMe ? 12 : 11, color: "grey" }}>
              {introduction}
            </Text> */}
          </View>
        )}
        {/* </View> */}
      </TextContainer>
      {/* </View> */}
    </Container>
  );
};
