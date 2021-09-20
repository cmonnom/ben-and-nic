import ben_running from "../assets/ben_running.gif"
import nic_running from "../assets/nic_running.gif"
import snowBen from "../assets/snow2.gif"
import snowNic from "../assets/snow-reverse.gif"
import { useState, useEffect, useRef } from "react"
import Button from "react-bootstrap/Button"
import ToggleButton from "react-bootstrap/ToggleButton"
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

function Running(props) {
  const radios = [
    { delay: 1000, title: "Walk in the park" },
    { delay: 100, title: "5K Run" },
    { delay: 50, title: "26.2" },
  ]

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
  const [benPush, setBenPush] = useState(0)
  const [benTop, setBenTop] = useState(calcBenTop())
  const [nicTop, setNicTop] = useState(calcNicTop())
  const [benWidth, setBenWidth] = useState(calcBenWidth())
  const [nicWidth, setNicWidth] = useState(calcNicWidth())
  const [fadding, setFadding] = useState(false)
  const [pushBackSpeedLatest, setPushBackSpeedLatest] = useState(100)
  const [pushBackSpeed, setPushBackSpeed] = useState(100)

  const benPushRef = useRef(benPush)
  benPushRef.current = benPush
  const benWidthRef = useRef(benWidth)
  benWidthRef.current = benWidth
  const stepRef = useRef(step)
  stepRef.current = step
  const stepPushBackRef = useRef(stepPushBack)
  stepPushBackRef.current = stepPushBack
  const pushBackSpeedRef = useRef(pushBackSpeed)
  pushBackSpeedRef.current = pushBackSpeed
  const pushBackSpeedLatestRef = useRef(pushBackSpeedLatest)
  pushBackSpeedLatestRef.current = pushBackSpeedLatest
  useEffect(() => {
    function handleResize() {
      setBenPush(0)
      setBenTop(calcBenTop())
      setNicTop(calcNicTop())
      setBenWidth(calcBenWidth())
      setNicWidth(calcNicWidth())
      setStep(window.outerWidth / 100)
      setStepPushBack(stepRef.current * 2)
      setFadding(false)
    }
    window.addEventListener("resize", handleResize)

    function initInterval() {
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
        if (pushBackSpeedRef.current !== pushBackSpeedLatestRef.current) {
          setPushBackSpeedLatest(pushBackSpeedRef.current)
          clearInterval(pushBack)
          console.log("changed")
          initInterval()
        }
      }, pushBackSpeedRef.current)
      return () => clearInterval(pushBack)
    }
    initInterval()
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
    const progress = benPush / (window.outerWidth * 0.5 * 0.75) //6675% or the middle
    //[0 - 20] -> 0
    //[21 - 25] -> -1
    //[26 - 40] -> 1
    //[41 - 45] -> -1
    //[46 - 60] -> 2
    //[61 - 65] -> -1
    //[66 - 80] -> 3
    //[81- 85] -> -1
    //[86 - +++] -> null
    if (progress < 0.2) {
      return 0
    } else if (progress < 0.25) {
      return -1
    } else if (progress < 0.4) {
      return 1
    } else if (progress < 0.45) {
      return -1
    } else if (progress < 0.6) {
      return 2
    } else if (progress < 0.65) {
      return -1
    } else if (progress < 0.8) {
      return 3
    } else if (progress < 0.85) {
      return -1
    }
    return null
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
  function showDialog() {
    const progress = calcProgress()
    return progress !== -1 && benPush >= 10
  }
  function handlePushBackSpeedChange(value) {
    console.log("changing to", value)
    setPushBackSpeed(value)
    pushBackSpeedRef.current = pushBackSpeed
  }
  return (
    <div
      className={`no-select half-background left item-fade ${
        fadding ? "fadding" : ""
      }`}
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
      {showDialog() ? (
        <div>
          <span className="dialog absolute left-center left-bubble">
            {calcProgress() !== null ? benDialogs[calcProgress()] : hearts()}
          </span>
          <span className="dialog absolute right-center right-bubble">
            {calcProgress() !== null ? nicDialogs[calcProgress()] : hearts()}
          </span>
        </div>
      ) : null}
      <div className="absolute middle">
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Click Faster to Run Faster!</Tooltip>}
        >
          <Button size="lg" variant="danger" onClick={handlePlus}>
            <span>CLICK ME! &#9825;</span>
          </Button>
        </OverlayTrigger>
        <div>
          <br />
        </div>
        <label htmlFor="difficulty" className="padding-label">
          Difficulty:
        </label>
        <ToggleButtonGroup
          aria-label="Difficulty"
          defaultValue={100}
          type="radio"
          name="difficulty"
          id="difficulty"
          onChange={(e) => handlePushBackSpeedChange(e)}
        >
          {radios.map((radio, idx) => (
            <ToggleButton
              id={`difficulty ${radio.delay}`}
              key={idx}
              variant="outline-primary"
              value={radio.delay}
            >
              {radio.title}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  )
}

export default Running
