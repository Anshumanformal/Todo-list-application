import React from "react";
import { useState } from "react";
import { Form, Container, Row, Col, Button, Stack, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


const App = () => {

  const [activity, setActivity] = useState("")
  const [listData, setListData] = useState([])

  /**
  * @description function to add activity to the list
  */
  const addActivity = ()=>{
    setListData(prevListData => {
      // prevListData - contains previously added items
      // activity - contains the item obtained by e.target.value
      // using spread operator we create the updatedList variable, and add the activity to the variable
      // using setActivity(""), we reset the activity variable to "".
      // we return the updatedList
      const updatedList = [...prevListData, activity]
      setActivity("");
      return updatedList
    })
  }

  // Another way to synchronously log listData is by using useEffect hook.
  // useEffect(() => {
  //   console.log(listData);
  // }, [listData]);

  /**
   * @description function to handle "Enter" key input
   * @param {event} event 
   */
  const handleKeyDown = (event) => {
    if(event.key === "Enter"){
      setListData(prevListData => {
        const updatedList = [...prevListData, activity]
        setActivity("");
        return updatedList
      })
    }
  }

  /**
   * @description function to remove activity from the list
   * @param {index} i 
   */
  const removeActivity = (i) => {
    // using filter we filter out all activities, except the one
    // whose ID was passed to remove the corresponding activity
    const updatedListData = listData.filter((item, index) => {
      return i !== index
    })
    setListData(updatedListData)
  }

  /**
   * @description function to remove all activities at once
   */
  const removeAll = () => {
    setListData([])
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Stack direction="horizontal" gap={3} className="mx-auto">
              <Form.Control className="me-auto"
              type="text"
              placeholder="Add your tasks here..."
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              onKeyDown={handleKeyDown}
              />
              <Button variant="primary" size="lg"
              onClick={addActivity}
              >Add task</Button>
            </Stack>
          </Col>
        </Row>
        <br />
        <br />
        <div className="d-flex justify-content-center">
          <h1><Badge bg="info">Here are all your lists...</Badge></h1>
        </div>
        
        {listData.length > 0 && listData.map((item, index) => {
          return (
            <>
              {/* Adding a key as ID for every activity added */}
              <p key={index}>
                <div className="d-flex align-items-center justify-content-between">

                    <div className="list-activity">
                      <Stack size="lg" gap={3}>
                      <div className="bg-light border">{item}</div>
                    </Stack>
                    </div>

                  
                  {/* Adding a button to remove that activity */}
                  <Button variant="danger" onClick={() => removeActivity(index)}>
                    Remove activity <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </p>
            </>
          )
        })}

        {/* RemoveAll button should come as soon as an activity is added */}
        {listData.length >= 1 &&
        
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
            <Button variant="danger" onClick={removeAll}>Remove All <FontAwesomeIcon icon={faTrash} /></Button>
        </div>
        }
      </Container>
    </>
  );
};

export default App;
