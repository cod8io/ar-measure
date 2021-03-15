/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react'
import { Button, StyleSheet, View, Text } from 'react-native'

import { ViroARScene, ViroARSceneNavigator, ViroSphere, ViroPolyline } from 'react-viro'

import { useDispatch, useSelector } from 'react-redux'
import { store } from '../store'
import Reticle from '../components/Reticle'
import { getFirstPoint, getReticlePoint, getSecondPoint } from '../services/selectors/ar-selector'
import { setPoint } from '../services/actions/points-actions'

const MeasureScene = () => {
    const [coord, setCoord] = useState([])
    const dispatch = useDispatch()

    const firstPoint = useSelector(getFirstPoint)
    const secondPoint = useSelector(getSecondPoint)

    const onArHitResult = ({ hitTestResults }: { hitTestResults: any[] }) => {
        // const forward = cameraOrientation.forward.map(
        //   (x) => Math.round((x + Number.EPSILON) * 100) / 100,
        // );
        // const position = cameraOrientation.position.map(
        //   (x) => Math.round((x + Number.EPSILON) * 100) / 100,
        // );
        // const rotation = cameraOrientation.rotation.map(
        //   (x) => Math.round((x + Number.EPSILON) * 100) / 100,
        // );

        // const planes = hitTestResults.filter((r) => r.type !== 'FeaturePoint');
        // if (planes.length > 0) {
        //   console.log(planes[0].type);
        // }

        // Filter only feature points
        const points = hitTestResults.filter((r) => r.type === 'FeaturePoint')

        if (points.length === 0) {
            setCoord([])
            // console.log('0');
        } else {
            // console.log('Points ' + points.length);
            for (let i = 0; i < points.length; i++) {
                const { transform } = points[i]
                // X Y Z
                // console.log(position);
                setCoord(transform.position)
                dispatch(setPoint('reticle', transform.position))
            }
            // console.log(points[0]);
        }
        // console.log(points.length);
    }

    return (
        <ViroARScene onCameraARHitTest={onArHitResult}>
            {firstPoint && <ViroSphere radius={0.01} position={firstPoint} />}
            {secondPoint && <ViroSphere radius={0.01} position={secondPoint} />}
            {firstPoint && secondPoint && <ViroPolyline points={[firstPoint, secondPoint]} thickness={0.004} />}
            {firstPoint && !secondPoint && coord.length > 0 && <ViroPolyline points={[firstPoint, coord]} thickness={0.002} />}
            {coord.length > 0 && <Reticle position={coord} />}

            {/* <ViroBox position={[0, 0, -2]} scale={[0.1, 0.1, 0.1]} /> */}
        </ViroARScene>
    )
}

const Home = () => {
    const [isSceneOpened, setIsSceneOpened] = useState(true)
    const dispatch = useDispatch()

    console.log(') ) ) ) ) render')

    return (
        <View style={styles.container}>
            <View style={[styles.container, { backgroundColor: 'lightgray' }]}>
                {isSceneOpened && <ViroARSceneNavigator initialScene={{ scene: MeasureScene }} />}
                {!isSceneOpened && <Text>Scene not opened</Text>}
            </View>
            <View style={styles.bottomContainer}>
                <Button
                    title='TOGGLE'
                    onPress={async () => {
                        if (isSceneOpened) {
                            setIsSceneOpened(false)
                            dispatch(setPoint('reticle', undefined))
                            dispatch(setPoint('first', undefined))
                            dispatch(setPoint('second', undefined))
                        } else {
                            setIsSceneOpened(true)
                        }
                    }}
                />

                <Button
                    title='ADD POINT'
                    onPress={async () => {
                        const reticlePoint = getReticlePoint(store.getState())
                        const firstPoint = getFirstPoint(store.getState())

                        if (!reticlePoint) alert('Focus on surface')
                        else if (!firstPoint) dispatch(setPoint('first', reticlePoint))
                        else dispatch(setPoint('second', reticlePoint))
                    }}
                />

                <Button
                    title='STORE'
                    onPress={async () => {
                        console.log(store.getState())
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bottomContainer: {
        height: 80,
        flexDirection: 'row'
    },
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 40,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center'
    }
})

export default Home
