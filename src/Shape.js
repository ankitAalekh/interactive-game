//Create a shape
//empty box when value ==1
// when value ===0 render nothing
//we can select a box and change bg color to green
//deselect in order of selection
//disable any interation
//DS?Object?Array? Set? Something else?
//2D Array

import React, { useEffect, useMemo, useRef, useState } from "react"
import classNames from "classnames"
const Shape = ({ data }) => {
  // [1,1,1,1,0,0,1,1,1]
  const boxes = useMemo(() => data.flat(Infinity), [data])
  const countOfVisibleBoxes = useMemo(() => {
    return boxes.reduce((acc, box) => {
      if (box == 1) {
        acc += 1
      }
      return acc
    }, 0)
  }, [boxes])
  const [selected, setSelected] = useState(new Set())
  const [unloading, setUnloading] = useState(false)
  const timerRef = useRef
  const handleClick = (e) => {
    //index
    //status
    const { target } = e
    const index = target.getAttribute("data-index")
    const status = target.getAttribute("data-status")

    if (index === null || status == "hidden" || selected.has(index) || unloading) {
      return
    }
    setSelected((prev) => {
      return new Set(prev.add(index))
    })
  }

  const unload = () => {
    setUnloading(true)
    const keys = Array.from(selected.keys())
    const removeNextKey = () => {
      if (keys.length) {
        const currentKey = keys.shift()
        setSelected((prev) => {
          const updatedKeys = new Set(prev)
          updatedKeys.delete(currentKey)
          return updatedKeys
        })

        timerRef.current = setTimeout(removeNextKey, 500)
      } else {
        setUnloading(false)
        clearTimeout(timerRef)
      }
    }
    timerRef.current = setTimeout(removeNextKey, 100)
  }

  useEffect(() => {
    //selected.size >= countOfVisibleBoxes
    if (selected.size >= countOfVisibleBoxes) {
      //unloading
      unload()
    }
  }, [selected])

  return (
    <div className="boxes" onClick={handleClick}>
      {boxes.map((box, index) => {
        const status = box == 1 ? "visible" : "hidden"
        const isSelected = selected.has(index.toString())
        return <div key={`${box}-${index}`} className={classNames("box", status, isSelected && "selected")} data-index={index} data-status={status} />
      })}
    </div>
  )
}

export default Shape
