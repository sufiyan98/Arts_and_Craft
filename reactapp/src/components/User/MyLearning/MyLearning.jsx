import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import UserService from "../../../service/UserService";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import "./MyLearning.css"

export default function MyLearing() {
  const [enrolledCourse, setEnrolledCourse] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [ratingId, setRatingId] = useState(0);
  const [disable, setDisable] = useState(false);
  let { id } = useParams();
  let navigate = useNavigate();
  const loadDataOnlyOnce = () => {
    UserService.viewAdmissionById(id).then((res) => {
      setEnrolledCourse(res.data);
      console.log(enrolledCourse);
      setLoading(false);
    });
    UserService.findReview(id).then((res) => {
      setRatingId(res.data.reviewId);
      setRating(res.data.rating);
      console.log(res.data.rating)
    });
    UserService.checkReview(id).then((res) =>  {
      if(res.data) {
        setDisable(false)
      }else {
        setDisable(true)
      }
    });
  };
  useEffect(() => {
    loadDataOnlyOnce();
  }, []);
  const deleteCourse = (courseId) => {
    UserService.deleteAdmission(courseId).then((res) => {
      toast.success("Course Unenrolled Successfully");
      navigate(-1);
    });
  };
  const handleRating = (rating) => {
    setRating(rating/20)
  }
  const submitRating = () => {
    var Ratings = {
      rating: rating,
      enrolledCourse: {
        enrolledCourseId : id
      }
    }
    UserService.checkReview(id).then((res) =>  {
      if(res.data) {
        UserService.editReview(ratingId ,Ratings).then((res) =>  {
          toast.success("Thanks for rating us !!");
        });
      }else {
        UserService.addReview(Ratings).then((res) =>  {
          toast.success("Thanks for rating us !!");
        });
      }
    });
  }
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div>
      <img className="academyImgProfile" src={enrolledCourse.course.academy.academyImageUrl} alt="" />
      <div className="MycourseGrid">
      <div></div>
        <button id="unenrollCourse" onClick={() => deleteCourse(enrolledCourse.enrolledCourseId)}>
          Unenroll Course
        </button>
      <div className="joinedView">Joined Date - {enrolledCourse.joinedDate}</div>
      <div className="endView">End Date - {enrolledCourse.endDate}</div>
      <span className="progressView1"></span>
      <span className="progressView2"></span>
      <div></div>
      <div style={{textAlign:'start', marginLeft:'68vh', fontWeight: '600'}}>Rate us ?</div>
      <div></div>
        <div className="ratingView">
          <Rating
            initialValue={rating}
            fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
            allowHalfIcon
            onClick={handleRating}
            allowHover={false}
          />
        </div>
        <div></div>
        <div>
          {
            disable ? 
            <button onClick={submitRating}>Submit</button>
            : null
          }
        </div>
      </div>
      <div className="MyLearingGrid">
        <Card className="MyLearingElement">
          <Card.Title className="courseCardTitle">
            Course Information
          </Card.Title>
          <Card.Body className="courseCardGrid">
          <Card.Title>Name : </Card.Title>
            <Card.Text>{enrolledCourse.course.courseName}</Card.Text>
            <Card.Title>Duration : </Card.Title>
            <Card.Text>{enrolledCourse.course.courseDuration} Months</Card.Text>
            <Card.Title>Timing : </Card.Title>
            <Card.Text>{enrolledCourse.course.startTime} to {enrolledCourse.course.endTime}</Card.Text>
            <Card.Title>Description : </Card.Title>
            <Card.Text>{enrolledCourse.course.courseDescription}</Card.Text>
          </Card.Body>
        </Card>
        <Card className="MyLearingElement">
          <Card.Title className="courseCardTitle">
            Academy Information
          </Card.Title>
          <Card.Body className="courseCardGrid">
            <Card.Title>Name : </Card.Title>
            <Card.Text>{enrolledCourse.course.academy.academyName}</Card.Text>
            <Card.Title>Location : </Card.Title>
            <Card.Text>{enrolledCourse.course.academy.academyLocation}</Card.Text>
            <Card.Title>Contact No : </Card.Title>
            <Card.Text>{enrolledCourse.course.academy.academyMobileNo}</Card.Text>
            <Card.Title>Description : </Card.Title>
            <Card.Text>{enrolledCourse.course.academy.academyDescription}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}