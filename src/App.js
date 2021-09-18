import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Running from "./components/Running"
import "./App.css"
import campfire from "./assets/campfire.jpg"
import { useState } from "react"

function App() {
  const [showCampfire, setShowCampfire] = useState(false)
  const [defadding, setDefadding] = useState(false)
  return (
    <Container fluid className="full-screen-div">
      <Row>
        <Col>
          {showCampfire ? (
            <div
              className={`dark item-defade middle ${
                defadding ? "defadding" : ""
              }`}
            >
              <img width="50%" src={campfire} alt="campfire" />
              <div className="white-text some-padding">
                <h1>Congrats Nic &amp; Ben!</h1>
              </div>
              <div className="white-text some-padding align-end small">
                <p>
                  Special thanks to pixel artists:
                  <br />
                  https://www.pinterest.es/lady1amalthea/
                  <br />
                  https://the-baldur.itch.io/pixelart-hiker
                  <br />
                  http://www.celestegame.com/
                  <br />
                  https://www.reddit.com/r/PixelArt/comments/36i0ji/oc_snowy_mountain_parallax/
                  <br />
                </p>
              </div>
            </div>
          ) : (
            <Running
              showCampfire={setShowCampfire}
              startTransition={setDefadding}
            />
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default App
