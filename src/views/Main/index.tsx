import React, { useState, useEffect } from "react";
import { IEvent } from "../../schemas/types";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import * as API from "../../apis";
import { RouteComponentProps, useHistory } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 auto;
  overflow: auto;
  margin: 0 auto 30px;
`;

const Group = styled.section`
  display: flex;
  flex-direction: row;
`;

const ParticipatingEventsBox = styled.div`
  font-size: 20px;
  font-weight: bold;
  background-color: #e8e8e8;
  border-radius: 5px;
  width: 50%;
  height: 60%;
  font-size: 25px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  top: 100px;
  right: 40px;
`;

const H3 = styled.h3`
  padding-top: 10px;
  margin-left: 30px;
  margin-bottom: 15px;
  float: left;
  margin-block-start: 0;
  color: #000000;
  width: 200px;
`;

const OnGoingEventsBox = styled.div`
  margin-left: 40px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  width: 80%;
  height: 40%;
  display: flex;
  flex-direction: column;
`;

const Events = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
`;

const FindEvent = styled.input`
  width: 800px;
  height: 45px;
  margin: 0;
  border-style: none;
  color: white;
`;

const FindEventBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 10%;
  font-size: 20px;
  font-weight: bold;
  left: 20px;
  margin-top: 400px;
  margin-right: 250px;
`;

const Search = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: bold;
  margin-left: 70px;
  border-style: solid;
  border-width: 2px;
  border-color: #4b89dc;
`;

const Name = styled.h5`
  width: 60%;
  text-align: left;
  margin: 10px;
  margin-left: 70px;
  font-weight: bold;
  font-size: 20px;
`;

const TEXT = styled.p`
  font-size: 15px;
  float: left;
  margin-left: 15px;
`;

const ParticipatingEvent = styled.li`
  margin-top: 10px;
  margin-left: 20px;
  width: 650px;
  float: left;
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
`;

const OnGoingEvent = styled.li`
  float: left;
  margin-right: 30px;
`;

const Main = () => {
  const history = useHistory();

  const [ParticipatingEvents, setParticipatingEvents] = useState<IEvent[]>([]);

  const [OnGoingEvents, setOnGoingEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    API.getParticipatingEvents()
      .then((res) => setParticipatingEvents(res))
      .catch((e) => console.log(e));

    API.getOngoingEvents()
      .then((res) => setOnGoingEvents(res))
      .catch((e) => console.log(e));
  }, []);

  const eventManage = (name: string | undefined) => {
    const url = "/me/event/" + name;
    window.location.href = url;
  };

  return (
    <Container>
      <Group>
        <FindEventBox>
          <Name>이벤트 찾기</Name>
          <Search>
            <FindEvent type="text" />
            <SearchIcon style={{ width: "45px", height: "45px" }} />
          </Search>
        </FindEventBox>
        <ParticipatingEventsBox>
          <H3>참여 중인 이벤트</H3>
          {ParticipatingEvents.map((event) => (
            <ParticipatingEvent
              key={event.id}
              onClick={() => history.push("/event/client/reception/1")}
            >
              <img src={event.thumbnail} width="200" height="100"></img>
              <TEXT>{event.description}</TEXT>
            </ParticipatingEvent>
          ))}
        </ParticipatingEventsBox>
      </Group>
      <Group>
        <OnGoingEventsBox>
          <H3>진행 중인 이벤트</H3>
          <Events>
            {OnGoingEvents.map((event) => (
              <OnGoingEvent key={event.id}>
                <img
                  onClick={() => eventManage(event.title)}
                  src={event.thumbnail}
                  width="200"
                  height="100"
                ></img>
              </OnGoingEvent>
            ))}
          </Events>
        </OnGoingEventsBox>
      </Group>
    </Container>
  );
};

export default Main;
