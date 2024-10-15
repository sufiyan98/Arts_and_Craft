import React, { useEffect, useState } from 'react'
import UserService from '../../../service/UserService';
import { ButtonGroup, Card } from 'react-bootstrap';
import Button from '@restart/ui/esm/Button';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function AcademyList() {
  let navigate = useNavigate();
  let [academy, setAcademy] = useState([]);
  let [search, setSearch] = useState("");
  const loadDataOnlyOnce = () => {
    UserService.viewAcademy().then((res) => {
      setAcademy(res.data);
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
    }else {
      UserService.viewAcademyByName(search).then((res) => {
        setAcademy(res.data);
      });
    }
  };
  const editAcademy = (id) => {
    navigate(`updateAcademy/${id}`);
  };
  const deleteAcademy = (id) => {
    UserService.deleteAcademy(id).then((res) => {
      setAcademy(academy.filter((academy)=> academy.academyId !== id))
    });
  };

  return (
    <div>
      <div className="searchBar">
            <input
              className="search"
              type="text"
              placeholder="Type here to search Academy"
              value={search}
              onChange={changeSearchHandler}
            />
            <input
              id="academySearch"
              type="submit"
              value="Search"
              onClick={() => findAcademy()}
            />
            <span id="addAcademyBtn"><Link to="adminAddAcademy">Add Academy</Link></span>
      </div>
      <div className="academyGrid">
      {
        academy.map (academy =>
          <React.Fragment key={academy.academyId}>
          <Card  className="academyElement">
            <Card.Img variant="top" src={academy.academyImageUrl}/>
            <Card.Title className="academyCardTitle">{academy.academyName}</Card.Title>
            <Card.Body className="academyCardGrid">
            <Card.Title>Email : </Card.Title>
              <Card.Text>
                {academy.academyEmail}
              </Card.Text>
              <Card.Title>Contact No:</Card.Title>
              <Card.Text>
                {academy.academyMobileNo}
              </Card.Text>
              <Card.Title>Location:</Card.Title>
              <Card.Text>
                {academy.academyLocation}
             </Card.Text> 
             <Card.Title>Description:</Card.Title>
             <Card.Text>
                {academy.academyDescription}
             </Card.Text>
             <div></div>
             <ButtonGroup className="cardButton">
              <Button id="editAcademy" onClick={() => editAcademy(academy.academyId)} variant="primary">Edit</Button>
              <Button id="deleteAcademy" onClick={() => deleteAcademy(academy.academyId)} variant="primary">Delete</Button>
            </ButtonGroup>
            </Card.Body>
          </Card>
          </React.Fragment>
        )}
        </div>
    </div>
  )
}
