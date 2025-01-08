import { Center, GizmoHelper, GizmoViewport, Grid, OrbitControls, Stage, TransformControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Event, Vector3 } from "three"
import Points from "./components/points"
import { useState } from "react"
import View from "./components/view"
import { PathTypes } from "./types"
import Menu from "./components/menu"
import Paths from "./components/path"
import { GLTF } from "three/examples/jsm/Addons.js"
import Model from "./components/models"

/**
   * to do:
   * 
   * - remove a point from the path
   * - load your model(s)
   * - load a path
   * - save path
   * - hide helper when clicked outside points/blocks
   * - move to zustand
   * - cleanup the types
   * 
   */
export default function App() {

  const [gltf, setGltf] = useState<GLTF>(null!)

  const [types, setTypes] = useState({
    catmullrom: true,
    centripetal: true,
    chordal: true
  })

  const [config, setConfig] = useState({
    prescision: 4
  })

  const [path, setPath] = useState<PathTypes>({
    visible: true,
    selected: null,
    points: [
      new Vector3(1, 0, 0),
      new Vector3(0, 0, 0),
      new Vector3(-1, 0, 0)
    ]
  })

  const objectChanged = (event: Event<string, unknown> | undefined) => {
    const nextPositions = path.points.map((point, index) => {
      //@ts-ignore
      return index === path.selected.index ? event.target.object.position : point
    })
    setPath({
      ...path,
      points: nextPositions
    })
  }

  return (
    <>
      <Canvas shadows camera={{ position: [2, 3, 3] }}>

        <Paths path={path} types={types} />

        {
          path.visible &&
          <Points points={path.points} setPath={setPath} path={path} />
        }

        <Grid
          position={[0, 0, 0]}
          sectionSize={0}
          infiniteGrid
          fadeDistance={25}
          cellThickness={0.7}
          cellSize={1}
          cellColor={0xffffff} />

        {
          gltf &&
          <Stage>
            <primitive object={gltf.scene} />
          </Stage>
        }

        <OrbitControls makeDefault />

        {
          path.selected?.mesh &&
          <TransformControls
            mode="translate"
            object={path.selected.mesh}
            onObjectChange={objectChanged}
            size={0.5} />
        }

        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport />
        </GizmoHelper>

      </Canvas>

      <Menu
        types={types}
        setTypes={setTypes}
        path={path}
        setPath={setPath}
        config={config}
        setConfig={setConfig}
        setGltf={setGltf} />

      <View points={path.points} config={config} />
    </>
  )
}
