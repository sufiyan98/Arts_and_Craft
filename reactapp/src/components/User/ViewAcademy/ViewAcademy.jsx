import React, { useEffect, useState } from "react";
import UserService from "../../../service/UserService";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Rating } from "react-simple-star-rating";

export default function ViewAcademy() {
  let navigate = useNavigate();
  let [academy, setAcademy] = useState([]);
  let [search, setSearch] = useState("");
  const loadDataOnlyOnce = () => {
    UserService.viewAcademy().then((res) => {
      setAcademy(res.data);
      console.log(res.data)
    });
  };
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);
  const changeSearchHandler = (event) => {
    setSearch(event.target.value);
  };
  const findAcademy = () => {
    if (search === "") {
      UserService.viewAcademy().then((res) => {
        setAcademy(res.data);
      });
    } else {
      UserService.viewAcademyByName(search).then((res) => {
        setAcademy(res.data);
      });
    }
  };
  const viewCourse = (academyId) => {
    navigate(`/user/viewCourse/${academyId}`, {
      state:{
        academyId
      },
    });
  }
  return (
    <div>
      <div className="searchBar">
        <input
          className="userSearch"
          type="text"
          placeholder="Type here to search Academy"
          value={search}
          onChange={changeSearchHandler}
        />
        <input
          id="userAcademySearch"
          type="submit"
          value="Search"
          onClick={() => findAcademy()}
        />
      </div>
      <div className="academyGrid">
        {academy.map((academy, i) => (
          <React.Fragment key={i}>
            <Card className="academyElement" key={i} onClick={() => viewCourse(academy.academyId)}>
              <Card.Img variant="top" src={academy.academyImageUrl} />
              <Card.Title className="academyCardTitle">
                {academy.academyName}
              </Card.Title>
              <Card.Body className="academyCardGrid">
                <Card.Title>Email : </Card.Title>
                <Card.Text>{academy.academyEmail}</Card.Text>
                <Card.Title>Contact No:</Card.Title>
                <Card.Text>{academy.academyMobileNo}</Card.Text>
                <Card.Title>Location:</Card.Title>
                <Card.Text>{academy.academyLocation}</Card.Text>
                <Card.Title>Description:</Card.Title>
                <Card.Text>{academy.academyDescription}</Card.Text>
                <div></div>
                <Rating
                  initialValue={academy.rating}
                  fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                  allowHalfIcon
                  readonly={academy.rating > 0 || academy.rating === 0}
                  allowHover={false}
                />
              </Card.Body>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
