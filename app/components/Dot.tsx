import React, { useEffect } from "react"
import { ViewStyle } from "react-native"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

type DotProps = {
  isSelected: boolean
}

export const Dot = ({ isSelected }: DotProps) => {
  const isSelectedSharedValue = useSharedValue(1)

  const selectDot = () => {
    isSelectedSharedValue.value = withTiming(1, { duration: 150 })
  }

  const normalDot = () => {
    isSelectedSharedValue.value = withTiming(0, { duration: 150 })
  }

  useEffect(() => {
    if (isSelected) selectDot()
    else normalDot()
  }, [isSelected])

  const $animation = useAnimatedStyle(() => {
    const padding = interpolate(isSelectedSharedValue.value, [0, 1], [0, 4.5])
    const borderWidth = interpolate(isSelectedSharedValue.value, [0, 1], [4, 2.5])

    return {
      borderWidth,
      padding,
    }
  })

  return <Animated.View style={[$dot, $animation]} />
}

const $dot: ViewStyle = {
  marginHorizontal: 6,
  borderRadius: 10,
  borderColor: "#FEFEFE",
}