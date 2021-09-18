import ben_running from "../assets/ben_running.gif"
import nic_running from "../assets/nic_running.gif"
import snowBen from "../assets/snow2.gif"
import snowNic from "../assets/snow-reverse.gif"
import { useState, useEffect, useRef } from "react"
import Button from "react-bootstrap/Button"

function Running(props) {
  const ratio = 0.5625
  const benDialogs = [
    "Nic!",
    "Did you lock the door?",
    "All those ironman races finally paid off!",
    "Where is Kenai?!",
  ]
  const nicDialogs = [
    "Ben!",
    "Yeah Smalls ain't going anywhere!",
    "(I could use some trail mix right about now...)",
    "Waiting for us at the wedding!",
  ]
  const [step, setStep] = useState(window.outerWidth / 100)
  const [stepPushBack, setStepPushBack] = useState(step * 0.2)
  const [benPush, setBenPush] = useState(50)
  const [benTop, setBenTop] = useState(calcBenTop())
  const [nicTop, setNicTop] = useState(calcNicTop())
  const [benWidth, setBenWidth] = useState(calcBenWidth())
  const [nicWidth, setNicWidth] = useState(calcNicWidth())
  const [fadding, setFadding] = useState(false)

  const benPushRef = useRef(benPush)
  benPushRef.current = benPush
  const benWidthRef = useRef(benWidth)
  benWidthRef.current = benWidth
  const stepRef = useRef(step)
  stepRef.current = step
  const stepPushBackRef = useRef(stepPushBack)
  stepPushBackRef.current = stepPushBack
  useEffect(() => {
    function handleResize() {
      setBenPush(0)
      setBenTop(calcBenTop())
      setNicTop(calcNicTop())
      setBenWidth(calcBenWidth())
      setNicWidth(calcNicWidth())
      setStep(window.outerWidth / 100)
      setStepPushBack(stepRef.current * 2)
    }
    window.addEventListener("resize", handleResize)

    const pushBack = setInterval(() => {
      if (benPushRef.current >= stepPushBackRef.current) {
        setBenPush(benPushRef.current - stepPushBackRef.current)
      }
      if (
        benPushRef.current + benWidthRef.current * 0.75 >=
        window.outerWidth / 2
      ) {
        clearInterval(pushBack)
      }
    }, 100)
    return () => clearInterval(pushBack)
  }, [])
  function benPushFormatted() {
    return benPush + "px"
  }
  function handlePlus(_event) {
    if (!goalReached()) {
      setBenPush(benPush + step)
    } else {
      setFadding(true)
      setTimeout(() => {
        props.showCampfire(true)
      }, 1000)
      setTimeout(() => {
        props.startTransition(true)
      }, 1200)
    }
  }
  function goalReached() {
    return benPush + benWidth * 0.75 >= window.outerWidth / 2
  }
  function calcProgress() {
    const index = Math.round(
      (benPush / (window.outerWidth / 3)) * benDialogs.length,
    )
    if (index >= benDialogs.length) {
      return null
    }
    return index
  }
  function calcBenTop() {
    const backgroundHeight = (window.outerWidth / 2) * ratio
    return backgroundHeight - backgroundHeight * 0.4
  }
  function calcNicTop() {
    const backgroundHeight = (window.outerWidth / 2) * ratio
    return backgroundHeight - backgroundHeight * 0.36
  }
  function benTopFormatted() {
    return benTop + "px"
  }
  function nicTopFormatted() {
    return nicTop + "px"
  }
  function hearts() {
    let count = Math.round((benPush / (window.outerWidth / 10)) * 20) - 58
    let text = ""
    for (let i = 0; i < count; i++) {
      text += "♡"
    }
    return text
  }
  function calcBenWidth() {
    return window.outerWidth / 10
  }
  function calcNicWidth() {
    return window.outerWidth / 11
  }
  function benWidthFormatted() {
    return benWidth + "px"
  }
  function nicWidthFormatted() {
    return nicWidth + "px"
  }
  return (
    <div
      className={`half-background left item-fade ${fadding ? "fadding" : ""}`}
      // style={{ backgroundImage: `url(${snow1}), url(${moon1})` }}
      style={{ backgroundImage: `url(${snowBen})` }}
    >
      <div
        className="half-background right"
        // style={{ backgroundImage: `url(${snow1}), url(${moon1})` }}
        style={{ backgroundImage: `url(${snowNic})` }}
      >
        <span
          id="ben"
          style={{
            position: "absolute",
            top: benTopFormatted(),
            left: benPushFormatted(),
          }}
        >
          <img
            // width={benWidthFormatted()}
            width={benWidthFormatted()}
            src={ben_running}
            alt="ben running"
          />
        </span>
        <span
          id="nic"
          style={{
            position: "absolute",
            top: nicTopFormatted(),
            right: benPushFormatted(),
          }}
        >
          <img
            width={nicWidthFormatted()}
            src={nic_running}
            alt="nic running"
            className="reverse"
          />
        </span>
      </div>
      <span className="dialog absolute left-center">
        {calcProgress() !== null ? benDialogs[calcProgress()] : hearts()}
      </span>
      <span className="dialog absolute right-center">
        {calcProgress() !== null ? nicDialogs[calcProgress()] : hearts()}
      </span>
      <div className="absolute middle">
        <Button size="lg" variant="danger" onClick={handlePlus}>
          <span>&#9825;</span>
        </Button>
      </div>
    </div>
  )
}

export default Running
