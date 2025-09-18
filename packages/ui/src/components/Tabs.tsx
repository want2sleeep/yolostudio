'use client'

import { useState, useRef, useEffect } from "react";
import { styled, XStack, Button, View } from "tamagui";

export interface TabsProps {
    names: string[];
    onTabChange: (index: number) => void;
    init?: number;
}

export interface IndicatorProps { 
    activeIndex: number;
    tabRefs: (HTMLDivElement | null)[];
}

const Tabs = ({ names, onTabChange, init = 0 }: TabsProps) => {
    const [activeIndex, setActiveIndex] = useState(init);
    const tabRefs = useRef<(HTMLDivElement | null)[]>(new Array(names.length).fill(null));

    const onTabClick = (index: number) => {
        setActiveIndex(index);
        onTabChange(index);
    };

    return (
        <TabContainer>
            {names.map((name, index) => (
                <TabItem
                    key={index}
                    ref={(el) => {tabRefs.current[index] = el as HTMLDivElement | null}}
                    onPress={() => onTabClick(index)}
                    variant={index === activeIndex ? 'active' : 'default'}
                    chromeless={true}
                >
                    {name}
                </TabItem>
            ))}
            <Indicator activeIndex={activeIndex} tabRefs={tabRefs.current} />
        </TabContainer>
    )
}

const Indicator = ({ activeIndex, tabRefs }: IndicatorProps) => {
    // 存储指示器的位置和宽度
    const [indicatorStyle, setIndicatorStyle] = useState({
        left: '0%',
        width: '0%'
    });

    // 当activeIndex或tabRefs变化时，重新计算位置
    useEffect(() => {
        const activeTab = tabRefs[activeIndex];
        if (!activeTab) return;

        // 获取当前激活Tab的实际位置和宽度
        const { offsetLeft, offsetWidth } = activeTab;
        
        // 更新指示器样式
        setIndicatorStyle({
            left: `${offsetLeft}px`, // 基于实际左偏移（像素）
            width: `${offsetWidth}px` // 基于实际宽度（像素）
        });
    }, [activeIndex, tabRefs]);

    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                ...indicatorStyle, // 应用计算后的位置和宽度
                height: 3,
                backgroundColor: 'red',
                borderRadius: 2,
                transition: 'left 0.3s ease, width 0.3s ease', // 增加宽度过渡动画
                zIndex: 1,
            }}
        />
    );
};

const TabContainer = styled(XStack, {
    position: 'relative',
    width: '100%',
    height: 48, // 设置固定高度，确保指示器在正确的位置
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '$borderColor',
})

const TabItem = styled(Button, {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    variants: {
        variant: {
            active: {
                backgroundColor: '$backgroundHover',
                color: '$color12',
                fontWeight: '600',
            },
            default: {
                backgroundColor: 'transparent',
                color: '$color10',
                fontWeight: '400',
            }
        }
    },
    defaultVariants: {
        variant: 'default',
    }
})

export default Tabs;
