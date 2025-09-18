'use client'

import { styled, View, Text, XStack, Popover, Button, YStack } from "tamagui";
import Tabs from "./Tabs";

const Navigation = () => {
  return (
    <NavigationContainer>
      <Left>
        <Text>Logo</Text>
      </Left>

      <Right>
        <Tabs names={['首页', '关于', '服务', '联系我们']} onTabChange={() => {}} />
        
        <UserContainer hoverable>
          <Popover.Trigger asChild>
            <Text>用户</Text>
          </Popover.Trigger>

          <UserContent>
            <Popover.Arrow borderWidth={1} borderColor="red" />
            <Popover.Close />
            <Button>用户中心</Button>
            <Button>退出登录</Button>
          </UserContent>
        </UserContainer>
      </Right>
    </NavigationContainer>
  )
}

const NavigationContainer = styled(XStack, {
  width: '100%',
  justifyContent: 'space-between',
  paddingHorizontal: '10%',
  paddingVertical: 10,
})

const Left = styled(XStack, {
})

const Right = styled(XStack, {
})

const Logo = styled(Text, {
})

const UserContainer = styled(Popover, {})

const UserContent = styled(Popover.Content, {
  borderWidth: 1,
  borderColor: 'red',
  padding: 0,
  enterStyle: { y: -10, opacity: 0, },
  exitStyle: { y: -10, opacity: 0 },
  animation: [
    'quick',
    {
      opacity: {
        overshootClamping: true,
      },
    },
  ]
})

const UserContentList = styled(YStack, {
  
})

export default Navigation;
