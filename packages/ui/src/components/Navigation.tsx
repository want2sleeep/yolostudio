'use client'

import { styled, View, Text, XStack, Popover, Avatar, Button, YStack } from "tamagui";
import Tabs from "./Tabs";

const Navigation = () => {
  return (
    <NavigationContainer>
      <Left>
        <Logo>Logo</Logo>
      </Left>

      <Right>
        <Tabs names={['首页', '关于', '服务', '联系我们']} onTabChange={() => { }} />

        <UserContainer hoverable>
          <Popover.Trigger asChild>
            <Avatar circular>
              <Avatar.Image
                accessibilityLabel="Nate Wienert"
                src="https://images.unsplash.com/photo-1531384441138-2736e62e0919?&w=100&h=100&dpr=2&q=80"
              />
              <Avatar.Fallback delayMs={600} backgroundColor="$blue10" />
            </Avatar>
          </Popover.Trigger>

          <UserContent>
            <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

            <UserContentList gap="$2">
              <Button>用户中心</Button>
              <Button>退出登录</Button>
              <Popover.Close asChild>
                <Button>关闭</Button>
              </Popover.Close>
            </UserContentList>
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
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1,
})

const Left = styled(XStack, {
})

const Right = styled(XStack, {
})

const Logo = styled(Text, {
})

const UserContainer = styled(Popover, {
  size: "$5",
  allowFlip: true,
  stayInFrame: true,
  offset: 15,
})

const UserContent = styled(Popover.Content, {
  borderWidth: 1,
  borderColor: '$borderColor',
  padding: 10,
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
